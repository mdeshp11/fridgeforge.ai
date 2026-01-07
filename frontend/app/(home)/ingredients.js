import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Plus, Trash2, ChefHat } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingVertical: 16,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  subtitle: {
    color: '#9e9e9e',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingVertical: 16,
  },
  contentInner: {
    maxWidth: 1024,
    width: '100%',
    marginHorizontal: 'auto',
  },
  ingredientItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    color: '#9e9e9e',
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    paddingVertical: 24,
  },
  contentButtonContainer: {
    maxWidth: 1024,
    width: '100%',
    marginHorizontal: 'auto',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#424242',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default function IngredientsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const horizontalPadding = isLargeScreen ? 48 : 24;
  const buttonMaxWidth = isLargeScreen ? 500 : '100%';

  const [ingredients, setIngredients] = useState([
    'Tomato',
    'Basil',
    'Olive Oil',
  ]);

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleFindRecipes = () => {
    router.push({
      pathname: '/(home)/recipes',
      params: { ingredients: JSON.stringify(ingredients) },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.title}>Your Ingredients</Text>
        <Text style={styles.subtitle}>
          {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.contentInner}>
          {ingredients.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <ChefHat width={48} height={48} color="#4CAF50" strokeWidth={1} />
              </View>
              <Text style={styles.emptyText}>No ingredients added yet</Text>
              <Text style={styles.emptyText}>Tap below to add some</Text>
            </View>
          ) : (
            <FlatList
              data={ingredients}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View style={styles.ingredientItem}>
                  <Text style={styles.ingredientText}>{item}</Text>
                  <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
                    <Trash2 width={20} height={20} color="#ff6b6b" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>

      <View style={[styles.buttonContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.contentButtonContainer, { width: buttonMaxWidth, alignSelf: isLargeScreen ? 'center' : 'stretch' }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.button, styles.secondaryButton, { marginBottom: 12 }]}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFindRecipes}
            style={[styles.button, styles.primaryButton]}
          >
            <ChefHat width={20} height={20} color="#fff" strokeWidth={2} />
            <Text style={styles.buttonText}>Find Recipes ({ingredients.length})</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
