import { NextRequest, NextResponse } from 'next/server'
import mime from 'mime'
import { join } from 'path'
import { stat, mkdir, writeFile } from 'fs/promises'
import * as dateFn from 'date-fns'
import { db } from '../../../../config/db/db'

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const personnel_fullName = formData.get('personnel_fullName')
    const personnel_email = formData.get('personnel_email')
    const personnel_description = formData.get('personnel_description')
    const personnel_jobType = formData.get('personnel_jobType')
    const personnel_position = formData.get('personnel_position')
    const personnel_visitType = formData.get('personnel_visitType')
    const personnel_image = formData.get('personnel_image') as Blob | null

    const detail = {
      personnel_fullName,
      personnel_email,
      personnel_description,
      personnel_jobType,
      personnel_position,
      personnel_visitType,
    }

    if (!personnel_image) {
      return NextResponse.json({ status: 400, error: 'File blob is required.' })
    }

    const expectedStringKeys = [
      'personnel_fullName',
      'personnel_email',
      'personnel_description',
      'personnel_jobType',
      'personnel_position',
      'personnel_visitType',
    ]

    // Check if all expected string keys are present
    const allKeysArePresent = expectedStringKeys.every((key) => key in detail)
    if (allKeysArePresent) {
      const allValuesAreStrings = Object.values(detail).every(
        (value) => value !== null && typeof value === 'string'
      )

      if (allValuesAreStrings) {
        const isAlreadyCreated = await db('personnel').where(
          'personnel_email',
          personnel_email
        )

        if (isAlreadyCreated[0]) {
          return NextResponse.json({
            status: 400,
            error: 'Personnel already exist!',
          })
        } else {
          const buffer = Buffer.from(await personnel_image.arrayBuffer())
          const relativeUploadDir = `/uploads/${dateFn.format(
            Date.now(),
            'dd-MM-Y'
          )}`
          const uploadDir = join(process.cwd(), 'public', relativeUploadDir)

          try {
            await stat(uploadDir)
          } catch (e: any) {
            if (e.code === 'ENOENT') {
              await mkdir(uploadDir, { recursive: true })
            } else {
              console.error(
                'Error while trying to create directory when uploading a file\n',
                e
              )
              return NextResponse.json({
                status: 500,
                error: 'Something went wrong.',
              })
            }
          }
          try {
            const uniqueSuffix = `${Date.now()}-${Math.round(
              Math.random() * 1e9
            )}`
            const filename = `${personnel_image.name.replace(
              /\.[^/.]+$/,
              ''
            )}-${uniqueSuffix}.${mime.getExtension(personnel_image.type)}`
            await writeFile(`${uploadDir}/${filename}`, buffer)
            const fileUrl = `${relativeUploadDir}/${filename}`
          

            const data = {
              personnel_fullname: personnel_fullName,
              personnel_email,
              personnel_description,
              personnel_jobtype: personnel_jobType,
              personnel_position,
              personnel_visit_type: personnel_visitType,
              personnel_image: fileUrl,
            }

            // new knex query
            await db('personnel').insert({
              personnel_fullname: personnel_fullName,
              personnel_email,
              personnel_description,
              personnel_jobtype: personnel_jobType,
              personnel_position,
              personnel_visit_type: personnel_visitType,
              personnel_image: fileUrl,
            })

            return NextResponse.json({
              status: 200,
              data,
            })
          } catch (e) {
            console.error('Error >>> ' + e)
            return NextResponse.json({ status: 500, error: e })
          }
        }
      } else {
        return NextResponse.json({
          status: 400,
          error: 'Some values are null or not strings.',
        })
      }
    } else {
      return NextResponse.json({
        status: 400,
        error: 'Keys can not be null!',
      })
    }
  } catch (error) {
    return NextResponse.json({ status: 500, error })
  }
}

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */

export const GET = async () => {
  try {
    const allPersonnel = await db('personnel')
    return NextResponse.json({ status: 200, data: allPersonnel })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, error })
  }
}
