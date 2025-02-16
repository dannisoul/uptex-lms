export function validarAudio (audio, maxSizeInKB, maxSize) {
  const mime = audio.type
  const sizeInKB = Math.round(audio.size / 1024)
  if (!mime.startsWith('audio/')) {
    return 'Solo se aceptan Audios'
  } else if (sizeInKB > maxSizeInKB) {
    return `El peso máximo es ${maxSize}`
  } else {
    return ''
  }
}

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

export function validarVideo (video, maxSizeInKB, maxSize) {
  const mime = video.type
  const sizeInKB = Math.round(video.size / 1024)
  if (!mime.startsWith('video/')) {
    return 'Solo se aceptan Videos'
  } else if (sizeInKB > maxSizeInKB) {
    return `El peso máximo es ${maxSize}`
  } else {
    return ''
  }
}

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
