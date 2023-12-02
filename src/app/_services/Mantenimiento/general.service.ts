import { TipoSustento } from './../../_models/Seguimiento/sustento';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Proveedor, Tarifa, ValorTabla } from 'src/app/_models/Seguimiento/ordentransporte';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { Chofer } from 'src/app/_models/Mantenimiento/chofer';
import { Departamento, Distrito, Estaciones, Provincia } from 'src/app/_models/Seguimiento/guiaremisionblanco';
import { map } from 'rxjs/operators';
import { Ruta } from 'src/app/_models/Mantenimiento/ruta';

const httpOptions = {
    headers: new HttpHeaders({
      Authorization : 'Bearer ' + localStorage.getItem('token'),
      'Content-Type' : 'application/json'
    }),
};
@Injectable({
    providedIn: 'root'
  })
export class GeneralService {
    baseUrl = environment.baseUrl + '/api/general/';
    constructor(private http: HttpClient) { }


      getValorTabla(TablaId: number): Observable<ValorTabla[]> {
        return this.http.get<ValorTabla[]>(this.baseUrl + 'GetAllValorTabla?TablaId=' + TablaId, httpOptions);
      }
      getVehiculos(placa: string) {
              return this.http.get<Vehiculo[]>(this.baseUrl + 'GetVehiculos?placa=' + placa, httpOptions);

      }
      getVehiculosxEstado(idestado: string) {
        return this.http.get<Vehiculo[]>(this.baseUrl + 'GetVehiculosxEstado?idestado=' + idestado, httpOptions);
      }

      getRutas(): Observable<Ruta[]> {
        return this.http.get<Ruta[]>(this.baseUrl + 'GetAllRutas', httpOptions);
      }


      getChoferes(criterio: string): Observable<Chofer[]> {
        return this.http.get<Chofer[]>(this.baseUrl + 'GetChofer?criterio=' + criterio , httpOptions);
      }


    GetAllDepartamentos(): Observable<Departamento[]> {
      return this.http.get<Departamento[]>(this.baseUrl + 'GetAllDepartamentos', httpOptions);
    }

    GetAllProvincias(id: number): Observable<Provincia[]> {
      return this.http.get<Provincia[]>(this.baseUrl + 'GetAllProvincias?DepartamentoId=' + id, httpOptions);
    }

    GetAllTipoSustento(): Observable<TipoSustento[]> {
      return this.http.get<TipoSustento[]>(this.baseUrl + 'GetAllTipoSustento', httpOptions);
    }

    getProveedores(criterio: string, tipoid : number): Observable<Proveedor[]> {
      return this.http.get<Proveedor[]>(this.baseUrl +'GetProveedores?criterio=' + criterio + '&tipoid=' +  tipoid   , httpOptions);
    }
    getProveedor(idproveedor : number): Observable<Proveedor> {
      return this.http.get<Proveedor>(this.baseUrl +'GetProveedor?id=' + idproveedor , httpOptions);
    }



  getAllTarifas(id: number): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(this.baseUrl + 'GetAllTarifarioProveedor?idproveedor=' + id   , httpOptions);
  }

  getTarifa(id: number): Observable<Tarifa> {
    return this.http.get<Tarifa>(this.baseUrl + 'GetTarifaProveedor?id=' + id   , httpOptions);
  }


  registarTarifaProveedor(model: any): any{
    return this.http.post(this.baseUrl + 'InsertTarifaProveedor', model, httpOptions)
    .pipe(map((response: any) => {
    }));
  }
  updateTarifaProveedor(model: any): any{
    return this.http.post(this.baseUrl + 'UpdateTarifaProveedor', model, httpOptions)
    .pipe(map((response: any) => {
    }));
  }
  GetAllDistritos(id: string): Observable<Distrito[]> {
    if(id === null)
    id = '';
    return this.http.get<Distrito[]>(this.baseUrl + 'GetAllDistritos?ProvinciaId=' + id, httpOptions);
    }
    deleteTarifa(id: number): any {
      let model = [];
      return this.http.post(this.baseUrl + 'DeleteTarifaProveedor?id=' + id, model, httpOptions)
      .pipe(map((response: any) => {
      }));
    }


    GetAllEstaciones(): Observable<Estaciones[]> {
      return this.http.get<Estaciones[]>(this.baseUrl + 'GetAllEstaciones' , httpOptions);
      }



}
