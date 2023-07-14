import { Request, Response, NextFunction } from 'express'
import { NextResponse } from 'next/server'
const pool = require('@/utils/db/db.ts')

type Data = {
  personnel_email?: string
  personnel_visitType?: string
  personnel_image?: string
  personnel_description?: string
  personnel_jobType?: string
}

export const POST = async (request: Request) => {
  try {
    const {
      personnel_email,
      personnel_visitType,
      personnel_image,
      personnel_description,
      personnel_jobType,
    } = await request.json()
    if (
      personnel_email &&
      personnel_visitType &&
      personnel_image &&
      personnel_description &&
      personnel_jobType
    ) {
      if (
        typeof personnel_email &&
        typeof personnel_visitType &&
        typeof personnel_image &&
        typeof personnel_description &&
        typeof personnel_jobType === 'string'
      ) {
        const isAlreadyCreated = await pool.query(
          'SELECT from personnel WHERE personnel_email =$1',
          [personnel_email]
        )
        console.log(isAlreadyCreated.rows[0])
        if (isAlreadyCreated.rows[0]) {
          return NextResponse.json({
            status: 400,
            message: 'Personnel already exist!',
          })
        } else {
          const aPersonnel = await pool.query(
            'INSERT INTO personnel (personnel_email, personnel_visitType, personnel_image, personnel_description, personnel_jobType) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
              personnel_email,
              personnel_visitType,
              personnel_image,
              personnel_description,
              personnel_jobType,
            ]
          )
          return NextResponse.json({ status: 200, data: aPersonnel.rows[0] })
        }
      } else return new NextResponse('Inputs are not valid!', { status: 400 })
    } else return new NextResponse('All fields are required!', { status: 400 })
  } catch (error) {
    return new NextResponse(error as BodyInit | null)
  }
}

export const GET = async () => {
  try {
    const allPersonnel = await pool.query('SELECT * FROM personnel')
    return NextResponse.json({ status: 200, data: allPersonnel.rows })
  } catch (error) {
    console.log(error)
    return new NextResponse(error as BodyInit | null)
  }
}