import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, setDoc, updateDoc, collection } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { PageTitleModifyDTO } from "../../../dto/page-title.dto";

const PageTitleModify = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: PageTitleModifyDTO = JSON.parse(req.body);
            const newDocRef = doc(firestore, "PageTitle", reqBody.id);
            const docUpdate = await updateDoc(newDocRef, {
                title: reqBody.title,
                content_1: reqBody.content_1,
                content_2: reqBody.content_2
            });

            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
}

export default PageTitleModify;
