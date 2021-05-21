<template>
    <div class="col-12">
        <Plotly 
            :data="data"
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
            cumplimiento : [],
            inventario: [],
            textos: [],
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Todos'],
            data: [],
            layout:{
                title: "Gestión de Causas Vigentes (ult. 6 meses)",
                yaxis: {title: '% de cumplimiento'},
                yaxis2: {
                    title: 'Causas Vigentes total',
                    overlaying: 'y',
                    side: 'right'
                }
            }
        }
    },
    created(){
        this.$http.post(api.listarGestionSeis, {
            tipo: this.jdx
        }).then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            let aux = 0;
            for (let index = 0; index < respuestaJson.registros.length; index++) {
                if(index%3==0){
                    this.inventario.push(parseInt(respuestaJson.registros[index].total));
                    this.textos.push(this.meses[parseInt(respuestaJson.registros[index].mes)-1]);
                } else if(index%3==1){
                    aux = parseInt(respuestaJson.registros[index].total);
                } else {
                    this.cumplimiento.push((parseInt(respuestaJson.registros[index].total)/aux)*100);
                }
            }
            this.data.push({
                x: this.textos,
                y: this.cumplimiento,
                type: 'scatter',
                name: '% Cumplimiento',
                mode: 'lines+markers',
                line: {
                    color: 'rgb(69,117,180)',
                    width: 1
                }
            });
            this.data.push({
                x: this.textos,
                y: this.inventario,
                type: 'scatter',
                name: 'Causas Vigentes',
                mode: 'lines+markers',
                yaxis: 'y2',
                line: {
                    color: 'rgb(215,48,39)',
                    width: 1
                }
            });
        })
    }
}
</script>