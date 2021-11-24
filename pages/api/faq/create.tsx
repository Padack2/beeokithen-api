import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { FaqCreateDTO } from "../../../dto/faq-create.dto";

const CreateFaq = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: FaqCreateDTO = JSON.parse(req.body);
            const newDocRef = doc(collection(firestore, "Faq"));
            const querySnapshot = await getDocs(collection(firestore, "Faq"));
            const docRef = await setDoc(newDocRef, { ...reqBody, order: querySnapshot.size + 1 });
            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
}

export default CreateFaq;
