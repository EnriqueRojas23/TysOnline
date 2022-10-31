import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Cliente, Ubigeo } from 'src/app/_models/Seguimiento/ordentransporte';
import { Departamento, Distrito, Provincia } from 'src/app/_models/Seguimiento/guiaremisionblanco';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),


};


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl = environment.baseUrl + '/api/cliente/';

constructor(private http: HttpClient) { }


 registrarCliente(model: any){

   return this.http.post(this.baseUrl + 'clientRegister', model, httpOptions)
    .pipe(map((response: any) => {
       console.log(response);

    }));
  }

  deleteCliente(id: number) {

    const model = {};

    return this.http.post(this.baseUrl + 'DeleteCliente?ClientePropietarioId=' + id, model, httpOptions)
    .pipe(map((response: any) => {

    })
    );
  }


  registrarOwner(model: any) {
    return this.http.post(this.baseUrl + 'OwnerRegister', model, httpOptions)
    .pipe(map((response: any) => {

    })
    );
  }

  editOwner(model: any) {
    return this.http.post(this.baseUrl + 'OwnerEdit', model, httpOptions)
    .pipe(map((response: any) => {

    })
    );
  }

  vincularPropitearioCliente(model: any) {
    return this.http.post(this.baseUrl + 'MatchOwnerClient', model, httpOptions)
    .pipe(map((response: any) => {

    })
    );
  }
  registrarDireccion(model: any) {
    return this.http.post(this.baseUrl + 'AddressRegister', model, httpOptions)
    .pipe(map((response: any) => {
    }));
  }

  getAllClientes(criterio: string): Observable<Cliente[]> {

    if(criterio === undefined) { criterio = '';}

    return this.http.get<Cliente[]>(this.baseUrl + 'GetAllClientes?criterio=' + criterio   , httpOptions);
  }



}



