import { CursoCard } from '../cursos/CursoCard'
import { NuevoCurso } from '../cursos/NuevoCurso'

/*
*/
export function GruposGrid ({ handleModal, grupos, newCard }) {
  return (
    <section className='grid cardContainer gap-8 place-content-center mt-16'>
      {grupos.map((grupo) => {
        const avatar = grupo.avatar ? `/api/usuarios/images/?idDocente=${grupo.idUsuario}&idImagen=${grupo.avatar}` : '/mis_cursos/usuario.png'
        return (

          <CursoCard
            key={`${grupo?.nombre}-${grupo?.idGrupo}`}
            avatar={avatar}
            nombre={grupo?.nombrecurso}
            grupo={grupo?.nombre || 'Click para gestionar'}
            imagen={`/api/cursos/images?idImagen=${grupo?.imagen}&idDocente=${(grupo?.idUsuario)}&idCurso=${grupo?.idCurso}`}
            descripcion={grupo?.descripcion}
            id={(grupo?.idGrupo || grupo?.idCurso)}
            ruta='mis_grupos'
            inicio={grupo?.inicio}
            cierre={grupo?.cierre}
          />
        )
      })}
      {newCard && <NuevoCurso handleClick={handleModal} title='Nuevo Grupo' title2='Crea un nuevo grupo' />}
    </section>
  )
}
