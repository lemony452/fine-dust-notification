import React, { useEffect, Dispatch, SetStateAction} from 'react';
import { SelctLocationData } from '../utils/utils';
import { GetDustData, sidoList } from "../utils/getDustData"
import Loading from '../components/Loading';
import Error from '../components/Error';
import MainCard from '../components/MainCard';

interface PropsType {
  sido: string,
  station: string,
  setSido: Dispatch<SetStateAction<string>>,
  setStaion: Dispatch<SetStateAction<string>>,
}

function Main({ sido, station, setSido, setStaion }: PropsType) {
  
  let res = GetDustData(sido); // 각 station 미세먼지 정보들이 배열에 담겨있음
  
  let myLocation: SelctLocationData = {
    stationName: '',
    dataTime: '',
    pm10Grade: 0,
    pm10Value: 0,
    pm25Grade: 0,
    pm25Value: 0,
  };

  let grade = 0;

  // 선택한 시/도별 station 리스트 가져오기
  if (res.data !== undefined || null) {
    let stationList: string[] = [];
    res.data.forEach((value: SelctLocationData) => {
      stationList.push(value.stationName);
    })
    if (stationList.indexOf(station) === -1) {
      localStorage.setItem('station', stationList[0]);
    }
    localStorage.setItem('stationList', JSON.stringify(stationList));

    let myValue = res.data.find((val: SelctLocationData)=>val.stationName === localStorage.getItem('station'));
    myLocation = {
      stationName: myValue.stationName,
      dataTime: myValue.dataTime,
      pm10Grade: Number(myValue.pm10Grade),
      pm10Value: Number(myValue.pm10Value),
      pm25Grade: Number(myValue.pm25Grade),
      pm25Value: Number(myValue.pm25Value),
    }
    grade = Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!);
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
    <div className='flex flex-col w-full h-full gap-5'>
      <div className="flex w-full gap-5">
        <div className="w-[40%]">
          <label htmlFor="underline_select" className="sr-only">Underline select</label>
          <select onChange={selectSido} id="underline_select"
            className="block py-2.5 px-1 w-full text-l text-gray-700 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option defaultValue={sido}>{ sido }</option>
              {
                sidoList.map((value, idx) => {
                  if (value !== sido) return (<option key={idx}>{value}</option>)
                })
              } 
          </select>
        </div>
        <div className="w-[60%]">
          <label htmlFor="underline_select" className="sr-only">Underline select</label>
          <select onChange={selectStation} id="underline_select"
            className="block py-2.5 px-1 w-full text-l text-gray-700 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option defaultValue={station}>{ station }</option>
              {
                JSON.parse(localStorage.getItem('stationList')!)
                .map((value: string, idx: number) => {
                  if (value !== station) return (<option key={idx}>{value}</option>)
                })
              } 
          </select>
        </div>
      </div>
      { res.isLoading && <Loading /> }
      { res.isError && <Error /> }
      { res.isSuccess &&
        <div className='flex justify-center relative h-full'>
          <MainCard grade={grade} sido={sido} myLocation={myLocation}  />
        </div>
      }
    </div>
  )
}

export default Main