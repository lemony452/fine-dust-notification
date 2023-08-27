import React, { useState } from 'react';
import { GetDustData, sidoList } from "../utils/getDustData";
import { SelctLocationData } from '../utils/utils';
import Card from '../components/Card';
import './All.css';

function All() {

  let [sido, selectSido] = useState('서울');

  let res = GetDustData(sido);

  const clickSido = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    selectSido(e.target.value);
  }

  return (
    <div className='flex flex-col items-center h-[40rem]'>
      <div className="w-20 mr-5">
        <label htmlFor="underline_select" className="sr-only">Underline select</label>
        <select onChange={clickSido} id="underline_select"
          className="block py-2.5 px-1 w-full text-l text-gray-700 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option defaultValue={sido}>{ sido }</option>
            {
              sidoList.map((value, idx) => {
                if (value !== sido) return (<option key={idx}>{value}</option>)
              })
            } 
        </select>
      </div>
      { res.isLoading && '로딩중' }
      { res.isError && 'Error!' }
      <div className='scroll-custom overflow-auto'>
        { res && (res.data === undefined || res.data === null) ? '새로고침 해주세요!'
        : res.data.map((dustData: SelctLocationData, idx: number) => <Card key={idx} sido={sido} dustData={dustData} />) }
      </div>
    </div>
  )
}

export default All