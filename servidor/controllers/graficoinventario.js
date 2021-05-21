import pool from '../database/keys';

const datografico = {};

datografico.historicoNacional_1 = async (req, res) => {
    const {tipo} = req.body;
    var sql = 'select fr.tipo as tipo, fr."2015" as a_2015, ';
	sql += 'fr."2016" as a_2016, fr."2017" as a_2017, fr."2018" as a_2018, ';
	sql += 'fr."2019" as a_2019, fr."2020" as a_2020 from crosstab( ';
    sql += '$$ select \'Ingresos\' as tipo, año, sum(cantidad_ingreso) as valor ';
    sql += 'from inventario where jurisdiccion = \''+tipo+'\' group by año ';
    sql += 'UNION ALL ';
    sql += 'select \'Inventario\' as tipo, año, sum(cantidad_inventario) as valor ';
    sql += 'from inventario where jurisdiccion = \''+tipo+'\' group by año ';
    sql += 'order by tipo, año $$) as fr(tipo text, "2015" bigint, "2016" bigint, "2017" bigint, '; 
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
            sql: sql,
            error
        });
    }
}

datografico.historicoNacionalIngreso = async (req, res) => {
    const {tipo} = req.body;
    var sql = 'select fr.año as año, fr."1" as ene, fr."2" as feb, fr."3" as mar, ';
	sql += 'fr."4" as abr, fr."5" as may, fr."6" as jun, fr."7" as jul, fr."8" as ago, ';
    sql += 'fr."9" as sep, fr."10" as oct, fr."11" as nov, fr."12" as dic '
	sql += 'from crosstab( ';
    sql += '$$ select año, mes, sum(cantidad_ingreso) as valor ';
    sql += 'from inventario where jurisdiccion = \''+tipo+'\' group by año, mes order by año, mes $$)';
    sql += ' as fr(año int, "1" bigint, "2" bigint, "3" bigint, ';
    sql += '"4" bigint, "5" bigint, "6" bigint, "7" bigint, "8" bigint, "9" bigint, ';
    sql += '"10" bigint, "11" bigint, "12" bigint)';
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
            sql: sql,
            error
        });
    }
}

datografico.historicoNacionalInventario = async (req, res) => {
    const {tipo} = req.body;
    var sql = 'select fr.año as año, fr."1" as ene, fr."2" as feb, fr."3" as mar, ';
	sql += 'fr."4" as abr, fr."5" as may, fr."6" as jun, fr."7" as jul, fr."8" as ago, ';
    sql += 'fr."9" as sep, fr."10" as oct, fr."11" as nov, fr."12" as dic '
	sql += 'from crosstab( ';
    sql += '$$ select año, mes, sum(cantidad_inventario) as valor ';
    sql += 'from inventario where jurisdiccion = \''+tipo+'\' group by año, mes order by año, mes $$)';
    sql += ' as fr(año int, "1" bigint, "2" bigint, "3" bigint, ';
    sql += '"4" bigint, "5" bigint, "6" bigint, "7" bigint, "8" bigint, "9" bigint, ';
    sql += '"10" bigint, "11" bigint, "12" bigint)';
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
            sql: sql,
            error
        });
    }
}

