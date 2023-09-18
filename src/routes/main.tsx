import React, { useEffect, Dispatch, SetStateAction} from 'react';
import { SelctLocationData } from '../utils/utils';
import { GetDustData, sidoList } from "../utils/getDustData"
import { FaRegFaceLaughSquint, FaRegFaceSmile, FaRegFaceMeh, FaRegFaceFrown, FaRegFaceTired, FaQuestion } from 'react-icons/fa6';
import Loading from '../components/Loading';
import Error from '../components/Error';

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
        
          { myLocation.pm10Grade! === 0 && myLocation.pm25Grade! === 0 ?
            <div className='flex items-center justify-center flex-col p-10 w-full rounded-lg border border-gray-200 bg-gray-400 shadow-md'>
              <div className='absolute top-10 left-5'>
                <span className='text-2xl font-bold pr-1 text-gray-800'>{ myLocation.stationName }</span>
                <span className='font-bold text-gray-700'>{ sido }</span>
              </div>
              <FaQuestion className='' size={150} color='white' />
              <p className='text-4xl font-bold text-white py-3'>알수없음</p>
              <div className='absolute bottom-3 right-5 text-gray-700'>{ myLocation.dataTime }</div>
            </div> : null
          }
          { Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!) === 1 ?
            <div className='flex items-center justify-center flex-col p-10 w-full rounded-lg border border-gray-200 bg-blue-400 shadow-md'>
              <div className='absolute top-10 left-5'>
                <span className='text-2xl font-bold pr-1 text-gray-800'>{ myLocation.stationName }</span>
                <span className='font-bold text-gray-700'>{ sido }</span>
              </div>
              <FaRegFaceLaughSquint size={150} color='white' />
              <p className='text-4xl font-bold text-white py-3'>좋음</p>
              <div className='flex w-full justify-between px-12 mt-7'>
                <div className='block text-center'>
                  <div className='text-xl font-bold text-gray-800'>미세먼지</div>
                  <div className='text-lg text-gray-700'>{ myLocation.pm10Value } ㎍/㎥</div>
                </div>
                <div className='block text-center'>
                  <div className='text-xl font-bold text-gray-800'>초미세먼지</div>
                  <div className='text-lg text-gray-700'>{ myLocation.pm25Value } ㎍/㎥</div>
                </div>
              </div>
              <div className='absolute bottom-3 right-5 text-gray-700'>{ myLocation.dataTime }</div>
            </div> : null
          }
          { Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!) === 2 ?
              <div className='flex items-center justify-center flex-col p-10 w-full rounded-lg border border-gray-200 bg-emerald-400 shadow-md'>
                <FaRegFaceSmile size={150} color='white' />
              <div className='absolute top-10 left-5'>
                <span className='text-2xl font-bold pr-1 text-gray-800'>{ myLocation.stationName }</span>
                <span className='font-bold text-gray-700'>{ sido }</span>
              </div>
              <p className='text-4xl font-bold text-white py-3'>보통</p>
              <div className='flex w-full justify-between px-12 mt-7'>
                <div className='block text-center'>
                  <div className='text-xl font-bold text-gray-800'>미세먼지</div>
                  <div className='text-lg text-gray-700'>{ myLocation.pm10Value } ㎍/㎥</div>
                </div>
                <div className='block text-center'>
                  <div className='text-xl font-bold text-gray-800'>초미세먼지</div>
                  <div className='text-lg text-gray-700'>{ myLocation.pm25Value } ㎍/㎥</div>
                </div>
              </div>
              <div className='absolute bottom-3 right-5 text-gray-700'>{ myLocation.dataTime }</div>
            </div> : null
          }
          { Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!) === 3 ?
              <div className='flex items-center justify-center flex-col p-10 w-full rounded-lg border border-gray-200 bg-yellow-400 shadow-md'>
                <FaRegFaceMeh size={150} color='white' />
              <div className='absolute top-10 left-5'>
                <span className='text-2xl font-bold pr-1 text-gray-800'>{ myLocation.stationName }</span>
                <span className='font-bold text-gray-700'>{ sido }</span>
              </div>
              <FaRegFaceLaughSquint size={150} color='white' />
              <p className='text-4xl font-bold text-white py-3'>좋음</p>
              <div className='flex w-full justify-between px-12 mt-7'>
                <div className='block text-center'>
                  <div className='text-xl font-bold text-gray-800'>미세먼지</div>
                  <div className='text-lg text-gray-700'>{ myLocation.pm10Value } ㎍/㎥</div>
                </div>
                <div className='block text-center'>
                  <div className='text-xl font-bold text-gray-800'>초미세먼지</div>
                  <div className='text-lg text-gray-700'>{ myLocation.pm25Value } ㎍/㎥</div>
                </div>
              </div>
              <div className='absolute bottom-3 right-5 text-gray-700'>{ myLocation.dataTime }</div>
            </div> : null
          }
          { Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!) === 4 ?
            <div className='flex items-center justify-center flex-col p-10 w-full rounded-lg border border-gray-200 bg-orange-400 shadow-md'>
              <FaRegFaceFrown size={150} color='white' />
              <div className='absolute top-10 left-5'>
                <span className='text-2xl font-bold pr-1 text-gray-800'>{ myLocation.stationName }</span>
                <span className='font-bold text-gray-700'>{ sido }</span>
              </div>
              <p className='text-4xl font-bold text-white py-3'>좋음</p>
              <div className='flex w-full justify-between px-12 mt-7'>
                <div className='block text-center'>
                  <div className='text-xl font-bold text-gray-800'>미세먼지</div>
                  <div className='text-lg text-gray-700'>{ myLocation.pm10Value } ㎍/㎥</div>
                </div>
                <div className='block text-center'>
                  <div className='text-xl font-bold text-gray-800'>초미세먼지</div>
                  <div className='text-lg text-gray-700'>{ myLocation.pm25Value } ㎍/㎥</div>
                </div>
              </div>
              <div className='absolute bottom-3 right-5 text-gray-700'>{ myLocation.dataTime }</div>
            </div> : null
          }
          { Math.max(myLocation.pm10Grade!, myLocation.pm25Grade!) === 5 ?
            <div className='flex items-center justify-center flex-col p-10 w-full rounded-lg border border-gray-200 bg-rose-400 shadow-md'>
              <FaRegFaceTired size={150} color='white' />
              <div className='absolute top-10 left-5'>
                <span className='text-2xl font-bold pr-1 text-gray-800'>{ myLocation.stationName }</span>
                <span className='font-bold text-gray-700'>{ sido }</span>
              </div>
              <p className='text-4xl font-bold text-white py-3'>좋음</p>
              <div className='flex w-full justify-between px-12 mt-7'>
                <div className='block text-center'>
                  <div className='text-xl font-bold text-gray-800'>미세먼지</div>
                  <div className='text-lg text-gray-700'>{ myLocation.pm10Value } ㎍/㎥</div>
                </div>
                <div className='block text-center'>
                  <div className='text-xl font-bold text-gray-800'>초미세먼지</div>
                  <div className='text-lg text-gray-700'>{ myLocation.pm25Value } ㎍/㎥</div>
                </div>
              </div>
              <div className='absolute bottom-3 right-5 text-gray-700'>{ myLocation.dataTime }</div>
            </div> : null
          }
        </div>
      }
    </div>
  )
}

export default Main