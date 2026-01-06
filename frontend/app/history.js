import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { ChefHat, Calendar, Clock, Trash2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem('recipeHistory');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading history:', error);
      setLoading(false);
    }
  };

  const deleteFromHistory = async (id) => {
    try {
      const updated = history.filter((item) => item.id !== id);
      setHistory(updated);
      await AsyncStorage.setItem('recipeHistory', JSON.stringify(updated));
    } catch (error) {
      console.error('Error deleting from history:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="px-6 py-4 border-b border-neutral-200">
        <Text className="font-bold text-2xl text-neutral-900">History</Text>
        <Text className="text-sm text-neutral-600 mt-1">
          Your recent fridge analyses and recipes
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : history.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        >
          {history.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() =>
                router.push({
                  pathname: '/(home)/recipe-detail',
                  params: { recipe: JSON.stringify(item) },
                })
              }
              activeOpacity={0.7}
              className="bg-white rounded-2xl p-4 mb-4 border border-neutral-200 flex-row items-center"
            >
              <View className="bg-primary-100 p-3 rounded-xl mr-4">
                <ChefHat width={24} height={24} color="#4CAF50" strokeWidth={2} />
              </View>

              <View className="flex-1">
                <Text className="font-bold text-neutral-900 text-base" numberOfLines={1}>
                  {item.title}
                </Text>
                <View className="flex-row gap-4 mt-2">
                  <View className="flex-row items-center gap-1">
                    <Calendar width={12} height={12} color="#9e9e9e" />
                    <Text className="text-xs text-neutral-500">
                      {new Date(item.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Clock width={12} height={12} color="#9e9e9e" />
                    <Text className="text-xs text-neutral-500">
                      {item.cookTime} min
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => deleteFromHistory(item.id)}
                className="bg-red-50 p-2 rounded-lg ml-2"
              >
                <Trash2 width={18} height={18} color="#ef4444" strokeWidth={2} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-neutral-100 p-6 rounded-full mb-4">
            <ChefHat width={48} height={48} color="#9e9e9e" strokeWidth={1.5} />
          </View>
          <Text className="font-bold text-neutral-900 text-center text-lg mb-2">
            No History Yet
          </Text>
          <Text className="text-neutral-600 text-center text-sm mb-6">
            Start by taking a photo of your fridge to see recipe suggestions
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(home)')}
            className="bg-primary-500 px-8 py-3 rounded-lg"
          >
            <Text className="text-white font-bold">Go to Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
