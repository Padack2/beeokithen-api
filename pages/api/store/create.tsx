import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { StoreCreateDTO } from "../../../dto/store-create.dto";

const CreateStore = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody:StoreCreateDTO = JSON.parse(req.body);
            const newDocRef = doc(collection(firestore, "Store"));
            const querySnapshot = await getDocs(collection(firestore, "Store"));
            const docRef = await setDoc(newDocRef, { ...reqBody, order: querySnapshot.size + 1 });
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/image-metadata-update", {
              method: 'POST',
              body: JSON.stringify({ storageRef: reqBody.image.storageRef })
          });
            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
      } else {
        // Handle any other HTTP method
      }
}

export default CreateStore;
