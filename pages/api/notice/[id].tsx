import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, getDoc, where, getDocs } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { NoticeDetailDTO } from '../../../dto/notice.dto';

const NoticeList = async (req: NextApiRequest, res: NextApiResponse<NoticeDetailDTO>) => {
    const { query: { id } } = req;
    const firestore = getFirestore(firebase);
    var resJsonData = {} as NoticeDetailDTO;

    try {
        const querySnapshot = await doc(firestore, 'Notice', id as string);
        const getDocQeury = await getDoc(querySnapshot);
        const noticeData = getDocQeury.data();
        if (noticeData) {
            resJsonData.id = id as string;
            resJsonData.title = noticeData.title;
            resJsonData.content = noticeData.content;
            resJsonData.datetime = noticeData.datetime;
            res.status(200).json(resJsonData);
        }

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb' // Set desired value here
        }
    }
}

export default NoticeList;
