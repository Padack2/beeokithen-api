import type { NextApiRequest, NextApiResponse } from 'next'
import firebase from '../../service/FirebaseConfig';
import { updateMetadata, getMetadata, getStorage, ref, listAll, deleteObject } from 'firebase/storage';

interface type{
    storageRef: string
}
const MetaDataUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const firestorage = getStorage(firebase, process.env.NEXT_PUBLIC_FIREBASE_DATA_BASEURL);
            const reqBody:type = JSON.parse(req.body);
            const itemRef = ref(firestorage, reqBody.storageRef);
            const metadata = await (await getMetadata(itemRef)).customMetadata;
            if (metadata) {
                switch (metadata.trash) {
                    case 'Y': await updateMetadata(itemRef, { customMetadata: { trash: 'N' } });
                        break;
                    case 'N': await updateMetadata(itemRef, { customMetadata: { trash: 'Y' } });
                        break;
                }
            }
            
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/storage-cache", {
                method:'POST',
                body: JSON.stringify({ bucket: reqBody.storageRef })
            });
        
            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log(e);
        }
    }
    else{

    }
    
};

export default MetaDataUpdate;