import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../config/db/db'

export const POST = async (request: NextRequest) => {
  try {
    const { availability_id, patient_id, personnel_id } = await request.json()
    if (availability_id && patient_id && personnel_id) {
      if (
        (typeof availability_id === 'string' || 'number') &&
        (typeof patient_id === 'string' || 'number') &&
        (typeof personnel_id === 'string' || 'number')
      ) {
        const isAlreadyCreated = await db('appointment').where(
          'availability_id',
          availability_id
        )

        if (isAlreadyCreated[0]?.patient_id == patient_id) {
          return NextResponse.json({
            status: 400,
            error: 'You earlier booked this Personnel you cannot book again!',
          })
        } else if (isAlreadyCreated[0]) {
          return NextResponse.json({
            status: 400,
            error: 'This Personnel is already Booked at this time!',
          })
        } else {
          const aPponitment = await db('appointment')
            .insert({
              availability_id,
              patient_id,
              personnel_id,
            })
            .returning('*')

          return NextResponse.json({ status: 200, data: aPponitment })
        }
      } else
        return NextResponse.json({
          status: 400,
          error: 'Inputs are not valid!',
        })
    } else
      return NextResponse.json({
        status: 400,
        error: 'All fields are required!',
      })
  } catch (error) {
    return new NextResponse(error as BodyInit | null)
  }
}

export const GET = async () => {
  try {
    const allPersonnel = await db('appointment')
    return NextResponse.json({ status: 200, data: allPersonnel })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, error })
  }
}

export const DELETE = async (request: NextRequest) => {
  try {
    const { appointment_id } = await request.json()
    const checkId = isNaN(Number(appointment_id))
    if (!checkId) {
      const checkData = await db('appointment').where(
        'appointment_id',
        appointment_id
      )
      if (checkData[0]) {
        await db('appointment').where('appointment_id', appointment_id).del()
        return NextResponse.json({
          status: 200,
          message: `Appointment with ID ${appointment_id} Deleted!`,
        })
      } else {
        return NextResponse.json({
          status: 400,
          error: `No document with the Id: ${appointment_id}!`,
        })
      }
    } else {
      return NextResponse.json({ status: 500, error: 'Value is not a number!' })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, error })
  }
}
