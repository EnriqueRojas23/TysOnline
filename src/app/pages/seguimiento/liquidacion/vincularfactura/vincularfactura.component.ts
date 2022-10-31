import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem, MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { OrdenTransporte } from 'src/app/_models/Seguimiento/ordentransporte';
import { User } from 'src/app/_models/user';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { VincularComponent } from './modal.vincular';

@Component({
  selector: 'app-vincularfactura',
  templateUrl: './vincularfactura.component.html',
  styleUrls: ['./vincularfactura.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class VincularfacturaComponent implements OnInit {

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
  items: MenuItem[];


  constructor(private ordenTransporteService: OrdenTransporteService,
              public dialogService: DialogService,
              private router: Router,
              private confirmationService: ConfirmationService,
              public messageService: MessageService
              ) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.items = [
      {label: 'Update', icon: 'pi pi-refresh', command: () => {
         // this.update();
      }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
          // this.delete();
      }},
      {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      {separator: true},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];
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
        // {header: 'FOTOS', field: 'numcp'  ,  width: '55px' },
        {header: 'F. REGISTRO', field: 'fecharegistro' , width: '120px'  },
        {header: 'CONDUCTOR' , field: 'conductor'  , width: '120px'   },
        {header: 'PROVEEDOR', field: 'estado'  , width: '90px'   },
        {header: 'PLACA', field: 'estado'  , width: '90px'   },
        {header: 'TIPO DE VEHICULO', field: 'estado'  , width: '90px'   },

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


   this.buscar();





  }
  exportExcel() {

  }
  evento(id:string) {

          this.ref = this.dialogService.open(VincularComponent, {
            header: 'Vincular Factura',
            width: '60%',
            height: '350px',
            data: { id : id},
            contentStyle: {'height': '350px', overflow: 'auto',  },

        });

          this.ref.onClose.subscribe((product: any) => {


            this.messageService.add({severity: 'success', summary: 'Facturación vs OS', detail: product});

            alert("Código de facturación: " +  product);


            this.buscar();


            }
          )
  }
  editar(id) {

    let idvehiculo = this.ordenes[0].idvehiculo;
  this.router.navigate(['/seguimiento/liquidarorden', id, idvehiculo]);


  }
  editarOT(id){
     this.router.navigate(['/seguimiento/pendientesmanifiestos', id]);
  }

  verguias(id) {
    let idvehiculo = this.ordenes[0].idvehiculo;
    this.router.navigate(['/seguimiento/liquidarorden', id, idvehiculo]);

  }
  save(info: string) {
    let resumen = '';
    this.selected.forEach(res => {
      resumen = resumen + ',' + res.idordentrabajo.toString();
     });
    this.router.navigate(['/seguimiento/asignarequipotransporte', resumen]);
  }
  eliminar(id) {

    this.confirmationService.confirm({
      message: '¿Esta seguro que desea elminar esta OR?',
      accept: () => {
        this.loading = true;
        this.model.responsablecomercialid = this.user.usr_int_id;
        this.model.idordentrabajo = id;
        this.ordenTransporteService.eliminar(this.model).subscribe(resp => {

         // this.toastr.show('Se ha actualizado correctamente la OR.' );
          this.loading = false;
          this.router.navigate(['/seguimiento/ordenrecojo']);
        });
      }
  });

  }

  buscar() {

    this.model.fec_ini = this.dateInicio;
    this.model.fec_fin = this.dateFin;

      this.loading = true;
      this.ordenTransporteService.getAllPendienteFacturacion(this.model.dni).subscribe(list => {
        this.loading = false;
        this.ordenes =  list;


      });

  }
  getFiles(id, event, overlaypanel: OverlayPanel) {
    this.ordenTransporteService.getAllDocumentos(id).subscribe(list => {
        this.downloadFile(list[2].id);
        overlaypanel.toggle(event);
   });
  }
  downloadFile(documentoId: number) {

    this.ordenTransporteService.downloadDocumento(documentoId).subscribe(
       (response: any) => {
           const dataType = response.type;
           const binaryData = [];
           binaryData.push(response);
           const downloadLink = document.createElement('a');
           downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));

           this.createImageFromBlob(new Blob(binaryData, {type: dataType}));

       }
     );
   }
   createImageFromBlob(image: Blob) {

    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.imageToShow = reader.result;
       console.log(reader.result);

    }, false);

    if(image) {
       reader.readAsDataURL(image);
    }
 }


}

