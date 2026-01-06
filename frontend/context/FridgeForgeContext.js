import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FridgeForgeContext = createContext();

export function FridgeForgeProvider({ children }) {
  const [userProfile, setUserProfile] = useState({
    name: 'User',
    dietary: [],
    allergies: [],
    favoriteCuisines: [],
  });

  const [recipes, setRecipes] = useState([]);
  const [analyzedIngredients, setAnalyzedIngredients] = useState([]);

  useEffect(() => {
    loadUserProfile();
    loadRecipes();
  }, []);

  const loadUserProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem('userProfile');
      if (stored) {
        setUserProfile(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadRecipes = async () => {
    try {
      const stored = await AsyncStorage.getItem('recentRecipes');
      if (stored) {
        setRecipes(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  };

  const saveRecipe = async (recipe) => {
    try {
      const updated = [recipe, ...recipes].slice(0, 50); // Keep last 50
      setRecipes(updated);
      await AsyncStorage.setItem('recentRecipes', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      const updated = { ...userProfile, ...updates };
      setUserProfile(updated);
      await AsyncStorage.setItem('userProfile', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <FridgeForgeContext.Provider
      value={{
        userProfile,
        recipes,
        analyzedIngredients,
        saveRecipe,
        updateUserProfile,
        setAnalyzedIngredients,
      }}
    >
      {children}
    </FridgeForgeContext.Provider>
  );
}

export function useFridgeForge() {
  const context = useContext(FridgeForgeContext);
  if (!context) {
    throw new Error('useFridgeForge must be used within FridgeForgeProvider');
  }
  return context;
}
