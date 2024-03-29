import { NumberSymbol } from '@angular/common';

// export interface OrdenTransporte {
//      idordentrabajo?: number;
//      numcp?: string;
//      razonsocial?: string;
//      destino?: string;
//      remitente?: string;
//      destinatario?: string;
//      tipotransporte?: string;
//      conceptocobro?: string;
//      fecharegistro?: Date;
//      fechadespacho?: Date;
//      fechaentrega?: Date;
//      fecharecojo?: Date;
//      peso?: number;
//      volumen?: number;
//      bulto?: number;
//      docgeneral?: string;
//      GRR?: string;
//      estado?: string;
//      personaentrega?: string;

// }
export interface Cliente {
     idcliente: number;
     nombre: string;
     razonsocial: string;
     tipoDocumentoId: number;
     documento: string;
     idproveedor: number;
 }
export interface ValorTabla {
      idvalortabla: number;
      valor: string;
      idmaestrotabla: number;
      activo: boolean;
      orden: number;
 }
export interface Ubigeo {
     iddistrito: number;
     idprovincia: number;
     iddepartamento: number;
     ubigeo: string;
 }


export interface OrdenTransporte {
         idordentrabajo?: number;
         idordenrecojo?: number;
         numcp?: string;

         numcarga?: string;
         idcarga?: number;
         detalle?: string;

         razonsocial?: string;
         destino?: string;
         remitente?: string;
         destinatario?: string;
         tipotransporte?: string;
         conceptocobro?: string;
         fecharegistro?: Date;
         fechadespacho?: Date;
         fechaentrega?: Date;
         fecharecojo?: Date;
         fechacita?: Date;
         horacita?: string;
         peso?: number;
         volumen?: number;
         bulto?: number;
         docgeneral?: string;
         GRR?: string;
         estado?: string;
         responsable?: string;
         idvehiculo?: number;
         nummanifiesto?: string;
         placa?: string;
         chofer?: string ;
         cliente?: string;
         oriflameid?: number;
         origen?:string;
         lat?: number;
         lng?: number;
         personarecojo?: string;
         direccion?: string;
         telefonorecojo?: string;
         numhojaruta?: string;
         ruta?: string;

         fecvisita1?: Date;
         fecvisita2?: Date;
         fecvisita3?: Date;
         tipoorden?:string;

         tipoentrega?: string;
         idtipoentrega?: number;
         idusuarioentrega?: number;

         subtotal?: number;

         enzona?: boolean;
         cantidad?: number;
         iddepartamento?: number;
         idprovincia?: number;
         zona?: string;
         idorden?: number;
         idmanifiesto?: number;
         iddespacho?: number;
         despachado?: boolean;

         cantidadprecintos?: number;
         precinto? : string;
         terminado?: boolean;
         repartidor?: string;
         valija?: boolean;

         fechaetaentrega?: Date;
         fechaetacargo?: Date;
         fechaetaenviocargo?: Date;
         fechaentregareparto?: Date;




 }
 export interface kpiestados {
     estado: string;
     cantidad: number ;

 }
 export interface DespachosATiempo {
     atiempo: number;
     numcp: number;
     ots: number;
     rango: string;
}

export interface RetornoDocumetario {
     coincide: number;
     numcp: number;
}

export interface ManifiestosPendientes {
     idmanifiesto : string;
     nummanifiesto : string;
     fecharegistro : string;
     idusuarioregistro : string;
     iddespacho : string;
     activo : string;
     numhojaruta : string;
     idvehiculo : string;
     reintegrotributario : string;
     idtipooperacion : string;
     iddestino : string;
     idestado : string;
     iddocumentoliq : string;
     observacionliq : string;
     estado: string;
}
export interface Proveedor {
  idproveedor: number;
  ruc: string;
  razonSocial: string;
  distrito : string;
}


export interface Tarifa {
  id : number;
  idcliente : number;
  razonsocial : String;
  idorigen : number;

  idorigendistrito : number;
  iddestinodistrito: number;

  idorigenprovincia : number;
  iddestinoprovincia : number;


  idorigendepartamento: number;
  iddestinodepartamento: number;

  origendistrito : String;
  origenprovincia : String;
  origen : String;
  departamentodestino : String;
  provinciadestino : String;
  distrito : String;
  formula : String;
  idtipounidadmedida : number;
  tipounidad : number;
  idtipotransporte : number;
  tipotransporte : String;
  montobase : number;
  minimo : number;
  desde : number;
  hasta : number;
  precio   : number;
}

export interface OperacionCarga {
  idcarga : number;
  numcarga : string;
  peso : number;
  vol : number;
  fecharegistro : Date,
  planificador: string;
  tipounidad : string;
  subtotal: number;

}
