import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, deleteDoc, getDocs, collection, query, where } from "firebase/firestore";
import firebase from '../../../../service/FirebaseConfig';
import { MenuDelelteDTO } from "../../../../dto/menu.dto";

const DeleteMenu = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: MenuDelelteDTO = JSON.parse(req.body);
            const docDelete = await deleteDoc(doc(firestore, "MenuCatagory", reqBody.id));
            const querySnapshotMenuList = await getDocs(query(collection(firestore, "Menu"), where("catagory", "==", reqBody.title)));

            querySnapshotMenuList.forEach(async(item)=>{
                const docDelete = await deleteDoc(doc(firestore, "Menu", item.id));
            });
            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
}

export default DeleteMenu;
