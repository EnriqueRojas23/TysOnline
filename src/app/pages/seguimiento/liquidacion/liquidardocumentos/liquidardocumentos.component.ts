import { Identifiers } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { OtroServicioComponent } from './modal.otroservicio';

@Component({
  selector: 'app-liquidardocumentos',
  templateUrl: './liquidardocumentos.component.html',
  styleUrls: ['./liquidardocumentos.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class LiquidardocumentosComponent implements OnInit {
  cols: any[];
  id: any;
  id2: any;
  id3: any;
  selected : any;
  ordenes: any;
  ref: DynamicDialogRef;
  constructor(private ordenTransporteService: OrdenTransporteService,
              private router: Router,
              public dialogService: DialogService, 
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {

    this.id  = this.activatedRoute.snapshot.params.uid;
    this.id2  = this.activatedRoute.snapshot.params.uid2;
    this.id3  = this.activatedRoute.snapshot.params.uid3;

    

    this.cols =
    [
      {header: 'ACC', field: 'numcp'  ,  width: '60px' },
        {header: 'N° GRT', field: 'numeroguia'  ,  width: '80px' },
        {header: 'F. REGISTRO', field: 'fecharegistro' , width: '120px'  },
        {header: 'ESTADO', field: 'estado'  , width: '90px'   },

     ];
     this.buscar();
  }
  buscar() {
    this.ordenTransporteService.getAllGuiasAsignadasBlanco( this.id3, this.id).subscribe(list => {
        this.ordenes =  list;
    });
}
liquidar(id){
  this.ordenTransporteService.asignarGuiasBlanco(id, this.id).subscribe(list => {
this.buscar();
  
});
}
desvincular(id) {
  this.ordenTransporteService.desvincularGuiasBlanco(id, this.id).subscribe(list => {
      
    this.buscar();
});
}
extraviado(id) {
  this.ordenTransporteService.asignarGuiasBlancoExtraviado(id, this.id).subscribe(list => {
      
    this.buscar();
});
}
otroservicio(id) {

  let idorden = this.id;

  this.ref = this.dialogService.open(OtroServicioComponent, {
    header: 'Esta GRT se usó en otro Servicio',
    width: '60%',
    height: '350px',
    data: { id : id, ot: idorden },
    contentStyle: {'height': '350px', overflow: 'auto',  },
    
});

  this.ref.onClose.subscribe((product: any) => {
     console.log(product);
     
     this.buscar();
    }
  )
}
volver(){
  this.router.navigate(['/seguimiento/liquidarorden', this.id3, this.id2]);
}

}
