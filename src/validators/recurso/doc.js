// validacion para subir un Documento de texto
export function validarDoc (doc, maxSizeInKB, maxSize) {
  const mime = doc.type
  const sizeInKB = Math.round(doc.size / 1024)
  if (mime !== 'application/msword' && mime !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return 'Solo se aceptan Documentos de Texto'
  } else if (sizeInKB > maxSizeInKB) {
    return `El peso máximo es ${maxSize}`
  } else {
    return ''
  }
}
