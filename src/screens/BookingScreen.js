import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BookingScreen({ route, navigation }) {
  const { hotel } = route.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [rooms, setRooms] = useState("");
  const [roomType, setRoomType] = useState("AC");
  const [specialRequest, setSpecialRequest] = useState("");

  const handleBooking = () => {
    if (!name || !email || !phone || !checkIn || !checkOut || !guests || !rooms) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    navigation.navigate("Payment", {
      hotel,
      name,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      rooms,
      roomType,
      specialRequest,
    });
  };

  return (
    <LinearGradient colors={["#E3F2FD", "#FFFFFF"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Booking at {hotel.name}</Text>
        <Text style={styles.subtitle}>{hotel.location}</Text>

        {/* Personal Info */}
        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter your name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Enter your phone number"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Booking Details */}
        <View style={styles.card}>
          <Text style={styles.label}>Check-In Date</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            style={styles.input}
            value={checkIn}
            onChangeText={setCheckIn}
          />

          <Text style={styles.label}>Check-Out Date</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            style={styles.input}
            value={checkOut}
            onChangeText={setCheckOut}
          />

          <Text style={styles.label}>Number of Guests</Text>
          <TextInput
            placeholder="e.g. 2"
            style={styles.input}
            keyboardType="numeric"
            value={guests}
            onChangeText={setGuests}
          />

          <Text style={styles.label}>Number of Rooms</Text>
          <TextInput
            placeholder="e.g. 1"
            style={styles.input}
            keyboardType="numeric"
            value={rooms}
            onChangeText={setRooms}
          />

          {/* Room Type Selection */}
          <Text style={styles.label}>Room Type</Text>
          <View style={styles.roomTypeContainer}>
            <TouchableOpacity
              style={[styles.optionButton, roomType === "AC" && styles.selectedOption]}
              onPress={() => setRoomType("AC")}
            >
              <Text
                style={[
                  styles.optionText,
                  roomType === "AC" && { color: "#fff", fontWeight: "bold" },
                ]}
              >
                AC Room
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, roomType === "Non-AC" && styles.selectedOption]}
              onPress={() => setRoomType("Non-AC")}
            >
              <Text
                style={[
                  styles.optionText,
                  roomType === "Non-AC" && { color: "#fff", fontWeight: "bold" },
                ]}
              >
                Non-AC Room
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Special Requests */}
        <View style={styles.card}>
          <Text style={styles.label}>Special Requests (Optional)</Text>
          <TextInput
            placeholder="Any preferences (e.g., near pool, late check-in)"
            style={[styles.input, { height: 80 }]}
            multiline
            value={specialRequest}
            onChangeText={setSpecialRequest}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.button}>
          <Button title="Proceed to Payment" onPress={handleBooking} color="#007AFF" />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 5, color: "#1E3A8A" },
  subtitle: { fontSize: 16, color: "gray", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "500", marginBottom: 5, marginTop: 10, color: "#1E40AF" },
  input: {
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  roomTypeContainer: { flexDirection: "row", marginVertical: 10 },
  optionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#90CAF9",
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: "#E3F2FD",
  },
  selectedOption: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  optionText: { fontSize: 16, color: "#1E3A8A" },
  button: { marginTop: 20 },
});
