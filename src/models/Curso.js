import { getConnection } from '@/db/connection'
import { dynamicQuery } from '@/helpers/models/dynamicQuery'

export class Curso {
  constructor (idCurso, nombre, descripcion, idCategoria, idNivel, cursoInterno, imagen, idUsuario) {
    this.idCurso = idCurso
    this.nombre = nombre
    this.descripcion = descripcion
    this.idCategoria = idCategoria
    this.idNivel = idNivel
    this.cursoInterno = cursoInterno
    this.imagen = imagen || null
    this.idUsuario = idUsuario
  }

  static async crearCurso (nombre, descripcion, idCategoria, idNivel, cursoInterno, idUsuario) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `INSERT INTO curso (nombre, descripcion, idCategoria, idNivel, cursoInterno, idUsuario) 
                    VALUES (?, ?, ?, ?, ?, ?)`
      const values = [nombre, descripcion, idCategoria, idNivel, cursoInterno, idUsuario]
      const [result] = await connection.execute(sql, values)
      const [curso] = await connection.execute('SELECT c.*, u.avatar FROM curso c INNER JOIN usuario u ON u.idUsuario = c.idUsuario WHERE idCurso = ?', [result.insertId])
      return { error: false, errorCode: null, insertId: result.insertId, newRecord: curso[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, newRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async registrarImagen (idCurso, imagen) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'UPDATE curso SET imagen = ? WHERE idCurso = ?'
      const values = [imagen, idCurso]
      const [result] = await connection.execute(sql, values)
      console.log(result)
      const [curso] = await connection.execute('SELECT c.*, u.avatar FROM curso c INNER JOIN usuario u ON u.idUsuario = c.idUsuario WHERE idCurso = ?', [idCurso])
      return { error: false, errorCode: null, insertId: idCurso, newRecord: curso[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, newRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async actualizarCurso (idCurso, ...fields) {
    let connection = null
    try {
      connection = await getConnection()
      const { sql, values } = dynamicQuery(fields, 'curso', 'idCurso', idCurso)
      const [result] = await connection.execute(sql, values)
      const [curso] = await connection.execute('SELECT * FROM curso WHERE idCurso = ?', [idCurso])
      return { error: false, errorCode: null, affectedRows: result.affectedRows, editedRecord: curso[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, editedRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  /* Elimina el curso y todas sus entidades relacionadas */
  static async eliminarCurso (idCurso) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'DELETE FROM curso WHERE idCurso = ?'
      const values = [idCurso]
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows, deletedId: idCurso }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, deletedId: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  /* Desactiva un curso cambiando su status activo a 0 */
  static async desactivarCurso (idCurso) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'UPDATE curso SET activo = 0 WHERE idCurso = ?'
      const values = [idCurso]
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  /* Activa un curso cambiando su status activo a 1 */
  static async activarCurso (idCurso) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'UPDATE curso SET activo = 1 WHERE idCurso = ?'
      const values = [idCurso]
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async cursosPorDocente (idUsuario) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `
      SELECT c.*, u.avatar 
      FROM curso c 
      INNER JOIN usuario u ON c.idUsuario = u.idUsuario
      WHERE u.idUsuario = ?`
      const values = [idUsuario]
      const [cursos] = await connection.execute(sql, values)
      return { error: false, errorCode: null, cursos }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, cursos: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async cursosPorDocenteConPaginacion (idUsuario, page = 1, query, items = 11) {
    let connection = null
    try {
      connection = await getConnection()
      const queryCondition = (query !== '') ? 'AND c.nombre LIKE ?' : ''
      const queryValues = (query !== '') ? [idUsuario, `${query}%`] : [idUsuario]
      const countSQL = 'SELECT count(*) as totalResults FROM curso c INNER JOIN usuario u ON c.idUsuario = u.idUsuario WHERE u.idUsuario = ? ' + queryCondition
      const offset = (page - 1) * items
      const sql = 'SELECT c.*, u.avatar FROM curso c INNER JOIN usuario u ON c.idUsuario = u.idUsuario WHERE u.idUsuario = ? ' + queryCondition + ` order by c.activo desc, c.timestamp desc limit ${items} offset ${offset}`
      const [count] = await connection.execute(countSQL, queryValues)
      const [cursos] = await connection.execute(sql, queryValues)
      console.log(count[0])
      return { error: false, errorCode: null, data: cursos, totalResults: count[0].totalResults, totalPages: Math.ceil(count[0].totalResults / items) }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, data: [], totalResults: 0, totalPages: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async cursoPorId (idCurso, idDocente) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'SELECT * FROM curso WHERE idCurso = ? AND idUsuario = ?'
      const values = [idCurso, idDocente]
      const [curso] = await connection.execute(sql, values)
      return { error: false, errorCode: null, curso: curso[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, curso: null }
    } finally {
      if (connection) connection.release()
    }
  }
}
