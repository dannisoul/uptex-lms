// validacion para subir una presentación
export function validarPresentacion (ppt, maxSizeInKB, maxSize) {
  const mime = ppt.type
  const sizeInKB = Math.round(ppt.size / 1024)
  if (mime !== 'application/vnd.ms-powerpoint' && mime !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
    return 'Solo se aceptan Presentaciones'
  } else if (sizeInKB > maxSizeInKB) {
    return `El peso máximo es ${maxSize}`
  } else {
    return ''
  }
}
