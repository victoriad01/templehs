import { NextResponse } from 'next/server'
const pool = require('@/utils/db/db.ts')

export const GET = async () => {
  try {
    // const allPersonnel = await pool.query('SELECT * FROM availability')
    // const query = `SELECT p.*, a.* FROM personnel p JOIN availability a ON p.personnel_id = a.personnel_id;`
    // const query = `SELECT p.*, a.* FROM personnel p JOIN availability a ON p.personnel_id = a.personnel_id;`

    // const query = `
    //   SELECT p.*, a.ava_id, a.ava_time
    //   FROM personnel p
    //   LEFT JOIN availability a ON p.personnel_id = a.personnel_id;
    // `

    const query = `
      SELECT p.personnel_id, p.personnel_email, p.personnel_visitType, p.personnel_image, p.personnel_description, p.personnel_jobType, json_agg(a.*) AS availability
      FROM personnel p
      LEFT JOIN availability a ON p.personnel_id = a.personnel_id
      GROUP BY p.personnel_id, p.personnel_email, p.personnel_visitType, p.personnel_image, p.personnel_description, p.personnel_jobType ORDER BY p.personnel_id DESC;
    `

    const personnelWithAvail = await pool.query(query)

    return NextResponse.json({ status: 200, data: personnelWithAvail.rows })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, error })
  }
}
