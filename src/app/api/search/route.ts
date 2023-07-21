import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../config/db/db'

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const data = await request.json()
    const { expertise, date, time } = data

    const parts = date.split('-')
    
    const [day, month, year] = parts
    const reversedDate = `${year}/${month}/${day}`

    // const filter = await db('availability')
    //   .where('date', reversedDate)
    //   .where('start_time', time)

    const filter = await db('availability')
      .where('ava_time.date', date)
      .where('ava_time.start_time', time)
      .select()

    return NextResponse.json({
      status: 200,
      data: filter,
    })
  } catch (error) {
    console.log(error)
  }
}
