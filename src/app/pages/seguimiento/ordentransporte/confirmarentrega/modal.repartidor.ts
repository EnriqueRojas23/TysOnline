import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenReciboService } from 'src/app/_services/Seguimiento/ordenrecibo.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';



// <div class="card-body">
// <div class="row">
// <div class=" ui-md-3 col-3">
//      <h5>N° OT: {{ ot }}</h5>

// </div>

//    <div class=" ui-md-3 col-3">
//            <h5>F. Liquidación:</h5>
//            <p-calendar  appendTo="body"  [(ngModel)]="model.fechaevento" baseZIndex="10000" [locale]="es" dateFormat="dd/mm/yy"></p-calendar>
//      </div>



//    <div class=" ui-md-3 col-3">
//        <h5>Hora Liquidación:</h5>
//        <ngb-timepicker name="horaentrega" [(ngModel)]="model.horaentrega" [spinners]="off"></ngb-timepicker>
//    </div>
//    </div>
//  </div>
// </div>

@Component({
    template: `



  <div class="card card-border-color card-border-color-primary">
  <div class="card-body">
   <div class="row">

   <div class="col-md-6">
                  <h6>Repartidor :</h6>

                  <p-dropdown name="proveedores"
                    [options]="proveedores" [(ngModel)]="model.idproveedor"
                    scrollHeight="30vh"  class="input-form-field"
                    [virtualScroll]="true" itemSize="30"
                    [style]="{'width':'100%'}" [resetFilterOnHide]="false"
                    [hideTransitionOptions]="'0ms'"
                    [showTransitionOptions]="'0ms'"
                    filter="false">
                        <ng-template let-item pTemplate="selectedItem">
                            <span style="vertical-align:left;">{{item.label}}</span>
                        </ng-template>
                  </p-dropdown>
              </div>

              <div class="col-md-2 offset-8">
                      <button   class='btn-danger btn btn-xs' pButton iconPos="left" label="Guardar" icon="fa fa-save"   (click)="guardar()"  type="button"></button>
              </div>



  </div>



  </div>



    `
})
export class RepartidorModalComponent implements OnInit {


    model: any = {};
    id: any;
    ot: any;
    cols2: any[];
    es: any;
    dateInicio: Date = new Date(Date.now()) ;
    listaclientes: SelectItem[] = [];
    off: any  = false;
    uploadedFiles: any[] = [];

    proveedores: SelectItem[] = [];

    constructor(
                public ref: DynamicDialogRef,
                private ordenService: OrdenReciboService,
                private ordenTransporteService: OrdenTransporteService,
                private confirmationService: ConfirmationService,
                public generalService: GeneralService,
                public messageService: MessageService,
                public config: DynamicDialogConfig) {



                     this.id = config.data.id;
                     this.ot = config.data.ot;







                 }



    ngOnInit(): void {

      this.listaclientes.push({ label: "Manifiesto Firmado", value: 1 });
      this.listaclientes.push({ label: "Factura", value: 2 });
      this.listaclientes.push({ label: "Guía de Remisión", value: 3 });
      this.listaclientes.push({ label: "C-PAN", value: 4 });


      this.es = {
        firstDayOfWeek: 1,
        dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
        dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
        dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
        // tslint:disable-next-line: max-line-length
        monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
        monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
        today: 'Hoy',
        clear: 'Borrar'
        };

        this.generalService.getProveedores('',21513).subscribe(resp => {


          this.proveedores.push({ value: 0,  label : 'TODOS LOS REPARTIDORES'});

            resp.forEach(element => {
              this.proveedores.push({ value: element.idproveedor ,  label : element.razonSocial});
            });

            // this.ProveedorLoaded = true;
            this.model.idproveedor = 0;


        });




    }
    guardar() {

      this.ordenTransporteService.ActualizarProveedor(this.id, this.model.idproveedor).subscribe(list => {

        this.ref.close(list);

      });

    }



}
