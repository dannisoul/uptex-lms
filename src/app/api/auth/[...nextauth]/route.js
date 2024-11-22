import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authenticate } from '@/helpers/authenticateUser'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        correo: { label: 'correo', type: 'email' },
        contrasena: { label: 'contrasena', type: 'password' }
      },
      async authorize (credentials, req) {
        const { correo, contrasena } = credentials
        const user = await authenticate(correo, contrasena)
        return user
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt ({ token, user, session, trigger }) {
      if (trigger === 'update' && session?.avatar) {
        token.avatar = session.avatar
      }
      if (user) {
        token.idUsuario = user.idUsuario
        token.nombre = user.nombre
        token.paterno = user.paterno
        token.materno = user.materno
        token.genero = user.genero
        token.fechaNacimiento = user.fechaNacimiento
        token.correo = user.correo
        token.fechaNacimiento = user.fechaNacimiento
        token.idRol = user.idRol
        token.telefono = user.telefono
        token.avatar = user.avatar
        token.descripcion = user.descripcion
      }
      return token
    },
    async session ({ token, session, user }) {
      return {
        ...session,
        user: {
          idUsuario: token.idUsuario,
          nombre: token.nombre,
          paterno: token.paterno,
          materno: token.materno,
          genero: token.genero,
          correo: token.correo,
          fechaNacimiento: token.fechaNacimiento,
          idRol: token.idRol,
          telefono: token.telefono,
          avatar: token.avatar,
          descripcion: token.descripcion
        }
      }
    }
  }

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
