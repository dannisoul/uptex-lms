import { TELEFONO, ROL, SPECIAL_CHARS_AND_NUMBERS, NACIONALIDAD, DATE, DIRECCION, EMAIL, PASSWORD } from './regexs'

export function validarNombre (nombre) {
  const value = nombre.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 3 || value.length > 50) {
    return 'Entre 3 y 50 caracteres '
  } else if (SPECIAL_CHARS_AND_NUMBERS.test(value)) {
    return 'Caracteres especiales no válidos'
  } else {
    return ''
  }
}

export function validarNacionalidad (nacionalidad) {
  const value = String(nacionalidad).trim()
  if (value === '') {
    return 'Selecciona una nacionalidad'
  } else if (!NACIONALIDAD.test(value)) {
    return 'Selecciona una nacionalidad válida'
  } else {
    return ''
  }
}

export default function validarNacimiento (date) {
  const value = date.trim()
  const age = validateAge(value)
  if (value === '') {
    return 'Selecciona una fecha de nacimiento'
  } else if (!DATE.test(value)) {
    return 'Formato de fecha inválido'
  } else if (age < 18) {
    return 'Edad minima 18 años'
  } else {
    return ''
  }
}

function validateAge (date) {
  const now = new Date()
  const [year, month, day] = date.split('-')
  const birthday = new Date(year, month - 1, day)

  let age = now.getFullYear() - birthday.getFullYear()

  if (birthday > now.setFullYear(now.getFullYear() - age)) {
    age--
  }
  return age
}

export function validarTwitter (link) {
  const value = link.trim()
  if (value === '') {
    return 'Provee un enlace'
  } else if (!/^https:\/\/twitter.com\/[\da-zA-z]{1,}$/.test(value)) {
    return 'Pista: https://twitter.com/MiUsuario'
  } else {
    return ''
  }
}

export function validarInstagram (link) {
  const value = link.trim()
  if (value === '') {
    return 'Provee un enlace'
  } else if (!/^https:\/\/instagram.com\/[\da-zA-z]{1,}$/.test(value)) {
    return 'Pista: https://instagram.com/MiUsuario'
  } else {
    return ''
  }
}

export function validarFacebook (link) {
  const value = link.trim()
  if (value === '') {
    return 'Provee un enlace'
  } else if (!/^https:\/\/facebook.com\/[\da-zA-z]{1,}$/.test(value)) {
    return 'Pista: https://facebook.com/MiUsuario'
  } else {
    return ''
  }
}

export function validarTelefono (telefono) {
  const value = telefono.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (!TELEFONO.test(value)) {
    return 'Formato telefónico no válido'
  } else {
    return ''
  }
}

export function validarRol (rol) {
  const value = rol.trim()
  if (value === '') {
    return 'El rol no puede estar vacío'
  } else if (!ROL.test(value)) {
    return 'Ingresa un rol válido'
  } else {
    return ''
  }
}

export function validarGenero (genero) {
  const value = genero.trim()
  if (value === '') {
    return 'Selecciona un genero'
  } else if (value !== 'M' && value !== 'F') {
    return 'Selecciona un genero válido'
  } else {
    return ''
  }
}

export function validarEspecialidad (especialidad) {
  const value = String(especialidad).trim()
  if (value === '') {
    return 'Selecciona una especialidad'
  } else if (!/^\d+$/.test(value)) {
    return 'Selecciona una especialidad válida'
  } else {
    return ''
  }
}

export function validarDireccion (direccion) {
  const value = direccion.trim()
  if (value === '') {
    return /* 'Campo vacío' */ ''
  } else if (DIRECCION.test(value)) {
    return 'Caracteres especiales no válidos'
  } else {
    return ''
  }
}

export function validarDescripcion (descripcion) {
  const value = descripcion.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 100 || value.length > 500) {
    return 'Entre 100 y 500 caracteres '
  } else {
    return ''
  }
}

export function validarCorreo (correo) {
  const value = correo.trim()
  if (value === '') {
    return 'El correo no puede quedar vacío'
  } else if (!EMAIL.test(value)) {
    return 'Ingresa un correo válido'
  } else {
    return ''
  }
}

export function validarContrasena (contrasena) {
  const value = contrasena.trim()
  if (value === '') {
    return 'Proporciona una contraseña'
  } else if (!PASSWORD.test(value)) {
    return '8 caracteres letra, numero y simbolo'
  } else {
    return ''
  }
}

export function validarContrasena2 (contrasena, contrasena2) {
  const value = contrasena.trim()
  const value2 = contrasena2.trim()
  if (value2 === '') {
    return 'Confirma la contraseña'
  } else if (value2 !== value) {
    return 'Las contraseñas deben coincidir'
  } else {
    return ''
  }
}

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
