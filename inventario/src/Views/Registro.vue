<template>
    <div class="col-12">
        <br>
        <div class="row" v-show="credenciales.tipo == 1">
            <div class="12">
                <formulario :dato_fm="dato_fm"></formulario>
            </div>
        </div>
        <div class="row" v-show="credenciales.tipo == 2">
            <div class="col-12">
                <v-select label="name" :options="tribunales" @input="seleccionaTribunal" v-model="tribunal_seleccionado"></v-select>
            </div>
        </div>
        <div class="row">
            <div class="col-7">
                <graficor :dato_fm="dato_fm" :key="red_inv"></graficor>
            </div>
            <div class="col-5">
                <graficorr :dato_fm="dato_fm" :key="tas_red"></graficorr>
            </div>
        </div>
        <div class="row">
          <tablar :dato_fm="dato_fm" :key="tab_trb"></tablar>
        </div>
    </div>
</template>

<script>
import Tablar from '../components/Tablar.vue'
import Graficor from '../components/Graficor.vue'
import Graficorr from '../components/Graficorr.vue'
import Formulario from '../components/Formulario.vue'
import 'vue-select/dist/vue-select.css'
import api from '../api/api'
import { bus } from '../main'

export default {
    name: 'Registro',
    props: ['credenciales'],
    components: {
        Tablar,
        Graficor,
        Graficorr,
        Formulario
    },
    data () {
        return {
            red_inv: 0,
            tas_red: 0,
            tab_trb: 0,
            tribunales: [],
            tribunal_seleccionado: this.credenciales.tribunal,
            cod_tribunal: this.credenciales.cod_tribunal,
            dato_fm: { cod_tribunal: this.credenciales.cod_tribunal, jdx: this.credenciales.jurisdiccion, tipo: this.credenciales.tipo }
        }
    },
    created () {
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
            this.tribunal_seleccionado = this.credenciales.tribunal;
            this.dato_fm.jdx = this.credenciales.jurisdiccion;
            this.dato_fm.cod_tribunal = this.credenciales.cod_tribunal;
            this.dato_fm.tipo = 2;

            this.red_inv += 1;
            this.tas_red += 1;
            this.tab_trb += 1;

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
        seleccionaTribunal(value) {
            this.dato_fm.cod_tribunal = parseInt(value.id);
            this.red_inv += 1;
            this.tas_red += 1;
            this.tab_trb += 1;
        }
    }
}
</script>