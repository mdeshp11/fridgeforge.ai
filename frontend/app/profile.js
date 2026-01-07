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
import { Clock, User, Settings } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  header: { paddingVertical: 16, borderBottomColor: '#333', borderBottomWidth: 1 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 24 },
  subtitle: { color: '#9e9e9e', marginTop: 4 },
  content: { flex: 1, paddingVertical: 16 },
  contentInner: { maxWidth: 1024, width: '100%', marginHorizontal: 'auto' },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  item: { backgroundColor: '#2a2a2a', padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemText: { color: '#fff', fontWeight: '500' },
  itemValue: { color: '#9e9e9e', fontSize: 14 },
  btnContainer: { paddingVertical: 24 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#424242' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

export default function ProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const horizontalPadding = isLargeScreen ? 48 : 24;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Your Information</Text>
      </View>

      <ScrollView style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.contentInner}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <User width={20} height={20} color="#4CAF50" strokeWidth={2} />
                <Text style={styles.itemText}>Name</Text>
              </View>
              <Text style={styles.itemValue}>John Doe</Text>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Clock width={20} height={20} color="#4CAF50" strokeWidth={2} />
                <Text style={styles.itemText}>Member Since</Text>
              </View>
              <Text style={styles.itemValue}>Jan 2024</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Settings width={20} height={20} color="#4CAF50" strokeWidth={2} />
                <Text style={styles.itemText}>Diet Type</Text>
              </View>
              <Text style={styles.itemValue}>Omnivore</Text>
            </View>
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
