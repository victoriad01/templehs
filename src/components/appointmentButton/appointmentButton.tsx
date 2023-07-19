'use client'

import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { useRouter } from 'next/navigation'

export interface Availabilty {
  availability_id: string | number
  personnel_id: string | number
  ava_time: {
    date: string
    end_time: string
    start_time: string
  }
  created_at: string
  updated_at: string
}

export interface Avail {
  availability: Availabilty
}

export default function AppointmentButton({ availability }: Avail) {
  const router = useRouter()
  const handleClick = () => {
    // router.push(`/${pro_id}`)
  }

  return (
    <p>Hello</p>

    // {availability.map((avail:Availabilty)=>  <div>
    // <button
    //   className='border-[1px] border-gray-500 p-3 mt-1 lg:mr-4 rounded-full text-gray-500 text-[14px]'
    //   onClick={handleClick}
    // >
    //   <p>12:00am</p>
    // </button></div>)}
  )
}
