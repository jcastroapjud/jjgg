import express from 'express';
import causasinventario from '../controllers/inventario';
import datografico from '../controllers/graficoinventario';
import datocategorico from '../controllers/categorico';
import gestioninventario from '../controllers/gestion';
import ginventario from '../controllers/graficogestion';
import usuariosis from '../controllers/usuario';

const router = express.Router();
router.post('/signup', causasinventario.signUp);

router.post('/signin', causasinventario.signIn);

router.post('/listartotalpivoteado', causasinventario.listarTotalPivoteado);

router.post('/listarcortepivoteado', causasinventario.listarTotalCortePivoteado);

router.post('/listartribunalpivoteado', causasinventario.listarTotalTribunalPivoteado);

router.post('/listartotal', causasinventario.listarTotal);

router.post('/listartotalmes', causasinventario.listarTotalMes);

router.post('/listarcortetotal', causasinventario.listarCorteTotal);

router.post('/listarcortetotalmes', causasinventario.listarCorteTotalMes);

router.post('/listartribunaltotal', causasinventario.listarTribunalTotal);

router.post('/listarhistoriconacional', datografico.historicoNacional_1);

router.post('/listarhistoriconacionalingreso', datografico.historicoNacionalIngreso);

router.post('/listarhistoriconacionalinventario', datografico.historicoNacionalInventario);

router.post('/listarhistoricocompleto', datografico.historicoCompleto);

router.post('/listarhistoricocortecompleto', datografico.historicoCorteCompleto);

router.post('/listarhistoricotribunalcompleto', datografico.historicoTribunalCompleto);

router.post('/listarcorte', datocategorico.listarCorte);

router.post('/listartribunal', datocategorico.listarTribunal);

router.post('/listarmateriatotal', datografico.listarMateriaTotalPivoteado);

router.post('/listarmateriacortetotal', datografico.listarMateriaCorteTotalPivoteado);

router.post('/listarmateriatribunaltotal', datografico.listarMateriaTribunalTotalPivoteado);

router.post('/listargestiontotal', gestioninventario.listarGestionTotalPivoteado);

router.post('/listargestioncorte', gestioninventario.listarGestionCortePivoteado);

router.post('/listargestiontribunal', gestioninventario.listarGestionTribunalPivoteado);

router.post('/listarginventariototal', ginventario.listarTotalGestionSeis);

router.post('/listarginventariocorte', ginventario.listarCorteGestionSeis);ginventario.listarTribunalGestionSeis

router.post('/listarginventariotribunal', ginventario.listarTribunalGestionSeis);

router.post('/listardetalleinventariotribunal', ginventario.listarDetallaTribunalGestionSeis);

router.post('/listarreducciontribunal', ginventario.listarReduccionTribunal);

router.post('/listarpromediotribunal', ginventario.tasaReduccionTribunal);

router.post('/registrarcompromiso', gestioninventario.registrarGestion);

router.post('/ultimomes', gestioninventario.ultimoMes);

router.post('/descripcionexante', gestioninventario.descripcionExante);

router.post('/descripcionexpost', gestioninventario.descripcionExpost);

router.post('/registrarexpost', gestioninventario.registrarExpost);

router.post('/checklogin', usuariosis.login);

module.exports = router;