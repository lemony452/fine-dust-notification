import axios from "axios"
import { useQueries, useQuery } from "@tanstack/react-query"
import { LocationType } from "../store";

const REQUEST_URL = process.env.REACT_APP_API_URL + '/' + process.env.REACT_APP_KEY;

export const getParameters = {
  serviceKey: process.env.REACT_APP_SERVICE_KEY,
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
      return axios.get(REQUEST_URL,
        {params: {...getParameters, sidoName: sido}}
      ).then((res) => res.data.response.body.items)
    }
  });

  return dustData
}

export function GetFavoriteDustData(bookmarkList: LocationType[]) {
  console.log('bookmarkList', bookmarkList);
  let allDustData = useQueries({
    queries: bookmarkList.map((location: LocationType) => {
      return {
        queryKey: ['getAllData', location.sidoN],
        queryFn: () => {
          return axios.get(REQUEST_URL,
            {params: {...getParameters, sidoName: location.sidoN}}
          ).then((res) => res.data.response.body.items)
        },
      }
    })
  })

  return allDustData
}