'use server'
import { Usuario } from '@/models/Usuario'
import { encryptPassword } from '@/helpers/encryptPassword'

export async function crearUsuario (data) {
  const { paterno, materno, nombre, nacimiento, genero, correo, contrasena, rol } = data
  const hashedPassword = await encryptPassword(contrasena)
  const response = await Usuario.crearUsuario(paterno, materno, nombre, nacimiento, genero, correo, hashedPassword, rol)
  return response
}
