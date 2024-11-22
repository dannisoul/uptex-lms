import bcrypt from 'bcrypt'
import { Usuario } from '@/models/Usuario'

export async function authenticate (correo, contrasena) {
  const { result: usuario, error } = await Usuario.login(correo)
  if (error) return null
  const isAuthenticated = await bcrypt.compare(contrasena, usuario.contrasena)
  if (isAuthenticated) {
    return usuario
  } else {
    return null
  }
}
