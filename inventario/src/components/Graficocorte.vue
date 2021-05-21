<template>
  <div class="col-12">
    <Plotly :data="gdato.data" :layout="layout" :display-mode-bar="true"> </Plotly>
  </div>
</template>

<script>
import {Plotly} from 'vue-plotly'
import api from '../api/api'
export default {
    components: {
        Plotly
    },
    props: ['gdato'],
    data() {
        return{
            
            layout:{
                title: "Causas Vigentes",
                barmode: 'stack',
                xaxis: {
                    type: 'category'
                },
                updatemenus: [
                    {
                        y: 1,
                        yanchor: 'bottom',
                        buttons: [{
                            method: 'restyle',
                            args: ['visible', [true, true, false, false, false, false, false, 
                                                false, false, false, false, false, false, false]],
                            label: 'Histórico'
                        }, {
                            method: 'restyle',
                            args: ['visible', [false, false, false, false, false, false, false, 
                                                true, false, false, false, false, false, true]],
                            label: '2020'
                        },{
                            method: 'restyle',
                            args: ['visible', [false, false, false, false, false, false, true, 
                                                false, false, false, false, false, true, false]],
                            label: '2019'
                        }, {
                            method: 'restyle',
                            args: ['visible', [false, false, false, false, false, true, false, 
                                                false, false, false, false, true, false, false]],
                            label: '2018'
                        }, {
                            method: 'restyle',
                            args: ['visible', [false, false, false, false, true, false, false, 
                                                false, false, false, true, false, false, false]],
                            label: '2017'
                        }, {
                            method: 'restyle',
                            args: ['visible', [false, false, false, true, false, false, false, 
                                                false, false, true, false, false, false, false]],
                            label: '2016'
                        }, {
                            method: 'restyle',
                            args: ['visible', [false, false, true, false, false, false, false, 
                                                false, true, false, false, false, false, false]],
                            label: '2015 y ant.'
                        }]
                    }
                ]
            }
        }
    },
    created(){
        console.log(this.gdato);
        this.$http.post(api.historicoCorteCompleto, {
            tipo: this.gdato.jdx,
            corte: this.gdato.cod_corte
        }).then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            let rgb = 'rgb(217,217,217)';
            respuestaJson.historico.forEach(inv => {
                this.gdato.data.push({
                    x: ['2015','2016','2017','2018','2019','2020','2021'],
                    y: [parseInt(inv.a_2015), parseInt(inv.a_2016), parseInt(inv.a_2017)
                        , parseInt(inv.a_2018), parseInt(inv.a_2019), parseInt(inv.a_2020), 0],
                    type: 'bar',
                    name: inv.tipo,
                    text: [parseInt(inv.a_2015), parseInt(inv.a_2016), parseInt(inv.a_2017)
                        , parseInt(inv.a_2018), parseInt(inv.a_2019), parseInt(inv.a_2020), 0].map(String),
                    textposition: 'auto',
                    hoverinfo: 'none',
                    marker: {
                        color: rgb,
                        opacity: 0.5
                    },
                    visible: true
                });
                rgb = 'rgb(8,69,148)';
            });
            rgb = 'rgb(217,217,217)';
            respuestaJson.historico_ingreso.forEach(inv => {
                this.gdato.data.push({
                    x: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                    y: [parseInt(inv.ene), parseInt(inv.feb), parseInt(inv.mar), parseInt(inv.abr), parseInt(inv.may), parseInt(inv.jun),
                        parseInt(inv.jul), parseInt(inv.ago), parseInt(inv.sep), parseInt(inv.oct), parseInt(inv.nov), parseInt(inv.dic)],
                    type: 'bar',
                    name: 'Ingresos no vigentes',
                    text: [parseInt(inv.ene), parseInt(inv.feb), parseInt(inv.mar), parseInt(inv.abr), parseInt(inv.may), parseInt(inv.jun),
                        parseInt(inv.jul), parseInt(inv.ago), parseInt(inv.sep), parseInt(inv.oct), parseInt(inv.nov), parseInt(inv.dic)].map(String),
                    textposition: 'auto',
                    hoverinfo: 'none',
                    marker: {
                        color: rgb,
                        opacity: 0.5
                    },
                    visible: false
                });
            });
            rgb = 'rgb(8,69,148)';
            respuestaJson.historico_inventario.forEach(inv => {
                this.gdato.data.push({
                    x: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                    y: [parseInt(inv.ene), parseInt(inv.feb), parseInt(inv.mar), parseInt(inv.abr), parseInt(inv.may), parseInt(inv.jun),
                        parseInt(inv.jul), parseInt(inv.ago), parseInt(inv.sep), parseInt(inv.oct), parseInt(inv.nov), parseInt(inv.dic)],
                    type: 'bar',
                    name: 'Inventario',
                    text: [parseInt(inv.ene), parseInt(inv.feb), parseInt(inv.mar), parseInt(inv.abr), parseInt(inv.may), parseInt(inv.jun),
                        parseInt(inv.jul), parseInt(inv.ago), parseInt(inv.sep), parseInt(inv.oct), parseInt(inv.nov), parseInt(inv.dic)].map(String),
                    textposition: 'auto',
                    hoverinfo: 'none',
                    marker: {
                        color: rgb,
                        opacity: 0.5
                    },
                    visible: false
                });
            });
        })
    }    
}
</script>