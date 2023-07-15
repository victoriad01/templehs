import { Request } from 'express'
import { NextResponse } from 'next/server'
const pool = require('@/utils/db/db.ts')

type Data = {
  personnel_id?: string
  ava_time?: object
}

export const POST = async (request: Request) => {
  try {
    // @ts-ignore
    const { personnel_id, ava_time } = await request.json()
    if (personnel_id && ava_time) {
      if (
        (typeof personnel_id === 'string' || 'number') &&
        typeof ava_time === 'object'
      ) {
        const isAlreadyCreated = await pool.query(
          'SELECT from availability WHERE ava_time = $1 AND personnel_id = $2',
          [ava_time, personnel_id]
        )
        if (isAlreadyCreated.rows[0]) {
          return NextResponse.json({
            status: 400,
            error: 'This Period is already created by you!',
          })
        } else {
          const aPersonnel = await pool.query(
            'INSERT INTO availability ( personnel_id, ava_time) VALUES ($1, $2 ) RETURNING *',
            [personnel_id, ava_time]
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
    return NextResponse.json({ status: 500, error })
  }
}

export const GET = async () => {
  try {
    const allPersonnel = await pool.query('SELECT * FROM availability')
    return NextResponse.json({ status: 200, data: allPersonnel.rows })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, error })
  }
}
