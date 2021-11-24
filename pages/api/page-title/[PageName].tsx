import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { PageTitleDTO } from '../../../dto/page-title.dto';

const PageTitle = async (req: NextApiRequest, res: NextApiResponse<PageTitleDTO>) => {
    const { query: { PageName } } = req;
    const firestore = getFirestore(firebase);
    try {
        const docRef = doc(firestore, "PageTitle", PageName as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const resJsonArray: PageTitleDTO = {
                id: docSnap.id,
                title: docSnap.data().title,
                content_1: docSnap.data().content_1,
                content_2: docSnap.data().content_2,
            }
            res.status(200).json(resJsonArray);
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default PageTitle;