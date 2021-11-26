import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, getDoc, updateDoc, collection } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { StoreDTO } from "../../../dto/store.dto";

const ModifyStore = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: StoreDTO = JSON.parse(req.body);
            const newDocRef = doc(firestore, "Store", reqBody.id);
            const getDocQeury = await getDoc(newDocRef);
            const noticeData = getDocQeury.data();
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/image-metadata-update", {
                method: 'POST',
                body: JSON.stringify({ storageRef: reqBody.image.storageRef })
            });

            // if (noticeData != undefined) {
            //     if (noticeData.image.downloadUrl != reqBody.image.downloadUrl)
            //         await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/image-metadata-update", {
            //             method: 'POST',
            //             body: JSON.stringify({ storageRef: noticeData.image.storageRef })
            //         });
            // }

            const docUpdate = await updateDoc(newDocRef, reqBody);
            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
}

export default ModifyStore;
