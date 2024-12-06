import { getConnection } from '@/db/connection'

export class Solicitud {
  static async crearSolicitud (idAlumno, codigo) {
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

  static async solicitudesPorGrupoConPaginacion (idGrupo, page = 1, limit = 5) {
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
}
