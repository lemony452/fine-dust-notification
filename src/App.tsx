import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Main from './routes/main';

function App() {

  if (localStorage.getItem('sido') === null) {
    localStorage.setItem('sido', '서울');
    localStorage.setItem('station', '중구');
    localStorage.setItem('stationList', JSON.stringify( [] ));
  }

  let [sido, setSido] = useState<string>(localStorage.getItem('sido')!);
  let [station, setStation] = useState<string>(localStorage.getItem('station')!);
  // let [totalData, setTotal] = useState<object[] | null>();
  // let [myLocation, setMyLocation] = useState<MyLocation | null>();

  return (
    <div className="App">
      <Main sido={sido} station={station} setSido={setSido} setStaion={setStation}></Main>
    </div>
  );
}

export default App;
