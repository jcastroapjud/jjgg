import pool from '../database/keys';

const ginventario = {};

//Listar total últimos seis meses
ginventario.listarTotalGestionSeis = async (req, res) => {
    const {tipo} = req.body;
    
    let sql = 'select extract(month from fr.fecha_compromiso) as mes, (coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	sql += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
    sql += 'from crosstab( $$ ';
    sql += 'select fecha_compromiso, año, sum(causas) as inventario ';
    sql += 'from gestion ';
    sql += 'where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
    sql += 'group by fecha_compromiso, año ';
    sql += 'order by fecha_compromiso, año ';
    sql += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
    sql += '"2019" bigint, "2020" bigint, "2021" bigint) ';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            let sqli = 'select extract(month from fr.fecha_compromiso) as mes, (coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	        sqli += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
            sqli += 'from crosstab( $$ ';
            sqli += 'select fecha_compromiso, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion ';
            sqli += 'where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
            sqli += 'group by fecha_compromiso, año ';
            sqli += 'order by fecha_compromiso, año ';
            sqli += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
            sqli += '"2019" bigint, "2020" bigint, "2021" bigint) ';
            try {
                const compromiso = await (await pool.query(sqli)).rows;
                if(compromiso.length > 0) {
                    let sqlii = 'select extract(month from fr.fecha_compromiso) as mes, (coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	                sqlii += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
                    sqlii += 'from crosstab( $$ ';
                    sqlii += 'select fecha_compromiso, año, sum(cumplimiento) as cumplimiento ';
                    sqlii += 'from gestion ';
                    sqlii += 'where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
                    sqlii += 'group by fecha_compromiso, año ';
                    sqlii += 'order by fecha_compromiso, año ';
                    sqlii += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
                    sqlii += '"2019" bigint, "2020" bigint, "2021" bigint) ';
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

//Listar corte últimos seis meses
ginventario.listarCorteGestionSeis = async (req, res) => {
    const {tipo, corte} = req.body;
    
    let sql = 'select extract(month from fr.fecha_compromiso) as mes, (coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	sql += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
    sql += 'from crosstab( $$ ';
    sql += 'select fecha_compromiso, año, sum(causas) as inventario ';
    sql += 'from gestion ';
    sql += 'where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
    sql += 'group by fecha_compromiso, año ';
    sql += 'order by fecha_compromiso, año ';
    sql += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
    sql += '"2019" bigint, "2020" bigint, "2021" bigint) ';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            let sqli = 'select extract(month from fr.fecha_compromiso) as mes, (coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	        sqli += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
            sqli += 'from crosstab( $$ ';
            sqli += 'select fecha_compromiso, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion ';
            sqli += 'where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
            sqli += 'group by fecha_compromiso, año ';
            sqli += 'order by fecha_compromiso, año ';
            sqli += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
            sqli += '"2019" bigint, "2020" bigint, "2021" bigint) ';
            try {
                const compromiso = await (await pool.query(sqli)).rows;
                if(compromiso.length > 0) {
                    let sqlii = 'select extract(month from fr.fecha_compromiso) as mes, (coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	                sqlii += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
                    sqlii += 'from crosstab( $$ ';
                    sqlii += 'select fecha_compromiso, año, sum(cumplimiento) as cumplimiento ';
                    sqlii += 'from gestion ';
                    sqlii += 'where cod_corte = '+corte+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
                    sqlii += 'group by fecha_compromiso, año ';
                    sqlii += 'order by fecha_compromiso, año ';
                    sqlii += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
                    sqlii += '"2019" bigint, "2020" bigint, "2021" bigint) ';
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

//Listar tribunal últimos seis meses
ginventario.listarTribunalGestionSeis = async (req, res) => {
    const {tipo, tribunal} = req.body;
    
    let sql = 'select extract(month from fr.fecha_compromiso) as mes, (coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	sql += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
    sql += 'from crosstab( $$ ';
    sql += 'select fecha_compromiso, año, sum(causas) as inventario ';
    sql += 'from gestion ';
    sql += 'where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
    sql += 'group by fecha_compromiso, año ';
    sql += 'order by fecha_compromiso, año ';
    sql += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
    sql += '"2019" bigint, "2020" bigint, "2021" bigint) ';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            let sqli = 'select extract(month from fr.fecha_compromiso) as mes, (coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	        sqli += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
            sqli += 'from crosstab( $$ ';
            sqli += 'select fecha_compromiso, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion ';
            sqli += 'where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
            sqli += 'group by fecha_compromiso, año ';
            sqli += 'order by fecha_compromiso, año ';
            sqli += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
            sqli += '"2019" bigint, "2020" bigint, "2021" bigint) ';
            try {
                const compromiso = await (await pool.query(sqli)).rows;
                if(compromiso.length > 0) {
                    let sqlii = 'select extract(month from fr.fecha_compromiso) as mes, (coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	                sqlii += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
                    sqlii += 'from crosstab( $$ ';
                    sqlii += 'select fecha_compromiso, año, sum(cumplimiento) as cumplimiento ';
                    sqlii += 'from gestion ';
                    sqlii += 'where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
                    sqlii += 'group by fecha_compromiso, año ';
                    sqlii += 'order by fecha_compromiso, año ';
                    sqlii += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
                    sqlii += '"2019" bigint, "2020" bigint, "2021" bigint) ';
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

//Listar detalle últimos seis meses
ginventario.listarDetalleGestionSeis = async (req, res) => {
    const {tipo} = req.body;
    
    let sql = 'select extract(month from fr.fecha_compromiso) as mes, coalesce(fr."2015",0) as a_2015, coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, ';
    sql += 'coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020, coalesce(fr."2021",0) as a_2021, ';
    sql += '(coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	sql += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
    sql += 'from crosstab( $$ ';
    sql += 'select fecha_compromiso, año, sum(causas) as inventario ';
    sql += 'from gestion ';
    sql += 'where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
    sql += 'group by fecha_compromiso, año ';
    sql += 'order by fecha_compromiso, año ';
    sql += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
    sql += '"2019" bigint, "2020" bigint, "2021" bigint) ';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            let sqli = 'select extract(month from fr.fecha_compromiso) as mes, coalesce(fr."2015",0) as a_2015, coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, ';
            sqli += 'coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020, coalesce(fr."2021",0) as a_2021, ';
            sqli += '(coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	        sqli += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
            sqli += 'from crosstab( $$ ';
            sqli += 'select fecha_compromiso, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion ';
            sqli += 'where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
            sqli += 'group by fecha_compromiso, año ';
            sqli += 'order by fecha_compromiso, año ';
            sqli += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
            sqli += '"2019" bigint, "2020" bigint, "2021" bigint) ';
            try {
                const compromiso = await (await pool.query(sqli)).rows;
                if(compromiso.length > 0) {
                    let sqlii = 'select extract(month from fr.fecha_compromiso) as mes, coalesce(fr."2015",0) as a_2015, coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, ';
                    sql += 'coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020, coalesce(fr."2021",0) as a_2021, ';
                    sqlii += '(coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	                sqlii += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
                    sqlii += 'from crosstab( $$ ';
                    sqlii += 'select fecha_compromiso, año, sum(cumplimiento) as cumplimiento ';
                    sqlii += 'from gestion ';
                    sqlii += 'where jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'6\' month) and fecha_compromiso < now() ';
                    sqlii += 'group by fecha_compromiso, año ';
                    sqlii += 'order by fecha_compromiso, año ';
                    sqlii += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
                    sqlii += '"2019" bigint, "2020" bigint, "2021" bigint) ';
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

//Listar detalle tribunal últimos cuatro meses y próximos dos meses
ginventario.listarDetallaTribunalGestionSeis = async (req, res) => {
    const {tipo, tribunal} = req.body;
    
    let sql = 'select extract(month from fr.fecha_compromiso) as mes, extract(year from fr.fecha_compromiso) as año, coalesce(fr."2015",0) as a_2015, coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, ';
    sql += 'coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020, coalesce(fr."2021",0) as a_2021, ';
    sql += '(coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	sql += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
    sql += 'from crosstab( $$ ';
    sql += 'select fecha_compromiso, año, sum(causas) as inventario ';
    sql += 'from gestion ';
    sql += 'where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'4\' month) and fecha_compromiso < date_trunc(\'month\', current_date + interval \'2\' month) ';
    sql += 'group by fecha_compromiso, año ';
    sql += 'order by fecha_compromiso, año ';
    sql += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
    sql += '"2019" bigint, "2020" bigint, "2021" bigint) ';
    try {
        const causas = await (await pool.query(sql)).rows;
        if (causas.length > 0) {
            let sqli = 'select extract(month from fr.fecha_compromiso) as mes, extract(year from fr.fecha_compromiso) as año, coalesce(fr."2015",0) as a_2015, coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, ';
            sqli += 'coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020, coalesce(fr."2021",0) as a_2021, ';
            sqli += '(coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	        sqli += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
            sqli += 'from crosstab( $$ ';
            sqli += 'select fecha_compromiso, año, sum(compromiso) as compromiso ';
            sqli += 'from gestion ';
            sqli += 'where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'3\' month) and fecha_compromiso < date_trunc(\'month\', current_date + interval \'2\' month) ';
            sqli += 'group by fecha_compromiso, año ';
            sqli += 'order by fecha_compromiso, año ';
            sqli += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
            sqli += '"2019" bigint, "2020" bigint, "2021" bigint) ';
            try {
                const compromiso = await (await pool.query(sqli)).rows;
                if(compromiso.length > 0) {
                    let sqlii = 'select extract(month from fr.fecha_compromiso) as mes, extract(year from fr.fecha_compromiso) as año, coalesce(fr."2015",0) as a_2015, coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, ';
                    sqlii += 'coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020, coalesce(fr."2021",0) as a_2021, ';
                    sqlii += '(coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	                sqlii += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
                    sqlii += 'from crosstab( $$ ';
                    sqlii += 'select fecha_compromiso, año, sum(cumplimiento) as cumplimiento ';
                    sqlii += 'from gestion ';
                    sqlii += 'where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'3\' month) and fecha_compromiso < date_trunc(\'month\', current_date + interval \'2\' month) ';
                    sqlii += 'group by fecha_compromiso, año ';
                    sqlii += 'order by fecha_compromiso, año ';
                    sqlii += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
                    sqlii += '"2019" bigint, "2020" bigint, "2021" bigint) ';
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

//Listar reduccion inventario tribunal ultimos 3 meses
ginventario.listarReduccionTribunal = async (req, res) => {

    const {tipo, tribunal} = req.body;

    let sql = 'select extract(month from fr.fecha_compromiso) as mes, extract(year from fr.fecha_compromiso) as año, coalesce(fr."2015",0) as a_2015, coalesce(fr."2016",0) as a_2016, coalesce(fr."2017",0) as a_2017, ';
    sql += 'coalesce(fr."2018",0) as a_2018, coalesce(fr."2019",0) as a_2019, coalesce(fr."2020",0) as a_2020, coalesce(fr."2021",0) as a_2021, ';
    sql += '(coalesce(fr."2015",0) + coalesce(fr."2016",0) + coalesce(fr."2017",0) + ';
	sql += 'coalesce(fr."2018",0) + coalesce(fr."2019",0) + coalesce(fr."2020",0) + coalesce(fr."2021", 0)) as total ';
    sql += 'from crosstab( $$ ';
    sql += 'select fecha_compromiso, año, sum(causas) as inventario ';
    sql += 'from gestion ';
    sql += 'where cod_tribunal = '+tribunal+' and jurisdiccion = \''+tipo+'\' and fecha_compromiso >= date_trunc(\'month\', current_date - interval \'3\' month) and fecha_compromiso < now() ';
    sql += 'group by fecha_compromiso, año ';
    sql += 'order by fecha_compromiso, año ';
    sql += '$$ ) as fr(fecha_compromiso date, "2015" bigint, "2016" bigint, "2017" bigint, "2018" bigint, ';
    sql += '"2019" bigint, "2020" bigint, "2021" bigint) ';

    try {
        const inventario = await (await pool.query(sql)).rows;
        if(inventario.length > 0){
            res.status(200).json({
                registros: inventario
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

//Tasa de reduccion
ginventario.tasaReduccionTribunal = async(req, res) => {

    const {tipo, tribunal} = req.body;

    let sql = 'select avg(cumplimiento) as promedio from ( ';
    sql += 'select fecha_compromiso, sum(cumplimiento) as cumplimiento ';
    sql += 'from gestion where cod_tribunal = '+tribunal+' and jurisdiccion=\''+tipo+'\' group by fecha_compromiso ';
    sql += ') as fr';
    try {
        const promedio = await (await pool.query(sql)).rows;
        if(promedio.length > 0){
            res.status(200).json({
                promedio: promedio
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

//Mes Compromiso
ginventario.mesCompromiso = async(req, res) => {
    const {tipo, tribunal} = req.body;

    let sql = 'select date_trunc(\'month\', max(fecha_compromiso) + interval \'1\' month) as prox_compromiso from gestion where cod_tribunal = $1';
    try {
        const mes = await (await pool.query(sql, [tribunal])).rows;
        if(mes.length > 0){
            res.status(200).json({
                mes: mes
            });
        } else {
            res.status(200).json({
                mes: mes
            });
        }
    } catch (error) {
        
    }
}

module.exports = ginventario;