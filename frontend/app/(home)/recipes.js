import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Users } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  header: { paddingHorizontal: 24, paddingVertical: 16, borderBottomColor: '#333', borderBottomWidth: 1 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 24 },
  subtitle: { color: '#9e9e9e', marginTop: 4 },
  content: { flex: 1, paddingHorizontal: 24, paddingVertical: 16 },
  recipeCard: { backgroundColor: '#2a2a2a', borderRadius: 12, padding: 16, marginBottom: 12 },
  recipeName: { color: '#fff', fontWeight: '600', fontSize: 18, marginBottom: 8 },
  recipeInfo: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  infoBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoText: { color: '#9e9e9e', fontSize: 12 },
  recipeButton: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#4CAF50', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  buttonContainer: { paddingHorizontal: 24, paddingVertical: 24 },
  button: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#424242' },
});

const MOCK_RECIPES = [
  { id: 1, name: 'Tomato Basil Pasta', time: 30, servings: 4 },
  { id: 2, name: 'Caprese Salad', time: 10, servings: 2 },
  { id: 3, name: 'Basil Pesto', time: 15, servings: 8 },
];

function RecipeCard({ recipe, onPress, isSmallScreen }) {
  const [liked, setLiked] = useState(recipe.isFavorite);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white rounded-2xl overflow-hidden shadow-md mb-4"
    >
      {/* Recipe Image Placeholder */}
      <View className="h-40 bg-gradient-to-br from-primary-100 to-accent-100 justify-center items-center relative">
        <View className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex-row items-center gap-1">
          <TrendingUp width={14} height={14} color="#4CAF50" strokeWidth={2} />
          <Text className="text-xs font-bold text-primary-600">
            {recipe.matchPercentage}%
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="p-4">
        <Text className="font-bold text-neutral-900 text-base mb-2" numberOfLines={2}>
          {recipe.title}
        </Text>

        {/* Stats */}
        <View className="flex-row gap-4 mb-4">
          <View className="flex-row items-center gap-1">
            <Clock width={14} height={14} color="#9e9e9e" strokeWidth={2} />
            <Text className="text-xs text-neutral-600">{recipe.cookTime} min</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Users width={14} height={14} color="#9e9e9e" strokeWidth={2} />
            <Text className="text-xs text-neutral-600">{recipe.servings} serves</Text>
          </View>
          <Text className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
            {recipe.difficulty}
          </Text>
        </View>

        {/* Nutrition */}
        <View className="bg-neutral-50 rounded-lg p-3 mb-4">
          <Text className="text-xs font-semibold text-neutral-700 mb-2">
            Nutrition per serving
          </Text>
          <View className="flex-row justify-between gap-2">
            <View className="flex-1">
              <Text className="text-xs text-neutral-600">Calories</Text>
              <Text className="font-bold text-primary-600 text-sm">
                {recipe.calories}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-neutral-600">Protein</Text>
              <Text className="font-bold text-primary-600 text-sm">
                {recipe.protein}g
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-neutral-600">Carbs</Text>
              <Text className="font-bold text-primary-600 text-sm">
                {recipe.carbs}g
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setLiked(!liked)}
            className={`flex-1 flex-row items-center justify-center py-2 rounded-lg border ${
              liked
                ? 'bg-red-50 border-red-200'
                : 'bg-neutral-50 border-neutral-200'
            }`}
          >
            <Heart
              width={16}
              height={16}
              color={liked ? '#ef4444' : '#9e9e9e'}
              strokeWidth={2}
              fill={liked ? '#ef4444' : 'none'}
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 rounded-lg bg-neutral-50 border border-neutral-200">
            <Share2 width={16} height={16} color="#9e9e9e" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function RecipesScreen() {
  const router = useRouter();
  const route = useRoute();
  const dimensions = useWindowDimensions();
  const isSmallScreen = dimensions.width < 600;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, this would call an API
    setTimeout(() => {
      setRecipes(MOCK_RECIPES);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="flex-row items-center px-6 py-4 border-b border-neutral-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ChevronLeft width={24} height={24} color="#212121" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="flex-1 font-bold text-lg text-neutral-900 ml-2">
          Recipe Suggestions
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text className="text-neutral-600 mt-4">Generating recipes...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        >
          <Text className="text-sm font-semibold text-neutral-700 mb-4">
            {recipes.length} recipes found
          </Text>

          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isSmallScreen={isSmallScreen}
              onPress={() =>
                router.push({
                  pathname: '/(home)/recipe-detail',
                  params: { recipe: JSON.stringify(recipe) },
                })
              }
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
