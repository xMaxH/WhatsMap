
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, onSnapshot  } from 'firebase/firestore';
import { pinModal, style1 } from "../Styles/style1";
import { auth } from "./HomeMap";  // Ensure this is the correct path to your auth setup
import { onAuthStateChanged } from 'firebase/auth';

export default function MyPinsScreen() {
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });

        return () => unsubscribe();  // Clean up the subscription
    }, []);

    useEffect(() => {
        const fetchMyPins = async () => {
            if (!user) {
                console.log('No user logged in');
                setLoading(false);
                return;
            }

            try {
                const pinsCollectionRef = collection(db, 'pins');
                const q = query(pinsCollectionRef, where("userId", "==", user.uid));
                // Listen for real-time updates to the pins collection
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const loadedPins = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setPins(loadedPins);
                    setLoading(false);
                });

            } catch (error) {
                console.error('Error loading pins:', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchMyPins();
        }
    }, [user]); // This effect runs when the user state changes

    if (loading) {
        return (
            <View style={style1.loadingOverlay}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={style1.container}>
            <Text style={style1.textheader}>My Pins</Text>
            {pins.map((pin) => (
                <View key={pin.id} style={pinModal.modalView}>
                    <Text style={pinModal.titletext}>{pin.title}</Text>
                    <Text style={pinModal.subtitletext}>{pin.description}</Text>
                </View>
            ))}
        </View>
    );
};
