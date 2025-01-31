import { createDirIfNotExists, uploadFile, deleteFile } from '@/helpers/fileSystem'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { join } from 'path'
import { createReadStream } from 'fs'
import { NextResponse } from 'next/server'
import Mime from 'mime'
import { uploadObject, deleteObject } from '@/helpers/bucketGCS'

export async function POST (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true, description: 'Usuario no autenticado' })

  const formData = await req.formData()
  const file = formData.get('recurso')
  const idCurso = formData.get('idCurso')
  const idUnidad = formData.get('idUnidad')
  const idTema = formData.get('idTema')

  const path = process.env.NEXT_PUBLIC_FOLDER
    ? `${process.env.NEXT_PUBLIC_FOLDER}/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}`
    : `uploads/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}`

  let uploadResponse = null
  if (process.env.NEXT_PUBLIC_FOLDER) {
    await createDirIfNotExists(path)
    uploadResponse = await uploadFile(file, path)
  } else {
    uploadResponse = await uploadObject(file, path)
  }
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
  const path = `${process.env.NEXT_PUBLIC_FOLDER}/${idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}`
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

export async function DELETE (req) {
  const session = await getServerSession(authOptions)
  if (!session.user) return Response.json({ error: true, description: 'Usuario no autenticado' })

  const url = req.nextUrl
  const searchParams = new URL(url).searchParams
  const idCurso = searchParams.get('idCurso')
  const idUnidad = searchParams.get('idUnidad')
  const idTema = searchParams.get('idTema')
  const file = searchParams.get('recurso')
  const path = process.env.NEXT_PUBLIC_FOLDER
    ? `${process.env.NEXT_PUBLIC_FOLDER}/${session.idUsuario}/${idCurso}/${idUnidad}/${idTema}`
    : `uploads/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}/${file}`

  let deleteResponse = null

  if (process.env.NEXT_PUBLIC_FOLDER) {
    deleteResponse = await deleteFile(path, file)
  } else {
    deleteResponse = await deleteObject(path)
  }
  return Response.json(deleteResponse)
}
