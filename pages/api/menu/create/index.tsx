import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";
import firebase from '../../../../service/FirebaseConfig';
import { MenuCreateDTO } from "../../../../dto/menu.dto";

const CreateMenu = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: MenuCreateDTO = JSON.parse(req.body);
            const newDocRef = doc(collection(firestore, "Menu"));
            const querySnapshot = await getDocs(collection(firestore, "Menu"));
            const docRef = await setDoc(newDocRef, { ...reqBody, order: querySnapshot.size + 1 });

            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/image-metadata-update", {
                method: 'POST',
                body: JSON.stringify({ storageRef: reqBody.image1.storageRef })
            });
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/image-metadata-update", {
                method: 'POST',
                body: JSON.stringify({ storageRef: reqBody.image2.storageRef })
            });
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/image-metadata-update", {
                method: 'POST',
                body: JSON.stringify({ storageRef: reqBody.image3.storageRef })
            });

            res.status(200).json({ message: "success" });

        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
}

export default CreateMenu;
