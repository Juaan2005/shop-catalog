import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ProductCard({ product, onPress }) {
  const { title, price, image, rating, category } = product;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.82}
    >
      {/* ── Gambar Produk ── */}
      <View style={styles.imageBox}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* ── Info Produk ── */}
      <View style={styles.info}>
        {/* Kategori */}
        <Text style={styles.category} numberOfLines={1}>
          {category}
        </Text>

        {/* Judul */}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {/* Harga + Rating */}
        <View style={styles.footer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingText}>⭐ {rating?.rate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '48%',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 4,
  },
  imageBox: {
    width: '100%',
    height: 130,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 10,
  },
  category: {
    fontSize: 10,
    color: '#6B7280',
    textTransform: 'capitalize',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 18,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4F46E5',
  },
  ratingPill: {
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#78350F',
  },
});