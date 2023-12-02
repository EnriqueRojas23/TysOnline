import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { BuscarChoferComponent } from './modal.buscarchofer';
import { BuscarPlacaComponent } from './modal.buscarplaca';


@Component({
  selector: 'app-asignarequipotransporte',
  templateUrl: './asignarequipotransporte.component.html',
  styleUrls: ['./asignarequipotransporte.component.scss'],
  providers: [DialogService, MessageService]
})
export class AsignarequipotransporteComponent implements OnInit {
  model: any = {};
  transporte: any = {};
  id: any;
  ref: DynamicDialogRef;
  bitplacaencontrada = false;
  public loading = false;
  constructor(private ordenTransporteService: OrdenTransporteService
    ,         private activatedRoute: ActivatedRoute
    ,         private toastr: ToastrService
    ,         private router: Router
    ,         public dialogService: DialogService, public messageService: MessageService) { }

  ngOnInit() {
    const ids = this.activatedRoute.snapshot.params.uid;
    this.ordenTransporteService.getordenestransportexids(ids).subscribe(resp =>
      {
          this.model.numcp = '';
          resp.forEach(x => {
            this.model.ids = this.model.ids +  ', ' + x.idordentrabajo.toString();
            this.model.numcp = this.model.numcp +  ', ' + x.numcp.toString();
          });
          this.model.numcp = this.model.numcp.substring(1, this.model.numcp.length - 1);
      });

     // this.ordenTransporteService.GetEquipoTransporteAsociado(ids)
  }
  placaencontrada(): boolean {
        return this.bitplacaencontrada;
  }
  registrar(form: NgForm) {

    this.loading = true;

    this.ordenTransporteService.vincularEquipoTransporte(this.model).subscribe(resp => {
          this.transporte = resp;
          console.log(resp);

          this.toastr.show('Se ha actualizado correctamente la OR.' );
          this.loading = false;
          this.router.navigate(['/seguimiento/ordenrecojo']);

          this.model.estadoid = '';
          this.model.grr = '';
          this.model.grt = '';

          const url = 'http://104.36.166.65/webreports/hojarutaor.aspx?idmanifiesto=' + String(resp)

          window.open(url);

        }, error => {
          this.toastr.error('Ha ocurrido un error. Comunícate con TI.' );
          this.loading = false;
          this.router.navigate(['/seguimiento/ordenrecojo']);

        }, () => {
  });
}
  onBlurMethod(placa){
    this.ordenTransporteService.getEquipoTransporte(placa).subscribe(res =>
      {
            this.bitplacaencontrada = true;

            this.messageService.add({severity: 'info', summary: 'Vehículo seleccionado', detail: res.proveedor});
            this.model.datosunidad = res.datosunidad;
            this.model.proveedor = res.proveedor;
            this.model.idproveedor = res.idproveedor;
            this.model.idvehiculo = res.idvehiculo;
            this.model.idchofer = res.idchofer;
            this.model.dni = res.dni;
            this.model.nombrechofer = res.nombrechofer;
            this.model.brevete = res.brevete;
      });
    }
    buscarchofer() {
      this.ref = this.dialogService.open(BuscarChoferComponent, {
        header: 'Escoge un vehículo',
        width: '40%',
        contentStyle: {'max-height': '400px', overflow: 'auto'},
        baseZIndex: 10000
    });

      this.ref.onClose.subscribe((product: any) => {

        console.log(product);
        if (product === undefined) { return; }
        else{
            this.model.dni = product.dni;
            this.model.nombrechofer = product.nombrechofer;
            this.model.brevete = product.brevete;
            this.model.idchofer = product.idchofer;


            this.messageService.add({severity: 'info', summary: 'Chofer seleccionado', detail: product.nombrechofer});
        }
    });
    }


    buscarplaca() {
      this.ref = this.dialogService.open(BuscarPlacaComponent, {
        header: 'Escoge un vehículo',
        width: '40%',
        contentStyle: {'max-height': '400px', overflow: 'auto'},
        baseZIndex: 10000
    });

      this.ref.onClose.subscribe((product: any) => {
        if (product === undefined) { return; }
        else{
          console.log(product);
          this.model.placa = product.placa;
          this.bitplacaencontrada = true;
          this.model.idvehiculo = product.idvehiculo;

          this.model.datosunidad = product.datosunidad;
          this.model.proveedor = product.proveedor;
          this.model.idproveedor = product.idproveedor;
          this.model.idvehiculo = product.idvehiculo;
          this.model.idchofer = product.idchofer;
          this.model.dni = product.dni;
          this.model.nombrechofer = product.nombrechofer;
          this.model.brevete = product.brevete;


          this.messageService.add({severity: 'info', summary: 'Vehículo seleccionado', detail: product.placa});
        }
    });
    }

}
