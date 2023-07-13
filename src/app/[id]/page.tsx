'use client'

import Checkbox from '@/components/checkBox/Checkbox'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const data = {
  url: '/doc3.png',
  name: 'Leo Stanton, MD',
  jobTitle: 'Care Team Clinician Supervisor',
  date: 'Tomorrow, June 12. 3:00pm',
  duration: '30 Minutes',
  reminderEmail: 'aleshpelumi@gmail.com',
  payment_details: 'Mastercard ****6427 - Exp 02/25',
}

const page = () => {
  // const [isChecked, setIsChecked] = useState<boolean>(false)

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsChecked(event.target.checked)
  // }

  return (
    <div className='mt-8 mx-8 lg:flex  '>
      <div className='flex flex-col flex-1'>
        <Link
          href='/'
          className='flex gap-3 justify-start items-center mb-10 cursor-pointer'
        >
          <Image src='/back.png' alt='Back icon' width={15} height={15} />
          <p>Go back</p>
        </Link>
        <p className='text-3xl lg:w-[400px] font-medium leading-normal md:mb-12 lg:mb-0'>
          Confirm your appointment details
        </p>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex flex-col mt-4 bg-white rounded-md shadow-lg pl-3 md:w-[600px]'>
          <div className=' flex gap-4'>
            <Image
              src={data.url}
              alt='the clinician'
              width={65}
              height={65}
              className='cursor-pointer rounded-full bg-green-500 object-cover'
            />

            <div className='flex flex-col gap-3'>
              <p className='font-medium text-[18px]'>{data.name}</p>
              <p className='text-[12px]'>{data.jobTitle}</p>
            </div>
          </div>
          {/* <p className='text-[11px] my-4'>{eachData.description}</p> */}
          <p className='font-medium text-[14px]'>Next Avaliable Slots</p>
        </div>

        <div className='flex justify-start gap-4 items-center'>
          {/* <div>
            <label className=' flex justify-start items-center gap-4 my-4  text-[green]'>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={handleCheckboxChange}
                className='p-4 bg-[green]'
              />
              I certify that I have read and accept the terms of Temple.
            </label>
          </div> */}
          <Checkbox />
        </div>
        <div className='flex justify-end items-center mt-6 px-14'>
          <button className='bg-[green] px-8 py-4 rounded-full text-[white]'>
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
