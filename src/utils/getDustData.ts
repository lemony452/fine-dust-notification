import axios from "axios"
import { useQuery } from "@tanstack/react-query"

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

  console.log(dustData.data);

  return dustData
}