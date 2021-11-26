import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import firebase from '../../../service/FirebaseConfig';
import { NoticeListDTO } from '../../../dto/notice.dto';

const NoticeList = async (req: NextApiRequest, res: NextApiResponse<Array<NoticeListDTO>>) => {
  const firestore = getFirestore(firebase);
  var BasicNoticeList = [] as NoticeListDTO[];
  var ImportantNoticeList = [] as NoticeListDTO[];
  try {
    const querySnapshot = await getDocs(query(collection(firestore, "Notice"), orderBy("datetime")));
    querySnapshot.forEach((notice) => {
      if (notice.data().isNotice) {
        ImportantNoticeList.push({ ...notice.data(), id: notice.id } as NoticeListDTO);
      } else {
        BasicNoticeList.push({ ...notice.data(), id: notice.id } as NoticeListDTO);
      }
    })

    const AllNoticeList = [...ImportantNoticeList, ...BasicNoticeList] as NoticeListDTO[];
    console.log(AllNoticeList);
    res.status(200).json(AllNoticeList);
    
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export default NoticeList;
