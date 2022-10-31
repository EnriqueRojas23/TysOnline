import { Injectable, ViewEncapsulation } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Incidencia, Documento } from '../../_models/Seguimiento/incidencia';
import { Cliente, DespachosATiempo, kpiestados, ManifiestosPendientes, OrdenTransporte, RetornoDocumetario, Ubigeo, ValorTabla } from 'src/app/_models/Seguimiento/ordentransporte';
import { EquipoTransporte } from 'src/app/_models/Mantenimiento/equipotransporte';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { CalendarEventModel } from 'src/app/_models/CalendarModel';
import { Cuadrilla, Departamento, GuiaRemisionBlanco, Provincia, SustentoResult } from 'src/app/_models/Seguimiento/guiaremisionblanco';




const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
};
const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

const httpOptionsUpload = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
  })
  // , observe: 'body', reportProgress: true };
};

@Injectable({
  providedIn: 'root'
})

export class OrdenTransporteService {
  baseUrl = environment.baseUrl + '/api/seguimiento/';
constructor(private http: HttpClient) { }


uploadFile(formData: FormData, UserId: number, ClienteId: number) : any {
  return this.http.post(this.baseUrl + 'UploadFile?usrid=' + UserId.toString() + '&idcliente=' + ClienteId
 , formData
 , httpOptionsUpload
);
}

procesar(id, idcliente): any {

  let  model: any  = {};
  model.cargaid = id;
  model.idcliente = idcliente;

    return this.http.post(this.baseUrl + 'procesarCargaMasiva', model , httpOptions);



}



downloadPlantilla(): any {

  this.http.get(this.baseUrl + 'DownloadPlantilla', {headers, responseType: 'blob' as 'json'}).subscribe(
       (response: any) => {
           const dataType = response.type;
           const binaryData = [];
           binaryData.push(response);
           const downloadLink = document.createElement('a');
           downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
           // document.body.appendChild(downloadLink);
           // downloadLink.click();
           window.open(downloadLink.href);
       }
     );
     }

getClientes(criterio): Observable<Cliente[]> {
  return this.http.get<Cliente[]>(this.baseUrl + 'GetAllClients?idscliente=' + criterio   , httpOptions);
}
getDestinatarios(idcliente: number): Observable<Cliente[]> {
  return this.http.get<Cliente[]>(this.baseUrl + 'GetAllDestinatarios?idcliente=' + idcliente   , httpOptions);
}

GetAllPorEstado(idcliente: string, iddestino: string): Observable<kpiestados[]> {
  if(idcliente === '0') { idcliente = ''; }
  if(iddestino === '0') { iddestino = ''; }



  return this.http.get<kpiestados[]>(this.baseUrl + 'GetAllPorEstado?idcliente=' + idcliente + '&iddestino=' + iddestino   , httpOptions);
}

GetDespachosATiempo(id: string, fec_ini: string, fec_fin: string) {
 if (id === "0") {
   id = "";
 }

  return this.http.get<DespachosATiempo[]>(this.baseUrl + 'GetDespachosATiempo?idcliente=' + id
   + '&fec_ini=' + fec_ini + '&fec_fin=' + fec_fin, httpOptions );
 }
 GetRetornoDocumentario(id: string, fec_ini: string, fec_fin: string) {
  if (id === "0") {
    id = "";
  }

   return this.http.get<RetornoDocumetario[]>(this.baseUrl + 'GetRetornoDocumentario?idcliente=' + id
    + '&fec_ini=' + fec_ini + '&fec_fin=' + fec_fin , httpOptions );
  }

  GetReportePendientes(id: string, fec_ini: string, fec_fin: string) {
   if(id === undefined)
       id = '';
     return this.http.get<ManifiestosPendientes[]>(this.baseUrl + 'getAllManifiestosPorEstado?idestado=' + id
      + '&fec_ini=' + fec_ini + '&fec_fin=' + fec_fin  , httpOptions );
    }

  GetReportePendientesIngresos(numcp: string) {
      return this.http.get<ManifiestosPendientes[]>(this.baseUrl + 'getAllPendientesIngreso?numcp=' + numcp , httpOptions );
  }

  GetReportePendientesDespachos(numcp: string) {
    return this.http.get<ManifiestosPendientes[]>(this.baseUrl + 'getAllPendientesDespacho?numcp=' + numcp , httpOptions );
  }


