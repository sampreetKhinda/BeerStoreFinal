const mongoose = require('mongoose');
const Beer = require('./model/beerSchema'); // Import the Beer model

// Connect to MongoDB
const uri = "mongodb+srv://Sampreet:SharryKhinda@cluster0.ht9sfw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(error => {
        console.error('Connection error', error);
    });
// Dummy data
const beers = [
  {
    name: 'Pilsner Urquell',
    brand: 'Pilsner Urquell Brewery',
    type: 'Pilsner',
    alcoholContent: 4.4,
    price: 12.99,
    description: 'A classic Czech Pilsner with a crisp and refreshing taste.',
    image: './img/pilsner_urquell.jpeg',
    inStock: true,
    quantity: 100,
  },
  {
    name: 'Guinness Draught',
    brand: 'Guinness',
    type: 'Stout',
    alcoholContent: 4.2,
    price: 14.99,
    description: 'A smooth stout with notes of coffee and chocolate.',
    image: './img/guinness_draught.jpeg',
    inStock: true,
    quantity: 50,
  },
  {
    name: 'Sierra Nevada Pale Ale',
    brand: 'Sierra Nevada Brewing Co.',
    type: 'Ale',
    alcoholContent: 5.6,
    price: 10.99,
    description: 'A hoppy pale ale with citrus and pine flavors.',
    image: './img/sierra_nevada.jpeg',
    inStock: true,
    quantity: 75,
  },
  {
    name: 'Miller Ace',
    brand: 'Miller Ace',
    type: 'Other',
    alcoholContent: 7,
    price: 11.99,
    description: 'Miller Ace American Style Strong Beer.',
    image: './img/miller_beer.jpeg',
    inStock: true,
    quantity: 80,
  }
];

// Insert dummy data into the Beer collection
Beer.insertMany(beers)
  .then(() => {
    console.log('Dummy data inserted successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting dummy data:', err);
    mongoose.connection.close();
  });
