import { FaRegFaceLaughSquint, FaRegFaceSmile, FaRegFaceMeh, FaRegFaceFrown, FaRegFaceTired, FaQuestion } from 'react-icons/fa6';
import { SelctLocationData } from '../utils/utils';

interface PropsType {
  grade: number,
  sido: string,
  myLocation: SelctLocationData
}

const DustGradeInfo = [
  {
    state: '알수없음',
    color: 'gray'
  },
  {
    state: '좋음',
    color: 'blue'
  },
  {
    state: '보통',
    color: 'emerald'
  },
  {
    state: '한때 나쁨',
    color: 'yellow'
  },
  {
    state: '나쁨',
    color: 'orange'
  },
  {
    state: '매우 나쁨',
    color: 'rose'
  }
]

function MainCard({ grade, sido, myLocation }: PropsType) {

  const FaceComponent = (grade: number) => {
    switch (grade) {
      case 0:
        return <FaQuestion size={150} color='white' />
      case 1:
        return <FaRegFaceLaughSquint size={150} color='white' />
      case 2:
        return <FaRegFaceSmile size={150} color='white' />
      case 3:
        return <FaRegFaceMeh size={150} color='white' />
      case 4:
        return <FaRegFaceFrown size={150} color='white' />
      case 5:
        return <FaRegFaceTired size={150} color='white' />
    }
  }

  return (
    <div className={ 'flex items-center justify-center flex-col p-10 w-full rounded-lg border border-gray-200 shadow-md '
      + 'bg-'+ DustGradeInfo[grade].color +'-400'}>
      <div className='absolute top-5 left-5'>
        <span className='text-2xl font-bold pr-1 text-gray-800'>{ myLocation.stationName }</span>
        <span className='font-bold text-gray-700'>{ sido }</span>
      </div>
      { FaceComponent(grade) }
      {/* <FaceComponent size={150} color='white' /> */}
      <p className='text-4xl font-bold text-white py-3'>{ DustGradeInfo[grade].state }</p>
      <div className='flex w-full justify-between px-12 mt-7'>
        <div className='block text-center'>
          <div className='text-xl font-bold text-gray-800'>미세먼지</div>
          <div className='text-lg text-gray-700'>{ myLocation.pm10Value } ㎍/㎥</div>
        </div>
        <div className='block text-center'>
          <div className='text-xl font-bold text-gray-800'>초미세먼지</div>
          <div className='text-lg text-gray-700'>{ myLocation.pm25Value } ㎍/㎥</div>
        </div>
      </div>
      <div className='absolute bottom-3 right-5 text-gray-700'>{ myLocation.dataTime }</div>
    </div>
  )
}

export default MainCard