<template>
    <div class="col-12">
        <div class="row">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Nacional</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Corte de Apelaciones</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Tribunal</button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
              
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-8">
                                <graficogg :jdx="credenciales.jurisdiccion" :key="gstn.ppal.g1"></graficogg>
                            </div>
                            <div class="col-4">
                                <graficog :jdx="credenciales.jurisdiccion" :key="gstn.ppal.g2"></graficog>
                            </div>
                        </div>
                        <div class="row">
                            <tablag :jdx="credenciales.jurisdiccion" :key="gstn.ppal.tb"></tablag>
                        </div>
                    </div>
                </div>

            </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

              
                <div class="row">
                    <div class="col-12">
                        <v-select label="name" :options="cortes" @input="seleccionaCorte" v-model="corte_seleccionada"></v-select>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-8">
                                <graficoggcorte :dato_gg="dato_gg" :key="gstn.corte.g1"></graficoggcorte>
                            </div>
                            <div class="col-4">
                                <graficogcorte :dato_gci="dato_gci" :key="gstn.corte.g2"></graficogcorte>
                            </div>
                        </div>
                        <div class="row">
                            <tablagcorte :dato_tc="dato_tc" :key="gstn.corte.tb"></tablagcorte>
                        </div>
                    </div>
                </div>



            </div>
            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
              
              
                <div class="row">
                    <div class="col-12">
                        <v-select label="name" :options="tribunales" @input="seleccionaTribunal" v-model="tribunal_seleccionado"></v-select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-8">
                                <graficoggtribunal :dato_ggd="dato_ggd" :key="gstn.tribunal.g1"></graficoggtribunal>
                            </div>
                            <div class="col-4">
                                <graficogtribunal :dato_gti="dato_gti" :key="gstn.tribunal.g2"></graficogtribunal>
                            </div>
                        </div>
                        <div class="row">
                            <tablagtribunal :dato_tt="dato_tt" :key="gstn.tribunal.tb"></tablagtribunal>
                        </div>
                    </div>
                </div>


            </div>
          </div>
        </div>
        
    </div>

</template>

<script>
import Botonera from '../components/Botonera.vue'
import Graficog from '../components/Graficog.vue'
import Graficogg from '../components/Graficogg.vue'
import Tablag from '../components/Tablag.vue'
import Tablagcorte from '../components/Tablagcorte.vue'
import Tablagtribunal from '../components/Tablagtribunal.vue'
import 'vue-select/dist/vue-select.css'
import api from '../api/api'
import Graficogcorte from '../components/Graficogcorte'
import Graficogtribunal from '../components/Graficogtribunal'
import Graficoggcorte from '../components/Graficoggcorte'
import Graficoggtribunal from '../components/Graficoggtribunal'
import { bus } from '../main'

