import React, { useState, useCallback } from 'react'
import { StyleSheet, Image, Text, View, Button, Modal, TextInput } from 'react-native'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { useEffect } from 'react';
import { Audio } from 'expo-av';


export default function Equat1Task() {
    
    const [equation, setEquation] = useState('');
    const [discriminant, setDiscriminant] = useState(0);
    const [root1, setRoot1] = useState(0)
    const [root2, setRoot2] = useState(0)

    const fetchQuadraticFunction = async () => {
      try {
        const response = await axios.get('http://192.168.8.190:8000/api/calculate_roots/');
        setEquation(response.data.equation);
        setDiscriminant(response.data.discriminant);
        setRoot1(response.data.root1)
        setRoot2(response.data.root2)
        // setMessage('');
        // setUserInput('');
      } catch (error) {
        console.error(error);
      }
    };


    useEffect(() => {
      fetchQuadraticFunction();
    }, []);



    const navigation = useNavigation();

    const [isLoaded] = useFonts({
        "poppins-mid": require("../assets/fonts/Poppins-Black.ttf"),
        "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "poppins-italic": require("../assets/fonts/Poppins-Italic.ttf"),
    })

    const [userInput, setUserInput] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const checkDiscriminant = () => {
      if (userInput === discriminant.toString()) {
        setModalMessage('Correct discriminant! You solved it.');
        setModalVisible(true); 
        playSound(victorySound);

        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate("SearchMenu"); 
        }, 3500); 
      } else {
        setModalMessage('Incorrect discriminant. Try again.');
        setModalVisible(true); 
        playSound(failureSound);

        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate("SearchMenu"); 
        }, 3000); 
      }
    };

    // Audio

    const sounds = {
      victorySound: require('../assets/victoryhorns.mp3'),
      failureSound: require('../assets/errorhorns.mp3'),
    };
    
    const [victorySound, setVictorySound] = useState(null);
    const [failureSound, setFailureSound] = useState(null);
    
    async function loadSounds() {
      try {
        const victory = new Audio.Sound();
        await victory.loadAsync(sounds.victorySound);
        setVictorySound(victory);
    
        const failure = new Audio.Sound();
        await failure.loadAsync(sounds.failureSound);
        setFailureSound(failure);
      } catch (error) {
        console.error('Error loading sounds:', error);
      }
    }
  
    useEffect(() => {
      loadSounds();
    }, []);
    
    async function playSound(sound) {
      try {
        await sound.playAsync();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
    
    
    const handleOnLayout = useCallback(async () => {
        if (isLoaded) {
          await SplashScreen.hideAsync(); 
        }
      }, [isLoaded]);
    
      if (!isLoaded) {
        return null;
      }
    return (
        <View style={styles.taskContainer}>
            <Text style={styles.equation}>
              {equation}
            </Text>
            {/* {discriminant !== null && (
              <Text style={styles.discriminantText}>Discriminant: {discriminant}</Text>
            )} */}
            <View
              style={styles.diskContainer}
            >
              <Text style={styles.diskLabel}>Input the correct discriminant</Text>
              <TextInput
                placeholderTextColor="#fff" 
                value={userInput}
                style={styles.diskInput}
                placeholder='Discriminant'
                onChangeText={(text) => setUserInput(text)}
                >
              </TextInput>
            </View>
            <View 
              style={styles.rootContainer}
            >
              <Text style={styles.rootLabel}>Input the roots of this equation</Text>
              <TextInput
                placeholderTextColor="#fff" 
                style={styles.rootInput}
                placeholder='Root 1'>

              </TextInput>
              <TextInput
                placeholderTextColor="#fff" 
                style={styles.rootInput}
                placeholder='Root 2'>

              </TextInput>
            </View>


            <TouchableOpacity style={styles.submitBtn} onPress={() => {
              checkDiscriminant();
            }}>
                <Text>Submit</Text>
            </TouchableOpacity>
            {isModalVisible && (
            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.paragraph}>{modalMessage}</Text>
                  {userInput === discriminant.toString() && (
                    <>
                      <Text style={styles.paragraph}>You've earned 0.05 BotCoin.</Text>
                      <Image
                        source={require("../assets/BotCoin.jpg")}
                        style={styles.BotCoinImg}
                      />
                    </>
                  )}
                  <TouchableOpacity
                    style={styles.homeBtn}
                    title="Returning to the menu"
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate("SearchMenu");
                    }}
                  >
                    <Text style={styles.homeBtnText}>Returning to the menu...</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
    )
}

const styles = StyleSheet.create({
    taskContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: '#363642',
        fontFamily: 'poppins-mid',
        width: '100%',
        height: '100%',
      },
      equation: {
        marginTop: '20%',
        color: "white",
        fontFamily: 'poppins-bold',
        fontSize: 40,
        color: '#FF5733', 
      },
      message: {
        fontSize: 14,
        marginBottom: 10,
      },
      equationText: {
        fontSize: 20,
        marginBottom: 20,
      },
      discriminantText: {
        fontSize: 16,
      },
      submitBtn: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        width: 300,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
        fontFamily: 'poppins-bold',
        fontSize: 40,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        fontFamily: 'poppins-mid',
        fontSize: 20,
      },
      BotCoinImg: {
        width: 80,
        height: 80,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        margin: 20,
      },
      homeBtn: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'black',
        width: 250,
        height: 40,
        alignContent: 'center',
        margin: 10,
      },
      homeBtnText: {
        top: '15%',
        fontSize: 20,
        fontFamily: 'poppins-bold',
        color: 'white',
        textAlign: 'center',
      },
      paragraph: {
        fontSize: 20,
        width: '80%',
      },
      risin1: {
        color: 'white',
        fontSize: 50
      },
      rootContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      rootLabel: {
        fontSize: 25,
        width: '90%',
        flexWrap: 'wrap',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'poppins-bold',
        color: '#fff',
      },  
      rootInput: {
        fontFamily: 'poppins-bold',
        textAlign: 'center',
        borderWidth: 1,
        width: 120,
        height: 50,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        margin: 15,
        color: 'white',
        fontSize: 20,
      },
      diskContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      diskLabel: {
        fontSize: 25,
        width: '90%',
        flexWrap: 'wrap',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'poppins-bold',
        color: '#fff',
      },  
      diskInput: {
        fontFamily: 'poppins-bold',
        textAlign: 'center',
        borderWidth: 1,
        width: 180,
        height: 50,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        margin: 15,
        color: 'white',
        fontSize: 20,
      },
});