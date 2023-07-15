'use client'

import Card from '@/components/Card/page'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export interface Data {
  personnel_id: string | number
  personnel_email: string
  personnel_visittype: string
  personnel_image: string
  personnel_description: string
  personnel_jobtype: string
  availability: []
}

const Page = () => {
  const [apiData, setApiData] = useState<Array<Data>>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/persandavail')
        const jsonData = await response.json()
        setApiData(jsonData.data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  console.log(apiData)
  return (
    <div>
      <div className='mt-8 mx-8 lg:flex  '>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-start items-center mb-10 cursor-pointer'>
            <Image src='/back.png' alt='Back icon' width={15} height={15} />
            <p>Go back</p>
          </div>
          <p className='text-3xl lg:w-[400px] font-medium leading-normal md:mb-12 lg:mb-0'>
            Select your doctor and appointment time
          </p>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='md:flex gap-3'>
            <div>
              <p className='font-medium'>Date</p>
              <input
                type='date'
                placeholder='Select date'
                className='border-[1px] border-gray-500 p-3 mt-1 rounded-md text-gray-500 w-[190px]'
              />
            </div>
            <div>
              <p className='font-medium'>Time</p>
              <input
                type='time'
                placeholder='Select date'
                className='border-[1px] border-gray-500 p-3 mt-1 rounded-md text-gray-500 w-[190px]'
              />
            </div>
            <div>
              <p className='font-medium'>Expertise</p>

              <div className='border-[1px] border-gray-500 p-3 mt-1 rounded-md text-gray-500 w-[190px]'>
                <select name='' id=''>
                  <option value='0'>Select expertise</option>
                </select>
              </div>
            </div>
          </div>
          {apiData?.map((eachData) => (
            <Card eachData={eachData} key={eachData.personnel_id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
