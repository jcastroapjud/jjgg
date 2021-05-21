<template>
    <table class="table table-striped table-hover table-sm align-middle">
        <thead>
            <tr>
                <th scope="col">Corte</th>
                <th scope="col">Tribunal</th>
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
                <td v-if="index%3==0" rowspan="3">{{cau.gls_corte}}</td>
                <td v-if="index%3==0" rowspan="3">Todos</td>
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

            <tr v-for="(cau, index) in totales"
                :key="cau"
                :index="index" class='table-dark'>
                <td v-if="index%3==0" rowspan="3">{{cau.gls_corte}}</td>
                <td v-if="index%3==0" rowspan="3">Todos</td>
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
        </tbody>
    </table>
</template>

<script>
import api from '../api/api'
export default {
    data(){
        return{
            registros: [],
            totales: []
        }
    },
    props: ['jdx'],
    created(){
        this.$http.post(api.listarGestionTotal, {
            tipo: this.jdx
        }).then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJson => {
            respuestaJson.registros.forEach(inv => {
                this.registros.push({
                    gls_corte: inv.gls_corte,
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
            aux.push(this.registros.pop());
            aux.push(this.registros.pop());
            aux.push(this.registros.pop());
            this.totales.push(aux.pop());
            this.totales.push(aux.pop());
            this.totales.push(aux.pop());
        })
    }
}
</script>