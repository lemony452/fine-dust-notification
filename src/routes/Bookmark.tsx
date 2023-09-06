import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, removeLocation, LocationType } from "../store";
import { GetDustData, GetFavoriteDustData } from "../utils/getDustData";
import { SelctLocationData } from '../utils/utils';
import Card from "../components/Card";

interface DataType extends SelctLocationData {
  sidoName: string
}

function Bookmark() {

  const bookmarkList = useSelector((state: RootState) => state.bookmark)
  console.log(bookmarkList)

  // let allDustData = GetFavoriteDustData(bookmarkList);

  // --------------------------------------------------
  
  // const { isLoading, isError, data } = GetDustData('전국');
  
  if (bookmarkList.length === 0) return (<div>즐겨찾는 지역을 추가해주세요!</div>)
  else {
    let res: DataType[] = [];
    const getData = GetFavoriteDustData(bookmarkList);
    const isLoading  = getData.some((res) => res.isLoading);
    const isError = getData.some((res) => res.isError);
    console.log(getData);
    if (!isLoading && !isError) {
      res = getData.map((value) => value.data)
    }

    // if (data !== null && data !== undefined) {
    //   console.log(data);
    //   res = [];
    //   bookmarkList.forEach((location: LocationType) => {
    //     console.log(location);
    //     const found = data.find((dustData: DataType) => {
    //       // console.log(dustData);
    //       // console.log(dustData.sidoName === location.sidoN);
    //       // console.log(dustData.stationName === location.stationN);
    //       return dustData.sidoName === location.sidoN && dustData.stationName === location.stationN
    //     });
    //     console.log(found);
    //     res.push(found);
    //   })
    //   // for (let i=0; i<bookmarkList.length; i++) {
    //   //   for (let j=0; j<data.length; j++) {
    //   //     if (bookmarkList[i].sidoN === data[j].sidoName && bookmarkList[i].stationN === data[j].stationName) {
    //   //       res.push(data[j]);
    //   //     }
    //   //   }
    //   // }
    // }
    console.log(res);
    return (
      <div>
        { isLoading && '로딩중' }
        { isError && 'Error!' }
        { res.length > 0 &&
          res.map((value: DataType, idx: number) => <Card key={idx} sido={value.sidoName} dustData={value} bookmarkList={bookmarkList}></Card>) }
      </div>
    )
  }
}

export default Bookmark