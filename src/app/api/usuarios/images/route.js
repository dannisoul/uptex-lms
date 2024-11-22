import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { join, extname } from 'node:path'
import { createReadStream } from 'node:fs'
import { NextResponse } from 'next/server'
import { deleteFile } from '@/helpers/deleteFile'
import { uploadFile } from '@/helpers/uploadFile'
import { createDirIfNotExists } from '@/helpers/createDirIfNotExists'

export async function GET (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true, description: 'Credenciales no válidas' })
  const searchParams = new URL(req.nextUrl).searchParams
  const idDocente = searchParams.get('idDocente')
  const idAlumno = searchParams.get('idAlumno')
  const folder = idDocente ? 'docentes' : (idAlumno) ? 'alumnos' : ''
  if (folder === '') return Response.json({ error: true, description: 'no id provided' })
  const idImagen = searchParams.get('idImagen')
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/${folder}/${(idDocente || idAlumno)}/perfil`
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

export async function POST (req) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const data = await req.formData()
  const idRol = session.user.idRol
  const folder = idRol === 2 ? 'docentes' : (idRol === 3) ? 'alumnos' : (idRol === 1) ? 'administrador' : ''
  const idUsuario = session.user.idUsuario
  const newFile = data.get('avatar')
  const oldFile = data.get('fileToRemove')

  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/${folder}/${idUsuario}/perfil`

  await createDirIfNotExists(path)
  if (oldFile !== '') {
    const deletedResponse = await deleteFile(path, oldFile)
    if (deletedResponse.error) return { error: true, baseName: newFile.name, description: `Archivo: ${newFile.name} no guardado` }
  }
  const uploadResponse = await uploadFile(newFile, path)
  return Response.json(uploadResponse)
}
