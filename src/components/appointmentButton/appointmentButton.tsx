'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface Time {
  time: string
  pro_id: number
}

export default function AppointmentButton({ time, pro_id }: Time) {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/${pro_id}`)
  }

  return (
    <button
      className='border-[1px] border-gray-500 p-3 mt-1 lg:mr-4 rounded-full text-gray-500 text-[14px]'
      onClick={handleClick}
    >
      {time}
    </button>
  )
}
