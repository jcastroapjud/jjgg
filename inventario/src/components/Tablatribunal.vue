<template>
    <table class="table table-striped table-hover table-sm">
        <thead>
            <tr>
                <th scope="col">Mes</th>
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
            <tr v-for="(cau, index) in tdato.causas"
                :key="cau"
                :index="index" >
                <td>{{cau.mes}}</td>
                <td class="text-center">{{cau.a_2015}}</td>
                <td class="text-center">{{cau.a_2016}}</td>
                <td class="text-center">{{cau.a_2017}}</td>
                <td class="text-center">{{cau.a_2018}}</td>
                <td class="text-center">{{cau.a_2019}}</td>
                <td class="text-center">{{cau.a_2020}}</td>
                <td class="text-center">{{cau.a_2021}}</td>
                <td class="text-center">{{cau.a_total}}</td>
            </tr>
            <tr v-for="(tot, index) in tdato.totales"
                :key="tot"
                :index="index" class='table-dark'>
                <td>Total</td>
                <td class="text-center">{{tot.a_2015}}</td>
                <td class="text-center">{{tot.a_2016}}</td>
                <td class="text-center">{{tot.a_2017}}</td>
                <td class="text-center">{{tot.a_2018}}</td>
                <td class="text-center">{{tot.a_2019}}</td>
                <td class="text-center">{{tot.a_2020}}</td>
                <td class="text-center">{{tot.a_2021}}</td>
                <td class="text-center">{{tot.a_total}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import api from '../api/api'
export default {
    props: ['tdato'],
    data(){
        return{
            causas: [],
            totales: [],
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Todos']
        }
    },
    created(){
        this.$http.post(api.inventarioTribunalPivot, {
            tipo: this.tdato.jdx,
            tribunal: this.tdato.cod_tribunal
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
        })
    }
}
</script>