 GetDespachosConciliacion(id: string, fec_ini: string, fec_fin: string , iddepartamento: string, idprovincia: string) {
  if (id === "0") {
    id = "";
  }
  if (iddepartamento === undefined) {
    iddepartamento = "";
  }
  if (idprovincia === undefined) {
    idprovincia = "";
  }

   return this.http.get<DespachosATiempo[]>(this.baseUrl + 'GetConciliacionDocumentaria?idcliente=' + id
    + '&fec_ini=' + fec_ini + '&fec_fin=' + fec_fin + "&iddepartamento=" + iddepartamento + "&idprovincia=" + idprovincia , httpOptions );
  }


  GetPendientesEntrega(id: string, fec_ini: string, fec_fin: string , iddepartamento: string, idprovincia: string) {
    if (id === "0") {
      id = "";
    }
    if (iddepartamento === undefined) {
      iddepartamento = "";
    }
    if (idprovincia === undefined) {
      idprovincia = "";
    }

     return this.http.get<DespachosATiempo[]>(this.baseUrl + 'GetPendientesEntrega?idcliente=' + id
      + '&fec_ini=' + fec_ini + '&fec_fin=' + fec_fin + "&iddepartamento=" + iddepartamento + "&idprovincia=" + idprovincia , httpOptions );
    }


  GetPendientesDespachos(id: string, fec_ini: string, fec_fin: string , iddepartamento: string, idprovincia: string) {
    if (id === "0") {
      id = "";
    }
    if (iddepartamento === undefined) {
      iddepartamento = "";
    }
    if (idprovincia === undefined) {
      idprovincia = "";
    }

     return this.http.get<DespachosATiempo[]>(this.baseUrl + 'GetPendientesDespacho?idcliente=' + id
      + '&fec_ini=' + fec_ini + '&fec_fin=' + fec_fin + "&iddepartamento=" + iddepartamento + "&idprovincia=" + idprovincia , httpOptions );
    }









getValorTabla(TablaId: number): Observable<ValorTabla[]> {
  return this.http.get<ValorTabla[]>(this.baseUrl + 'GetAllValorTabla?TablaId=' + TablaId, httpOptions);
}
getEquipoTransporte(placa: string): Observable<EquipoTransporte> {
  return this.http.get<EquipoTransporte>(this.baseUrl + 'GetEquipoTransporte?placa=' + placa, httpOptions);
}

vincularEquipoTransporte(model: any){
  return this.http.post(this.baseUrl + 'RegisterEquipoTransporte', model, httpOptions);
 }
 getordenestransportexids(ids: string): Observable<OrdenTransporte[]>  {
  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetAllOrdenesTrabajoXids?ids=' + ids, httpOptions);
 }

getUbigeo(criterio): Observable<Ubigeo[]> {
  return this.http.get<Ubigeo[]>(this.baseUrl + 'GetListUbigeo?criterio=' + criterio  , httpOptions);
}

getCalendarioProgramados(): Observable<CalendarEventModel[]> {
  return this.http.get<CalendarEventModel[]>(this.baseUrl + 'GetListarCalendario'   , httpOptions);
}
getOrden(id: number) {
  return this.http.get<OrdenTransporte>(this.baseUrl + 'GetOrden?id=' + id , httpOptions);
  }
  getOrdenOriflame(id: string) {
    return this.http.get<OrdenTransporte>(this.baseUrl + 'GetOrdenOriflame?id=' + id , httpOptions);
    }

