import Link from 'next/link'

export function DocenteNavbar () {
  return (
    <>
      <li>
        <Link href='/mis_cursos'>Mis Cursos</Link>
      </li>
      <li>
        <Link href='/mis_grupos'>Mis Grupos</Link>
      </li>
      <li>
        <Link href='#'>Mis Alumnos</Link>
      </li>
      <li>
        <Link href='#'>Mis Asignaciones</Link>
      </li>
    </>
  )
}
