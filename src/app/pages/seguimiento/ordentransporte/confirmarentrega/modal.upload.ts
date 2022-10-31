import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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

      <div class="form-group col-12">
      <p-fileUpload (uploadHandler)="myUploader($event)" (onUpload)="onUpload($event)" name="myfile[]"  customUpload="true" multiple="multiple"></p-fileUpload>
      </div>


  </div>



  </div>



    `
})
export class UploadModalComponent implements OnInit {


    model: any = {};
    id: any;
    ot: any;
    cols2: any[];
    es: any;
    dateInicio: Date = new Date(Date.now()) ;
    listaclientes: SelectItem[] = [];
    off: any  = false;
    uploadedFiles: any[] = [];

    constructor(
                public ref: DynamicDialogRef,
                private ordenService: OrdenReciboService,
                private ordenTransporteService: OrdenTransporteService,
                private confirmationService: ConfirmationService,
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
    myUploader(event) {


      for(let file of event.files) {

            const fileToUpload =  file as File;
            const formData = new FormData();
            formData.append('file', fileToUpload, fileToUpload.name);


        this.ordenService.uploadFileSite(formData,  this.id ).subscribe(event => {
             this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});

          }, error => {


         });

      }

    }

    onUpload(event) {

      for(let file of event.files) {
          this.uploadedFiles.push(file);

          console.log(file);
      }
      this.ref.close();

      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

    evento() {
      this.ordenTransporteService.VincularFactura(this.id, this.model.observacion).subscribe(list => {

          this.ref.close(list);

      });

    }

}
