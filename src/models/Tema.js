import { getConnection } from '@/db/connection'
import { dynamicQuery } from '@/helpers/models/dynamicQuery'

export class Tema {
  static async crearTema (np, nombre, descripcion, idUnidad) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `INSERT INTO tema (np, nombre, descripcion, idUnidad) 
                    VALUES (?, ?, ?, ?)`
      const values = [np, nombre, descripcion, idUnidad]
      const [result] = await connection.execute(sql, values)
      const [tema] = await connection.execute('SELECT * FROM tema WHERE idTema = ?', [result.insertId])
      return { error: false, errorCode: null, insertId: result.insertId, newRecord: tema[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, newRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async actualizarTema (idTema, ...fields) {
    let connection = null
    try {
      connection = await getConnection()
      const { sql, values } = dynamicQuery(fields, 'tema', 'idTema', idTema)
      console.log(sql)
      const [result] = await connection.execute(sql, values)
      const [tema] = await connection.execute('SELECT * FROM tema WHERE idTema = ?', [idTema])
      return { error: false, errorCode: null, affectedRows: result.affectedRows, editedRecord: tema[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, editedRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async eliminarTema (idTema) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'DELETE FROM tema WHERE idTema = ?'
      const values = [idTema]
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows, deletedId: idTema }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, deletedId: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async temaPorId (idTema, idUsuario) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `
      SELECT t.*, u.np as unidad, c.idCurso as idCurso
      FROM tema t 
      INNER JOIN unidad u ON t.idUnidad = u.idUnidad
      INNER JOIN curso c ON u.idCurso = c.idCurso
      INNER JOIN usuario us ON c.idUsuario = us.idUsuario
      WHERE t.idTema = ? 
      AND us.idUsuario = ?`
      const values = [idTema, idUsuario]
      const [tema] = await connection.execute(sql, values)
      return { error: false, errorCode: null, tema: tema[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, rows: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async temaPorIdParaAlumno (idTema, idUsuario) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `
      SELECT t.*
      FROM tema t 
      INNER JOIN unidad u ON t.idUnidad = u.idUnidad
      INNER JOIN curso c ON u.idCurso = c.idCurso
      INNER JOIN grupo g ON c.idCurso = g.idCurso
      INNER JOIN inscripcion i ON g.idGrupo = i.idGrupo
      INNER JOIN usuario alumno ON alumno.idUsuario = i.idUsuario
      WHERE t.idTema = ?
      AND alumno.idUsuario = ?`
      const values = [idTema, idUsuario]
      const [tema] = await connection.execute(sql, values)
      return { error: false, errorCode: null, tema: tema[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, rows: null }
    } finally {
      if (connection) connection.release()
    }
  }
}
