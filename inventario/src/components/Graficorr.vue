<template>
    <div class="col-12">
        <Plotly 
            :data="gdata"
            :layout="layout"
            :display-mode-bar="true">
        </Plotly>
    </div>
</template>

<script>
import {Plotly} from 'vue-plotly'
import api from '../api/api'
export default {
    components: {
        Plotly
    },
    props: ['dato_fm'],
    data() {
        return{
                gdata: [],
                data: [{
                x: this.fechas,
                y: this.cumplimiento,
                type: 'scatter',
                name: 'Términos',
                mode: 'lines+markers',
                line: {
                        color: 'rgb(69,117,180)',
                        width: 1
                    }
                }, {
                x: this.fechas,
                y: this.compromiso,
                type: 'scatter',
                name: 'Compromiso',
                mode: 'lines+markers',
                line: {
                        color: 'rgb(215,48,39)',
                        width: 1
                    },
                }, {
                    type: 'indicator',
                    mode: 'number+delta',
                    value: 182,
                    delta: { reference: 185, valueformat: ".0f" },
                    ticker: {showticker: true},
                    vmax: 500,
                    domain: {y: [0, 1], x: [0.25, 0.75] },
                    title: {text: "Tasa reducción"}
                }
            ],
            compromiso: [],
            cumplimiento: [],
            fechas: [],
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Todos'],
            layout:{
                title: "Tasas de reducción"
            }
        }
    },
    created(){
        let prom_total = 0;
        
        this.$http.post(api.listarDetalleGestionTribunalSeis, {
            tipo: this.dato_fm.jdx,
            tribunal: this.dato_fm.cod_tribunal
        }).then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            let prom = 0;
            for (let index = 0; index < respuestaJson.registros.length; index++) {
                if(index%3==1){
                    this.compromiso.push(parseInt(respuestaJson.registros[index].total));
                    this.fechas.push(this.meses[parseInt(respuestaJson.registros[index].mes)-1]);
                } else if(index%3==2){
                    this.cumplimiento.push(parseInt(respuestaJson.registros[index].total));
                    prom += parseInt(respuestaJson.registros[index].total);
                } else continue;
            }
            if(respuestaJson.registros.length == 0) prom = 0;
            else prom = prom/(respuestaJson.registros.length/3);
            this.gdata.push({
                x: this.fechas,
                y: this.cumplimiento,
                type: 'scatter',
                name: 'Cumplimiento',
                mode: 'lines+markers',
                line: {
                    color: 'rgb(69,117,180)',
                    width: 1
                }
            });
            this.gdata.push({
                x: this.fechas,
                y: this.compromiso,
                type: 'scatter',
                name: 'Compromiso',
                mode: 'lines+markers',
                line: {
                    color: 'rgb(215,48,39)',
                    width: 1
                }
            });

            this.$http.post(api.listarPromedioTribunal, {
                tipo: this.dato_fm.jdx,
                tribunal: this.dato_fm.cod_tribunal
            }).then(respuesta => {
                return respuesta.json();
            }).then(respuestaJson => {
                let prom_total = 0;
                respuestaJson.promedio.forEach(inv => {
                    prom_total = parseFloat(inv.promedio);
                });
                this.gdata.push({
                    type: 'indicator',
                    mode: 'number+delta',
                    value: prom,
                    delta: { reference: prom_total, valueformat: ".2f" },
                    ticker: {showticker: true},
                    vmax: 500,
                    domain: {y: [0, 1], x: [0.25, 0.75] },
                    title: {text: "Tasa reducción"}
                });
            });
            
        });
    }
}
</script>