import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, setDoc, updateDoc, collection } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { FaqDTO } from "../../../dto/faq.dto";

const ModifyFaq = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody:FaqDTO = JSON.parse(req.body);
            const newDocRef = doc(firestore, "Faq", reqBody.id);
            const Data = {
              id: reqBody.id,
              order: reqBody.order,
              title: reqBody.title,
              content: reqBody.content
            }
            const docUpdate = await updateDoc(newDocRef, Data);
            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
      } else {
        // Handle any other HTTP method
      }
}

export default ModifyFaq;
