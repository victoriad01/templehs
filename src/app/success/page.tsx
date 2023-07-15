import Link from 'next/link'
import React from 'react'

const route = () => {
  return (
    <div className=' '>
      <div className='flex flex-col justify-center items-center gap-4'>
        <p className='text-[green]  text-5xl font-light mt-[180px]'>
          SUCCESSFULL!
        </p>
        <p className='text-[#454B1B] text-[16px]'>Appointment Booked!</p>

        <Link href='/'>
          <button className='bg-[#454B1B] px-8 py-2 rounded-full text-[white] shadow-md font-semibold'>
            Make another Booking!
          </button>
        </Link>
      </div>
    </div>
  )
}

export default route
