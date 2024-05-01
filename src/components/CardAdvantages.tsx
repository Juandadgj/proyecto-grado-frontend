import React from 'react'

const CardAdvantages = ({ icon, title }: any) => {
  return (
    <div className="max-w-sm mx-auto my-5">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#BFF3FF] rounded-lg">
            {icon}
          </div>
          <div>
            <div className="text-gray-900 text-xl font-semibold">
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardAdvantages