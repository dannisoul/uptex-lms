import { IconExclamationMark } from '@tabler/icons-react'
import { CursoCardContent } from './CursoCardContent'
import { activarCurso } from '@/actions/curso/activarCurso'
import Link from 'next/link'

export function CursoCard ({ avatar, nombre, texto, descripcion, imagen, id, ruta, inicio, cierre, status = 1, updateCursos, toast }) {
  return (
    <div className='w-[250px] h-[280px] rounded-[40px] shadow-xl select-none group relative'>
      {
        (status === 0) &&
          <>

            <div className='bg-yellow-400 text-black w-fit rounded-full p-1 shadow-lg absolute right-4 top-4 z-10 group hover:bg-yellow-500 transition-all'>
              <IconExclamationMark />
            </div>

            <button
              onClick={async () => {
                try {
                  const response = await activarCurso(id)
                  if (response.error) throw new Error(response?.errorCode)
                  console.log(response)
                  updateCursos({ type: 'restore', payload: id })
                  toast.success('Curso restaurado')
                } catch (error) {
                  toast.error('Error al restaurar el curso')
                }
              }}
              className='bg-yellow-400 py-1 px-2 text-black rounded-full absolute left-4 top-4 z-10 text-sm font-semibold hover:bg-yellow-500 shadow-lg transition-all hidden group-hover:block animate-fade animate-duration-300'
            >Restaurar
            </button>
          </>
      }
      <div className={'w-full h-full ' + (status === 0 ? 'saturate-0' : '')}>

        {
          status === 1
            ? (
              <Link href={`${ruta}/${id}`}>
                <CursoCardContent
                  avatar={avatar}
                  cierre={cierre}
                  descripcion={descripcion}
                  texto={texto}
                  imagen={imagen}
                  inicio={inicio}
                  nombre={nombre}
                  status={status}
                />
              </Link>
              )
            : (
              <div>
                <CursoCardContent
                  avatar={avatar}
                  cierre={cierre}
                  descripcion={descripcion}
                  texto={texto}
                  imagen={imagen}
                  inicio={inicio}
                  nombre={nombre}
                  status={status}
                />
              </div>
              )

        }
      </div>

    </div>
  )
}
