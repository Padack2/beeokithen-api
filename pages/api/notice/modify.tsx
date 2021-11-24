import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, setDoc, updateDoc, collection } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { NoticeModifyDTO } from "../../../dto/notice-create.dto";

const ModifyNotice = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: NoticeModifyDTO = JSON.parse(req.body);
            const newDocRef = doc(firestore, "Notice", reqBody.id);
            const docUpdate = await updateDoc(newDocRef, {
                title: reqBody.title,
                content: reqBody.content,
                datetime: reqBody.datetime,
            });
            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
}



export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}
export default ModifyNotice;
