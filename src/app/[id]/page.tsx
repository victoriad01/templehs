'use client'
import { BsCalendar2Date } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { GrNotification } from 'react-icons/gr'
import { MdOutlinePayment } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface data {
  ava_id: number | string
  personnel_id: number | string
  ava_time: { date: string; start_time: string; end_time: string }
}

interface Personnel {
  personnel_id: string | number
  personnel_email: string
  personnel_visittype: string
  personnel_image: string
  personnel_description: string
  personnel_jobtype: string
}

const Page = () => {
  const { id } = useParams()
  const [apiData, setApiData] = useState<data>()
  const [personnelData, setPersonnelData] = useState<Personnel>({
    personnel_id: '',
    personnel_email: '',
    personnel_visittype: '',
    personnel_image: '',
    personnel_description: '',
    personnel_jobtype: '',
  })
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState()

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/availability/${id}`
        )
        const jsonData = await response.json()
        setApiData(jsonData.data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/personnel/${apiData?.personnel_id}`
        )
        const jsonData = await response.json()
        setPersonnelData(jsonData.data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [apiData?.personnel_id])

  // const duration = new Date(apiData?.ava_time.end_time)

  const handleClick = (available: data) => {
    if (isChecked) {
      const ava_id = available?.ava_id
      const user_id = 1
      const data = { ava_id, user_id }
      const postData = async () => {
        try {
          const url = 'http://localhost:3000/api/appointment'
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

          if (response.ok) {
            // const responseData = await response.json()
            // navigate to Wow Modal
          } else {
            // The request was not successful
            throw new Error('Error: ' + response.status)
          }
        } catch (error) {
          setIsError(true)
          // @ts-ignore
          setError(error)
        }
      }

      postData()
    }
  }

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
        <div className='flex flex-col mt-4 bg-white rounded-md shadow-lg pl-6  md:w-[600px]'>
          <div className=' flex gap-4'>
            <Image
              src={personnelData?.personnel_image}
              alt='the clinician'
              width={65}
              height={65}
              className='cursor-pointer rounded-full bg-green-500 object-cover'
            />

            <div className='flex flex-col gap-3'>
              <p className='font-medium text-[18px]'>
                {personnelData?.personnel_email}
              </p>
              <p className='text-[12px]'>{personnelData?.personnel_jobtype}</p>
            </div>
          </div>

          <div className='mb-16   '>
            <div className='flex justify-start item-center mb-4 mt-12'>
              <p className='w-[200px] flex justify-start items-center gap-2'>
                <BsCalendar2Date />
                Date:
              </p>
              <p className='font-medium'>{apiData?.ava_time.date}</p>
            </div>
            <div className='flex justify-start item-center mb-4'>
              <p className='w-[200px] flex justify-start items-center gap-2'>
                <AiOutlineClockCircle />
                Duration:
              </p>
              <p className='font-medium'>{apiData?.ava_time.end_time}</p>
            </div>
            <div className='flex justify-start item-center mb-4 '>
              <p className='w-[200px] flex justify-start items-center gap-2'>
                <GrNotification />
                Reminder:
              </p>
              <p className='font-medium'>
                aleshpelumi@gmail.com
                <span className='pl-12 text-[green] '>Change</span>
              </p>
            </div>
            <div className='flex justify-start item-center mb-4'>
              <p className='w-[200px] flex justify-start items-center gap-2'>
                <MdOutlinePayment /> Payment Details:
              </p>
              <p className='font-medium'>
                Mastercard****6427 - Exp 02/25
                <span className='pl-12 text-[green] '>Change</span>
              </p>
            </div>
          </div>
        </div>

        <div className='flex justify-start gap-4 items-center'>
          <div>
            <label className=' flex justify-start items-center gap-4 my-6  text-[green]'>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={handleCheckboxChange}
                className='p-4 bg-[#454B1B]'
              />
              I certify that I have read and accept the terms of Temple.
            </label>
          </div>
        </div>
        <div className='flex justify-end items-center mt-6 px-14'>
          <button
            onClick={handleClick}
            className='bg-[#454B1B] px-8 py-4 rounded-full text-[white]'
          >
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
