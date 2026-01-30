const express = require('express');
const { sequelize } = require('./models');
const { isAdmin, isUser } = require('./middleware/authMiddleware');
const controller = require('./controllers/libraryController');

const app = express();
app.use(express.json());

// --- ROUTES ---

app.get('/api/books', controller.getAllBooks);
app.get('/api/books/:id', controller.getBookById);

app.post('/api/books', isAdmin, controller.createBook);
app.put('/api/books/:id', isAdmin, controller.updateBook);
app.delete('/api/books/:id', isAdmin, controller.deleteBook);

app.post('/api/borrow', isUser, controller.borrowBook);

// --- SERVER & SYNC DB ---
const PORT = 3000;
sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log('Database error:', err));