import pool from '../database/keys';

const gestioninventario = {};

//Listar inventario pivoteado para cortes y total
gestioninventario.listarGestionTotalPivoteado = async (req, res) => {
    const {tipo} = req.body;
    
    let sql = 'select fr.cod_corte, fr."2015" as a_2015, fr."2016" as a_2016, ';
    sql += 'fr."2017" as a_2017, fr."2018" as a_2018, fr."2019" as a_2019, fr."2020" as a_2020, ';  
    sql += 'corte.gls_corte from crosstab( ';
    sql += '$$ select cod_corte, año, sum(causas) as cant_inventario ';
    sql += 'from gestion where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
    sql += 'group by cod_corte, año ';
    sql += 'UNION ALL ';
    sql += 'select 100 as cod_corte, año, sum(causas) as cant_inventario ';
    sql += 'from gestion where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
    sql += 'group by año order by cod_corte, año $$';
    sql += ') as fr(cod_corte int, "2015" bigint, "2016" bigint, "2017" bigint, ';
    sql += '"2018" bigint, "2019" bigint, "2020" bigint), corte where fr.cod_corte = corte.cod_corte ';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            let sqli = 'select corte.gls_corte, fr."2015" as a_2015, fr."2016" as a_2016, ';
            sqli += 'fr."2017" as a_2017, fr."2018" as a_2018, fr."2019" as a_2019, fr."2020" as a_2020 '; 
            sqli += 'from crosstab( ';
            sqli += ' $$ ';
            sqli += ' select cod_corte, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion ';
            sqli += 'where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
            sqli += 'group by cod_corte, año ';
            sqli += 'UNION ALL ';
            sqli += 'select 100 as cod_corte, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion ';
            sqli += 'where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
            sqli += 'group by año ';
            sqli += 'order by cod_corte, año ';
            sqli += ' $$ ';
            sqli += ') as fr(cod_corte int, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
            sqli += '"2019" bigint, "2020" bigint), corte where fr.cod_corte = corte.cod_corte ';
            try {
                const compromiso = await (await pool.query(sqli)).rows;
                if(compromiso.length > 0) {
                    let sqlii = 'select corte.gls_corte, fr."2015" as a_2015, fr."2016" as a_2016, ';
                    sqlii += 'fr."2017" as a_2017, fr."2018" as a_2018, fr."2019" as a_2019, fr."2020" as a_2020 '; 
                    sqlii += 'from crosstab( ';
                    sqlii += ' $$ ';
                    sqlii += ' select cod_corte, año, sum(cumplimiento) as cumplimiento ';
                    sqlii += 'from gestion ';
                    sqlii += 'where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
                    sqlii += 'group by cod_corte, año ';
                    sqlii += 'UNION ALL ';
                    sqlii += 'select 100 as cod_corte, año, sum(cumplimiento) as cumplimiento ';
                    sqlii += 'from gestion ';
                    sqlii += 'where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
                    sqlii += 'group by año ';
                    sqlii += 'order by cod_corte, año ';
                    sqlii += ' $$ ';
                    sqlii += ') as fr(cod_corte int, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
                    sqlii += '"2019" bigint, "2020" bigint), corte where fr.cod_corte = corte.cod_corte ';
                    try {
                        const cumplimiento = await (await pool.query(sqlii)).rows;
                        if(cumplimiento.length > 0){
                            let aux = [];
                            let cont = 0;
                            for (let index = 0; index < causas.length*3; index++) {
                                if(index%3==0){
                                    aux.push(causas[cont]);
                                } else if(index%3==1) {
                                    aux.push(compromiso[cont]);
                                } else {
                                    aux.push(cumplimiento[cont]);
                                    cont++;
                                }
                            }
                            res.status(200).json({
                                registros: aux
                            });
                        }
                    } catch (error) {
                        res.statis(500).json({
                            message: 'Ocurrió un problema',
                            error
                        });
                    }
                }
            } catch (error) {
                res.status(500).json({
                    message: 'Ocurrió un problema',
                    error
                });
            }
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

//Listar inventario pivoteado total por una corte
gestioninventario.listarGestionCortePivoteado = async (req, res) => {
    const {tipo, corte} = req.body;
    
    let sql = 'select fr.cod_tribunal, fr."2015" as a_2015, fr."2016" as a_2016, ';
    sql += 'fr."2017" as a_2017, fr."2018" as a_2018, fr."2019" as a_2019, fr."2020" as a_2020, coalesce(fr."2021", 0) as a_2021,';  
    sql += 'tribunal.gls_tribunal from crosstab( ';
    sql += '$$ select cod_tribunal, año, sum(causas) as cant_inventario ';
    sql += 'from gestion where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
    sql += 'group by cod_tribunal, año ';
    sql += 'UNION ALL ';
    sql += 'select 10000 as cod_tribunal, año, sum(causas) as cant_inventario ';
    sql += 'from gestion where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() '; 
    sql += 'group by año order by cod_tribunal, año $$';
    sql += ') as fr(cod_tribunal int, "2015" bigint, "2016" bigint, "2017" bigint, ';
    sql += '"2018" bigint, "2019" bigint, "2020" bigint, "2021" bigint), tribunal where fr.cod_tribunal = tribunal.cod_tribunal ';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            let sqli = 'select tribunal.gls_tribunal, fr."2015" as a_2015, fr."2016" as a_2016, ';
            sqli += 'fr."2017" as a_2017, fr."2018" as a_2018, fr."2019" as a_2019, fr."2020" as a_2020, coalesce(fr."2021", 0) as a_2021 '; 
            sqli += 'from crosstab( ';
            sqli += ' $$ ';
            sqli += ' select cod_tribunal, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion ';
            sqli += 'where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
            sqli += 'group by cod_tribunal, año ';
            sqli += 'UNION ALL ';
            sqli += 'select 10000 as cod_tribunal, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion ';
            sqli += 'where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
            sqli += 'group by cod_tribunal, año ';
            sqli += 'order by cod_tribunal, año ';
            sqli += ' $$ ';
            sqli += ') as fr(cod_tribunal int, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
            sqli += '"2019" bigint, "2020" bigint, "2021" bigint), tribunal where fr.cod_tribunal = tribunal.cod_tribunal ';
            try {
                const compromiso = await (await pool.query(sqli)).rows;
                if(compromiso.length > 0) {
                    let sqlii = 'select tribunal.gls_tribunal, fr."2015" as a_2015, fr."2016" as a_2016, ';
                    sqlii += 'fr."2017" as a_2017, fr."2018" as a_2018, fr."2019" as a_2019, fr."2020" as a_2020, coalesce(fr."2021", 0) as a_2021 '; 
                    sqlii += 'from crosstab( ';
                    sqlii += ' $$ ';
                    sqlii += ' select cod_tribunal, año, sum(cumplimiento) as cumplimiento ';
                    sqlii += 'from gestion ';
                    sqlii += 'where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
                    sqlii += 'group by cod_tribunal, año ';
                    sqlii += 'UNION ALL ';
                    sqlii += 'select 10000 as cod_tribunal, año, sum(cumplimiento) as cumplimiento ';
                    sqlii += 'from gestion ';
                    sqlii += 'where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
                    sqlii += 'group by cod_tribunal, año ';
                    sqlii += 'order by cod_tribunal, año ';
                    sqlii += ' $$ ';
                    sqlii += ') as fr(cod_tribunal int, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
                    sqlii += '"2019" bigint, "2020" bigint, "2021" bigint), tribunal where fr.cod_tribunal = tribunal.cod_tribunal ';
                    try {
                        const cumplimiento = await (await pool.query(sqlii)).rows;
                        if(cumplimiento.length > 0){
                            let aux = [];
                            let cont = 0;
                            for (let index = 0; index < causas.length*3; index++) {
                                if(index%3==0){
                                    aux.push(causas[cont]);
                                } else if(index%3==1) {
                                    aux.push(compromiso[cont]);
                                } else {
                                    aux.push(cumplimiento[cont]);
                                    cont++;
                                }
                            }
                            res.status(200).json({
                                registros: aux
                            });
                        }
                    } catch (error) {
                        res.statis(500).json({
                            message: 'Ocurrió un problema',
                            error
                        });
                    }
                }
            } catch (error) {
                res.status(500).json({
                    message: 'Ocurrió un problema',
                    error
                });
            }
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

//Listar inventario pivoteado total por un tribunal
gestioninventario.listarGestionTribunalPivoteado = async (req, res) => {
    const {tipo, tribunal} = req.body;
    
    let sql = 'select fr.mes as mes, coalesce(fr."2015",0) as a_2015, ';
    sql += 'coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020, coalesce(fr."2021",0) as a_2021 ';  
    sql += 'from crosstab( ';
    sql += '$$ select mes, año, sum(causas) as cant_inventario ';
    sql += 'from gestion where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() '; 
    sql += 'group by mes, año ';
    sql += 'UNION ALL ';
    sql += 'select 13 as mes, año, sum(causas) as cant_inventario ';
    sql += 'from gestion where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
    sql += 'group by año order by mes, año $$';
    sql += ') as fr(mes int, "2015" bigint, "2016" bigint, "2017" bigint, ';
    sql += '"2018" bigint, "2019" bigint, "2020" bigint, "2021" bigint)';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            let sqli = 'select fr.mes as mes, coalesce(fr."2015",0) as a_2015, ';
            sqli += 'coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020, coalesce(fr."2021",0) as a_2021 ';  
            sqli += 'from crosstab( ';
            sqli += '$$ select mes, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\'  and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
            sqli += 'group by mes, año ';
            sqli += 'UNION ALL ';
            sqli += 'select 13 as mes, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\'  and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
            sqli += 'group by año order by mes, año $$';
            sqli += ') as fr(mes int, "2015" bigint, "2016" bigint, "2017" bigint, ';
            sqli += '"2018" bigint, "2019" bigint, "2020" bigint, "2021" bigint)';
            try {
                const compromiso = await (await pool.query(sqli)).rows;
                if(compromiso.length > 0) {
                    let sqlii = 'select fr.mes as mes, coalesce(fr."2015",0) as a_2015, ';
                    sqlii += 'coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020, coalesce(fr."2021",0) as a_2021 ';  
                    sqlii += 'from crosstab( ';
                    sqlii += '$$ select mes, año, sum(cumplimiento) as cant_inventario ';
                    sqlii += 'from gestion where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\'  and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
                    sqlii += 'group by mes, año ';
                    sqlii += 'UNION ALL ';
                    sqlii += 'select 13 as mes, año, sum(cumplimiento) as cant_inventario ';
                    sqlii += 'from gestion where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\'  and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'1\' month) and fecha_compromiso < now() ';
                    sqlii += 'group by año order by mes, año $$';
                    sqlii += ') as fr(mes int, "2015" bigint, "2016" bigint, "2017" bigint, ';
                    sqlii += '"2018" bigint, "2019" bigint, "2020" bigint, "2021" bigint)';
                    try {
                        const cumplimiento = await (await pool.query(sqlii)).rows;
                        if(cumplimiento.length > 0){
                            let aux = [];
                            let cont = 0;
                            for (let index = 0; index < causas.length*3; index++) {
                                if(index%3==0){
                                    aux.push(causas[cont]);
                                } else if(index%3==1) {
                                    aux.push(compromiso[cont]);
                                } else {
                                    aux.push(cumplimiento[cont]);
                                    cont++;
                                }
                            }
                            res.status(200).json({
                                registros: aux
                            });
                        }
                    } catch (error) {
                        res.statis(500).json({
                            message: 'Ocurrió un problema',
                            error
                        });
                    }
                }
            } catch (error) {
                res.status(500).json({
                    message: 'Ocurrió un problema',
                    error
                });
            }
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

//Registrar gestión
gestioninventario.registrarGestion = async (req, res) => {
    const {tipo, tribunal, a_2015, a_2016, a_2017, a_2018, a_2019, a_2020, a_2021, fecha, a_descripcion} = req.body;
    let anos = [{ano: 2015, valor: a_2015}, {ano: 2016, valor: a_2016}, {ano: 2017, valor: a_2017}, {ano: 2018, valor: a_2018}, {ano: 2019, valor: a_2019}, {ano: 2020, valor: a_2020}, {ano: 2021, valor: a_2021}];
    let sql = 'insert into gestion(cod_corte, cod_tribunal, año, causas, compromiso, cumplimiento, fecha_compromiso, gls_corte, gls_tribunal, mes, jurisdiccion, desc_exante) ';
    sql += 'values((select cod_corte from tribunal where cod_tribunal = $1), $1, $2, 0, $3, 0, $4, (select corte.gls_corte from corte, tribunal where tribunal.cod_tribunal = $1 and ';
    sql += 'corte.cod_corte = tribunal.cod_corte), (select gls_tribunal from tribunal where cod_tribunal = $1), 1, $5, $6) returning id_gestion';
    let respuestas = [];

    try {
        const in_a2015 = await (await pool.query(sql, [tribunal,2015, parseInt(a_2015), fecha, tipo, a_descripcion])).rows;
        respuestas.push(in_a2015);
        try {
            const in_a2016 = await (await pool.query(sql, [tribunal,2016, parseInt(a_2016), fecha, tipo, a_descripcion])).rows;
            respuestas.push(in_a2016);
            try {
                const in_a2017 = await (await pool.query(sql, [tribunal,2017, parseInt(a_2017), fecha, tipo, a_descripcion])).rows;
                respuestas.push(in_a2017);
                try {
                    const in_a2018 = await (await pool.query(sql, [tribunal,2018, parseInt(a_2018), fecha, tipo, a_descripcion])).rows;
                    respuestas.push(in_a2018);
                    try {
                        const in_a2019 = await (await pool.query(sql, [tribunal,2019, parseInt(a_2019), fecha, tipo, a_descripcion])).rows;
                        respuestas.push(in_a2019);
                        try {
                            const in_a2020 = await (await pool.query(sql, [tribunal,2020, parseInt(a_2020), fecha, tipo, a_descripcion])).rows;
                            respuestas.push(in_a2020);
                            try {
                                const in_a2021 = await (await pool.query(sql, [tribunal,2021, parseInt(a_2021), fecha, tipo, a_descripcion])).rows;
                                respuestas.push(in_a2021);
                                if(respuestas.length == anos.length){
                                    res.status(200).json({
                                        mensaje: 'Registro exitoso'
                                    });
                                } else {
                                    res.status(500).json({
                                        message: 'Ocurrió un problema',
                                        error
                                    });
                                }
                            } catch (error) {
                                res.status(500).json({
                                    message: 'Ocurrió un problema',
                                    error
                                });
                            }
                        } catch (error) {
                            res.status(500).json({
                                message: 'Ocurrió un problema',
                                error
                            });
                        }
                    } catch (error) {
                        res.status(500).json({
                            message: 'Ocurrió un problema',
                            error
                        });
                    }
                } catch (error) {
                    res.status(500).json({
                        message: 'Ocurrió un problema',
                        error
                    });
                }
            } catch (error) {
                res.status(500).json({
                    message: 'Ocurrió un problema',
                    error
                });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Ocurrió un problema',
                error
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un problema',
            error
        });
    }
}

//Registrar descripcion expost
gestioninventario.registrarExpost = async (req, res) => {
    const {tribunal, descripcion, fecha} = req.body;
    let sql = 'update gestion set desc_expost = $1 where cod_tribunal = $2 and fecha_compromiso = $3 and mes = 1 returning id_gestion';
    try {
        const registro = await (await pool.query(sql, [descripcion, tribunal, fecha])).rows;
        if(registro.length > 0){
            res.status(200).json({
                registro: registro
            });
        } else {
            res.status(200).json({
                registro: 0
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un problema',
            error
        });
    }
}


//Ultimo mes comprometido
gestioninventario.ultimoMes = async (req, res) => {
    const {tribunal} = req.body;
    let sql = 'select extract(month from (select max(fecha_compromiso) from gestion where cod_tribunal = $1)) as mes';
    try {
        const mes = await (await pool.query(sql, [tribunal])).rows;
        if(mes.length > 0){
            if(mes[0].mes == null){
                res.status(200).json({
                    mes: [{'mes': 0}]
                });
            } else {
                res.status(200).json({
                    mes: mes
                });
            }
        } else {
            res.status(200).json({
                mes: [{'mes': 0}]
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un problema',
            error
        });
    }
}

//selecciona descripcion exante
gestioninventario.descripcionExante = async (req, res) => {
    const {tribunal, fecha} = req.body;
    let sql = 'select distinct desc_exante from gestion where cod_tribunal = $1 and fecha_compromiso = $2';
    try {
        const obs = await (await pool.query(sql, [tribunal, fecha])).rows;
        if(obs.length > 0){
            res.status(200).json({
                desc: obs
            });
        } else {
            res.status(500).json({
                message: 'Ocurrió un problema',
                error
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un problema',
            error
        });
    }
}

//selecciona descripcion expost
gestioninventario.descripcionExpost = async (req, res) => {
    const {tribunal, fecha} = req.body;
    let sql = 'select distinct desc_expost from gestion where cod_tribunal = $1 and fecha_compromiso = $2 and desc_expost is not NULL';
    try {
        const obs = await (await pool.query(sql, [tribunal, fecha])).rows;
        if(obs.length > 0){
            if (obs[0].desc_expost === null) {
                res.status(200).json({
                    desc: 0,
                    nulo: true
                });
            } else {
                res.status(200).json({
                    desc: obs,
                    nulo: false
                })
            }
        } else {
            res.status(200).json({
                desc: 0,
                nulo: true
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un problema',
            error
        });
    }
}




module.exports = gestioninventario;