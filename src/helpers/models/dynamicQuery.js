export function dynamicQuery (fields, table, idName, idValue) {
  const fieldNames = []
  const values = []
  fields.forEach(([key, value]) => {
    fieldNames.push(`${key} = ?`)
    values.push(value)
  })
  const sql = `UPDATE ${table} set ${fieldNames.join(', ')} WHERE ${idName} = ?`
  values.push(idValue)
  return { sql, values }
}
