<template>
    <table class="table table-striped table-hover table-sm align-middle">
        <thead>
            <tr>
                <th scope="col">Mes</th>
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
            <tr v-for="(cau, index) in dato_tt.registros"
                :key="cau"
                :index="index" >
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
            </tr>

            <tr v-for="(cau, index) in dato_tt.totales"
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
            totales: [],
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Todos']
        }
    },
    props: ['dato_tt'],
    created(){
        this.$http.post(api.listarGestionTribunal, {
            tipo: this.dato_tt.jdx,
            tribunal: this.dato_tt.cod_tribunal
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
        })
    }
}
</script>