  actualizarOrden(model: any) {
    return this.http.post(this.baseUrl + 'UpdateOrden', model, httpOptions)
    .pipe(map((response: any) => {

    })
    );
  }
  update_Visitas(model: any) {
    return this.http.post(this.baseUrl + 'confirmarVisitas', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
    )
  );
  }
  confirmar_liquidacionDoc(model: any) : any {
    return this.http.post(this.baseUrl + 'ConfirmarLiquidacionDoc', model, httpOptions)
  }

  confirmar_entrega(model: any) {

    return this.http.post(this.baseUrl + 'ConfirmarEntregav2', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
    )
  );
  }


  getAllIncidencias(id: number) {
    return this.http.get<Incidencia[]>(this.baseUrl + 'GetAllIncidencias?idordentrabajo=' + id , httpOptions);
    }
    getAllDocumentos(id: number): Observable<Documento[]> {
      const params = '?Id=' + id ;
      return this.http.get<Documento[]>(this.baseUrl + 'GetAllDocumentos' + params, httpOptions);
    }

   getAllOrderTransportDocuments(model: any) {
    if (model.idestado === 0) {
      model.idestado = '';
     }

     if (model.idcliente === 0 || model.idcliente === undefined) {
         model.idcliente = '';
      }

     if (model.iddistrito === 0) {
      model.iddistrito = '';
      }
     if (model.iddestinatario === 0) {
     model.iddestinatario= '';
     }
     if (model.idproveedor === 0 || model.idproveedor === undefined) {
       model.idproveedor= '';
       }

     if (model.idtipotransporte === 0 || model.idtipotransporte === undefined) {
       model.idtipotransporte= '';
     }

     const param = '?idcliente=' + model.idcliente + '&numcp=' + model.numcp
   + '&fecinicio=' + model.fec_ini.toLocaleDateString()
   + '&fecfin=' + model.fec_fin.toLocaleDateString()
   + '&grr=' + model.grr
   + '&iddestinatario=' + model.iddestinatario
   + '&idproveedor=' + model.idproveedor


     return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetAllOrderDocument' + param  , httpOptions);
   }
   getAllOrderTransport(model: any) {
    if (model.idestado === 0) {
     model.idestado = '';
    }

    if (model.idcliente === 0 || model.idcliente === undefined) {
        model.idcliente = '';
     }

    if (model.iddistrito === 0) {
     model.iddistrito = '';
     }
    if (model.iddestinatario === 0) {
    model.iddestinatario= '';
    }
    if (model.idproveedor === 0 || model.idproveedor === undefined) {
      model.idproveedor= '';
      }

    if (model.idtipotransporte === 0 || model.idtipotransporte === undefined) {
      model.idtipotransporte= '';
    }

    const param = '?idcliente=' + model.idcliente + '&numcp=' + model.numcp
  + '&fecinicio=' + model.fec_ini.toLocaleDateString()
  + '&fecfin=' + model.fec_fin.toLocaleDateString()
  + '&grr=' + model.grr
  + '&docreferencia=' + model.docreferencia
  + '&idestado=' + model.idestado
  + '&iddestino=' + model.iddistrito
  + '&idusuario=' + model.idusuario
  + '&iddestinatario=' + model.iddestinatario
  + '&idproveedor=' + model.idproveedor
  + '&idtipotransporte=' + model.idtipotransporte ;

    return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetAllOrder' + param  , httpOptions);
 }
GetAllOrderOtros(model: any) {
  const param = '?guiarecojo=' + model.guiarecojo + '&numcp=' + model.numcp  +  '&clave=' + model.clave  ;
  return this.http.get<OrdenTransporte>(this.baseUrl + 'GetAllOrderOtros' + param  , httpOptions);
}

getAllFiles(idordentransporte: number): Observable<OrdenTransporte[]> {
  const params = '?archivoid='  +
  '&ordenid=' + idordentransporte ;
  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetListFiles' + params, httpOptions);
}

getAllGuias(idordentransporte: number): Observable<OrdenTransporte[]> {
  const params = '?ordenid=' + idordentransporte ;
  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetListGuias' + params, httpOptions);
}

downloadDocumento(id: number): any {
  return this.http.get(this.baseUrl + 'DownloadArchivo?documentoId=' + id, {headers, responseType: 'blob' as 'json'});
}

registrar(model: any): Observable<OrdenTransporte> {
  return this.http.post<OrdenTransporte>(this.baseUrl + 'register', model, httpOptions);
}

actualizar(model: any): Observable<OrdenTransporte> {
  return this.http.post<OrdenTransporte>(this.baseUrl + 'update', model, httpOptions);
}
eliminar(model: any): Observable<OrdenTransporte> {
  return this.http.post<OrdenTransporte>(this.baseUrl + 'DeleteOrdenRecojo', model, httpOptions);
}

registrar_detalle(model: any) {
    return this.http.post(this.baseUrl + 'register_detail', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
    )
  );
}

