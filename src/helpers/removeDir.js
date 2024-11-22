import { rm } from 'node:fs/promises'
export async function removeDir (path) {
  try {
    await rm(path, { recursive: true, force: true })
    return { error: false, deletedDir: path, description: `Directorio: ${path} eliminado correctamente` }
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { error: false, deletedDir: path, description: `Directorio: ${path} no encontrado` }
    } else {
      console.log('Error al eliminar el directorio el archivo', error)
      return { error: true, deletedDir: path, description: `Directorio: ${path} no eliminado` }
    }
  }
}
