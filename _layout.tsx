import React, { useState } from 'react';
import {View,Text,TextInput,Button,FlatList,StyleSheet,Image,TouchableOpacity,Modal,ScrollView, Dimensions} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';

// Get screen width for responsive sizing
const { width } = Dimensions.get('window');

type Screen = 'register' | 'login' | 'home' | 'list';

export default function App() {
  const [screen, setScreen] = useState<Screen>('register');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [homeData, setHomeData] = useState([
    { id: '1', uri: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg', name: 'Fluffy Dog', info: 'Kota: Sunnyville, Usia: 2' },
    { id: '2', uri: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg', name: 'Curious Cat', info: 'Kota: Meowtown, Usia: 3' },
    { id: '3', uri: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg', name: 'Sleepy Kitty', info: 'Kota: Purrfect, Usia: 1' },
  ]);
  const [listData, setListData] = useState([
    // Changed IDs to be unique to ensure proper FlatList rendering
    { id: 'list-1', uri: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/corgi-2785002_1280.jpg', name: 'Happy Corgi', price: 'Rp 1.500.000' },
    { id: 'list-2', uri: 'https://cdn.pixabay.com/photo/2016/05/22/20/22/cat-1409257_1280.jpg', name: 'Playful Kitten', price: 'Rp 800.000' },
  ]);

  const [newHomeName, setNewHomeName] = useState('');
  const [newListName, setNewListName] = useState('');
  const [newListPrice, setNewListPrice] = useState('');

  const tambahDataHome = () => {
    if (!newHomeName) return alert('Nama tidak boleh kosong');
    const newId = (homeData.length + 1).toString();
    setHomeData([...homeData, {
      id: newId,
      uri: 'https://cdn.pixabay.com/photo/2019/08/19/13/58/dog-4416172_1280.jpg',
      name: newHomeName,
      info: 'Kota: Petville, Usia: ?',
    }]);
    setNewHomeName('');
  };

  const hapusDataHome = (id: string) => {
    setHomeData(homeData.filter(item => item.id !== id));
  };

  const tambahDataList = () => {
    if (!newListName || !newListPrice) return alert('Isi semua field');
    // Ensure unique IDs for list items as well
    const newId = `list-${listData.length + 1}`;
    setListData([...listData, {
      id: newId,
      uri: 'https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404_1280.jpg',
      name: newListName,
      price: newListPrice,
    }]);
    setNewListName('');
    setNewListPrice('');
  };

  const hapusDataList = (id: string) => {
    setListData(listData.filter(item => item.id !== id));
  };

  const renderHomeItem = ({ item }: any) => (
    <View style={styles.gridItem}>
      <TouchableOpacity onPress={() => { setSelected(item); setModalVisible(true); }}>
        <Image source={{ uri: item.uri }} style={styles.gridImage} />
        <Text>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => hapusDataHome(item.id)}>
        <Text style={styles.deleteButtonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  const renderListItem = ({ item }: any) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.uri }} style={styles.listImage} />
      <View style={styles.listText}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => hapusDataList(item.id)}>
        <Text style={styles.deleteButtonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  const BottomBar = () => (
    <View style={styles.bottomBar}>
      <TouchableOpacity onPress={() => setScreen('home')} style={styles.iconBtn}>
        <Icon name="home" size={24} color="#5C4B5C" /><Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('list')} style={styles.iconBtn}>
        <Icon name="list" size={24} color="#5C4B5C" /><Text style={styles.iconText}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );

  const ModalDetail = () => (
    <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {selected && (
            <>
              <Image source={{ uri: selected.uri }} style={styles.modalImage} />
              <Text style={styles.modalText}>{selected.name}</Text>
              <Text style={styles.modalText}>{selected.info}</Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Tutup</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  if (screen === 'register') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Daftar Akun Baru</Text>
        <TextInput style={styles.input} placeholder="Username baru" value={newUser} onChangeText={setNewUser} />
        <TextInput style={styles.input} placeholder="Password baru" secureTextEntry value={newPass} onChangeText={setNewPass} />
        <TextInput style={styles.input} placeholder="Konfirmasi password" secureTextEntry value={confirmPass} onChangeText={setConfirmPass} />
        <TouchableOpacity style={styles.authButton} onPress={() => {
          if (!newUser || !newPass) return alert('Semua field wajib diisi');
          if (newPass !== confirmPass) return alert('Password tidak sama');
          alert('Registrasi berhasil!');
          setUsername(newUser);
          setPassword(''); // Clear password field for security
          setScreen('login');
        }}>
          <Text style={styles.authButtonText}>Daftar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.switchScreenText}>Sudah punya akun? Masuk di sini.</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Masuk ke Akun Anda</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.authButton} onPress={() => {
          if (username === newUser && password === newPass && newUser !== '' && newPass !== '') {
            setScreen('home');
          } else {
            alert('Username atau password salah! Pastikan Anda sudah mendaftar.');
          }
        }}>
          <Text style={styles.authButtonText}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('register')}>
          <Text style={styles.switchScreenText}>Belum punya akun? Daftar di sini.</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'home') {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Galeri Peliharaan Lucu</Text>
        <View style={styles.inputSection}>
          <TextInput placeholder="Nama peliharaan baru" value={newHomeName} onChangeText={setNewHomeName} style={styles.input} />
          <TouchableOpacity style={styles.addButton} onPress={tambahDataHome}>
            <Text style={styles.addButtonText}>Tambah ke Galeri</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.gridContainer}>
          <FlatList
            data={homeData}
            renderItem={renderHomeItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row} // Ensures items are laid out correctly in rows
          />
        </ScrollView>
        <BottomBar />
        <ModalDetail />
      </View>
    );
  }

  if (screen === 'list') {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Daftar Produk Peliharaan</Text>
        <View style={styles.inputSection}>
          <TextInput placeholder="Nama Produk" value={newListName} onChangeText={setNewListName} style={styles.input} />
          <TextInput placeholder="Harga Produk (contoh: Rp 500.000)" value={newListPrice} onChangeText={setNewListPrice} style={styles.input} />
          <TouchableOpacity style={styles.addButton} onPress={tambahDataList}>
            <Text style={styles.addButtonText}>Tambah ke Daftar</Text>
          </TouchableOpacity>
        </View>
        <FlatList data={listData} renderItem={renderListItem} keyExtractor={item => item.id} style={styles.listScrollView} />
        <BottomBar />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // A soft, aesthetic light blue
    paddingTop: 40, // Add some padding for the status bar
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    color: '#4B0082', // Darker purple for title
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
    color: '#4B0082',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A0BBEA', // Softer blue border
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF', // White background for input
    fontSize: 16,
  },
  authButton: {
    backgroundColor: '#8A2BE2', // Amethyst purple
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  authButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchScreenText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#8A2BE2',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  inputSection: {
    padding: 10,
    backgroundColor: '#E6E6FA', // Lavender blush background for input section
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#6A5ACD', // Slate blue
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  gridContainer: {
    padding: 10,
    alignItems: 'center', // Center content in grid
    width: '100%',
  },
  row: {
    justifyContent: 'space-around', 
  },
  gridItem: {
    flex: 0.45, 
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    aspectRatio: 1,
    justifyContent: 'space-between',
  },
  gridImage: {
    width: '90%', 
    height: '60%',
    resizeMode: 'contain', 
    marginBottom: 5,
    borderRadius: 10,
  },

  listScrollView: {
    flex: 1, 
    marginHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listImage: {
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 15, 
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#A0BBEA',
  },
  listText: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F', 
  },
  price: {
    fontSize: 16,
    color: '#228B22', 
    marginTop: 4,
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3', // Light gray border
    backgroundColor: '#FFFFFF', // White background for bottom bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 8,
  },
  iconBtn: {
    alignItems: 'center',
    padding: 5,
  },
  iconText: {
    fontSize: 12,
    color: '#5C4B5C', // Darker purple-gray
    marginTop: 4,
  },

  deleteButton: {
    backgroundColor: '#DC143C', // Crimson red
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.85, // Make modal responsive to screen width
    backgroundColor: '#FFFAFA', // Snow white background
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  modalImage: {
    width: '90%',
    height: width * 0.5, // Responsive height
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#ADD8E6', // Light blue border
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#36454F',
  },
  modalCloseButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});