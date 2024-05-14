import React, { useState } from 'react';
import {View, Text, TextInput, Alert, Modal, TouchableOpacity} from 'react-native';
import { app } from "../firebaseConfig";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import {FG_COLOUR_MUTED, pin_style} from "../Styles/styles";

export default function UsernameModal({ visible, setVisible, userId, navigation, onUpdateUsername, name }) {
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
            <View style={pin_style.fs_overlay}>
                <View style={pin_style.modal_view}>
                    <Text style={pin_style.header2}>Edit Your Username</Text>
                    <TextInput
                        style={pin_style.input_title}
                        placeholder={name}
                        placeholderTextColor={FG_COLOUR_MUTED}
                        onChangeText={setUsername}
                        value={username}
                    />
                    <TouchableOpacity onPress={handleUsernameCreation} style={pin_style.button}>
                        <Text style={pin_style.button_text}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
