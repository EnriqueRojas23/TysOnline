import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

@Component({
  selector: 'app-editartarifa',
  templateUrl: './editartarifa.component.html',
  styleUrls: ['./editartarifa.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class EditartarifaComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  model: any = {};
  aux: any = {};
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
  id2: number;

  constructor( private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private generalService: GeneralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {


    this.id  = this.activatedRoute.snapshot.params["uid"];
    this.id2  = this.activatedRoute.snapshot.params["uid2"];




    this.generalService.GetAllDepartamentos().subscribe(resp => {
        resp.forEach(item => {
        this.listaDepartamento.push ({ label: item.departamento , value : item.iddepartamento});
      });
    });




   this.generalService.getValorTabla(8).subscribe(resp => {
        resp.forEach(item => {
          this.listamodotransporte.push({ value: item.idvalortabla , label: item.valor });
        })   ;
   } , error => {}  , () => {

    this.generalService.getTarifa(this.id).subscribe(resp => {
      this.aux = resp;
      console.log(this.aux);

      this.generalService.GetAllProvincias( this.aux.iddestinodepartamento).subscribe(resp => {
        resp.forEach(item => {
        this.listaProvinciaDestino.push ({ label: item.provincia , value : item.idprovincia});
      });



    }  , error => { } , () => {

      this.generalService.GetAllDistritos(this.aux.iddestinoprovincia).subscribe(resp => {

        resp.forEach(item => {
          this.listaDistritoDestino.push ({ label: item.distrito , value : item.iddistrito});
        });

      } , error => {}, () => {
        this.model = this.aux;
      } )



    })

  });


});

    this.registerForm = this.formBuilder.group({

      // idorigendepartamento: ['', Validators.required],
      // idorigenprovincia: ['', ],
      // idorigendistrito: ['', ],

      iddestinodepartamento: ['', Validators.required],
      iddestinoprovincia: ['', ],
      iddestinodistrito: ['', ],

      idtipounidad: ['', Validators.required],

      precio: ['', Validators.required],

    });



  }
  cancel() {
    this.router.navigate(['/proveedor/listadoproveedorestarifa', this.id2]);
  }
  onSubmit(): void {
    this.submitted = true;

    this.model.idproveedor = this.id2;

    if (this.registerForm.invalid) {
      return;
    }

    this.confirmationService.confirm({
      message: '¿Desea actualizar esta  tarifa?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Actualizar',
      accept: () => {
          //  this.spinner.show();

           this.generalService.updateTarifaProveedor(this.model).subscribe(resp => {
            this.messageService.add({severity: 'success', summary: 'Actualizar Tarifa', detail: 'Se ha actualizado la tarifa.'});
            // this.spinner.hide();
            this.router.navigate(['proveedor/listadoproveedorestarifa', this.id2]);
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

