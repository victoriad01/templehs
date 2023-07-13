import React, { useState } from 'react'

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  return (
    <div>
      <label className=' flex justify-start items-center gap-4 my-4  text-[green]'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='p-4 bg-[green]'
        />
        I certify that I have read and accept the terms of Temple.
      </label>
    </div>
  )
}

export default Checkbox
