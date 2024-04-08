import { Pressable, Text, View, ActivityIndicator, Modal, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { style1, pinModal } from "../Styles/style1";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

export default function HomeScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state to track auth status checking
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingMarker, setEditingMarker] = useState(null);
    const [tempTitle, setTempTitle] = useState('');
    const [tempDescription, setTempDescription] = useState('');
    const isOwner = (marker) => {
        // Placeholder for your actual ownership checking logic
        // This should return true if the current user is the owner of the marker
        // and false otherwise. For demonstration purposes, let's assume every marker belongs to the current user.
        return false; // Replace this with your actual logic
    };
    // If the user is logged in he cant access the login button
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Returns the function to unsubscribe from the auth listener on component unmount
        return unsubscribe;
    }, []);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const handleMapPress = (event) => {
        const {latitude, longitude} = event.nativeEvent.coordinate;
        const newMarker = {
            id: Math.random().toString(),
            coordinate: {latitude, longitude},
            title: 'New Marker',
            description: "Fill description",
        };
        setMarkers([...markers, newMarker]);
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
                return {...m, title: tempTitle, description: tempDescription};
            }
            return m;
        }));
        setIsModalVisible(false);
        setEditingMarker(null);
    };

    const Grimstad = {
        latitude: 58.3405,
        longitude: 8.59343,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    return (
        <View style={{flex: 1}}>
            <MapView
                style={{flex: 1}}
                onPress={handleMapPress}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={Grimstad}
            >
                {markers.map((marker) => (
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
                right: 10,
                alignItems: 'flex-end'
            }}>
                {user && (
                    <Pressable onPress={() => navigation.navigate('Profile')} style={style1.btn1}>
                        <Text style={style1.text1}>Profile</Text>
                    </Pressable>
                )}
                {user && (
                    <Pressable onPress={() => navigation.navigate('Favorites')} style={style1.btn1}>
                        <Text style={style1.text1}>Favorites</Text>
                    </Pressable>
                )}
                {!user && (
                    <Pressable onPress={() => navigation.navigate('Login')} style={style1.btn1}>
                        <Text style={style1.text1}>Login</Text>
                    </Pressable>
                )}
            </View>

            {/* Modal Component */}
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