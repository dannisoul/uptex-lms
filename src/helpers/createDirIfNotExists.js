import fs from 'fs/promises'
export async function createDirIfNotExists (path) {
  try {
    const stats = await fs.stat(path)
    if (stats.isDirectory()) {
      console.log('El directorio ya existe')
    } else {
      console.log(`La ruta es ${path} válida pero no es un directorio`)
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await fs.mkdir(path, { recursive: true })
        console.log(`Directorio: ${path} creado correctamente`)
      } catch (error) {
        console.log('Error al crear el directorio')
      }
    } else {
      console.log('Error al verificar la existencia del directorio')
    }
  }
}
