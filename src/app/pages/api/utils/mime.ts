import { NextRequest, NextResponse } from 'next/server'
import mime from 'mime'
import { join } from 'path'
import { stat, mkdir, writeFile } from 'fs/promises'
import * as dateFn from 'date-fns'

export const Mime = async (personnel_image: any) => {
  const buffer = Buffer.from(await personnel_image.arrayBuffer())
  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), 'dd-MM-Y')}`
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
      return NextResponse.json(
        { error: 'Something went wrong.' },
        { status: 500 }
      )
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const filename = `${personnel_image.name.replace(
      /\.[^/.]+$/,
      ''
    )}-${uniqueSuffix}.${mime.getExtension(personnel_image.type)}`
    await writeFile(`${uploadDir}/${filename}`, buffer)
    return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}` })
  } catch (e) {
    console.error('Error while trying to upload a file\n', e)
    return NextResponse.json({ error: e }, { status: 500 })
  }
}
