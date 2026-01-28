const User = require("../models/User");
const cleanUser = require("../utils/cleanUser");
const bcrypt = require("bcrypt");

// POST: Tambah pengguna baru
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi." });
    }
    // Cek email unik
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email sudah terdaftar." });
    }
    // hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({
      message: "Pengguna berhasil ditambahkan",
      user: cleanUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET: Daftar semua pengguna
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map(cleanUser));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET: Pengguna berdasarkan ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    res.json(cleanUser(user));
  } catch (err) {
    res.status(400).json({ message: "ID tidak valid", error: err.message });
  }
};

// DELETE: Hapus pengguna berdasarkan ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    res.json({ message: "Pengguna berhasil dihapus" });
  } catch (err) {
    res.status(400).json({ message: "ID tidak valid", error: err.message });
  }
};
