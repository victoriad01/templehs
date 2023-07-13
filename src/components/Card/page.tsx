import Image from 'next/image'
import React from 'react'
import AppointmentButton from '../appointmentButton/appointmentButton'

export interface Data {
  id: number
  visitType: string
  url: string
  name: string
  jobTitle: string
  description: string
  availableTime: string[]
}

export interface DataDetails {
  eachData: Data
}

const Card = ({ eachData }: DataDetails) => {
  const pro_id = eachData.id
  return (
    <div className='flex flex-col mt-4 bg-white rounded-md shadow-lg pl-3 md:w-[600px]'>
      <div className='flex justify-end '>
        <p className='text-[green] bg-[#d0fed0] px-6 py-[1px] text-sm'>
          {eachData.visitType}
        </p>
      </div>
      <div className=' flex gap-4'>
        <Image
          src={eachData.url}
          alt='the clinician'
          width={65}
          height={65}
          className='cursor-pointer rounded-full bg-green-500 object-cover'
        />

        <div className='flex flex-col gap-3'>
          <p className='font-medium text-[18px]'>{eachData.name}</p>
          <p className='text-[12px]'>{eachData.jobTitle}</p>
        </div>
      </div>
      <p className='text-[11px] my-4'>{eachData.description}</p>
      <p className='font-medium text-[14px]'>Next Avaliable Slots</p>
      <div>
        {eachData.availableTime.map((time, index) => (
          <AppointmentButton time={time} key={index} pro_id={pro_id} />
        ))}
      </div>
      <p className='text-[12px] my-4 font-medium text-[green]'>
        Check Full profile and availability
      </p>
    </div>
  )
}

export default Card
