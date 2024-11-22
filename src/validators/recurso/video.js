// validacion para subir un video
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
