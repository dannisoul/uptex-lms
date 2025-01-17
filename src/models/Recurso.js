import { getConnection } from '@/db/connection'

export class Recurso {
  static async crearRecurso (nombre, ruta, mimetype, idTema) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `INSERT INTO recurso (nombre, ruta, mimetype, idTema) 
                    VALUES (?, ?, ?, ?)`
      const values = [nombre, ruta, mimetype, idTema]
      const [result] = await connection.execute(sql, values)
      const [recurso] = await connection.execute(`SELECT r.*, us.idUsuario as idDocente, c.idCurso as idCurso, u.idUnidad as idUnidad 
      FROM recurso r 
      INNER JOIN tema t ON r.idTema = t.idTema
      INNER JOIN unidad u ON t.idUnidad = u.idUnidad
      INNER JOIN curso c ON u.idCurso = c.idCurso
      INNER JOIN usuario us ON us.idUsuario = c.idUsuario 
      WHERE r.idRecurso = ?`, [result.insertId])
      return { error: false, errorCode: null, insertId: result.insertId, newRecord: recurso[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, newRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async eliminarRecurso (idRecurso) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'DELETE FROM recurso WHERE idRecurso = ?'
      const values = [idRecurso]
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows, deletedId: idRecurso }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, deletedId: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async recursosPorTema (idTema) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `SELECT r.*, c.idCurso as idCurso, c.idUsuario as idDocente, u.idUnidad as idUnidad 
      FROM recurso r 
      INNER JOIN tema t ON r.idTema = t.idTema
      INNER JOIN unidad u ON t.idUnidad = u.idUnidad
      INNER JOIN curso c ON u.idCurso = c.idCurso
      WHERE r.idTema = ?`
      const values = [idTema]
      const [recursos] = await connection.execute(sql, values)
      return { error: false, errorCode: null, recursos }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, recursos: [] }
    } finally {
      if (connection) connection.release()
    }
  }
}
