import {Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';


@Component({
    template: `

<div class="col-12 row">
              <div class="col-12 mb-2">

              <h6>Fecha de entrega aproximada:</h6>
              <p-calendar [(ngModel)]="dateInicio_entrega" [showTime]="true" [showIcon]="true"   appendTo="body"  baseZIndex="10000" [locale]="es" dateFormat="dd/mm/yy"></p-calendar>
              </div>

              <div class="col-6">
                <h6>Fecha de recojo de cargo:</h6>
                <p-calendar [(ngModel)]="dateInicio_recojocargo" [showTime]="true" [showIcon]="true"   appendTo="body"  baseZIndex="10000" [locale]="es" dateFormat="dd/mm/yy"></p-calendar>
              </div>

              <div class="col-6">
                <h6>Fecha de envio de cargo:</h6>
                <p-calendar [(ngModel)]="dateInicio_enviocargo" [showTime]="true" [showIcon]="true"   appendTo="body"  baseZIndex="10000" [locale]="es" dateFormat="dd/mm/yy"></p-calendar>
              </div>




              <div class="col-md-4 mt-4 offset-3">
                      <button   class='btn-danger btn btn-xs' pButton iconPos="left" label="Guardar" icon="fa fa-save"   (click)="guardar()"  type="button"></button>
                      <button   class='btn-primary btn btn-xs' pButton  label="Cancelar"   (click)="cancelar()"  type="button"></button>
              </div>
</div>
    `,
      providers: [ConfirmationService, DialogService, MessageService]
})
export class ProgramarArribosModalComponent  implements OnInit {

  cars: any[];
  model: any = {};

  user: User ;
  dateInicio_entrega: Date = new Date(Date.now()) ;
  dateInicio_recojocargo: Date = new Date(Date.now()) ;
  dateInicio_enviocargo: Date = new Date(Date.now()) ;

  es: any;


  constructor(private ordenService: OrdenTransporteService
              ,public generalService: GeneralService
              ,public ref: DynamicDialogRef
              ,private toastr: ToastrService
              ,public config: DynamicDialogConfig) {

              this.model.idordentrabajo = config.data.idorden;


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



    console.log(this.model.idordentrabajo, 'soy yo');







  }
  cancelar() {
    this.ref.close();
  }
  guardar() {

      this.model.ids = ',' +  this.config.data.ids;
      this.model.fechaetaentrega  = new Date(this.dateInicio_entrega);
      this.model.fechaetacargo  = new Date(this.dateInicio_recojocargo);
      this.model.fechaetaenviocargo  = new Date(this.dateInicio_enviocargo);
      this.model.eta_enzona_obs  = this.model.observacion_enzona;
      this.model.eta_enreparto_obs  = this.model.observacion_enreparto;

      console.log(this.model, 'para guardar');



      this.ordenService.actualizarFechasEtaxOT(this.model ).subscribe( x=> {

        this.toastr.success('Se ha planificado la provincia de manera correcta'
        , 'Planning', {
          closeButton: true
        });

        this.ref.close();

      })
  }
}

