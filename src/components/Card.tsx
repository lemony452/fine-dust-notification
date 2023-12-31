import React, { useMemo } from 'react';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import { SelctLocationData } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { addLocation, removeLocation, LocationType } from '../store';

interface PropsType {
  sido: string,
  dustData: SelctLocationData,
  bookmarkList: LocationType[],
}

function Card({ sido, dustData, bookmarkList }: PropsType ) {

  const dispatch = useDispatch();

  let value: SelctLocationData = {
    stationName: dustData.stationName,
    dataTime: dustData.dataTime,
    pm10Value: Number(dustData.pm10Value),
    pm10Grade: Number(dustData.pm10Grade),
    pm25Value: Number(dustData.pm25Value),
    pm25Grade: Number(dustData.pm25Grade),
  }

  const isFavorite = useMemo(
    () => bookmarkList.some((location) => location.sidoN === sido && location.stationN === dustData.stationName)
  , [sido, dustData, bookmarkList])

  const clickFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isFavorite === true) dispatch(removeLocation({ sidoN: sido, stationN: value.stationName }));
    else dispatch(addLocation({ sidoN: sido, stationN: value.stationName }));
  }

  
  if (Math.max(value.pm10Grade!, value.pm25Grade!) === 1) {
    return (
      <div className="block p-5 w-full rounded-lg border border-gray-200 shadow-md mb-4 mx-auto bg-blue-400">
        <div className="mb-5 flex items-center justify-between">
          <div className='items-end'>
            <span className="text-2xl font-bold text-gray-800 pr-1">{ value.stationName }</span>
            <span className="tracking-tight text-gray-700 font-bold">{ sido }</span>
          </div>
          <span onClick={clickFavorite}>
            {
              isFavorite ? <BsBookmarkFill size={22} className='text-white cursor-pointer' /> : <BsBookmark size={22} className='text-white cursor-pointer' />
            }
          </span>
        </div>
        <div className="text-center text-gray-700">
          <p className="font-bold text-3xl text-white pb-5">좋음</p>
          <p className="text-end text-gray-700">{ value.dataTime }</p>
        </div>
      </div>
    )
  }
  else if (Math.max(value.pm10Grade!, value.pm25Grade!) === 2) {
    return (
      <div className="block p-5 w-[26rem] rounded-lg border border-gray-200 shadow-md mb-4 mx-auto bg-emerald-400">
        <div className="mb-5 flex items-center justify-between">
          <div className='items-end'>
            <span className="text-2xl font-bold text-gray-800 pr-1">{ value.stationName }</span>
            <span className="tracking-tight text-gray-700 font-bold">{ sido }</span>
          </div>
          <span onClick={clickFavorite}>
            {
              isFavorite ? <BsBookmarkFill size={22} className='text-white cursor-pointer' /> : <BsBookmark size={22} className='text-white cursor-pointer' />
            }
          </span>
        </div>
        <div className="text-center text-gray-700">
          <p className="font-bold text-3xl text-white pb-5">보통</p>
          <p className="text-end text-gray-700">{ value.dataTime }</p>
        </div>
      </div>
    )
  }
  else if (Math.max(value.pm10Grade!, value.pm25Grade!) === 3) {
    return (
      <div className="block p-5 w-[26rem] rounded-lg border border-gray-200 shadow-md mb-4 mx-auto bg-amber-400">
        <div className="mb-5 flex items-center justify-between">
          <div className='items-end'>
            <span className="text-2xl font-bold text-gray-800 pr-1">{ value.stationName }</span>
            <span className="tracking-tight text-gray-700 font-bold">{ sido }</span>
          </div>
          <span onClick={clickFavorite}>
            {
              isFavorite ? <BsBookmarkFill size={22} className='text-white cursor-pointer' /> : <BsBookmark size={22} className='text-white cursor-pointer' />
            }
          </span>
        </div>
        <div className="text-center text-gray-700">
          <p className="font-bold text-3xl text-white pb-5">한때나쁨</p>
          <p className="text-end text-gray-700">{ value.dataTime }</p>
        </div>
      </div>
    )
  }
  else if (Math.max(value.pm10Grade!, value.pm25Grade!) === 4) {
    return (
      <div className="block p-5 w-[26rem] rounded-lg border border-gray-200 shadow-md mb-4 mx-auto bg-orange-400">
        <div className="mb-5 flex items-center justify-between">
          <div className='items-end'>
            <span className="text-2xl font-bold text-gray-800 pr-1">{ value.stationName }</span>
            <span className="tracking-tight text-gray-700 font-bold">{ sido }</span>
          </div>
          <span onClick={clickFavorite}>
            {
              isFavorite ? <BsBookmarkFill size={22} className='text-white cursor-pointer' /> : <BsBookmark size={22} className='text-white cursor-pointer' />
            }
          </span>
        </div>
        <div className="text-center text-gray-700">
          <p className="font-bold text-3xl text-white pb-5">나쁨</p>
          <p className="text-end text-gray-700">{ value.dataTime }</p>
        </div>
      </div>
    )
  }
  else if (Math.max(value.pm10Grade!, value.pm25Grade!) === 5) {
    return (
      <div className="block p-5 w-[26rem] rounded-lg border border-gray-200 shadow-md mb-4 mx-auto bg-red-400">
        <div className="mb-5 flex items-center justify-between">
          <div className='items-end'>
            <span className="text-2xl font-bold text-gray-800 pr-1">{ value.stationName }</span>
            <span className="tracking-tight text-gray-700 font-bold">{ sido }</span>
          </div>
          <span onClick={clickFavorite}>
            {
              isFavorite ? <BsBookmarkFill size={22} className='text-white cursor-pointer' /> : <BsBookmark size={22} className='text-white cursor-pointer' />
            }
          </span>
        </div>
        <div className="text-center text-gray-700">
          <p className="font-bold text-3xl text-white pb-5">매우나쁨</p>
          <p className="text-end text-gray-700">{ value.dataTime }</p>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="block p-5 w-[26rem] rounded-lg border border-gray-200 shadow-md mb-4 mx-auto bg-gray-400">
        <div className="mb-5 flex items-center justify-between">
          <div className='items-end'>
            <span className="text-2xl font-bold text-gray-800 pr-1">{ value.stationName }</span>
            <span className="tracking-tight text-gray-700 font-bold">{ sido }</span>
          </div>
          <span onClick={clickFavorite}>
            {
              isFavorite ? <BsBookmarkFill size={22} className='text-white cursor-pointer' /> : <BsBookmark size={22} className='text-white cursor-pointer' />
            }
          </span>
        </div>
        <div className="text-center text-gray-700">
          <p className="text-3xl text-white pb-5">알수없음</p>
          <p className="text-end text-gray-700 invisible">알수없음</p>
        </div>
      </div>  
    )
  }
}

export default Card