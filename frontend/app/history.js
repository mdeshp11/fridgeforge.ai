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
import { Clock, Calendar } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  header: { paddingVertical: 16, borderBottomColor: '#333', borderBottomWidth: 1 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 24 },
  subtitle: { color: '#9e9e9e', marginTop: 4 },
  content: { flex: 1, paddingVertical: 16 },
  contentInner: { maxWidth: 1024, width: '100%', marginHorizontal: 'auto' },
  item: { backgroundColor: '#2a2a2a', padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemText: { color: '#fff', fontWeight: '500' },
  itemValue: { color: '#9e9e9e', fontSize: 14 },
  btnContainer: { paddingVertical: 24 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#424242' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

export default function HistoryScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const horizontalPadding = isLargeScreen ? 48 : 24;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>Recent Recipes</Text>
      </View>

      <ScrollView style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.contentInner}>
          <View style={styles.item}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Clock width={20} height={20} color="#4CAF50" strokeWidth={2} />
              <View>
                <Text style={styles.itemText}>Tomato Pasta</Text>
                <Text style={{ color: '#9e9e9e', fontSize: 12 }}>Today at 6:30 PM</Text>
              </View>
            </View>
          </View>

          <View style={styles.item}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Calendar width={20} height={20} color="#4CAF50" strokeWidth={2} />
              <View>
                <Text style={styles.itemText}>Salad Bowl</Text>
                <Text style={{ color: '#9e9e9e', fontSize: 12 }}>Yesterday at 1:00 PM</Text>
              </View>
            </View>
          </View>

          <View style={styles.item}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Clock width={20} height={20} color="#4CAF50" strokeWidth={2} />
              <View>
                <Text style={styles.itemText}>Basil Pesto</Text>
                <Text style={{ color: '#9e9e9e', fontSize: 12 }}>2 days ago</Text>
              </View>
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
