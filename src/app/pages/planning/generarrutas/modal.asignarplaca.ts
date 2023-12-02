import { ConfirmarentregaComponent } from './../../seguimiento/ordentransporte/confirmarentrega/confirmarentrega.component';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { Cuadrilla } from 'src/app/_models/Seguimiento/guiaremisionblanco';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
    template: `
    <div class="p-fluid p-grid">
        <div class="col-md-8 mt-2 offset-2">
        <label for="dni">Vehículo: </label>

              <p-dropdown name="vehiculos"
                          [virtualScroll]="true" itemSize="30"
                            [options]="vehiculos" [(ngModel)]="model.idvehiculo"
                            [showClear]="true" class="input-form-field"
                              placeholder="Seleccione un vehículo"
                            [style]="{'width':'100%'}" [resetFilterOnHide]="false"
                            [hideTransitionOptions]="'0ms'" required
                            [showTransitionOptions]="'0ms'"
                            filter="false">
                                <ng-template let-item pTemplate="selectedItem">
                                    <span style="vertical-align:left;">{{item.label}}</span>
                                </ng-template>
                          </p-dropdown>

        </div>

        <div class="col-md-8 mt-2 offset-2">
        <label for="dni">Ruta: </label>

              <p-dropdown name="rutas"
                          [virtualScroll]="true" itemSize="30"
                            [options]="rutas" [(ngModel)]="model.idruta"
                            [showClear]="true" class="input-form-field"
                              placeholder="Seleccione una ruta"
                            [style]="{'width':'100%'}" [resetFilterOnHide]="false"
                            [hideTransitionOptions]="'0ms'" required
                            [showTransitionOptions]="'0ms'"
                            filter="false">
                                <ng-template let-item pTemplate="selectedItem">
                                    <span style="vertical-align:left;">{{item.label}}</span>
                                </ng-template>
                          </p-dropdown>

        </div>


        <div class="col-md-8 mt-5  offset-2">

            <label for="dni">Fecha y Hora de Salida: </label>
            <p-calendar appendTo="body" [showTime]="true" [(ngModel)]="model.fechahorasalidaplanning"  [showSeconds]="false"></p-calendar>
        </div>

        <div class="col-md-8 mt-5  offset-2">
          <button   class='btn-primary btn btn-block' pButton iconPos="left" label="Confirmar" icon="fa fa-check"   (click)="agregar()"  type="button"></button>
        </div>
    </div>

    <p-confirmDialog  header="Confirmación" icon="pi pi-exclamation-triangle"></p-confirmDialog>


    `
})
export class AsignarPlacaComponent implements OnInit {

    cuadrilla: Cuadrilla[];
    model: any = {};
    vehiculos : SelectItem[] = [];
    rutas : SelectItem[] = [];
    user: User ;
    loading = false;

    constructor(private generalService: GeneralService,
                public ref: DynamicDialogRef,
                private toastr: ToastrService,
                private confirmationService: ConfirmationService,
                public messageService: MessageService,
                private ordenTransporteService: OrdenTransporteService,
                public config: DynamicDialogConfig) {
                    this.model.idcarga = config.data.idcarga;

                    console.log(this.model.idcarga, 'carga');

                }

    ngOnInit(): void {

      this.user = JSON.parse(localStorage.getItem('user'));
      this.model.idplanificador = this.user.usr_int_id;



      this.generalService.getVehiculosxEstado('2').subscribe(list => {
         list.forEach(x => {
          this.vehiculos.push({ value: x.idvehiculo , label: x.placa   });
         })
       });

       this.generalService.getRutas().subscribe(list => {
        list.forEach(x => {
         this.rutas.push({ value: x.idruta , label: x.nombre   });
        })
      });



    }
    agregar() {

      this.loading = true;

      this.confirmationService.confirm({
        message: '¿Esta seguro que desea confirmar el despacho?',
        accept: () => {

          this.ordenTransporteService.confirmarDespacho(this.model).subscribe(resp => {
            this.toastr.success( "Se ha confirmado el despacho con éxito." , 'Planning', { closeButton: true });

            this.ref.close();
            this.loading = false;

          } , (error)=> {
                    this.toastr.error( error.error , 'Planning', { closeButton: true });
          });




        },
        reject: () => {
            this.ref.close();
        }

     });

    }

}
