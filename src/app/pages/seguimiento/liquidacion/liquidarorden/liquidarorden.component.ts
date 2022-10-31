import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
  selector: 'app-liquidarorden',
  templateUrl: './liquidarorden.component.html',
  styleUrls: ['./liquidarorden.component.scss']
})
export class LiquidarordenComponent implements OnInit {
  cols: any[];
  id: any;
  id2: any;
  selected : any;
  ordenes: any;
  public loading = false;
  constructor(private ordenTransporteService: OrdenTransporteService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {

    this.id  = this.activatedRoute.snapshot.params.uid;
    this.id2 = this.activatedRoute.snapshot.params.uid2;



    this.cols =
    [
        {header: 'ACC', field: 'numcp'  ,  width: '60px' },
        {header: 'OR', field: 'numcp'  ,  width: '80px' },
        {header: 'F. REGISTRO', field: 'fecharegistro' , width: '120px'  },
        {header: 'RESPONSABLE' , field: 'responsable'  , width: '120px'   },
        {header: 'CLIENTE', field: 'razonsocial'  ,  width: '180px'  },
        {header: 'F. CITA', field: 'fechahoracita' , width: '120px'  },
        {header: 'ESTADO', field: 'estado'  , width: '90px'   },
        {header: 'CONTACTO', field: 'personarecojo' , width: '120px'  },
        {header: 'T. UNIDAD', field: 'tipounidad'  ,  width: '80px'  },
        {header: 'PT. RECOJO', field: 'personarecojo' , width: '220px'  },
        {header: 'CE. ACOPIO', field: 'centroacopio' , width: '120px'  },
        {header: 'CANT', field: 'cantidad'  ,  width: '80px'  },
        {header: 'PESO', field: 'peso'  ,  width: '80px'  },
        {header: 'VOL', field: 'pesovol'  ,  width: '80px'  },
     ];
     this.buscar();
  }
  buscar() {

    this.ordenTransporteService.getAllLiquidacionPendientexManifiesto(this.id).subscribe(list => {

        this.ordenes =  list;

    });
}
  verguias(id){

    this.router.navigate(['/seguimiento/liquidardocumentos', id, this.id2 , this.id]);
  }
  liquidar(){

    this.confirmationService.confirm({
      message: '¿Esta seguro que desea liquidar esta Hoja de Ruta?',
      accept: () => {
        this.loading = true;


        this.ordenTransporteService.liquidarManifiesto(this.id, 1, '').subscribe(list => {

          const url = 'http://104.36.166.65/webreports/ordencompra.aspx?idmanifiesto=' + String(this.id2)
          window.open(url);
          this.buscar();

        });
      }
  });




  }
  volver() {
  this.router.navigate(['/seguimiento/liquidaciondocumentaria']);
  }

}
