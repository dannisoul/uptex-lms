import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createReadStream } from 'node:fs'
import { NextResponse } from 'next/server'
// import { deleteFile } from '@/helpers/deleteFile'
// import { uploadFile } from '@/helpers/uploadFile'
// import { createDirIfNotExists } from '@/helpers/createDirIfNotExists'
import { join, extname } from 'node:path'
import { deleteObject, uploadObject } from '@/helpers/bucketGCS'

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
  const path = `uploads/${idUsuario}/perfil`

  if (oldFile !== '') {
    await deleteObject(path + '/' + oldFile)
    // const deleteResponse = await deleteFile(path, oldFile)
    // if (deleteResponse.error) return { error: true, baseName: newFile.name, description: `Archivo: ${newFile.name} no guardado` }
  }
  // await createDirIfNotExists(path)
  // const uploadResponse = await uploadFile(newFile, path)
  const uploadResponse = await uploadObject(newFile, path, { optimizeImage: true })
  return Response.json(uploadResponse)
}
