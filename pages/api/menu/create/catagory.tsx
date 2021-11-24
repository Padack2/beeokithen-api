import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";
import firebase from '../../../../service/FirebaseConfig';
import { MenuCatagoryCreateDTO } from "../../../../dto/menu-create.dto";

const CreateMenuCatagory = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: MenuCatagoryCreateDTO = JSON.parse(req.body);
            const newDocRef = doc(collection(firestore, "MenuCatagory"));
            const querySnapshot = await getDocs(collection(firestore, "MenuCatagory"));
            const docRef = await setDoc(newDocRef, { ...reqBody, order: querySnapshot.size + 1 });

            res.status(200).json({ message: "success" });

        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
}

export default CreateMenuCatagory;
