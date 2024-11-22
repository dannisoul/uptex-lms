// validacion para la imagen del usuario
export function validarAvatar (imagen) {
  const mime = imagen.type
  const sizeInKB = Math.round(imagen.size / 1024)
  if (!mime.startsWith('image/')) {
    return 'Solo se aceptan imagenes'
  } else if (sizeInKB > 500) {
    return 'El peso máximo es 500kb'
  } else {
    return ''
  }
}
