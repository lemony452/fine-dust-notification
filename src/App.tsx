import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Main from './routes/main';
import NavigationTap from './components/NavigationTap';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import All from './routes/All';
import Bookmark from './routes/Bookmark';

function App() {

  const navigate = useNavigate();

  if (localStorage.getItem('sido') === null) {
    localStorage.setItem('sido', '서울');
    localStorage.setItem('station', '중구');
    localStorage.setItem('stationList', JSON.stringify( [] ));
    localStorage.setItem('bookmarkList', JSON.stringify( [] ));
  }

  let [sido, setSido] = useState<string>(localStorage.getItem('sido')!);
  let [station, setStation] = useState<string>(localStorage.getItem('station')!);
  // let [totalData, setTotal] = useState<object[] | null>();
  // let [myLocation, setMyLocation] = useState<MyLocation | null>();

  let [tabNum, setTabNum] = useState<number>(0);

  return (
    <div className="App relative w-128 p-5 h-[50rem] bg-white rounded-xl">
      <h2 className='text-2xl font-bold text-center text-gray-700 mb-5'>오늘의 미세먼지</h2>
      <div className='flex justify-center overflow-auto w-full p-5'>
        <Routes>
          <Route path='/'
            element={<Main sido={sido} station={station} setSido={setSido} setStaion={setStation} />}>
          </Route>
          <Route path='/all' element={ <All /> }></Route>
          <Route path='/bookmark' element={ <Bookmark /> }></Route>
        </Routes>
      </div>
      <div className='absolute fixed left-0 bottom-0 w-full'>
        <NavigationTap tabNum={tabNum} setTabNum={setTabNum} />
      </div>
    </div>
  );
}

export default App;
