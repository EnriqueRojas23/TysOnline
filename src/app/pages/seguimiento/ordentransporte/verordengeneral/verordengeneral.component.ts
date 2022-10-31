

import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Incidencia } from 'src/app/_models/Seguimiento/incidencia';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';


@Component({
  selector: 'app-verordengeneral',
  templateUrl: './verordengeneral.component.html',
  styleUrls: ['./verordengeneral.component.scss']
})
export class VerordengeneralComponent implements OnInit {

  id: any;
  incidencias: Incidencia[] = [];
  id_interval: any;
  incidencias1: Incidencia[] = [];
  incidencias2: Incidencia[] = [];
  orden: OrdenTransporte = {};
  oriflame: OrdenTransporte = {};
  target; options;

  cols: any[];
  cols2: any[];

  lat = -12.0608335;
  lng = -76.9347693 ;
  zoom = 16;

  documentos: any[];
  cargando = true;


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private ordenService: OrdenTransporteService) { }

  ngOnInit() {

    this.cargando = true;

    this.target = {
      latitude : 0,
      longitude: 0
    };

    this.options = {
      enableHighAccuracy: false,
      timeout: 1000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition( pos => {
      this.lng =  +this.lng;
      this.lat = +this.lat;
    });

    this.cols2 = [
      { field: 'nombre', header: 'Nombre',  width: '20%'},
      { field: 'usuario', header: 'Acciones',  width: '20%' }
    ];
    this.cols = [
      { field: 'fecha_incidencia', header: 'Fecha Incidencia',  width: '20%'},
      { field: 'incidencia', header: 'Incidencia' ,  width: '20%'},
      { field: 'observacion', header: 'Observación' ,  width: '30%'},
      { field: 'usuario', header: 'Usuario',  width: '20%' },
     //  { field: 'usuario', header: 'Acciones',  width: '10%' }
  ];





    this.id  = this.activatedRoute.snapshot.params.uid;

    this.ordenService.getOrdenOriflame(this.id).subscribe(oriflame => {
      this.oriflame  = oriflame;
       if(this.oriflame == null){
        this.cargando = false;
         return ;
       }
    this.ordenService.getOrden(oriflame.idordentrabajo).subscribe(orden => {
      this.cargando = false;

      this.orden = orden[0];
      this.lng = this.orden.lng;
      this.lat = this.orden.lat;

      this.reload_location(this.lng, this.lat );


      this.ordenService.getAllIncidencias(oriflame.idordentrabajo).subscribe(list => {
       this.incidencias = list;

            this.ordenService.getAllDocumentos(oriflame.idordentrabajo).subscribe(x => {
              this.documentos = x;
              console.log(x);


             }, error => {
              this.cargando = false;
            }, () => {

            });

           });
       });


    }, error => {
      this.cargando = false;
    }, () => {

    });



  }
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



}
