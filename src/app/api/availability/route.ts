import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../config/db/db'

type Data = {
  personnel_id?: string
  ava_time?: object
}

export const POST = async (request: NextRequest) => {
  try {
    const { personnel_id, ava_time } = await request.json()
    if (personnel_id && ava_time) {
      if (
        (typeof personnel_id === 'string' || 'number') &&
        typeof ava_time === 'object'
      ) {
        const isAlreadyCreated = await db('availability')
          .where('ava_time', ava_time)
          .where('personnel_id', personnel_id)

        if (isAlreadyCreated[0]) {
          return NextResponse.json({
            status: 400,
            error: 'This Period is already created by you!',
          })
        } else {
          await db('availability').insert({
            personnel_id,
            ava_time,
          })

          return NextResponse.json({
            status: 200,
            data: { personnel_id, ava_time },
          })
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
    const allPersonnel = await db('availability')
    return NextResponse.json({ status: 200, data: allPersonnel })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, error })
  }
}
