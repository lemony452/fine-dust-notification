import axios from "axios"
import { useQueries, useQuery } from "@tanstack/react-query"
import { LocationType } from "../store";
import { SelctLocationData } from "./utils";

interface DataType extends SelctLocationData {
  sidoName: string
}

export const getParameters = {
  serviceKey: 'lJQ0dBOKselim2fwpYeH+Ae1AXPRFKgE4e4GjvD2pycb7zgC9uvk31+Sb8DpzZuSJ4hHaBmubhGEID2dHrFVBg==',
  returnType: 'json',
  numOfRows: '100',
  pageNo: '1',
  sidoName: '서울',
  ver: '1.0'
}

export const sidoList = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종'];

export function GetDustData(sido : string) {
  let dustData = useQuery({
    queryKey: ['getData', sido],
    queryFn: () => {
      return axios.get('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
        {params: {...getParameters, sidoName: sido}}
      ).then((res) => res.data.response.body.items)
    }
  });

  // console.log(dustData.data);

  return dustData
}

export function GetFavoriteDustData(bookmarkList: LocationType[]) {
  console.log('bookmarkList', bookmarkList);
  let allDustData = useQueries({
    queries: bookmarkList.map((location: LocationType, idx: number) => {
      // console.log('idx', idx);
      return {
        queryKey: ['getAllData', location.sidoN],
        queryFn: () => {
          return axios.get('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
            {params: {...getParameters, sidoName: location.sidoN}}
          ).then((res) => {
            const dataList = res.data.response.body.items;
            const found = dataList.find((dustData: DataType) => dustData.sidoName === location.sidoN && dustData.stationName === location.stationN )
            console.log(idx, '번째 queries문')
            console.log(location, found);
            return found
          })
        },
      }
    })
  })
  console.log('res', allDustData);
  return allDustData
}