
import React, { useEffect, useState } from 'react';
import {Modal, Text, TextInput, View, Button, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import {pinModal} from "../Styles/style1";
export default function HomeScreen() {

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

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        const newMarker = {
            id: Math.random().toString(),
            coordinate: { latitude, longitude },
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
                return { ...m, title: tempTitle, description: tempDescription };
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

        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
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
