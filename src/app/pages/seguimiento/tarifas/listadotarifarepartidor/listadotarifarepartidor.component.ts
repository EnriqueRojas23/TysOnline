import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Tarifa, Ubigeo } from 'src/app/_models/Seguimiento/ordentransporte';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

@Component({
  selector: 'app-listadotarifarepartidor',
  templateUrl: './listadotarifarepartidor.component.html',
  styleUrls: ['./listadotarifarepartidor.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ListadotarifarepartidorComponent implements OnInit {

  propietarios: SelectItem[] = [];
  model: any  = {};
  selectedRow: Tarifa ;
  tarifas!: Tarifa[];
  ubigeo!: Ubigeo[];
  cols!: any[];
  idproveedor: number;

  constructor(private proveedorService: GeneralService
    , private messageService: MessageService
    , private activatedRoute: ActivatedRoute
    , private confirmationService: ConfirmationService
    , private router: Router) { }

  ngOnInit() {
    this.cols =
    [
        {header: 'ACCIONES', field: 'id' , width: '70px' },
        {header: 'PROVEEDOR', field: 'proveedor'  ,  width: '180px'  },
        {header: 'T. VEHÍCULO', field: 'tipoUnidad'  ,  width: '60px'  },
        // {header: 'DIST ORIGEN', field: 'distritoorigen'  ,  width: '120px'  },
        {header: 'DEP DESTINO', field: 'destinodepartamento' , width: '120px'  },
        {header: 'PROV DESTINO', field: 'destinoprovincia'  ,  width: '120px'  },
        {header: 'DIST DESTINO', field: 'destinoorigen'  ,  width: '120px'  },
        {header: 'PRECIO', field: 'destinoorigen'  ,  width: '120px'  },

      ];


    this.idproveedor  = this.activatedRoute.snapshot.params["uid"];

    this.proveedorService.getAllTarifas(this.idproveedor).subscribe(resp => {
      this.tarifas = resp;
      console.log(this.tarifas);

      }, error => {

      }, () => {

      });


  }
  edit(id: number): void {
    this.router.navigate(['proveedor/editartarifa',id, this.idproveedor]);
  }
  regresar() {
    this.router.navigate(['mantenimiento/listadoproveedores']);
  }
  delete(id: number): void {

    this.confirmationService.confirm({
      message: '¿Esta seguro que desea eliminar la tarifa?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      accept: () => {
         //  this.spinner.show();

           this.proveedorService.deleteTarifa(id).subscribe((resp: any) => {
          }, (error: any) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: error});
          }, () => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Se eliminó correctamente'});
            this.proveedorService.getAllTarifas(this.idproveedor).subscribe(resp => {

              this.tarifas = resp;

            });

              });
      },
      reject: () => {
          this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'You have rejected'});
      }
  });
  }
  agregarDireccion(id: number): void{

          // const dialogRef = this.dialog.open(DialogAgregarDireccion, {
          //   width: '650px',
          //   height: '500px',
          //   data: { codigo: id }
          // });
          // dialogRef.afterClosed().subscribe(result => {
          //   this.model.descripcionLarga = result.descripcionLarga;
          //   this.model.codigo = result.codigo;
          //   this.model.productoid = result.id;
          // });
    }


    close(): void{

    }
    cancel(): void {

    }
    nuevo(): void{
      this.router.navigate(['proveedor/nuevatarifarepartidor', this.idproveedor]);
    }

}
