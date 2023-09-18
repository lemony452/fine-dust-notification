function Loading() {
  return (
    <div className='relative w-full h-full border-gray-200 bg-blue-200 shadow-md rounded p-3 animate-pulse'>
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex flex-row items-center text-2xl gap-3 font-bold tracking-wide'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 fill-blue-500">
          <path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.23-10.004 6.072 6.072 0 01-.02-.496z" clip-rule="evenodd" />
        </svg>
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default Loading