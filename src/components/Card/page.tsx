import React, { useEffect, useState } from 'react'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

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
      <div className='flex justify-end'>
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
          <p className='font-medium text-[22px]'>
            {eachData.personnel_fullname},
            <span className='font-medium pl-[2px]'>
              {eachData.personnel_position?.toUpperCase()}
            </span>
          </p>
          <p className='text-[14px]'>{eachData.personnel_jobtype}</p>
        </div>
      </div>
      <p className='text-[14px] my-4'>{eachData.personnel_description}</p>
      <p className='font-medium text-[14px] mb-2'>Next Avaliable Slots</p>

      <div className='flex justify-start items-center'>
        <div className='flex w-[200px] md:w-[520px] justify-start items-center gap-2 mb-2'>
          {eachData.availability?.map((available: Availabilty) => (
            <button
              disabled={!eachData.availability}
              key={available?.availability_id}
              className='border-[2px] border-[#D3D3D3] px-2 py-4 md:p-4 mt-1 lg:mr-2 rounded-full text-gray-500 text-[12px] flex justify-start items-center gap-1'
              onClick={() => {
                if (available?.availability_id) {
                  router.push(`/${available?.availability_id}`)
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
        <div className='flex gap-6 z-10 bg-[#d0fed0] md:bg-transparent p-4 rounded-full opacity-90'>
          <SlArrowLeft className='cursor-pointer' />
          <SlArrowRight className='cursor-pointer' />
        </div>
      </div>
      <p className='text-[14px] my-4 font-medium text-[green]'>
        Check Full profile and availability
      </p>
    </div>
  )
}

export default Card
