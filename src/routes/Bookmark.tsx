import { useSelector, useDispatch } from "react-redux";
import { RootState, removeLocation, LocationType } from "../store";
import { GetDustData } from "../utils/getDustData";
import { SelctLocationData } from '../utils/utils';
import Card from "../components/Card";
import { useEffect } from "react";

interface DataType extends SelctLocationData {
  sidoName: string
}

function Bookmark() {

  const bookmarkList = useSelector((state: RootState) => state.bookmark)
  console.log(bookmarkList)

  const allDustData = GetDustData('전국');
  
  let res: DataType[] = []

  // useEffect(() => {
  // }, [allDustData.data])
  if (allDustData.data !== null && allDustData.data !== undefined && bookmarkList.length > 0) {
    // console.log(allDustData.data);
    for (let i=0; i<bookmarkList.length; i++) {
      for (let j=0; j<allDustData.data.length; j++) {
        if (bookmarkList[i].sidoN === allDustData.data[j].sidoName && bookmarkList[i].stationN === allDustData.data[j].stationName) res.push(allDustData.data[j])
      }
    }
  }
  console.log(res);


  return (
    <div>
      { bookmarkList.length === 0 && '즐겨찾는 지역을 추가해주세요!' }
      { allDustData.isLoading && '로딩중' }
      { allDustData.isError && 'Error!' }
      { allDustData && (res.length !== 0) &&
        res.map((value: DataType, idx: number) => <Card key={idx} sido={value.sidoName} dustData={value}></Card>) }
    </div>
  )
}

export default Bookmark