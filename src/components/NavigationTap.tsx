import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface TabProps {
  tabNum: number,
  setTabNum: Dispatch<SetStateAction<number>>
}

function NavigationTap({ tabNum, setTabNum } : TabProps) {

  const navigate = useNavigate();
  
  return (
    <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
      <li className="w-full">
        <div onClick={()=>{
          navigate('/');
          setTabNum(0);
        }}
          className={"inline-block w-full p-4 " + (tabNum === 0 ? "text-blue-700" : "text-black-700")}>
            내 지역
        </div>
      </li>
      <li className="w-full">
        <div onClick={()=>{
          navigate('/all');
          setTabNum(1);
        }} 
          className={"inline-block w-full p-4 "
            + (tabNum === 1 ? "text-blue-700" : "text-black-700")}>
            모든 지역
        </div>
      </li>
      <li className="w-full">
        <div onClick={()=>{
          navigate('/bookmark');
          setTabNum(2);
        }}
          className={"inline-block w-full p-4 "
            + (tabNum === 2 ? "text-blue-700" : "text-black-700")}>
            즐겨찾기
        </div>
      </li>
    </ul>
  )
}

export default NavigationTap