getAllOrderRecojo(model: any) {

  if (model.idcliente  === 0 || model.idcliente === undefined) {
    model.idcliente = '';
  }
  if (model.idestado  === 0) {
    model.idestado = '';
  }

  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetAllOrdenesRecojo?idcliente=' + model.idcliente
   + '&fec_ini=' + model.fec_ini.toLocaleDateString() + '&fec_fin=' + model.fec_fin.toLocaleDateString() + '&idestado=' + model.idestado  , httpOptions);
}

getAllPendienteFacturacion(numhojaruta: string) {

  if(numhojaruta === undefined)
    numhojaruta = '';


  let param = "?numhojaruta="  +  numhojaruta;

  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'getListarPendientesFacturacionOS'  + param  , httpOptions);
}
getAllLiquidacionRepartidorPendiente(model: any) {

  let param = "?dni="  +  model.dni
  + '&fec_ini=' + model.fec_ini.toLocaleDateString()
  + '&fec_fin=' + model.fec_fin.toLocaleDateString();

  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetAllPendienteLiquidacionRepartidoresxDNI'  + param  , httpOptions);
}

getAllLiquidacionPendiente(model: any) {

  let param = "?dni="  +  model.dni
  + '&fec_ini=' + model.fec_ini.toLocaleDateString()
  + '&fec_fin=' + model.fec_fin.toLocaleDateString();

  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetAllPendienteLiquidacionxDNI'  + param  , httpOptions);
}
getAllLiquidacionPendienteOT(model: any) {

  let param = "?dni="  +  model.dni
  + '&fec_ini=' + model.fec_ini.toLocaleDateString()
  + '&fec_fin=' + model.fec_fin.toLocaleDateString();

  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetAllPendienteLiquidacionxDNIOT' + param   , httpOptions);
}
getAllOrdersxManifiesto(idmanifiesto: number) {
  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'getAllOrdersxManifiesto?idmanifiesto='  + idmanifiesto  , httpOptions);
}


getAllLiquidacionPendientexManifiesto(idmanifiesto: number) {
  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetAllPendienteLiquidacionxManifiesto?idmanifiesto='  + idmanifiesto  , httpOptions);
}

getAllManifiestoPendientes(hojaruta: string) {
  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'getAllManifiestoPendientes?numhojaruta='  + hojaruta  , httpOptions);
}


GetAllPlacasProgramadas(model: any) {

  if(model.ruc === undefined )
    model.ruc = '';


  if(model.placa === undefined )
  model.placa = '';


  return this.http.get<Vehiculo[]>(this.baseUrl + 'GetAllPlacasProgramadas?ruc=' + model.ruc +'&placa=' + model.placa   , httpOptions);
}
//
GetOrdenRecojo(id: number) {
  return this.http.get<OrdenTransporte>(this.baseUrl + 'GetOrdenRecojo?idordentrabajo=' + id   , httpOptions);
}
GetOrdenRecojoxid(id: number) {
  return this.http.get<OrdenTransporte>(this.baseUrl + 'GetOrdenRecojoxid?idordenrecojo=' + id   , httpOptions);
}


GetEquipoTransporteVinculado(id: any ) {
  return this.http.get<EquipoTransporte>(this.baseUrl + 'GetEquipoTransporteAsociado?idor=' + id   , httpOptions);
}

getAllGuiasAsignadasBlanco(idmanifiesto: number, idorden: number) {
  return this.http.get<OrdenTransporte[]>(this.baseUrl + 'GetGuiaRemisionBlancoPorVehiculo?idmanifiesto='  + idmanifiesto + '&idordentrabajo=' + idorden  , httpOptions);
}

liquidarManifiesto(idmanifiesto: number, idmaestroincidencia: number, observacion: string) {
  let  model: any  = {};
  return this.http.post<OrdenTransporte[]>(this.baseUrl + 'liquidarManifiesto?idmanifiesto='  + idmanifiesto
   + '&idmaestroincidencia=' + idmaestroincidencia + '&observacion=' + observacion   ,model , httpOptions);
}

liquidarOT(idorden: number, idmaestroincidencia: number, observacion: string) {
  let  model: any  = {};
  return this.http.post<OrdenTransporte[]>(this.baseUrl + 'liquidarOT?idordentrabajo='  + idorden
  + '&idmaestroincidencia=' + idmaestroincidencia + '&observacion=' + observacion   ,model , httpOptions);
}

