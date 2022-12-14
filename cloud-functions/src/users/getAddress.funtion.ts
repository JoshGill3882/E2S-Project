import { doc, getFirestore, getDoc } from "firebase/firestore";
import * as functions from 'firebase-functions';
import { app } from '..';


const db = getFirestore(app);

export default functions.https.onCall(
    async (data, context) => {

        // Check if the user is authenticated if they aren't return an error message
        if (!context.auth) {
            return({ "error": "you have to be logged in to add an address" });
        }

        const docSnap = await getDoc(doc(db, context.auth?.token.businessName, 'address'));

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
    }
)