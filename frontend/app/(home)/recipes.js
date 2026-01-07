import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Users } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  header: { paddingVertical: 16, borderBottomColor: '#333', borderBottomWidth: 1 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 24, marginBottom: 4 },
  subtitle: { color: '#9e9e9e' },
  content: { flex: 1, paddingVertical: 16 },
  contentInner: { maxWidth: 1024, width: '100%', marginHorizontal: 'auto' },
  recipeCard: { backgroundColor: '#2a2a2a', borderRadius: 12, padding: 16, marginBottom: 12 },
  recipeName: { color: '#fff', fontWeight: '600', fontSize: 18, marginBottom: 8 },
  recipeInfo: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  infoBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoText: { color: '#9e9e9e', fontSize: 12 },
  recipeButton: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#4CAF50', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  buttonContainer: { paddingVertical: 24 },
  button: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#424242' },
});

const MOCK_RECIPES = [
  { id: 1, name: 'Tomato Basil Pasta', time: 30, servings: 4 },
  { id: 2, name: 'Caprese Salad', time: 10, servings: 2 },
  { id: 3, name: 'Basil Pesto', time: 15, servings: 8 },
];

export default function RecipesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const horizontalPadding = isLargeScreen ? 48 : 24;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.title}>Recipes for You</Text>
        <Text style={styles.subtitle}>{MOCK_RECIPES.length} recipes available</Text>
      </View>

      <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.contentInner}>
          <FlatList
            data={MOCK_RECIPES}
            renderItem={({ item }) => (
              <View style={styles.recipeCard}>
                <Text style={styles.recipeName}>{item.name}</Text>
                <View style={styles.recipeInfo}>
                  <View style={styles.infoBadge}>
                    <Clock width={14} height={14} color="#9e9e9e" strokeWidth={2} />
                    <Text style={styles.infoText}>{item.time} min</Text>
                  </View>
                  <View style={styles.infoBadge}>
                    <Users width={14} height={14} color="#9e9e9e" strokeWidth={2} />
                    <Text style={styles.infoText}>Serves {item.servings}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => router.push('/(home)/recipe-detail')}
                  style={styles.recipeButton}
                >
                  <Text style={styles.buttonText}>View Recipe</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </View>

      <View style={[styles.buttonContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.contentInner}>
          <TouchableOpacity onPress={() => router.back()} style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
