import { getConnection } from '@/db/connection'
import { dynamicFilter } from '@/helpers/models/dynamicFilters'
import { dynamicQuery } from '@/helpers/models/dynamicQuery'

export class Grupo {
  static async crearGrupo (nombre, codigo, inicio, cierre, idCurso) {
    let connection = null
    try {
      connection = await getConnection()
      const [exists] = await connection.execute('SELECT * FROM grupo WHERE idCurso = ? AND nombre = ?', [idCurso, nombre])
      if (exists.length > 0 && new Date(exists[0].cierre) > new Date()) return { error: true, errorCode: 'ER_DUP_ENTRY', insertId: -1, newRecord: null }
      const sql = `INSERT INTO grupo (nombre, codigo, inicio, cierre, idCurso) 
                    VALUES (?, ?, ?, ?, ?)`
      const sql2 = `SELECT grupo.*, curso.nombre as nombrecurso, curso.descripcion, curso.imagen, usuario.idUsuario, usuario.avatar
                    FROM grupo, curso, usuario    
                    WHERE grupo.idCurso = curso.idCurso AND curso.idUsuario = usuario.idUsuario AND grupo.idGrupo = ?`
      const values = [nombre, codigo, inicio, cierre, idCurso]
      const [result] = await connection.execute(sql, values)
      const [grupo] = await connection.execute(sql2, [result.insertId])
      return { error: false, errorCode: null, insertId: result.insertId, newRecord: grupo[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, newRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async actualizarGrupo (idGrupo, ...fields) {
    let connection = null
    try {
      connection = await getConnection()
      const { sql, values } = dynamicQuery(fields, 'grupo', 'idGrupo', idGrupo)
      console.log(sql)
      const [result] = await connection.execute(sql, values)
      const [grupo] = await connection.execute(`
      select 
        grupo.*, curso.nombre as nombrecurso, curso.descripcion, curso.imagen, usuario.idUsuario, usuario.avatar
      from 
        grupo, curso, usuario
      where 
        grupo.idCurso = curso.idCurso AND
        curso.idUsuario = usuario.idUsuario AND
        grupo.idGrupo = ?`, [idGrupo])
      return { error: false, errorCode: null, affectedRows: result.affectedRows, editedRecord: grupo[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, editedRecord: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async eliminarGrupo (idGrupo) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'DELETE FROM grupo WHERE idGrupo = ?'
      const values = [idGrupo]
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows, deletedId: idGrupo }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, deletedId: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async gruposPorAlumnoConPaginacion (idUsuario, page = 1, query, items = 11) {
    let connection = null
    try {
      connection = await getConnection()
      const queryCondition = (query !== '') ? 'AND curso.nombre LIKE ?' : ''
      const queryValues = (query !== '') ? [idUsuario, `${query}%`] : [idUsuario]
      const countSQL = `SELECT count(*) as totalResults
      FROM curso c INNER JOIN grupo g ON c.idCurso = g.idCurso
      INNER JOIN usuario docente ON c.idUsuario = docente.idUsuario
      INNER JOIN inscripcion i ON g.idGrupo = i.idGrupo
      INNER JOIN usuario alumno ON i.idUsuario = alumno.idUsuario
      WHERE alumno.idUsuario = ? ` + queryCondition
      const offset = (page - 1) * items
      const sql = `SELECT c.*, g.idGrupo, g.nombre as grupo, g.codigo, g.inicio, g.cierre, docente.idUsuario as idDocente, docente.avatar
      FROM curso c INNER JOIN grupo g ON c.idCurso = g.idCurso
      INNER JOIN usuario docente ON c.idUsuario = docente.idUsuario
      INNER JOIN inscripcion i ON g.idGrupo = i.idGrupo
      INNER JOIN usuario alumno ON i.idUsuario = alumno.idUsuario
      WHERE alumno.idUsuario = ? ` + queryCondition + ` limit ${items} offset ${offset} `
      const [count] = await connection.execute(countSQL, queryValues)
      const [grupos] = await connection.execute(sql, queryValues)
      return { error: false, errorCode: null, data: grupos, totalResults: count[0].totalResults, totalPages: Math.ceil(count[0].totalResults / items) }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, data: [], totalResults: 0, totalPages: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async grupoPorIdParaAlumno (idGrupo, idAlumno) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `SELECT c.*, g.idGrupo, g.codigo, CONCAT(d.nombre, ' ', d.paterno) as docente
      FROM curso c 
      INNER JOIN grupo g ON c.idCurso = g.idCurso
      INNER JOIN usuario d ON c.idUsuario = d.idUsuario
      WHERE g.idGrupo = ?`
      const sql2 = 'SELECT * FROM unidad WHERE idCurso = ?'
      const sql3 = `SELECT t.*  
      FROM unidad u INNER JOIN tema t
      ON u.idUnidad = t.idUnidad
      WHERE u.idCurso = ?`
      const sql4 = 'SELECT * FROM inscripcion WHERE idGrupo = ? AND idUsuario = ?'
      const values = [idGrupo]
      const [grupo] = await connection.execute(sql, values)
      const [unidades] = await connection.execute(sql2, [grupo[0].idCurso])
      const [temas] = await connection.execute(sql3, [grupo[0].idCurso])
      const [inscripcion] = await connection.execute(sql4, [idGrupo, idAlumno])
      return { error: false, errorCode: null, curso: grupo[0], unidades, temas, inscrito: inscripcion.length > 0 }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, curso: null, unidades: [], temas: [], inscrito: false }
    } finally {
      if (connection) connection.release()
    }
  }

  static async gruposRelacionados (idCategoria, idCurso) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `SELECT c.*, g.idGrupo, g.nombre as grupo, g.inicio, g.cierre, d.avatar
      FROM curso c 
      INNER JOIN grupo g ON c.idCurso = g.idCurso
      INNER JOIN usuario d ON c.idUsuario = d.idUsuario
      WHERE c.idCategoria = ? AND c.idCurso != ? ORDER BY g.inicio DESC LIMIT 4`
      const values = [idCategoria, idCurso]
      const [grupo] = await connection.execute(sql, values)
      console.log(grupo)
      return { error: false, errorCode: null, grupos: grupo }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, grupos: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async grupoPorId (idGrupo, idDocente) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `
      select
        grupo.*,
        curso.nombre as nombrecurso
      from
        curso, grupo
      where
        grupo.idCurso = curso.idCurso 
        AND grupo.idGrupo = ?
        AND curso.idUsuario = ?
      `
      const value = [idGrupo, idDocente]
      const [grupo] = await connection.execute(sql, value)
      return { error: false, errorCode: null, grupo: grupo[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, grupo: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async gruposPorDocenteConPaginacion (idUsuario, page = 1, query, items = 11) {
    let connection = null
    try {
      connection = await getConnection()
      const queryCondition = (query !== '') ? 'AND curso.nombre LIKE ?' : ''
      const queryValues = (query !== '') ? [idUsuario, `${query}%`] : [idUsuario]
      const countSQL = `SELECT count(*) as totalResults
      FROM grupo, curso, usuario WHERE grupo.idCurso = curso.idCurso AND curso.idUsuario = usuario.idUsuario AND usuario.idUsuario = ? ` + queryCondition
      const offset = (page - 1) * items
      const sql = `SELECT grupo.*, curso.nombre as nombrecurso, curso.descripcion, curso.imagen, usuario.idUsuario, usuario.avatar
      FROM grupo, curso, usuario WHERE grupo.idCurso = curso.idCurso AND curso.idUsuario = usuario.idUsuario AND usuario.idUsuario = ? ` + queryCondition + ` order by grupo.cierre desc limit ${items} offset ${offset} `
      const [count] = await connection.execute(countSQL, queryValues)
      const [grupos] = await connection.execute(sql, queryValues)
      return { error: false, errorCode: null, data: grupos, totalResults: count[0].totalResults, totalPages: Math.ceil(count[0].totalResults / items) }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, data: [], totalResults: 0, totalPages: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async gruposPorFiltro (page = 1, items = 12, offset = 0, query = '', ...filters) {
    let connection = null
    try {
      connection = await getConnection()
      const filtros = dynamicFilter(filters, query)
      const sql = `SELECT count(*) as totalResults 
      FROM curso c INNER JOIN grupo g ON c.idCurso = g.idCurso 
      INNER JOIN usuario docente ON c.idUsuario = docente.idUsuario ` + filtros.condition
      const sql2 = `SELECT c.*, g.idGrupo, g.nombre as grupo, g.codigo, g.inicio, g.cierre, docente.idUsuario as idDocente, docente.avatar 
      FROM curso c INNER JOIN grupo g ON c.idCurso = g.idCurso 
      INNER JOIN usuario docente ON c.idUsuario = docente.idUsuario ` + filtros.condition + ` limit ${items} offset ${offset}`
      const values = filtros.values
      const [result] = await connection.execute(sql, values)
      const [cursos] = await connection.execute(sql2, values)
      return { error: false, errorCode: null, cursos, totalPages: Math.ceil(result[0].totalResults / items), currentPage: page, itemsPerPage: items, offset: items * page }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, cursos: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async obtenerAlumnosPorGrupo (idGrupo, page = 1, limit = 5) {
    let connection = null
    try {
      connection = await getConnection()
      const offset = (page - 1) * limit
      const sql = `
      select 
      usuario.*
      from
      usuario, grupo, inscripcion
      where 
      inscripcion.idUsuario = usuario.idUsuario AND
      inscripcion.idGrupo = grupo.idGrupo AND
      grupo.idGrupo = ?
      order by usuario.paterno
      limit ${limit} offset ${offset}`
      const values = [idGrupo]
      const [counter] = await connection.execute('SELECT COUNT(*) as total FROM inscripcion WHERE idGrupo = ?', [idGrupo])
      const [alumnos] = await connection.execute(sql, values)
      return { error: false, errorCode: null, data: alumnos, totalPages: Math.ceil(counter[0].total / limit) }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, alumnos: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async eliminarAlumno (idUsuario, idGrupo) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'DELETE FROM inscripcion WHERE idUsuario = ? AND idGrupo = ?'
      const values = [idUsuario, idGrupo]
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows, deletedId: idUsuario }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, deletedId: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async inscribirAlumno (idAlumno, codigo) {
    console.log('datos', idAlumno, codigo)
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'SELECT * FROM grupo WHERE codigo = ?'
      const values = [codigo]
      const [result] = await connection.execute(sql, values)
      console.log(result)
      if (result.length === 0) return { error: true, errorCode: 'NOT_FOUND', grupo: null }
      await connection.execute('INSERT INTO inscripcion (idGrupo, idUsuario) VALUES (?, ?)', [result[0].idGrupo, idAlumno])
      const [grupo] = await connection.execute(`
      SELECT c.*, g.idGrupo, g.nombre as grupo, g.codigo, g.inicio, g.cierre, docente.idUsuario, docente.avatar
      FROM curso c 
      INNER JOIN grupo g ON c.idCurso = g.idCurso
      INNER JOIN usuario docente ON c.idUsuario = docente.idUsuario
      WHERE g.idGrupo = ?`, [result[0].idGrupo])
      return { error: false, errorCode: null, newGrupo: grupo[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, result: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async inscribirAlumnoPorCorreo (correo, idGrupo) {
    let connection = null
    try {
      connection = await getConnection()
      await connection.beginTransaction()
      const sqlCorreo = 'select * from usuario where correo = ? AND idRol = 3'
      const sqlVerify = 'select * from solicitud where idGrupo = ? AND idUsuario = ?'
      const sqlInsert = 'INSERT INTO inscripcion (idGrupo, idUsuario) VALUES (?, ?)'
      const [alumno] = await connection.execute(sqlCorreo, [correo])
      if (alumno.length === 0) return { error: true, errorCode: 'NOT_FOUND', insertId: null, newAlumno: null }
      const [existe] = await connection.execute(sqlVerify, [idGrupo, alumno[0].idUsuario])
      if (existe.length !== 0) {
        const sqlDelete = 'DELETE FROM solicitud WHERE idGrupo = ? AND idUsuario = ?'
        await connection.execute(sqlDelete, [idGrupo, alumno[0].idUsuario])
      }
      const [result] = await connection.execute(sqlInsert, [idGrupo, alumno[0].idUsuario])
      await connection.commit()
      return { error: false, errorCode: null, insertId: result.insertId, newAlumno: alumno[0] }
    } catch (error) {
      if (connection) await connection.rollback()
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, newAlumno: null }
    } finally {
      if (connection) connection.release()
    }
  }
}
