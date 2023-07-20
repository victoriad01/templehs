import { NextResponse } from 'next/server'
import { db } from '../../../../../config/db/db'


export const GET = async () => {
  try {
    const query = `
      SELECT p.personnel_id, p.personnel_email, p.personnel_visitType, p.personnel_image, p.personnel_description, p.personnel_jobType, personnel_position, personnel_fullname, json_agg(a.*) AS availability
      FROM personnel p
      LEFT JOIN availability a ON p.personnel_id = a.personnel_id
      GROUP BY p.personnel_id, p.personnel_email, p.personnel_visitType, p.personnel_image, p.personnel_description, p.personnel_jobType ORDER BY p.personnel_id DESC;
    `
    const result = await db('personnel as p')
      .select(
        'p.personnel_id',
        'p.personnel_email',
        'p.personnel_visit_type',
        'p.personnel_image',
        'p.personnel_description',
        'p.p.personnel_jobtype',
        'p.personnel_position',
        'p.personnel_fullname'
      )
      .leftJoin('availability as a', 'p.personnel_id', 'a.personnel_id')
      .groupBy(
        'p.personnel_id',
        'p.personnel_email',
        'p.personnel_visit_type',
        'p.personnel_image',
        'p.personnel_description',
        'p.p.personnel_jobtype'
      )
      .orderBy('p.personnel_id', 'desc')
      .select(db.raw('json_agg(a.*) as availability'))

    return NextResponse.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, error })
  }
}
