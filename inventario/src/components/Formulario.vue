<template>
    <div class="row" v-if="current.getMonth() != ultimo_mes">
        <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-4 col-form-label">Compromiso para {{meses[current.getMonth()]}} {{current.getFullYear()}}</label>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="2015" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="2016" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="2017" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="2018" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="2019" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="2020" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="2021" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="Total" style="text-align:center;">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-4 col-form-label">Causas vigentes</label>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="ultimo.a_2015" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="ultimo.a_2016" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="ultimo.a_2017" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="ultimo.a_2018" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="ultimo.a_2019" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="ultimo.a_2020" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="ultimo.a_2021" style="text-align:center;">
            </div>
            <div class="col-sm-1">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="ultimo.a_total" style="text-align:center;">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-4 col-form-label">Compromiso</label>
            <div class="col-sm-1">
                <input type="number" class="form-control" style="text-align:center;" id="a_2015" v-model="a_2015" required>
            </div>
            <div class="col-sm-1">
                <input type="number" class="form-control" style="text-align:center;" id="a_2016" v-model="a_2016" required>
            </div>
            <div class="col-sm-1">
                <input type="number" class="form-control" style="text-align:center;" id="a_2017" v-model="a_2017" required>
            </div>
            <div class="col-sm-1">
                <input type="number" class="form-control" style="text-align:center;" id="a_2018" v-model="a_2018" required>
            </div>
            <div class="col-sm-1">
                <input type="number" class="form-control" style="text-align:center;" id="a_2019" v-model="a_2019" required>
            </div>
            <div class="col-sm-1">
                <input type="number" class="form-control" style="text-align:center;" id="a_2020" v-model="a_2020" required>
            </div>
            <div class="col-sm-1">
                <input type="number" class="form-control" style="text-align:center;" id="a_2021" v-model="a_2021" required>
            </div>
            <div class="col-sm-1">
                <input type="number" disabled class="form-control" style="text-align:center;" id="a_total" :value="parseInt(a_2015) + parseInt(a_2016) + parseInt(a_2017) + parseInt(a_2018) + parseInt(a_2019) + parseInt(a_2020) + parseInt(a_2021)">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Observaciones al compromiso (1.000 letras máximo)</label>
            <textarea maxlength='1000' class="form-control" rows="3" id="a_descripcion" v-model="a_descripcion"></textarea>
        </div>
        <div class="mb-3 row">
            <a class="btn btn-primary" v-on:click="muestra" role="button">Registrar compromiso</a>
        </div>

        <modal name="example" :widht="300" :height="220" :adaptive="true">
            <div class="container">
                <div class="row">
                    <br>
                    <h4>¿Está seguro que desea registrar este compromiso? </h4>
                    <br>
                    <p>Este compromiso aplica para el último día del mes comprometido</p>
                    <p>Debe corroborar los datos aquí ingresados antes de registrarlos, ya que no será posible editarlos una vez registrados.</p>
                </div>
                <div class="row">
                    <div class="col-6 d-grid">
                        <button type="button" class="btn btn-outline-danger" v-on:click="cancelar">Cancelar</button>
                    </div>
                    <div class="col-6 d-grid">
                        <button type="button" class="btn btn-outline-success" v-on:click="registrar">Registrar</button>
                    </div>
                </div>
            </div>
            
        </modal>

        <modal name="exito" :widht="200" :height="50" :adaptive="true">
            <div class="container">
                <div class="col-12 d-grid">
                    <button type="button" class="btn btn-outline-success" v-on:click="recargar">Registro Exitoso</button>
                </div>
            </div>
        </modal>

        <modal name="fracaso" :widht="200" :height="50" :adaptive="true">
            <div class="container">
                <div class="col-12 d-grid">
                    <button type="button" class="btn btn-outline-danger" v-on:click="recargar">Ocurrió un problema, vuelva a intentarlo.</button>
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
            a_2015: 0,
            a_2016: 0,
            a_2017: 0,
            a_2018: 0,
            a_2019: 0,
            a_2020: 0,
            a_2021: 0,
            a_total: 0,
            a_descripcion: '',
            ultimo_mes: 13,
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Todos'],
            ultimo: [],
            registros: [],
            current: new Date()
        }
    },
    created() {
        var now = new Date();
        if (now.getMonth() == 11) {
            this.current = new Date(now.getFullYear() + 1, 0, 0);
        } else {
            this.current = new Date(now.getFullYear(), now.getMonth() + 2, 0);
            console.log(this.current);
        }


        this.$http.post(api.ultimoMes, {
            tribunal: this.dato_fm.cod_tribunal
        }).then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            respuestaJson.mes.forEach(element => {
                this.ultimo_mes = parseInt(element.mes)-1;
            });
        })

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
            let aux = [];
            aux.push(this.registros.pop());
            aux.push(this.registros.pop());
            this.ultimo = this.registros.pop();
        })
    },
    methods: {
        muestra(){   
            this.$modal.show('example');
        },
        cancelar(){
            this.$modal.hide('example');
        },
        registrar(){
            this.$http.post(api.registrarCompromiso, {
                tipo: this.dato_fm.jdx,
                tribunal: this.dato_fm.cod_tribunal,
                a_2015: this.a_2015,
                a_2016: this.a_2016,
                a_2017: this.a_2017,
                a_2018: this.a_2018,
                a_2019: this.a_2019,
                a_2020: this.a_2020,
                a_2021: this.a_2021,
                fecha: this.current,
                a_descripcion: this.a_descripcion
            }).then(respuesta => {
                return respuesta.json();
            }).then(respuestaJson => {
                if(respuestaJson.mensaje == 'Registro exitoso'){
                    this.$modal.hide('example');
                    this.$modal.show('exito');
                } else {
                    this.$modal.hide('example');
                    this.$modal.show('fracaso');
                }
            })
        },
        recargar() {
            location.reload();
        }
    }
}
</script>