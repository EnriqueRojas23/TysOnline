import { SustentoResult, SustentoDetalle } from './../../../../_models/Seguimiento/guiaremisionblanco';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarService, EditService, PageService } from '@syncfusion/ej2-angular-treegrid';
import { DynamicDialogRef,  } from 'primeng/dynamicdialog';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';
import { DataSourceChangedEventArgs, DataStateChangeEventArgs, EditSettingsModel, IEditCell, NewRowPosition } from '@syncfusion/ej2-angular-grids';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


const createFormGroup = dataItem => new FormGroup({
    'tipoDocumento': new FormControl(dataItem.tipoDocumento),
    'tipoSustento': new FormControl(dataItem.tipoSustento),
    'montoBase': new FormControl(dataItem.montoBase),
    'numeroDocumento': new FormControl(dataItem.numeroDocumento),
    'fecha': new FormControl(dataItem.fecha)

  });

@Component({
  selector: 'app-sustentarhr',
  templateUrl: './sustentarhr.component.html',
  styleUrls: ['./sustentarhr.component.scss'],
  providers: [ToolbarService, EditService, PageService]
})
export class SustentarhrComponent implements OnInit {
  public dialogOpened = false;
  public windowOpened = false;

  private editedRowIndex: number;
  private editedProduct: SustentoResult;


  public gridDataResult: GridDataResult ;

  id: any;
  sustentos: SustentoResult[];

  @ViewChild("namesDropDown") private namesDdl;


  public data: Object[];
  model: any = {};

  sustento: any;

  public toolbar: string[];
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public editparams: Object;
  public pageSettings: Object;
  public formatoptions: Object;
  public formGroup: FormGroup;

  public editSettings: EditSettingsModel;

  public sort: SortDescriptor[] = [
    {
      field: 'numero_ot',
      dir: 'desc',
    } ,{
        field: 'orden_entrega',
        dir: 'asc',
      }
  ];


  public stateParams : IEditCell;
  public tipoSustentoParams : IEditCell;

  public tiposdocumento: any[];
  public formGroups: FormGroup = new FormGroup({ items: new FormArray([]) });

  public TipoDocumento: { [key: string]: Object }[] = [
    { tipodocumento: 'Factura', tipodocumentoid: '1' },
    { tipodocumento: 'Boleta', tipodocumentoid: '2' },
    { tipodocumento: 'Recibo Honorarios', tipodocumentoid: '3' },
    { tipodocumento: 'Sin Sustento', tipodocumentoid: '4' }
];




public TipoSustento: { [key: string]: Object }[] = [
  { tipogasto: 'Hospedaje',                tipogastoid: '1' },
  { tipogasto: 'Estiba',                tipogastoid: '10' },
  { tipogasto: 'Flete Tercero',     tipogastoid: '11' },
  { tipogasto: 'Peaje',          tipogastoid: '13' },
  { tipogasto: 'Lavado',          tipogastoid: '14' },
  { tipogasto: 'Cochera',          tipogastoid: '15' },
  { tipogasto: 'Combustible',          tipogastoid: '16' },
  // { tipogasto: 'Viaticos',          tipogastoid: '17' },
  // { tipogasto: 'Policia',          tipogastoid: '18' },
  // { tipogasto: 'Llanta',          tipogastoid: '16' },
  // { tipogasto: 'Comb. Termoking',          tipogastoid: '3' }
];





