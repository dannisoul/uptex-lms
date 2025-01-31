import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { extname, join } from 'node:path'
import { createReadStream } from 'node:fs'
import { NextResponse } from 'next/server'
import { deleteObject, uploadObject } from '@/helpers/bucketGCS'
import { createDirIfNotExists, deleteFile, uploadFile } from '@/helpers/fileSystem'

export async function POST (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true })
  const formData = await req.formData()
  const idUsuario = session.user.idUsuario
  const newFile = formData.get('imagen')
  const oldFile = formData.get('fileToRemove')
  const idCurso = formData.get('idCurso')
  const path = process.env.NEXT_PUBLIC_FOLDER
    ? process.env.NEXT_PUBLIC_FOLDER + `/${idUsuario}/cursos/${idCurso}`
    : `uploads/${idUsuario}/cursos/${idCurso}`
  if (oldFile) {
    if (process.env.NEXT_PUBLIC_FOLDER) {
      await deleteFile(path, oldFile)
    } else {
      await deleteObject(path + '/' + oldFile)
    }
  }
  let uploadResponse = null
  if (process.env.NEXT_PUBLIC_FOLDER) {
    await createDirIfNotExists(path)
    uploadResponse = await uploadFile(newFile, path, { optimizeImage: true })
  } else {
    uploadResponse = await uploadObject(newFile, path, { optimizeImage: true })
  }
  return Response.json(uploadResponse)
}

export async function GET (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true })

  const searchParams = new URL(req.nextUrl).searchParams
  const idCurso = searchParams.get('idCurso')
  const idUsuario = searchParams.get('idUsuario')
  const idImagen = searchParams.get('idImagen')
  const path = `${process.env.NEXT_PUBLIC_FOLDER}/${idUsuario}/cursos/${idCurso}`
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
