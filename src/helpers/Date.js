export function getDeadline (date) {
  date = new Date(date)
  const dia = date.getDate()
  const anio = date.getFullYear()
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  const mes = meses[date.getMonth() + 1]
  const horas = date.getHours()
  const minutos = date.getMinutes()

  return `${String(dia).padStart(2, '0')} de ${mes} del ${anio} a las ${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`
}

export function formatDateTimeToInput (date) {
  const pad = (num) => String(num).padStart(2, '0') // Asegura dos dígitos

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1) // Meses van de 0 a 11
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())

  return `${year}-${month}-${day}T${hours}:${minutes}`
}
