import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function DetailModal({ visible, product, onClose }) {
  if (!product) return null;

  const { title, price, image, rating, category, description } = product;

  // Warna bintang berdasarkan rating
  const getRatingColor = (rate) => {
    if (rate >= 4) return '#16A34A';
    if (rate >= 3) return '#D97706';
    return '#DC2626';
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.sheet}>
          {/* ── Handle ── */}
          <View style={styles.handle} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* ── Gambar ── */}
            <View style={styles.imageBox}>
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.body}>
              {/* ── Badge Kategori ── */}
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>

              {/* ── Judul ── */}
              <Text style={styles.title}>{title}</Text>

              {/* ── Harga & Rating ── */}
              <View style={styles.priceRow}>
                <Text style={styles.price}>${price.toFixed(2)}</Text>

                <View style={styles.ratingBox}>
                  <Text
                    style={[
                      styles.ratingNum,
                      { color: getRatingColor(rating?.rate) },
                    ]}
                  >
                    ⭐ {rating?.rate}
                  </Text>
                  <Text style={styles.ratingCount}>
                    {rating?.count} ulasan
                  </Text>
                </View>
              </View>

              {/* ── Divider ── */}
              <View style={styles.divider} />

              {/* ── Deskripsi ── */}
              <Text style={styles.descLabel}>Deskripsi Produk</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </ScrollView>

          {/* ── Tombol Tutup ── */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.48)',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    maxHeight: '92%',
    paddingBottom: 12,
  },
  handle: {
    width: 42,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  // ── Gambar
  imageBox: {
    height: 230,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  // ── Body
  body: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
    textTransform: 'capitalize',
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 26,
    marginBottom: 14,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: '#4F46E5',
  },
  ratingBox: {
    alignItems: 'flex-end',
  },
  ratingNum: {
    fontSize: 16,
    fontWeight: '700',
  },
  ratingCount: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 16,
  },
  descLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  // ── Footer
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  closeBtn: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});