// validacion para subir un Documento de texto plano
export function validarTextoPlano (txt, maxSizeInKB, maxSize) {
  const mime = txt.type
  const sizeInKB = Math.round(txt.size / 1024)
  if (mime !== 'text/plain') {
    return 'Solo se aceptan Documentos de Texto plano'
  } else if (sizeInKB > maxSizeInKB) {
    return `El peso máximo es ${maxSize}`
  } else {
    return ''
  }
}
