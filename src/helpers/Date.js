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
