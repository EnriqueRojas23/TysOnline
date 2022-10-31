import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
      Authorization : 'Bearer ' + localStorage.getItem('token'),
      'Content-Type' : 'application/json'
    }),
};
@Injectable({
    providedIn: 'root'
  })
export class ProductoService {
    baseUrl = environment.baseUrl + '/api/producto/';

constructor(private http: HttpClient) { }

registrarProducto(model: any){
  console.log(model);
  return this.http.post(this.baseUrl + 'productRegister', model, httpOptions)
  .pipe(map((response: any) => {
     console.log(response);

  }));
}
editarProducto(model: any){
  return this.http.post(this.baseUrl + 'productEdit', model, httpOptions)
  .pipe(map((response: any) => {
     console.log(response);

  }));
}
registrarHuellaDetalle(model: any){
  return this.http.post(this.baseUrl + 'HuellaDetalleRegister', model, httpOptions)
  .pipe(map((response: any) => {
     console.log(response);

  }));
}
registrarHuella(model: any){
  console.log(model);
  return this.http.post(this.baseUrl + 'HuellaRegister', model, httpOptions)
  .pipe(map((response: any) => {
     console.log(response);

  }));
}
deleteHuellaDetalle(id: number){
  return this.http.delete(this.baseUrl + 'HuellaDetalleDelete?id=' + id, httpOptions)
  .pipe(map((response: any) => {

  }));
}


}
