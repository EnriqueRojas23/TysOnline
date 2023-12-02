import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';


@Component({
    template: `

<div class="col-12 row">
      <div class="col-6">
                  <h6>Estado  :</h6>
                  <p-dropdown name="estadosnext"
                    [options]="estadosnext" [(ngModel)]="model.idestado"
                     class="input-form-field"
                    appendTo="body"
                     placeholder="Selecciona un estado"
                    [baseZIndex]="100000"
                    [style]="{'width':'70%'}"
                    [hideTransitionOptions]="'0ms'"
                    [showTransitionOptions]="'0ms'"
                    filter="false">
                        <ng-template let-item pTemplate="selectedItem">
                            <span style="vertical-align:left;">{{item.label}}</span>
                        </ng-template>
                  </p-dropdown>
              </div>
              <div class="col-6">
                <h6>Fecha de Estado:</h6>
                <p-calendar [(ngModel)]="dateInicio"    appendTo="body"   [showTime]="true"  baseZIndex="10000" [locale]="es" dateFormat="dd/mm/yy"></p-calendar>
              </div>
              <div class="col-6">
                <h6>Observación:</h6>
                <textarea [(ngModel)]="model.observacion" rows="5" cols="30"  class="form-control"   type="text" textarea ></textarea>
              </div>

              <div class="col-md-4 mt-4 offset-3">
                      <button   class='btn-danger btn btn-xs' pButton iconPos="left" label="Guardar" icon="fa fa-save"   (click)="guardar()"  type="button"></button>
                      <button   class='btn-primary btn btn-xs' pButton  label="Cancelar"   (click)="cancelar()"  type="button"></button>
              </div>
</div>
    `
})
export class CambiarEstadoModalComponent  implements OnInit {

    cars: any[];
    model: any = {};
    estadosnext: SelectItem[] = [];
    estaciones: SelectItem[] = [];
    agencias: SelectItem[] = [];
    repartidores: SelectItem[] = [];
    user: User ;
    dateInicio: Date = new Date(Date.now()) ;
    es: any;


    constructor(private ordenService: OrdenTransporteService
                ,public generalService: GeneralService
                ,public ref: DynamicDialogRef
                ,private toastr: ToastrService
                ,public config: DynamicDialogConfig) {
         }

    ngOnInit() {



      this.es = {
        firstDayOfWeek: 1,
        dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
        dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
        dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
        monthNames: [ 'enero', 'febrero', 'marzo', 'abril',
        'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
        monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
        today: 'Hoy',
        clear: 'Borrar'
    };


      this.user = JSON.parse(localStorage.getItem('user'));
      this.model.idusuariocreacion = this.user.usr_int_id;


      this.estadosnext.push({ value: 10 ,  label : 'En Base (Con Precinto)'});
      this.estadosnext.push({ value: 11 ,  label : 'En Ruta'});
      this.estadosnext.push({ value: 25 ,  label : 'En Zona'});
      this.estadosnext.push({ value: 13 ,  label : 'En Reparto '});



      this.generalService.GetAllEstaciones().subscribe(resp => {
        resp.forEach(element => {
          this.estaciones.push({ value: element.idestacion ,  label : element.estacionorigen});
        });
      });


      this.generalService.getValorTabla(24).subscribe(resp => {
        resp.forEach(element => {
          this.agencias.push({ value: element.idvalortabla ,  label : element.valor});
        });
      });


      this.generalService.getProveedores("", 21514).subscribe(resp => {
        resp.forEach(element => {
          this.repartidores.push({ value: element.idproveedor ,  label : element.razonSocial  +   '-'   +    element.ruc});
        });
      });



    }
    cancelar() {
      this.ref.close();
    }


    guardar() {

        this.model.ids =  this.config.data.ids;
        this.model.fechaarribo =  new Date(this.dateInicio); // moment(this.dateInicio).format("DD/MM/YYYY HH:mm:ss"); //this.dateInicio.toLocaleDateString('en-GB');


        console.log(this.model.fechaarribo, 'fecha');

        this.ordenService.cambiarEstadoOT(this.model ).subscribe( x=> {

          this.toastr.success('Se ha cambiaro de estado de manera correcta.'
          , 'Planning', {
            closeButton: true
          });

          this.ref.close();

        });
    }
}

