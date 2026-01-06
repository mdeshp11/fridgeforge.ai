# FridgeForge Frontend - Expo React Native App

A cross-platform AI-powered meal planner application built with Expo and React Native, supporting iOS, Android, and Web platforms.

## 📋 Features

- **AI-Powered Image Recognition**: Take photos of your fridge/pantry to detect ingredients
- **Smart Recipe Suggestions**: Get personalized recipe recommendations based on detected ingredients
- **Ingredient Management**: Manual ingredient input with quantity tracking
- **Recipe Details**: Full recipes with ingredients, step-by-step instructions, and nutrition info
- **User Preferences**: Dietary restrictions, allergies, and cuisine preferences
- **Recipe History**: Keep track of past analyses and saved recipes
- **Cross-Platform**: Seamless experience on iOS, Android, and Web

## 🛠 Tech Stack

- **Framework**: Expo 54 with React Native 0.81
- **Routing**: Expo Router for navigation
- **Styling**: Tailwind CSS via nativewind
- **Icons**: Lucide React Native
- **State Management**: React Context + AsyncStorage
- **Camera**: Expo Camera with image picker
- **Async Storage**: Local data persistence

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Setup

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Create tailwind CSS file** (if not present):
```bash
npm run build:tailwind
```

## 🚀 Running the App

### Development

Start the Expo development server:
```bash
npm start
```

Then choose your platform:
- **iOS**: Press `i`
- **Android**: Press `a`
- **Web**: Press `w`

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Web Browser
```bash
npm run web
```

## 📁 Project Structure

```
frontend/
├── app/                          # Expo Router navigation
│   ├── _layout.js               # Root layout with tab navigation
│   ├── (home)/                  # Home tab stack
│   │   ├── _layout.js
│   │   ├── index.js             # Home screen
│   │   ├── camera.js            # Camera/upload screen
│   │   ├── ingredients.js       # Ingredient selection screen
│   │   ├── recipes.js           # Recipe suggestions screen
│   │   └── recipe-detail.js     # Recipe detail screen
│   ├── history.js               # History tab
│   └── profile.js               # Profile tab
├── components/                  # Reusable components
├── context/                     # React Context providers
│   └── FridgeForgeContext.js
├── utils/                       # Utility functions
├── tailwind.config.js           # Tailwind CSS configuration
├── babel.config.js              # Babel configuration
├── app.json                     # Expo configuration
├── package.json
└── global.css                   # Global styles
```

## 🎨 Design System

### Colors

- **Primary Green**: `#4CAF50` - Main brand color
- **Accent Orange**: `#FFA500` - Food/warmth accent
- **Neutral Grays**: `#fafafa` - `#212121` - Text and backgrounds

### Typography

- Bold headings for primary information
- System fonts for optimal performance
- Readable body text sizes (12-16px)

### Components

- Tab-based navigation with icon indicators
- Card-based layouts for recipes and ingredients
- Floating action buttons for primary actions
- Toast-style notifications (can be extended)
- Loading states with spinners

## 🔌 API Integration

The app expects the backend to provide:

### Image Analysis Endpoint
```
POST /api/analyze
Content-Type: multipart/form-data

Body:
- image: <File>

Response:
{
  "ingredients": [
    { "name": "Chicken", "quantity": "2", "unit": "breasts" },
    ...
  ],
  "confidence": 0.92
}
```

### Update to API URL

In `app/(home)/camera.js`, update the API endpoint:
```javascript
const response = await fetch('http://YOUR_API_HOST:PORT/api/analyze', {
  // ...
});
```

## 💾 Local Data Persistence

The app uses AsyncStorage to persist:
- User profile and preferences
- Recipe history
- Favorite recipes
- Dietary restrictions and allergies

## 🔄 Navigation Flow

1. **Home Tab** → "Snap a Fridge Photo" button
2. **Camera Screen** → Capture or upload image
3. **Ingredients Screen** → Review/edit detected ingredients
4. **Recipes Screen** → Browse generated recipe suggestions
5. **Recipe Detail** → View full recipe with instructions & shopping list

Users can also:
- Jump to **History Tab** to see past analyses
- Go to **Profile Tab** to manage preferences

## 📱 Responsive Design

- **Mobile**: Optimized touch targets, vertical layouts, full-width cards
- **Tablet**: Wider layouts with adjusted padding
- **Web**: Responsive grid layouts, sidebar-ready

## 🧪 Testing Features

Mock data is included for:
- Recipe suggestions (4 sample recipes)
- Ingredient lists
- Recipe details with instructions

Remove mock data and connect to real API when backend is ready.

## 🔐 Permissions Required

- **iOS**: Camera, Photo Library
- **Android**: Camera, Read External Storage
- **Web**: File upload capability

Permissions are configured in `app.json` via Expo plugins.

## 🐛 Troubleshooting

### Camera not working
- Ensure camera permissions are granted
- Try the upload option on web platform
- Restart the Expo dev server

### Styles not applying
- Clear cache: `expo start -c`
- Rebuild tailwind: `npm run build:tailwind`
- Check nativewind babel plugin is enabled

### Navigation issues
- Verify Expo Router is properly installed
- Check file naming follows the routing convention
- Restart the development server

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev)
- [Expo Router Guide](https://expo.dev/routing)
- [React Native Docs](https://reactnative.dev)
- [Tailwind CSS for React Native](https://www.nativewind.dev)
- [Lucide Icons](https://lucide.dev)

## 📝 License

MIT License

## 🤝 Contributing

Feel free to submit issues and pull requests to improve the app.

---

Built with ❤️ for better meal planning
