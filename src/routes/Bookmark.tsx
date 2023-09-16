import { RootState } from "../store";
import { useSelector } from "react-redux";
import { SelctLocationData } from '../utils/utils';
import { GetFavoriteDustData } from "../utils/getDustData";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Error from "../components/Error";

interface DataType extends SelctLocationData {
  sidoName: string
}

function Bookmark() {

  const bookmarkList = useSelector((state: RootState) => state.bookmark)
  
    let res: any[] = [];
    const getData = GetFavoriteDustData(bookmarkList);
    const isLoading  = getData.some((res) => res.isLoading);
    const isError = getData.some((res) => res.isError);
    
    if (!isLoading && !isError) {
      const allDustData = getData.reduce((acc, cur) => acc.concat(cur.data), []);
      res = bookmarkList.map((location) => allDustData.find((data: DataType) => data.sidoName === location.sidoN && data.stationName === location.stationN))
    }

  return (
    <div className='scroll-custom overflow-auto h-[36rem]'>
      { res.length === 0 && !isLoading && !isError &&
        <div className="py-2.5 px-1 w-full text-center text-lg text-gray-800 font-bold bg-transparent border-0 border-b-2 border-gray-200">
          즐겨찾는 지역을 추가해주세요!
        </div>
      }
      { isLoading && <Loading /> }
      { isError && <Error /> }
      { res.length > 0 &&
        res.map((value: DataType, idx: number) => <Card key={idx} sido={value.sidoName} dustData={value} bookmarkList={bookmarkList}></Card>) }
    </div>
  )
}

export default Bookmark