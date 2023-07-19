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

  availability: []
}

const Page = () => {
  const [apiData, setApiData] = useState<Array<Data>>([])
  const [getDate, setGetDate] = useState('Select date')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../app/api/personnel.ts')
        const jsonData = await response.json()
        setApiData(jsonData.data)
        console.log('>>>>> ' + jsonData.data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <div className='mt-8 mx-4 md:mx-8 lg:flex  text-[#191b0a]'>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-start items-center mb-10 cursor-pointer'>
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
              <p className='font-medium mt-4 md:mt-0'>Date</p>
              <input
                type='date'
                placeholder='Select date'
                // value={getDate}
                defaultValue={getDate}
                className='border-[1px] border-[#D3D3D3] p-3 mt-1 cursor-pointer rounded-md text-gray-500 w-full md:w-[190px]'
              />
            </div>
            <div>
              <p className='font-medium mt-4 md:mt-0'>Time</p>
              <input
                type='time'
                placeholder='Select time range'
                className='border-[1px] border-[#D3D3D3] p-3 mt-1 cursor-pointer rounded-md text-gray-500 w-full md:w-[190px]'
              />
            </div>
            <div className='my-4 md:my-0'>
              <p className='font-medium '>Expertise</p>

              <div className='border-[1px] border-[#D3D3D3] p-3 mt-1 cursor-pointer rounded-md text-gray-500 w-full md:w-[190px]'>
                <select name='' id=''>
                  <option value='0'>Select expertise</option>
                </select>
              </div>
            </div>
          </div>
          {apiData?.map((eachData) => (
            <Card eachData={eachData} key={eachData?.personnel_id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
