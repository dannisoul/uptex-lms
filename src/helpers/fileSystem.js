import fs from 'fs/promises'
import { unlink, rm, writeFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import { optimizeImage } from './optimizeImage'

export async function uploadFile (file, path, options) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const extension = extname(file.name)
  const fileName = basename(file.name, extension)
  const baseName = `${fileName}${extension}`
  const absolutePath = join(path, baseName)
  try {
    if (options?.optimizeImage) {
      const optimizedImage = await optimizeImage(buffer)
      await writeFile(absolutePath, optimizedImage)
    } else {
      await writeFile(absolutePath, buffer)
    }
    return { error: false, baseName, description: `Archivo: ${baseName} guardado correctamente` }
  } catch (error) {
    console.log('Error al guardar el archivo', error)
    return { error: true, baseName, description: `Archivo: ${baseName} no guardado` }
  }
}

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
