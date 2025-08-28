// app/screens/HomeScreen.js
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import HotelCard from '../components/HotelCard';

// ✅ Hotels data with real images
const hotels = [
  { id: '1', name: 'Grand Palace', location: 'Chennai', price: 120, rating: 4.5, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', discount: '20%' },
  { id: '2', name: 'Beach Resort', location: 'Goa', price: 150, rating: 4.8, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', discount: '15%' },
  { id: '3', name: 'City Inn', location: 'Mumbai', price: 80, rating: 4.2, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', discount: '10%' },
  { id: '4', name: 'Hill View', location: 'Ooty', price: 100, rating: 4.3, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', discount: '12%' },
  { id: '5', name: 'Luxury Stay', location: 'Delhi', price: 200, rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', discount: '25%' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HotelCard 
            hotel={item} 
            onPress={() => navigation.navigate('HotelDetails', { hotel: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
        // ✅ Banner + Search Bar moved here
        ListHeaderComponent={
          <>
            {/* Banner */}
            <ImageBackground
              source={require("../../assets/images/banner.jpg")}
              style={styles.banner}
              imageStyle={{ borderRadius: 16 }}
            >
              <LinearGradient 
                colors={['rgba(0,0,0,0.6)', 'transparent']} 
                style={styles.overlay} 
              />
              <Text style={styles.bannerText}>Find Your Perfect Stay</Text>
            </ImageBackground>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#777" style={{ marginRight: 8 }} />
              <TextInput 
                style={styles.searchBar} 
                placeholder="Search hotels..." 
                placeholderTextColor="#999" 
              />
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },

  // Banner
  banner: { height: 200, justifyContent: 'flex-end', marginBottom: 20 },
  overlay: { ...StyleSheet.absoluteFillObject, borderRadius: 16 },
  bannerText: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#fff', 
    margin: 16, 
    textShadowColor: 'rgba(0,0,0,0.6)', 
    textShadowOffset: { width: 0, height: 2 }, 
    textShadowRadius: 4 
  },

  // Search Bar
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    marginBottom: 15, 
    elevation: 3, // shadow for Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchBar: { flex: 1, fontSize: 16, color: '#333' },
});
