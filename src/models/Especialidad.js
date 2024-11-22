import { getConnection } from '@/db/connection'

export class Especialidad {
  constructor (idEspecialidad, nombre) {
    this.idEspecialidad = idEspecialidad
    this.nombre = nombre
  }

  static async obtenerEspecialidades () {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `
      SELECT idEspecialidad as value, nombre as name
      FROM especialidad`
      const [especialidades] = await connection.execute(sql, [])
      return { error: false, errorCode: null, especialidades }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, especialidades: [] }
    } finally {
      if (connection) connection.release()
    }
  }
}
