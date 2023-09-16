function Error() {
  return (
    <div className='relative w-[26rem] h-[32rem] border-gray-200 bg-red-200 shadow-md rounded p-3 mt-5 animate-pulse'>
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex flex-col items-center text-center text-xl gap-3 font-bold tracking-wide w-full'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[200px] h-[200px]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
        <div>미세먼지 데이터를 불러올 수 없어요..</div>
        <div>잠시후 새로고침을 해주세요!</div>
      </div>
    </div>
  )
}

export default Error