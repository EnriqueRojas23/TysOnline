import {Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';


@Component({
    template: `

<div class="col-12 row">

<p-table   #dt2 [columns]="cols2" dataKey="idordentrabajo"
                [style]="{width:'100%'}"
                [rowsPerPageOptions]="[120,240,480,1200]"
                [value]="ordenes11"   selectionMode="multiple"
                responsive="true"
                [globalFilterFields]="['destino', 'numcp']"
                [rows]="120" [resizableColumns]="true" >



                  <ng-template pTemplate="colgroup" let-columns>
                    <colgroup>
                        <col *ngFor="let col of columns"   [ngStyle]="{'width': col.width}" >
                    </colgroup>
                  </ng-template>

                  <ng-template pTemplate="header" let-columns>
                    <tr>

                        <th  [ngStyle]="{'width': col.width}" *ngFor="let col of columns" pResizableColumn [pSortableColumn]="col.field">
                            {{col.header}}
                        </th>
                    </tr>
                </ng-template>



                <ng-template pTemplate="body" let-rowData    let-columns="columns">
                <tr [pSelectableRow]="rowData">

                  <td class="ui-resizable-column" style="text-align:center;" > {{ rowData.evento    }}   </td>
                  <td class="ui-resizable-column" style="text-align:center;"> {{rowData.observacion }} </td>
                  <td class="ui-resizable-column" style="text-align:center;"> {{rowData.fechaevento | date: 'dd/MM/yyyy' }}</td>
                  <td class="ui-resizable-column" style="text-align:center;"> {{rowData.usuario }}</td>




                </tr>
                </ng-template>


      </p-table>
              <div class="col-md-4 mt-4 offset-3">

                      <button   class='btn-primary btn btn-xs' pButton  label="Cerrar"   (click)="cancelar()"  type="button"></button>
              </div>
</div>
    `
})
export class EventosModalComponent  implements OnInit {

    cars: any[];
    model: any = {};
    estadosnext: SelectItem[] = [];
    estaciones: SelectItem[] = [];
    agencias: SelectItem[] = [];
    repartidores: SelectItem[] = [];
    user: User ;
    dateInicio: Date = new Date(Date.now()) ;
    es: any;
    cols2: any[];
    ordenes11: any[];


    constructor(private ordenService: OrdenTransporteService
                ,public generalService: GeneralService
                ,public ref: DynamicDialogRef
                ,private toastr: ToastrService
                ,public config: DynamicDialogConfig) {

                 console.log(config.data.id);
         }

    ngOnInit() {


      this.cols2 = [
        {header: 'EVENTO', field: 'evento'  , width: '60px'   },
        {header: 'DESCRIPCION', field: 'observacion'  , width: '120px'   },
        {header: 'FECHA', field: 'fechaevento'  , width: '60px'   },
        {header: 'USUARIO', field: 'usuario'  ,  width: '30px'  },



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


      this.user = JSON.parse(localStorage.getItem('user'));
      this.model.idusuariocreacion = this.user.usr_int_id;


      this.estadosnext.push({ value: 10 ,  label : 'En Base (Con Precinto)'});
      this.estadosnext.push({ value: 11 ,  label : 'En Ruta'});
      this.estadosnext.push({ value: 25 ,  label : 'En Zona'});
      this.estadosnext.push({ value: 13 ,  label : 'En Reparto '});



      // this.generalService.GetAllEstaciones().subscribe(resp => {
      //   resp.forEach(element => {
      //     this.estaciones.push({ value: element.idestacion ,  label : element.estacionorigen});
      //   });
      // });


      // this.generalService.getValorTabla(24).subscribe(resp => {
      //   resp.forEach(element => {
      //     this.agencias.push({ value: element.idvalortabla ,  label : element.valor});
      //   });
      // });


      // this.generalService.getProveedores("", 21514).subscribe(resp => {
      //   resp.forEach(element => {
      //     this.repartidores.push({ value: element.idproveedor ,  label : element.razonSocial  +   '-'   +    element.ruc});
      //   });
      // });
      this.ordenService.GetAllEventosxIdManifiesto(this.config.data.id).subscribe(x=> {

        console.log(x);
        this.ordenes11 = x;

      });



    }
    cancelar() {
      this.ref.close();
    }


    guardar() {

        this.model.ids =  this.config.data.ids;
        this.model.fechaarribo = this.dateInicio.toLocaleDateString('en-GB');

        this.ordenService.cambiarEstadoOT(this.model ).subscribe( x=> {

          this.toastr.success('Se ha cambiaro de estado de manera correcta.'
          , 'Planning', {
            closeButton: true
          });

          this.ref.close();

        });
    }
}

