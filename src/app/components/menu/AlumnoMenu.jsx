import { CardMenu } from './CardMenu'
const OPTIONS = [
  { title: 'Mis Cursos', image: 'menu/alumno/miscursos.webp', icon: 'menu/alumno/miscursosIcon.png', href: '/mis_cursos' },
  { title: 'Explorar Cursos', image: 'menu/alumno/explorarcursos.webp', icon: 'menu/alumno/explorarcursosIcon.png', href: '/explorar_cursos' },
  { title: 'Mis Calificaciones', image: 'menu/alumno/miscalificaciones.webp', icon: 'menu/alumno/miscalificacionesIcon.png', href: '#' },
  { title: 'Mis Asignaciones', image: 'menu/alumno/misasignaciones.webp', icon: 'menu/alumno/misasignacionesIcon.png', href: '#' }
]
export function AlumnoMenu () {
  return (
    <section className='grid cardContainer max-w-[1200px] mx-auto gap-8 place-content-center customSection pt-[116px] mb-16'>
      {OPTIONS.map(option => (
        <CardMenu key={`${option.title}`} title={option.title} icon={option.icon} image={option.image} href={option.href} />
      ))}
    </section>
  )
}
