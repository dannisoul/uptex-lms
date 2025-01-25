import { createDirIfNotExists } from '@/helpers/createDirIfNotExists'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { uploadFile } from '@/helpers/uploadFile'
// import { deleteFile } from '@/helpers/deleteFile'
import { extname, join } from 'node:path'
import { createReadStream } from 'node:fs'
import { NextResponse } from 'next/server'
import { deleteObject, uploadObject } from '@/helpers/bucketGCS'

export async function POST (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true })

  const formData = await req.formData()
  const file = formData.get('imagen')
  const idCurso = formData.get('idCurso')
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/docentes/${session.user.idUsuario}/cursos/${idCurso}`
  await createDirIfNotExists(path)

  const response = await uploadFile(file, path, true)
  return Response.json(response)
}

export async function PUT (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true })
  const formData = await req.formData()
  const newFile = formData.get('imagen')
  const oldFile = formData.get('fileToRemove')
  const idCurso = formData.get('idCurso')
  // const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/${session.user.idUsuario}/cursos/${idCurso}`
  const path = `uploads/${session.user.idUsuario}/cursos/${idCurso}`
  console.log(newFile, 'Archivo nuevo')
  console.log(oldFile, 'Archivo viejo')
  if (oldFile) {
    // await deleteFile(path)
    await deleteObject(path + '/' + oldFile)
  }
  // const response = await uploadFile(newFile, path, true)
  const uploadReponse = await uploadObject(newFile, path, { optimizeImage: true })
  return Response.json(uploadReponse)
}

export async function GET (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true })

  const searchParams = new URL(req.nextUrl).searchParams
  const idCurso = searchParams.get('idCurso')
  const idUsuario = searchParams.get('idUsuario')
  const idImagen = searchParams.get('idImagen')
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/${idUsuario}/cursos/${idCurso}`
  const baseName = idImagen
  const extension = extname(baseName).replace('.', '')
  const absolutePath = join(path, baseName)
  const readStream = createReadStream(absolutePath)
  const res = new NextResponse(readStream, {
    status: 200,
    headers: new Headers({
      'content-type': `image/${extension}`
    })
  })
  return res
}
