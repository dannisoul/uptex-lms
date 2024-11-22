export { default } from 'next-auth/middleware'

export const config = { matcher: ['/', '/mis_cursos', '/mis_cursos/:id*', '/tema/:id*', '/mis_grupos', '/mis_grupos/:id*', '/explorar_cursos', '/editar_perfil', '/perfil/:id*'] }
