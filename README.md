# Hotel Booking Auth System

This is a simple **Node.js + Express** backend for a hotel booking authentication system.

## Features:
- **User Registration & Login** with JWT Authentication
- **Room Booking System**
- **Admin Panel** to View Bookings

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/hotel-booking-auth.git
   ```

2. Install dependencies:
   ```sh
   cd hotel-booking-auth
   npm install
   ```

3. Set up the `.env` file with your **MongoDB URI** and **JWT Secret**.

4. Run the server:
   ```sh
   npm start
   ```

## API Endpoints

- `POST /register` → Register a user
- `POST /login` → Login and receive a JWT token
- `POST /book` → Book a hotel room
- `GET /admin/bookings` → View all bookings (admin only)

## License
MIT
