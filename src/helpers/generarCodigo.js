export function generarCodigo (longitud) {
  let codigo = ''
  for (let i = 0; i < longitud; i++) {
    const tipoCaracter = Math.random() < 0.5 ? 'letra' : 'numero'

    if (tipoCaracter === 'letra') {
      const charCode = Math.floor(Math.random() * 26) + 65 // Mayúsculas
      codigo += String.fromCharCode(charCode)
    } else {
      const charCode = Math.floor(Math.random() * 10) + 48 // Números
      codigo += String.fromCharCode(charCode)
    }
  }
  return codigo
}
