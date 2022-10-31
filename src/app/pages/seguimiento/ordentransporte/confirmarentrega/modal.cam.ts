import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenReciboService } from 'src/app/_services/Seguimiento/ordenrecibo.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';





@Component({
    template: `



  <div class="card card-border-color card-border-color-primary">
  <div class="card-body">
   <div class="row">


               <div class="col-md-4 ">
                      <button   class='btn-secondary btn btn-block' pButton iconPos="left" label="M1" icon="fa fa-save"   (click)="guardar('1')"  type="button"></button>
              </div>

              <div class="col-md-4">
                      <button   class='btn-secondary btn btn-block' pButton iconPos="left" label="M2" icon="fa fa-save"   (click)="guardar('2')"  type="button"></button>
              </div>

              <div class="col-md-4">
                      <button   class='btn-secondary btn btn-block' pButton iconPos="left" label="M3" icon="fa fa-save"   (click)="guardar('3')"  type="button"></button>
              </div>



  </div>



  </div>



    `
})
export class CamModalComponent implements OnInit {


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








    }
    guardar(cam) {

      this.ordenTransporteService.setCamToOrder(cam, this.id).subscribe(list => {

        this.ref.close(list);

      });

    }



}
