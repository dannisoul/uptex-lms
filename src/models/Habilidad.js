import { getConnection } from '@/db/connection'

export class Habilidad {
  constructor (idHabilidad, nombre) {
    this.idHabilidad = idHabilidad
    this.nombre = nombre
  }

  static async obtenerHabilidades () {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `
      SELECT idHabilidad as value, nombre as name
      FROM habilidad`
      const [habilidades] = await connection.execute(sql, [])
      return { error: false, errorCode: null, habilidades }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, habilidades: [] }
    } finally {
      if (connection) connection.release()
    }
  }

  static async obtenerHabilidadesPorUsuario (idUsuario) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `
      SELECT h.* FROM habilidad h
      INNER JOIN usuario_habilidad uh
      ON h.idHabilidad = uh.idHabilidad
      WHERE uh.IdUsuario = ?`
      const [misHabilidades] = await connection.execute(sql, [idUsuario])
      return { error: false, errorCode: null, misHabilidades }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, misHabilidades: [] }
    } finally {
      if (connection) connection.release()
    }
  }

  static async agregarHabilidadDocente (idUsuario, idHabilidad) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `
      INSERT INTO usuario_habilidad (idUsuario, idHabilidad)
      VALUES(?, ?)`
      const [result] = await connection.execute(sql, [idUsuario, idHabilidad])
      return { error: false, errorCode: null, insertId: result.insertId }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, insertId: -1 }
    } finally {
      if (connection) connection.release()
    }
  }

  static async borrarHabilidadDocente (idUsuario, idHabilidad) {
    let connection = null
    try {
      connection = await getConnection()
      const sql = `
      DELETE FROM usuario_habilidad WHERE idUsuario = ? AND idHabilidad = ?`
      const [result] = await connection.execute(sql, [idUsuario, idHabilidad])
      return { error: false, errorCode: null, affectedRows: result.affectedRows }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, affectedRows: 0 }
    } finally {
      if (connection) connection.release()
    }
  }
}
