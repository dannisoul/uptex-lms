export function Paginacion ({ totalPages, page, updatePage }) {
  return (
    <ul className='flex justify-center gap-2'>
      {
                Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={`page-${index}`}
                  >
                    <label>
                      <input type='radio' hidden name='page' value={index + 1} onChange={(e) => updatePage(e.target.value)} />
                      <span className={'w-8 h-8 rounded-lg items-center justify-center flex font-semibold cursor-pointer ' + (Number(page) === index + 1 ? 'bg-primary-accent text-white' : 'bg-white')}>
                        {index + 1}
                      </span>
                    </label>
                  </li>
                ))
            }
    </ul>
  )
}
