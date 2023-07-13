'use client'

import Card from '@/components/Card/page'
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/page'
import Image from 'next/image'

const data = [
  {
    id: 1,
    visitType: 'Virtual visit only',
    url: '/doc3.png',
    name: 'Leo Stanton, MD',
    jobTitle: 'Care Team Clinician Supervisor',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo soluta magnam temporibus cumque veniam iure fuga ipsum quia magni placeat. Aut, quod earum maiores rerum quidem ex ab nemo expedita magnam vel delectus accusantium officia laborum',
    availableTime: ['Today, 3:30pm', 'Today, 6:30pm', 'Today, 8:30pm'],
  },
  {
    id: 2,
    visitType: 'In-person visit only',
    url: '/doc3.png',
    name: 'Leo Stanton, MD',
    jobTitle: 'Care Team Clinician Supervisor',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo soluta magnam temporibus cumque veniam iure fuga ipsum quia magni placeat. Aut, quod earum maiores rerum quidem ex ab nemo expedita magnam vel delectus accusantium officia laborum',
    availableTime: ['Today, 3:30pm'],
  },
  {
    id: 3,
    visitType: 'Virtual visit only',
    url: '/doc3.png',
    name: 'Leo Stanton, MD',
    jobTitle: 'Care Team Clinician Supervisor',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo soluta magnam temporibus cumque veniam iure fuga ipsum quia magni placeat. Aut, quod earum maiores rerum quidem ex ab nemo expedita magnam vel delectus accusantium officia laborum',
    availableTime: ['Today, 3:30pm'],
  },
]

interface Data {
  id: Number
  visitType: String
  url: String
  name: String
  jobTitle: String
  description: String
  availableTime: []
}

export default function Home() {
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

          {data.map((eachData) => (
            <Card eachData={eachData} key={eachData.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
