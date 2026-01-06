import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
} from 'react-native';
import { useRoute, useRouter } from 'expo-router';
import {
  ChevronLeft,
  Heart,
  Share2,
  Clock,
  Users,
  Flame,
  ShoppingCart,
  Check,
} from 'lucide-react-native';

const RECIPE_DETAILS = {
  instructions: [
    'Preheat the oven to 220°C (425°F).',
    'Season the chicken breasts with salt, pepper, and olive oil.',
    'Spread the vegetables on a baking sheet.',
    'Bake for 25-30 minutes until the chicken is cooked through.',
    'Let rest for 5 minutes before serving.',
  ],
  ingredients: [
    { name: 'Chicken breast', quantity: 4, unit: 'pieces', available: true },
    { name: 'Broccoli', quantity: 500, unit: 'g', available: true },
    { name: 'Bell pepper', quantity: 2, unit: 'pieces', available: true },
    { name: 'Olive oil', quantity: 3, unit: 'tbsp', available: true },
    { name: 'Garlic', quantity: 3, unit: 'cloves', available: false },
    { name: 'Lemon juice', quantity: 2, unit: 'tbsp', available: false },
  ],
  shoppingList: [
    { name: 'Garlic', quantity: 3, unit: 'cloves' },
    { name: 'Lemon juice', quantity: 2, unit: 'tbsp' },
  ],
};

