import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { FaqDTO } from '../../../dto/faq-create.dto';

const GetFaqList = async (req: NextApiRequest, res: NextApiResponse<Array<FaqDTO>>) => {
    const firestore = getFirestore(firebase);
    let resJsonArray = [] as FaqDTO[];
    const querySnapshotMenuList = await getDocs(query(collection(firestore, "Faq"), orderBy("order")));
    try {
        querySnapshotMenuList.forEach((item) => {
            resJsonArray.push({
                ...item.data(),
                id: item.id
            } as FaqDTO);
        });
        res.status(200).json(resJsonArray);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default GetFaqList;