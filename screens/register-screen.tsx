import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { APIURL } from "../Constants";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [shopName, setShopName] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [canteenId, setCanteenId] = useState<number | null>(null);
  const [canteens, setCanteens] = useState<any[]>([]);
  const [shopNumber, setShopNumber] = useState<string>("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const response = await axios.get(`${APIURL}canteen`);
        setCanteens(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch canteens");
      }
    };
    fetchCanteens();
  }, []);

  const handleRegister = async () => {
    if (!username || !password || !shopName || !tel || !canteenId) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (!base64Image) {
      Alert.alert("Error", "Please select an image before submitting.");
      return;
    }

    try {
      const payload = {
        canteenId,
        username,
        password,
        shopName,
        profilePicture: base64Image,
        tel,
        shopNumber,
      };

      const response = await axios.post(`${APIURL}shop/create-shop`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        const { token } = response.data;
        await AsyncStorage.setItem("authToken", token);
        navigation.navigate("Home" as never);
      } else {
        Alert.alert("Registration Failed", "Please check your information.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "An error occurred during registration.";
      Alert.alert("Registration Error", message);
    }
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to your photos in settings."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      const selectedImage = result.assets?.[0];
      setImageUri(selectedImage?.uri || null);
      setBase64Image(selectedImage?.base64 || null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>สร้างร้านใหม่</Text>

      <View style={styles.formContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>ชื่อร้าน:</Text>
          <TextInput
            placeholder="Shop Name"
            style={styles.input}
            value={shopName}
            onChangeText={setShopName}
          />
        </View>

        <TouchableOpacity
          style={styles.imageUploadContainer}
          onPress={handleImagePick}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <Entypo
              style={{ marginTop: 10 }}
              name="camera"
              size={48}
              color="black"
            />
          )}
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.label}>เบอร์โทรศัพท์:</Text>
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            value={tel}
            onChangeText={setTel}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>โรงอาหาร:</Text>
          <View
            style={{
              flex: 1,
              height: 50,
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            }}
          >
            <Picker
              selectedValue={canteenId}
              onValueChange={(itemValue) => setCanteenId(itemValue)}
            >
              {canteens.map((canteen) => (
                <Picker.Item
                  key={canteen.canteenId}
                  label={canteen.name}
                  value={canteen.canteenId}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>หมายเลขร้าน:</Text>
          <TextInput
            placeholder="Shop Number"
            style={styles.input}
            value={shopNumber}
            onChangeText={setShopNumber}
          />
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>สร้างร้าน</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    color: "#000",
    left: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    alignSelf: "flex-start",
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    width: 100,
    fontSize: 16,
    color: "#000",
    marginRight: 10,
  },
  input: {
    color: "#000",
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  imageUploadContainer: {
    alignItems: "center",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
