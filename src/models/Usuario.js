import { getConnection } from '@/db/connection'
import { dynamicQuery } from '@/helpers/models/dynamicQuery'

export class Usuario {
  constructor (idUsuario, paterno, materno, nombre, fechaNacimiento, genero, correo, contrasena, idRol, telefono, avatar, descripcion) {
    this.idUsuidUsuario = idUsuario
    this.paterno = paterno
    this.materno = materno
    this.nombre = nombre
    this.fechaNacimiento = fechaNacimiento
    this.genero = genero
    this.correo = correo
    this.contrasena = contrasena
    this.idRol = idRol
    this.telefono = telefono || null
    this.avatar = avatar || null
    this.descripcion = descripcion || null
  }

  static async obtenerUsuario (idUsuario) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `SELECT u.*, e.nombre as especialidad 
      FROM usuario u LEFT JOIN especialidad e ON u.idEspecialidad = e.idEspecialidad
      WHERE idUsuario = ?`
      const values = [idUsuario]
      const [usuario] = await connection.execute(sql, values)
      return { error: false, errorCode: null, usuario: usuario[0] }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, usuario: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async crearUsuario (paterno, materno, nombre, fechaNacimiento, genero, correo, contrasena, idRol) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `INSERT INTO usuario (paterno, materno, nombre, fechaNacimiento, genero, correo, contrasena, idRol) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      const values = [paterno, materno, nombre, fechaNacimiento, genero, correo, contrasena, idRol]
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, insertId: result.insertId }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async login (correo) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'SELECT * FROM usuario WHERE correo = ?'
      const values = [correo]
      const [result] = await connection.execute(sql, values)
      if (result.length === 1) return { error: false, errorCode: null, result: result[0] }
      return { error: true, errorCode: 'NO_USER', result: null }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, result: null }
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

  static async mandarSolicitud (idAlumno, codigo) {
    console.log('datos', idAlumno, codigo)
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'SELECT * FROM grupo WHERE codigo = ?'
      const values = [codigo]
      const [result] = await connection.execute(sql, values)
      if (result.length === 0) return { error: true, errorCode: 'NOT_FOUND', grupo: null }
      const [isMember] = await connection.execute('SELECT * FROM inscripcion WHERE idGrupo = ? AND idUsuario = ?', [result[0].idGrupo, idAlumno])
      if (isMember.length > 0) return { error: true, errorCode: 'ALREADY_MEMBER', grupo: null }
      await connection.execute('INSERT INTO solicitud (idGrupo, idUsuario) VALUES (?, ?)', [result[0].idGrupo, idAlumno])
      return { error: false, errorCode: null }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code }
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

  static async solicitudPorGrupo (idGrupo, page = 1, limit = 5) {
    let connection = null
    console.log(idGrupo)
    try {
      connection = await getConnection()
      const offset = (page - 1) * limit
      const sql = `
                  select
                    usuario.*
                  from 
                    usuario, grupo, solicitud
                  where
                    solicitud.idGrupo = grupo.idGrupo AND
                    solicitud.idUsuario = usuario.idUsuario AND
                    solicitud.idGrupo = ?
                    order by usuario.paterno
                    limit ${limit} offset ${offset}
      `
      const values = [idGrupo]
      const [counter] = await connection.execute('SELECT COUNT(*) as total FROM solicitud WHERE idGrupo = ?', [idGrupo])
      const [solicitudes] = await connection.execute(sql, values)
      return { error: false, errorCode: null, solicitudes, totalPages: Math.ceil(counter[0].total / limit) }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, solicitudes: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async eliminarSolicitud (idUsuario, idGrupo) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = 'DELETE FROM solicitud WHERE idGrupo = ? AND idUsuario = ?'
      const values = [idGrupo, idUsuario]
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows, payload: idUsuario }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0, payload: 0 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async aceptarSolicitud (idUsuario, idGrupo) {
    let connection = null
    try {
      connection = await getConnection()
      await connection.beginTransaction()
      const sql = 'DELETE FROM solicitud WHERE idGrupo = ? AND idUsuario = ?'
      const sql2 = `INSERT INTO inscripcion (idGrupo, idUsuario)
                    VALUES (?, ?)`
      await connection.execute(sql, [idGrupo, idUsuario])
      const [resultAgree] = await connection.execute(sql2, [idGrupo, idUsuario])
      await connection.commit()
      return { error: false, errorCode: null, insertId: resultAgree.insertId, payload: idUsuario }
    } catch (error) {
      if (connection) await connection.rollback()
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, payload: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async actualizarDocente (idUsuario, ...fields) {
    let connection = null
    try {
      connection = await getConnection()
      const { sql, values } = dynamicQuery(fields, 'usuario', 'idUsuario', idUsuario)
      console.log(sql)
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows }
    } catch (error) {
      if (connection) await connection.rollback()
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, payload: null }
    } finally {
      if (connection) connection.release()
    }
  }

  static async actualizarAlumno (idUsuario, ...fields) {
    let connection = null
    try {
      connection = await getConnection()
      const { sql, values } = dynamicQuery(fields, 'usuario', 'idUsuario', idUsuario)
      console.log(sql)
      const [result] = await connection.execute(sql, values)
      return { error: false, errorCode: null, affectedRows: result.affectedRows }
    } catch (error) {
      if (connection) await connection.rollback()
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1, payload: null }
    } finally {
      if (connection) connection.release()
    }
  }
}
