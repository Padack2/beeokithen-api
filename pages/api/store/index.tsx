import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { StoreDTO } from '../../../dto/store-create.dto';

const GetStoreList = async (req: NextApiRequest, res: NextApiResponse<Array<StoreDTO>>) => {
  const firestore = getFirestore(firebase);
  var resJsonArray = [] as StoreDTO[];
  try {
    const querySnapshotMenuCatagoryList = await getDocs(query(collection(firestore, "Store"), orderBy("order")));
    querySnapshotMenuCatagoryList.forEach((c) => resJsonArray.push({ ...c.data(), id: c.id } as StoreDTO));
    res.status(200).json(resJsonArray);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export default GetStoreList;
