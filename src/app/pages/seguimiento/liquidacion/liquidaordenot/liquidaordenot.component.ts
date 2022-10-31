import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { LiquidarComponent } from './modal.liquidar';

@Component({
  selector: 'app-liquidaordenot',
  templateUrl: './liquidaordenot.component.html',
  styleUrls: ['./liquidaordenot.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class LiquidaordenotComponent implements OnInit {
  cols: any[];
  id: any;
  id2: any;
  selected : any;
  ordenes: any;
  ref: DynamicDialogRef;
  constructor(private ordenTransporteService: OrdenTransporteService,
              private router: Router,
              public dialogService: DialogService, 
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {

    this.id  = this.activatedRoute.snapshot.params.uid;
    this.id2 = this.activatedRoute.snapshot.params.uid2;

    

    this.cols =
    [
        {header: 'ACC', field: 'numcp'  ,  width: '60px' },
        {header: 'OT', field: 'numcp'  ,  width: '80px' },
        {header: 'F. REGISTRO', field: 'fecharegistro' , width: '120px'  },
        {header: 'CLIENTE', field: 'razonsocial'  ,  width: '180px'  },
        {header: 'DESTINO', field: 'destino' , width: '120px'  },
        {header: 'ESTADO', field: 'estado'  , width: '90px'   },
        {header: 'T. TRANSPORTE', field: 'tipotransporte'  ,  width: '80px'  },
        {header: 'T. OPERACIÓN', field: 'tipooperacion' , width: '220px'  },
        {header: 'CANT', field: 'cantidad'  ,  width: '80px'  },
        {header: 'PESO', field: 'peso'  ,  width: '80px'  },
        {header: 'VOL', field: 'pesovol'  ,  width: '80px'  },
     ];
     this.buscar();
  }
  
  buscar() {

    //this.loading = true;
    this.ordenTransporteService.getAllOrdersxManifiesto(this.id).subscribe(list => {
      // this.loading = false;
       
        this.ordenes =  list;
        console.log(this.ordenes);
      
    });
}
  verguias(id){

    this.router.navigate(['/seguimiento/liquidardocumentos', id, this.id2 , this.id]);
  }
  liquidar(){


    
    // this.ordenTransporteService.liquidarOT(this.id).subscribe(list => {
    //     this.ordenes =  list;

        
    //     const url = 'http://104.36.166.65/webreports/ordencompra.aspx?idmanifiesto=' + String(this.id)
    //     window.open(url);
      
    // });

  }
  evento(id:number, ot: string) {
    // if(this.selectedRow  === null || this.selectedRow === undefined){
    //   this.messageService.add({severity: 'info', summary: 'No puede continuar', detail: 'Debe seleccionar  una orden'});
    //   return;
    // }
  
    //let id = this.selectedRow.id;
  
    this.ref = this.dialogService.open(LiquidarComponent, {
      header: 'Liquidar Orden de Transporte',
      width: '60%',
      height: '350px',
      data: { id : id, ot: ot },
      contentStyle: {'height': '350px', overflow: 'auto',  },
      
  });
  
    this.ref.onClose.subscribe((product: any) => {
       console.log(product);
       
       this.ordenTransporteService.getAllOrdersxManifiesto(this.id).subscribe(list => {
        // this.loading = false;
         
          this.ordenes =  list;
          
        
      });
      }
    )
  }
  volver() {
      this.router.navigate(['/seguimiento/pendientesmanifiestos', this.id2]);
  }
}
