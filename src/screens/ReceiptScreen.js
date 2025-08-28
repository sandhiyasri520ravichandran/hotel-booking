import { LinearGradient } from "expo-linear-gradient";
import * as MailComposer from "expo-mail-composer";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReceiptScreen({ route }) {
  const {
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
  } = route.params;

  const sendEmail = async () => {
    await MailComposer.composeAsync({
      recipients: [email],
      subject: "🏨 Hotel Booking Receipt - " + hotel.name,
      body: `Hello ${name},\n\nYour booking has been successfully confirmed!\n\n📌 Booking Details:\nHotel: ${hotel.name}\nCheck-In: ${checkIn}\nCheck-Out: ${checkOut}\nNights: ${nights}\nRooms: ${rooms}\nGuests: ${guests}\n\n💰 Payment Summary:\nTotal: $${totalAmount}\nDiscount: ${discountPercent}%\nFinal Amount: $${finalAmount}\n\n✅ Thank you for booking with us!\nWe look forward to hosting you.\n\n— ${hotel.name} Team`,
    });
    Alert.alert("📧 Email Sent", "Receipt has been sent to your email.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={["#007AFF", "#339CFF"]} style={styles.header}>
        <Text style={styles.headerText}>🎉 Booking Confirmed!</Text>
      </LinearGradient>

      {/* Card: Booking Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📌 Booking Details</Text>
        <Text style={styles.item}>🏨 Hotel: {hotel.name}</Text>
        <Text style={styles.item}>👤 Guest: {name}</Text>
        <Text style={styles.item}>📧 Email: {email}</Text>
        <Text style={styles.item}>📅 Check-In: {checkIn}</Text>
        <Text style={styles.item}>📅 Check-Out: {checkOut}</Text>
        <Text style={styles.item}>⏳ Nights: {nights}</Text>
        <Text style={styles.item}>🚪 Rooms: {rooms}</Text>
        <Text style={styles.item}>👥 Guests: {guests}</Text>
      </View>

      {/* Card: Payment Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💰 Payment Summary</Text>
        <Text style={styles.item}>Total (before discount): ${totalAmount}</Text>
        <Text style={[styles.item, { color: "#FF3B30" }]}>
          Discount: -{discountPercent}%
        </Text>
        <Text style={styles.finalAmount}>
          Final Amount Paid: ${finalAmount}
        </Text>
      </View>

      {/* Send Email Button */}
      <TouchableOpacity onPress={sendEmail} activeOpacity={0.85}>
        <LinearGradient
          colors={["#007AFF", "#339CFF"]}
          style={styles.emailButton}
        >
          <Text style={styles.emailButtonText}>📧 Send Receipt to Email</Text>
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
    padding: 25,
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
  item: {
    fontSize: 15,
    marginVertical: 4,
    color: "#333",
  },
  finalAmount: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
    color: "#007AFF",
  },
  emailButton: {
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
  emailButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
