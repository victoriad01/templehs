import { Request, Response, NextFunction } from 'express'
import { NextResponse } from 'next/server'
const pool = require('@/utils/db/db.ts')

type Data = {
  ava_id?: string | number
  user_id?: string | number
}

export const POST = async (request: Request) => {
  try {
    // @ts-ignore
    const { availability_id, patient_id, personnel_id } = await request.json()
    if (availability_id && patient_id && personnel_id) {
      if (
        (typeof availability_id === 'string' || 'number') &&
        (typeof patient_id === 'string' || 'number') &&
        (typeof personnel_id === 'string' || 'number')
      ) {
        const isAlreadyCreated = await pool.query(
          'SELECT * from appointment WHERE availability_id = $1',
          [availability_id]
        )
        console.log(isAlreadyCreated.rows[0]?.patient_id)
        if (isAlreadyCreated.rows[0]?.patient_id == patient_id) {
          return NextResponse.json({
            status: 400,
            error: 'You earlier booked this Personnel you cannot book again!',
          })
        } else if (isAlreadyCreated.rows[0]) {
          return NextResponse.json({
            status: 400,
            error: 'This Personnel is already Booked at this time!',
          })
        } else {
          const aPersonnel = await pool.query(
            'INSERT INTO appointment ( availability_id, patient_id, personnel_id) VALUES ($1, $2, $3 ) RETURNING *',
            [availability_id, patient_id, personnel_id]
          )
          return NextResponse.json({ status: 200, data: aPersonnel.rows[0] })
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
    const allPersonnel = await pool.query('SELECT * FROM appointment')
    return NextResponse.json({ status: 200, data: allPersonnel.rows })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, error })
  }
}
