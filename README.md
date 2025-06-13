# TrackNFresh - Food Expiry Tracker (Client)

**TrackNFresh** is a web app for Food Expiry Tracker System that helps users manage their food inventory, track expiry dates, and minimize food waste. It provides features such as authentication, food management, expiry tracking, search, filter, pagination, and more — all within a modern and responsive interface.

## 🔗 Live Links
### Client: [TrackNFresh Client](https://tracknfresh.vercel.app)
### Server: [TrackNFresh server](https://track-n-fresh-server.vercel.app)
---

## Features
- Email/password authentication (with Google and Email/password login)
- JWT-protected private routes
- Add, view, update, and delete food items
- Track nearly expired (within 5 days) and expired items
- Countdown timer for food expiry
- Search and filter food items
- Pagination on food list (Fridge page & expired item section)
- Add notes to food (owner only)
- Responsive design (mobile, tablet, desktop)
- Framer Motion animations
- Custom 404 page and loading spinner

---

## Pages Overview

### **Home Page**
- Highlights nearly expired items (within 5 days) and expired items
- Features a banner with slider/carousel and text highlights
- Includes extra sections (e.g., tips for reducing food waste)
- Uses CountUp for displaying statistics (expired / nearly expired counts)

### **Login / Register**
- **Firebase JWT Token based Authentication system** with email & password  
- Supports Google login
- Register page includes validation:  
  - Must contain uppercase, lowercase, and min 6 characters in password
- SweetAlert / Toast for feedback messages

### **My Items Dashboard**
- Private route (JWT protected)
- Displays user’s added food items in a table format
- Actions:
  - Edit / update food details (via modal form)
  - Delete food items (with confirmation dialog)

### **Add Food**
- Private route (JWT protected, only for logged-in users)
- Form to add new food item:
  - Title, category, quantity, expiry date, image, description
- On success, redirects to My Items


### **Fridge Page**
- Public page to browse all foods
- Features:
  - Search by title or category
  - Filter by category (dropdown)
  - Pagination (6 items per page)
  - Badges for expired / nearly expired foods
  - Card layout for quick scanning

### **Food Details**
- Dynamic route: `/food/:id`
- Shows:
  - Food image, name, category, quantity, expiry date, description
  - Expiry countdown timer
  - Notes section (only owner can add)
- Framer Motion animations on load

###  **404 Page**
- Custom not found page for invalid URLs
- Includes friendly message and return home link
- Includes animation / styled fallback


###  **Loading Spinner**
- Global fallback UI during data fetching
- Displays spinner component where appropriate (e.g., page loads, protected route check)

---
## 📁 Project Folder Structure
```
src/
├── components/        # Reusable components (Navbar, Footer, ToggleTheme, etc.)
├── pages/             # Page components (Home, Login, Register, Fridge, AddFood, MyItems, FoodDetails, NotFound)
├── hooks/             # Custom hooks (e.g., useAxiosSecure)
├── routes/            # Route configuration
├── Firebase/          # Firebase config
├── layout/            # Shared layout components(root)
├── Provider/          # AuthProvider for managing auth state
└── main.jsx           # App entry point
```
---
## Tech Stack
- React 
- React Router DOM
- TailwindCSS + DaisyUI
- JWT - Auth token handling
- Axios
- Framer Motion
- Lottie JSON-based animation
- SweetAlert2 / Toast for notifications
- React CountUp
- Firebase Authentication (Email/Password + Google)

---

## How to Install & Run Locally

Follow these steps to run the project on your local machine:

1. Clone the Repository

```sh
git clone git@github.com:Shahriar-Utchas/TrackNFresh-client.git
```
2. Go to the project folder ```cd TrackNFresh-client```
3. Install Project Dependencies
```sh
npm install
```
4. Set Up Firebase Environment Variables : Create a .env file in the root directory and add:
```sh
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_id
VITE_APP_ID=your_app_id
```
5. Start the development server ```npm run dev```
6. Open your browser and visit: http://localhost:5173

## 🔗 Server-Side Repository

To see the backend/server-side of this project, visit:  [**TrackNFresh Server-Side Repository**](https://github.com/Shahriar-Utchas/TrackNFresh-server)
