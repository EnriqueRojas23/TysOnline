import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';



const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
};


@Injectable({
  providedIn: 'root'
})
export class OrdenSalidaService {
  baseUrl = environment.baseUrl + '/api/ordensalida/';
constructor(private http: HttpClient) { }

registrar_salidacarga(model: any) {
  return this.http.post(this.baseUrl + 'RegisterSalidaShipment', model, httpOptions);
}
RegistarOrdenSalida(model: any){
  return this.http.post(this.baseUrl + 'RegisterOrdenSalida', model, httpOptions);
}
ActualizarOrdenSalida(model: any){
  return this.http.post(this.baseUrl + 'UpdateOrdenSalida', model, httpOptions);
}

PlanificarPicking(model: any){
  return this.http.post(this.baseUrl + 'PlanificarPicking', model, httpOptions);
}



registrar_detalle(model: any){
  return this.http.post(this.baseUrl + 'register_detail', model, httpOptions);
  // .pipe(
  //   map((response: any) => {

  //   }
  //  )
 }

vincularEquipoTransporte(model: any){
    return this.http.post(this.baseUrl + 'RegisterEquipoTransporte', model, httpOptions);
}

matchEquipoTransporte(model: any){
  return this.http.post(this.baseUrl + 'MatchTransporteCarga', model, httpOptions);
}

registrar_carga(model: any){
  return this.http.post(this.baseUrl + 'RegisterCarga', model, httpOptions)
  .pipe(
    map((response: any) => {
    }
   )
); }


assignmentOfDoor(ids: string , ubicacionId: number) {
    const model: any = {};
    model.ids = ids;
    model.PuertaId = ubicacionId;

    return this.http.post(this.baseUrl + 'assignmentOfDoor', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
    )
); }
assignmentOfUser(ids: string , UserId: number) {
  const model: any = {};
  model.ids = ids;
  model.UserId = UserId;

  return this.http.post(this.baseUrl + 'assignmentOfUser', model, httpOptions)
  .pipe(
    map((response: any) => {
    }
  )
); }
movimientoSalida(Id: number){
  // RegisterInventario
    const model: any = {};
    model.Id = Id;

    return this.http.post(this.baseUrl + 'MovimientoSalida', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
    )
  );
}
movimientoSalidaMasiva(Id: number) {
  const model: any = {};
  model.Id = Id;

  return this.http.post(this.baseUrl + 'MovimientoSalidaMasivo?WrkId=' + Id , model, httpOptions)
  .pipe(
    map((response: any) => {
    }
  )
);
}


}
