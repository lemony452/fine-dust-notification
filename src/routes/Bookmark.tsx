import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, removeLocation, LocationType } from "../store";
import { GetDustData } from "../utils/getDustData";
import { SelctLocationData } from '../utils/utils';
import Card from "../components/Card";

interface DataType extends SelctLocationData {
  sidoName: string
}

function Bookmark() {

  const bookmarkList = useSelector((state: RootState) => state.bookmark)
  console.log(bookmarkList)

  
  const allDustData = GetDustData('전국');
  let res: DataType[] = [];
  
  if (allDustData.data !== null && allDustData.data !== undefined && bookmarkList.length > 0) {
    // console.log(allDustData.data);
    res = [];
    bookmarkList.forEach((location: LocationType) => {
      const found = allDustData.data.find((data: DataType) => data.sidoName === location.sidoN && data.stationName === location.stationN);
      res.push(found);
    })
    // for (let i=0; i<bookmarkList.length; i++) {
    //   console.log(bookmarkList[i]);
    //   for (let j=0; j<allDustData.data.length; j++) {
    //     // console.log(allDustData.data[j]);
    //     if (bookmarkList[i].sidoN === allDustData.data[j].sidoName && bookmarkList[i].stationN === allDustData.data[j].stationName) {
    //       res.push(allDustData.data[j]);
    //       console.log(allDustData.data[j]);
    //     }
    //   }
    // }
  }
  console.log(res);

  return (
    <div>
      { bookmarkList.length === 0 && '즐겨찾는 지역을 추가해주세요!' }
      { allDustData.isLoading && '로딩중' }
      { allDustData.isError && 'Error!' }
      { allDustData && (res.length !== 0) &&
        res.map((value: DataType, idx: number) => <Card key={idx} sido={value.sidoName} dustData={value} bookmarkList={bookmarkList}></Card>) }
    </div>
  )
}

export default Bookmark