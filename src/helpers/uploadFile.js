import { writeFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
export async function uploadFile (file, path) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const extension = extname(file.name)
  const fileName = basename(file.name, extension)
  const baseName = `${fileName}_${Date.now()}${extension}`
  const absolutePath = join(path, baseName)
  try {
    await writeFile(absolutePath, buffer)
    return { error: false, baseName, description: `Archivo: ${baseName} guardado correctamente` }
  } catch (error) {
    console.log('Error al guardar el archivo', error)
    return { error: true, baseName, description: `Archivo: ${baseName} no guardado` }
  }
}
