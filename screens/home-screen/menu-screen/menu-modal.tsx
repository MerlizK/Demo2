import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import CustomCheckbox from "../../../components/checkbox";

import Entypo from "@expo/vector-icons/Entypo";

interface Option {
  name: string;
  optionId: string;
  require: boolean;
  numberminmax: [number, number];
  subOption: SubOption[];
}

interface SubOption {
  name: string;
  subOptionId: string;
  price: string;
}

interface MenuModalProps {
  isVisible: boolean;
  onClose: () => void;
  menu?: { name: string; image?: string };
  price: number;
  options?: Option[] | [];
  description: string;
  picture?: string | null;
  setMenu: React.Dispatch<React.SetStateAction<{ name: string } | undefined>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setPicture: React.Dispatch<React.SetStateAction<string | null>>;
  onSave: () => void;
  onDelete: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({
  isVisible,
  onClose,
  menu,
  price,
  options,
  description,
  picture,
  setMenu,
  setPrice,
  setOptions,
  setDescription,
  setPicture,
  onSave,
  onDelete,
}) => {
  const [isOption, setIsOption] = useState(false);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri || null;
      setPicture(selectedImageUri);
      console.log(result);
    } else {
      console.log("User cancelled image picker");
    }
  };

  const [isRequired, setIsRequired] = useState(true);
  const [isSingleChoice, setIsSingleChoice] = useState(true);
  const [currentOption, setCurrentOption] = useState("");
  const [minmax, setMinMax] = useState([0, 0]);
  const [subOptions, setSubOptions] = useState<SubOption[]>([]);
  const [newSubOption, setNewSubOption] = useState({
    name: "",
    price: "",
    subOptionId: (subOptions.length + 1).toString(),
  });
  const [optionName, setOptionName] = useState("");

  const addSubOption = () => {
    setSubOptions([...subOptions, newSubOption]);
    setNewSubOption({
      name: "",
      price: "",
      subOptionId: (subOptions.length + 1).toString(),
    });
  };

  const removeSubOption = (index: number) => {
    setSubOptions(subOptions.filter((_, i) => i !== index));
  };

  const deleteOption = () => {
    setOptions(
      options.filter((option: Option) => option.optionId !== currentOption)
    );
    setIsOption(false);
  };

  const saveOption = () => {
    const newOption = {
      name: optionName,
      optionId: currentOption,
      require: isRequired,
      numberminmax: [minmax[0], minmax[1]],
      subOption: subOptions,
    };
    const optionIndex = options.findIndex(
      (option) => option.optionId === currentOption
    );

    if (optionIndex > -1) {
      const updatedOptions = [...options];
      updatedOptions[optionIndex] = newOption;
      setOptions(updatedOptions);
    } else {
      setOptions([...options, newOption]);
    }

    setIsOption(false);
  };

  const getMinMax = (_minmax: [number, number]) => {
    if (_minmax?.length !== 2) {
      return {
        min: 0,
        max: 0,
      };
    }
    return {
      min: _minmax[0],
      max: _minmax[1],
    };
  };
  const { min, max } = getMinMax((minmax as [number, number]) ?? [0, 0]);
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      {!isOption ? (
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Entypo
              style={{ marginTop: 10 }}
              name="chevron-left"
              size={24}
              color="black"
            />
            <Text style={styles.headerText}>ชื่อเมนู</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="ชื่อเมนู"
            placeholderTextColor="#000"
            value={menu?.name || ""}
            onChangeText={(text) => {
              setMenu((prev) => ({ ...prev, name: text }));
            }}
          />
          <ScrollView style={styles.container}>
            <TouchableOpacity
              style={styles.imageUploadContainer}
              onPress={handleImagePick}
            >
              {picture ? (
                <Image source={{ uri: `data:image/jpeg;base64,${picture}` }} style={styles.imagePreview} />
              ) : (
                <Text style={styles.description}>Select Image</Text>
              )}
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text style={styles.description}>ราคา</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="ราคา"
                placeholderTextColor="#000"
                value={price.toString()}
                onChangeText={(e) => setPrice(Number(e))}
                keyboardType="numeric"
              />
              <Text style={styles.description}>บาท</Text>
            </View>
            <View>
              {options &&
                options.map((item: Option, index) => (
                  <View key={index}>
                    {/* Row for item.name and SettingIcon */}
                    <View style={styles.optionRow}>
                      <Text style={{ fontWeight: "bold", color: "black" }}>
                        {item.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentOption(item.optionId);
                          setMinMax(item.numberminmax);
                          setIsOption(true);
                          setSubOptions(item.subOption);
                          setIsRequired(item.require);
                          setIsSingleChoice(
                            item.numberminmax[0] === 1 &&
                            item.numberminmax[1] === 1 &&
                            true
                          );
                          setOptionName(item.name);
                        }}
                      >
                        <Entypo
                          style={{ marginTop: 10 }}
                          name="cog"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Rows for subItem.name and subItem.price */}
                    {item.subOption?.map((subItem, subIndex) => (
                      <View key={subIndex} style={styles.subOptionRow}>
                        <Text style={styles.description}>{subItem.name}</Text>
                        <Text style={styles.description}>
                          + {subItem.price} บาท
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
            </View>
            <TouchableOpacity
              style={styles.addOptionButton}
              onPress={() => {
                setCurrentOption((options.length + 1).toString());
                setSubOptions([]);
                setIsRequired(true);
                setIsSingleChoice(true);
                setOptionName("");
                setMinMax([0, 0]);
                setIsOption(true);
              }}
            >
              <Text style={styles.addOptionButtonText}>เพิ่ม Option</Text>
            </TouchableOpacity>

            <Text style={{ fontWeight: "bold", color: "black" }}>คำอธิบาย</Text>
            <TextInput
              style={styles.textAreaInput}
              placeholder="คำอธิบาย"
              placeholderTextColor="#000"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={4}
            />
            <View style={styles.modalButtonRow}>
              {menu && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    onDelete();
                    onClose();
                  }}
                >
                  <Text style={styles.deleteButtonText}>ลบเมนู</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  onSave();
                  onClose();
                }}
              >
                <Text style={styles.saveButtonText}>
                  {menu ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มเมนู"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setIsOption(false)}
          >
            <Entypo
              style={{ marginTop: 10 }}
              name="chevron-left"
              size={24}
              color="black"
            />
            <Text style={styles.headerText}>ชื่อตัวเลือก</Text>
          </TouchableOpacity>
          <TextInput
            value={optionName}
            onChangeText={(text) => {
              setOptionName(text);
            }}
            style={styles.input}
            placeholder="ชื่อตัวเลือก"
            placeholderTextColor="#000"
          />
          <ScrollView style={styles.container}>
            <Text style={styles.title}>รายละเอียดตัวเลือก</Text>

            <Text style={styles.subtitle}>
              ลูกค้าจำเป็นต้องเลือกตัวเลือกนี้หรือไม่?
            </Text>
            <CustomCheckbox
              label="จำเป็น"
              checked={isRequired}
              onPress={() => setIsRequired(true)}
            />
            <CustomCheckbox
              label="ไม่บังคับ"
              checked={!isRequired}
              onPress={() => setIsRequired(false)}
            />

            <Text style={styles.subtitle}>ลูกค้าสามารถเลือกได้กี่ตัวเลือก</Text>
            <CustomCheckbox
              label="1 อย่าง"
              checked={isSingleChoice}
              onPress={() => {
                setIsSingleChoice(true);
                setMinMax([1, 1]);
              }}
            />
            <View style={styles.checkboxContainer}>
              <CustomCheckbox
                label="หลายตัวเลือก"
                checked={!isSingleChoice}
                onPress={() => {
                  setIsSingleChoice(false);
                  setMinMax([min, min + 1]);
                }}
              />
              <TextInput
                value={min.toString()}
                onChangeText={(text) => {
                  setMinMax([parseInt(text), max]);
                  if (min !== 1) {
                    setIsSingleChoice(false);
                  }
                }}
                style={styles.lengthInput}
                keyboardType="numeric"
              />
              <Text style={styles.subLabel}>-</Text>
              <TextInput
                value={max.toString()}
                onChangeText={(text) => {
                  setMinMax([min, parseInt(text)]);
                  if (max !== 1) {
                    setIsSingleChoice(false);
                  }
                }}
                style={styles.lengthInput}
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.subtitle}>เพิ่มตัวเลือกย่อย</Text>
            {subOptions &&
              subOptions.map((option, index) => (
                <View key={index} style={styles.subOptionContainer}>
                  <TextInput
                    value={option.name}
                    onChangeText={(text) => {
                      const newSubOptions = [...subOptions];
                      newSubOptions[index].name = text;
                      setSubOptions(newSubOptions);
                    }}
                    style={[styles.input, { flex: 3 }]}
                    placeholder="ชื่อตัวเลือกย่อย"
                    placeholderTextColor="#000"
                  />
                  <TextInput
                    value={option.price.toString()}
                    onChangeText={(text) => {
                      const newSubOptions = [...subOptions];
                      newSubOptions[index].price = text;
                      setSubOptions(newSubOptions);
                    }}
                    style={[styles.priceInput, { flex: 1 }]}
                    keyboardType="numeric"
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.currencyLabel}>บาท</Text>
                    {subOptions.length >= 1 || option.name !== "" ? (
                      <TouchableOpacity
                        onPress={() => removeSubOption(index)}
                        style={styles.iconButton}
                      >
                        <Entypo
                          style={{ marginTop: 10 }}
                          name="trash"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              ))}
            <View style={styles.subOptionContainer}>
              <TextInput
                value={newSubOption.name}
                onChangeText={(text) => {
                  setNewSubOption((prev) => ({ ...prev, name: text }));
                }}
                style={[styles.input, { flex: 3 }]}
                placeholder="ชื่อตัวเลือกย่อย"
                placeholderTextColor="#000"
              />
              <TextInput
                value={newSubOption.price}
                onChangeText={(text) => {
                  setNewSubOption((prev) => ({ ...prev, price: text }));
                }}
                style={[styles.priceInput, { flex: 1 }]}
                keyboardType="numeric"
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.currencyLabel}>บาท</Text>
                <TouchableOpacity
                  onPress={addSubOption}
                  style={styles.iconButton}
                >
                  <Entypo
                    style={{ marginTop: 10 }}
                    name="squared-plus"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={deleteOption}
              >
                <Text style={styles.deleteButtonText}>ลบ Option</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveOption}>
                <Text style={styles.saveButtonText}>บันทึก Option</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    marginTop: 10,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  input: {
    color: "#000",
    width: "100%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  textAreaInput: {
    color: "#000",
    minHeight: 160,
    width: "100%",
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    textAlignVertical: "top",
  },
  imageUploadContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  description: {
    color: "#000",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addOptionButton: {
    alignSelf: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "black",
    borderRadius: 5,
    minWidth: 100,
    justifyContent: "center",
    marginVertical: 10,
  },
  addOptionButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subOptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  deleteButton: {
    margin: 5,
    backgroundColor: "red",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "green",
    margin: 5,
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
  },
  container: {
    marginBottom: 100,
    padding: 8,
    backgroundColor: "white",
    gap: 8,
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    // marginTop: 16,
    // marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  subLabel: {
    marginLeft: 8,
    color: "gray",
  },
  subOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  priceInput: {
    color: "black",
    width: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 8,
    margin: 8,
  },
  currencyLabel: {
    alignSelf: "center",
    marginRight: 8,
  },
  iconButton: {
    padding: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  lengthInput: {
    color: "#000",
    width: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 8,
    margin: 8,
  },
});

export default MenuModal;
