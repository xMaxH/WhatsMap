import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert, Modal } from 'react-native';
import { app } from "../firebaseConfig";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function UsernameModal({ visible, setVisible, userId, navigation, onUpdateUsername }) {
    const [username, setUsername] = useState('');

    // In UsernameModal
    const handleUsernameCreation = async () => {
        if (!username.trim()) {
            Alert.alert("Error", "Username cannot be empty.");
            return;
        }

        try {
            const db = getFirestore(app);
            const userDocRef = doc(db, "users", userId);
            await setDoc(userDocRef, { username: username }, { merge: true });

            setVisible(false); // Close the modal
            onUpdateUsername(username); // Update username in HomeScreen state
            navigation.navigate('Main', { username: username });
        } catch (error) {
            console.error("Error creating username:", error);
            Alert.alert('Error', 'Failed to create username');
        }
    };






    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setVisible(false)}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                    <Text>Create Your Username</Text>
                    <TextInput
                        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
                        placeholder="Enter your username"
                        onChangeText={setUsername}
                        value={username}
                    />
                    <Button
                        title="Submit"
                        onPress={handleUsernameCreation}
                    />
                </View>
            </View>
        </Modal>
    );
}