export default function RecipeDetailScreen() {
  const router = useRouter();
  const route = useRoute();
  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState({});
  const [shoppingAdded, setShoppingAdded] = useState({});

  useEffect(() => {
    if (route.params?.recipe) {
      try {
        const parsed = JSON.parse(route.params.recipe);
        setRecipe(parsed);
      } catch (error) {
        console.error('Error parsing recipe:', error);
      }
    }
  }, [route.params]);

  const toggleStep = (index) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleShoppingItem = (index) => {
    setShoppingAdded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!recipe) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <View className="items-center justify-center flex-1">
          <Text className="text-neutral-600">Loading recipe...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="relative">
          {/* Image Placeholder */}
          <View className="h-64 bg-gradient-to-br from-primary-100 to-accent-100 justify-center items-center">
            <Flame width={64} height={64} color="#FFA500" strokeWidth={1} />
          </View>

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 bg-white/90 rounded-full p-2"
          >
            <ChevronLeft width={24} height={24} color="#212121" strokeWidth={2} />
          </TouchableOpacity>

          {/* Action Buttons */}
          <View className="absolute top-4 right-4 gap-2">
            <TouchableOpacity
              onPress={() => setLiked(!liked)}
              className={`rounded-full p-2 ${liked ? 'bg-red-50' : 'bg-white/90'}`}
            >
              <Heart
                width={24}
                height={24}
                color={liked ? '#ef4444' : '#212121'}
                strokeWidth={2}
                fill={liked ? '#ef4444' : 'none'}
              />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white/90 rounded-full p-2">
              <Share2 width={24} height={24} color="#212121" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recipe Info */}
        <View className="px-6 pt-6">
          <Text className="text-2xl font-bold text-neutral-900 mb-4">
            {recipe.title}
          </Text>

          {/* Quick Stats */}
          <View className="flex-row gap-4 mb-6">
            <View className="flex-1 bg-white rounded-xl p-3 border border-neutral-200">
              <View className="flex-row items-center gap-2 mb-1">
                <Clock width={16} height={16} color="#4CAF50" strokeWidth={2} />
                <Text className="text-xs text-neutral-600">Time</Text>
              </View>
              <Text className="font-bold text-neutral-900">
                {recipe.cookTime} min
              </Text>
            </View>
            <View className="flex-1 bg-white rounded-xl p-3 border border-neutral-200">
              <View className="flex-row items-center gap-2 mb-1">
                <Users width={16} height={16} color="#4CAF50" strokeWidth={2} />
                <Text className="text-xs text-neutral-600">Servings</Text>
              </View>
              <Text className="font-bold text-neutral-900">
                {recipe.servings}
              </Text>
            </View>
            <View className="flex-1 bg-white rounded-xl p-3 border border-neutral-200">
              <View className="flex-row items-center gap-2 mb-1">
                <Flame width={16} height={16} color="#FFA500" strokeWidth={2} />
                <Text className="text-xs text-neutral-600">Calories</Text>
              </View>
              <Text className="font-bold text-neutral-900">
                {recipe.calories}
              </Text>
            </View>
          </View>

          {/* Nutrition */}
          <View className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4 mb-6">
            <Text className="font-semibold text-neutral-900 mb-3">
              Nutrition per serving
            </Text>
            <View className="flex-row justify-between gap-4">
              <View>
                <Text className="text-xs text-neutral-600 mb-1">Protein</Text>
                <Text className="font-bold text-primary-600 text-lg">
                  {recipe.protein}g
                </Text>
              </View>
              <View>
                <Text className="text-xs text-neutral-600 mb-1">Carbs</Text>
                <Text className="font-bold text-primary-600 text-lg">
                  {recipe.carbs}g
                </Text>
              </View>
              <View>
                <Text className="text-xs text-neutral-600 mb-1">Fat</Text>
                <Text className="font-bold text-primary-600 text-lg">
                  {recipe.fat}g
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ingredients */}
        <View className="px-6 pt-4">
          <Text className="text-lg font-bold text-neutral-900 mb-4">
            Ingredients
          </Text>
          <View className="gap-3 mb-8">
            {RECIPE_DETAILS.ingredients.map((ingredient, idx) => (
              <View
                key={idx}
                className={`rounded-lg p-3 flex-row items-center border ${
                  ingredient.available
                    ? 'bg-primary-50 border-primary-200'
                    : 'bg-neutral-100 border-neutral-200'
                }`}
              >
                <View className="flex-1">
                  <Text
                    className={`font-semibold ${
                      ingredient.available
                        ? 'text-neutral-900'
                        : 'text-neutral-600'
                    }`}
                  >
                    {ingredient.name}
                  </Text>
                  <Text className="text-xs text-neutral-500 mt-1">
                    {ingredient.quantity} {ingredient.unit}
                  </Text>
                </View>
                {ingredient.available && (
                  <View className="bg-primary-500 rounded-full p-1.5">
                    <Check width={14} height={14} color="white" strokeWidth={3} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View className="px-6 pt-4">
          <Text className="text-lg font-bold text-neutral-900 mb-4">
            Instructions
          </Text>
          <View className="gap-4 mb-8">
            {RECIPE_DETAILS.instructions.map((instruction, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => toggleStep(idx)}
                className={`rounded-lg p-4 flex-row gap-4 ${
                  checkedSteps[idx]
                    ? 'bg-primary-50 border border-primary-200'
                    : 'bg-white border border-neutral-200'
                }`}
              >
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center border-2 ${
                    checkedSteps[idx]
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-neutral-300'
                  }`}
                >
                  {checkedSteps[idx] ? (
                    <Check width={16} height={16} color="white" strokeWidth={3} />
                  ) : (
                    <Text className="font-bold text-neutral-600 text-sm">
                      {idx + 1}
                    </Text>
                  )}
                </View>
                <Text
                  className={`flex-1 ${
                    checkedSteps[idx]
                      ? 'text-neutral-500 line-through'
                      : 'text-neutral-900'
                  }`}
                >
                  {instruction}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Shopping List */}
        {RECIPE_DETAILS.shoppingList.length > 0 && (
          <View className="px-6 pt-4 pb-8">
            <Text className="text-lg font-bold text-neutral-900 mb-4">
              Shopping List
            </Text>
            <View className="bg-accent-50 rounded-xl p-4 gap-3">
              {RECIPE_DETAILS.shoppingList.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => toggleShoppingItem(idx)}
                  className="flex-row items-center gap-3"
                >
                  <View
                    className={`w-5 h-5 rounded border-2 items-center justify-center ${
                      shoppingAdded[idx]
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-neutral-300'
                    }`}
                  >
                    {shoppingAdded[idx] && (
                      <Check width={14} height={14} color="white" strokeWidth={3} />
                    )}
                  </View>
                  <Text className="flex-1 font-medium text-neutral-900">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-neutral-600">
                    {item.quantity} {item.unit}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity className="mt-2 bg-primary-500 rounded-lg py-3 flex-row items-center justify-center gap-2">
                <ShoppingCart width={18} height={18} color="white" strokeWidth={2} />
                <Text className="text-white font-bold">Add to Grocery List</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
