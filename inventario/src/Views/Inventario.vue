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
                <div class="col-6">
                  <grafico :jdx="credenciales.jurisdiccion" :key="ivtr.ppal.g1"></grafico>
                </div>
                <div class="col-6">
                  <graficoi :jdx="credenciales.jurisdiccion" :key="ivtr.ppal.g2"></graficoi>
                </div>
              </div>
              <div class="row">
                <tabla :jdx="credenciales.jurisdiccion" :key="ivtr.ppal.tb"></tabla>
              </div>

            </div>

            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

              <div class="row">
                <div class="col-12">
                  <v-select label="name" :options="cortes" @input="seleccionaCorte" v-model="corte_seleccionada"></v-select>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <graficocorte :gdato="gdato" :key="ivtr.corte.g1"></graficocorte>
                </div>
                <div class="col-6">
                  <graficoicorte :ggdato="ggdato" :key="ivtr.corte.g2"></graficoicorte>
                </div>
              </div>
              <div class="row">
                <tablacorte :cdato="cdato" :key="ivtr.corte.tb"></tablacorte>
              </div>
            </div>

            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
              <div class="row">
                <div class="col-12">
                  <v-select label="name" :options="tribunales" @input="seleccionaTribunal" v-model="tribunal_seleccionado"></v-select>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <graficotribunal :tgdato="tgdato" :key="ivtr.tribunal.g1"></graficotribunal>
                </div>
                <div class="col-6">
                  <graficoitribunal :ttdato="ttdato" :key="ivtr.tribunal.g2"></graficoitribunal>
                </div>
              </div>
              <div class="row">
                <tablatribunal :tdato="tdato" :key="ivtr.tribunal.g1"></tablatribunal>
              </div>
            </div>
          </div>

        </div>
        
    </div>
</template>

<script>
import Tabla from '../components/Tabla'
import Tablacorte from '../components/Tablacorte'
import Tablatribunal from '../components/Tablatribunal'
import Botonera from '../components/Botonera'
import Grafico from '../components/Grafico.vue'
import Graficoi from '../components/Graficoi.vue'
import Graficocorte from '../components/Graficocorte.vue'
import Graficotribunal from '../components/Graficotribunal'
import Graficoicorte from '../components/Graficoicorte'
import Graficoitribunal from '../components/Graficoitribunal'
import 'vue-select/dist/vue-select.css'
import api from '../api/api'
import { bus } from '../main'

