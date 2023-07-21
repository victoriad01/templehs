'use client'

import Card from '@/components/Card/page'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export interface Data {
  personnel_id: string | number
  personnel_email: string
  personnel_visit_type: string
  personnel_image: string
  personnel_description: string
  personnel_jobtype: string
  personnel_fullname: string
  personnel_position: string
}

const Page = () => {
  const [apiData, setApiData] = useState<Array<Data>>([])
  const [getDate, setGetDate] = useState('Select date')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isError, setIsError] = useState(false)

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedOption, setSelectedOption] = useState('')

  const Date = () => {
    if (Number(selectedDate[0]) >= 1) {
      return selectedDate
    }
  }

  const Expertise = () => {
    if (selectedOption != '0') {
      return selectedOption
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/personnel')
        const jsonData = await response.json()
        setApiData(jsonData.data)
        console.log('>>>>> ' + jsonData.data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const data = { expertise: Expertise(), date: Date(), time: selectedTime }

  useEffect(() => {
    const postData = async () => {
      try {
        if (data.expertise && data.date && data.time) {
          const url = '/api/search'
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
          } else {
            setLoading(false)
            setIsError(true)
            setError(responseData.error)
          }
        }
      } catch (error) {
        setIsError(true)
        // @ts-ignore
        setError(error)
      }
    }
    postData()
  }, [Expertise()])

  return (
    <div>
      <div className='mt-8 mx-4 md:mx-8 lg:flex  text-[#191b0a]'>
        <div className='flex flex-col flex-1'>
          <div
            className='flex gap-3 justify-start items-center mb-10 cursor-pointer'
            role='navigation'
          >
            <Image src='/back.png' alt='Back icon' width={15} height={15} />
            <p>Go back</p>
          </div>
          <p className='text-2xl  lg:text-4xl lg:w-[450px] leading-10 font-medium md:mb-12 lg:mb-0'>
            Select your doctor and appointment time
          </p>
        </div>
        <div className='flex flex-col flex-1'>
          <div className=' md:flex  md:gap-3'>
            <div>
              <div className='font-medium mt-4 md:mt-0'>
                <label
                  htmlFor='date-input'
                  className='font-medium mt-4 md:mt-0'
                >
                  Date
                  <span className='text-[gray] font-light text-[12px] pl-1'>
                    (Input or select a date)
                  </span>
                </label>
              </div>
              <input
                id='date-input'
                type='date'
                placeholder='Select date'
                // value={getDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                defaultValue={getDate}
                className='border-[1px] border-[#D3D3D3] p-3 mt-1 cursor-pointer rounded-md text-gray-500 w-full md:w-[190px]'
              />
            </div>

            <div>
              <div className='font-medium mt-4 md:mt-0'>
                <label
                  htmlFor='select-time'
                  className='font-medium mt-4 md:mt-0'
                >
                  Time
                  <span className='text-[gray] font-light text-[12px] pl-1'>
                    (Input or select time)
                  </span>
                </label>
              </div>
              <input
                type='time'
                id='select-time'
                onChange={(e) => setSelectedTime(e.target.value)}
                placeholder='Select time range'
                className='border-[1px] border-[#D3D3D3] p-3 mt-1 cursor-pointer rounded-md text-gray-500 w-full md:w-[190px]'
              />
            </div>
            <div className='my-4 md:my-0'>
              <label htmlFor='select-expertise' className='font-medium '>
                Expertise
              </label>

              <div
                id='select-expertise'
                className=' border-[1px] border-[#D3D3D3] p-3 mt-1 cursor-pointer rounded-md text-gray-500 w-full md:w-[190px]'
              >
                <select
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className='bg-[white] pr-28 md:pr-6'
                >
                  <option value='0'>Select expertise</option>
                  <option value='Senior Doctor'>Senior Doctor</option>
                  <option value='Senior Dentist'>Senior Dentist</option>
                  <option value='Dentist'>Dentist</option>
                  <option value='Doctor'>Doctor</option>
                </select>
              </div>
            </div>
          </div>

          <div data-testid='card'>
            {apiData?.map((eachData) => (
              <Card eachData={eachData} key={eachData?.personnel_id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
