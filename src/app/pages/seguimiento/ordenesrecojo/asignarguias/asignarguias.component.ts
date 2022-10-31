
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { GuiaRemisionBlanco } from 'src/app/_models/Seguimiento/guiaremisionblanco';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
  selector: 'app-asignarguias',
  templateUrl: './asignarguias.component.html',
  styleUrls: ['./asignarguias.component.scss'],
  providers: [DialogService, MessageService]
})
export class AsignarguiasComponent implements OnInit {
  id:any;
  model:any= {};
  public loading = false;
  guiablanco: GuiaRemisionBlanco[] = [];
  selected: GuiaRemisionBlanco[];
  cols: any[];
  idvehiculo: string;

  constructor(private ordenTransporteService: OrdenTransporteService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public messageService: MessageService
              ) { }

  ngOnInit() {

    this.id  = this.activatedRoute.snapshot.params.uid;
    this.idvehiculo  = this.activatedRoute.snapshot.params.uid2;
    //alert(this.id);

    this.cols =
    [
        {header: 'PLACA', field: 'placa' , width: '120px'  },
        {header: 'GUIA REMISION', field: 'numeroguia'  ,  width: '180px'  },
        {header: 'FECHA ', field: 'fecharegistra' , width: '120px'  },
     ];


     this.ordenTransporteService.GetGuiaRemisionBlancoPorVehiculo(this.id).subscribe(resp1 => {
      this.loading = false;
      this.guiablanco =  resp1;
  });
  }
  eliminar(id) {


    this.ordenTransporteService.EliminarGuiaEnBlanco(id).subscribe(resp => {

      this.ordenTransporteService.GetGuiaRemisionBlancoPorVehiculo(this.id).subscribe(resp1 => {
        this.loading = false;
        this.guiablanco =  resp1;
        console.log(this.guiablanco);
    });


    });
  }
  volver() {
    this.router.navigate(['/seguimiento/listadoplacasprogramadas']);
  }
  focusOutFunction(){


    this.model.idmanifiesto = this.id;
    this.model.idvehiculo = this.idvehiculo;

      this.ordenTransporteService.RegistroGuiaRemisionBlanco(this.model).subscribe(resp => {
      if(resp === null)
      {
        this.messageService.add({severity: 'info', summary: 'La GRT ya existe.', detail: ''});
      }
      this.loading = false;

      this.ordenTransporteService.GetGuiaRemisionBlancoPorVehiculo(this.id).subscribe(resp1 => {
          this.loading = false;
          this.guiablanco =  resp1;
      });

    });


  }



}
