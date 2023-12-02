import {Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';


@Component({
    styleUrls: ['./generarrutas.component.scss'],
    template: `

      <div class="col-12 mt-5">



                  <h6>Seleccionar tipo de operación  Etapa 1 :</h6>

                  <p-dropdown name="tiposunidad"
                    [options]="tiposunidad" [(ngModel)]="model.idtipooperacion"
                    scrollHeight="20vh"  class="input-form-field"
                    appendTo="body"
                    [baseZIndex]="100000"
                    [virtualScroll]="true" itemSize="4"
                    [style]="{'width':'100%'}" [resetFilterOnHide]="false"
                      placeholder="seleccione un tipo de operacion"
                    [hideTransitionOptions]="'0ms'"
                    [showTransitionOptions]="'0ms'"
                    filter="false">
                        <ng-template let-item pTemplate="selectedItem">
                            <span style="vertical-align:left;">{{item.label}}</span>
                        </ng-template>
                  </p-dropdown>


                  <div class="mt-4" *ngIf="model.idtipooperacion === 123">


                  <h6>Seleccionar la agencia :</h6>

                  <p-dropdown name="agencias"
                    [options]="agencias" [(ngModel)]="model.idagencia"
                    scrollHeight="20vh"  class="input-form-field"
                    appendTo="body"
                    [baseZIndex]="100000"
                    [virtualScroll]="true" itemSize="4"
                    [style]="{'width':'100%'}" [resetFilterOnHide]="false"
                    [hideTransitionOptions]="'0ms'"
                    [showTransitionOptions]="'0ms'"
                    placeholder="seleccione una agencia"
                    filter="false">
                        <ng-template let-item pTemplate="selectedItem">
                            <span style="vertical-align:left;">{{item.label}}</span>
                        </ng-template>
                  </p-dropdown>

                  </div>

                  <div class="mt-4" *ngIf="model.idtipooperacion === 124">


                    <h6>Seleccionar la estación :</h6>

                    <p-dropdown name="estaciones"
                      [options]="estaciones" [(ngModel)]="model.idestacion"
                      scrollHeight="20vh"  class="input-form-field"
                      appendTo="body"
                      [baseZIndex]="100000"
                      [virtualScroll]="true" itemSize="4"
                      [style]="{'width':'100%'}" [resetFilterOnHide]="false"
                      [hideTransitionOptions]="'0ms'"
                      [showTransitionOptions]="'0ms'"
                      placeholder="seleccione una estación"
                      filter="false">
                          <ng-template let-item pTemplate="selectedItem">
                              <span style="vertical-align:left;">{{item.label}}</span>
                          </ng-template>
                    </p-dropdown>

                    </div>


                  <div class="mt-4" *ngIf="model.idtipooperacion === 18139">


                      <h6>Seleccionar el repartidor :</h6>

                      <p-dropdown name="repartidores"     id="repartidores"
                        [options]="repartidores" [(ngModel)]="model.idrepartidor"
                        scrollHeight="20vh"  class="input-form-field"
                        appendTo="body"
                        [baseZIndex]="100000"
                        (onChange)="mostrarDireccion()"
                        [virtualScroll]="true" itemSize="4"
                        [style]="{'width':'100%'}" [resetFilterOnHide]="false"
                        [hideTransitionOptions]="'0ms'"
                        [showTransitionOptions]="'0ms'"
                        placeholder="seleccione un repartidor"
                        filter="false">
                            <ng-template let-item pTemplate="selectedItem">
                                <span style="vertical-align:left;">{{item.label}}</span>
                            </ng-template>
                      </p-dropdown>

                      </div>
                      <div class="titulo mt-4" *ngIf="model.idtipooperacion === 18139">
                        Distrito vinculado al repartidor :  {{ distrito }}
                      </div>

              </div>

              <!-- <div *ngIf="model.idtipooperacion !== 124" class="col-12 mt-5">

              <h6>Seleccionar tipo de operación  Etapa 2 :</h6>

              <p-dropdown name="tiposunidad2"
                    [options]="tiposunidad" [(ngModel)]="model.idtipooperacion2"
                    scrollHeight="20vh"  class="input-form-field"
                    appendTo="body"
                    [baseZIndex]="100000"
                    [virtualScroll]="true" itemSize="4"
                    [style]="{'width':'100%'}" [resetFilterOnHide]="false"
                    [hideTransitionOptions]="'0ms'"
                    [showTransitionOptions]="'0ms'"
                    filter="false">
                        <ng-template let-item pTemplate="selectedItem">
                            <span style="vertical-align:left;">{{item.label}}</span>
                        </ng-template>
                  </p-dropdown>

              </div> -->




              <div class="col-md-4 mt-4 offset-6">
                      <button   class='btn-danger btn btn-xs' pButton iconPos="left" label="Guardar" icon="fa fa-save"   (click)="guardar()"  type="button"></button>
                      <button   class='btn-primary btn btn-xs' pButton  label="Cancelar"   (click)="cancelar()"  type="button"></button>
              </div>
    `
})
export class ModalAsignarTipoOperacionComponent  implements OnInit {

    cars: any[];
    model: any = {};
    tiposunidad: SelectItem[] = [];
    estaciones: SelectItem[] = [];
    agencias: SelectItem[] = [];
    repartidores: SelectItem[] = [];
    user: User ;
    distrito: string;

    constructor(private ordenService: OrdenTransporteService
                ,public generalService: GeneralService
                ,public ref: DynamicDialogRef
                ,private toastr: ToastrService
                ,public config: DynamicDialogConfig) {
         }

    ngOnInit() {



      this.user = JSON.parse(localStorage.getItem('user'));
      this.model.idusuariocreacion = this.user.usr_int_id;

      this.generalService.getValorTabla(23).subscribe(resp => {
        resp.forEach(element => {
          this.tiposunidad.push({ value: element.idvalortabla ,  label : element.valor});
        });
      });


      this.generalService.GetAllEstaciones().subscribe(resp => {
        resp.forEach(element => {
          this.estaciones.push({ value: element.idestacion ,  label : element.estacionorigen});
        });
      });


      this.generalService.getValorTabla(24).subscribe(resp => {
        resp.forEach(element => {
          this.agencias.push({ value: element.idvalortabla ,  label : element.valor});
        });
      });


      this.generalService.getProveedores("", 21514).subscribe(resp => {
        resp.forEach(element => {
          this.repartidores.push({ value: element.idproveedor ,  label : element.razonSocial  +   '-'   +    element.ruc});
        });
      });



    }
    cancelar() {
      this.ref.close();
    }
    mostrarDireccion() {
        this.generalService.getProveedor(this.model.idrepartidor).subscribe(x=> {

          console.log(x, 'res');

          this.distrito = x.distrito;

        });
    }
    guardar() {

        this.model.ids =  this.config.data.ids;

        if(this.model.idtipooperacion === undefined)
        {
            this.toastr.error('Debe seleccionar un tipo de operación'
            , 'Planning', {
              closeButton: true
            });
            return;
        }


      if(this.model.idtipooperacion=== 18139) {
        if(this.model.idrepartidor === undefined)   {
          this.toastr.error('Debe seleccionar un repartidor'
          , 'Planning', {
            closeButton: true
          });
            return;
        }
      }



      if(this.model.idtipooperacion=== 123) {
        if(this.model.idagencia === undefined)   {
          this.toastr.error('Debe seleccionar una agencia'
            , 'Planning', {
              closeButton: true
            });
            return;
        }
      }





        this.ordenService.asignarTipoOperacion(this.model ).subscribe( x=> {

          if(x.error)
          {
            this.toastr.error( x.resp
            , 'Planning', {
              closeButton: true
            });
            return ;

          }
          else {

            this.toastr.success('Se ha planificado la provincia de manera correcta'
            , 'Planning', {
              closeButton: true
            });
          }


          this.ref.close();

        })
    }
}

