import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { Accordion } from '../shared/Accordion'
import { ActionButton } from '../shared/ActionButton'
import { Tema } from './Tema'

export function UnidadesGrid (
  {
    unidades,
    temas,
    updateIdUnidad,
    updateIdTema,
    handleModalTema,
    handleEditTema,
    handleEditUnidad,
    handleDeleteUnidad,
    handleDeleteTema,
    actions,
    isOpen,
    authorized = true
  }) {
  return (
    <div className='flex flex-col gap-8'>
      {unidades.map((unidad) => {
        const temasPorUnidad = temas.filter((tema) => tema.idUnidad === unidad.idUnidad)
        return (
          <Accordion
            key={unidad.idUnidad}
            idUnidad={unidad.idUnidad}
            title={`Unidad ${unidad.np}`}
            nombre={unidad.nombre}
            isOpen={isOpen}
            actions={
              actions && (
                <>
                  <ActionButton
                    onClick={() => {
                      updateIdUnidad(unidad.idUnidad)
                      handleEditUnidad()
                    }} icon={<IconEdit />}
                  />
                  <ActionButton
                    onClick={() => {
                      updateIdUnidad(unidad.idUnidad)
                      handleDeleteUnidad()
                    }} icon={<IconTrash />}
                  />
                  <ActionButton
                    onClick={() => {
                      updateIdUnidad(unidad.idUnidad)
                      handleModalTema()
                    }}
                    icon={<IconPlus />}
                  />
                </>)
              }
          >
            {temasPorUnidad.length === 0 &&
              <li className='p-4 flex items-center justify-center border-btransition-all dark:bg-dark-tertiary-bg dark:text-white'>
                <span className=''>Presiona "+" para empezar a añadir temas</span>
              </li>}
            {temasPorUnidad.map(item => (
              <Tema
                key={item.idTema}
                tema={item}
                handleEditTema={handleEditTema}
                handleDeleteTema={handleDeleteTema}
                updateIdTema={updateIdTema}
                updateIdUnidad={updateIdUnidad}
                actions={actions}
                authorized={authorized}
              />
            ))}
          </Accordion>
        )
      })}
    </div>
  )
}
