# Beer Store E-commerce Website

Welcome to the Beer Store E-commerce Website repository! This project is a full-stack web application built using NodeJS for the backend, Angular for the frontend, and MongoDB (Atlas) for the database.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [DataBase](#database)
- [Installation](#installation)



## Project Overview

The Beer Store E-commerce Website is designed to provide users with a seamless online shopping experience for various types of beers. Users can browse different beer categories, view detailed information about each beer, add items to their cart, and proceed to checkout.

## Features

- Search for beers
- View detailed beer information
- Add beers to the shopping cart
- Checkout process
- Order history
- Admin panel for managing beers and orders

## Technologies Used

- **Frontend:** Express, ejs
- **Backend:** NodeJS
- **Database:** MongoDB (Atlas)
- **Styling:** Bootstrap, CSS

### Prerequisites

Make sure you have the following installed on your machine:

- NodeJS
- npm (Node Package Manager)
- express
- MongoDB Atlas account

### Project setup
1. ```bash
    npm install express mongoose body-parser express-session ejs bcrypt
    ```

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

