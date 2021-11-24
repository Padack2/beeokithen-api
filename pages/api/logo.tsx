import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import firebase from '../../service/FirebaseConfig';



const GetLogo = async (req: NextApiRequest, res: NextApiResponse) => {
    const firestore = getFirestore(firebase);
    var resJsonArray = {};
    // try {
    //     const querySnapshot = await getDocs(collection(firestore, "Logo"));
    //         const docData: BannerListDTO = {
    //             id: item.id,
    //             order: item.data().order,
    //             url: item.data().url
    //     });
    //     res.status(200).json(resJsonArray);
    // } catch (e) {
    //     console.error("Error adding document: ", e);
    // }
}


export default GetLogo;
