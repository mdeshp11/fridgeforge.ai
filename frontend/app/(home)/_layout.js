import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="camera" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="ingredients" />
      <Stack.Screen name="recipes" />
      <Stack.Screen name="recipe-detail" />
    </Stack>
  );
}
