import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, setDoc, Timestamp, collection } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { StartUpFormDTO } from "../../../dto/startup-form.dto";


const CreateStartUpForm = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody:StartUpFormDTO = JSON.parse(req.body);
            const newDocRef = doc(collection(firestore, "StartupForm"));
            console.log(reqBody);
            const docData:StartUpFormDTO = {
                name: reqBody.name,
                phonenumber: reqBody.phonenumber,
                area: reqBody.area,
                experience: reqBody.experience,
                openday: reqBody.openday,
                money: reqBody.money,
            }
            const docRef = await setDoc(newDocRef, docData);
            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
      } else {
        // Handle any other HTTP method
      }
    
}

export default CreateStartUpForm;
