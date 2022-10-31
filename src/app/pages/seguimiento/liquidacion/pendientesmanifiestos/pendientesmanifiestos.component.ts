import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { LiquidarManifiestoComponent } from './modal.liquidarmanifiesto';

@Component({
  selector: 'app-pendientesmanifiestos',
  templateUrl: './pendientesmanifiestos.component.html',
  styleUrls: ['./pendientesmanifiestos.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class PendientesmanifiestosComponent implements OnInit {

  cols: any[];
  id: any;
  id2: any;
  selected : any;
  ordenes: any;
  selectedRow: any;
  ref: DynamicDialogRef;
  liquidado = false;





  constructor(private ordenTransporteService: OrdenTransporteService,
              private router: Router,
              public dialogService: DialogService,
              public messageService: MessageService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {

    this.id  = this.activatedRoute.snapshot.params.uid;

    this.cols =
    [
        {header: 'ACC', field: 'numcp'  ,  width: '80px' },
        {header: 'N° MANIFIESTO', field: 'nummanifiesto'  ,  width: '80px' },
        {header: 'F. REGISTRO', field: 'fecharegistro' , width: '120px'  },
        {header: 'RESPONSABLE' , field: 'responsable'  , width: '120px'   },
        {header: 'DESTINO' , field: 'destino'  , width: '120px'   },
        {header: 'TIPO OPERACIÓN' , field: 'tipooperacion'  , width: '120px'   },
        {header: 'TIPO TRANSPORTE' , field: 'tipotransporte'  , width: '120px'   },
        {header: 'PROVEEDOR' , field: 'proveedor'  , width: '180px'   },
        {header: 'ESTADO', field: 'estado'  , width: '90px'   },
        {header: 'BULTOS', field: 'bultos' , width: '120px'  },
        {header: 'PESO', field: 'peso'  ,  width: '80px'  },
        {header: 'VOLUMEN', field: 'personarecojo' , width: '80px'  },

     ];
     this.buscar();
  }
  buscar() {

    this.ordenTransporteService.getAllManifiestoPendientes(this.id).subscribe(list => {
        this.ordenes =  list;


        this.ordenes.forEach(element => {
           if(element.estado == "Completado"){
              this.liquidado = true;
           }
           else {
             this.liquidado = false;
           }
        });



    });
}
  verguias(id){
    this.router.navigate(['/seguimiento/liquidarordenot', id, this.id]);
  }
  imprimirOC() {
    const url = 'http://104.36.166.65/webreports/ordencompra.aspx?idmanifiesto=' + String(this.id)
    window.open(url);
  }
  // liquidar(){
  //   this.ordenTransporteService.liquidarManifiesto(this.id, ).subscribe(list => {
  //      console.log(this.ordenes);
  //       this.ordenes =  list;
  //       const url = 'http://104.36.166.65/webreports/ordencompra.aspx?idmanifiesto=' + String(this.id)
  //       window.open(url);
  //   });
  // }
  volver() {
      this.router.navigate(['/seguimiento/liquidaciondocumentaria']);
    }

    evento() {
      if(this.selectedRow  === null || this.selectedRow === undefined){
        this.messageService.add({severity: 'info', summary: 'No puede continuar', detail: 'Debe seleccionar un manifiesto'});
        return;
      }

      let id = this.selectedRow.idmanifiesto;

      this.ref = this.dialogService.open(LiquidarManifiestoComponent, {
        header: 'Liquidar Orden de Transporte',
        width: '60%',
        height: '350px',
        data: { id : id },
        contentStyle: {'height': '350px', overflow: 'auto',  },

    });

      this.ref.onClose.subscribe((product: any) => {
         this.buscar();
        }
      )
    }

}
