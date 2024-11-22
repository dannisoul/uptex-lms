import { CardMenu } from './CardMenu'
const OPTIONS = [
  { title: 'Mis Cursos', image: 'menu/docente/miscursos.webp', icon: 'menu/docente/miscursosIcon.png', href: '/mis_cursos' },
  { title: 'Mis Grupos', image: 'menu/docente/misgrupos.webp', icon: 'menu/docente/misgruposIcon.png', href: '/mis_grupos' },
  { title: 'Mis Alumnos', image: 'menu/docente/misalumnos.webp', icon: 'menu/docente/misalumnosIcon.png', href: '#' },
  { title: 'Mis Asignaciones', image: 'menu/docente/misasignaciones.webp', icon: 'menu/docente/misasignacionesIcon.png', href: '#' }
]

export function DocenteMenu () {
  return (
    <section className='grid cardContainer max-w-[1200px] mx-auto gap-8 place-content-center customSection pt-[116px] mb-16'>
      {OPTIONS.map(option => (
        <CardMenu key={`${option.title}`} title={option.title} icon={option.icon} image={option.image} href={option.href} />
      ))}
    </section>
  )
}
