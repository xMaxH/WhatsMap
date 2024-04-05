import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { style1 } from '../Styles/style1';  // Use your style file

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                // User is signed in, see docs for a list of available properties
                setUser(currentUser);
            } else {
                // User is signed out
                // Handle navigation or state update
            }
        });

        return unsubscribe; // Unsubscribe on unmount
    }, []);

    return (
        <View style={style1.container}>
            {user ? (
                <View>
                    <Text style={style1.text1}>Welcome, {user.email}</Text>
                    {/* Display other user info here */}
                </View>
            ) : (
                <Text style={style1.text1}>Not signed in</Text>
            )}
        </View>
    );
};

export default Profile;
