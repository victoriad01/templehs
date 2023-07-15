'use client'

import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { useRouter } from 'next/navigation'

export interface Availabilty {
  ava_id: string | number
  personnel_id: string | number
  ava_time: {
    // date: DetailedHTMLProps<
    //   HTMLAttributes<HTMLParagraphElement>,
    //   HTMLParagraphElement
    // >
    date: string
    end_time: string
    start_time: string
  }
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
