// validacion para subir un audio
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
