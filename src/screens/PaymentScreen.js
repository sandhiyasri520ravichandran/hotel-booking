// app/screens/PaymentScreen.js
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PaymentScreen({ route, navigation }) {
  const { hotel, name, email, checkIn, checkOut, guests, rooms } = route.params;

  const [paid, setPaid] = useState(false);

  // --- Price calculation ---
  const roomPrice = hotel.price;
  const discountPercent = hotel.discount ? parseInt(hotel.discount) : 0;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.max(
    1,
    Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
  );

  const totalAmount = roomPrice * rooms * nights;
  const discountAmount = (totalAmount * discountPercent) / 100;
  const finalAmount = totalAmount - discountAmount;

  const handlePayment = () => {
    setPaid(true);
    Alert.alert("✅ Payment Successful", "Your booking has been confirmed!", [
      {
        text: "OK",
        onPress: () =>
          navigation.navigate("Receipt", {
            hotel,
            name,
            email,
            checkIn,
            checkOut,
            guests,
            rooms,
            nights,
            totalAmount,
            discountPercent,
            finalAmount,
          }),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={["#007AFF", "#339CFF"]} style={styles.header}>
        <Text style={styles.headerText}>💳 Payment Summary</Text>
      </LinearGradient>

      {/* Booking Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📌 Booking Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>🏨 Hotel:</Text>
          <Text style={styles.value}>{hotel.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>👤 Guest:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>📧 Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>📅 Check-in:</Text>
          <Text style={styles.value}>{checkIn}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>📅 Check-out:</Text>
          <Text style={styles.value}>{checkOut}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>⏳ Nights:</Text>
          <Text style={styles.value}>{nights}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>🚪 Rooms:</Text>
          <Text style={styles.value}>{rooms}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>👥 Guests:</Text>
          <Text style={styles.value}>{guests}</Text>
        </View>
      </View>

      {/* Price Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💰 Price Breakdown</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Room / Night:</Text>
          <Text style={styles.value}>${roomPrice}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total (before discount):</Text>
          <Text style={styles.value}>${totalAmount}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Discount:</Text>
          <Text style={[styles.value, { color: "#FF3B30" }]}>
            - ${discountAmount.toFixed(2)} ({discountPercent}%)
          </Text>
        </View>

        <View style={styles.finalRow}>
          <Text style={styles.finalLabel}>Final Amount:</Text>
          <Text style={styles.finalValue}>${finalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Pay Button */}
      <TouchableOpacity onPress={handlePayment} activeOpacity={0.85}>
        <LinearGradient
          colors={["#007AFF", "#339CFF"]}
          style={styles.payButton}
        >
          <Text style={styles.payButtonText}>💳 Pay Now</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#f5f7fa",
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#007AFF",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  label: {
    fontSize: 15,
    color: "#555",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  finalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  finalLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
  },
  finalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  payButton: {
    marginHorizontal: 40,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
