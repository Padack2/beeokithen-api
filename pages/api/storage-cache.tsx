import type { NextApiRequest, NextApiResponse } from 'next'
import firebase from '../../service/FirebaseConfig';
import { getMetadata, getStorage, ref, listAll, deleteObject } from 'firebase/storage';

const StorageCahe = async (req: NextApiRequest, res: NextApiResponse) => {
    const itemRefs: any[] = [];
    try {
        const firestorage = getStorage(firebase, process.env.NEXT_PUBLIC_FIREBASE_DATA_BASEURL);
        const reqBody = JSON.parse(req.body);
        const bucket = reqBody.bucket.split("/");
        bucket.pop();
        const listRef = ref(firestorage, bucket.join("/"));
        
        await listAll(listRef).then(function (res) {
            res.items.forEach(function (itemRef) {
                itemRefs.push(itemRef);
            });
        }).catch(function (error) {
            // Uh-oh, an error occurred!
        });

        await Promise.all(
            itemRefs.map(async (itemRef) => {
                const metadata = await getMetadata(itemRef);

                if (metadata.customMetadata) {
                    if (metadata.customMetadata.trash == "Y") {
                        await deleteObject(itemRef);
                    }
                }
            }));

        res.status(200).json({ message: "success" });
    } catch (e) {
        console.log(e);
    }
};

export default StorageCahe;