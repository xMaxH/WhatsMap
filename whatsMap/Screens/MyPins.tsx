import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { db } from "../firebaseConfig";
import { collection, query, where, onSnapshot  } from 'firebase/firestore';
import { pin_style, styles } from "../Styles/styles";
import { auth } from "./HomeMap";
import { onAuthStateChanged } from 'firebase/auth';

export default function MyPinsScreen() {
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Checks if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });

        return () => unsubscribe();  // Clean up the subscription
    }, []);

    // Fetches the users own pins if he is logged in
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
                onSnapshot(q, (snapshot) => {
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
            <View style={styles.loading_overlay}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header2}>My Pins</Text>
            {pins.map((pin) => (
                <View key={pin.id} style={styles.modal_view}>
                    <Text style={styles.modal_text}>{pin.title}</Text>
                    <Text style={styles.modal_sub_text}>{pin.description}</Text>
                </View>
            ))}
        </View>
    );
};
