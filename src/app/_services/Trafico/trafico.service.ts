import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departamento, DepartmentForGroup } from 'src/app/_models/Seguimiento/guiaremisionblanco';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
};


@Injectable({
  providedIn: 'root'
})
export class TraficoService {
  baseUrl = environment.baseUrl + '/api/trafico/';

constructor(private http: HttpClient) { }


    registrar(model: any){
      return this.http.post(this.baseUrl + 'register', model, httpOptions);
    }

    actualizar(model: any){
      return this.http.post(this.baseUrl + 'update', model, httpOptions);
    }
    getAllDepartmentsForTeam(): Observable<DepartmentForGroup[]> {
      return this.http.get<DepartmentForGroup[]>(this.baseUrl + 'GetDepartmentsForGroup'   , httpOptions);
    }
    actualizarEquipos(model: any[]){
      return this.http.post(this.baseUrl + 'UpdateDepartmentsForGroup', model, httpOptions);
    }
    borrarDepartamentoByEquipo(model: any) {
      return this.http.post(this.baseUrl + 'DeleteDepartamentForGroup', model, httpOptions);
    }

}

