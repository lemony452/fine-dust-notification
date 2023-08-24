import React, { useEffect, Dispatch, SetStateAction} from 'react';
import { GetDustData, sidoList } from "../utils/getDustData"

interface PropsType {
  sido: string,
  station: string,
  setSido: Dispatch<SetStateAction<string>>,
  setStaion: Dispatch<SetStateAction<string>>,
}

export interface MyLocation {
  stationName: string,
  dataTime: string,
  pm10Grade: number | null,
  pm25Grade: number | null,
}

function Main({ sido, station, setSido, setStaion }: PropsType) {
  
  let res = GetDustData(sido); // 각 station 미세먼지 정보들이 배열에 담겨있음
  
  let myLocation: MyLocation = {
    stationName: '',
    dataTime: '',
    pm10Grade: 0,
    pm25Grade: 0,
  };

  // 선택한 시/도별 station 리스트 가져오기
  if (res.data !== undefined || null) {
    let stationList: string[] = [];
    res.data.forEach((value: MyLocation) => {
      stationList.push(value.stationName);
    })
    if (stationList.indexOf(station) === -1) {
      localStorage.setItem('station', stationList[0]);
    }
    localStorage.setItem('stationList', JSON.stringify(stationList));

    let myValue = res.data.find((val: MyLocation)=>val.stationName === localStorage.getItem('station'));
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
    setStaion(e.target.value);
    localStorage.setItem('station', e.target.value);
  }

  useEffect(() => {
    setStaion(localStorage.getItem('station')!);
  }, [res.data])

  return (
    <div>
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
      { res.isLoading && '로딩중' }
      { res.isError && 'Error!' }
      { res &&
        <>
          {console.log(myLocation)}
          {myLocation?.stationName}
          {myLocation?.pm10Grade}
        </>
      }
    </div>
  )
}

export default Main