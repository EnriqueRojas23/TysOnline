import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';

@Component({
  selector: 'app-nuevaordenrecojo',
  templateUrl: './nuevaordenrecojo.component.html',
  styleUrls: ['./nuevaordenrecojo.component.scss'],
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class NuevaordenrecojoComponent implements OnInit {

  es: any;
  public loading = false;
  model: any = {};
  clientes: SelectItem[] = [];
  tipounidad: SelectItem[] = [];
  dateInicio: Date = new Date(Date.now()) ;
  user: User ;
  IdNuevaOrden = 0;

  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  };
  constructor(private ordenTransporteService: OrdenTransporteService
            , private confirmationService: ConfirmationService
            , private router: Router
            , private toastr: ToastrService
            , private generalService: GeneralService) { }


  ngOnInit() {


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


    this.ordenTransporteService.getClientes(this.user.idclientes).subscribe(resp => {
      resp.forEach(element => {
          this.clientes.push({ value: element.idcliente ,  label : element.razonsocial});
        });
    });

    this.ordenTransporteService.getValorTabla(8).subscribe(resp => {
      resp.forEach(element => {
          this.tipounidad.push({ value: element.idvalortabla ,  label : element.valor});
        });
    });

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
   }

  registrar(form: NgForm) {

    this.confirmationService.confirm({
      message: '¿Esta seguro que desea registrar esta OR?',
      accept: () => {
        this.loading = true;
        this.model.responsablecomercialid = this.user.usr_int_id;

        this.ordenTransporteService.registrar(this.model).subscribe(resp => {

          this.toastr.show('Se ha registrado correctamente la orden ' + resp.numcp );
          this.loading = false;
          this.router.navigate(['/seguimiento/ordenrecojo']);
        });
      }
  });



  }
  onBlurMethod(placa){
    this.ordenTransporteService.getEquipoTransporte(placa).subscribe(x =>
     {

           if (x != null)
           {
              this.model.tipoVehiculo  = x.tipoVehiculoId;
              this.model.marcaVehiculo = x.marcaId;
              this.model.razonSocial = x.razonSocial;
              this.model.ruc = x.ruc;
              this.model.id = x.id;
              this.model.dni = x.dni;
              this.model.nombreCompleto = x.nombrechofer;
              this.model.brevete = x.brevete;
              this.model.carreta = x.carreta;



           }
           else
           {

           }

     });




 }

}
