# Beer Store E-commerce Website

Welcome to the Beer Store E-commerce Website repository! This project is a full-stack web application built using NodeJS for the backend, Angular for the frontend, and MongoDB (Atlas) for the database.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [DataBase](#database)
- [Installation](#installation)
- [TestCases](#test-cases)



## Project Overview

The Beer Store E-commerce Website is designed to provide users with a seamless online shopping experience for various types of beers. Users can browse different beer categories, view detailed information about each beer, add items to their cart, and proceed to checkout.

## Features

- Search for beers
- View detailed beer information
- Add beers to the shopping cart
- Checkout process
- Admin panel for managing beers and Category

## Technologies Used

- **Frontend:** Express, ejs
- **Backend:** NodeJS
- **Database:** MongoDB (Atlas)
- **Styling:** Bootstrap, CSS

### Prerequisites

Make sure you have the following installed on your machine:
- **NodeJS**
- **npm (Node Package Manager)**
- **Express**
- **MongoDB Atlas account**

## Getting Started


## Installation

### 1. Set Up the Project
**Clone the repository:**
    ```bash
    git clone https://github.com/sampreetKhinda/BeerStoreFinal.git
    cd BeerStoreFinal
    ```

### 2. Install Dependencies
1. **Install Express.js:**
    ```bash
    npm install express ejs
    ```

2. **Install Mongoose:**
    ```bash
    npm install mongoose
    ```

3. **Install Body-Parser:**
    ```bash
    npm install body-parser 
    ```
4. **Install Express-Session**
    ```bash
    npm install express-session
    ```


### 3. Run the Application
1. **Start the server:**
    ```bash
    node app.js
    ```

2. **Open your browser** and navigate to `http://localhost:8080/` to see your application in action.

### Basic Database Schema for Beer Table

| Column Name     | Data Type     | Constraints           | Description                          |
|-----------------|---------------|-----------------------|--------------------------------------|
| id              | INT           | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each beer|
| name            | VARCHAR(255)  | NOT NULL              | Name of the beer                     |
| brand           | VARCHAR(255)  | NOT NULL              | Brand or brewery of the beer         |
| type            | VARCHAR(50)   | NOT NULL              | Type of beer (Lager, Ale, etc.)      |
| alcohol_content | DECIMAL(4,2)  | NOT NULL              | Alcohol by Volume (ABV) percentage   |
| price           | DECIMAL(10,2) | NOT NULL              | Price of the beer                    |
| description     | TEXT          |                       | Description of the beer              |
| in_stock        | BOOLEAN       | DEFAULT TRUE          | Whether the beer is in stock         |
| image           | VARCHAR(255)  | NOT NULL              | Image path                           |
| quantity        | INT           | DEFAULT 0             | Beer quantity in stock               |

### Basic Database Schema for User Table

| Column Name | Data Type     | Constraints           | Description                          |
|-------------|---------------|-----------------------|--------------------------------------|
| id          | INT           | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each user|
| email       | VARCHAR(255)  | NOT NULL, UNIQUE      | Username of the user                 |
| password    | VARCHAR(255)  | NOT NULL              | Encripted password of the user       |
| is_admin    | BOOLEAN       | DEFAULT FALSE         | Whether the user is an admin         |
|-------------|---------------|-----------------------|--------------------------------------|


### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sampreetKhinda/BeerStoreFinal.git
    cd beer-store-ecommerce
    ```
2. **Setup Mongo Db**
  
  * Change 'uri = "mongodb+srv://Sampreet:SharryKhinda@cluster0.ht9sfw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";' in app.js on line no 13 .

## Test Cases

### Beer Category Browsing

**Test Case ID**: TC001  
**Test Scenario**: Verify that users can browse beer categories.  
**Steps**:  
1. Navigate to the index or home page.
2. Select a specific beer category from Filter by Category:.  
**Expected Result**: The page should display all beers within the selected category.

### View Detailed Beer Information

**Test Case ID**: TC002  
**Test Scenario**: Verify that users can view detailed information about a specific beer.  
**Steps**:  
1. Click on a view detail button from the list of available beers.  
**Expected Result**: The beer detail page should display the name, description, price, alcohol content, and other relevant information.

### Add Beer to Shopping Cart

**Test Case ID**: TC003  
**Test Scenario**: Verify that users can add a beer to their shopping cart.  
**Steps**:  
1. View the detailed information of a beer.
2. Click the "Add to Cart" button.  
**Expected Result**: The beer should be added to the shopping cart, and the cart should update accordingly.

### View Shopping Cart

**Test Case ID**: TC004  
**Test Scenario**: Verify that users can view the contents of their shopping cart.  
**Steps**:  
1. Add one or more beers to the shopping cart.
2. Click on the cart in header menu.  
**Expected Result**: The shopping cart should display all added beers, their quantities, and the total price.

### Checkout Process

**Test Case ID**: TC005  
**Test Scenario**: Verify that users can successfully complete the checkout process.  
**Steps**:  
1. Add beers to the shopping cart.
2. Proceed to checkout.
3. Enter necessary billing and shipping information.
4. Confirm the purchase.  
**Expected Result**: The order should be successfully placed, and the user should receive an order Summary.

### Admin Panel Access

**Test Case ID**: TC006  
**Test Scenario**: Verify that authorized users can access the admin panel.  
**Steps**:  
1. Log in as an admin.
2. Click on the Admin Dasboard link in header Menu.  
**Expected Result**: The admin should be redirected to the admin panel dashboard.

### Add New Beer via Admin Panel

**Test Case ID**: TC007  
**Test Scenario**: Verify that admins can add a new beer to the inventory.  
**Steps**:  
1. Log in as an admin and navigate to the admin panel.
2. Select Manage product.
3. Select the option to add new Item.
4. Enter all required beer details.
5. Save the new beer entry.  
**Expected Result**: The new beer should be added to the inventory and visible in the relevant category on the website.

### Edit Beer Information via Admin Panel

**Test Case ID**: TC008  
**Test Scenario**: Verify that admins can edit the information of an existing beer.  
**Steps**:  
1. Log in as an admin and navigate to the admin panel.
2. Click on Manage Produt button.
2. Click on edit button in the list of existing beer to edit.
3. Modify the necessary information.
4. Save the changes.  
**Expected Result**: The updated beer information should be reflected on the index.

### Remove Beer from Cart

**Test Case ID**: TC009  
**Test Scenario**: Verify that users can remove a beer from their shopping cart.  
**Steps**:  
1. Add a beer to the shopping cart.
2. View the shopping cart.
3. Click the "Remove" button next to the beer.  
**Expected Result**: The selected beer should be removed from the cart, and the cart total should update accordingly.

### Update Quantity in Cart

**Test Case ID**: TC010  
**Test Scenario**: Verify that users can update the quantity of a beer in their shopping cart.  
**Steps**:  
1. Add a beer to the shopping cart.
2. View the shopping cart.
3. Change the quantity of the beer. 
4. Click update next to the quantity. 
**Expected Result**: The cart should update to reflect the new quantity, and the total price should be adjusted accordingly.