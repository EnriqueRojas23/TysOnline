export interface Incidencia {
    incidencia: string;
    fecha_incidencia: Date;
    observacion: string;
    usuario_registro: string ;
}

export interface Documento {
    id: number;
    ruta: string;
    nombre: string;
    tipo_id: number;
    tipo_documento: string;
    numero_documento: string;
    carga_id: number;
}