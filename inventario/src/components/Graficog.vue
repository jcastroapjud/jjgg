<template>
    <div class="col-12">
        <Plotly 
            :data="performance"
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
    props: ['jdx'],
    data() {
        return{
            performance: [],
            registros: [],
            layout:{
                title: "Gestión de Causas Vigentes",
                showlegend: true,
                legend: {
                    x: 1,
                    xanchor: 'right',
                    y: 1,
                    orientation: "h"
                }
            }
        }
    },
    created() {
        this.$http.post(api.listarGestionTotal, {
            tipo: this.jdx
        }).then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            respuestaJson.registros.forEach(inv => {
                this.registros.push({
                    gls_corte: inv.gls_corte,
                    a_2015: parseInt(inv.a_2015),
                    a_2016: parseInt(inv.a_2016),
                    a_2017: parseInt(inv.a_2017),
                    a_2018: parseInt(inv.a_2018),
                    a_2019: parseInt(inv.a_2019),
                    a_2020: parseInt(inv.a_2020),
                    a_2021: 0,
                    a_total: parseInt(inv.a_2015) + parseInt(inv.a_2016) + parseInt(inv.a_2017) + parseInt(inv.a_2018) + parseInt(inv.a_2019) + parseInt(inv.a_2020) + 0 //modificar 2021 posteriormente
                });
            });
            let aux;
            aux = this.registros.pop();
            this.performance.push({
                x: [2015,2016,2017,2018,2019,2020,2021],
                y: [aux.a_2015,aux.a_2016,aux.a_2017,aux.a_2018,aux.a_2019,aux.a_2020,aux.a_2021],
                type: 'scatter',
                name: 'Cumplimiento',
                mode: 'lines',
                line: {
                    color: 'rgb(145,207,96)',
                    width: 2
                }
            });
            aux = this.registros.pop();
            this.performance.push({
                x: [2015,2016,2017,2018,2019,2020,2021],
                y: [aux.a_2015,aux.a_2016,aux.a_2017,aux.a_2018,aux.a_2019,aux.a_2020,aux.a_2021],
                type: 'scatter',
                name: 'Compromiso',
                mode: 'lines',
                line: {
                    color: 'rgb(222,45,38)',
                    width: 1
                }
            });
            aux = this.registros.pop();
            this.performance.push({
                x: [2015,2016,2017,2018,2019,2020,2021],
                y: [aux.a_2015,aux.a_2016,aux.a_2017,aux.a_2018,aux.a_2019,aux.a_2020,aux.a_2021],
                type: 'scatter',
                name: 'Causas',
                mode: 'lines',
                line: {
                    color: 'rgb(69,117,180)',
                    width: 1
                }
            });
        })
    }  
}
</script>