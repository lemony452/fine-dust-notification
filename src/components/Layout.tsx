import { Dispatch, SetStateAction } from "react";
import { Outlet } from "react-router-dom";
import NavigationTap from "./NavigationTap";

interface PropsType {
  tabNum: number,
  setTabNum: Dispatch<SetStateAction<number>>
}

function Layout({ tabNum, setTabNum }: PropsType) {

  return (
    <div className="w-full h-full">
      <div className='flex justify-center text-2xl font-bold text-gray-700 mb-5 gap-3 h-[30px]'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
        오늘의 미세먼지
      </div>
      <div className='flex justify-center overflow-auto w-full h-[550px] p-5'>
        <Outlet />
      </div>
      <div className='absolute fixed left-0 bottom-0 w-full h-[80px]'>
          <NavigationTap tabNum={tabNum} setTabNum={setTabNum} />
      </div>
    </div>
  )
}

export default Layout