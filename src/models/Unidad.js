import { getConnection } from '@/db/connection'
import { dynamicQuery } from '@/helpers/models/dynamicQuery'

export class Unidad {
  constructor (idUnidad, np, nombre, idCurso) {
    this.idUnidad = idUnidad
    this.np = np
    this.nombre = nombre
    this.idCurso = idCurso
  }

  static async crearUnidad (np, nombre, idCurso) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `INSERT INTO unidad (np, nombre, idCurso) 
                    VALUES (?, ?, ?)`
      const values = [np, nombre, idCurso]
      const [result] = await connection.execute(sql, values)
      const [unidad] = await connection.execute('SELECT * FROM unidad WHERE idUnidad = ?', [result.insertId])
      return { error: false, errorCode: null, insertId: result.insertId, newRecord: unidad[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, newRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async actualizarUnidad (idUnidad, ...fields) {
    let connection = null
    try {
      connection = await getConnection()
      const { sql, values } = dynamicQuery(fields, 'unidad', 'idUnidad', idUnidad)
      console.log(sql)
      const [result] = await connection.execute(sql, values)
      const [unidad] = await connection.execute('SELECT * FROM unidad WHERE idUnidad = ?', [idUnidad])
      return { error: false, errorCode: null, affectedRows: result.affectedRows, editedRecord: unidad[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, editedRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async eliminarUnidad (idUnidad) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'DELETE FROM unidad WHERE idUnidad = ?'
      const values = [idUnidad]
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows, deletedId: idUnidad }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, deletedId: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async unidadesPorCurso (idCurso) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'SELECT * FROM unidad WHERE idCurso = ?'
      const sql2 = `
      SELECT t.*
      FROM unidad u INNER JOIN tema t
      ON u.idUnidad = t.idUnidad
      WHERE u.idCurso = ?`

      const values = [idCurso]
      const [unidades] = await connection.execute(sql, values)
      const [temas] = await connection.execute(sql2, values)

      return { error: false, errorCode: null, unidades, temas }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, unidades: [], temas: [] }
    } finally {
      if (connection) connection.release()
    }
  }
}
