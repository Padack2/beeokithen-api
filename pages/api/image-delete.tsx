import { NextApiRequest, NextApiResponse } from 'next';
import firebase from '../../service/FirebaseConfig';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const ImageDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const firestorage = getStorage(firebase, process.env.NEXT_PUBLIC_FIREBASE_DATA_BASEURL);
        const reqBody = req.body;
        const refStorage = ref(firestorage, reqBody);
        try {
            await deleteObject(refStorage);
            res.status(200).json({ message: "success" });
        } catch (e) {
            console.log(e);
        }
    } else {
        // Handle any other HTTP method
    }
};

export default ImageDelete;