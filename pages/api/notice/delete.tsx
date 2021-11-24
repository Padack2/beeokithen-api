import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { NoticeDeleteDTO } from "../../../dto/notice-create.dto";

const DeleteNotice = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: NoticeDeleteDTO = JSON.parse(req.body);
            const docDelete = await deleteDoc(doc(firestore, "Notice", reqBody.id));

            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
}

export default DeleteNotice;
