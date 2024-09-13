import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import MenuModal from './menu-modal';
import SettingIcon from '../../../assets/icons/gear-six.svg';
import MockMenu from '../../../mockdata/kuman-menu.json';

interface Option {
  name: string;
  optionId: string;
  require: boolean;
  numberMinMax: [number, number];
  subOption: SubOption[];
}

interface SubOption {
  name: string;
  subOptionId: string;
  price: string;
}

interface MenuItem {
  name: string;
  menuId: string;
  price: string;
  image?: string;
  description?: string;
  available: boolean;
  option: Option[];
}

const ShopMenuComponent = () => {
  const [data, setData] = useState<{ isOpen: boolean; data: MenuItem[] }>({
    isOpen: true,
    data: [],
  });
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isOpen, setIsOpen] = useState(data.isOpen);
  const [isAddMenuVisible, setIsAddMenuVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuItem | null>(null);
  const [confirmAction, setConfirmAction] = useState<null | 'save' | 'delete'>(
    'save',
  );
  const [price, setPrice] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    setData(MockMenu as any); // Casting to 'any' due to type mismatch
    setMenus(MockMenu.data as unknown as MenuItem[]);
    setIsOpen(MockMenu.isOpen);
  }, []);

  const toggleStatus = (menuId: string): void => {
    setMenus(prevMenus =>
      prevMenus.map(menu =>
        menu.menuId === menuId ? { ...menu, available: !menu.available } : menu,
      ),
    );
  };

  const openAddMenuModal = () => {
    setCurrentMenu(null);
    setPrice('');
    setOptions([]);
    setImage(null);
    setDescription('');
    setIsAddMenuVisible(true);
  };
  const handleSaveMenu = () => {
    console.log('Save menu data', data);
    console.log('Save menu menu', menus);
  };

  const openEditMenuModal = (menu: MenuItem) => {
    setCurrentMenu(menu);
    setPrice(menu.price || '');
    setOptions(menu.option || []);
    setImage(menu.image || '');
    setDescription(menu.description || '');
    setIsAddMenuVisible(true);
  };

  const handleSave = () => {
    setConfirmAction('save');
    setIsConfirmModalVisible(true);
  };

  const handleDelete = (menuId: string) => {
    setCurrentMenu(menus.find(menu => menu.menuId === menuId) || null);
    setConfirmAction('delete');
    setIsConfirmModalVisible(true);
  };

  const confirmActionHandler = () => {
    if (confirmAction === 'save') {
      if (currentMenu) {
        setMenus(prevMenus =>
          prevMenus.map(menu =>
            menu.menuId === currentMenu.menuId
              ? {
                  ...currentMenu,
                  price,
                  option: options,
                  image,
                  description,
                }
              : menu,
          ),
        );
      } else {
        const newId = (menus.length + 1).toString().padStart(4, '0');
        setMenus([
          ...menus,
          {
            menuId: newId,
            name: `เมนูที่ ${newId}`,
            available: true,
            price,
            option: options || [],
            image,
          },
        ]);
      }
    } else if (confirmAction === 'delete') {
      setMenus(prevMenus =>
        prevMenus.filter(menu => menu.menuId !== (currentMenu?.menuId || '')),
      );
    }
    setIsAddMenuVisible(false);
    setIsConfirmModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.shopName}>ร้านที่1</Text>
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>สถานะร้าน:</Text>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isOpen ? styles.openButton : styles.closedButton,
          ]}
          onPress={() => setIsOpen(!isOpen)}>
          <Text style={styles.buttonText}>
            {isOpen ? 'ร้านเปิด' : 'ร้านปิด'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.menuList}>
        {menus &&
          menus.map(menu => (
            <View key={menu.menuId} style={styles.menuItem}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.menuName}>{menu.name}</Text>
                <Text style={styles.menuPrice}>{menu.price}</Text>
              </View>
              {menu.image && (
                <Image source={{ uri: menu.image }} style={styles.menuImage} />
              )}

              <TouchableOpacity
                style={[
                  styles.statusButton,
                  menu.available
                    ? styles.statusAvailable
                    : styles.statusSoldOut,
                ]}
                onPress={() => toggleStatus(menu.menuId)}>
                <Text style={styles.statusButtonText}>
                  {menu.available ? 'เหลือ' : 'หมด'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => openEditMenuModal(menu)}>
                <SettingIcon />
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: -10,
          flexDirection: 'row',
          gap: 20,
        }}>
        <TouchableOpacity style={styles.addButton} onPress={openAddMenuModal}>
          <Text style={styles.addButtonText}>เพิ่มเมนู</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleSaveMenu}>
          <Text style={styles.addButtonText}>บันทึกการตั้งค่าเมนู</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isConfirmModalVisible}
        animationType="fade"
        onRequestClose={() => setIsConfirmModalVisible(false)}>
        <View style={styles.confirmModalContent}>
          <Text>ยืนยันการ {confirmAction === 'save' ? 'บันทึก' : 'ลบ'}?</Text>
          <View style={styles.confirmButtonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsConfirmModalVisible(false)}>
              <Text>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmActionHandler}>
              <Text>ยืนยัน</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <MenuModal
        isVisible={isAddMenuVisible}
        onClose={() => setIsAddMenuVisible(false)}
        menu={currentMenu}
        price={price}
        options={options}
        image={image}
        setMenu={setCurrentMenu}
        setPrice={setPrice}
        setOptions={setOptions}
        setImage={setImage}
        onSave={handleSave}
        onDelete={() => handleDelete(currentMenu?.menuId || '')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    width: '100%',
    gap: 20,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shopName: {
    marginTop: 70,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusButton: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  openButton: {
    backgroundColor: 'green',
  },
  closedButton: {
    backgroundColor: 'red',
  },
  menuList: {
    flex: 1,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuName: {
    fontSize: 18,
  },
  menuPrice: {
    fontSize: 16,
  },
  menuImage: {
    width: 60,
    height: 40,
    borderRadius: 4,
    flex: 1,
  },
  statusAvailable: {
    backgroundColor: 'green',
  },
  statusSoldOut: {
    backgroundColor: 'red',
  },
  settingsButton: {
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 20,
    maxWidth: 180,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmModalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  confirmButtonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
});

export default ShopMenuComponent;
