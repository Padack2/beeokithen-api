import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { BannerDTO } from '../../../dto/banner.dto';

const GetBannerList = async (req: NextApiRequest, res: NextApiResponse<Array<BannerDTO>>) => {
    const firestore = getFirestore(firebase);
    var resJsonArray = [] as BannerDTO[];
    try {
        const querySnapshot = await getDocs(collection(firestore, "Banner"));
        querySnapshot.forEach((item) => {
            const docData: BannerDTO = {
                id: item.id,
                order: item.data().order,
                storageRef: item.data().storageRef,
                downloadUrl: item.data().downloadUrl,
            }
            resJsonArray.push(docData);
        });
        resJsonArray.sort((a,b) => a.order - b.order);
        res.status(200).json(resJsonArray);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default GetBannerList;
