import { getConnection } from '@/db/connection'
// import { dynamicQuery } from '@/helpers/models/dynamicQuery'

export class Actividad {
  static async crearActividad (nombre, tipo, indicaciones, fechaCierre, extemporaneo, puntaje, idGrupo) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `INSERT INTO actividad (nombre, tipo, indicaciones, fecha_cierre, extemporaneo, puntaje, idGrupo) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`
      console.log(nombre, tipo, indicaciones, fechaCierre, extemporaneo, puntaje, idGrupo)
      const [result] = await connection.execute(sql, [nombre, tipo, indicaciones, fechaCierre, extemporaneo, puntaje, idGrupo])
      const [actividad] = await connection.execute('SELECT * FROM actividad WHERE idActividad = ?', [result.insertId])
      return { error: false, errorCode: null, insertId: result.insertId, newRecord: actividad[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, newRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async actividadesPorGrupo (idGrupo, page = 1, limit = 5) {
    let connection = null
    console.log(idGrupo)
    try {
      connection = await getConnection()
      const offset = (page - 1) * limit
      const sql = `
                      select
                        *
                      from 
                        actividad
                      where
                        idGrupo = ?
                        limit ${limit} offset ${offset}
          `
      const [counter] = await connection.execute('SELECT COUNT(*) as total FROM actividad WHERE idGrupo = ?', [idGrupo])
      const [actividades] = await connection.execute(sql, [idGrupo])
      return { error: false, errorCode: null, data: actividades, totalPages: Math.ceil(counter[0].total / limit) }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, solicitudes: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async actividadPorId (idActividad) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'SELECT * FROM actividad WHERE idActividad = ?'
      const [actividad] = await connection.execute(sql, [idActividad])
      return { error: false, errorCode: null, actividad: actividad[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, actividad: null }
    } finally {
      if (connection) connection.release()
    }
  }
}
