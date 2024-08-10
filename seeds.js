const mongoose = require('mongoose');
const Beer = require('./model/beerSchema'); 
const User = require('./model/userSchema');
const Category = require('./model/categorySchema');
const bcrypt = require('bcrypt');

// Connect to MongoDB
const uri = "mongodb+srv://Sampreet:SharryKhinda@cluster0.ht9sfw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        seedAdmin();
        //seedCategories();
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
/*Beer.insertMany(beers)
  .then(() => {
    console.log('Dummy data inserted successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting dummy data:', err);
    mongoose.connection.close();
  });
  */

  // Insert admin to the db
  async function seedAdmin() {
    try {
      const email = 'admin@admin.com'; // Change this to your desired admin email
      const password = 'admin'; // Change this to your desired admin password
      const isAdmin = true;
  
      // Check if the admin user already exists
      const existingAdmin = await User.findOne({ email });
  
      if (existingAdmin) {
        console.log('Admin user already exists');
      } else {
        // Create the admin user
        const admin = new User({
          email,
          password: password,
          isAdmin: isAdmin,
        });

        await admin.save();
        console.log('Admin user created successfully');
      }
    } catch (err) {
      console.error('Error seeding admin user', err);
    } finally {
      mongoose.connection.close();
    }
  }

  const categories = [
    { name: 'Lager' },
    { name: 'Ale' },
    { name: 'Stout' },
    { name: 'Porter' },
    { name: 'Pilsner' },
    { name: 'Wheat' },
    { name: 'Sour' },
    { name: 'Other' }
  ];
  
  // Seeding categories into the database
  async function seedCategories() {
    try {
      // Check if categories already exist
      const existingCategories = await Category.find();
  
      if (existingCategories.length > 0) {
        console.log('Categories already exist');
      } else {
        await Category.insertMany(categories);
        console.log('Categories seeded successfully');
      }
    } catch (err) {
      console.error('Error seeding categories', err);
    } finally {
      mongoose.connection.close(); // Close the connection
    }
  }