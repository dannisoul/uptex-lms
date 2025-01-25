// import { createDirIfNotExists } from '@/helpers/createDirIfNotExists'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
// import { uploadFile } from '@/helpers/uploadFile'
import { join } from 'path'
import { createReadStream } from 'fs'
import { NextResponse } from 'next/server'
import Mime from 'mime'
import { uploadObject } from '@/helpers/bucketGCS'

export async function POST (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true, description: 'Usuario no autenticado' })

  const formData = await req.formData()
  const file = formData.get('recurso')
  const idCurso = formData.get('idCurso')
  const idUnidad = formData.get('idUnidad')
  const idTema = formData.get('idTema')
  // const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}`
  const path = `uploads/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}`

  const uploadResponse = await uploadObject(file, path)
  // await createDirIfNotExists(path)
  // const uploadResponse = await uploadFile(file, path)
  return Response.json(uploadResponse)
}

export async function GET (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true, description: 'Usuario no autenticado' })
  const url = req.nextUrl
  const searchParams = new URL(url).searchParams
  const idCurso = searchParams.get('idCurso')
  const idUnidad = searchParams.get('idUnidad')
  const idTema = searchParams.get('idTema')
  const idUsuario = searchParams.get('idUsuario')
  const baseName = searchParams.get('idRecurso')
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/${idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}`
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

/* export async function DELETE (req) {
  const session = await getServerSession(authOptions)
  if (!session.user) return Response.json({ error: true, description: 'Usuario no autenticado' })

  const url = req.nextUrl
  const searchParams = new URL(url).searchParams
  const idCurso = searchParams.get('idCurso')
  const idUnidad = searchParams.get('idUnidad')
  const idTema = searchParams.get('idTema')
  const file = searchParams.get('recurso')
  const path = `uploads/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}/${file}`

  const deleteResponse = await deleteObject(path)

  return Response.json(deleteResponse)

  // const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/${session.user.idUsuario}/cursos/${recurso.idCurso}/${recurso.idUnidad}/${recurso.idTema}`
}
 */
