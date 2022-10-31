import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { DateAdapter } from 'angular-calendar';
import { SelectItem, MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
  selector: 'app-pendientesliquidacion',
  templateUrl: './pendientesliquidacion.component.html',
  styleUrls: ['./pendientesliquidacion.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService,
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class PendientesliquidacionComponent implements OnInit {

    clientes: SelectItem[] = [];
    ubigeo: SelectItem[] = [];
    estados: SelectItem[] = [];

    ordenes: OrdenTransporte[] = [];
    ordenesot: OrdenTransporte[] = [];


    selected: OrdenTransporte[];
    loading: any;
    model: any = {};
    ProveedorLoaded = false;
    UbigeoLoaded = false;
    cols: any[];
    es: any;
    frozenCols: any[];
    user: User ;
    ref: DynamicDialogRef;
    dateInicio: Date = new Date(Date.now()) ;
    dateFin: Date = new Date(Date.now()) ;
    imageToShow: any;


    constructor(private ordenTransporteService: OrdenTransporteService,
                public dialogService: DialogService,
                private router: Router,
                private confirmationService: ConfirmationService,
                public messageService: MessageService
                ) { }

    ngOnInit() {

      this.user = JSON.parse(localStorage.getItem('user'));

      this.model.idusuario = this.user.usr_int_id;
      this.dateInicio.setDate((new Date()).getDate() - 30);
      this.dateFin.setDate((new Date()).getDate() );
      this.model.numcp = '';
      this.model.docreferencia = '';
      this.model.grr = '';



      this.cols =
      [
        {header: 'ACC', field: 'numcp'  ,  width: '60px' },
          {header: 'HR', field: 'numhojaruta'  ,  width: '80px' },
          {header: 'F. REGISTRO', field: 'fecharegistro' , width: '120px'  },
          {header: 'CONDUCTOR' , field: 'conductor'  , width: '120px'   },
          {header: 'ESTADO', field: 'estado'  , width: '90px'   },
          {header: 'CANT', field: 'bulto'  ,  width: '80px'  },
          {header: 'PESO', field: 'peso'  ,  width: '80px'  },
          {header: 'VOL', field: 'volumen'  ,  width: '80px'  },
      ];



      this.es = {
        firstDayOfWeek: 1,
        dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
        dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
        dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
        monthNames: [ 'enero', 'febrero', 'marzo', 'abril',
        'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
        monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
        today: 'Hoy',
        clear: 'Borrar'
    };





    }

    // editar(id) {

    //   let idvehiculo = this.ordenes[0].idvehiculo;
    //   this.router.navigate(['/seguimiento/liquidarorden', id, idvehiculo]);


    // }
    editarOT(id){

      if(id.tipoorden === "2" )
      {
        //let idvehiculo = this.ordenes[0].idvehiculo;
        this.router.navigate(['/seguimiento/liquidarorden', id.idmanifiesto,id.numhojaruta]);
      }
      else {
        this.router.navigate(['/seguimiento/pendientesmanifiestos', id.numhojaruta]);
      }


    }

    verguias(id) {
      console.log(id);
      let idvehiculo = this.ordenes[0].idvehiculo;
      this.router.navigate(['/seguimiento/liquidarorden', id, idvehiculo]);

    }



    buscar() {

      this.model.fec_ini = this.dateInicio;
      this.model.fec_fin = this.dateFin;

        this.loading = true;
        this.ordenTransporteService.getAllLiquidacionPendiente(this.model).subscribe(list => {
          this.loading = false;
          this.ordenes =  list;


        });
        // this.ordenTransporteService.getAllLiquidacionPendienteOT(this.model).subscribe(list => {
        //   this.loading = false;
        //   this.ordenesot =  list;
        //   console.log(this.ordenes);

        // });
    }





  }

