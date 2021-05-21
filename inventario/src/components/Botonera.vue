<template>
    <div class="row">
        <div class="col-9">
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1">Nacional</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio2">Corte de Apelaciones</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio3">Tribunal</label>
            </div>
        </div>
        <div class="col-3">
            <div class="input-group mb-3">
                <select class="form-select" id="inputGroupSelect01">
                    <option selected>Seleccione...</option>
                    <option value="1">Corte de Apelaciones de Arica</option>
                    <option value="1">Corte de Apelaciones de Iquique</option>
                    <option value="1">Corte de Apelaciones de Antofagasta</option>
                    <option value="1">Corte de Apelaciones de Copiapó</option>
                    <option value="1">Corte de Apelaciones de La Serena</option>
                    <option value="1">Corte de Apelaciones de Santiago</option>
                    <option value="1">Corte de Apelaciones de San Miguel</option>
                    <option value="1">Corte de Apelaciones de Valparaíso</option>
                    <option value="1">Corte de Apelaciones de Rancagua</option>
                    <option value="1">Corte de Apelaciones de Talca</option>
                    <option value="1">Corte de Apelaciones de Chillán</option>
                    <option value="1">Corte de Apelaciones de Concepción</option>
                    <option value="1">Corte de Apelaciones de Temuco</option>
                    <option value="1">Corte de Apelaciones de Valdivia</option>
                    <option value="1">Corte de Apelaciones de Puerto Montt</option>
                    <option value="1">Corte de Apelaciones de Coyhaique</option>
                    <option value="1">Corte de Apelaciones de Punta Arenas</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>