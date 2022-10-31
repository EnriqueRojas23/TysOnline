import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { OrdenTransporteService } from 'src/app/_services/Seguimiento/ordentransporte.service';



@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class UploadfileComponent implements OnInit {
  div_visible = false;
  public progress: number;
  public message: string;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  UserId: number;
  clientes: SelectItem[] = [];
  model: any = {};
  user: User ;
  cols: any[];
  ordenes: any[];
  btn_procesar = false;
  loading = false;

  ProveedorLoaded = false;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private ordenService: OrdenTransporteService,
              private authService: AuthService,
              private confirmationService: ConfirmationService ,
              private router: Router,
              private toastr: ToastrService) {


     }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));

    const token = this.authService.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.UserId = token.nameid;

    this.cols =
    [

        {header: 'DNI', field: 'clientnum'  ,  width: '80px' },
        {header: 'DESTINATARIO', field: 'lastname' , width: '120px'  },
        {header: 'DIRECCIÓN' , field: 'responsable'  , width: '120px'   },
        {header: 'DISTRITO', field: 'razonsocial'  ,  width: '180px'  },
        {header: 'PROVINCIA', field: 'fechahoracita' , width: '120px'  },
        {header: 'DEPARTAMENTO', field: 'estado'  , width: '90px'   },
        {header: 'REFERENCIA', field: 'personarecojo' , width: '120px'  },
        {header: 'TELÉFONO', field: 'tipounidad'  ,  width: '80px'  },
        {header: 'NRO GUIA', field: 'personarecojo' , width: '220px'  },
        {header: 'PESO', field: 'centroacopio' , width: '120px'  },
     ];



    this.ordenService.getClientes(this.user.idclientes).subscribe(resp => {

      this.clientes.push({ value: 0,  label : 'TODOS LOS CLIENTES'});

      resp.forEach(element => {
          this.clientes.push({ value: element.idcliente ,  label : element.razonsocial});
        });

      this.ProveedorLoaded = true;
      this.model.idcliente = 0;


    });
  }
  fileProgress(fileInput: any) {
    this.fileData =  fileInput.target.files[0] as File;
    this.preview();

}

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

  const reader = new FileReader();
  reader.readAsDataURL(this.fileData);
  reader.onload = (_event) => {
    this.previewUrl = reader.result;
  };
}

  public uploadFile  = (files) => {
    this.div_visible = true;

    if (files.length === 0) {
      this.toastr.warning('Debe seleccionar un archivo'
      , 'Subir File', {
        closeButton: true
      });
      this.div_visible = false;

      return ;
    }

    const fileToUpload =  files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);



    this.ordenService.uploadFile(formData, this.UserId , this.model.idcliente ).subscribe(resp => {

      this.ordenes  = resp;



          this.div_visible = false;
          this.btn_procesar = true;
          this.toastr.success('Se cargo correctamente'
           , 'Subir File', {
             closeButton: true
           });

         // this.router.navigate(['seguimiento/listadoordentransporte']);




    }, error => {
      this.div_visible = false;
      this.toastr.warning(error.error.text
      , 'Subir File', {
        closeButton: true
      });

    }, () => {
      // this.router.navigate(['/dashboard']);
    });
  }
  downloadFile() {
         this.ordenService.downloadPlantilla();
         //this.router.navigate(['seguimiento/listadoordentransporte']);
  }

  procesar() {



    this.confirmationService.confirm({
      message: '¿Está seguro que desea procesar?',
      header: 'Procesar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.loading = true;
        this.ordenService.procesar(this.ordenes[0].cargaid, this.model.idcliente ).subscribe(resp => {

          this.toastr.success('Se cargo correctamente'
          , 'Subir File', {
            closeButton: true
          });

          this.loading = false;
          this.router.navigate(['seguimientoot/listadoordentransporte']);
       })


      },
      reject: () => {

      }
  });




  }

}
