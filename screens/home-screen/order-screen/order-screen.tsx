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
import { APIURL } from "../../../Constants";

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
  orderItemId: number;
  fetchMenuData: () => Promise<void>;
};

const OrderItem: React.FC<OrderItemProps> = ({
  orderNumber,
  menuNumber,
  foodPrice,
  price,
  options,
  comment,
  orderItemId,
  fetchMenuData,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const updateItemStatus = async (orderItemId: number) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      await axios.patch(
        `${APIURL}shop/order/update-status`,
        { orderItemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsModalVisible(false);
      await fetchMenuData(); // Fetch the menu data again after updating status
    } catch (error) {
      console.error("Error updating shop status:", error);
    }
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
                onPress={() => updateItemStatus(orderItemId)}
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

  useEffect(() => {
    fetchMenuData();
  }, []);

  const updateShopStatus = async (status: boolean) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      await axios.patch(
        `${APIURL}shop/update-status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsOpen(status);
    } catch (error) {
      console.error("Error updating shop status:", error);
    }
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
                price={order.totalPrice}
                orderItemId={order.orderItemId}
                fetchMenuData={fetchMenuData}
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
          onPress={() => updateShopStatus(!isOpen)}
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
    width: "100%",
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: "#fff",
    marginVertical: 16,
  },
  orderContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Takes available space
    justifyContent: "space-between", // Distribute space between items
  },
  priceText: {
    marginRight: 8,
  },
  orderDetails: {
    gap: 8,
    marginTop: 8,
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
  button: {
    alignSelf: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  emptyContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker background
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.8, // 80% of screen width
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  expandCollapseText: {
    fontWeight: "bold",
    width: 40,
    textAlign: "right", // Align text to the right
  },
  spacer: {
    flex: 1, // Push
  },
});

export default OrderList;
