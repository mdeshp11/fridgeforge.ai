import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChefHat, Clock, Users } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  header: { paddingVertical: 16, borderBottomColor: '#333', borderBottomWidth: 1 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 24 },
  subtitle: { color: '#9e9e9e', marginTop: 4 },
  content: { flex: 1, paddingVertical: 16 },
  contentInner: { maxWidth: 1024, width: '100%', marginHorizontal: 'auto' },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  ingredientItem: { backgroundColor: '#2a2a2a', padding: 12, borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' },
  ingredientText: { color: '#fff', fontWeight: '500' },
  stepItem: { backgroundColor: '#2a2a2a', padding: 12, borderRadius: 8, marginBottom: 8 },
  stepNumber: { color: '#4CAF50', fontWeight: 'bold', marginBottom: 4 },
  stepText: { color: '#fff' },
  btnContainer: { paddingVertical: 24 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#424242' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

export default function RecipeDetailScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const horizontalPadding = isLargeScreen ? 48 : 24;

  const ingredients = ['Tomato', 'Basil', 'Olive Oil', 'Garlic'];
  const steps = [
    'Prepare all ingredients',
    'Boil water and add salt',
    'Cook pasta until al dente',
    'Prepare sauce with basil',
    'Combine and serve',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.title}>Recipe Detail</Text>
        <Text style={styles.subtitle}>Tomato Basil Pasta</Text>
      </View>

      <ScrollView style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.contentInner}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Time & Servings</Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={styles.ingredientItem}>
                <Clock width={20} height={20} color="#4CAF50" strokeWidth={2} />
                <Text style={styles.ingredientText}>30 min</Text>
              </View>
              <View style={styles.ingredientItem}>
                <Users width={20} height={20} color="#4CAF50" strokeWidth={2} />
                <Text style={styles.ingredientText}>Serves 4</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {ingredients.map((ing, i) => (
              <View key={i} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>{ing}</Text>
                <ChefHat width={16} height={16} color="#4CAF50" strokeWidth={2} />
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {steps.map((step, i) => (
              <View key={i} style={styles.stepItem}>
                <Text style={styles.stepNumber}>Step {i + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.btnContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.contentInner}>
          <TouchableOpacity onPress={() => router.back()} style={styles.btn}>
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
