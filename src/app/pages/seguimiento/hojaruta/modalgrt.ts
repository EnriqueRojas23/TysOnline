import {Component, OnInit} from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';


@Component({
    template: `

            <div class=" mb-3 col-md-12">



                <h6>GRT :</h6>
                <input type="text" name="grt" autocomplete="off" class="form-control"   [(ngModel)]="model.grt"   placeholder="Número de OT"   pInputText />

                <div class=" mb-3 col-md-4">
                    <button  class='btn-primary btn-block btn' pButton iconPos="left" label="Generar" icon="fa fa-plus"  (click)="generar()"  type="button"></button>
              </div>

            </div>

    `
})
export class GrtModalComponent  implements OnInit {


    model : any = {};
    ordenes2: OrdenTransporte[] = [];
    numhojaruta : string ;
    cols: any[];



    constructor(private ordenService: OrdenTransporteService
        ,       public ref: DynamicDialogRef, public config: DynamicDialogConfig) {

               this.numhojaruta =   config.data.hojaruta;

         }

    ngOnInit() {

      this.cols =
      [
          {header: 'ACCIÓN', field: 'idordentrabajo'  ,  width: '80px' },
          {header: 'N° OT', field: 'idordentrabajo'  ,  width: '105px' },
          {header: 'REMITENTE', field: 'remitente' , width: '180px'  },
          {header: 'TIPO DE OPERACIÓN', field: 'tipooperacion' , width: '100px'  },
          {header: 'DESTINATARIO', field: 'destinatario'  , width: '180px'   },
          {header: 'PESO', field: 'peso' , width: '180px'  },
          {header: 'BULTO', field: 'bulto' , width: '180px'  },

      ];

      this.ordenService.getAllOrdersForDespachoAll(this.numhojaruta).subscribe(list =>  {

           this.ordenes2 =   list;

        });
    }



    generar() {

      this.ordenService.generarGrt(this.numhojaruta ,  this.model.grt).subscribe ( x=> {


        console.log(this.ordenes2);


        let idcarga = this.ordenes2[0].idcarga;

        var url = "http://104.36.166.65/webreports/guiatransportista.aspx?idcarga=" + + String(idcarga);
        window.open(url);

        this.ref.close();


      });

    }


}
