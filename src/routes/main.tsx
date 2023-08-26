import React, { useEffect, Dispatch, SetStateAction} from 'react';
import { GetDustData, sidoList } from "../utils/getDustData"
import { FaRegFaceLaughSquint, FaRegFaceSmile, FaRegFaceMeh, FaRegFaceFrown, FaRegFaceTired } from 'react-icons/fa6';

interface PropsType {
  sido: string,
  station: string,
  setSido: Dispatch<SetStateAction<string>>,
  setStaion: Dispatch<SetStateAction<string>>,
}

export interface MyLocation {
  stationName: string,
  dataTime: string,
  pm10Value: number | null,
  pm10Grade: number | null,
  pm25Value: number | null,
  pm25Grade: number | null,
}

function Main({ sido, station, setSido, setStaion }: PropsType) {
  
  let res = GetDustData(sido); // 각 station 미세먼지 정보들이 배열에 담겨있음
  
  let myLocation: MyLocation = {
    stationName: '',
    dataTime: '',
    pm10Grade: 0,
    pm10Value: 0,
    pm25Grade: 0,
    pm25Value: 0,
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
        pm10Value: myValue.pm10Value,
        pm25Grade: myValue.pm25Grade,
        pm25Value: myValue.pm25Value,
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
      <div className="flex">
        <div className="w-40 mr-5">
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
        <div className="w-60">
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
      { res.isLoading && '로딩중' }
      { res.isError && 'Error!' }
      { res &&
        <div className='flex justify-center pt-10'>
          { myLocation.pm10Grade === null && <div>알수없음</div>}
          { Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!) === 1 ?
            <div className='flex flex-col p-10 w-[26rem] h-[30rem] rounded-lg border border-gray-200 bg-blue-400 shadow-md'>
              <p className='text-2xl font-bold'>{ myLocation.stationName }</p>
              <FaRegFaceLaughSquint size={180} color='white' />
              <p>좋음</p>
              <table table-fixed>
                <thead>
                  <tr>미세먼지 농도</tr>
                  <tr>초미세먼지 농도</tr>
                </thead>
                <tbody>
                  <td>{ myLocation.pm10Value } ug/m3</td>
                  <td>{ myLocation.pm25Value } ug/m3</td>
                </tbody>
              </table>
              { myLocation.dataTime }
            </div> : null
          }
          { Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!) === 2 ?
            <div className='flex flex-col p-10 w-[26rem] h-[30rem] rounded-lg border border-gray-200 bg-blue-400 shadow-md'>
              <FaRegFaceSmile size={180} color='white' />
              <p>보통</p>
              <table table-fixed>
                <thead>
                  <tr>미세먼지 농도</tr>
                  <tr>초미세먼지 농도</tr>
                </thead>
                <tbody>
                  <td>{ myLocation.pm10Value } ug/m3</td>
                  <td>{ myLocation.pm25Value } ug/m3</td>
                </tbody>
              </table>
              { myLocation.dataTime }
            </div> : null
          }
          { Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!) === 3 ?
            <div className='flex flex-col p-10 w-[26rem] h-[30rem] rounded-lg border border-gray-200 bg-blue-400 shadow-md'>
              <FaRegFaceMeh size={180} color='white' />
              <p>한때 나쁨</p>
              <table table-fixed>
                <thead>
                  <tr>미세먼지 농도</tr>
                  <tr>초미세먼지 농도</tr>
                </thead>
                <tbody>
                  <td>{ myLocation.pm10Value } ug/m3</td>
                  <td>{ myLocation.pm25Value } ug/m3</td>
                </tbody>
              </table>
              { myLocation.dataTime }
            </div> : null
          }
          { Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!) === 4 ?
            <div className='flex flex-col p-10 w-[26rem] h-[30rem] rounded-lg border border-gray-200 bg-blue-400 shadow-md'>
              <FaRegFaceFrown size={180} color='white' />
              <p>나쁨</p>
              <table table-fixed>
                <thead>
                  <tr>미세먼지 농도</tr>
                  <tr>초미세먼지 농도</tr>
                </thead>
                <tbody>
                  <td>{ myLocation.pm10Value } ug/m3</td>
                  <td>{ myLocation.pm25Value } ug/m3</td>
                </tbody>
              </table>
              { myLocation.dataTime }
            </div> : null
          }
          { Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!) === 5 ?
            <div className='flex flex-col p-10 w-[26rem] h-[30rem] rounded-lg border border-gray-200 bg-blue-400 shadow-md'>
              <FaRegFaceTired size={180} color='white' />
              <p>매우 나쁨</p>
              <table table-fixed>
                <thead>
                  <tr>미세먼지 농도</tr>
                  <tr>초미세먼지 농도</tr>
                </thead>
                <tbody>
                  <td>{ myLocation.pm10Value } ug/m3</td>
                  <td>{ myLocation.pm25Value } ug/m3</td>
                </tbody>
              </table>
              { myLocation.dataTime }
            </div> : null
          }
        </div>
      }
    </div>
  )
}

export default Main