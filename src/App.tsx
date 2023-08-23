import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface MyLocation {
  stationName: string,
  dataTime: string,
  pm10Grade: number | null,
  pm25Grade: number | null,
}

const getParameters = {
  serviceKey: 'lJQ0dBOKselim2fwpYeH+Ae1AXPRFKgE4e4GjvD2pycb7zgC9uvk31+Sb8DpzZuSJ4hHaBmubhGEID2dHrFVBg==',
  returnType: 'json',
  numOfRows: '100',
  pageNo: '1',
  sidoName: '서울',
  ver: '1.0'
}

const sidoList = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종'];

function App() {

  if (localStorage.getItem('sido') === null) {
    localStorage.setItem('sido', '서울');
    localStorage.setItem('station', '중구');
    localStorage.setItem('stationList', JSON.stringify( [] ));
  }

  let [sido, setSido] = useState<string>(localStorage.getItem('sido')!);
  let [station, setStation] = useState<string>(localStorage.getItem('station')!);
  // let [totalData, setTotal] = useState<object[] | null>();
  // let [myLocation, setMyLocation] = useState<MyLocation | null>();
  let myLocation: MyLocation = {
    stationName: '',
    dataTime: '',
    pm10Grade: 0,
    pm25Grade: 0,
  };

  let dustData = useQuery(['getData', sido], () => {
    return axios.get('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
      {params: {...getParameters, sidoName: sido}}
    ).then((res) => {
      return res.data.response.body.items
    });
  })
  console.log(dustData.data);

  // 선택한 시/도별 station 리스트 가져오기
  if (dustData.data !== undefined || null) {
    let stationList: string[] = [];
    dustData.data.forEach((value: MyLocation) => {
      stationList.push(value.stationName);
    })
    if (stationList.indexOf(station) === -1) {
      localStorage.setItem('station', stationList[0]);
    }
    localStorage.setItem('stationList', JSON.stringify(stationList));

    let myValue = dustData.data.find((val: MyLocation)=>val.stationName === localStorage.getItem('station'));
      // console.log(myLocation);
      myLocation = {
        stationName: myValue.stationName,
        dataTime: myValue.dataTime,
        pm10Grade: myValue.pm10Grade,
        pm25Grade: myValue.pm25Grade
      }
    }
    
  const selectSido = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSido(e.target.value);
    localStorage.setItem('sido', e.target.value);
  }
  
  const selectStation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStation(e.target.value);
    localStorage.setItem('station', e.target.value);
  }
    
  useEffect(() => {
    // console.log('-------------')
    // console.log(localStorage.getItem('station'))
    setStation(localStorage.getItem('station')!);
  }, [dustData.data])

  return (
    <div className="App">
      <span>
        <div className="w-60">
          <label htmlFor="underline_select" className="sr-only">Underline select</label>
          <select onChange={selectSido} id="underline_select"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option defaultValue={sido}>{ sido }</option>
              {
                sidoList.map((value, idx) => {
                  if (value !== sido) return (<option key={idx}>{value}</option>)
                })
              } 
          </select>
        </div>
        <div className="w-60">
          <label htmlFor="underline_select" className="sr-only">Underline select</label>
          <select onChange={selectStation} id="underline_select"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option defaultValue={station}>{ station }</option>
              {
                JSON.parse(localStorage.getItem('stationList')!)
                .map((value: string, idx: number) => {
                  if (value !== station) return (<option key={idx}>{value}</option>)
                })
              } 
          </select>
        </div>
      </span>
      { dustData.isLoading && '로딩중' }
      { dustData.isError && 'Error!' }
      { dustData &&
        <>
          {console.log(myLocation)}
          {myLocation?.stationName}
          {myLocation?.pm10Grade}
        </>
      }
    </div>
  );
}

export default App;
