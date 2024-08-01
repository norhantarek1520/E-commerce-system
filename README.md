# E-Commerce System Backend (Node.js, Express, JWT, MongoDB)
![shopping](https://github.com/user-attachments/assets/49830c04-dc5a-4241-8d18-c292d51ce3d0)

This project provides a robust backend API for an e-commerce system built using Node.js, Express, JWT for authentication, and MongoDB for data persistence.

# Key Features
## User Management:
   - User registration with secure password hashing (bcrypt).
   - User login with JWT token generation for authentication.
   - User profile management (update name, email, etc.).
   - Admin functionalities like user deletion (optional).
## Product Management:
   - Product creation with details like name, price, stock, and (optionally) images.
   - Product updates with features like price changes and stock management.
   - Product deletion (for administrators).
   - Product retrieval for browsing and searching (optional).
## Category & Subcategory Management:
   - Create and manage categories for product organization.
   - Define subcategories for further product classification.
   - Coupon Management:
   - Create and manage coupon codes for discounts and promotions.
## Wishlist Management:
   - Allow users to add and manage their wishlists for desired products.
## Order Management:
   - Handle order creation, processing, and management (functionality details dependent on your implementation).
   (Optional) Integrate with a payment gateway for online transactions.
## Cart Management:
   - Allow users to add, remove, and manage items in their shopping cart.
## Reviews & Ratings:
   - Implement a system for users to leave reviews and ratings on products (optional).
## Security:
   - JWT-based authentication for secure access to APIs.
   - Password hashing for secure user credentials storage.
     
# Getting Started
1. Prerequisites:
     - Node.js and npm (or yarn) installed on your system.
     - A MongoDB database instance running.
2. Clone the Repository:
    Bash
     `clone git+https://github.com/norhantarek1520/E-commerce-system.git`  
3. Install Dependencies:   
    - Bash
    `cd E-commerce-system`
    - `npm install`
4. Environment Variables:
   -  Create a .env file in the project root directory and define any environment variables needed, such as your MongoDB connection string and JWT secret.
5. Run the Server:
    Bash
    `npm start`
