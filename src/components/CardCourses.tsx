import React from 'react'

const CardCourses = ({url, title, info}: any) => {
  return (
    <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm">
        {/* <a href="" className="z-20 absolute h-full w-full top-0 left-0 ">&nbsp;</a> */}
        <div className="h-auto overflow-hidden">
          <div className="h-44 overflow-hidden relative">
            <img src={url} alt=""/>
          </div>
        </div>
        <div className="bg-white py-4 px-7">
          <h3 className="text-2xl flex justify-center mb-5 font-bold">{title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">
              <ul className='list-style-type'>
            {info.map((i:any)=>(
                <li className="text-sm mb-3 text-gray-600">{i}</li>
              ))}
              </ul>
          </p>
          </div>
        </div>
      </div>
  )
}

export default CardCourses