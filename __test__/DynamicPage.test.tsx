import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Booking from '@/app/[id]/page'
import { server } from '../mocks/server'

describe('Home Page - Rendering', () => {
  it('should make bookings', async () => {
    render(<Booking />)

    const buttonElement = screen.getByRole('button', {
      name: 'Schedule Appointment',
    })

    await userEvent.click(buttonElement)
  })
})
