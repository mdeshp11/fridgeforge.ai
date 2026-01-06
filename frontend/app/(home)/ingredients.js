import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRoute, useRouter } from 'expo-router';
import {
  ChevronLeft,
  Plus,
  X,
  Edit2,
  Trash2,
  ArrowRight,
} from 'lucide-react-native';

const INGREDIENT_SUGGESTIONS = [
  'Chicken Breast',
  'Broccoli',
  'Tomato',
  'Lettuce',
  'Onion',
  'Garlic',
  'Olive Oil',
  'Pasta',
  'Rice',
  'Eggs',
  'Milk',
  'Cheese',
  'Salmon',
  'Carrots',
  'Bell Pepper',
  'Spinach',
  'Beans',
  'Potatoes',
  'Mushrooms',
  'Avocado',
];

export default function IngredientsScreen() {
  const router = useRouter();
  const route = useRoute();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load ingredients from route params if available
    if (route.params?.ingredients) {
      try {
        const parsed = JSON.parse(route.params.ingredients);
        setIngredients(parsed);
      } catch (error) {
        console.error('Error parsing ingredients:', error);
      }
    }
  }, [route.params]);

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      const ingredient = {
        id: Date.now().toString(),
        name: newIngredient.trim(),
        quantity: newQuantity.trim() || '1',
        unit: newUnit.trim() || 'piece',
      };
      setIngredients([...ingredients, ingredient]);
      setNewIngredient('');
      setNewQuantity('');
      setNewUnit('');
      setSuggestions([]);
    }
  };

  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
  };

  const handleSearch = (text) => {
    setNewIngredient(text);
    if (text.length > 0) {
      const filtered = INGREDIENT_SUGGESTIONS.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setNewIngredient(suggestion);
    setSuggestions([]);
  };

  const handleProceed = async () => {
    if (ingredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    try {
      // In production, this would call an API to generate recipes
      // For now, we'll navigate with the ingredients data
      router.push({
        pathname: '/(home)/recipes',
        params: {
          ingredients: JSON.stringify(ingredients),
        },
      });
    } catch (error) {
      console.error('Error proceeding:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="flex-row items-center px-6 py-4 border-b border-neutral-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ChevronLeft width={24} height={24} color="#212121" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="flex-1 font-bold text-lg text-neutral-900 ml-2">
          Ingredients
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Input Section */}
        <View className="px-6 pt-6">
          <Text className="font-semibold text-neutral-900 mb-3 text-sm">
            ADD INGREDIENT
          </Text>

          <View className="gap-3">
            <TextInput
              placeholder="Ingredient name"
              value={newIngredient}
              onChangeText={handleSearch}
              placeholderTextColor="#9e9e9e"
              className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900"
            />

            {suggestions.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="gap-2"
              >
                {suggestions.map((suggestion) => (
                  <TouchableOpacity
                    key={suggestion}
                    onPress={() => handleSuggestionSelect(suggestion)}
                    className="bg-primary-100 px-4 py-2 rounded-lg border border-primary-300"
                  >
                    <Text className="text-primary-700 font-medium text-xs">
                      {suggestion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <View className="flex-row gap-3">
              <TextInput
                placeholder="Qty"
                value={newQuantity}
                onChangeText={setNewQuantity}
                placeholderTextColor="#9e9e9e"
                keyboardType="decimal-pad"
                className="flex-1 bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900"
              />
              <TextInput
                placeholder="Unit"
                value={newUnit}
                onChangeText={setNewUnit}
                placeholderTextColor="#9e9e9e"
                className="flex-1 bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900"
              />
            </View>

            <TouchableOpacity
              onPress={handleAddIngredient}
              className="bg-primary-500 rounded-xl py-3 flex-row items-center justify-center"
            >
              <Plus width={20} height={20} color="white" strokeWidth={2} />
              <Text className="text-white font-bold ml-2">Add Ingredient</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ingredients List */}
        {ingredients.length > 0 && (
          <View className="px-6 pt-8">
            <Text className="font-semibold text-neutral-900 mb-4 text-sm">
              SELECTED INGREDIENTS ({ingredients.length})
            </Text>

            <View className="gap-3">
              {ingredients.map((ingredient) => (
                <View
                  key={ingredient.id}
                  className="bg-white rounded-xl p-4 flex-row items-center justify-between border border-neutral-200"
                >
                  <View className="flex-1">
                    <Text className="font-semibold text-neutral-900">
                      {ingredient.name}
                    </Text>
                    <Text className="text-xs text-neutral-500 mt-1">
                      {ingredient.quantity} {ingredient.unit}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveIngredient(ingredient.id)}
                    className="bg-red-50 p-2 rounded-lg ml-2"
                  >
                    <Trash2 width={18} height={18} color="#ef4444" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Empty State */}
        {ingredients.length === 0 && (
          <View className="flex-1 items-center justify-center py-12">
            <View className="bg-primary-100 p-4 rounded-full mb-4">
              <Edit2 width={32} height={32} color="#4CAF50" strokeWidth={2} />
            </View>
            <Text className="font-semibold text-neutral-900 text-center">
              No ingredients yet
            </Text>
            <Text className="text-neutral-500 text-center text-sm mt-2 px-6">
              Add ingredients above to get recipe suggestions
            </Text>
          </View>
        )}
      </ScrollView>

      {/* CTA Button */}
      {ingredients.length > 0 && (
        <View className="px-6 pb-6 pt-4 border-t border-neutral-200">
          <TouchableOpacity
            onPress={handleProceed}
            disabled={loading}
            className="bg-primary-500 rounded-xl py-4 flex-row items-center justify-center"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold flex-1 text-center">
                  Get Recipes
                </Text>
                <ArrowRight width={20} height={20} color="white" strokeWidth={2} />
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
