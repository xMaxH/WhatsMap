import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Modal,
    Pressable,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';

import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import {pinModal, style1} from "../Styles/style1";
import {mapStyle} from "../Styles/mapstyle";
// @ts-ignore
import {initializeAuth, onAuthStateChanged, getAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { app, db } from "../firebaseConfig";
import { AntDesign } from '@expo/vector-icons';
import {addDoc, updateDoc, doc, deleteDoc, collection, getDocs, query, where, onSnapshot} from 'firebase/firestore';
import {SelectOutlined} from "@ant-design/icons";
import SelectCategory from "./SelectCategory";

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default function HomeScreen() {
    const [location, setLocation] = useState(null);
    const [setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPinModalVisible, setNewPinModalVisible] = useState(false);
    const [editingMarker, setEditingMarker] = useState(null);
    const [tempTitle, setTempTitle] = useState('');
    const [tempDescription, setTempDescription] = useState('');
    const [newPinCoordinates, setNewPinCoordinates] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewPinModalVisible, setViewPinModalVisible] = useState(false);
    const [viewingPin, setViewingPin] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const Grimstad = {
        latitude: 58.3405,
        longitude: 8.59343,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };
    const [showPins, setShowPins] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [category, setCategory] = useState('');
    const [tempCategory, setTempCategory] = useState('');


    useEffect(() => {
        return onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
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

    useEffect(() => {
        async function fetchAllPins() {
            setLoading(true);
            const pins = await loadPinsFromFirestore();
            const permaPins = await loadPermaPins();
            setMarkers([...pins, ...permaPins]);
            setLoading(false);
        }

        fetchAllPins();
    }, [user]);

    useEffect(() => {
        if (viewPinModalVisible && viewingPin) {
            fetchComments(viewingPin.id);
        }
    }, [viewPinModalVisible, viewingPin]);


    const isOwner = (marker) => {
        return user?.uid === marker?.userId;
    };

    const pinPress = (markerId) => {
        const marker = markers.find((m) => m.id === markerId);
        if (marker) {
            if (user && isOwner(marker)) {
                setEditingMarker(marker);
                setTempTitle(marker.title);
                setTempDescription(marker.description);
                setTempCategory(marker.category);
                setIsModalVisible(true);
            } else {
                setViewingPin(marker);
                setViewPinModalVisible(true);
            }
        }
    };

    const saveMarkerInfo = async () => {
        if (!editingMarker) return;
        const updatedPinData = {
            title: tempTitle,
            description: tempDescription,
            category: tempCategory, // Include the category
        };
        await updatePinInFirestore(editingMarker.id, updatedPinData);
        const updatedMarkers = markers.map(marker => {
            if (marker.id === editingMarker.id) {
                return {...marker, ...updatedPinData};
            }
            return marker;
        });
        setMarkers(updatedMarkers);
        setIsModalVisible(false);
        setEditingMarker(null);
        setTempTitle('');
        setTempDescription('');
        setTempCategory(''); // Reset the temporary category
    };


    const handleMapPress = (event) => {
        if (!user) {
            Alert.alert('You must be logged in to place pins.');
            return;
        }
        if (markers.filter(marker => marker.userId === user.uid).length >= 3) {
            alert('You can only create up to 3 markers. Please delete one to add more.');
            return;
        }
        const {latitude, longitude} = event.nativeEvent.coordinate;
        setNewPinCoordinates({latitude, longitude});
        setNewPinModalVisible(true);
    };

    const handleSaveNewPin = async () => {
        if (!newPinCoordinates) return;
        setNewPinModalVisible(false);
        setLoading(true);
        try {
            const newMarker = {
                coordinate: newPinCoordinates,
                title: tempTitle,
                description: tempDescription,
                category: category, // Make sure this is saved
                userId: user.uid,
            };
            const savedPinWithUserId = await savePinToFirestore(newMarker);
            setMarkers(prevMarkers => [...prevMarkers, savedPinWithUserId]);
        } finally {
            setLoading(false);
        }
    };


    const savePinToFirestore = async (pin) => {
        try {
            const pinsCollectionRef = collection(db, 'pins');
            const pinWithUserId = {...pin, userId: user.uid};
            const docRef = await addDoc(pinsCollectionRef, pinWithUserId);
            return {...pinWithUserId, id: docRef.id};
        } catch (error) {
            console.error('Error saving pin:', error);
        }
    };

    const loadPinsFromFirestore = async () => {
        try {
            const pinsCollectionRef = collection(db, 'pins');
            const querySnapshot = await getDocs(pinsCollectionRef);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            console.error('Error loading pins:', error);
            return [];
        }
    };

    const loadPermaPins = async () => {
        try {
            const permaPinsCollectionRef = collection(db, 'permaPins');
            const querySnapshot = await getDocs(permaPinsCollectionRef);

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
        try {
            const pinRef = doc(db, 'pins', pinId);
            await updateDoc(pinRef, updatedPinData);
        } catch (error) {
            console.error('Error updating pin:', error);
        }
    };

    const deletePinFromFirestore = async (pinId) => {
        try {
            const pinRef = doc(db, 'pins', pinId);
            await deleteDoc(pinRef);
            setMarkers(markers.filter(marker => marker.id !== pinId));
        } catch (error) {
            console.error('Error deleting pin:', error);
        }
    };

    const handleDeletePin = async (pinId) => {
        setIsModalVisible(false);
        setLoading(true);
        await deletePinFromFirestore(pinId);
        setLoading(false);
    };


    const togglePins = () => {
        setShowPins(!showPins);
    };

    const handleAddComment = async (pinId) => {
        if (!newComment.trim()) {
            Alert.alert("Error", "Comment cannot be empty.");
            return;  // Prevent empty comments
        }

        const commentData = {
            text: newComment,
            userId: user.uid,
            username: user.email,
            pinId: pinId,
            timestamp: new Date(),
        };
        try {
            // Automatically creates a 'comments' subcollection under the 'pins' document if it doesn't exist
            const pinCommentsRef = collection(db, 'comments');
            await addDoc(pinCommentsRef, commentData);
            setNewComment('');  // Clear the comment input after submission
            Alert.alert('Success', 'Comment added successfully');
        } catch (error) {
            console.error('Error adding comment:', error);
            Alert.alert('Error', 'Failed to add comment');
        }
    };

    const fetchComments = async (pinId) => {
        try {
            const commentsRef = collection(db, 'comments');
            // Query comments for a specific pinId
            const q = query(commentsRef, where("pinId", "==", pinId));
            const querySnapshot = await getDocs(q);
            // Map over the documents to extract comment data
            const fetchedComments = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            // Reference to the specific comment document in the top-level 'comments' collection
            const commentRef = doc(db, 'comments', commentId);
            await deleteDoc(commentRef);

            // Update local state to remove the comment from the list
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));

            // Optionally show a confirmation message
            Alert.alert('Success', 'Comment deleted successfully');
        } catch (error) {
            console.error('Error deleting comment:', error);
            Alert.alert('Error', 'Failed to delete comment');
        }
    };

    const options = ['Food', 'Fitness', 'Bars', 'Fun', 'Not Fun', 'Other'];

    const handlePress = (option) => {
        setSelectedCategories(prev => {
            const newCategories = new Set(prev);
            if (newCategories.has(option)) {
                newCategories.delete(option);
            } else {
                newCategories.add(option);
            }
            return newCategories;
        });
    };


    return (
        <View style={{flex: 1, marginTop: 40}}>
            <View style={style1.chooseCategory}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    style={style1.scrollView}
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                >
                    {options.map(option => (
                        <TouchableOpacity
                            key={option}
                            style={[style1.optionBox, selectedCategories.has(option) ? style1.optionBoxSelected : null]}
                            onPress={() => handlePress(option)}
                        >
                            <Text style={style1.textCategory}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>


            <MapView
                style={{flex: 1}}
                onPress={handleMapPress}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={false}
                region={Grimstad}
                initialRegion={Grimstad}
                customMapStyle={mapStyle}
                mapPadding={{top: 40, bottom: 0, left: 25, right: 25}}
            >

                {showPins && markers.filter(marker => selectedCategories.size === 0 || selectedCategories.has(marker.category)).map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        pinColor={marker.userId === undefined ? '#ff0195' : '#01fbff'}
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
            {loading && (
                <View style={style1.loadingOverlay}>
                    <ActivityIndicator size={300} color="#0175FF"/>
                </View>
            )}
            <View style={{
                position: 'absolute',
                top: 60,
                right: 350,
                alignItems: 'flex-end'
            }}>
                <Pressable onPress={togglePins}>
                    <AntDesign name="retweet" size={40} color="limegreen"/>
                </Pressable>
            </View>
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
                                                <View style={pinModal.iconpin}>
                                                    <Text style={pinModal.titletext}>Edit pin</Text>
                                                    <AntDesign name="pushpin" size={25} color="red"/>
                                                </View>
                                                <Text style={pinModal.subtitletext}>Edit pin name:</Text>
                                                <TextInput
                                                    style={pinModal.input}
                                                    placeholder="Title"
                                                    onChangeText={setTempTitle}
                                                    value={tempTitle}
                                                    maxLength={30}
                                                />
                                                <Text style={pinModal.subtitletext}>Edit description:</Text>
                                                <TextInput
                                                    style={pinModal.inputdescription}
                                                    placeholder="Description"
                                                    onChangeText={setTempDescription}
                                                    value={tempDescription}
                                                    maxLength={300}
                                                />
                                                <Text style={pinModal.subtitletext}>Edit Category:</Text>

                                                <View>
                                                    <SelectCategory setCategory={setTempCategory}
                                                                    selectedCategory={tempCategory}/>
                                                </View>


                                                <View style={pinModal.buttonsavecanellineup}>
                                                    <View style={pinModal.buttonspacebetween}>
                                                        <Button
                                                            title="Save"
                                                            color="green"
                                                            onPress={saveMarkerInfo}
                                                        />
                                                    </View>
                                                    <View style={pinModal.buttonspacebetween}>
                                                        <Button
                                                            title="Delete pin"
                                                            color="red"
                                                            onPress={() => handleDeletePin(editingMarker.id)}
                                                        />
                                                    </View>
                                                </View>
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
                                <View style={pinModal.iconpin}>
                                    <Text style={pinModal.titletext}>Create a pin</Text>
                                    <AntDesign name="pushpin" size={25} color="red"/>
                                </View>
                                <Text style={pinModal.subtitletext}>Pin name:</Text>
                                <TextInput
                                    style={pinModal.input}
                                    placeholder="Title"
                                    onChangeText={setTempTitle}
                                    value={tempTitle}
                                    maxLength={30}
                                />
                                <Text style={pinModal.subtitletext}>Add description:</Text>
                                <TextInput

                                    style={pinModal.inputdescription}
                                    placeholder="Description"
                                    onChangeText={setTempDescription}
                                    value={tempDescription}
                                    maxLength={300}
                                />

                                <SelectCategory setCategory={setCategory}/>


                                <View style={pinModal.buttonsavecanellineup}>
                                    <View style={pinModal.buttonspacebetween}>
                                        <Button
                                            title="Submit"
                                            onPress={handleSaveNewPin}
                                        />
                                    </View>
                                    <View style={pinModal.buttonspacebetween}>
                                        <Button
                                            title="Cancel"
                                            color="red"
                                            onPress={() => setNewPinModalVisible(false)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={viewPinModalVisible}
                onRequestClose={() => setViewPinModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setViewPinModalVisible(false)}>
                    <View style={pinModal.fullScreenOverlay}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View style={pinModal.modalView}>
                                <Text style={pinModal.titletext}>{viewingPin?.title || "No Title"}</Text>
                                <Text style={pinModal.subtitletext}>{viewingPin?.description || "No Description"}</Text>
                                <TextInput
                                    style={pinModal.input}
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChangeText={setNewComment}
                                    maxLength={300}
                                />
                                <Button
                                    title="Submit Comment"
                                    onPress={() => {
                                        if (user) {
                                            handleAddComment(viewingPin.id);
                                        } else {
                                            Alert.alert("Please log in to add comments");
                                        }
                                    }}
                                />
                                <ScrollView>
                                    <FlatList
                                        data={comments}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({item}) => (
                                            <View style={{marginBottom: 10}}>
                                                <Text style={{fontWeight: 'bold'}}>{item.username || 'Anonymous'}</Text>
                                                <Text>{item.text}</Text>
                                                {/* The timestamp */}
                                                <Text style={{fontSize: 12, color: 'grey'}}>
                                                    {item.timestamp.toDate().toLocaleString()}
                                                </Text>
                                                {user && user.uid === item.userId && (
                                                    <Button
                                                        title="Delete"
                                                        onPress={() => {
                                                            // Confirm before deleting
                                                            Alert.alert(
                                                                'Delete Comment',
                                                                'Are you sure you want to delete this comment?',
                                                                [
                                                                    {text: 'Cancel', style: 'cancel'},
                                                                    {
                                                                        text: 'OK',
                                                                        onPress: () => handleDeleteComment(item.id)
                                                                    },
                                                                ],
                                                                {cancelable: false}
                                                            );
                                                        }}
                                                    />
                                                )}
                                            </View>
                                        )}
                                        ListEmptyComponent={<Text>No comments yet</Text>}
                                    />
                                </ScrollView>
                                <Button
                                    title="Close"
                                    onPress={() => setViewPinModalVisible(false)}
                                />


                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    );
}

