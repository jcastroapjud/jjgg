<template>
  <div id="app" class="container-fluid">
    <div class="row" v-show="credenciales.login">
      <div class="container">
        <div class="card text-center">
          <div class="card-header">
            <h2>Sistema de Gestión de Causas Vigentes</h2>
          </div>
          <div class="card-body">
            <h5 class="card-title">Formulario de ingreso</h5>
            
            <div class="row">
              <div class="col-4"></div>
              <div class="col-4">
            
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Nombre de Usuario</label>
                  <input type="text" class="form-control" id="usuario" v-model="usuario">
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="password">
                </div>
                <div class="mb-3">
                  <button type="submit" class="btn btn-primary" v-on:click="ingresar()">Ingresar</button>
                </div>
                
              </div>
              <div class="col-4"></div>
            </div>

            <modal name="nologin" :widht="200" :height="50" :adaptive="true">
                <div class="container">
                    <div class="col-12 d-grid">
                        <h4>Credenciales no válidas para el ingreso</h4>
                    </div>
                </div>
            </modal>

          </div>
          <div class="card-footer text-muted">
            <center>DDI</center>
          </div>
        </div>
      </div>

          
    </div>
    <div class="row" v-show="!credenciales.login">
      <barra :credenciales="credenciales"></barra>
    </div>
    <div class="row" v-show="!credenciales.login">
      <div class="col-2">
        <lateral :credenciales="credenciales"></lateral>
      </div>
      <div class="col-10">
        <router-view :credenciales="credenciales"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Titulo from './Views/Causas.vue'
import Barra from './Views/Barra.vue'
import Lateral from './Views/Lateral.vue'
import api from './api/api'
import { bus } from './main'

export default {
  components: {
    Titulo,
    Barra,
    Lateral
  },
  data(){
    return {
      titulo: 'Gestión de Causas Penales',
      login: true,
      usuario: '',
      password: '',
      credenciales: { 
        login: true,
        cod_tribunal : 0,
        tipo : 0,
        jurisdiccion : '',
        cod_corte : 0,
        corte : '',
        tribunal: ''
      }
    }
  },
  created() {
    bus.$on('limpia', (valor) => {
      this.$router.push({ name: 'inventario' });
    });
  },
  methods: {
    ingresar() {
      this.$http.post(api.verificalogin, {
          usuario: this.usuario,
          password: this.password
      }).then(respuesta => {
          return respuesta.json();
      })
      .then(respuestaJson => {
          if(respuestaJson.respuesta){
            respuestaJson.credencial.forEach(element => {
                this.credenciales.cod_tribunal = element.tribunal;
                this.credenciales.tipo = element.tipo;
                this.credenciales.jurisdiccion = element.jurisdiccion;
                this.credenciales.cod_corte = element.cod_corte;
                this.credenciales.corte = element.gls_corte;
                this.credenciales.tribunal = element.gls_tribunal;
                this.credenciales.login = false;
                bus.$emit('cambiaJurisdiccion', element.jurisdiccion);
            });
          } else {
            this.usuario = '';
            this.password = '';
            this.$modal.show('nologin');
          }
      });
    }
  }
}
</script>