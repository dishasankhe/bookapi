const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://dishasankhe2000:wMXdb4KRRx2pY7rG@cluster0.xnwwss5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB database connected'))
    .catch(err => console.error('Error occurred while connecting Database:', err));

// Schema and Model
const bookSchemas = new mongoose.Schema({
    name: String,
    img: String,
    summary: String
});

//model name
const Book = mongoose.model('Book', bookSchemas);  

// CRUD Operations

app.post('/books', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);// successfully requested
    } catch (error) {
        res.status(400).json({ message: error.message });//bad request
    }
});

// Read books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });//Server Error
    }
});

// Update book as per id created
app.put('/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });//bad request
    }
});

// Delete book as per id created
app.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server-while making connection i have used my ip address to accesss postman
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
