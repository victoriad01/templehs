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
      const isPersonnel = await pool.query(
        'SELECT * FROM personnel WHERE personnel_id = $1',
        [id]
      )
      if (isPersonnel.rows[0]) {
        const query = `SELECT p.*, a.* FROM personnel p JOIN availability a ON p.personnel_id = a.personnel_id WHERE p.personnel_id = $1;`
        const personnelWithAvail = await pool.query(query, [id])
        return NextResponse.json({
          status: 200,
          data: personnelWithAvail.rows,
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
