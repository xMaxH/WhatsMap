import React, {useEffect, useState} from 'react';
import {Button, Modal, Pressable, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import {pinModal, style1} from "../Styles/style1";
// @ts-ignore
import {getReactNativePersistence,getAuth, initializeAuth, onAuthStateChanged} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {app, db} from "../firebaseConfig"
import {addDoc, collection, getDocs, query, where} from 'firebase/firestore';
import {AntDesign} from '@expo/vector-icons';



export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export default function HomeScreen({navigation}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingMarker, setEditingMarker] = useState(null);
    const [tempTitle, setTempTitle] = useState('');
    const [tempDescription, setTempDescription] = useState('');
    const [user, setUser] = useState(null);
    const Grimstad = {
        latitude: 58.3405,
        longitude: 8.59343,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    const [showPins, setShowPins] = useState(true);





    useEffect(() => {
        return onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
    }, []);//AUTH

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []); //YOUR LOCATION

    useEffect(() => { // runs the load-user-pins function
        if (user) { // If the user is logged in it shows the users pins
            loadUserPinsFromFirestore().then(loadedPins => {
                setMarkers(loadedPins);
            });
        } else { // If not logged in no pins are displayed
            setMarkers([]);
        }
    }, [user]); // user is the authentication state variable

    const isOwner = (marker) => {
        return user && marker.userId === user.uid;
    };
    const pinPress = (markerId) => {
        const marker = markers.find((m) => m.id === markerId);
        if (marker) {
            setEditingMarker(marker);
            setTempTitle(marker.title);
            setTempDescription(marker.description);
            setIsModalVisible(true);
        }
    };
    const saveMarkerInfo = () => {
        setMarkers(markers.map((m) => {
            if (m.id === editingMarker.id) {
                return { ...m, title: tempTitle, description: tempDescription };
            }
            return m;
        }));
        setIsModalVisible(false);
        setEditingMarker(null);
    };
    const handleMapPress = (event) => {
        if (!user) {
            // If you are not logged in it returns the function and you cannot place pin
            alert('You must be logged in to place pins.');
            return;
        }
        if (user) { // If the user is logged in you can place marker with a title and description
            const {latitude, longitude} = event.nativeEvent.coordinate;
            const newMarker = {
                id: Math.random().toString(),
                coordinate: {latitude, longitude},
                title: 'New Marker',
                description: "Fill description",
            };
            savePinToFirestore(newMarker).then(() => { // Saves the pin to the firestore cloud storage
                console.log('Pin saved to Firestore');
                setMarkers(prevMarkers => [...prevMarkers, newMarker]);
            }).catch(error => {
                console.error('Failed to save pin:', error);
            });
        } else {
            // Handles the case where there is no logged in user
            console.log('User must be logged in to add pins.');
        }
    };

    const togglePins = () => {
        setShowPins(!showPins); // Toggle the state to show/hide pins
    };
    // Function that saves new pins added to the specific user by using firestore
    const savePinToFirestore = async (pin) => {
        const auth = getAuth();
        if (auth.currentUser) {
            try {
                await addDoc(collection(db, 'pins'), {
                    ...pin,
                    userId: auth.currentUser.uid,  // Include the user ID
                    timestamp: new Date()         // Include the creation timestamp
                });
                console.log('Pin saved to Firestore');
            } catch (error) {
                console.error('Error saving pin:', error);
            }
        } else {
            console.log('User not logged in. Pin not saved.');
        }
    };
    const loadUserPinsFromFirestore = async () => { // Function to load pins for the specific user in firestore
        const auth = getAuth();
        if (auth.currentUser) { //
            const pinsQuery = query(collection(db, 'pins'), where('userId', '==', auth.currentUser.uid));
            const querySnapshot = await getDocs(pinsQuery);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
            console.log('User not logged in. No pins loaded.');
            return [];
        }
    };
















    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                onPress={handleMapPress}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={Grimstad}
            >
                {showPins && markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        onCalloutPress={() => pinPress(marker.id)}
                    >
                        <Callout>
                            <View>
                                <Text>{marker.title}</Text>
                                <Text>{marker.description}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>


            <View style={{
                position: 'absolute',
                top: 10,
                right: 350,
                alignItems: 'flex-end'
            }}>
                {
                    <Pressable onPress={togglePins}>
                        <AntDesign name="retweet" size={40} color="black" />
                    </Pressable>
                }
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                    <View style={pinModal.fullScreenOverlay}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View style={pinModal.modalView}>
                                {editingMarker && (
                                    <>
                                        {isOwner(editingMarker) ? (
                                            <>
                                                <TextInput
                                                    style={pinModal.input}
                                                    onChangeText={setTempTitle}
                                                    value={tempTitle}
                                                />
                                                <TextInput
                                                    style={pinModal.input}
                                                    onChangeText={setTempDescription}
                                                    value={tempDescription}
                                                />
                                                <Button
                                                    title="Save"
                                                    onPress={saveMarkerInfo}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Text style={pinModal.input}>{tempTitle}</Text>
                                                <Text style={pinModal.input}>{tempDescription}</Text>
                                                {/* Optionally, display additional information indicating that the user cannot edit this marker */}
                                            </>
                                        )}
                                    </>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