export default {
    name: 'Gestion',
    props: ['credenciales'],
    components: {
        Botonera,
        Graficog,
        Graficogcorte,
        Graficogtribunal,
        Tablag,
        Graficogg,
        Tablagcorte,
        Tablagtribunal,
        Graficoggcorte,
        Graficoggtribunal
    },
    data() {
        return {
            cortes: [],
            tribunales: [],
            corte_seleccionada: this.credenciales.corte,
            tribunal_seleccionado: this.credenciales.tribunal,
            dato_tc: { registros: [], totales: [], jdx: this.credenciales.jurisdiccion, cod_corte: this.credenciales.cod_corte},
            dato_tt: { registros: [], totales: [], jdx: this.credenciales.jurisdiccion, cod_tribunal: this.credenciales.cod_tribunal },
            dato_gc: [],
            dato_gg: {data: [], jdx: this.credenciales.jurisdiccion, cod_corte: this.credenciales.cod_corte},
            dato_gci: {data: [], jdx: this.credenciales.jurisdiccion, cod_corte: this.credenciales.cod_corte},
            dato_ggd: {data: [], jdx: this.credenciales.jurisdiccion, cod_tribunal: this.credenciales.cod_tribunal},
            dato_gti: {data: [], jdx: this.credenciales.jurisdiccion, cod_tribunal: this.credenciales.cod_tribunal},
            gstn: { ppal: {g1: 0, g2: 0, tb: 0}, corte: {g1: 0, g2: 0, tb: 0}, tribunal: {g1: 0, g2: 0, tb: 0} },
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Todos']
        }
    },
    created() {
        bus.$on('cambiaJurisdiccion', (data) => {
            if(this.credenciales.tipo == 2){
                if(this.credenciales.jurisdiccion == 'Oral'){
                this.credenciales.cod_tribunal = 1244;
                this.credenciales.cod_corte = 90;
                this.credenciales.tribunal = '1º Tribunal de Juicio Oral en Lo Penal de Santiago';
                this.credenciales.corte = 'ICA Santiago';
                } else if(this.credenciales.jurisdiccion == 'Garantía'){
                this.credenciales.cod_tribunal = 1220;
                this.credenciales.cod_corte = 90;
                this.credenciales.tribunal = '1º Juzgado de Garantía de Santiago';
                this.credenciales.corte = 'ICA Santiago';
                }
            }
            //Pestaña Principal
            this.gstn.ppal.g1 += 1;
            this.gstn.ppal.g2 += 1;
            this.gstn.ppal.tb += 1;
            //Pestaña Corte
            this.gstn.corte.g1 += 1;
            this.gstn.corte.g2 += 1;
            this.gstn.corte.tb += 1;
            //Pestaña Tribunal
            this.gstn.tribunal.g1 += 1;
            this.gstn.tribunal.g2 += 1;
            this.gstn.tribunal.tb += 1;
            
            
            //CORTE
            this.corte_seleccionada = this.credenciales.corte;
            this.cod_corte_seleccionada = this.credenciales.cod_corte;
            this.dato_tc.totales = [];
            this.dato_tc.jdx = this.credenciales.jurisdiccion;
            this.dato_tc.cod_corte = this.credenciales.cod_corte;
            this.dato_tc.registros = [];
            this.dato_gg.jdx = this.credenciales.jurisdiccion;
            this.dato_gg.cod_corte = this.credenciales.cod_corte;
            this.dato_gg.data = [];
            this.dato_gci.jdx = this.credenciales.jurisdiccion;
            this.dato_gci.cod_corte = this.credenciales.cod_corte;
            this.dato_gci.data = [];
            
            //TRIBUNAL
            this.tribunal_seleccionado = this.credenciales.tribunal;
            this.cod_tribunal_seleccionado = this.credenciales.cod_tribunal;
            this.dato_tt.jdx = this.credenciales.jurisdiccion;
            this.dato_tt.cod_tribunal = this.credenciales.cod_tribunal;
            this.dato_tt.registros = [];
            this.dato_tt.totales = [];
            this.dato_ggd.jdx = this.credenciales.jurisdiccion;
            this.dato_ggd.cod_tribunal = this.credenciales.cod_tribunal;
            this.dato_ggd.data = [];
            this.dato_gti.jdx = this.credenciales.jurisdiccion;
            this.dato_gti.cod_tribunal = this.credenciales.cod_tribunal;
            this.dato_gti.data = [];
            //************************** */
            //LISTA TRIBUNAL
            this.tribunales = [];
            this.$http.post(api.listarTribunal, {
                tipo: this.credenciales.jurisdiccion
            }).then(respuesta => {
                return respuesta.json();
            })
            .then(respuestaJson => {
                respuestaJson.registros.forEach(inv => {
                this.tribunales.push({
                    name: inv.gls_tribunal,
                    id: inv.cod_tribunal
                })
                });
            });
        });

        this.$http.post(api.listarCorte, {
            tipo: this.credenciales.jurisdiccion
        }).then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
          respuestaJson.registros.forEach(inv => {
            this.cortes.push({
              name: inv.gls_corte,
              id: inv.cod_corte 
            })
          });
        });

        this.$http.post(api.listarTribunal, {
            tipo: this.credenciales.jurisdiccion
        }).then(respuesta => {
          return respuesta.json();
        })
        .then(respuestaJson => {
          respuestaJson.registros.forEach(inv => {
            this.tribunales.push({
              name: inv.gls_tribunal,
              id: inv.cod_tribunal
            })
          });
        });
    },
    methods: {
        seleccionaCorte(value){
            //Tabla
            this.dato_tc.registros = [];
            this.dato_tc.totales = [];
            
            this.$http.post(api.listarGestionCorte, {
                tipo: this.credenciales.jurisdiccion,
                corte: parseInt(value.id)
            }).then(respuesta => {
                return respuesta.json();
            })
            .then(respuestaJson => {
                respuestaJson.registros.forEach(inv => {
                    this.dato_tc.registros.push({
                        gls_tribunal: inv.gls_tribunal,
                        a_2015: inv.a_2015,
                        a_2016: inv.a_2016,
                        a_2017: inv.a_2017,
                        a_2018: inv.a_2018,
                        a_2019: inv.a_2019,
                        a_2020: inv.a_2020,
                        a_2021: 0,
                        a_total: parseInt(inv.a_2015) + parseInt(inv.a_2016) + parseInt(inv.a_2017) + parseInt(inv.a_2018) + parseInt(inv.a_2019) + parseInt(inv.a_2020) + 0 //modificar 2021 posteriormente
                    });
                });
                let aux = [];
                aux.push(this.dato_tc.registros.pop());
                aux.push(this.dato_tc.registros.pop());
                aux.push(this.dato_tc.registros.pop());
                this.dato_tc.totales.push(aux.pop());
                this.dato_tc.totales.push(aux.pop());
                this.dato_tc.totales.push(aux.pop());
            });

            //Grafico izquierdo
            this.dato_gg.data = [];
            this.$http.post(api.listarGestionCorteSeis, {
                tipo: this.credenciales.jurisdiccion,
                corte: parseInt(value.id)
            }).then(respuesta => {
                return respuesta.json();
            })
            .then(respuestaJson => {
                let aux = 0;
                let inventario = [];
                let textos = [];
                let cumplimiento = [];
                for (let index = 0; index < respuestaJson.registros.length; index++) {
                    if(index%3==0){
                        inventario.push(parseInt(respuestaJson.registros[index].total));
                        textos.push(this.meses[parseInt(respuestaJson.registros[index].mes)-1]);
                    } else if(index%3==1){
                        aux = parseInt(respuestaJson.registros[index].total);
                    } else {
                        cumplimiento.push((parseInt(respuestaJson.registros[index].total)/aux)*100);
                    }
                }
                this.dato_gg.data.push({
                    x: textos,
                    y: cumplimiento,
                    type: 'scatter',
                    name: '% Cumplimiento',
                    mode: 'lines+markers',
                    line: {
                        color: 'rgb(69,117,180)',
                        width: 1
                    }
                });
                this.dato_gg.data.push({
                    x: textos,
                    y: inventario,
                    type: 'scatter',
                    name: 'Causas Vigentes',
                    mode: 'lines+markers',
                    yaxis: 'y2',
                    line: {
                        color: 'rgb(215,48,39)',
                        width: 1
                    }
                });
            });

            //Grafico derecha
            this.dato_gci.data = [];
            this.$http.post(api.listarGestionCorte, {
                tipo: this.credenciales.jurisdiccion,
                corte: parseInt(value.id)
            }).then(respuesta => {
                return respuesta.json();
            })
            .then(respuestaJson => {
                let registros = [];
                respuestaJson.registros.forEach(inv => {
                    registros.push({
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
                aux = registros.pop();
                this.dato_gci.data.push({
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
                aux = registros.pop();
                this.dato_gci.data.push({
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
                aux = registros.pop();
                this.dato_gci.push({
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
        },
        
        seleccionaTribunal(value){
            //Tabla
            this.dato_tt.registros = [];
            this.dato_tt.totales = [];
            this.$http.post(api.listarGestionTribunal, {
                tipo: this.credenciales.jurisdiccion,
                tribunal: parseInt(value.id)
            }).then(respuesta => {
                return respuesta.json();
            })
            .then(respuestaJson => {
                respuestaJson.registros.forEach(inv => {
                    this.dato_tt.registros.push({
                        mes: this.meses[parseInt(inv.mes)-1],
                        a_2015: inv.a_2015,
                        a_2016: inv.a_2016,
                        a_2017: inv.a_2017,
                        a_2018: inv.a_2018,
                        a_2019: inv.a_2019,
                        a_2020: inv.a_2020,
                        a_2021: inv.a_2021,
                        a_total: parseInt(inv.a_2015) + parseInt(inv.a_2016) + parseInt(inv.a_2017) + parseInt(inv.a_2018) + parseInt(inv.a_2019) + parseInt(inv.a_2020) + parseInt(inv.a_2021) 
                    });
                });
                let aux = [];
                aux.push(this.dato_tt.registros.pop());
                aux.push(this.dato_tt.registros.pop());
                aux.push(this.dato_tt.registros.pop());
                this.dato_tt.totales.push(aux.pop());
                this.dato_tt.totales.push(aux.pop());
                this.dato_tt.totales.push(aux.pop());
            });

            //Grafico izquierda
            this.dato_ggd.data = [];
            this.$http.post(api.listarGestionTribunalSeis, {
                tipo: this.credenciales.jurisdiccion,
                tribunal: parseInt(value.id)
            }).then(respuesta => {
                return respuesta.json();
            })
            .then(respuestaJson => {
                let aux = 0;
                let inventario = [];
                let cumplimiento = [];
                let textos = [];
                for (let index = 0; index < respuestaJson.registros.length; index++) {
                    if(index%3==0){
                        inventario.push(parseInt(respuestaJson.registros[index].total));
                        textos.push(this.meses[parseInt(respuestaJson.registros[index].mes)-1]);
                    } else if(index%3==1){
                        aux = parseInt(respuestaJson.registros[index].total);
                    } else {
                        cumplimiento.push((parseInt(respuestaJson.registros[index].total)/aux)*100);
                    }
                }
                this.dato_ggd.data.push({
                    x: textos,
                    y: cumplimiento,
                    type: 'scatter',
                    name: '% Cumplimiento',
                    mode: 'lines+markers',
                    line: {
                        color: 'rgb(69,117,180)',
                        width: 1
                    }
                });
                this.dato_ggd.data.push({
                    x: textos,
                    y: inventario,
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

            //Grafico Derecha
            this.dato_gti.data = [];
            this.$http.post(api.listarGestionTribunal, {
                tipo: this.credenciales.jurisdiccion,
                tribunal: parseInt(value.id)
            }).then(respuesta => {
                return respuesta.json();
            })
            .then(respuestaJson => {
                let registros = [];
                respuestaJson.registros.forEach(inv => {
                    registros.push({
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
                aux = registros.pop();
                this.dato_gti.data.push({
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
                aux = registros.pop();
                this.dato_gti.data.push({
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
                aux = registros.pop();
                this.dato_gti.data.push({
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
}
</script>