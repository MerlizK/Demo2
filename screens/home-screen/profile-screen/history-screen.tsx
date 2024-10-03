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
import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import { APIURL } from "../../../Constants";
import { HeadersToken } from "../../../Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

type OrderItemExtraType = {
  OrderItemExtraId: number;
  optionItem: {
    optionItemId: number;
    name: string;
    price: number;
  };
};

type OrderItemType = {
  orderItemId: number;
  quantity: number;
  totalPrice: number;
  specialInstructions: string;
  menu: {
    name: string;
    price: number;
  };
  orderItemExtra?: OrderItemExtraType[];
};

type OrderItemProps = {
  orderNumber: string;
  orderItems: OrderItemType[];
  orderId: number;
};

const OrderItem: React.FC<OrderItemProps> = ({
  orderNumber,
  orderItems,
  orderId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Entypo name="location-pin" size={24} color="black" />
          <Text style={styles.orderText}>ออเดอร์ที่ {orderNumber}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            ค่าอาหาร:{" "}
            {orderItems.reduce((acc, item) => acc + item.totalPrice, 0)} บาท
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            {!expanded ? (
              <Entypo name="chevron-small-right" size={28} color="black" />
            ) : (
              <Entypo name="chevron-small-down" size={28} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {expanded && (
        <View style={styles.orderDetails}>
          {orderItems.map((item, index) => (
            <View key={index}>
              <View style={styles.orderDes}>
                <Text style={styles.menuText}>{item.menu?.name && ""}</Text>
                <Text style={[styles.menuText, { fontWeight: "400" }]}>
                  ราคา: {item.totalPrice} บาท
                </Text>
              </View>

              <View style={styles.orderDes}>
                <Text style={styles.subText}>จำนวนที่สั่ง</Text>
                <Text style={styles.subText}>{item.quantity}</Text>
              </View>

              {item.orderItemExtra && item.orderItemExtra.length > 0 && (
                <View style={styles.orderDes}>
                  <Text style={styles.subText}>เพิ่มเติม:</Text>
                  <Text style={styles.subText}>
                    {item.orderItemExtra
                      .map(
                        (extra) =>
                          `${extra.optionItem.name} +${extra.optionItem.price} บาท`
                      )
                      .join(", ")}
                  </Text>
                </View>
              )}
              {item.specialInstructions && (
                <View style={styles.orderDes}>
                  <Text style={styles.subText}>หมายเหตุ:</Text>
                  <Text style={styles.subText}>{item.specialInstructions}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

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
        // const mockResponse = [
        //   {
        //     orderId: 0,
        //     orderDate: "2024-09-30T20:51:16.128Z",
        //     orderStatus: "Completed",
        //     orderItem: [
        //       {
        //         shopId: 0,
        //         quantity: 1,
        //         totalPrice: 50,
        //         specialInstructions: "ไม่ผัก",
        //         menuId: 0,
        //         name: "ข้าวผัด",
        //         orderItemExtras: [
        //           {
        //             optionItemId: 0,
        //             selected: true,
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // ];

        // setOrders(mockResponse);
        console.log(formattedDate);
        const response = await axios.get(`${APIURL}shop/order/history`, {
          params: { date: formattedDate },
          ...HeadersToken(token),
        });
        setOrders(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
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
            onPress={() => setShowDatePicker(true)}
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
          orders.map((order) => (
            <OrderItem
              key={order.orderId}
              orderNumber={order.orderId.toString()}
              orderItems={order.orderItem}
              orderId={order.orderId}
            />
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overallContainer: { flex: 1, height: "100%" },
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
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginTop: 20,
  },
  orderContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
  },
  orderInfo: {
    maxWidth: "45%",
    flexDirection: "row",
    alignItems: "center",
  },
  orderDes: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  orderText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  emptyText: {
    color: "#f0f0f0",
    fontSize: 32,
    fontWeight: "300",
    marginLeft: 8,
  },
  priceContainer: {
    backgroundColor: "white",
    maxWidth: "55%",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  priceText: {
    fontSize: 14,
    marginRight: 8,
  },
  orderDetails: {
    gap: 8,
    marginTop: 8,
    paddingHorizontal: 24,
  },
  menuText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 2,
  },
});

export default HistoryScreen;
