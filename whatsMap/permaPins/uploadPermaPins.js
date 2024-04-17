const fs = require('fs');
const admin = require('firebase-admin');

// Since 'require' cannot directly import JSON like an ES module 'import' statement, you need to read the file and then parse it.
const serviceAccount = JSON.parse(fs.readFileSync('./private-key.json', 'utf8'));

// Initialize your Firebase admin with the service account
if (admin.apps.length === 0) { // Check if Firebase has already been initialized
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();  // Use this `db` for all Firestore operations

async function uploadData() {
    const data = fs.readFileSync('permaPins.json', 'utf8');
    const pins = JSON.parse(data);

    console.log('Pins:', pins);

    for (const pin of pins) {
        try {
            // Check if pin with the same ID already exists in Firestore
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

uploadData();