  constructor(private ordenTransporteService: OrdenTransporteService,
              private generalService: GeneralService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {

    this.id  = this.activatedRoute.snapshot.params.uid;





    this.ordenTransporteService.getSustentoForHojaRuta(this.id).subscribe(x => {

      if(x === null)
      {
        this.guardarCabecera();
      }

      this.sustento = x;




    })




      this.ordenTransporteService.GetAllSustentoxHR(this.id).subscribe(list => {

        console.log(list);
        this.gridDataResult = {
          data: orderBy(list,this.sort) ,
          total: list.length };

      });





    }


    public close(component) {
      this[component + "Opened"] = false;
    }

    public action(status) {
      console.log(`Dialog result: ${status}`);
      if(status === 'yes'){
       this.ordenTransporteService.LiquidarSustento(this.id).subscribe(x => {

        const url = 'http://104.36.166.65/webreports/liquidacionpropio.aspx?numhojaruta=' + String(this.id);

        window.open(url);

        this.router.navigate(['/sustentos/listadopendientes']);

       })
      }
      this.dialogOpened = false;
    }
    public open(component) {
      this[component + "Opened"] = true;
    }


  public newRowPosition: { [key: string]: Object }[] = [
    { id: 'Top', newRowPosition: 'Top' },
    { id: 'Bottom', newRowPosition: 'Bottom' }
];
public localFields: Object = { text: 'newRowPosition', value: 'id' };


guardarCabecera(){

        this.model.fecha = "12/12/2021";
        this.model.idusuarioregistro = 1;
        this.model.kilometrajefinal = 1000;
        this.model.kilometrajeInicio = 0;
        this.model.montodepositado = 2000;
        this.model.numhojaruta = this.id;


        this.ordenTransporteService.addSustento(this.model).subscribe(x => {
          this.sustento = x;
        });
}

  buscar() {




}
  verguias(id){


  }

  liquidar(){


  }

  volver() {
      this.router.navigate(['/sustentos/listadopendientes']);
  }
  actionBegin(args: any) :void {
    let gridInstance: any = (<any>document.getElementById('Normalgrid')).ej2_instances[0];
    if (args.requestType === 'save') {
        if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
            args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
        } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
            args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
        }
    }

}



public dataStateChange(state: DataStateChangeEventArgs): void {
   alert('Entre');
}

public dataSourceChanged(state: DataSourceChangedEventArgs): void {
  if (state.action === 'add') {
    alert('Agregar');
      //this.crudService.addRecord(state).subscribe(() => state.endEdit());
  } else if (state.action === 'edit') {
      //this.crudService.updateRecord(state).subscribe(() => state.endEdit());
  } else if (state.requestType === 'delete') {
     // this.crudService.deleteRecord(state).subscribe(() => state.endEdit());
  }
}
public addHandler({ sender }) {


  this.closeEditor(sender);

  this.formGroup = createFormGroup({
    tipodocumentoid: null,
    tiposustentoid: null
  });

  sender.addRow(this.formGroup);


}

public editHandler({ sender, rowIndex, dataItem }) {

  console.log(dataItem);
  this.closeEditor(sender);

  this.editedRowIndex = rowIndex;
  this.formGroup = createFormGroup(dataItem);
 // this.editedProduct = Object.assign({}, dataItem);

  sender.editRow(rowIndex, this.formGroup);
}

public cancelHandler({ sender, rowIndex }) {
  this.closeEditor(sender, rowIndex);
}

public saveHandler({ sender, rowIndex, dataItem, isNew }) {

  console.log(dataItem);

  this.model.sustentoid = this.sustento.id;
  this.model.fecha = dataItem.fecha;
  this.model.idtipodocumento = dataItem.tipoDocumento.tipodocumentoid;
  this.model.idtiposustento = dataItem.tipoSustento.tipogastoid;
  this.model.montobase = dataItem.montoBase;
  this.model.numeroDocumento = dataItem.numeroDocumento;

  sender.closeRow(rowIndex);



  this.ordenTransporteService.addSustentoDetalle(this.model).subscribe(x => {

    this.ordenTransporteService.GetAllSustentoxHR(this.id).subscribe(list => {

      console.log(list);
      this.gridDataResult = {
        data: orderBy(list,this.sort) ,
        total: list.length };

    });
  })



}

public removeHandler({ dataItem }) {

}
private closeEditor(grid, rowIndex = this.editedRowIndex) {
  grid.closeRow(rowIndex);

  this.editedRowIndex = undefined;
  this.editedProduct = undefined;
}



}
