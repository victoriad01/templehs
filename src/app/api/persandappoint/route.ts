// import { NextResponse } from 'next/server'
// const pool = require('@/utils/db/db.ts')

// export const GET = async () => {
//   try {
//     // const allPersonnel = await pool.query('SELECT * FROM availability')

//     const query = `SELECT p.*, a.* FROM personnel p JOIN availability a ON p.personnel_id = a.personnel_id;`
//     const personnelWithAvail = await pool.query(query)

//     return NextResponse.json({ status: 200, data: personnelWithAvail.rows })
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ status: 500, error })
//   }
// }
