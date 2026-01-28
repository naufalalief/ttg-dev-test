# User API Express + MongoDB

## Fitur

- **POST /users**: Tambah pengguna baru (email unik, data JSON)
- **GET /users**: Ambil semua pengguna
- **GET /users/:id**: Ambil pengguna berdasarkan ID
- **DELETE /users/:id**: Hapus pengguna berdasarkan ID

## Setup

1. Copy `.env.example` ke `.env` dan sesuaikan koneksi MongoDB jika perlu.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan server:
   ```bash
   npm run dev
   ```

## Catatan

- Semua data dikirim/diterima dalam format JSON.
- Email harus unik di database.
