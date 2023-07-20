import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../../../config/db/db'

export interface Params {
  id: string
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const { id } = params

  const checkId = isNaN(Number(id))

  try {
    if (!checkId) {
      const aPersonnel = await db('personnel').where('personnel_id', id)

      if (aPersonnel[0]) {
        return NextResponse.json({ status: 200, data: aPersonnel[0] })
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
