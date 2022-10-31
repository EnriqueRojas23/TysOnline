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

const httpOptionsUpload = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
  })
  // , observe: 'body', reportProgress: true };
};


@Injectable({
  providedIn: 'root'
})
export class OrdenReciboService {
  baseUrl = environment.baseUrl + '/api/seguimiento/';
constructor(private http: HttpClient) { }
















registrar(model: any){
  return this.http.post(this.baseUrl + 'register', model, httpOptions);
}

actualizar(model: any){
  return this.http.post(this.baseUrl + 'update', model, httpOptions);
}


registrar_detalle(model: any){
  return this.http.post(this.baseUrl + 'register_detail', model, httpOptions)
  .pipe(
    map((response: any) => {
    }
   ));
}

vincularEquipoTransporte(model: any){
    return this.http.post(this.baseUrl + 'RegisterEquipoTransporte', model, httpOptions);
}



identificar_detalle(model: any) {
  return this.http.post(this.baseUrl + 'identify_detail', model, httpOptions)
  .pipe(
    map((response: any) => {
      }
   ));
}


cerrar_identificacion(Id: any) {

  const body = '';

  return this.http.post(this.baseUrl + 'close_details?Id=' + Id, body, httpOptions)
  .pipe(
    map((response: any) => {
    }
   ));
 }

 uploadFileSite(formData: FormData, orden_id: number) {

  console.log(orden_id);


  return this.http.post(this.baseUrl + 'UploadPhoto?idOrden=' + orden_id
  , formData
  , httpOptionsUpload
   );
 }
}

