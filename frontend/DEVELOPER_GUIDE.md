# FridgeForge Frontend - Developer Guide

## 🎯 Getting Started

This guide will help you understand the FridgeForge app structure and how to extend it.

## 📂 Architecture Overview

### Navigation Structure (Expo Router)

```
app/
├── _layout.js                    # Root layout with tab navigation
├── (home)/                       # Home tab group
│   ├── _layout.js               # Stack navigator for home flows
│   ├── index.js                 # Home screen
│   ├── camera.js                # Camera/photo upload
│   ├── ingredients.js           # Ingredient selection
│   ├── recipes.js               # Recipe suggestions
│   └── recipe-detail.js         # Recipe details
├── history.js                   # History tab (directly under tabs)
└── profile.js                   # Profile tab (directly under tabs)
```

### File Structure

- **`app/`**: Expo Router navigation and screens
- **`components/`**: Reusable UI components
- **`context/`**: React Context for state management
- **`utils/`**: Helper functions and API services
- **`assets/`**: Images, icons, and static files

## 🧩 Key Components

### Reusable Components (in `components/index.js`)

```javascript
<PrimaryButton title="Action" onPress={handlePress} />
<SecondaryButton title="Alternative" onPress={handlePress} />
<Card onPress={handlePress}>
  <Text>Card content</Text>
</Card>
<Badge label="Easy" variant="success" />
<EmptyState icon={Icon} title="No data" message="Try again" />
<LoadingState message="Loading..." />
```

## 🎨 Styling with Tailwind

The app uses nativewind for Tailwind CSS support in React Native.

### Example Usage

```javascript
<View className="flex-1 bg-neutral-50 px-6 py-4">
  <Text className="font-bold text-2xl text-neutral-900">Title</Text>
</View>
```

### Available Classes

- **Colors**: `primary`, `accent`, `neutral` (50-900 variants)
- **Spacing**: `p-`, `m-`, `px-`, `py-` (standard Tailwind units)
- **Typography**: `font-bold`, `font-semibold`, `text-xl`, etc.
- **Layout**: `flex-1`, `flex-row`, `items-center`, `justify-center`, etc.
- **Borders**: `border`, `rounded-xl`, `border-neutral-200`, etc.

## 💾 State Management

### Using React Context

The app uses `FridgeForgeContext` for global state:

```javascript
import { useFridgeForge } from '@/context/FridgeForgeContext';

export default function MyComponent() {
  const { userProfile, saveRecipe, updateUserProfile } = useFridgeForge();
  
  // Use context values
}
```

### Context Methods

- `saveRecipe(recipe)` - Add recipe to history
- `updateUserProfile(updates)` - Update user preferences
- `setAnalyzedIngredients(ingredients)` - Store detected ingredients

### Local Storage with AsyncStorage

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
await AsyncStorage.setItem('key', JSON.stringify(data));

// Get data
const data = await AsyncStorage.getItem('key');
const parsed = JSON.parse(data);
```

## 🔌 API Integration

### Making API Calls

Use the API service from `utils/api.js`:

```javascript
import { analyzeImage, generateRecipes } from '@/utils/api';

// Analyze an image
const result = await analyzeImage(imageUri);

// Generate recipes
const recipes = await generateRecipes(ingredients, userPreferences);
```

### API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze` | Analyze image for ingredients |
| POST | `/api/recipes` | Generate recipes |
| GET | `/api/recipes/:id` | Get recipe details |
| POST | `/api/recipes/:id/shopping-list` | Get shopping list |

## 📱 Navigation Patterns

### Navigating Between Screens

```javascript
import { useRouter } from 'expo-router';

const router = useRouter();

// Simple navigation
router.push('/(home)/recipes');

// Navigate with params
router.push({
  pathname: '/(home)/recipe-detail',
  params: { recipeId: '123' },
});

// Go back
router.back();
```

### Accessing Route Parameters

```javascript
import { useRoute } from 'expo-router';

const route = useRoute();
const { recipeId } = route.params;
```

## 🎨 Design System

### Color Palette

```
Primary Green:
- 50: #f0f7f0
- 500: #4CAF50
- 700: #388e3c

Accent Orange:
- 50: #fff8f0
- 500: #FFA500

Neutral Grays:
- 50: #fafafa
- 900: #212121
```

### Typography Scale

- **Display**: 32px, bold
- **Heading 1**: 24px, bold
- **Heading 2**: 20px, bold
- **Body**: 16px, regular
- **Small**: 14px, regular
- **Tiny**: 12px, regular

### Spacing Scale

Using standard Tailwind scale: `0, 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32...`

## ✨ Adding a New Screen

### Step 1: Create the screen file

```javascript
// app/(home)/new-screen.js
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function NewScreen() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="px-6 py-4">
        <Text className="font-bold text-2xl text-neutral-900">New Screen</Text>
      </View>
    </SafeAreaView>
  );
}
```

### Step 2: Update the layout navigation

The navigation is automatically handled by Expo Router based on file names.

### Step 3: Navigate to the screen

```javascript
router.push('/(home)/new-screen');
```

## 🔄 Working with Forms

### Example Form with Validation

```javascript
import { useState } from 'react';
import { InputField, PrimaryButton } from '@/components';

export default function FormScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill all fields');
      return;
    }
    // Submit form
  };

  return (
    <View className="flex-1 px-6 py-6">
      <InputField
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <InputField
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
        className="mt-4"
      />
      <PrimaryButton
        title="Submit"
        onPress={handleSubmit}
        className="mt-6"
      />
    </View>
  );
}
```

## 🧪 Testing Tips

### Testing Navigation

```javascript
// Use router methods to test navigation flows
router.push('/(home)/camera');
router.push({
  pathname: '/(home)/recipe-detail',
  params: { recipe: JSON.stringify(mockRecipe) },
});
```

### Testing with Mock Data

Mock data is already included in:
- `app/(home)/recipes.js` - `MOCK_RECIPES`
- `app/(home)/recipe-detail.js` - `RECIPE_DETAILS`

Replace mock data with API calls when ready.

### Debugging

```javascript
// Enable Expo dev client debugging
import * as Sentry from "sentry-expo";

// Log navigation
useEffect(() => {
  console.log('Route params:', route.params);
}, [route.params]);
```

## 🚀 Performance Optimization

### Image Loading

```javascript
// Use Image component with proper sizing
<Image
  source={{ uri: photo.uri }}
  className="w-full h-64"
  resizeMode="cover"
/>
```

### List Optimization

```javascript
// Use FlatList for large lists
import { FlatList } from 'react-native';

<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemComponent item={item} />}
/>
```

### Avoid Unnecessary Re-renders

```javascript
// Use useCallback for event handlers
import { useCallback } from 'react';

const handlePress = useCallback(() => {
  // Handle press
}, []);
```

## 📚 Helpful Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [nativewind](https://www.nativewind.dev)
- [Lucide Icons](https://lucide.dev)

## 🐛 Common Issues

### Issue: Styles not applying

**Solution**: Clear cache with `expo start -c`

### Issue: Navigation not working

**Solution**: Verify file paths follow Expo Router conventions (use underscores for groups, hyphens for routes)

### Issue: AsyncStorage not persisting

**Solution**: Ensure you're calling `await AsyncStorage.setItem()` correctly with proper JSON serialization

## 📝 Code Style

- Use functional components with hooks
- Use descriptive variable names
- Keep components focused and single-responsibility
- Add comments for complex logic
- Use TypeScript (optional upgrade)

---

Happy coding! 🎉
