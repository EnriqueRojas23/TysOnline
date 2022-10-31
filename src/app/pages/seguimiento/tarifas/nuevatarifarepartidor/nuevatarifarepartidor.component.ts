import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

@Component({
  selector: 'app-nuevatarifarepartidor',
  templateUrl: './nuevatarifarepartidor.component.html',
  styleUrls: ['./nuevatarifarepartidor.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class NuevatarifarepartidorComponent implements OnInit {


  registerForm!: FormGroup;
  submitted = false;
  model: any = {};
  listaDepartamento: SelectItem[] = [];
  clientes: SelectItem[] = [];

  listaProvinciaOrigen: SelectItem[] = [];
  listaProvinciaDestino: SelectItem[] = [];


  listaDistritoOrigen: SelectItem[] = [];
  listaDistritoDestino: SelectItem[] = [];
  listaformula: SelectItem[] =  [];
  listamodotransporte: SelectItem[] =  [];
  listadotipomaterial: SelectItem[] = [];

  id: number;

  constructor( private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private generalService: GeneralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {


    this.id  = this.activatedRoute.snapshot.params["uid"];

    this.clienteService.getAllClientes('').subscribe(list => {

      this.clientes.push({label: 'Todos los clientes', value: ''});
          list.forEach(x => {
          this.clientes.push({ label: x.razonsocial , value: x.idcliente.toString() });
          });
      });

    this.generalService.GetAllDepartamentos().subscribe(resp => {
        resp.forEach(item => {
        this.listaDepartamento.push ({ label: item.departamento , value : item.iddepartamento});
      });
    });




   this.generalService.getValorTabla(4).subscribe(resp => {
        resp.forEach(item => {
          this.listamodotransporte.push({ value: item.idvalortabla , label: item.valor });
        })   ;
   })
    this.registerForm = this.formBuilder.group({

       minimo: ['',],
       desde: ['', ],
       hasta: ['', ],

      iddestinodepartamento: ['', Validators.required],
      iddestinoprovincia: ['', ],
      iddestinodistrito: ['', ],

      idtipotransporte: ['', Validators.required],

      precio: ['', Validators.required],

    });

  }
  cancel() {
    this.router.navigate(['proveedor/listadoproveedorestarifa', this.id]);
  }
  onSubmit(): void {
    this.submitted = true;

    this.model.idproveedor = this.id;

    if (this.registerForm.invalid) {
      return;
    }

    this.confirmationService.confirm({
      message: '¿Desea registrar esta nueva tarifa?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Registrar',
      accept: () => {
          //  this.spinner.show();

           this.generalService.registarTarifaProveedor(this.model).subscribe(resp => {
            this.messageService.add({severity: 'success', summary: 'Nueva Tarifa', detail: 'Se ha registrado la tarifa.'});
            // this.spinner.hide();
            this.router.navigate(['proveedor/listadoproveedorestarifa', this.id]);
           });
      },
      reject: () => {
          this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'You have rejected'});
      }
  });




}

onReject(): void {
  this.messageService.clear('c');
}

get f(): any { return this.registerForm.controls; }


  cargarProvinciasOrigen(item) {
    this.listaProvinciaOrigen = [];
    this.listaDistritoOrigen = [];

    this.generalService.GetAllProvincias(item.value).subscribe(resp => {
      resp.forEach(item => {
      this.listaProvinciaOrigen.push ({ label: item.provincia , value : item.idprovincia});
    });
  });

 }
 cargarDistritosOrigen(item) {
      this.listaDistritoOrigen = [];

      this.generalService.GetAllDistritos(item.value).subscribe(resp => {
        resp.forEach(item => {
        this.listaDistritoOrigen.push ({ label: item.distrito , value : item.iddistrito});
      });
    });
 }
 cargarProvinciasDestino(item) {
  this.listaProvinciaDestino = [];
  this.listaDistritoDestino= [];

  this.generalService.GetAllProvincias(item.value).subscribe(resp => {
    resp.forEach(item => {
    this.listaProvinciaDestino.push ({ label: item.provincia , value : item.idprovincia});
  });
});
}
cargarDistritosDestino(item) {
  this.listaDistritoDestino= [];

  this.generalService.GetAllDistritos(item.value).subscribe(resp => {
    resp.forEach(item => {
    this.listaDistritoDestino.push ({ label: item.distrito , value : item.iddistrito});
  });
});
}
}

