export interface Cuadrilla {
         id?: number;
         nombrecompleto?: string;
         dni?: string;
 }

 export interface GuiaRemisionBlanco {
        idmanifiesto?: number;
        id?: number;
        idvehiculo?: number;
        placa?: string;
        numeroguia?: string;
        fecharegistro?: Date;
}
export interface Departamento {
        iddepartamento: number;
        departamento: string;
    }
export interface Provincia {
        idprovincia: number;
        provincia: string;
    }
    export interface Distrito {
      iddistrito: number;
      distrito: string;
  }

export interface SustentoResult {
    id  : number;
    numhojaruta : string  ;
    aprobado : string  ;
    documentoEmisor : string  ;
    fecha: Date;
    fechaAprobacion: Date;
    TipoDocumento : string;
    TipoSustento : string  ;
}
export class SustentoDetalle {
  id  : number;
  sustentoid : string  ;
  fecha : string  ;
  idtipodocumento : string  ;
  idtiposustento: Date;
  serieDocumento: Date;
  numeroDocumento : string;
  tipoDocumentoEmisor : string  ;

  documentoEmisor : string  ;
  razonSocialEmisor: Date;
  montoBase: Date;
  montoImpuesto  : string;
  montoTotal : string  ;

}
