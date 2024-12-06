import { getConnection } from '@/db/connection'
import { dynamicQuery } from '@/helpers/models/dynamicQuery'

export class Usuario {
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

  static async usuarioPorId (idUsuario) {
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
