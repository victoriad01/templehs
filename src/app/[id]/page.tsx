'use client'
import { BsCalendar2Date } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { GrNotification } from 'react-icons/gr'
import { MdOutlinePayment } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Availabilty } from '@/components/appointmentButton/appointmentButton'

interface Personnel {
  personnel_id: string | number
  personnel_email: string
  personnel_visittype: string
  personnel_image: string
  personnel_description: string
  personnel_jobtype: string
  personnel_fullname: string
  personnel_position: string
}

const Page = () => {
  const { id } = useParams()
  const router = useRouter()

  const [apiData, setApiData] = useState<Availabilty>()

  const [personnelData, setPersonnelData] = useState<Personnel>({
    personnel_id: '',
    personnel_email: '',
    personnel_visittype: '',
    personnel_image: '',
    personnel_description: '',
    personnel_jobtype: '',
    personnel_fullname: '',
    personnel_position: '',
  })
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // `http://localhost:3000/api/availability/byavaid/${id}`
          `https://templehs-deploy.vercel.app/api/availability/byavaid/${id}`
        )
        const jsonData = await response.json()
        setApiData(jsonData.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://templehs-deploy.vercel.app/api/personnel/${apiData?.personnel_id}`
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

  const handleClick = () => {
    if (!isChecked) {
      setError(
        'Please check the box to certify that you have read and accept the terms of Temple'
      )
    }
    if (isChecked) {
      setLoading(true)

      // The availability ID
      const availability_id = id

      // The personnel ID
      const personnel_id = apiData?.personnel_id

      // The assumed patient ID
      const patient_id = 2

      const data = { availability_id, patient_id, personnel_id }

      const postData = async () => {
        try {
          const url = 'https://templehs-deploy.vercel.app/api/appointment'
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

          const responseData = await response.json()

          if (responseData.status === 200) {
            // If OK,  navigate to Success page
            setLoading(false)
            router.push('/success')
          } else {
            setLoading(false)
            setIsError(true)
            setError(responseData.error)
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

  setTimeout(() => {
    setIsError(false)
  }, 5000)

  return (
    <div className='mt-8 mx-4 md:mx-8 lg:flex flex-col '>
      <div className='flex flex-col flex-1'>
        <Link
          href='/'
          className='flex gap-3 justify-start items-center mb-10 cursor-pointer'
        >
          <Image src='/back.png' alt='Back icon' width={15} height={15} />
          <p>Go back</p>
        </Link>
      </div>
      <div className='lg:flex justify-start items-start'>
        <div className='flex flex-col flex-1'>
          <p className='text-2xl md:text-3xl lg:w-[400px] font-medium leading-normal md:mb-12 lg:mb-0'>
            Confirm your appointment details
          </p>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex flex-col mt-4 bg-white rounded-md shadow-lg px-2 md:pl-4  md:w-[600px]'>
            <div className=' flex gap-4 mt-6'>
              <Image
                src={personnelData?.personnel_image}
                alt='the clinician'
                width={65}
                height={65}
                className='cursor-pointer rounded-full bg-green-500 object-cover h-[65px] w-[65px]'
              />

              <div className='flex flex-col gap-3'>
                <p className='font-medium text-[18px]'>
                  {personnelData?.personnel_fullname},
                  <span className='pl-2'>
                    {personnelData?.personnel_position}
                  </span>
                </p>

                <p className='text-[12px]'>
                  {personnelData?.personnel_jobtype}
                </p>
              </div>
            </div>

            <div className='mb-16'>
              <div className='flex justify-between md:justify-start item-center mb-4 mt-12'>
                <p className='w-[200px] flex  justify-start items-center gap-2'>
                  <BsCalendar2Date />
                  Date:
                </p>
                <p className='font-medium'>{apiData?.ava_time?.date}</p>
              </div>
              <div className='flex justify-between md:justify-start item-center mb-4'>
                <p className='w-[200px] flex justify-start items-center gap-2'>
                  <AiOutlineClockCircle />
                  Duration:
                </p>
                <p className='font-medium'>{apiData?.ava_time?.end_time}</p>
              </div>
              <div className='md:flex justify-start item-center mb-4 '>
                <p className='w-[200px] flex justify-start items-center gap-2'>
                  <GrNotification />
                  Reminder:
                </p>
                <p className='font-medium'>
                  aleshpelumi@gmail.com
                  <span className='pl-4 md:pl-12 text-[green] '>Change</span>
                </p>
              </div>
              <div className='md:flex justify-start item-center mb-2'>
                <p className='w-[200px] flex justify-start items-center gap-2'>
                  <MdOutlinePayment /> Payment Details:
                </p>
                <p className='font-medium'>
                  Mastercard****6427 - Exp 02/25
                  <span className='pl-4 md:pl-12 text-[green] '>Change</span>
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
          {error ? <p className='text-[red]'>Oops! {error}</p> : ''}
          <div className='flex justify-center md:justify-end items-center mt-6 md:px-14'>
            <button
              onClick={handleClick}
              className='bg-[#2f4416] px-6 md:px-8 py-3 rounded-full text-[white] shadow-md'
              disabled={loading}
            >
              {loading ? 'Please wait....' : 'Schedule Appointment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
