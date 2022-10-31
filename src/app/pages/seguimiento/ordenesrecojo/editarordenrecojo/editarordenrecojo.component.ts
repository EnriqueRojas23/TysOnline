import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { User } from 'src/app/_models/user';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';



@Component({
  selector: 'app-editarordenrecojo',
  templateUrl: './editarordenrecojo.component.html',
  styleUrls: ['./editarordenrecojo.component.scss']
})
export class EditarordenrecojoComponent implements OnInit {

  es: any;
  public loading = false;
  model: any = {};
  clientes: SelectItem[] = [];
  tipounidad: SelectItem[] = [];
  dateInicio: Date = new Date(Date.now()) ;
  user: User ;
  IdNuevaOrden = 0;
  id: number;

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
            , private activatedRoute: ActivatedRoute
            , private generalService: GeneralService) { }


  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params.uid;



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

      this.ordenTransporteService.getValorTabla(8).subscribe(resp1 => {
          resp1.forEach(element => {
              this.tipounidad.push({ value: element.idvalortabla ,  label : element.valor});
            });


          this.ordenTransporteService.GetOrdenRecojo(this.id ).subscribe(resp2 =>
              {
                 this.model = resp2;
                 console.log(this.model);
                 this.model.fechacita =  moment(new Date(resp2.fechacita).toLocaleString(), 'DD/MM/YYYY').toDate()  ;
                 this.model.horacita = resp2.horacita;
              });
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
      message: '¿Esta seguro que desea actualizar esta OR?',
      accept: () => {
        this.loading = true;
        this.model.responsablecomercialid = this.user.usr_int_id;

        this.ordenTransporteService.actualizar(this.model).subscribe(resp => {

          this.toastr.show('Se ha actualizado correctamente la OR.' );
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
