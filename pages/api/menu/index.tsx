import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, getDocs, doc, query, where, orderBy } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { MenuDTO, MenuCatagoryDTO, MenusWithCatagoryDTO } from '../../../dto/menu-create.dto';

const GetMenuCatagoryAndMenuList = async (req: NextApiRequest, res: NextApiResponse) => {
  const firestore = getFirestore(firebase);
  let resJsonArray: MenusWithCatagoryDTO[] = [];
  let categories: MenuCatagoryDTO[] = [];

  try {
    const querySnapshotMenuCatagoryList = await getDocs(query(collection(firestore, "MenuCatagory"), orderBy("order")));

    querySnapshotMenuCatagoryList.forEach((c) => categories.push({ ...c.data(), id: c.id } as MenuCatagoryDTO));

    await Promise.all(categories.map(async (item) => {
      let menus: MenuDTO[] = [];

      const querySnapshotMenuList = await getDocs(query(collection(firestore, "Menu"), where("catagory", "==", item.title), orderBy("order")));
      querySnapshotMenuList.forEach((m) => menus.push({ ...m.data(), id: m.id } as MenuDTO));

      resJsonArray.push({ ...item, menus: menus });
    }));

    res.status(200).json(resJsonArray);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default GetMenuCatagoryAndMenuList;