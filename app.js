const express = require("express");
const app = express();
const HTTP_PORT = 8080;
const mongoose = require('mongoose');
const session = require('express-session');
const Beer = require('./model/beerSchema');
const bodyParser = require('body-parser');
const User = require('./model/userSchema');
const Category = require('./model/categorySchema');

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
      selectedType: type,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/about', (req, res) => {
  
  res.render('about', { title: 'About',  user: req.session.user });
});

app.get('/contact', (req, res) => {
  
  res.render('contact', { title: 'Contact',  user: req.session.user });
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
  res.render('cart', { cart,  user: req.session.user,  hasItemsInCart });
});

app.post('/cart/update/:id', (req, res) => {

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
  try {
    const beerId = req.params.id;

    req.session.cart = req.session.cart.filter(item => item._id.toString() !== beerId);

    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// Admin login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(401).render('login', { error: 'Invalid email or password',  user: req.session.user });
    }

    const isMatch =  password === user.password;

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).render('login', { error: 'Invalid email or password',  user: req.session.user });
    }
    req.session.user = user;
    req.session.isAdmin = user.isAdmin; // Set session flag for admin access
    console.log('Login successful');
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server Error');
  }
});


// Admin dashboard route
app.get('/admin/dashboard', async (req, res) => {
  if (req.session.isAdmin) {
    res.render('dashboard', {user: req.session.user});
  } else {
    res.render('login', { user: req.session.user});
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login', { user: req.session.user});
});

/*app.post('/login', async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).render('login', { error: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).render('login', { error: 'Invalid email or password' });
  }

  req.session.user = user;
  res.redirect('/');
});*/

app.get('/checkout', (req, res) => {
  const cart = req.session.cart || [];

  res.render('checkout', {
    cart,
    user: req.session.user
  });
});

app.post('/order-summary', (req, res) => {
  const { name, email, address, city, state, zip } = req.body;
  const cart = req.session.cart || [];

  res.render('order-summary', {
    name,
    email,
    address,
    city,
    state,
    zip,
    cart,
    user: req.session.user
  });
});

app.post('/order-confirmation', (req, res) => {
  req.session.cart = [];
  res.redirect('/');
});

// Get beer details
app.get('/:id', async (req, res) => {
  try {
    const beer = await Beer.findById(req.params.id);
    if (!beer) {
      return res.status(404).json({ message: 'Beer not found' });
    }
    res.render('beer-detail', { beer,  user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


app.get('/admin/products', async (req, res) => {
  try {
    const items = await Beer.find().populate('category');
    res.render('products', { items ,  user: req.session.user});
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

app.get('/admin/product/create', async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('new-product', {categories,  user: req.session.user});
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

app.post('/admin/products/create', async (req, res) => {
  try {
    console.log("-->"+req.body.name)
    const item = new Beer({
      name: req.body.name,
      brand: req.body.brand,
      type: req.body.type,
      alcoholContent: req.body.alcoholContent,
      price: req.body.price,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : '',
      quantity: req.body.quantity,
      inStock: req.body.quantity > 0,
    });
    await item.save();
    res.redirect('/');
  } catch (error) {
    console.log("error ->"+error);
    res.status(400).send('Error creating item');
  }
});

app.get('/admin/product/edit/:id', async (req, res) => {
  try {
    const beer = await Beer.findById(req.params.id);
    const categories = await Category.find();
    if (!beer) {
      return res.status(404).send('product not found');
    }
    res.render('edit-product', { beer, categories,  user: req.session.user });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

app.post('/admin/products/edit/:id', async (req, res) => {
  try {
   
    const result = await Beer.findByIdAndUpdate(req.params.id, {name: req.body.name,
      type: req.body.type,
      alcoholContent: req.body.alcoholContent,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      quantity : req.body.quantity}, { new: true, runValidators: true });

    if (!result) {
      return res.status(404).send('Item not found');
    }

    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log("error->"+error);
    res.status(400).send('Error updating item');
  }
});

app.post('/admin/product/delete/:id', async (req, res) => {
  try {
    await Beer.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log("error->"+error);
    res.status(400).send('Error deleting item');
  }
});

app.get('/admin/manage-category', async(req,res) =>{
  const categories = await Category.find();
  res.render('manage-category',{categories, user: req.session.user});
});

app.get('/admin/manage-products', async(req,res) =>{
  const items = await Beer.find();
  res.render('manage-products',{items, user: req.session.user});
});

// Create a new category
app.post('/admin/categories/create', async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.redirect('/admin/manage-category');
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send('Error creating category');
  }
});

// Get all categories
app.get('/admin/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Error fetching categories');
  }
});

// Edit a category
app.post('/admin/categories/edit/:id', async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, { name: req.body.name });
    res.redirect('/admin/manage-category');
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send('Error updating category');
  }
});

// Delete a category
app.post('/admin/categories/delete/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/admin/manage-category');
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).send('Error deleting category');
  }
});

app.listen(HTTP_PORT, () => {
  console.log(`Server is running on http://localhost:${HTTP_PORT}`);
});
