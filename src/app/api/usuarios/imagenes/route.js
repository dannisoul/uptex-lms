import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createReadStream } from 'node:fs'
import { NextResponse } from 'next/server'
import { join, extname } from 'node:path'
import { deleteObject, uploadObject } from '@/helpers/bucketGCS'
import { uploadFile, createDirIfNotExists, deleteFile } from '@/helpers/fileSystem'

export async function GET (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true, description: 'Credenciales no válidas' })
  const searchParams = new URL(req.nextUrl).searchParams
  const idUsuario = searchParams.get('idUsuario')
  const idImagen = searchParams.get('idImagen')
  const path = `${process.env.NEXT_PUBLIC_FOLDER}/${idUsuario}/perfil`
  const extension = extname(idImagen).replace('.', '')
  const absolutePath = join(path, idImagen)
  const readStream = createReadStream(absolutePath)
  const res = new NextResponse(readStream, {
    status: 200,
    headers: new Headers({
      'content-type': `image/${extension}`
    })
  })
  return res
}

export async function POST (req) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const data = await req.formData()
  const idUsuario = session.user.idUsuario
  const newFile = data.get('avatar')
  const oldFile = data.get('fileToRemove')
  const path = process.env.NEXT_PUBLIC_FOLDER
    ? `${process.env.NEXT_PUBLIC_FOLDER}/${idUsuario}/perfil`
    : `uploads/${idUsuario}/perfil`
  if (oldFile !== '') {
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