datografico.historicoCompleto = async (req, res) => {
    const {tipo} = req.body;
    var sql = 'select fr.tipo as tipo, fr."2015" as a_2015, ';
	sql += 'fr."2016" as a_2016, fr."2017" as a_2017, fr."2018" as a_2018, ';
	sql += 'fr."2019" as a_2019, fr."2020" as a_2020 from crosstab( ';
    sql += '$$ select \'Ingresos\' as tipo, año, sum(cantidad_ingreso) as valor ';
    sql += 'from inventario where jurisdiccion = \''+tipo+'\' group by año ';
    sql += 'UNION ALL ';
    sql += 'select \'Inventario\' as tipo, año, sum(cantidad_inventario) as valor ';
    sql += 'from inventario where jurisdiccion = \''+tipo+'\' group by año ';
    sql += 'order by tipo, año $$) as fr(tipo text, "2015" bigint, "2016" bigint, "2017" bigint, '; 
    sql += '"2018" bigint, "2019" bigint, "2020" bigint)';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            var sqli = 'select fr.año as año, fr."1" as ene, fr."2" as feb, fr."3" as mar, ';
            sqli += 'fr."4" as abr, fr."5" as may, fr."6" as jun, fr."7" as jul, fr."8" as ago, ';
            sqli += 'fr."9" as sep, fr."10" as oct, fr."11" as nov, fr."12" as dic '
            sqli += 'from crosstab( ';
            sqli += '$$ select año, mes, sum(cantidad_ingreso) as valor ';
            sqli += 'from inventario where jurisdiccion = \''+tipo+'\' group by año, mes order by año, mes $$)';
            sqli += ' as fr(año int, "1" bigint, "2" bigint, "3" bigint, ';
            sqli += '"4" bigint, "5" bigint, "6" bigint, "7" bigint, "8" bigint, "9" bigint, ';
            sqli += '"10" bigint, "11" bigint, "12" bigint)';
            try {
                const causasi = await (await pool.query(sqli)).rows;
                if (causasi.length > 0) {
                    var sqlii = 'select fr.año as año, fr."1" as ene, fr."2" as feb, fr."3" as mar, ';
                    sqlii += 'fr."4" as abr, fr."5" as may, fr."6" as jun, fr."7" as jul, fr."8" as ago, ';
                    sqlii += 'fr."9" as sep, fr."10" as oct, fr."11" as nov, fr."12" as dic '
                    sqlii += 'from crosstab( ';
                    sqlii += '$$ select año, mes, sum(cantidad_inventario) as valor ';
                    sqlii += 'from inventario where jurisdiccion = \''+tipo+'\' group by año, mes order by año, mes $$)';
                    sqlii += ' as fr(año int, "1" bigint, "2" bigint, "3" bigint, ';
                    sqlii += '"4" bigint, "5" bigint, "6" bigint, "7" bigint, "8" bigint, "9" bigint, ';
                    sqlii += '"10" bigint, "11" bigint, "12" bigint)';
                    try {
                        const causasii = await (await pool.query(sqlii)).rows;
                        if (causasii.length > 0) {
                            res.status(200).json({
                                historico: causas,
                                historico_ingreso: causasi,
                                historico_inventario: causasii
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

//
datografico.historicoCorteCompleto = async (req, res) => {
    const {tipo, corte} = req.body;
    var sql = 'select fr.tipo as tipo, fr."2015" as a_2015, ';
	sql += 'fr."2016" as a_2016, fr."2017" as a_2017, fr."2018" as a_2018, ';
	sql += 'fr."2019" as a_2019, fr."2020" as a_2020 from crosstab( ';
    sql += '$$ select \'Ingresos\' as tipo, año, sum(cantidad_ingreso) as valor ';
    sql += 'from inventario where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' group by año ';
    sql += 'UNION ALL ';
    sql += 'select \'Inventario\' as tipo, año, sum(cantidad_inventario) as valor ';
    sql += 'from inventario where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' group by año ';
    sql += 'order by tipo, año $$) as fr(tipo text, "2015" bigint, "2016" bigint, "2017" bigint, '; 
    sql += '"2018" bigint, "2019" bigint, "2020" bigint)';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            var sqli = 'select fr.año as año, fr."1" as ene, fr."2" as feb, fr."3" as mar, ';
            sqli += 'fr."4" as abr, fr."5" as may, fr."6" as jun, fr."7" as jul, fr."8" as ago, ';
            sqli += 'fr."9" as sep, fr."10" as oct, fr."11" as nov, fr."12" as dic '
            sqli += 'from crosstab( ';
            sqli += '$$ select año, mes, sum(cantidad_ingreso) as valor ';
            sqli += 'from inventario where cod_corte='+corte+' and jurisdiccion = \''+tipo+'\' group by año, mes order by año, mes $$)';
            sqli += ' as fr(año int, "1" bigint, "2" bigint, "3" bigint, ';
            sqli += '"4" bigint, "5" bigint, "6" bigint, "7" bigint, "8" bigint, "9" bigint, ';
            sqli += '"10" bigint, "11" bigint, "12" bigint)';
            try {
                const causasi = await (await pool.query(sqli)).rows;
                if (causasi.length > 0) {
                    var sqlii = 'select fr.año as año, fr."1" as ene, fr."2" as feb, fr."3" as mar, ';
                    sqlii += 'fr."4" as abr, fr."5" as may, fr."6" as jun, fr."7" as jul, fr."8" as ago, ';
                    sqlii += 'fr."9" as sep, fr."10" as oct, fr."11" as nov, fr."12" as dic '
                    sqlii += 'from crosstab( ';
                    sqlii += '$$ select año, mes, sum(cantidad_inventario) as valor ';
                    sqlii += 'from inventario where cod_corte='+corte+' and jurisdiccion = \''+tipo+'\' group by año, mes order by año, mes $$)';
                    sqlii += ' as fr(año int, "1" bigint, "2" bigint, "3" bigint, ';
                    sqlii += '"4" bigint, "5" bigint, "6" bigint, "7" bigint, "8" bigint, "9" bigint, ';
                    sqlii += '"10" bigint, "11" bigint, "12" bigint)';
                    try {
                        const causasii = await (await pool.query(sqlii)).rows;
                        if (causasii.length > 0) {
                            res.status(200).json({
                                historico: causas,
                                historico_ingreso: causasi,
                                historico_inventario: causasii
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

datografico.historicoTribunalCompleto = async (req, res) => {
    const {tipo, tribunal} = req.body;
    var sql = 'select fr.tipo as tipo, fr."2015" as a_2015, ';
	sql += 'fr."2016" as a_2016, fr."2017" as a_2017, fr."2018" as a_2018, ';
	sql += 'fr."2019" as a_2019, fr."2020" as a_2020 from crosstab( ';
    sql += '$$ select \'Ingresos\' as tipo, año, sum(cantidad_ingreso) as valor ';
    sql += 'from inventario where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' group by año ';
    sql += 'UNION ALL ';
    sql += 'select \'Inventario\' as tipo, año, sum(cantidad_inventario) as valor ';
    sql += 'from inventario where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' group by año ';
    sql += 'order by tipo, año $$) as fr(tipo text, "2015" bigint, "2016" bigint, "2017" bigint, '; 
    sql += '"2018" bigint, "2019" bigint, "2020" bigint)';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            var sqli = 'select fr.año as año, fr."1" as ene, fr."2" as feb, fr."3" as mar, ';
            sqli += 'fr."4" as abr, fr."5" as may, fr."6" as jun, fr."7" as jul, fr."8" as ago, ';
            sqli += 'fr."9" as sep, fr."10" as oct, fr."11" as nov, fr."12" as dic '
            sqli += 'from crosstab( ';
            sqli += '$$ select año, mes, sum(cantidad_ingreso) as valor ';
            sqli += 'from inventario where cod_tribunal='+tribunal+' and jurisdiccion = \''+tipo+'\' group by año, mes order by año, mes $$)';
            sqli += ' as fr(año int, "1" bigint, "2" bigint, "3" bigint, ';
            sqli += '"4" bigint, "5" bigint, "6" bigint, "7" bigint, "8" bigint, "9" bigint, ';
            sqli += '"10" bigint, "11" bigint, "12" bigint)';
            try {
                const causasi = await (await pool.query(sqli)).rows;
                if (causasi.length > 0) {
                    var sqlii = 'select fr.año as año, fr."1" as ene, fr."2" as feb, fr."3" as mar, ';
                    sqlii += 'fr."4" as abr, fr."5" as may, fr."6" as jun, fr."7" as jul, fr."8" as ago, ';
                    sqlii += 'fr."9" as sep, fr."10" as oct, fr."11" as nov, fr."12" as dic '
                    sqlii += 'from crosstab( ';
                    sqlii += '$$ select año, mes, sum(cantidad_inventario) as valor ';
                    sqlii += 'from inventario where cod_tribunal='+tribunal+' and jurisdiccion = \''+tipo+'\' group by año, mes order by año, mes $$)';
                    sqlii += ' as fr(año int, "1" bigint, "2" bigint, "3" bigint, ';
                    sqlii += '"4" bigint, "5" bigint, "6" bigint, "7" bigint, "8" bigint, "9" bigint, ';
                    sqlii += '"10" bigint, "11" bigint, "12" bigint)';
                    try {
                        const causasii = await (await pool.query(sqlii)).rows;
                        if (causasii.length > 0) {
                            res.status(200).json({
                                historico: causas,
                                historico_ingreso: causasi,
                                historico_inventario: causasii
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

//Listar inventario por materia pivoteado total
datografico.listarMateriaTotalPivoteado = async (req, res) => {
    const {tipo} = req.body;
    let sql = 'select gls_materia, coalesce(fr."2015",0) as a_2015, ';
    sql += 'coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, ';
    sql += 'coalesce(fr."2018",0) as a_2019, coalesce(fr."2020",0) as a_2020, ';
    sql += '(coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
    sql += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0)) as suma ';
    sql += 'from crosstab( $$ ';
    sql += 'select gls_materia, año, sum(cantidad_inventario) as cantidad_inventario ';
    sql += 'from inventario_materia ';
    sql += 'where jurisdiccion = \''+tipo+'\' ';
    sql += 'group by gls_materia, año order by gls_materia, año ';
    sql += '$$ ) as fr(gls_materia varchar, "2015" bigint, "2016" bigint, "2017" bigint, ';
    sql += '"2018" bigint, "2019" bigint, "2020" bigint) order by suma desc limit 10';
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

////Listar inventario por materia pivoteado total corte
datografico.listarMateriaCorteTotalPivoteado = async (req, res) => {
    const {tipo, corte} = req.body;
    let sql = 'select gls_materia, coalesce(fr."2015",0) as a_2015, ';
    sql += 'coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, ';
    sql += 'coalesce(fr."2018",0) as a_2019, coalesce(fr."2020",0) as a_2020, ';
    sql += '(coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
    sql += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0)) as suma ';
    sql += 'from crosstab( $$ ';
    sql += 'select gls_materia, año, sum(cantidad_inventario) as cantidad_inventario ';
    sql += 'from inventario_materia ';
    sql += 'where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' ';
    sql += 'group by gls_materia, año order by gls_materia, año ';
    sql += '$$ ) as fr(gls_materia varchar, "2015" bigint, "2016" bigint, "2017" bigint, ';
    sql += '"2018" bigint, "2019" bigint, "2020" bigint) order by suma desc limit 10';
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

////Listar inventario por materia pivoteado total tribunal
datografico.listarMateriaTribunalTotalPivoteado = async (req, res) => {
    const {tipo, tribunal} = req.body;
    let sql = 'select gls_materia, coalesce(fr."2015",0) as a_2015, ';
    sql += 'coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, ';
    sql += 'coalesce(fr."2018",0) as a_2019, coalesce(fr."2020",0) as a_2020, ';
    sql += '(coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
    sql += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0)) as suma ';
    sql += 'from crosstab( $$ ';
    sql += 'select gls_materia, año, sum(cantidad_inventario) as cantidad_inventario ';
    sql += 'from inventario_materia ';
    sql += 'where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' ';
    sql += 'group by gls_materia, año order by gls_materia, año ';
    sql += '$$ ) as fr(gls_materia varchar, "2015" bigint, "2016" bigint, "2017" bigint, ';
    sql += '"2018" bigint, "2019" bigint, "2020" bigint) order by suma desc limit 10';
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

module.exports = datografico;