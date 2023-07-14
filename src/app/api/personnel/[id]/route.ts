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
      const aPersonnel = await pool.query(
        'SELECT * FROM personnel WHERE personnel_id = $1',
        [id]
      )
      if (aPersonnel.rows[0]) {
        return NextResponse.json({ status: 200, data: aPersonnel.rows[0] })
      } else
        return NextResponse.json({
          status: 404,
          message: 'record with the id not found!',
        })
    } else {
      return NextResponse.json({ status: 400, message: 'id must be a number' })
    }
  } catch (error) {
    console.log(error)
    return new NextResponse(error as BodyInit | null)
  }
}