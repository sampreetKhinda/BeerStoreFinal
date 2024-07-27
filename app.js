const express = require("express");
const app = express();
const HTTP_PORT = 8080;
const mongoose = require('mongoose');
const Beer = require('./model');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const uri = "mongodb+srv://Sampreet:SharryKhinda@cluster0.ht9sfw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(error => {
        console.error('Connection error', error);
    });
    
// POST /items: Add a new item to the collection
app.post('/items', async (req, res) => {
    try {
      const newBeer = new Beer(req.body);
      const savedBeer = await newBeer.save();
      res.status(201).json(savedBeer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // GET /items: Retrieve all items from the collection
  app.get('/items', async (req, res) => {
    try {
      const beers = await Beer.find();
      res.json(beers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // GET /items/:id: Retrieve a single item by its ID
  app.get('/items/:id', async (req, res) => {
    try {
      const beer = await Beer.findById(req.params.id);
      if (!beer) {
        return res.status(404).json({ message: 'Beer not found' });
      }
      res.json(beer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // PUT /items/:id: Update an item by its ID
  app.put('/items/:id', async (req, res) => {
    try {
      const updatedBeer = await Beer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedBeer) {
        return res.status(404).json({ message: 'Beer not found' });
      }
      res.json(updatedBeer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE /items/:id: Delete an item by its ID
  app.delete('/items/:id', async (req, res) => {
    try {
      const deletedBeer = await Beer.findByIdAndDelete(req.params.id);
      if (!deletedBeer) {
        return res.status(404).json({ message: 'Beer not found' });
      }
      res.json({ message: 'Beer deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

app.post('/send-message', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
  
    console.log(`Received message from ${name} (${email}): ${message}`);
    // Here, you can handle the message, e.g., save it to a database or send an email
    res.send('Message received! Thank you for contacting us.');
  });

app.listen(HTTP_PORT, () => {
  console.log(`Server is running on http://localhost:${HTTP_PORT}`);
});
