import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, doc, setDoc, updateDoc, collection, getDocs, query, where, getDoc } from "firebase/firestore";
import firebase from '../../../../service/FirebaseConfig';
import { MenuCatagoryDTO } from "../../../../dto/menu.dto";

const ModifyMenuCatagory = async (req: NextApiRequest, res: NextApiResponse) => {
    var menuList: any[] = [];
    if (req.method === 'POST') {
        try {
            const firestore = getFirestore(firebase);
            const reqBody: MenuCatagoryDTO = JSON.parse(req.body);
            const newDocRef = doc(firestore, "MenuCatagory", reqBody.id);
            const docSnap = await getDoc(newDocRef);

            if (docSnap.exists()) {
                const querySnapshotMenuList = await getDocs(query(collection(firestore, "Menu"), where("catagory", "==", docSnap.data().title)));
                querySnapshotMenuList.forEach((m) => menuList.push({ id: m.id }));

                await Promise.all(
                    menuList.map(async (element) => {
                        const newMenuDocRef = doc(firestore, "Menu", element.id);
                        const docUpdate = await updateDoc(newMenuDocRef, {
                            catagory: reqBody.title
                        });
                    })
                );
                const docUpdate = await updateDoc(newDocRef, reqBody);
            }

            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log("실패: " + e);
        }
    } else {
        // Handle any other HTTP method
    }
}

export default ModifyMenuCatagory;