export default {
  name: 'Inventario',
  props: ['credenciales'],
  components: {
    Tabla,
    Tablacorte,
    Tablatribunal,
    Botonera,
    Grafico,
    Graficoi,
    Graficocorte,
    Graficotribunal,
    Graficoicorte,
    Graficoitribunal
  },
  data(){
    return {
      cortes: [],
      tribunales: [],
      corte_seleccionada: this.credenciales.corte,
      tribunal_seleccionado: this.credenciales.tribunal,
      cod_corte_seleccionada: this.credenciales.cod_corte,
      jurx: this.credenciales.jurisdiccion,
      cod_tribunal_seleccionado: this.credenciales.cod_tribunal,
      cdato: {causas: [], totales: [], jdx: this.credenciales.jurisdiccion, cod_corte: this.credenciales.cod_corte},
      gdato: {data: [], jdx: this.credenciales.jurisdiccion, cod_corte: this.credenciales.cod_corte},
      ggdato: {jdx: this.credenciales.jurisdiccion, cod_corte: this.credenciales.cod_corte, data: [{
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
      ]},
      tdato: {causas: [], totales: [], jdx: this.credenciales.jurisdiccion, cod_tribunal: this.credenciales.cod_tribunal},
      tgdato: {data: [], jdx: this.credenciales.jurisdiccion, cod_tribunal: this.credenciales.cod_tribunal},
      ttdato: {jdx: this.credenciales.jurisdiccion, cod_tribunal: this.credenciales.cod_tribunal, data: [{
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
      ]},
      ivtr: { ppal: {g1: 0, g2: 0, tb: 0}, corte: {g1: 0, g2: 0, tb: 0}, tribunal: {g1: 0, g2: 0, tb: 0} },
      meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Todos']
    }
  },
  created(){
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
      this.ivtr.ppal.g1 += 1;
      this.ivtr.ppal.g2 += 1;
      this.ivtr.ppal.tb += 1;
      //Pestaña Corte
      this.ivtr.corte.g1 += 1;
      this.ivtr.corte.g2 += 1;
      this.ivtr.corte.tb += 1;
      //Pestaña Tribunal
      this.ivtr.tribunal.g1 += 1;
      this.ivtr.tribunal.g2 += 1;
      this.ivtr.tribunal.tb += 1;
      //Select tribunal
      this.selec_tribunal += 1;
      //JURISDICCION
      this.jurx = this.credenciales.jurisdiccion;
      //CORTE
      this.corte_seleccionada = this.credenciales.corte;
      this.cod_corte_seleccionada = this.credenciales.cod_corte;
      this.gdato.jdx = this.credenciales.jurisdiccion;
      this.gdato.cod_corte = this.credenciales.cod_corte;
      this.gdato.data = [];
      this.cdato.jdx = this.credenciales.jurisdiccion;
      this.cdato.cod_corte = this.credenciales.cod_corte;
      this.cdato.causas = [];
      this.cdato.totales = [];
      this.ggdato.jdx = this.credenciales.jurisdiccion;
      this.ggdato.cod_corte = this.credenciales.cod_corte;
      this.ggdato.data = [{
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
      ];
      //TRIBUNAL
      this.tribunal_seleccionado = this.credenciales.tribunal;
      this.cod_tribunal_seleccionado = this.credenciales.cod_tribunal;
      this.tgdato.jdx = this.credenciales.jurisdiccion;
      this.tgdato.cod_tribunal = this.credenciales.cod_tribunal;
      this.tgdato.data = [];
      this.tdato.jdx = this.credenciales.jurisdiccion;
      this.tdato.cod_tribunal = this.credenciales.cod_tribunal;
      this.tdato.causas = [];
      this.tdato.totales = [];
      this.ttdato.jdx = this.credenciales.jurisdiccion;
      this.ttdato.cod_tribunal = this.credenciales.cod_tribunal;
      this.ttdato.data = [{
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
      ];
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
            tipo: this.jurx
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
    seleccionaCorte(value) {
      this.cdato.causas = [];
      this.cdato.totales = [];
      this.gdato = {data: [], jdx: this.credenciales.jurisdiccion, cod_corte: parseInt(value.id)};
      this.ggdato.data[0].x = [];
      this.ggdato.data[0].y = [];
      this.ggdato.data[0].text = [];

      this.$http.post(api.inventarioCortePivot, {
          tipo: this.credenciales.jurisdiccion,
          corte: parseInt(value.id)
      }).then(respuesta => {
          return respuesta.json();
      })
      .then(respuestaJson => {
          respuestaJson.registros.forEach(inv => {
              this.cdato.causas.push({
                  gls_tribunal: inv.gls_tribunal,
                  a_2015: inv.a_2015,
                  a_2016: inv.a_2016,
                  a_2017: inv.a_2017,
                  a_2018: inv.a_2018,
                  a_2019: inv.a_2019,
                  a_2020: inv.a_2020,
                  a_2021: '0',
                  a_total: parseInt(inv.a_2015) + parseInt(inv.a_2016) + parseInt(inv.a_2017) + parseInt(inv.a_2018) + parseInt(inv.a_2019) + parseInt(inv.a_2020) + 0 //modificar 2021 posteriormente
              });    
          });
          this.cdato.totales.push(this.cdato.causas.pop());
      });

      this.$http.post(api.historicoCorteCompleto, {
            tipo: this.credenciales.jurisdiccion,
            corte: parseInt(value.id)
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
                    name: 'Causas Vigentes',
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

        this.$http.post(api.listarMateriaCorteTotal, {
            tipo: this.credenciales.jurisdiccion,
            corte: parseInt(value.id)
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
    },

    seleccionaTribunal(value) {
      this.tdato.causas = [];
      this.tdato.totales = [];
      this.tgdato.data = [];
      this.ttdato.data[0].x = [];
      this.ttdato.data[0].y = [];
      this.ttdato.data[0].text = [];

      this.$http.post(api.inventarioTribunalPivot, {
          tipo: this.credenciales.jurisdiccion,
          tribunal: parseInt(value.id)
      }).then(respuesta => {
          return respuesta.json();
      })
      .then(respuestaJson => {
          respuestaJson.registros.forEach(inv => {
              this.tdato.causas.push({
                  mes: this.meses[parseInt(inv.mes)-1],
                  a_2015: inv.a_2015,
                  a_2016: inv.a_2016,
                  a_2017: inv.a_2017,
                  a_2018: inv.a_2018,
                  a_2019: inv.a_2019,
                  a_2020: inv.a_2020,
                  a_2021: '0',
                  a_total: parseInt(inv.a_2015) + parseInt(inv.a_2016) + parseInt(inv.a_2017) + parseInt(inv.a_2018) + parseInt(inv.a_2019) + parseInt(inv.a_2020) + 0 //modificar 2021 posteriormente
              });    
          });
          this.tdato.totales.push(this.tdato.causas.pop());
      });
      
      this.$http.post(api.historicoTribunalCompleto, {
            tipo: this.credenciales.jurisdiccion,
            tribunal: parseInt(value.id)
        }).then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            let rgb = 'rgb(217,217,217)';
            respuestaJson.historico.forEach(inv => {
                this.tgdato.data.push({
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
                this.tgdato.data.push({
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
                this.tgdato.data.push({
                    x: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                    y: [parseInt(inv.ene), parseInt(inv.feb), parseInt(inv.mar), parseInt(inv.abr), parseInt(inv.may), parseInt(inv.jun),
                        parseInt(inv.jul), parseInt(inv.ago), parseInt(inv.sep), parseInt(inv.oct), parseInt(inv.nov), parseInt(inv.dic)],
                    type: 'bar',
                    name: 'Causas Vigentes',
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
        
        this.$http.post(api.listarMateriaTribunalTotal, {
            tipo: this.credenciales.jurisdiccion,
            tribunal: parseInt(value.id)
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
}
</script>