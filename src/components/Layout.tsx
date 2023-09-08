import { Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import NavigationTap from "./NavigationTap";

interface PropsType {
  tabNum: number,
  setTabNum: Dispatch<SetStateAction<number>>
}
function Layout({ tabNum, setTabNum }: PropsType) {

  return (
    <>
      <h2 className='text-2xl font-bold text-center text-gray-700 mb-5'>오늘의 미세먼지</h2>
      <div className='flex justify-center overflow-auto w-full p-5'><Outlet></Outlet></div>
      <div className='absolute fixed left-0 bottom-0 w-full'>
          <NavigationTap tabNum={tabNum} setTabNum={setTabNum} />
      </div>
    </>
  )
}

export default Layout