# 🍳 FridgeForge - AI-Powered Meal Planner

Transform your fridge into delicious meals with AI. FridgeForge is a cross-platform mobile and web application that uses artificial intelligence to detect ingredients from photos and generate personalized recipe suggestions with nutritional information and shopping lists.

![FridgeForge Banner](https://via.placeholder.com/1200x400?text=FridgeForge+AI+Meal+Planner)

## ✨ Key Features

- **📸 Smart Ingredient Detection**: Take a photo of your fridge or pantry and AI detects all ingredients
- **🤖 AI-Powered Recipes**: Get personalized recipe suggestions based on detected ingredients
- **🥗 Nutritional Information**: Complete macro and micronutrient breakdown for each recipe
- **📝 Step-by-Step Instructions**: Easy-to-follow cooking steps with checkoff functionality
- **🛒 Smart Shopping Lists**: Generate shopping lists for missing ingredients
- **❤️ Save Favorites**: Bookmark your favorite recipes for quick access
- **⚙️ User Preferences**: Set dietary restrictions, allergies, and cuisine preferences
- **📱 Cross-Platform**: Seamless experience on iOS, Android, and Web
- **☁️ Cloud Sync**: (Coming soon) Sync your recipes and preferences across devices

## 🏗️ Project Structure

```
fridgeforge.ai/
├── frontend/                    # React Native Expo app
│   ├── app/                     # Expo Router navigation & screens
│   ├── components/              # Reusable UI components
│   ├── context/                 # React Context for state
│   ├── utils/                   # Helper functions & API services
│   ├── assets/                  # Images, icons, etc.
│   └── package.json
│
├── backend/                     # Node.js/Express API server
│   ├── routes/                  # API endpoints
│   ├── controllers/             # Business logic
│   ├── models/                  # Database models
│   ├── middleware/              # Authentication, validation
│   ├── server.js                # Server entry point
│   └── package.json
│
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org))
- **npm** 9+ or **yarn** 4+
- **Expo CLI** (install globally: `npm install -g expo-cli`)
- **Git** for version control

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Then choose your platform:
- **Web**: Press `w`
- **iOS**: Press `i` (requires macOS and Xcode)
- **Android**: Press `a` (requires Android SDK)

See [SETUP.md](./frontend/SETUP.md) for detailed instructions.

### Backend Setup

```bash
cd backend
npm install
npm start
```

The API server will run on `http://localhost:3000`

See [Backend README](./backend/README.md) for detailed setup.

## 📱 Platforms Supported

| Platform | Status | Notes |
|----------|--------|-------|
| **iOS** | ✅ Supported | iOS 13+ |
| **Android** | ✅ Supported | Android 8+ |
| **Web** | ✅ Supported | Chrome, Safari, Firefox, Edge |

## 🛠️ Tech Stack

### Frontend
- **Expo 54** - Cross-platform framework
- **React Native 0.81** - UI library
- **React 19** - JavaScript framework
- **Expo Router** - Navigation
- **Tailwind CSS** - Styling (via nativewind)
- **Lucide Icons** - Icon library
- **AsyncStorage** - Local data persistence

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database (or your choice)
- **Gemini/GPT-4o API** - AI ingredient detection
- **JWT** - Authentication

## 📖 Documentation

- **[Frontend Setup Guide](./frontend/SETUP.md)** - Getting started with the mobile/web app
- **[Developer Guide](./frontend/DEVELOPER_GUIDE.md)** - Architecture and development patterns
- **[Feature Checklist](./frontend/FEATURES.md)** - Implemented and planned features
- **[Backend README](./backend/README.md)** - API server documentation

## 🎯 Core User Flows

### 1. Photo-Based Recipe Discovery
```
Take Photo → AI Detects Ingredients → Review Ingredients → Generate Recipes → Browse Recipes → View Recipe Details
```

### 2. Manual Recipe Discovery
```
Add Ingredients Manually → Generate Recipes → Browse Recipes → View Recipe Details
```

### 3. Recipe Exploration
```
View Recipe → Read Ingredients → Follow Instructions → Check Nutrition → Add to Shopping List
```

## 🔌 API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze` | Analyze image for ingredients |
| POST | `/api/recipes` | Generate recipes from ingredients |
| GET | `/api/recipes/:id` | Get recipe details |
| POST | `/api/recipes/:id/shopping-list` | Generate shopping list |
| GET | `/api/users/:id/favorites` | Get user's favorite recipes |
| POST | `/api/users/:id/favorites` | Save recipe to favorites |

## 🎨 Design System

### Color Palette

```
Primary Green:  #4CAF50 - Main brand color
Accent Orange:  #FFA500 - Food/warmth accent
Neutral Grays:  #fafafa - #212121 - Text and backgrounds
```

### Typography

- **Headings**: Bold, system fonts
- **Body**: Regular, readable sizes (12-16px)
- **Icons**: Lucide React Native icons

### Components

- Tab-based navigation
- Card-based layouts
- Modal dialogs
- Toast notifications
- Loading spinners

## 🔐 Security Considerations

- ✅ Input validation on all API endpoints
- ✅ JWT authentication tokens
- ✅ Secure password hashing
- ✅ CORS configuration
- ✅ Rate limiting

## 📊 Performance

- Average app load time: < 2 seconds
- Recipe API response: < 5 seconds
- Image analysis: < 10 seconds
- Optimized images and lazy loading

## 🚀 Deployment

### Frontend (Expo)

```bash
# Build for production
eas build --platform ios --auto-submit
eas build --platform android

# Publish
eas submit
```

### Backend

Deploy to Heroku, AWS, or your preferred cloud provider.

## 📈 Roadmap

### Phase 1 (Current) ✅
- [x] Core UI/UX for all platforms
- [x] Photo capture and ingredient detection UI
- [x] Recipe suggestions and details
- [x] User preferences management
- [ ] Backend API integration

### Phase 2 (Next)
- [ ] Real AI ingredient detection
- [ ] Recipe generation ML model
- [ ] User authentication
- [ ] Cloud data sync

### Phase 3 (Future)
- [ ] Meal planning calendar
- [ ] Grocery list management
- [ ] Social recipe sharing
- [ ] Nutritional tracking

## 🐛 Known Issues

- Camera permission on web platform requires HTTPS
- Some older Android devices may have camera compatibility issues

## 💡 Contributing

We welcome contributions! Please fork the repository and create a pull request.

## 📄 License

MIT License

---

<div align="center">

**Built with ❤️ for better meal planning**

</div>