<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Sistema de Gestión de Causas Vigentes</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <v-select label="tipo" :options="juri" @input="mostra" v-model="credenciales.jurisdiccion" v-show="credenciales.tipo == 2"></v-select>
      </div>
      
      <div>
        <button class="btn btn-outline-danger" v-on:click="salir">Salir</button>
      </div>
    </div>
  </nav>
</template>

<script>
import 'vue-select/dist/vue-select.css'
import { bus } from '../main'

export default {
  props: ['credenciales'],
  data() {
    return {
      juri: ['Oral', 'Garantía']
    }
  },
  methods: {
    salir(){
      this.credenciales.login = true,
      this.credenciales.cod_tribunal = 0;
      this.credenciales.tipo = 0;
      this.credenciales.jurisdiccion = '';
      this.credenciales.cod_corte = 0;
      this.credenciales.corte = '';
      this.credenciales.tribunal = '';
      bus.$emit('limpia', 1);
    },
    mostra(valor){
      bus.$emit('cambiaJurisdiccion', valor);
    }
  }
}
</script>