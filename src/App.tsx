import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Main from './routes/main';
import NavigationTap from './components/NavigationTap';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Card from './components/Card';

function App() {

  const navigate = useNavigate();

  if (localStorage.getItem('sido') === null) {
    localStorage.setItem('sido', '서울');
    localStorage.setItem('station', '중구');
    localStorage.setItem('stationList', JSON.stringify( [] ));
  }

  let [sido, setSido] = useState<string>(localStorage.getItem('sido')!);
  let [station, setStation] = useState<string>(localStorage.getItem('station')!);
  // let [totalData, setTotal] = useState<object[] | null>();
  // let [myLocation, setMyLocation] = useState<MyLocation | null>();

  let [tabNum, setTabNum] = useState<number>(0);

  return (
    <div className="App p-9 h-[40rem] overflow-auto">
      <Routes>
        <Route path='/'
          element={<Main sido={sido} station={station} setSido={setSido} setStaion={setStation} />}>
        </Route>
        <Route path='/all' element={ <div><Card></Card></div> }></Route>
        <Route path='/bookmark' element={ <div>즐겨찾기</div> }></Route>
      </Routes>

      <div>
        <NavigationTap tabNum={tabNum} setTabNum={setTabNum} />
      </div>
    </div>
  );
}

export default App;
