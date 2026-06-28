# 🛒 ShopCatalog

Aplikasi mobile katalog produk e-commerce yang dikembangkan menggunakan **React Native (Expo)** dengan data real dari REST API.

---

## 📌 Deskripsi Aplikasi

ShopCatalog adalah aplikasi mobile yang menampilkan katalog produk dari **FakeStore API**. Pengguna dapat menelusuri produk dalam tampilan grid, mencari produk berdasarkan nama atau kategori, serta melihat detail produk secara lengkap melalui modal.

---

## 🌐 API yang Dipakai

| Info | Detail |
|------|--------|
| Nama API | FakeStore API |
| Endpoint | `https://fakestoreapi.com/products` |
| Tipe Data | Array of product objects |
| Auth | Tidak diperlukan (gratis) |

**Struktur data per produk:**
```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack",
  "price": 109.95,
  "description": "...",
  "category": "men's clothing",
  "image": "https://...",
  "rating": { "rate": 3.9, "count": 120 }
}
```

---

## ✅ Daftar Fitur

### 🟢 Level 1 — Core (Semua Wajib)
- [x] **Fetch API** menggunakan `async/await` + `fetch`
- [x] **`useEffect` dengan `[]`** — fetch sekali saat komponen mount
- [x] **3 Kondisi UI:**
  - ⏳ Loading → `ActivityIndicator` dengan teks "Memuat produk..."
  - ❌ Error → Pesan error + tombol **"Coba Lagi"** (memanggil ulang `fetchProducts`)
  - ✅ Success → Data tampil dalam `FlatList` grid 2 kolom
- [x] **`try / catch / finally`** — error handling lengkap, loading dimatikan di `finally`
- [x] **`FlatList`** dengan `data`, `renderItem`, `keyExtractor`
- [x] **Kartu item** menampilkan: gambar, judul, harga, rating, kategori (5 field)

### 🟡 Level 2 — Pengembangan

| Fitur | Status | Keterangan |
|-------|--------|------------|
| 🔎 Search / Filter | ✅ Aktif | Filter client-side berdasarkan judul & kategori via `TextInput` |
| 📄 Layar Detail | ✅ Aktif | Modal bottom-sheet menampilkan detail lengkap (gambar, harga, rating, deskripsi) |
| 🔄 Pull-to-Refresh | ✅ Bonus | `RefreshControl` — tarik layar ke bawah untuk refetch |
| 🎨 Empty State | ✅ Bonus | Tampilan ramah saat hasil pencarian kosong |

---

## 🖼️ Screenshot

> Tambahkan 3 screenshot dari Expo Go ke folder `/screenshots`:

| Loading | Success | Error |
|---------|---------|-------|
| ![loading](screenshots/loading.png) | ![success](screenshots/success.png) | ![error](screenshots/error.png) |

---

## 🗂️ Struktur Project

```
ShopCatalog/
├── App.js                  # Komponen utama (fetch, state, FlatList, search)
├── components/
│   ├── ProductCard.js      # Kartu produk (gambar, judul, harga, rating)
│   └── DetailModal.js      # Modal detail produk (bottom sheet)
├── package.json
└── README.md
```

---

## ⚙️ Cara Menjalankan

### Prasyarat
- Node.js ≥ 18
- Expo Go terinstall di HP (App Store / Play Store)
- HP & laptop di **WiFi yang sama**

### Setup

```bash
# 1. Clone repo
git clone https://github.com/Juaan2005/shop-catalog.git
cd ShopCatalog

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npx expo start

# 4. Scan QR code dengan Expo Go
```

---

## 🛠️ Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| React Native | 0.74 | Framework mobile |
| Expo | ~51.0 | Build toolchain & dev server |
| FakeStore API | — | Sumber data produk |
| `fetch` (built-in) | — | HTTP client untuk GET request |

---

## 🔗 Link

- **Expo Snack:** [snack.expo.dev/...](https://snack.expo.dev/) ← 
- **GitHub Repo:** https://github.com/Juaan2005/shop-catalog ← 

---

## 💡 Catatan Teknis

### Kenapa `fetch` bukan `axios`?
`fetch` adalah Web API bawaan JavaScript, tidak butuh instalasi tambahan. Untuk project Expo yang simpel, `fetch` sudah cukup — axios berguna saat butuh interceptors, timeout global, atau transform response otomatis.

### Cara error state ditest:
Matikan WiFi lalu buka app → layar error muncul → nyalakan WiFi → tekan "Coba Lagi" → data load normal.
