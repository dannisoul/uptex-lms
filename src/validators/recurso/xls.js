// validacion para subir una hoja de calculo
export function validarHojaDeCalculo (xls, maxSizeInKB, maxSize) {
  const mime = xls.type
  const sizeInKB = Math.round(xls.size / 1024)
  if (mime !== 'application/vnd.ms-excel' && mime !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    return 'Solo se aceptan Hojas de Calculo'
  } else if (sizeInKB > maxSizeInKB) {
    return `El peso máximo es ${maxSize}`
  } else {
    return ''
  }
}
