import pool from '../database/keys';

const causasinventario = {};

causasinventario.signUp = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        pool.query('insert into prueba(texto, numero) values ($1, $2)', [name, email]);
        res.status(200).json({
            message: 'Registro exitoso',
            gato: {name, email}
        })
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un problema',
            error
        })
    }
};

causasinventario.signIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const student = await (await pool.query('select * from prueba where texto=$1', [email])).rows;
        if (student.length>0) {
            res.status(200).json({
                id: student[0].id,
                name: student[0].texto,
                numero: student[0].numero
            });   
        } else {
            res.status(200).json({
                message: "No existe el registro",
                NotFound: true
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un problema',
            error
        });
    }
}

//Listar inventario pivoteado para cortes y total
causasinventario.listarTotalPivoteado = async (req, res) => {
    const {tipo} = req.body;
    let sql = 'select fr.cod_corte, fr."2015" as a_2015, fr."2016" as a_2016, ';
    sql += 'fr."2017" as a_2017, fr."2018" as a_2018, fr."2019" as a_2019, fr."2020" as a_2020, ';  
    sql += 'corte.gls_corte from crosstab( ';
    sql += '$$ select cod_corte, año, sum(cantidad_inventario) as cant_inventario ';
    sql += 'from inventario where jurisdiccion = \''+tipo+'\' group by cod_corte, año ';
    sql += 'UNION ALL ';
    sql += 'select 100 as cod_corte, año, sum(cantidad_inventario) as cant_inventario ';
    sql += 'from inventario where jurisdiccion = \''+tipo+'\' group by año order by cod_corte, año $$';
    sql += ') as fr(cod_corte int, "2015" bigint, "2016" bigint, "2017" bigint, ';
    sql += '"2018" bigint, "2019" bigint, "2020" bigint), corte where fr.cod_corte = corte.cod_corte ';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            res.status(200).json({
                registros: causas
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
            error
        });
    }
}

//Listar inventario pivoteado por corte
causasinventario.listarTotalCortePivoteado = async (req, res) => {
    const {corte, tipo} = req.body;
    let sql = 'select fr.cod_tribunal as cod_tribunal, fr."2015" as a_2015, ';
    sql += 'fr."2016" as a_2016, fr."2017" as a_2017, fr."2018" as a_2018, fr."2019" as a_2019, fr."2020" as a_2020, ';  
    sql += 'tribunal.gls_tribunal from crosstab( ';
    sql += '$$ select cod_tribunal, año, sum(cantidad_inventario) as cant_inventario ';
    sql += 'from inventario where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' group by cod_tribunal, año ';
    sql += 'UNION ALL ';
    sql += 'select 10000 as cod_tribunal, año, sum(cantidad_inventario) as cant_inventario ';
    sql += 'from inventario where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' group by año order by cod_tribunal, año $$';
    sql += ') as fr(cod_tribunal int, "2015" bigint, "2016" bigint, "2017" bigint, ';
    sql += '"2018" bigint, "2019" bigint, "2020" bigint), tribunal where fr.cod_tribunal = tribunal.cod_tribunal ';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            res.status(200).json({
                registros: causas
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
            error
        });
    }
}

//Listar inventario pivoteado por tribunal
causasinventario.listarTotalTribunalPivoteado = async (req, res) => {
    const {tribunal, tipo} = req.body;
    let sql = 'select fr.mes as mes, coalesce(fr."2015",0) as a_2015, ';
    sql += 'coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020 ';  
    sql += 'from crosstab( ';
    sql += '$$ select mes, año, sum(cantidad_inventario) as cant_inventario ';
    sql += 'from inventario where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' group by mes, año ';
    sql += 'UNION ALL ';
    sql += 'select 13 as mes, año, sum(cantidad_inventario) as cant_inventario ';
    sql += 'from inventario where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' group by año order by mes, año $$';
    sql += ') as fr(mes int, "2015" bigint, "2016" bigint, "2017" bigint, ';
    sql += '"2018" bigint, "2019" bigint, "2020" bigint)';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            res.status(200).json({
                registros: causas
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
            error
        });
    }
}

