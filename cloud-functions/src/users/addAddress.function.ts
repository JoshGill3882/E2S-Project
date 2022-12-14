// Imports
import * as functions from 'firebase-functions';
import { doc, getFirestore, setDoc, arrayUnion } from 'firebase/firestore';
import { app } from '..';

// Static Values
const db = getFirestore(app);

// Function for uploading data to Firestore
export default functions.https.onCall(
    async (data, context) => {
        
        // Check if the user is authenticated if they aren't return an error message
        if (!context.auth) {
            return({ "error": "you have to be logged in to add an address" });
        }
        // Get the address from the data you receive
        const address: String = data.address

        setDoc( // Call setDoc
            doc(db, `${context.auth?.token.businessName}/address`), // Pass in the Document Reference
            { address: arrayUnion(address) }, // Pass the address into the document 
            { merge: true } // Set merge to true so it doesn't overwrite the document
        );
    });