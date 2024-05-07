import React from 'react'

const Progress = () => {
  return (
    <div className='bg-[#f1f1f1] rounded-lg hover:-translate-y-1 transition-all duration-300 shadow-2xl p-4'>
      <div className="flex items-center py-3">
        <span
          className="w-8 h-8 shrink-0 mr-4 rounded-full bg-white flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="#3B82F6" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
          </svg>

        </span>
        <div className="space-y-3 flex-1">
          <div className="flex items-center">
            <h4
              className="font-medium text-sm mr-auto text-gray-700 flex items-center"
            >
              Racha
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 shrink-0 w-5 h-5 text-gray-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                <path d="M12 9h.01"></path>
                <path d="M11 12h1v4h1"></path>
              </svg>
            </h4>
            <span className="px-2 py-1 rounded-lg bg-red-50 text-red-500 text-xs">
              6.8 / 10
            </span>
          </div>
          <div className="overflow-hidden bg-blue-50 h-1.5 rounded-full w-full">
            <span
              className="h-full bg-blue-500 w-full block rounded-full"
              style={{ width: '68%' }}
            ></span>
          </div>
        </div>
      </div>

      <div className="flex items-center py-3">
        <span
          className="w-8 h-8 shrink-0 mr-4 rounded-full bg-white flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3B82F6" className="w-6 h-6">
  <path fillRule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm1.5 1.5a.75.75 0 0 0-.75.75V16.5a.75.75 0 0 0 1.085.67L12 15.089l4.165 2.083a.75.75 0 0 0 1.085-.671V5.25a.75.75 0 0 0-.75-.75h-9Z" clipRule="evenodd" />
</svg>
        </span>
        <div className="space-y-3 flex-1">
          <div className="flex items-center">
            <h4
              className="font-medium text-sm mr-auto text-gray-700 flex items-center"
            >
              Modulos aprendidos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 shrink-0 w-5 h-5 text-gray-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                <path d="M12 9h.01"></path>
                <path d="M11 12h1v4h1"></path>
              </svg>
            </h4>
            <span className="px-2 py-1 rounded-lg bg-red-50 text-red-500 text-xs">
              6.8 / 10
            </span>
          </div>
          <div className="overflow-hidden bg-blue-50 h-1.5 rounded-full w-full">
            <span
              className="h-full bg-blue-500 w-full block rounded-full"
              style={{ width: '68%' }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress