<template>
    <div class="container">
        <table class="table table-striped table-hover table-sm align-middle">
            <thead>
                <tr>
                    <th scope="col">Mes comprometido</th>
                    <th scope="col" class="text-center">Dimensión</th>
                    <th scope="col" class="text-center">2015</th>
                    <th scope="col" class="text-center">2016</th>
                    <th scope="col" class="text-center">2017</th>
                    <th scope="col" class="text-center">2018</th>
                    <th scope="col" class="text-center">2019</th>
                    <th scope="col" class="text-center">2020</th>
                    <th scope="col" class="text-center">2021</th>
                    <th scope="col" class="text-center">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cau, index) in registros"
                    :key="cau"
                    :index="index" >
                    <td v-if="index%3==0" rowspan="3">{{cau.mes}} 
                        <i class="bi bi-layout-text-sidebar" data-bs-toggle="tooltip" data-bs-placement="top" title="Observaciones previas a la fecha de cumplimiento" v-on:click="muestra(cau.ano, cau.mes_puro)"></i> 
                        <i class="bi bi-layout-text-sidebar-reverse" data-bs-toggle="tooltip" data-bs-placement="top" title="Observaciones posterior a la fecha de cumplimiento" v-on:click="muestra_post(cau.ano, cau.mes_puro)"></i></td>
                    <td v-if="index%3==0" class="text-center">Causas Vigentes</td>
                    <td v-if="index%3==1" class="text-center">Compromiso</td>
                    <td v-if="index%3==2" class="text-center">Cumplimiento</td>
                    <td class="text-center">{{cau.a_2015}}</td>
                    <td class="text-center">{{cau.a_2016}}</td>
                    <td class="text-center">{{cau.a_2017}}</td>
                    <td class="text-center">{{cau.a_2018}}</td>
                    <td class="text-center">{{cau.a_2019}}</td>
                    <td class="text-center">{{cau.a_2020}}</td>
                    <td class="text-center">{{cau.a_2021}}</td>
                    <td class="text-center">{{cau.a_total}}</td>
                </tr>

            <!--<tr v-for="(cau, index) in totales"
                    :key="cau"
                    :index="index" class='table-dark'>
                    <td v-if="index%3==0" rowspan="3">{{cau.mes}}</td>
                    <td v-if="index%3==0" class="text-center">Causas Vigentes</td>
                    <td v-if="index%3==1" class="text-center">Compromiso</td>
                    <td v-if="index%3==2" class="text-center">Cumplimiento</td>
                    <td class="text-center">{{cau.a_2015}}</td>
                    <td class="text-center">{{cau.a_2016}}</td>
                    <td class="text-center">{{cau.a_2017}}</td>
                    <td class="text-center">{{cau.a_2018}}</td>
                    <td class="text-center">{{cau.a_2019}}</td>
                    <td class="text-center">{{cau.a_2020}}</td>
                    <td class="text-center">{{cau.a_2021}}</td>
                    <td class="text-center">{{cau.a_total}}</td>
                </tr>-->
                
            </tbody>
        </table>

        <modal name="exante" :widht="200" :height="150" :adaptive="true">
            <div class="container">
                <div class="col-12 d-grid">
                    <h4>Observación previa al cumplimiento</h4>
                    <p>{{obs_exante}}</p>
                </div>
            </div>
        </modal>

        <modal name="error" :widht="200" :height="100" :adaptive="true">
            <div class="container">
                <div class="col-12 d-grid">
                    <h4>Error al ingreso</h4>
                    <p>Por favor vuelva a intentarlo más tarde.</p>
                </div>
            </div>
        </modal>

        <modal name="expost" :widht="300" :height="300" :adaptive="true">
            <div class="container">
                <div class="col-12 d-grid" v-if="cond_fecha == 1">
                    <h4>Aun no puede ingresar este comentario</h4>
                    <p>Podrá ingresar un comentario una vez finalizado el último día del mes comprometido</p>
                </div>
                <div class="col-12 d-grid" v-if="cond_fecha == 2">
                    <h5>Ingrese una observación al cumplimiento de este mes</h5>
                    <label for="exampleFormControlTextarea1" class="form-label">Observación (1000 letras máximo)</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="obs_expost"></textarea>
                    <br>
                    <div class="row">
                        <div class="col-6 d-grid">
                            <button class="btn btn-outline-danger" type="button" v-on:click="cancelar">Cancelar</button>
                        </div>
                        <div class="col-6 d-grid">
                            <button class="btn btn-outline-success" type="button" v-on:click="guardar">Guardar</button>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-grid" v-if="cond_fecha == 0">
                    <h4>Observación posterior al cumplimiento</h4>
                    <p>{{expost}}</p>
                </div>
            </div>
        </modal>

    </div>
    
</template>

<script>
import api from '../api/api'
export default {
    props: ['dato_fm'],
    data() {
        return {
            registros: [],
            totales: [],
            obs_exante: '',
            cond_fecha: 0,
            obs_expost: '',
            expost: '',
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Todos'],
            fecha_registro: {mes: 0, ano: 0}
        }
    },
    created() {
        this.$http.post(api.listarDetalleGestionTribunalSeis, {
            tipo: this.dato_fm.jdx,
            tribunal: this.dato_fm.cod_tribunal
        }).then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            let aux_mes = 0;
            respuestaJson.registros.forEach(inv => {
                if(parseInt(inv.año) == 2100) aux_mes = 13;
                else aux_mes = parseInt(inv.mes)
                this.registros.push({
                    mes: this.meses[parseInt(aux_mes)-1],
                    mes_puro: inv.mes,
                    ano: inv.año,
                    a_2015: inv.a_2015,
                    a_2016: inv.a_2016,
                    a_2017: inv.a_2017,
                    a_2018: inv.a_2018,
                    a_2019: inv.a_2019,
                    a_2020: inv.a_2020,
                    a_2021: inv.a_2021,
                    a_total: inv.total
                });
            });
        })
    },
    methods: {
        muestra(ano, mes) {
            this.obs_exante = '';
            var fec = new Date(parseInt(ano), parseInt(mes), 0);
            this.$http.post(api.observacionExante, {
                tribunal: this.dato_fm.cod_tribunal,
                fecha: fec
            }).then(respuesta => {
                return respuesta.json();
            })
            .then(respuestaJson => {
                respuestaJson.desc.forEach(element => {
                    this.obs_exante = element.desc_exante;
                });
                this.$modal.show('exante');
            });
        },
        muestra_post(ano, mes) {
            this.obs_expost = '';
            var now = new Date();
            var comp = new Date(parseInt(ano), parseInt(mes), 0);
            if(now < comp){
                this.cond_fecha = 1;
            } else {
                this.$http.post(api.observacionExpost, {
                    tribunal: this.dato_fm.cod_tribunal,
                    fecha: comp
                })
                .then(respuesta => {
                    return respuesta.json();
                })
                .then(respuestaJson => {
                    if(respuestaJson.nulo === true && this.dato_fm.tipo == 1){
                        this.cond_fecha = 2;
                    } else {
                        respuestaJson.desc.forEach(element => {
                            this.expost = element.desc_expost
                        });
                        this.cond_fecha = 0;
                    }
                });
                this.cond_fecha = 0;
            }
            this.fecha_registro.mes = mes;
            this.fecha_registro.ano = ano;
            this.$modal.show('expost');
        },
        guardar() {
            var fec = new Date(parseInt(this.fecha_registro.ano), parseInt(this.fecha_registro.mes), 0);
            this.$http.post(api.registrarExpost, {
                tribunal: this.dato_fm.cod_tribunal,
                fecha: fec,
                descripcion: this.obs_expost
            }).then(respuesta => {
                return respuesta.json();
            })
            .then(respuestaJson => {
                let x = 1;
                respuestaJson.registro.forEach(element => {
                    x = element.registro;
                });
                if (x == 0) {
                    this.$modal.hide('expost');
                    this.$modal.show('error');    
                } else {
                    this.$modal.hide('expost');
                }
            });
        },
        cancelar() {
            this.$modal.hide('expost');
        }
     }
}
</script>