import { createDirIfNotExists } from '@/helpers/createDirIfNotExists'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { uploadFile } from '@/helpers/uploadFile'
import { join } from 'path'
import { createReadStream } from 'fs'
import { NextResponse } from 'next/server'
import Mime from 'mime'

export async function POST (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true })

  const formData = await req.formData()
  const file = formData.get('recurso')
  const idCurso = formData.get('idCurso')
  const idUnidad = formData.get('idUnidad')
  const idTema = formData.get('idTema')
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/docentes/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}`
  await createDirIfNotExists(path)

  const response = await uploadFile(file, path)
  return Response.json(response)
}

export async function GET (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true })
  const url = req.nextUrl
  const searchParams = new URL(url).searchParams
  const idCurso = searchParams.get('idCurso')
  const idUnidad = searchParams.get('idUnidad')
  const idTema = searchParams.get('idTema')
  const idDocente = searchParams.get('idDocente')
  const baseName = searchParams.get('idRecurso')
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/docentes/${idDocente}/cursos/${idCurso}/${idUnidad}/${idTema}`
  const absolutePath = join(path, baseName)
  const mimetype = Mime.getType(absolutePath)
  const readStream = createReadStream(absolutePath)
  const res = new NextResponse(readStream, {
    status: 200,
    headers: new Headers({
      'content-type': `${mimetype}`
    })
  })
  return res
}
