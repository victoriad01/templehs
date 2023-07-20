import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page - Rendering', () => {
  it('should have Select your doctor and appointment time text', () => {
    render(<Home />)
    expect(
      screen.getByText(`Select your doctor and appointment time`)
    ).toBeInTheDocument()
  })
  it('should have input field to pick date', () => {
    render(<Home />)
    expect(screen.getByLabelText('Date')).toBeInTheDocument()
  })
  it('should have input field select time', () => {
    render(<Home />)
    expect(screen.getByLabelText('Time')).toBeInTheDocument()
  })
  it('should have input field to select Expertise date', () => {
    render(<Home />)
    expect(screen.getByText('Expertise')).toBeInTheDocument()
  })
  it('Should display cards with the details', async () => {
    // @ts-ignore
    render(<Home />)
    expect(await screen.findByTestId('card')).toBeInTheDocument()
  })

})
