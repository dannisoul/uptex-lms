import { getConnection } from '@/db/connection'

export class Entrega {
  static async entregasPorAsignacion (idActividad, page = 1, limit = 5) {
    let connection = null
    try {
      connection = await getConnection()
      const offset = (page - 1) * limit
      const sql = `
            SELECT e.idEntrega, e.idActividad, concat(a.nombre," ",a.paterno," ",a.materno) as alumno, a.correo, e.estado, e.fecha, e.calificacion, json_arrayagg(
            json_object("idEvidencia", ev.idEvidencia, "nombre", ev.nombre, "ruta", ev.ruta, "mimetype", ev.mimetype)
            ) as evidencias
            FROM entrega e 
            inner join usuario a on e.idAlumno = a.idUsuario
            left join evidencia ev on e.idEntrega = ev.idEntrega
            group by e.idEntrega
            limit ${limit} offset ${offset}
          `
      const [counter] = await connection.execute('SELECT COUNT(*) as total FROM entrega WHERE idActividad = ?', [idActividad])
      const [entregas] = await connection.execute(sql, [idActividad])
      return { error: false, errorCode: null, data: entregas, totalPages: Math.ceil(counter[0].total / limit) }
    } catch (error) {
      console.log(error)
      return { error: true, errorCode: error.code, solicitudes: null }
    } finally {
      if (connection) connection.release()
    }
  }
}
