import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';


import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { Documento, Incidencia } from 'src/app/_models/Seguimiento/incidencia';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';


@Component({
  selector: 'app-verorden',
  templateUrl: './verorden.component.html',
  styleUrls: ['./verorden.component.css'],
  providers: [ConfirmationService, MessageService, DialogService]

})
export class VerordenComponent implements OnInit, OnDestroy {



  constructor( private router: Router,
               private activatedRoute: ActivatedRoute,
               private toastr: ToastrService,
               private ordenService: OrdenTransporteService) { }
    id_interval: any;
    incidencias: Incidencia[] = [];
    id: any;
    lat = -12.0608335;
    lng = -76.9347693 ;
    zoom = 16;

    pageSizeOptions: number[] = [5, 10, 25, 50, 100];
    displayedColumns: string[] = [ 'Nombre', 'actionsColumn' ];
    documentos: Documento[];
    intervalId: number;
    text = 'Your Text Here';
    listData: MatTableDataSource<Documento>;
    target; options;
    cols: any[];
    cols2: any[];
    orden: OrdenTransporte = {};
  imageToShow: any;
  escliente: any;
  
  ngOnDestroy(): void {
    if (this.id_interval) {
      clearInterval(this.id_interval);
    }
  }

   reload_location(lng, lat) {
    navigator.geolocation.watchPosition( pos => {
      this.lng =  +lng;
      this.lat = +lat;
    });

   }



  ngOnInit() {
    this.cols = [
      { field: 'fecha_incidencia', header: 'Fecha Incidencia',  width: '20%'},
      { field: 'incidencia', header: 'Incidencia' ,  width: '20%'},
      { field: 'observacion', header: 'Observación' ,  width: '30%'},
      { field: 'usuario', header: 'Usuario',  width: '20%' },
     
  ];
    this.cols2 = [
      { field: 'nombre', header: 'Nombre',  width: '20%'},
      { field: 'usuario', header: 'Acciones',  width: '20%' }
    ];

    this.target = {
      latitude : 0,
      longitude: 0
    };
    this.escliente = localStorage.getItem('escliente');
    this.options = {
      enableHighAccuracy: false,
      timeout: 1000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition( pos => {
      this.lng =  +this.lng;
      this.lat = +this.lat;
    });
    this.id  = this.activatedRoute.snapshot.params.uid;

    this.ordenService.getOrden(this.id).subscribe(orden => {
        
     
         this.orden = orden[0];
         this.lng = this.orden.lng;
         this.lat = this.orden.lat;

         

         this.reload_location(this.lng, this.lat );
             
      });



    this.ordenService.getAllDocumentos( this.id ).subscribe(list1 => {

        this.documentos = list1;

        });
    this.ordenService.getAllIncidencias(this.id).subscribe(list => {
            
            this.incidencias = list;
            

          });

  }


createImageFromBlob(image: Blob) {
   const reader = new FileReader();
   reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
      console.log(reader.result);

   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}
downloadFile(documentoId: number) {
    this.ordenService.downloadDocumento(documentoId).subscribe(
      (response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));


          window.open(downloadLink.href);
      }
    );
  }

deleteVendorRecord(nose: any) {
    alert(nose);

  }
volver() {
    this.router.navigate(['/seguimiento/listadoordentransporte']);
  }

}
