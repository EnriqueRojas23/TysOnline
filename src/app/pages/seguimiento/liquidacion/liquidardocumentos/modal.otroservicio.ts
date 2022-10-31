import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdenReciboService } from 'src/app/_services/Seguimiento/ordenrecibo.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';



@Component({
    template: `



  <div class="card card-border-color card-border-color-primary">
  <div class="card-body">
   <div class="row">
          <div class=" ui-md-3 col-3">
                  <h5>Número de GRT:</h5>

            </div>
        <div class="form-group col-4">
        <h6>Documento</h6>
        <textarea rows="2" cols="80" [(ngModel)]="model.grt" pInputTextarea autoResize="autoResize"></textarea>

      </div>


  </div>

  <div class="form-group col-4">
  <button pButton  class="p-button-danger btn-block" label="Liquidar" (click)="evento()"  >  </button>
  </div>

  </div>



    `
})
export class OtroServicioComponent implements OnInit {


    model: any = {};
    id: any;
    ot: any;
    cols2: any[];
    es: any;
    dateInicio: Date = new Date(Date.now()) ;
    listaclientes: SelectItem[] = [];
    off: any  = false;

    constructor(
                public ref: DynamicDialogRef,
                private ordenTransporteService: OrdenTransporteService,
                public messageService: MessageService,
                public config: DynamicDialogConfig) {

                     this.id = config.data.id;
                     this.ot = config.data.ot;



                 }

    ngOnInit(): void {



    }

    evento() {

      this.ordenTransporteService.asignarGuiasBlanco(this.id,this.ot).subscribe(list => {
        this.ref.close();

        });

    }

}
