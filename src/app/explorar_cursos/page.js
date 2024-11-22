import { PaginacionCursos } from '../components/cursos/PaginacionCursos'

export default async function ExplorarCursos () {
  return (
    <main className='customSection max-w-[1200px] w-11/12 mx-auto pt-[120px] sm:pt-[150px] mb-16'>
      <PaginacionCursos />
    </main>
  )
}
