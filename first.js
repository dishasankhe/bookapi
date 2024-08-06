const express=require('express');
const mongoose=require('mongoose');

const app=express();
const port=3000;

app.use(express.json());

//DB connection
mongoose.connect('mongodb+srv://dishasankhe2000:wMXdb4KRRx2pY7rG@cluster0.xnwwss5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB database connected'))
.catch(err =>console.error("Error occurred ",err));

const bookSch=new mongoose.Schema({
    name: String,
    img:String,
    summary:String
});

const Book=mongoose.model('Book is',bookSch);

//CRUP Operation

//create new book
app.post('/books',async(req,res) => {
    try{
        const nBook=new Book(req.body);
        const restoreBook=await nBook.save();
        res.status(201).json(restoreBook);
    }
    catch(error){
        res.status(400).json({message : error.message});
    }
});

//read book
app.get('/books',async(req,res) =>{
    try{
        const books=await Book.find();
        res.json(books);

    }
    catch(error){
        res.status(500).json({message : error.message});
    }

});

//update
app.put('/books/:id',async(req,res) => {
    try{
        const updatedBook= await Book.find();
        if(updatedBook) return res.status(404).json({message: 'Book not found'});
        res.json(updatedBook);

    }
    catch(error){
        res.status(400).json({message : error.message});

    }

//delete 

app.delete('/books/:id',async (req,res) => {
    try{
        const deletedBook= await Book.find();
        if(deletedBook) return res.status(404).json({message: 'Book not found'});
        res.json({message: 'Book deleted successfully'});

    }
    catch(error){
        res.status(500).json({message : error.message});
    }

});

app.listen(port,() =>{
    console.log('server is running on http://localhost:($port)');
});

});
