<template>
    <div class="list-group">
        <router-link tag="a" class="list-group-item list-group-item-action" :to="{name: 'inventario'}">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Causas Vigentes</h5>
            </div>
            <small>En esta sección se puede observar el estado actual de las causas pendientes a nivel nacional, jurisdiccional y por tribunal.</small>
        </router-link>
        <router-link tag="a" class="list-group-item list-group-item-action" :to="{name:'gestion'}">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Gestión de Causas Vigentes</h5>
            </div>            
            <small class="text-muted">En esta sección puede observar el avance en el término de causas y el cumplimiento de los planes de acción.</small>
        </router-link>
        <router-link tag="a" class="list-group-item list-group-item-action" :to="{name: 'registro'}">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Registro de Planes</h5>
            </div>
            <small class="text-muted">En esta sección, los tribunales pueden comprometer, mensualmente los avances que esperan a dos meses plazo.</small>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['jurisdiccion'],
    data() {
        return {

        }
    }
}
</script>