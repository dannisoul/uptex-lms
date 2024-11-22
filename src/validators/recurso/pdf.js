// validacion para subir un pdf
export function validarPdf (pdf, maxSizeInKB, maxSize) {
  const mime = pdf.type
  const sizeInKB = Math.round(pdf.size / 1024)
  if (mime !== 'application/pdf') {
    return 'Solo se aceptan PDF'
  } else if (sizeInKB > maxSizeInKB) {
    return `El peso máximo es ${maxSize}`
  } else {
    return ''
  }
}
