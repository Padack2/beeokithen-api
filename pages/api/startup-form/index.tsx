import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { StartUpFormListDTO } from '../../../dto/startup-form.dto';

const GetStartUpForm = async (req: NextApiRequest, res: NextApiResponse<Array<StartUpFormListDTO>>) => {
    const firestore = getFirestore(firebase);
    var resJsonArray = [] as StartUpFormListDTO[];
    try {
        const querySnapshot = await getDocs(collection(firestore, 'RequestForm'));
        querySnapshot.forEach((item) => {
            const docData: StartUpFormListDTO = {
                id: item.id,
                name: item.data().name,
                area: item.data().area,
                experience: item.data().experience,
                openday: item.data().openday,
                phonenumber: item.data().phonenumber,
                money: item.data().money,
            }
            resJsonArray.push(docData);
        });

        res.status(200).json(resJsonArray);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default GetStartUpForm;