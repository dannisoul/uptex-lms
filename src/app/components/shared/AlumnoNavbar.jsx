import Link from 'next/link'

export function AlumnoNavBar () {
  return (
    <>
      <li>
        <Link href='/mis_cursos'>Mis Cursos</Link>
      </li>
      <li>
        <Link href='/explorar_cursos'>Explorar Cursos</Link>
      </li>
      <li>
        <Link href='#'>Mis Calificaciones</Link>
      </li>
      <li>
        <Link href='#'>Mis Asignaciones</Link>
      </li>
    </>
  )
}
