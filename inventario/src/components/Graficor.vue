<template>
    <div class="col-12">
        <Plotly 
            :data="registros"
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
                registros: [],
                meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Todos'],
            layout:{
                title: "Reducción de Causas Vigentes últimos 3 meses"
            }
        }
    },
    created() {
        this.$http.post(api.listarReduccionTribunal, {
            tipo: this.dato_fm.jdx,
            tribunal: this.dato_fm.cod_tribunal
        }).then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            let color = '';
            for (let index = 0; index < respuestaJson.registros.length; index++) {
                if(index == 0) color = 'rgb(8,69,148)';
                else if(index == 1) color = 'rgb(33,113,181)';
                else color = 'rgb(66,146,198)';
                this.registros.push({
                    x: ['2015','2016','2017','2018','2019','2020','2021'],
                    y: [parseInt(respuestaJson.registros[index].a_2015),parseInt(respuestaJson.registros[index].a_2016),parseInt(respuestaJson.registros[index].a_2017),parseInt(respuestaJson.registros[index].a_2018),parseInt(respuestaJson.registros[index].a_2019),parseInt(respuestaJson.registros[index].a_2020),parseInt(respuestaJson.registros[index].a_2021)],
                    type: 'bar',
                    name: 'Inv. '+this.meses[parseInt(respuestaJson.registros[index].mes)-1],
                    hoverinfo: 'none',
                    textposition: 'auto',
                    opacity: 0.5,
                    text: [respuestaJson.registros[index].a_2015, respuestaJson.registros[index].a_2016, respuestaJson.registros[index].a_2017, respuestaJson.registros[index].a_2018, respuestaJson.registros[index].a_2019, respuestaJson.registros[index].a_2020, respuestaJson.registros[index].a_2021],
                    marker: {
                        color: color
                    }
                });
            }
        })
    }
}
</script>