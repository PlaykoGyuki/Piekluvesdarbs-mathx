import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const MenuScreen = () => {

  const navigation = useNavigation();

  const handleMenuItemPress = (itemID) => {
      navigation.navigate('Equation1Theory')
  }
  
  const menuItems = [
    { id: '1', image: require('../assets/Equations/equation1.png'), height: 80, width: 200},
    { id: '2', image: require('../assets/Equations/equation2.png'), height: 110, width: 500, marginTop: -15},
    { id: '3', image: require('../assets/Equations/equation3.png'), height: 110, width: 100, marginTop: -15},
    { id: '4', image: require('../assets/Equations/equation4.png'), height: 150, width: 230, marginTop: -35},
    { id: '5', image: require('../assets/Equations/equation5.png'), height: 150, width: 280, marginTop: -30, marginRight: -10},
    { id: '6', image: require('../assets/Equations/equation6.png'), height: 150, width: 250, marginTop: -40},
    { id: '7', image: require('../assets/Equations/equation7.png'), height: 150, width: 250, marginTop: -40, marginRight: -10},
    { id: '8', image: require('../assets/Equations/equation8.png'), height: 150, width: 200, marginTop: -30, marginRight: 15},
    { id: '9', image: require('../assets/Equations/equation9.png'), height: 150, width: 200, marginTop: -35},
    { id: '10', image: require('../assets/Equations/equation10.png'), height: 150, width: 180, marginTop: -40},
    { id: '11', image: require('../assets/Equations/equation11.png'), height: 150, width: 240, marginTop: -35},
    { id: '12', image: require('../assets/Equations/equation12.png'), height: 150, width: 240, marginTop: -30, marginRight: -15},
  ];


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMenuItemPress(item.id)}>
      <View style={styles.menuItem}>
        <Image source={item.image} style={[styles.menuItemImage, item.customImageStyle, {height: item.height, width: item.width, marginTop: item.marginTop, marginRight: item.marginRight}]} />
      </View>
    </TouchableOpacity>

  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
  },
  menuItem: {
    flex: 0.3,
    padding: 20,
    height: 120,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'lightgray',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 20
  },
  menuItemImage: {
    width: 50,
    // height: 50,
    resizeMode: 'contain',
  },
});

export default MenuScreen;