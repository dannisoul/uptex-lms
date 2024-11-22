export function getFormattedDate (date) {
  const formattedDate = new Date(date)
  return formattedDate.toISOString().slice(0, 10)
}
