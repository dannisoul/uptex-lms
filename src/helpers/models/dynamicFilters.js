export function dynamicFilter (filters, query) {
  if (filters.length === 0 && query === '') return { condition: '', values: [] }
  let condition = 'WHERE '
  const filter = []
  const values = []

  filters.forEach(([key, value]) => {
    filter.push(`c.${key} = ?`)
    values.push(value)
  })
  if (query !== '') {
    filter.push('c.nombre LIKE ?')
    values.push(`${query}%`)
  }
  condition += `${filter.join(' AND ')}`
  return { condition, values }
}
