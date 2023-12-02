import {Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';


@Component({
    template: `

                  <h6>Tipo de unidad :</h6>

                  <p-dropdown name="tiposunidad"
                    [options]="tiposunidad" [(ngModel)]="model.idtipounidad"
                    scrollHeight="30vh"  class="input-form-field"
                    appendTo="body"
                    [baseZIndex]="100000"
                    [virtualScroll]="true" itemSize="30"
                    [style]="{'width':'100%'}" [resetFilterOnHide]="false"
                    [hideTransitionOptions]="'0ms'"
                    [showTransitionOptions]="'0ms'"
                    filter="false">
                        <ng-template let-item pTemplate="selectedItem">
                            <span style="vertical-align:left;">{{item.label}}</span>
                        </ng-template>
                  </p-dropdown>


              <div class="col-md-6 mt-5 offset-6">
                      <button  ng-disabled="loading"  class='btn-primary btn btn-xs' pButton iconPos="left" label="Guardar" icon="fa fa-save"   (click)="guardar()"  type="button"></button>
                      <button  class='btn-danger btn btn-xs' pButton iconPos="left" label="Cancelar" icon="fa fa-times"   (click)="cancelar()"  type="button"></button>
              </div>
              <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px' }" ></ngx-loading>




    `
})
export class ModalTipoUnidadComponent  implements OnInit {

    loading = false;
    cars: any[];
    model: any = {};
    tiposunidad: SelectItem[] = [];
    user: User ;

    constructor(private ordenService: OrdenTransporteService
                ,public generalService: GeneralService
                ,public ref: DynamicDialogRef
               ,  private toastr: ToastrService
                ,public config: DynamicDialogConfig) {

         }

    ngOnInit() {

      this.user = JSON.parse(localStorage.getItem('user'));


      this.generalService.getValorTabla(8).subscribe(resp => {
          resp.forEach(element => {
            this.tiposunidad.push({ value: element.idvalortabla ,  label : element.valor});
          });
      });

    }
    cancelar() {
      this.loading = false;
      this.ref.close();
    }
    guardar() {




      if(this.model.idtipounidad === undefined)
       {
        this.toastr.error('Debe seleccionar un tipo de vehículo'
        , 'Planning', {
          closeButton: true
        });
        return;
       }

       this.loading = true;
        this.ordenService.CrearCarga(this.user.usr_int_id, this.model.idtipounidad ).subscribe( x=> {

          this.loading = false;
          this.ref.close();

        })

    }
}
