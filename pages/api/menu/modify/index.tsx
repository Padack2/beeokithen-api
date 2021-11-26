import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore";
import firebase from '../../../../service/FirebaseConfig';
import { MenuDTO } from "../../../../dto/menu.dto";

const ModifyMenu = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: MenuDTO = JSON.parse(req.body);
            const newDocRef = doc(firestore, "Menu", reqBody.id); 
            const docData = await getDoc(newDocRef);
            const menuData = docData.data();    
            // await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/image-metadata-update", {
            //     method: 'POST',
            //     body: JSON.stringify({ storageRef: reqBody.image.storageRef })
            // });

            // if (menuData != undefined) {
            //     if(menuData.image.downloadUrl != reqBody.image.downloadUrl){
            //         await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/image-metadata-update", {
            //             method: 'POST',
            //             body: JSON.stringify({ storageRef: menuData.image.storageRef })
            //         });
            //     }
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

export default ModifyMenu;
