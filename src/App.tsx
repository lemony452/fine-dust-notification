import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface MyLocation {
  stationName: string,
  dataTime: string,
  pm10Grade: number,
  pm25Grade: number,
}

function App() {

  let [sido, setSido] = useState<string>('서울');
  let [station, setStation] = useState<string>('중구');
  let [totalData, setTotal] = useState<object[] | null>();
  let [myLocation, setMyLocation] = useState<MyLocation | null>();
  
  const getParameters = {
    serviceKey: 'lJQ0dBOKselim2fwpYeH+Ae1AXPRFKgE4e4GjvD2pycb7zgC9uvk31+Sb8DpzZuSJ4hHaBmubhGEID2dHrFVBg==',
    returnType: 'json',
    numOfRows: '100',
    pageNo: '1',
    sidoName: '서울',
    ver: '1.0'
  }

  let dustData = useQuery(['getData', sido], () => {
    return axios.get('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
      {params: {...getParameters, sidoName: sido}}
    ).then((res) => {
      let value = res.data.response.body.items;
      let myValue = value.find((val: MyLocation)=>val.stationName === station);
      // console.log(myLocation);
      if (myValue !== undefined) {
        setMyLocation({
          stationName: myValue.stationName,
          dataTime: myValue.dataTime,
          pm10Grade: myValue.pm10Grade,
          pm25Grade: myValue.pm25Grade
        })
      }
      return value
    });
  })
  console.log(dustData.data);

  return (
    <div className="App">
        { dustData.isLoading && '로딩중' }
        { dustData.isError && 'Error!' }
        { dustData &&
          <>
            <button onClick={()=>setSido('경북')}>경북으로 시도 바꾸기</button>
            {myLocation?.stationName}
            {myLocation?.pm10Grade}
          </>
        }
    </div>
  );
}

export default App;
