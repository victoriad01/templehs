import Image from 'next/image'

export default function Navbar() {
  return (
    <main className='bg-[#f2fff2] text-[#0b1b17] py-6 px-8 flex justify-between items-center'>
      <div>
        <p className='font-[700]'>Schedule Appointment</p>
      </div>
      <div className='flex justify-between items-center gap-4'>
        <div>
          <Image
            src='/Notification.svg'
            alt='notification icon'
            width={20}
            height={20}
            className='cursor-pointer'
          />
        </div>
        <div className='flex justify-between items-center gap-4'>
          <Image
            src='/dp.png'
            alt='notification icon'
            width={50}
            height={50}
            className='h-10 w-10 rounded-full'
          />
          <div>
            <p>Pelumi Alesh</p>
            <p className='font-light text-[12px]'>pelumi.ai@mail.com</p>
          </div>
        </div>
      </div>
    </main>
  )
}
