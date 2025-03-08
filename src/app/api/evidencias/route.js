import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { join } from 'path'
import { createReadStream } from 'fs'
import { NextResponse } from 'next/server'
import Mime from 'mime'

export async function GET (req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: true, description: 'Usuario no autenticado' })
  const url = req.nextUrl
  const searchParams = new URL(url).searchParams
  const idGrupo = searchParams.get('idGrupo')
  const idAsignacion = searchParams.get('idAsignacion')
  const idEntrega = searchParams.get('idEntrega')
  const file = searchParams.get('file')

  const path = `${process.env.NEXT_PUBLIC_FOLDER}/grupos/${idGrupo}/${idAsignacion}/${idEntrega}`
  const absolutePath = join(path, file)
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
