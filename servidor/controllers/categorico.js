import pool from '../database/keys';

const datocategorico = {};

//listar cortes
datocategorico.listarCorte = async (req, res) => {
    const {tipo} = req.body;
    var sql = 'select cod_corte, gls_corte from corte where cod_corte < 100 order by cod_corte asc';
    try {
        const cortes = await (await pool.query(sql)).rows;
        if (cortes.length > 0) {
            res.status(200).json({
                registros: cortes
            });
        } else {
            res.status(200).json({
                message: 'No se encontraron registros',
                NotFound: true
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un problema',
            sql: sql,
            error
        });
    }
}

//listar tribunales
datocategorico.listarTribunal = async (req, res) => {
    const {tipo} = req.body;
    var sql = 'select cod_tribunal, gls_tribunal from tribunal where jurisdiccion = $1 and cod_tribunal < 10000 order by cod_tribunal asc';
    try {
        const tribunales = await (await pool.query(sql, [tipo])).rows;
        if (tribunales.length > 0) {
            res.status(200).json({
                registros: tribunales
            });
        } else {
            res.status(200).json({
                message: 'No se encontraron registros',
                NotFound: true
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un problema',
            sql: sql,
            error
        });
    }
}

module.exports = datocategorico;