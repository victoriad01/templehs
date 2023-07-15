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
    const { ava_id, user_id } = await request.json()
    if (ava_id && user_id) {
      if (
        (typeof ava_id === 'string' || 'number') &&
        (typeof user_id === 'string' || 'number')
      ) {
        const isAlreadyCreated = await pool.query(
          'SELECT * from appointment WHERE ava_id = $1',
          [ava_id]
        )
        console.log(isAlreadyCreated.rows[0]?.user_id)
        if (isAlreadyCreated.rows[0]?.user_id == user_id) {
          return NextResponse.json({
            status: 400,
            error:
              'You have earlier booked this Personnel you cannot book again!',
          })
        } else if (isAlreadyCreated.rows[0]) {
          return NextResponse.json({
            status: 400,
            error: 'This Personnel is already Booked at this time!',
          })
        } else {
          const aPersonnel = await pool.query(
            'INSERT INTO appointment ( ava_id, user_id) VALUES ($1, $2 ) RETURNING *',
            [ava_id, user_id]
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
