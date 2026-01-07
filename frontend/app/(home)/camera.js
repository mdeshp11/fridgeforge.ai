import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Upload, X, RotateCcw, Check } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
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

export default function CameraScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isLargeScreen = width > 768;
  const maxWidth = isLargeScreen ? 800 : '100%';
  const horizontalPadding = isLargeScreen ? 48 : 24;

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleRetake = () => {
    setPhoto(null);
  };

  const handleAnalyze = async () => {
    if (!photo) return;
    setIsLoading(true);
    // Simulate analysis
    setTimeout(() => {
      router.push({
        pathname: '/(home)/ingredients',
        params: { ingredients: JSON.stringify([]) },
      });
      setIsLoading(false);
    }, 2000);
  };

  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: photo.uri }} style={styles.image} />
        </View>
        <View style={[styles.buttonContainer, { paddingHorizontal: horizontalPadding }]}>
          <View style={{ maxWidth: isLargeScreen ? 500 : '100%', alignSelf: isLargeScreen ? 'center' : 'stretch', width: '100%' }}>
            <TouchableOpacity
              onPress={handleRetake}
              disabled={isLoading}
              style={[styles.button, styles.secondaryButton]}
            >
              <RotateCcw width={20} height={20} color="#fff" strokeWidth={2} />
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAnalyze}
              disabled={isLoading}
              style={[styles.button, styles.primaryButton, { marginTop: 12 }]}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Check width={20} height={20} color="#fff" strokeWidth={2} />
                  <Text style={styles.buttonText}>Analyze</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <X width={28} height={28} color="#fff" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Capture Photo</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: horizontalPadding }}>
        <Upload width={64} height={64} color="#fff" strokeWidth={1} />
        <Text style={{ color: '#fff', fontWeight: '600', marginTop: 16 }}>Upload Photo</Text>
        <Text style={{ color: '#9e9e9e', textAlign: 'center', marginTop: 8, paddingHorizontal: 24 }}>
          Select an image from your library
        </Text>
      </View>

      <View style={[styles.buttonContainer, { paddingHorizontal: horizontalPadding }]}>
        <View style={{ maxWidth: isLargeScreen ? 500 : '100%', alignSelf: isLargeScreen ? 'center' : 'stretch', width: '100%' }}>
          <TouchableOpacity
            onPress={handlePickImage}
            style={[styles.button, styles.primaryButton]}
          >
            <Upload width={20} height={20} color="#fff" strokeWidth={2} />
            <Text style={styles.buttonText}>Upload from Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
