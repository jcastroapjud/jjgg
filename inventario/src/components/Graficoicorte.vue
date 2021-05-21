<template>
    <div class="col-12">
        <Plotly 
            :data="ggdato.data"
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
    props: ['ggdato'],
    data() {
        return{                
            layout:{
                title: "10 delitos más representativos de las Causas Vigentes",
                yaxis: {
                    visible: false
                }
            }
        }
    }, created() {
        this.$http.post(api.listarMateriaCorteTotal, {
            tipo: this.ggdato.jdx,
            corte: this.ggdato.cod_corte
        })
        .then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            respuestaJson.registros.forEach(inv => {
                this.ggdato.data[0].x.push(parseInt(inv.suma));
                this.ggdato.data[0].y.push(inv.gls_materia);
                this.ggdato.data[0].text.push(inv.gls_materia);
            });
        })
    } 
}
</script>