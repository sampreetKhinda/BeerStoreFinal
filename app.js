const express = require("express");
const app = express();
const HTTP_PORT = 8080;
const mongoose = require('mongoose');
const session = require('express-session');
const Beer = require('./model/beerSchema');
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

app.use(session({
  secret: 'beerCart',
  resave: false,
  saveUninitialized: true
}));

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

// Home route
app.get('/', async (req, res) => {
  const  hasItemsInCart = (req.session.cart && req.session.cart.length > 0);
  const type = req.query.type; // Get the type from the query parameters
  let beers;
  try {
    if (type) {
      beers = await Beer.find({ type: type });
    } else {
      beers = await Beer.find({});
    }

    // Get unique beer types for filtering
    const types = await Beer.distinct('type');

    res.render('index', { 
      title: 'Beer Store',  
      beers: beers, 
      types: types, 
      selectedType: type
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/about', (req, res) => {
  const  hasItemsInCart = (req.session.cart && req.session.cart.length > 0);
  res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
  const  hasItemsInCart = (req.session.cart && req.session.cart.length > 0);
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

app.post('/cart/add/:id', async (req, res) => {
  const  hasItemsInCart = (req.session.cart && req.session.cart.length > 0);
  try {
    const beerId = req.params.id;
    const beer = await Beer.findById(beerId);
    if (!beer) {
      return res.status(404).json({ message: 'Beer not found' });
    }
    if (!req.session.cart) {
      req.session.cart = [];
    }
    const existingItem = req.session.cart.find(item => item._id.toString() === beerId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      req.session.cart.push({ ...beer._doc, quantity: 1 });
    }
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/cart', (req, res) => {
  const  hasItemsInCart = (req.session.cart && req.session.cart.length > 0);
  const cart = req.session.cart || [];
  res.render('cart', { cart,  hasItemsInCart });
});

app.post('/cart/update/:id', (req, res) => {
  const  hasItemsInCart = (req.session.cart && req.session.cart.length > 0);
  try {
    const beerId = req.params.id;
    const { quantity } = req.body;

    const cart = req.session.cart || [];
    const item = cart.find(item => item._id.toString() === beerId);

    if (item) {
      item.quantity = parseInt(quantity, 10);
    }
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/cart/remove/:id', (req, res) => {
  const  hasItemsInCart = (req.session.cart && req.session.cart.length > 0);
  try {
    const beerId = req.params.id;

    req.session.cart = req.session.cart.filter(item => item._id.toString() !== beerId);

    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get beer details
app.get('/:id', async (req, res) => {
  const  hasItemsInCart = (req.session.cart && req.session.cart.length > 0);
  try {
    const beer = await Beer.findById(req.params.id);
    if (!beer) {
      return res.status(404).json({ message: 'Beer not found' });
    }
    res.render('beer-detail', { beer });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(HTTP_PORT, () => {
  console.log(`Server is running on http://localhost:${HTTP_PORT}`);
});
