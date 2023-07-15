import React, { useEffect, useState } from 'react'
import { Data } from '@/app/page'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Availabilty } from '../appointmentButton/appointmentButton'

export interface DataDetails {
  eachData: Data
}

const Card = ({ eachData }: DataDetails) => {
  const router = useRouter()
  return (
    <div className='flex flex-col mt-4 bg-white rounded-md shadow-lg pl-3 md:w-[600px]'>
      <div className='flex justify-end '>
        <p
          className={
            eachData.personnel_visittype === 'Virtual' ? 'virtual' : 'inperson'
          }
        >
          {eachData.personnel_visittype} visit only
        </p>
      </div>
      <div className=' flex gap-4'>
        <Image
          src={eachData.personnel_image}
          alt='the clinician'
          width={65}
          height={65}
          className='cursor-pointer rounded-full bg-green-500 object-cover'
        />

        <div className='flex flex-col gap-3'>
          <p className='font-medium text-[22px]'>{eachData.personnel_email}</p>
          <p className='text-[14px]'>{eachData.personnel_jobtype}</p>
        </div>
      </div>
      <p className='text-[14px] my-4'>{eachData.personnel_description}</p>
      <p className='font-medium text-[14px] mb-2'>Next Avaliable Slots</p>
      <div className='flex justify-start items-center gap-2 mb-2'>
        {eachData.availability?.map((available: Availabilty) => (
          <button
            key={available?.ava_id}
            className='border-[1px] border-gray-500 p-4 mt-1 lg:mr-4 rounded-full text-gray-500 text-[16px] flex justify-start items-center gap-1'
            onClick={() => {
              if (available?.ava_id) {
                router.push(`/${available?.ava_id}`)
              }
            }}
          >
            <p className='font-semibold'>
              {available?.ava_time.date ? available.ava_time.date : ''}
            </p>
            <p>
              {available?.ava_time.start_time
                ? available.ava_time.start_time
                : 'Not avaliable for now. Kindly Check Back'}
            </p>
          </button>
        ))}
      </div>
      <p className='text-[14px] my-4 font-medium text-[green]'>
        Check Full profile and availability
      </p>
    </div>
  )
}

export default Card
