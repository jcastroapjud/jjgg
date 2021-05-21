import pool from '../database/keys';

const usuariosis = {};

//Verificar login
usuariosis.login = async (req, res) => {
    const {usuario, password} = req.body;

    let sql = 'select usuario.tribunal, tribunal.gls_tribunal, tribunal.cod_corte, tribunal.jurisdiccion, corte.gls_corte, usuario.tipo ';
    sql += 'from tribunal, usuario, corte '; 
    sql += 'where usuario.nombre = $1 and usuario.password = $2 and usuario.tribunal = tribunal.cod_tribunal and tribunal.cod_corte = corte.cod_corte';
    try {
        const credencial = await (await pool.query(sql, [usuario, password])).rows;
        if(credencial.length > 0){
            res.status(200).json({
                credencial: credencial,
                respuesta: true
            });
        } else {
            res.status(200).json({
                credencial : [0],
                respuesta: false
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un problema al conectar la base de datos',
            respuesta: false,
            error
        });
    }
}

module.exports = usuariosis;