VincularFactura(numhojaruta: string , numero: string) {
  let  model: any  = {};
  return this.http.post<OrdenTransporte[]>(this.baseUrl + 'VincularOS?numhojaruta='  + numhojaruta
   + '&numero=' + numero   ,model , httpOptions);
}

ActualizarProveedor(id: string , idproveedor: string) {
  let  model: any  = {};


  model.idordentrabajo = id;
  model.idproveedor = idproveedor;

  return this.http.post<OrdenTransporte[]>(this.baseUrl + 'ActualizarProveedor' ,model , httpOptions);
}



asignarGuiasBlanco(id: number, idorden: number) {
  let  model: any  = {};
  return this.http.post<GuiaRemisionBlanco[]>(this.baseUrl + 'asignarGuiasBlanco?id=' + idorden + '&guia=' + id ,model   , httpOptions);
}

asignarGuiasBlancoExtraviado(id: number, idorden: number) {
  let  model: any  = {};
  return this.http.post<GuiaRemisionBlanco[]>(this.baseUrl + 'asignarGuiasBlancoExtraviado?id=' + idorden + '&guia=' + id ,model   , httpOptions);
}

setCamToOrder(cam: string , id: number ) {
  let  model: any  = {};
  model.cam = cam;
  model.idordentrabajo = id;

  return this.http.post<OrdenTransporte[]>(this.baseUrl + 'SetCamToOrder'  ,model   , httpOptions);

}


desvincularGuiasBlanco(id: number, idorden: number) {
  let  model: any  = {};
  return this.http.post<GuiaRemisionBlanco[]>(this.baseUrl + 'desvincularGuiasBlanco?id=' + idorden + '&guia=' + id ,model   , httpOptions);
}

RegistroGuiaRemisionBlanco(model: any ) {
  return this.http.post<GuiaRemisionBlanco[]>(this.baseUrl + 'RegistroGuiaRemisionBlanco' ,model   , httpOptions);
}
EliminarGuiaEnBlanco(id: number) {
  let  model: any  = {};
  return this.http.post<GuiaRemisionBlanco[]>(this.baseUrl + 'EliminarGuiaRemisionBlanco?id=' + id ,model   , httpOptions);
}

GetGuiaRemisionBlancoPorVehiculo(id: any ) {
  return this.http.get<GuiaRemisionBlanco[]>(this.baseUrl + 'GetGuiaRemisionBlancoPorVehiculo?idmanifiesto=' + id   , httpOptions);
}

GetAllCuadrilla(id: any): Observable<Cuadrilla[]> {
  return this.http.get<Cuadrilla[]>(this.baseUrl + 'GetAllCuadrilla?idrecojo=' + id, httpOptions);
}

GuardarCuadrilla(model: any): Observable<Cuadrilla[]> {

  return this.http.post<Cuadrilla[]>(this.baseUrl + 'GuardarCuadrilla?' ,model   , httpOptions);
}
DeleteCuadrilla(id: any): Observable<Cuadrilla[]> {
  return this.http.delete<Cuadrilla[]>(this.baseUrl + 'DeleteCuadrilla?id=' + id    , httpOptions);
}
GetAllSustentoxHR(hojaruta: any): Observable<SustentoResult[]> {
  return this.http.get<SustentoResult[]>(this.baseUrl + 'GetListarSustentoxHR?hojaruta=' + hojaruta, httpOptions);
}

getSustentoForHojaRuta(hojaruta:any) {
  return this.http.get<SustentoResult[]>(this.baseUrl + 'GetSustentoForHojaRuta?hojaruta=' + hojaruta, httpOptions);
}
addSustento(sustento: any) {
  return this.http.post<GuiaRemisionBlanco[]>(this.baseUrl + 'InsertSustento' ,sustento   , httpOptions);
}
addSustentoDetalle(model: any) {
  return this.http.post<GuiaRemisionBlanco[]>(this.baseUrl + 'InsertSustentoDetalle'  ,model   , httpOptions);
}
LiquidarSustento(hojaruta: string) {
  let  model: any  = {};
  return this.http.post<GuiaRemisionBlanco[]>(this.baseUrl + 'LiquidarHojaRuta?hojaruta=' +   hojaruta ,model   , httpOptions);
}





}
