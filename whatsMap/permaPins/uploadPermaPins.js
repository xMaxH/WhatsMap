const fs = require('fs');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
    const serviceAccount = JSON.parse(fs.readFileSync('./private-key.json', 'utf8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadData() {
    const data = fs.readFileSync('permaPins.json', 'utf8');
    const newPins = JSON.parse(data);
    const newPinIds = new Set(newPins.map(pin => pin.id));

    // Fetch all existing pins from Firestore
    const existingPinsSnapshot = await db.collection("permaPins").get();

    // Delete pins that are not in the newPins JSON
    existingPinsSnapshot.docs.forEach(doc => {
        if (!newPinIds.has(doc.id)) {
            db.collection("permaPins").doc(doc.id).delete();
            console.log(`Pin with ID ${doc.id} deleted from Firestore.`);
        }
    });

    // Process each new or updated pin
    for (const pin of newPins) {
        if (typeof pin.id !== 'string' || pin.id === '') {
            console.error('Invalid ID:', pin);
            continue; // Skip this pin
        }

        try {
            const existingPin = await db.collection("permaPins").doc(pin.id).get();
            if (existingPin.exists) {
                console.log(`Pin with ID ${pin.id} already exists. Skipping.`);
                continue; // Skip adding the pin
            }

            // Pin doesn't exist, add it to Firestore
            await db.collection("permaPins").doc(pin.id).set(pin);
            console.log(`Document written with ID: ${pin.id}`);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}


uploadData(); //Kjør scriptet ved å cd permaPins: dermed < node uploadPermaPins.js >
