import {Component, OnInit} from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';


@Component({
    template: `
        <p-table [value]="cars" [paginator]="true" [rows]="5" [responsive]="true">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="vin">Guias  <p-sortIcon field="vin"></p-sortIcon></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-car>
                <tr>
                    <td><span class="ui-column-title"></span>{{car.nroguia}}</td>
                </tr>
            </ng-template>
        </p-table>
    `
})
export class GuiasModalComponent  implements OnInit {

    cars: any[];

    constructor(private ordenService: OrdenTransporteService
        ,       public ref: DynamicDialogRef, public config: DynamicDialogConfig) {


            this.ordenService.getAllGuias(config.data.id ).subscribe(x => {
                this.cars = x;
                console.log(this.cars);
          });
         }

    ngOnInit() {

    }

    downloadFile(documentoId: number) {
        this.ordenService.downloadDocumento(documentoId).subscribe(
          (response: any) => {
              const dataType = response.type;
              const binaryData = [];
              binaryData.push(response);
              const downloadLink = document.createElement('a');
              downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
             // document.body.appendChild(downloadLink);
              // downloadLink.click();
             // this.createImageFromBlob(new Blob(binaryData, {type: dataType}));
              window.open(downloadLink.href);
          }
        );
      }

}
