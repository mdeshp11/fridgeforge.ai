# ⚡ FridgeForge Quick Reference

## 🚀 Get Started in 3 Minutes

### 1️⃣ Install
```bash
cd frontend
npm install
```

### 2️⃣ Run
```bash
npm start
```

### 3️⃣ Choose Platform
- **Web**: Press `w`
- **iOS**: Press `i`
- **Android**: Press `a`

---

## 📱 App Navigation

```
Bottom Tabs:
├── 🏠 Home
│   ├── Home Screen
│   ├── Camera Screen
│   ├── Ingredients Screen
│   ├── Recipes Screen
│   └── Recipe Detail Screen
├── 📜 History
└── ⚙️ Profile
```

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `app/_layout.js` | Tab navigation |
| `app/(home)/index.js` | Home screen |
| `app/(home)/camera.js` | Photo capture |
| `app/(home)/ingredients.js` | Ingredient selector |
| `app/(home)/recipes.js` | Recipe list |
| `app/(home)/recipe-detail.js` | Recipe full view |
| `app/history.js` | Past recipes |
| `app/profile.js` | User settings |
| `components/index.js` | Reusable components |
| `utils/api.js` | API methods |
| `context/FridgeForgeContext.js` | State management |

---

## 🎨 Styling

### Use Tailwind Classes
```javascript
<View className="flex-1 bg-neutral-50 px-6 py-4">
  <Text className="font-bold text-2xl text-neutral-900">
    My Title
  </Text>
</View>
```

### Colors Available
```
primary-50 to primary-900    // Green
accent-50 to accent-900      // Orange
neutral-50 to neutral-900    // Grays
```

---

## 🧩 Reusable Components

### Buttons
```javascript
<PrimaryButton title="Submit" onPress={handlePress} />
<SecondaryButton title="Cancel" onPress={handlePress} />
```

### Cards
```javascript
<Card onPress={() => {}}>
  <Text>Card content</Text>
</Card>
```

### Badges
```javascript
<Badge label="Easy" variant="success" />
```

### Empty State
```javascript
<EmptyState
  icon={Icon}
  title="No Data"
  message="Try again"
  actionLabel="Retry"
  onAction={handleRetry}
/>
```

---

## 🔌 API Integration

### Connect to Backend
1. Update API URL in `utils/api.js`:
```javascript
const API_BASE_URL = 'http://your-api.com';
```

2. Import and use API methods:
```javascript
import { analyzeImage, generateRecipes } from '@/utils/api';

const result = await analyzeImage(imageUri);
```

---

## 💾 Local Storage

### Save Data
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('key', JSON.stringify(data));
```

### Get Data
```javascript
const data = await AsyncStorage.getItem('key');
const parsed = JSON.parse(data);
```

---

## 🔄 Navigation

### Go to Screen
```javascript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/(home)/recipes');
```

### With Parameters
```javascript
router.push({
  pathname: '/(home)/recipe-detail',
  params: { recipeId: '123' },
});
```

### Get Parameters
```javascript
import { useRoute } from 'expo-router';

const route = useRoute();
const { recipeId } = route.params;
```

---

## 🧪 Mock Data

Mock data is included in these files:
- `app/(home)/recipes.js` - `MOCK_RECIPES`
- `app/(home)/recipe-detail.js` - `RECIPE_DETAILS`

Replace with API calls when ready.

---

## 🎯 Common Tasks

### Add a New Screen
1. Create `app/(home)/new-screen.js`
2. Import components and hooks
3. Navigation works automatically

### Style a Component
1. Add Tailwind classes: `className="px-4 py-2 rounded-lg"`
2. Use predefined colors from design system
3. Check `tailwind.config.js` for available values

### Add a State Variable
1. Use `useState` hook
2. Or use `useFridgeForge()` for global state
3. Save to AsyncStorage if persistent needed

### Connect to API
1. Add method in `utils/api.js`
2. Import in component
3. Call with error handling

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `SETUP.md` | Installation & running |
| `DEVELOPER_GUIDE.md` | Architecture & patterns |
| `FEATURES.md` | Feature checklist |
| `README.md` | Project overview |
| `FILE_MANIFEST.md` | File listing |

---

## ⚙️ Configuration

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { 500: '#4CAF50' },  // Change primary color
  accent: { 500: '#FFA500' }     // Change accent color
}
```

### API Endpoint
Edit `utils/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000'; // Change this
```

### App Name
Edit `app.json`:
```json
"name": "FridgeForge"
```

---

## 🐛 Troubleshooting

### Styles not applying
```bash
expo start -c  # Clear cache
```

### Module not found
```bash
npm install    # Reinstall dependencies
```

### Camera not working
- Check permissions in `app.json`
- Try upload option instead
- Check internet connection

---

## 📊 Component Quick Reference

| Component | Import | Usage |
|-----------|--------|-------|
| PrimaryButton | `components` | Main CTA |
| SecondaryButton | `components` | Alternative |
| Card | `components` | Container |
| Badge | `components` | Label |
| EmptyState | `components` | No data |
| LoadingState | `components` | Loading |
| Checkbox | `components` | Selection |

---

## 🎨 Design Quick Tips

- Use `rounded-xl` for modern look
- Add `shadow-md` for depth
- Use `gap-3` or `gap-4` between items
- Keep padding `px-6 py-4` for screens
- Use primary-500 for CTAs, accent for highlights

---

## 🔗 Useful Commands

```bash
# Start dev server
npm start

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Install dependencies
npm install

# Run web version
npm run web

# Run iOS simulator
npm run ios

# Run Android emulator
npm run android
```

---

## 💡 Pro Tips

1. **Use Context for Global State**: Avoid prop drilling
2. **Check Mock Data**: Understand the data structure
3. **Read Component Props**: Each component has clear props
4. **Use Tailwind**: Most styling needs covered
5. **Test on Device**: Responsive design matters
6. **Check Docs**: Refer to DEVELOPER_GUIDE.md for patterns
7. **AsyncStorage**: Perfect for caching user data
8. **Error Handling**: Always wrap API calls in try-catch

---

## 📞 Need Help?

1. Check **SETUP.md** for installation issues
2. Read **DEVELOPER_GUIDE.md** for architecture
3. Review **FEATURES.md** for roadmap
4. Look at existing screens for patterns
5. Check component library for UI examples

---

## ✨ You're All Set!

Everything you need is ready:
- ✅ Complete UI screens
- ✅ Navigation structure
- ✅ Component library
- ✅ State management
- ✅ API skeleton
- ✅ Documentation

**Start with**: `npm install && npm start` 🚀

---

**Happy coding!** 🎉
