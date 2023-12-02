import {Component, OnInit} from '@angular/core';
import { isThisHour } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';


@Component({
    template: `




                  <h6>Seleccionar cargas disponibles :</h6>

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
export class ModalAsignaraCargaComponent  implements OnInit {

    loading = false;
    cars: any[];
    model: any = {};
    tiposunidad: SelectItem[] = [];
    user: User ;
    ids: any;

    constructor(private ordenService: OrdenTransporteService
                ,public generalService: GeneralService
                ,public ref: DynamicDialogRef
                ,  private toastr: ToastrService
                ,public config: DynamicDialogConfig) {

                  this.ids = '';

                  this.config.data.ids.forEach(element => {
                    this.ids = this.ids + ',' + element.idprovincia;
                  });
         }

    ngOnInit() {

      this.user = JSON.parse(localStorage.getItem('user'));


      this.ordenService.GetAllCargasTemporal().subscribe(resp => {

        console.log( resp );
        resp.forEach(element => {
          this.tiposunidad.push({ value: element.idcarga ,  label : element.numcarga});
        });


    });

      this.generalService.getValorTabla(8).subscribe(resp => {

      });

    }
    cancelar() {
      this.loading = false;
      this.ref.close();
    }
    guardar() {

      this.loading = true;
      if(this.model.idtipounidad === undefined)
      {
       this.toastr.error('Debe seleccionar una carga'
       , 'Planning', {
         closeButton: true
       });
       return;
      }

          this.model.idprovincia = this.ids;


        this.ordenService.AsignarProvinciaCarga(this.model.idprovincia,this.model.idtipounidad ).subscribe( x=> {
          this.ref.close();
          this.loading = false;

        })


    }
}
