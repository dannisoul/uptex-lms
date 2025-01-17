import { Storage } from '@google-cloud/storage'
import { extname, basename } from 'node:path'
import { optimizeImage } from './optimizeImage'

export async function uploadObject (file, path, options) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const extension = extname(file.name)
  const fileName = basename(file.name, extension)
  const baseName = `${fileName}${extension}`
  const storage = new Storage({ keyFilename: process.env.GCP_KEY })

  try {
    if (options?.optimizeImage) {
      const optimizedImage = await optimizeImage(buffer)
      await storage.bucket('uptex_lms').file(path + '/' + fileName + '.webp').save(optimizedImage)
      return { error: false, baseName: fileName + '.webp', description: `Archivo: ${baseName} guardado correctamente` }
    } else {
      await storage.bucket('uptex_lms').file(path + '/' + baseName).save(buffer)
      return { error: false, baseName, description: `Archivo: ${baseName} guardado correctamente` }
    }
  } catch (error) {
    console.log('Error al guardar el archivo', error)
    return { error: true, description: `Archivo: ${baseName} no guardado` }
  }
}

export async function deleteObject (path) {
  const storage = new Storage({
    keyFilename: process.env.GCP_KEY
  })
  try {
    await storage.bucket('uptex_lms').file(path).delete()
    return { error: false, description: `Archivo ${path} eliminado correctamente` }
  } catch (error) {
    console.log(error)
    return { error: true, description: `Error al eliminar el archivo ${path}` }
  }
}
