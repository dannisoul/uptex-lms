import { CursoCard } from './CursoCard'
import { NuevoCurso } from './NuevoCurso'

export function CursosGrid ({ handleModal, cursos, newCard, title, title2 }) {
  return (
    <section className='grid cardContainer gap-8 place-content-center mt-16'>
      {cursos.map((curso) => {
        const avatar = curso.avatar ? `/api/usuarios/images/?idDocente=${curso.idUsuario}&idImagen=${curso.avatar}` : '/mis_cursos/usuario.png'
        return (

          <CursoCard
            key={`${curso.nombre}-${(curso?.idGrupo || curso?.idCurso)}`}
            avatar={avatar}
            nombre={curso.nombre}
            grupo={curso.grupo || 'Click para gestionar'}
            imagen={`/api/cursos/images?idImagen=${curso.imagen}&idDocente=${(curso.idUsuario)}&idCurso=${curso.idCurso}`}
            descripcion={curso.descripcion}
            id={(curso?.idGrupo || curso.idCurso)}
            ruta='/mis_cursos'
          />
        )
      })}
      {newCard && <NuevoCurso handleClick={handleModal} title={title} title2={title2} />}
    </section>
  )
}
