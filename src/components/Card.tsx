import React, { useState } from 'react';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'

function Card() {
  
  const [isFavorite, setIsFavorite] = useState(false);

  const clickFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="block p-5 max-w-sm rounded-lg border border-gray-200 shadow-md mb-4 mx-auto bg-blue-400">
      <div className="mb-5 flex items-center justify-between">
        <div className='items-end'>
          <span className="text-2xl font-bold text-gray-800 pr-1">중구</span>
          <span className="tracking-tight text-gray-700 font-bold">서울</span>
        </div>
        <span onClick={clickFavorite}>
          {
            isFavorite ? <BsBookmarkFill size={22} className='text-white cursor-pointer' /> : <BsBookmark size={22} className='text-white cursor-pointer' />
          }
        </span>
      </div>
      <div className="text-center text-gray-700">
        <p className="text-3xl text-white pb-5">좋음</p>
        <p className="text-end text-gray-700">23.08.08 12:00</p>
      </div>
    </div>
  )
}

export default Card