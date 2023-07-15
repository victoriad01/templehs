import { Request } from 'express'
import { NextResponse } from 'next/server'
const pool = require('@/utils/db/db.ts')

export interface Params {
  id: string
}

export const GET = async (req: Request, { params }: { params: Params }) => {
  const { id } = params
  const checkId = isNaN(Number(id))

  try {
    if (!checkId) {
      const availability_per_id = await pool.query(
        'SELECT * FROM availability WHERE ava_id = $1',
        [id]
      )
      if (availability_per_id.rows[0]) {
        return NextResponse.json({
          status: 200,
          data: availability_per_id.rows[0],
        })
      } else
        return NextResponse.json({
          status: 404,
          error: 'record with the id not found!',
        })
    } else {
      return NextResponse.json({ status: 400, error: 'id must be a number' })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, error })
  }
}
