// validacion para subir un imagen
export function validarImagen (imagen, maxSizeInKB, maxSize) {
  const mime = imagen.type
  const sizeInKB = Math.round(imagen.size / 1024)
  if (!mime.startsWith('image/')) {
    return 'Solo se aceptan Imagenes'
  } else if (sizeInKB > maxSizeInKB) {
    return `El peso máximo es ${maxSize}`
  } else {
    return ''
  }
}
