import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { Data } from '@/app/page'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Availabilty } from '../appointmentButton/appointmentButton'
import { responsive } from '@/utils/carousel/carousel'

export interface DataDetails {
  eachData: Data
}

const Card = ({ eachData }: DataDetails) => {
  const router = useRouter()
  const [available, setAvailable] = useState<Array<Availabilty>>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://templehs-deploy.vercel.app/api/availability/${eachData.personnel_id}`
        )
        const jsonData = await response.json()
        setAvailable(jsonData.data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [eachData.personnel_id])

  return (
    <div className='flex flex-col mt-4 bg-white rounded-md shadow-lg pl-3 md:w-[600px]'>
      <div className='flex justify-end'>
        <p
          className={
            eachData.personnel_visit_type === 'Virtual' ? 'virtual' : 'inperson'
          }
        >
          {eachData.personnel_visit_type} visit only
        </p>
      </div>
      <div className=' flex gap-4 mt-12 md:mt-0'>
        <Image
          src={eachData.personnel_image}
          alt='the clinician'
          width={65}
          height={65}
          className='cursor-pointer rounded-full bg-green-500 object-cover w-[65px] h-[65px]'
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
          {available?.map((available: Availabilty) => (
            <div key={available.availability_id}>
              <button
                key={available?.availability_id}
                className='border-[2px] border-[#D3D3D3] px-2 py-4 md:p-4 mt-1 lg:mr-2 rounded-full text-gray-500 text-[12px] flex justify-start items-center gap-1 cursor-pointer'
                onClick={() => {
                  if (available?.availability_id) {
                    router.push(`/${available?.availability_id}`)
                  }
                }}
              >
                {available?.ava_time.date ? (
                  <div className='flex gap-2 justify-start items-center'>
                    <p className='font-semibold'>{available.ava_time.date}</p>
                    <p className='font-semibold'>
                      {available.ava_time.start_time}
                    </p>
                  </div>
                ) : (
                  <p>Not available at the Moment!</p>
                )}
              </button>
            </div>
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
