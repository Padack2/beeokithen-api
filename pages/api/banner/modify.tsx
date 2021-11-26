import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { BannerDTO } from "../../../dto/banner.dto";

const ModifyBanner = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody:BannerDTO = JSON.parse(req.body);
      if (req.method === 'POST' && reqBody.id) {
        try {
            const firestore = getFirestore(firebase);
            const newDocRef = doc(firestore, "Banner", reqBody.id);
            const docUpdate = await updateDoc(newDocRef, {
                order: reqBody.order,
                storageRef: reqBody.storageRef,
                downloadUrl: reqBody.downloadUrl
            });
            
            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
      } else {
        // Handle any other HTTP method
      }
}

export default ModifyBanner;
