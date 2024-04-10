import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { pinModal } from "../Styles/style1";
// @ts-ignore
import { getReactNativePersistence, getAuth, initializeAuth, onAuthStateChanged } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { app, db } from "../firebaseConfig";
import { addDoc, updateDoc, doc, collection, getDocs } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default function HomeScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPinModalVisible, setNewPinModalVisible] = useState(false); // New state for creating pin modal visibility
    const [editingMarker, setEditingMarker] = useState(null);
    const [tempTitle, setTempTitle] = useState('');
    const [tempDescription, setTempDescription] = useState('');
    const [newPinCoordinates, setNewPinCoordinates] = useState(null); // New state for storing coordinates of the new pin
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
    }, []);

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
    }, []);

    useEffect(() => {
        if (user) {
            loadUserPinsFromFirestore().then(loadedPins => {
                setMarkers(loadedPins);
            });
        } else {
            setMarkers([]);
        }
    }, [user]);

    const isOwner = (marker) => {
        return user && marker.userId === user.uid;
    };

    const pinPress = (markerId) => {
        const marker = markers.find((m) => m.id === markerId);
        if (marker && isOwner(marker)) {
            setEditingMarker(marker);
            setTempTitle(marker.title);
            setTempDescription(marker.description);
            setIsModalVisible(true);
        } else {
            alert('You can only edit your own pins.');
        }
    };

    const saveMarkerInfo = () => {
        const updatedPinData = {
            title: tempTitle,
            description: tempDescription,
        };

        if (editingMarker && editingMarker.id) {
            updatePinInFirestore(editingMarker.id, updatedPinData).then(() => {
                const updatedMarkers = markers.map(marker => {
                    if (marker.id === editingMarker.id) {
                        return { ...marker, ...updatedPinData };
                    }
                    return marker;
                });

                setMarkers(updatedMarkers);
                setIsModalVisible(false);
                setEditingMarker(null);
                setTempTitle('');
                setTempDescription('');
            }).catch(error => {
                console.error('Failed to update pin:', error);
            });
        }
    };

    // Updated function with modal for new pin creation
    const handleMapPress = (event) => {
        if (!user) {
            alert('You must be logged in to place pins.');
            return;
        }
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setNewPinCoordinates({ latitude, longitude });
        setNewPinModalVisible(true); // Show modal for entering new pin details
    };

    // New function to handle saving the new pin
    const handleSaveNewPin = () => {
        if (!newPinCoordinates) return;
        const newMarker = {
            coordinate: newPinCoordinates,
            title: tempTitle,
            description: tempDescription,
            userId: user.uid,
        };
        savePinToFirestore(newMarker).then((savedPinWithUserId) => {
            setMarkers(prevMarkers => [...prevMarkers, savedPinWithUserId]);
            // Reset the form and hide the modal
            setNewPinModalVisible(false);
            setTempTitle('');
            setTempDescription('');
            setNewPinCoordinates(null);
        }).catch(error => {
            console.error('Failed to save pin:', error);
        });
    };

    const savePinToFirestore = async (pin) => {
        if (!user) {
            console.log('User not logged in. Pin not saved.');
            return;
        }
        try {
            const userPinsCollectionRef = collection(db, 'users', user.uid, 'pins');
            const pinWithUserId = { ...pin, userId: user.uid }; // Ensure userId is correctly attached
            const docRef = await addDoc(userPinsCollectionRef, pinWithUserId);
            console.log('Pin saved to Firestore with ID:', docRef.id);
            return { ...pinWithUserId, id: docRef.id };
        } catch (error) {
            console.error('Error saving pin:', error);
        }
    };
    const togglePins = () => {
        setShowPins(!showPins); // Toggle the state to show/hide pins
    };

    const loadUserPinsFromFirestore = async () => {
        if (!user) {
            console.log('User not logged in. No pins loaded.');
            return [];
        }
        try {
            const userPinsCollectionRef = collection(db, 'users', user.uid, 'pins');
            const querySnapshot = await getDocs(userPinsCollectionRef);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error loading pins:', error);
            return [];
        }
    };

    const updatePinInFirestore = async (pinId, updatedPinData) => {
        if (!user) {
            console.error("User must be logged in to update pins.");
            return;
        }

        try {
            const pinRef = doc(db, 'users', user.uid, 'pins', pinId);
            await updateDoc(pinRef, updatedPinData);
            console.log('Pin updated successfully in Firestore');
        } catch (error) {
            console.error('Error updating pin:', error);
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
                        onCalloutPress={() => isOwner(marker) ? pinPress(marker.id) : alert('You can only edit your pins.')}
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
                <Pressable onPress={togglePins}>
                    <AntDesign name="retweet" size={40} color="black" />
                </Pressable>
            </View>

            {/* Existing Modal for Editing Pins */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
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
                                                    placeholder="Title"
                                                    onChangeText={setTempTitle}
                                                    value={tempTitle}
                                                />
                                                <TextInput
                                                    style={pinModal.input}
                                                    placeholder="Description"
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
                                            </>
                                        )}
                                    </>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* New Modal for Creating New Pins */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={newPinModalVisible}
                onRequestClose={() => setNewPinModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setNewPinModalVisible(false)}>
                    <View style={pinModal.fullScreenOverlay}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View style={pinModal.modalView}>
                                <TextInput
                                    style={pinModal.input}
                                    placeholder="Title"
                                    onChangeText={setTempTitle}
                                    value={tempTitle}
                                />
                                <TextInput
                                    style={pinModal.input}
                                    placeholder="Description"
                                    onChangeText={setTempDescription}
                                    value={tempDescription}
                                />
                                <Button
                                    title="Save Pin"
                                    onPress={handleSaveNewPin}
                                />
                                <Button
                                    title="Cancel"
                                    color="red"
                                    onPress={() => setNewPinModalVisible(false)}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}