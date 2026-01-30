const { Book, BorrowLog } = require('../models');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, author, stock } = req.body;
        // Validasi sederhana [cite: 83]
        if (!title || !author) return res.status(400).json({ message: 'Title dan Author wajib diisi' });
        
        const book = await Book.create({ title, author, stock });
        res.status(201).json({ message: 'Buku berhasil dibuat', book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

        await book.update(req.body);
        res.json({ message: 'Buku berhasil diupdate', book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

        await book.destroy();
        res.json({ message: 'Buku berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.borrowBook = async (req, res) => {
    const { bookId, latitude, longitude } = req.body; 
    const userId = req.userId; 

    try {
        const book = await Book.findByPk(bookId);
        
        if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });
        if (book.stock <= 0) return res.status(400).json({ message: 'Stok buku habis' });

        book.stock -= 1;
        await book.save();

        const log = await BorrowLog.create({
            userId,
            bookId,
            latitude,
            longitude
        });

        res.json({ message: 'Peminjaman berhasil', data: log });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};