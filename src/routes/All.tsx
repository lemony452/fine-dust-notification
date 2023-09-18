import React, { useState } from 'react';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { SelctLocationData } from '../utils/utils';
import { GetDustData, sidoList } from "../utils/getDustData";
import Card from '../components/Card';
import Loading from '../components/Loading';
import Error from '../components/Error';
import '../App.css';

function All() {

  const bookmarkList = useSelector((state: RootState) => state.bookmark);

  let [sido, selectSido] = useState('서울');

  let res = GetDustData(sido);

  const clickSido = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    selectSido(e.target.value);
  }

  return (
    <div className='flex flex-col items-center gap-5 w-full h-full'>
      <div className="w-[30%]">
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
      { res.isLoading && <Loading /> }
      { res.isError && <Error /> }
      { res.isSuccess &&
        <div className='scroll-custom overflow-auto w-full h-full'>
            { res.data.map((dustData: SelctLocationData, idx: number) => <Card key={idx} sido={sido} dustData={dustData} bookmarkList={bookmarkList} />) }
        </div>
      }
    </div>
  )
}

export default All