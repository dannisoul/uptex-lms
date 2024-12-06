import { createDirIfNotExists } from '@/helpers/createDirIfNotExists'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { uploadFile } from '@/helpers/uploadFile'
import { deleteFile } from '@/helpers/deleteFile'
import { extname, join } from 'node:path'
import { createReadStream } from 'node:fs'
import { NextResponse } from 'next/server'

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
  const file = formData.get('imagen')
  const fileToRemove = formData.get('fileToRemove')
  const idCurso = formData.get('idCurso')
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/docentes/${session.user.idUsuario}/cursos/${idCurso}`
  const isDeleted = await deleteFile(path, fileToRemove)
  if (isDeleted.error) return Response.json({ error: true, baseName: file.name, description: `Archivo: ${file.name} no guardado` })
  const response = await uploadFile(file, path, true)
  return Response.json(response)
}

export async function GET (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true })

  const searchParams = new URL(req.nextUrl).searchParams
  const idCurso = searchParams.get('idCurso')
  const idDocente = searchParams.get('idDocente')
  const idImagen = searchParams.get('idImagen')
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/docentes/${idDocente}/cursos/${idCurso}`
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
