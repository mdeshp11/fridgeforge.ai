import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, Zap, ChefHat } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  hero: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: 32,
    opacity: 0.8,
  },
  ctaButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 12,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  quickStart: {
    flexDirection: 'row',
    gap: 12,
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#212121',
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  cardButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#9e9e9e',
    marginTop: 16,
  },
});

export default function HomeScreen() {
  const router = useRouter();
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentRecipes();
  }, []);

  const loadRecentRecipes = async () => {
    try {
      const stored = await AsyncStorage.getItem('recentRecipes');
      if (stored) {
        setRecentRecipes(JSON.parse(stored).slice(0, 3));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading recipes:', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>🍳 FridgeForge</Text>
          <Text style={styles.heroSubtitle}>Turn your fridge into meals with AI</Text>
          <TouchableOpacity
            onPress={() => router.push('/(home)/camera')}
            activeOpacity={0.8}
            style={styles.ctaButton}
          >
            <Camera width={20} height={20} color="#4CAF50" strokeWidth={2} />
            <Text style={styles.ctaText}>Snap a Fridge Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Start */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <View style={styles.quickStart}>
            <TouchableOpacity
              onPress={() => router.push('/(home)/camera')}
              style={styles.quickButton}
            >
              <Zap width={24} height={24} color="#4CAF50" strokeWidth={2} />
              <Text style={styles.quickButtonText}>Instant Analysis</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/(home)/ingredients')}
              style={[styles.quickButton, { borderColor: '#FFA500' }]}
            >
              <ChefHat width={24} height={24} color="#FFA500" strokeWidth={2} />
              <Text style={styles.quickButtonText}>Manual Input</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Empty State */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Started</Text>
          <View style={styles.card}>
            <ChefHat width={48} height={48} color="#4CAF50" strokeWidth={1.5} />
            <Text style={styles.cardTitle}>No recipes yet!</Text>
            <Text style={{ color: '#9e9e9e', textAlign: 'center', marginBottom: 24 }}>
              Take a photo of your fridge or pantry to get instant recipe suggestions
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(home)/camera')}
              style={styles.cardButton}
            >
              <Text style={styles.cardButtonText}>Start Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why FridgeForge?</Text>
          <View style={{ gap: 12 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{ backgroundColor: '#e8f5e9', borderRadius: 12, padding: 8, marginRight: 12, marginTop: 4 }}>
                <Zap width={16} height={16} color="#4CAF50" strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', color: '#212121', fontSize: 14 }}>AI-Powered Detection</Text>
                <Text style={{ fontSize: 12, color: '#9e9e9e', marginTop: 4 }}>
                  Instantly identify ingredients from any photo
                </Text>
              </View>
            </View>
            <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{ backgroundColor: '#fff3e0', borderRadius: 12, padding: 8, marginRight: 12, marginTop: 4 }}>
                <ChefHat width={16} height={16} color="#FFA500" strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', color: '#212121', fontSize: 14 }}>Smart Recipes</Text>
                <Text style={{ fontSize: 12, color: '#9e9e9e', marginTop: 4 }}>
                  Get personalized recipe suggestions instantly
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
