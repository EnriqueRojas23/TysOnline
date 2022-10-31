import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

@Component({
  selector: 'app-listadoproveedores',
  templateUrl: './listadoproveedores.component.html',
  styleUrls: ['./listadoproveedores.component.scss']
})
export class ListadoproveedoresComponent implements OnInit {
  public loading = false;
  provedores: any[];
  model: any  = {};
  cols: any[];
  idproveedor :any;
  constructor(private clienteService: GeneralService
    ,private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService ) { }

  ngOnInit() {

   this.idproveedor = this.activatedRoute.snapshot.params["uid"];


    this.cols = [

      { field: 'razonSocial', header: 'Razón Social' ,  width: '40%'},
      { field: 'ruc', header: 'RUC' ,  width: '30%'},
      { field: 'usuario', header: 'Acciones',  width: '20%' }
  ];

  this.load();

  }
  load(){
    this.model.criterio = "";
    this.clienteService.getProveedores(this.model.criterio).subscribe(resp => {
    this.provedores = resp;




  });
  }
  edit(id) {

    this.router.navigate(['proveedor/editarproveedor',id, this.idproveedor ]);

  }
  tarifario(id) {
    this.router.navigate(['proveedor/listadoproveedorestarifa',id ]);
  }

  confirm(id) {
    console.log(id);
    this.confirmationService.confirm({
        message: '¿Está seguro que desea eliminar?',
        header: 'Eliminar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // this.generalService.delete_proveedor(id).subscribe(x=>
          //   {
          //     this.load()
          //   });
        },
        reject: () => {

        }
    });
}
buscar() {

  this.clienteService.getProveedores(this.model.proveedor).subscribe(resp => {
  this.provedores = resp;




});
}


}
