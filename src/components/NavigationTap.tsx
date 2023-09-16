import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLocationOutline, IoMapOutline } from 'react-icons/io5';
import { BsBookmark } from 'react-icons/bs'

interface TabProps {
  tabNum: number,
  setTabNum: Dispatch<SetStateAction<number>>
}

function NavigationTap({ tabNum, setTabNum } : TabProps) {

  const navigate = useNavigate();
  
  return (
    <div className='bg-white w-full font-bold h-full border-t border-gray-200 flex justify-stretch rounded-xl overflow-hidden py-2'>
      <button onClick={()=> { setTabNum(0); navigate('/fine-dust-notification/') }}
        className='flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-gray-900'>
        <div className={(tabNum === 0 ? 'text-gray-900 ' : null) + 'text-center'}>
          <span className='block h-8 text-2xl leading-8 mb-2'><IoLocationOutline className='mx-auto' /></span>
          <span className='block text-s leading-none'>내 지역보기</span>
        </div>
      </button>
      <button onClick={()=> { setTabNum(1); navigate('/fine-dust-notification/all/') }}
        className='flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-gray-900'>
        <div className={(tabNum === 1 ? 'text-gray-900 ' : null) + 'text-center'}>
          <span className='block h-8 text-2xl leading-8 mb-2'><IoMapOutline className='mx-auto' /></span>
          <span className='block text-s leading-none'>모든 시/도 보기</span>
        </div>
      </button>
      <button onClick={()=> { setTabNum(2); navigate('/fine-dust-notification/bookmark') }}
        className='flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-gray-900'>
        <div className={(tabNum === 2 ? 'text-gray-900 ' : null) + 'text-center'}>
          <span className='block h-8 text-2xl leading-8 mb-2'><BsBookmark className='mx-auto' /></span>
          <span className='block text-s leading-none'>즐겨찾기</span>
        </div>
      </button>
    </div>
  )
}

export default NavigationTap