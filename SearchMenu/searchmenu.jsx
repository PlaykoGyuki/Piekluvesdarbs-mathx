import React, { useState, useCallback } from 'react'
import { StyleSheet, Image, Text, View, Button } from 'react-native'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SearchBar } from 'react-native-elements';
import MenuScreen from '../Components/MenuScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
SplashScreen.preventAutoHideAsync();



export default function SearchMenu() {

    const navigation = useNavigation();

    const [isLoaded] = useFonts({
        "poppins-mid": require("../assets/fonts/Poppins-Black.ttf"),
        "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "poppins-italic": require("../assets/fonts/Poppins-Italic.ttf"),
    })
    
    const handleOnLayout = useCallback(async () => {
        if (isLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [isLoaded]);
    
      if (!isLoaded) {
        return null;
      }

   
    
    return(
        <View style={styles.container} onLayout={handleOnLayout}>
            <Text style={styles.header} >
                Training
            </Text>
            <View style={styles.searchcontianer}>
                <SearchBar 
                    style={styles.searchbar}
                    placeholder='Search for equations'
                    onChangeText={this.updateSearch}
                    round='true'
                    containerStyle="transparent"
                />
                <MenuScreen />
            </View>

        </View>
        );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#363642'
    },
    header: {
        flex: 1,
        fontSize: 50,
        fontFamily: 'poppins-bold',
        top: '8%',
        alignItems: 'flex-start',
        color: '#FF5733',
    },
    searchcontianer: {
        width: '100%',
        height: '80%'

    },
    searchbar: {
        backgroundColor: 'transparent'
    },


  
  });
  