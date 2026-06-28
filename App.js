import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import ProductCard from './components/ProductCard';
import DetailModal from './components/DetailModal';

const API_URL = 'https://fakestoreapi.com/products';

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // ─── Fetch Products ──────────────────────────────────────────────────────────
  const fetchProducts = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message || 'Gagal memuat produk. Periksa koneksi internet.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch sekali saat mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // ─── Search / Filter (client-side) ──────────────────────────────────────────
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, products]);

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleCardPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  // ─── Loading State ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Memuat produk...</Text>
      </View>
    );
  }

  // ─── Error State ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.bigEmoji}>😵</Text>
        <Text style={styles.errorTitle}>Gagal Memuat Data</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() => fetchProducts()}
          activeOpacity={0.8}
        >
          <Text style={styles.retryText}>🔄  Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Success State ───────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🛒 ShopCatalog</Text>
          <Text style={styles.headerSub}>
            {filteredProducts.length} produk tersedia
          </Text>
        </View>
      </View>

      {/* ── Search Bar ── */}
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔎</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari nama produk atau kategori..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Empty State ── */}
      {filteredProducts.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.bigEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>Produk Tidak Ditemukan</Text>
          <Text style={styles.emptySubtitle}>
            Tidak ada hasil untuk "{searchQuery}"{'\n'}Coba kata kunci lain.
          </Text>
          <TouchableOpacity
            style={styles.clearSearchBtn}
            onPress={() => setSearchQuery('')}
          >
            <Text style={styles.clearSearchText}>Hapus Pencarian</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* ── Product List ── */
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => handleCardPress(item)}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchProducts(true)}
              colors={['#4F46E5']}
              tintColor="#4F46E5"
            />
          }
        />
      )}

      {/* ── Detail Modal ── */}
      <DetailModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 32,
  },
  // ── Header
  header: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  headerSub: {
    color: '#C7D2FE',
    fontSize: 12,
    marginTop: 2,
  },
  // ── Search
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 6,
    borderRadius: 14,
    paddingHorizontal: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  searchIcon: { fontSize: 15, marginRight: 8 },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: '#1F2937',
  },
  clearBtn: {
    fontSize: 15,
    color: '#9CA3AF',
    paddingHorizontal: 4,
  },
  // ── List
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 28,
    gap: 12,
  },
  // ── Loading
  loadingText: {
    marginTop: 14,
    fontSize: 15,
    color: '#6B7280',
  },
  // ── Error
  bigEmoji: { fontSize: 58, marginBottom: 14 },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
    elevation: 2,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  // ── Empty State
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 20,
  },
  clearSearchBtn: {
    borderWidth: 1.5,
    borderColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
  },
  clearSearchText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
  },
}); 