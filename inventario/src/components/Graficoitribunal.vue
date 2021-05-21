<template>
    <div class="col-12">
        <Plotly 
            :data="ttdato.data"
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
    props: ['ttdato'],
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
        this.$http.post(api.listarMateriaTribunalTotal, {
            tipo: this.ttdato.jdx,
            tribunal: this.ttdato.cod_tribunal
        })
        .then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            respuestaJson.registros.forEach(inv => {
                this.ttdato.data[0].x.push(parseInt(inv.suma));
                this.ttdato.data[0].y.push(inv.gls_materia);
                this.ttdato.data[0].text.push(inv.gls_materia);
            });
        })
    } 
}
</script>