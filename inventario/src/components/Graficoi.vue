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
                data: [{
                x: [],
                y: [],
                type: 'bar',
                name: 'Delitos más representativos',
                orientation: 'h',
                mode: 'lines',
                textposition: 'auto',
                opacity: 0.65,
                text: [],
                marker: {
                    color: 'rgba(50,171,96,0.6)',
                    line: {
                        color: 'rgba(50,171,96,1.0)',
                        width: 1
                    }
                }
            }
            ],
            layout:{
                title: "10 delitos más representativos de las Causas Vigentes",
                yaxis: {
                    visible: false
                }
            }
        }
    }, created() {
        this.$http.post(api.listarMateriaTotal, {
            tipo: this.jdx
        })
        .then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            respuestaJson.registros.forEach(inv => {
                this.data[0].x.push(parseInt(inv.suma));
                this.data[0].y.push(inv.gls_materia);
                this.data[0].text.push(inv.gls_materia);
            });
        })
    } 
}
</script>