import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/header";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios"; // Make sure to install axios if not already installed
import { APIURL } from "../../../Constants";
import { HeadersToken } from "../../../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await AsyncStorage.getItem("authToken");
        const formattedDate = date.toISOString().split("T")[0];
        const response = await axios.post(`${APIURL}shop/order/history`, {
          params: { date: formattedDate }
        }, HeadersToken(token));
        setOrders(response.data.orders || []);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [date]);

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  return (
    <View style={styles.overallContainer}>
      <Header
        title="ประวัติการทำอาหาร"
        showBackButton={true}
        onBackPress={() => navigation.navigate("Home" as never)}
      />
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)} // Show the picker when clicked
          >
            <Text style={styles.dateText}>เลือกวันที่</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
            />
          )}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : orders.length === 0 ? (
          <Text style={styles.noOrdersText}>ไม่มีออเดอร์ในวันที่เลือก</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.orderItem}
                onPress={() => toggleExpandOrder(item.id)}
              >
                <View style={styles.orderHeader}>
                  <Text style={styles.description}>{item.title}</Text>
                  <Text style={styles.description}>{item.price}</Text>
                </View>
                <Text style={styles.description}>รายละเอียด</Text>
                {expandedOrderId === item.id && (
                  <View style={styles.orderDetails}>
                    <Text style={styles.description}>{item.details}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overallContainer: { marginTop: -40, flex: 1, height: "100%" },
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  datePickerButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  description: { color: "#000" },
  dateText: { fontSize: 16, color: "#000" },
  noOrdersText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  orderItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderDetails: {
    paddingTop: 10,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginTop: 20,
  },
});

export default HistoryScreen;
