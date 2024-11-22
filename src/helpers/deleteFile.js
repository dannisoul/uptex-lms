import { unlink } from 'node:fs/promises'
import { join } from 'node:path'
export async function deleteFile (path, fileName) {
  const absolutePath = join(path, fileName)
  try {
    await unlink(absolutePath)
    return { error: false, deletedFile: fileName, description: `Archivo: ${fileName} eliminado correctamente` }
  } catch (error) {
    console.log('Error al guardar el archivo', error)
    if (error.code === 'ENOENT') {
      return { error: false, deletedFile: fileName, description: `Archivo: ${fileName} no encontrado` }
    } else {
      console.log(error)
      return { error: true, deletedFile: fileName, description: `Archivo: ${fileName} no eliminado` }
    }
  }
}
