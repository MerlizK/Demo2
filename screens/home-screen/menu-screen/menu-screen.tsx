import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const APIURL = "https://your-api-url.com/"; // Replace with actual API URL

type MenuItem = {
  orderItemId: number;
  quantity: number;
  totalPrice: number;
  specialInstructions: string;
  shopId: number;
  orderItemStatus: string;
  orderItemDate: string;
  completedDate: string;
  menuId: number;
  orderId: number;
  orderItemExtras: {
    optionItemId: number;
    selected: boolean;
  }[];
};

type OrderItemProps = {
  orderNumber: string;
  menuNumber?: string;
  foodPrice?: number;
  price?: number;
  options?: string;
  comment?: string;
  onDelete: (orderNumber: string) => void;
};

const OrderItem: React.FC<OrderItemProps> = ({
  orderNumber,
  menuNumber,
  foodPrice,
  price,
  options,
  comment,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = () => {
    onDelete(orderNumber);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Entypo name="location-pin" size={24} color="black" />
        <Text style={styles.orderText}>ออเดอร์ที่ {orderNumber} </Text>
        <Text style={styles.priceText}>ค่าอาหาร {foodPrice} บาท</Text>
        <View style={styles.priceContainer}>
          <View style={styles.spacer} />
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            {!expanded ? (
              <Entypo name="chevron-small-down" size={28} color="black" />
            ) : (
              <Entypo name="chevron-small-right" size={28} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {expanded && (
        <View style={styles.orderDetails}>
          <Text style={styles.menuText}>เมนูที่{menuNumber}</Text>
          <Text style={styles.subText}>จำนวนที่สั่ง: {options}</Text>
          <Text style={styles.subText}>comment: {comment}</Text>
          <Text style={styles.subText}>ราคา: {price} บาท</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.buttonText}>ทำอาหารเสร็จแล้ว</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>ยืนยันการทำอาหารเสร็จสิ้น?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>ยืนยัน</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const OrderList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState<MenuItem[]>([]);

  // Function to fetch menu data
  const fetchMenuData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(`${APIURL}shop/order`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data as MenuItem[]);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchMenuData();
  }, []);

  const handleDeleteOrder = (orderNumber: string) => {
    // Simulate order deletion
    setOrders(
      orders.filter((order) => order.orderItemId.toString() !== orderNumber)
    );
  };

  return (
    <>
      {isOpen ? (
        <ScrollView style={styles.container}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderItem
                key={order.orderItemId}
                orderNumber={order.orderItemId.toString()}
                menuNumber={order.menuId.toString()}
                options={order.specialInstructions}
                comment={order.orderItemStatus}
                foodPrice={order.totalPrice}
                price={order.totalPrice} // Assuming price and foodPrice are the same
                onDelete={handleDeleteOrder}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.orderText}>ยังไม่มีออเดอร์</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <View style={styles.emptyContainer}>
            <Text style={styles.orderText}>ยังไม่มีออเดอร์</Text>
          </View>
        </View>
      )}

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>สถานะร้าน:</Text>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isOpen ? styles.openButton : styles.closedButton,
          ]}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Text style={styles.buttonText}>
            {isOpen ? "ร้านเปิด" : "ร้านปิด"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    width: "100%",
    gap: 20,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  statusButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: { color: "#000", fontSize: 16 },
  shopName: {
    color: "#000",
    marginTop: 70,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusButton: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  openButton: {
    backgroundColor: "green",
  },
  closedButton: {
    backgroundColor: "red",
  },
  menuList: {
    flex: 1,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  menuName: {
    color: "#000",
    fontSize: 18,
  },
  menuPrice: {
    color: "#000",
    fontSize: 16,
  },
  menuImage: {
    width: 60,
    height: 40,
    borderRadius: 4,
    flex: 1,
  },
  statusAvailable: {
    backgroundColor: "green",
  },
  statusSoldOut: {
    backgroundColor: "red",
  },
  settingsButton: {
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 20,
    maxWidth: 220,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  confirmModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  confirmButtonRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
});

export default ShopMenuComponent;
