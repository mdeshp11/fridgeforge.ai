import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import {
  User,
  Edit2,
  Heart,
  AlertCircle,
  Bell,
  ShieldCheck,
  LogOut,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Paleo',
  'Low-Sodium',
];

const CUISINE_OPTIONS = [
  'Italian',
  'Asian',
  'Mexican',
  'Mediterranean',
  'Indian',
  'American',
  'French',
];

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    dietary: [],
    allergies: '',
    favoriteCuisines: [],
    notifications: true,
  });

  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(profileData.name);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem('userProfile');
      if (stored) {
        setProfileData(JSON.parse(stored));
        setTempName(JSON.parse(stored).name);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const saveProfile = async (updatedData) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const toggleDietary = (dietary) => {
    const updated = profileData.dietary.includes(dietary)
      ? profileData.dietary.filter((d) => d !== dietary)
      : [...profileData.dietary, dietary];
    const newProfile = { ...profileData, dietary: updated };
    setProfileData(newProfile);
    saveProfile(newProfile);
  };

  const toggleCuisine = (cuisine) => {
    const updated = profileData.favoriteCuisines.includes(cuisine)
      ? profileData.favoriteCuisines.filter((c) => c !== cuisine)
      : [...profileData.favoriteCuisines, cuisine];
    const newProfile = { ...profileData, favoriteCuisines: updated };
    setProfileData(newProfile);
    saveProfile(newProfile);
  };

  const handleSaveName = async () => {
    if (tempName.trim()) {
      const newProfile = { ...profileData, name: tempName.trim() };
      setProfileData(newProfile);
      await saveProfile(newProfile);
      setEditingName(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View className="px-6 py-4 border-b border-neutral-200">
          <Text className="font-bold text-2xl text-neutral-900">Profile</Text>
          <Text className="text-sm text-neutral-600 mt-1">
            Manage your preferences and settings
          </Text>
        </View>

        {/* Profile Card */}
        <View className="px-6 pt-6">
          <View className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 items-center">
            <View className="bg-white/20 p-4 rounded-full mb-4">
              <User width={40} height={40} color="white" strokeWidth={1.5} />
            </View>
            <Text className="text-white font-bold text-xl">
              {profileData.name}
            </Text>
            <Text className="text-white/80 text-sm mt-1">
              {profileData.email}
            </Text>
          </View>
        </View>

        {/* Edit Name */}
        <View className="px-6 pt-6">
          <View className="bg-white rounded-xl p-4 border border-neutral-200 flex-row items-center justify-between">
            <View className="flex-1">
              {editingName ? (
                <TextInput
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Enter name"
                  placeholderTextColor="#9e9e9e"
                  className="text-neutral-900 font-semibold"
                />
              ) : (
                <Text className="text-neutral-900 font-semibold">
                  {profileData.name}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (editingName) {
                  handleSaveName();
                } else {
                  setEditingName(true);
                }
              }}
              className="bg-primary-100 p-2 rounded-lg ml-2"
            >
              <Edit2 width={18} height={18} color="#4CAF50" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dietary Restrictions */}
        <View className="px-6 pt-6">
          <Text className="font-bold text-neutral-900 text-lg mb-4">
            Dietary Restrictions
          </Text>
          <View className="gap-2">
            {DIETARY_OPTIONS.map((dietary) => (
              <TouchableOpacity
                key={dietary}
                onPress={() => toggleDietary(dietary)}
                className={`rounded-lg p-4 flex-row items-center border-2 ${
                  profileData.dietary.includes(dietary)
                    ? 'bg-primary-50 border-primary-300'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <View
                  className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
                    profileData.dietary.includes(dietary)
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-neutral-300'
                  }`}
                >
                  {profileData.dietary.includes(dietary) && (
                    <Text className="text-white font-bold text-xs">✓</Text>
                  )}
                </View>
                <Text
                  className={`font-medium ${
                    profileData.dietary.includes(dietary)
                      ? 'text-primary-700'
                      : 'text-neutral-900'
                  }`}
                >
                  {dietary}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Allergies */}
        <View className="px-6 pt-6">
          <Text className="font-bold text-neutral-900 text-lg mb-4">
            Allergies & Intolerances
          </Text>
          <View className="bg-white rounded-xl border border-neutral-200 p-4">
            <View className="flex-row items-start gap-2 mb-3">
              <AlertCircle width={18} height={18} color="#ef4444" strokeWidth={2} />
              <Text className="flex-1 text-sm text-neutral-600">
                List any allergies or intolerances separated by commas
              </Text>
            </View>
            <TextInput
              value={profileData.allergies}
              onChangeText={(text) => {
                const newProfile = { ...profileData, allergies: text };
                setProfileData(newProfile);
                saveProfile(newProfile);
              }}
              placeholder="e.g., Peanuts, Shellfish, Eggs"
              placeholderTextColor="#9e9e9e"
              multiline
              className="text-neutral-900 border border-neutral-200 rounded-lg p-3"
              style={{ minHeight: 80 }}
            />
          </View>
        </View>

        {/* Favorite Cuisines */}
        <View className="px-6 pt-6">
          <Text className="font-bold text-neutral-900 text-lg mb-4">
            Favorite Cuisines
          </Text>
          <View className="gap-2">
            {CUISINE_OPTIONS.map((cuisine) => (
              <TouchableOpacity
                key={cuisine}
                onPress={() => toggleCuisine(cuisine)}
                className={`rounded-lg p-4 flex-row items-center border-2 ${
                  profileData.favoriteCuisines.includes(cuisine)
                    ? 'bg-accent-50 border-accent-300'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <View
                  className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
                    profileData.favoriteCuisines.includes(cuisine)
                      ? 'bg-accent-500 border-accent-500'
                      : 'border-neutral-300'
                  }`}
                >
                  {profileData.favoriteCuisines.includes(cuisine) && (
                    <Text className="text-white font-bold text-xs">✓</Text>
                  )}
                </View>
                <Text
                  className={`font-medium ${
                    profileData.favoriteCuisines.includes(cuisine)
                      ? 'text-accent-700'
                      : 'text-neutral-900'
                  }`}
                >
                  {cuisine}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View className="px-6 pt-6">
          <Text className="font-bold text-neutral-900 text-lg mb-4">
            Settings
          </Text>

          <View className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <View className="p-4 flex-row items-center justify-between border-b border-neutral-200">
              <View className="flex-row items-center gap-3 flex-1">
                <Bell width={20} height={20} color="#4CAF50" strokeWidth={2} />
                <View>
                  <Text className="font-semibold text-neutral-900">
                    Push Notifications
                  </Text>
                  <Text className="text-xs text-neutral-500 mt-1">
                    Get recipe ideas and tips
                  </Text>
                </View>
              </View>
              <Switch
                value={profileData.notifications}
                onValueChange={(value) => {
                  const newProfile = { ...profileData, notifications: value };
                  setProfileData(newProfile);
                  saveProfile(newProfile);
                }}
                trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
              />
            </View>

            <TouchableOpacity className="p-4 flex-row items-center gap-3 border-b border-neutral-200">
              <ShieldCheck width={20} height={20} color="#4CAF50" strokeWidth={2} />
              <View>
                <Text className="font-semibold text-neutral-900">
                  Privacy Policy
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="p-4 flex-row items-center gap-3">
              <Heart width={20} height={20} color="#ef4444" strokeWidth={2} />
              <View>
                <Text className="font-semibold text-neutral-900">
                  About FridgeForge
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View className="px-6 pt-6">
          <TouchableOpacity
            onPress={() => Alert.alert('Logout', 'Are you sure?')}
            className="bg-red-50 rounded-xl p-4 flex-row items-center gap-3 border border-red-200"
          >
            <LogOut width={20} height={20} color="#ef4444" strokeWidth={2} />
            <Text className="font-semibold text-red-600">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
