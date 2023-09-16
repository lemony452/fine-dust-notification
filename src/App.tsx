import React, { useState } from 'react';
import Main from './routes/main';
import { Routes, Route } from 'react-router-dom';
import All from './routes/All';
import Bookmark from './routes/Bookmark';
import Layout from './components/Layout';

function App() {

  if (localStorage.getItem('sido') === null) {
    localStorage.setItem('sido', '서울');
    localStorage.setItem('station', '중구');
    localStorage.setItem('stationList', JSON.stringify( [] ));
    localStorage.setItem('bookmarkList', JSON.stringify( [] ));
  }

  let [sido, setSido] = useState<string>(localStorage.getItem('sido')!);
  let [station, setStation] = useState<string>(localStorage.getItem('station')!);

  let [tabNum, setTabNum] = useState<number>(0);

  return (
    <div className="m-auto relative p-5 w-[512px] h-[700px] bg-white rounded-xl">
      <Routes>
        <Route path='/fine-dust-notification/' element={<Layout tabNum={tabNum} setTabNum={setTabNum} />}>
          <Route index element={<Main sido={sido} station={station} setSido={setSido} setStaion={setStation} />}></Route>
          <Route path='/fine-dust-notification/all' element={ <All /> }></Route>
          <Route path='/fine-dust-notification/bookmark' element={ <Bookmark /> }></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