//Listar causas e inventario por año para cortes y total
causasinventario.listarTotal = async (req, res) => {
    const {tipo} = req.body;
    var sql = 'select gls_corte, cod_corte, año, sum(cantidad_ingreso) as ingreso, sum(cantidad_ingreso) ';
    sql += 'from inventario where jurisdiccion = $1 group by gls_corte, cod_corte, año UNION ALL ';
    sql += 'select \'Todas\' as gls_corte, 100 as cod_corte, año, sum(cantidad_ingreso) as ingreso, sum(cantidad_ingreso) ';
    sql += 'from inventario where jurisdiccion = $1 group by año order by cod_corte, año'; 
    try {
        const causas = await (await pool.query(sql, [tipo])).rows;
        if (causas.length > 0) {
            res.status(200).json({
                registros: causas
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
            error
        });
    }
}

//Listar causas e inventario por mes para cortes y total
causasinventario.listarTotalMes = async (req, res) => {
    const {tipo} = req.body;
    var sql = 'select cod_corte, año, mes, sum(cantidad_ingreso) as ingreso, sum(cantidad_ingreso) ';
    sql += 'from inventario group by cod_corte, año, mes UNION ALL ';
    sql += 'select 100 as cod_corte, año, mes, sum(cantidad_ingreso) as ingreso, sum(cantidad_ingreso) ';
    sql += 'from inventario group by año, mes order by cod_corte, mes, año'; 
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            res.status(200).json({
                registros: causas
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
            error
        });
    }
}

//Listar causas e inventario por año para corte específica
causasinventario.listarCorteTotal = async (req, res) => {
    const {corte, tipo} = req.body;
    var sql = 'select cod_tribunal, año, sum(cantidad_ingreso) as ingreso, sum(cantidad_inventario) as inventario ';
    sql += 'from inventario where cod_corte = $1 and jurisdiccion = $2 group by cod_tribunal, año UNION ALL ';
    sql += 'select 10000 as cod_tribunal, año, sum(cantidad_ingreso) as ingreso, ';
    sql += 'sum(cantidad_inventario) as inventario from inventario ';
    sql += 'where cod_corte = $1 and jurisdiccion = $2 group by cod_tribunal, año order by año asc, inventario desc';
    try {
        const causas = await (await pool.query(sql, [corte, tipo])).rows;
        if (causas.length > 0) {
            res.status(200).json({
                registros: causas
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
            error
        });
    }
}

//Listar causas e inventario por año y mes para corte específica
causasinventario.listarCorteTotalMes = async (req, res) => {
    const {corte, tipo} = req.body;
    var sql = 'select cod_tribunal, año, mes, cantidad_ingreso as ingreso, cantidad_inventario as inventario ';
    sql += 'from inventario where cod_corte = $1 and jurisdiccion = $2 UNION ALL ';
    sql += 'select 10000 as cod_tribunal, año, mes, sum(cantidad_ingreso) as ingreso, ';
    sql += 'sum(cantidad_inventario) as inventario from inventario ';
    sql += 'where cod_corte = $1 and jurisdiccion = $2 group by cod_tribunal, año, mes order by año, mes asc, inventario desc';
    try {
        const causas = await (await pool.query(sql, [corte, tipo])).rows;
        if (causas.length > 0) {
            res.status(200).json({
                registros: causas
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
            error
        });
    }
}

//Listar causas e inventario por año y mes para tribunal específico
causasinventario.listarTribunalTotal = async (req, res) => {
    const {tribunal, tipo} = req.body;
    var sql = 'select cod_tribunal, año, sum(cantidad_ingreso) as ingreso, sum(cantidad_inventario) as inventario ';
    sql += 'from inventario where cod_tribunal = $1 and jurisdiccion = $2 group by cod_tribunal, año order by año asc';
    try {
        const causas = await (await pool.query(sql, [tribunal, tipo])).rows;
        if (causas.length > 0) {
            res.status(200).json({
                registros: causas
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
            error
        });
    }
}

module.exports = causasinventario;