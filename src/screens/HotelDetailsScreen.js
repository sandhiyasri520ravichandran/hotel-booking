import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

export default function HotelDetailsScreen({ route, navigation }) {
  const { hotel } = route.params;

  // Example multiple images (you can expand this per hotel)
  const images = [
    hotel.image,
    "https://images.unsplash.com/photo-1501117716987-c8e1ecb2108a",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  ];

  const rooms = [
    { type: "AC Room", price: hotel.price + 50 },
    { type: "Non-AC Room", price: hotel.price },
  ];

  const features = [
    { icon: "wifi", label: "Free WiFi" },
    { icon: "water", label: "Swimming Pool" },
    { icon: "leaf", label: "Garden" },
    { icon: "flame", label: "Bonfire" },
    { icon: "restaurant", label: "Breakfast Included" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* ✅ Image Carousel */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.carouselImage} />
          ))}
        </ScrollView>

        {/* ✅ Hotel Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{hotel.name}</Text>
          <Text style={styles.location}>
            <Ionicons name="location" size={16} color="gray" /> {hotel.location}
          </Text>
          <Text style={styles.rating}>⭐ {hotel.rating} | {hotel.discount} off</Text>
        </View>

        {/* ✅ Rooms Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Available Rooms</Text>
          {rooms.map((room, index) => (
            <Text key={index} style={styles.room}>
              🛏 {room.type} - <Text style={{ fontWeight: "600", color: "#2a9d8f" }}>₹{room.price}/night</Text>
            </Text>
          ))}
        </View>

        {/* ✅ Features Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Features</Text>
          <FlatList
            data={features}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.featureItem}>
                <Ionicons name={item.icon} size={20} color="#2a9d8f" style={{ marginRight: 8 }} />
                <Text style={styles.featureText}>{item.label}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* ✅ Floating Booking Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate("Booking", { hotel })}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Carousel
  carouselImage: { width, height: 250, resizeMode: "cover" },

  // Info
  infoContainer: { padding: 16 },
  name: { fontSize: 26, fontWeight: "bold", marginBottom: 5, color: "#333" },
  location: { fontSize: 16, color: "gray", marginBottom: 5 },
  rating: { fontSize: 16, marginBottom: 10, color: "#444" },

  // Sections
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 10, color: "#222" },
  room: { fontSize: 16, marginBottom: 8, color: "#555" },

  // Features
  featureItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  featureText: { fontSize: 16, color: "#444" },

  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  bookButton: {
    backgroundColor: "#2a9d8f",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
  },
  bookButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
