import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Main from './routes/main';
import NavigationTap from './components/NavigationTap';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import All from './routes/All';
import Bookmark from './routes/Bookmark';
import Layout from './components/Layout';

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
      <Routes>
        <Route path='/' element={<Layout tabNum={tabNum} setTabNum={setTabNum} />}>
          <Route index element={<Main sido={sido} station={station} setSido={setSido} setStaion={setStation} />}></Route>
          <Route path='/all' element={ <All /> }></Route>
          <Route path='/bookmark' element={ <Bookmark /> }></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
