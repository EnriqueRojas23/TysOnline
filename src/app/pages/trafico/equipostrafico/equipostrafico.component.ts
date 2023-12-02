import { TraficoService } from './../../../_services/Trafico/trafico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipostrafico',
  templateUrl: './equipostrafico.component.html',
  styleUrls: ['./equipostrafico.component.scss']
})
export class EquipostraficoComponent implements OnInit {

  availableProducts: any[] = [];
  selectedEquipo1: any[] = [] ;
  selectedEquipo2: any[] = [];
  selectedEquipo3: any[] = [];
  selectedEquipo4: any[] = [];

  selectedAll: any[] = [];

  draggedProduct: any | undefined | null;


  constructor(private traficoService: TraficoService ) {




   }

  ngOnInit(): void {

   this.reload();






  }
  dragStart(product: any) {
    this.draggedProduct = product;
}
  dragEnd() {

    this.draggedProduct = null;
}
borrar(vinculo){

  console.log(vinculo);

  this.traficoService.borrarDepartamentoByEquipo(vinculo).subscribe(resp =>{


    this.reload();
  });

}
  drop(equipoid) {

   if(equipoid==='1')
   {
    if (this.draggedProduct) {
        let draggedProductIndex = this.findIndex(this.draggedProduct);
        this.selectedEquipo1 = [...(this.selectedEquipo1 as any[]), this.draggedProduct];
        this.availableProducts = this.availableProducts?.filter((val, i) => i != draggedProductIndex);
        this.draggedProduct = null;
    }
  }
  if(equipoid==='2')
  {
   if (this.draggedProduct) {
       let draggedProductIndex = this.findIndex(this.draggedProduct);
       this.selectedEquipo2 = [...(this.selectedEquipo2 as any[]), this.draggedProduct];
       this.availableProducts = this.availableProducts?.filter((val, i) => i != draggedProductIndex);
       this.draggedProduct = null;
   }
 }
  if(equipoid==='3')
  {
    if (this.draggedProduct) {
        let draggedProductIndex = this.findIndex(this.draggedProduct);
        this.selectedEquipo3 = [...(this.selectedEquipo3 as any[]), this.draggedProduct];
        this.availableProducts = this.availableProducts?.filter((val, i) => i != draggedProductIndex);
        this.draggedProduct = null;
    }
  }
  if(equipoid==='4')
  {
  if (this.draggedProduct) {
      let draggedProductIndex = this.findIndex(this.draggedProduct);
      this.selectedEquipo4 = [...(this.selectedEquipo4 as any[]), this.draggedProduct];
      this.availableProducts = this.availableProducts?.filter((val, i) => i != draggedProductIndex);
      this.draggedProduct = null;
  }
  }
}
findIndex(product: any) {
  let index = -1;
  for (let i = 0; i < (this.availableProducts as any[]).length; i++) {
      if (product.iddepartamento === (this.availableProducts as  any[])[i].iddepartamento) {
          index = i;
          break;
      }
  }
  return index;
}
guardar() {

  this.selectedAll = [];

  this.selectedEquipo1.forEach(item=> {
    item.idequipo = 21490;
    this.selectedAll = [...(this.selectedAll as any[]), item];
  });
  this.selectedEquipo2.forEach(item=> {
    item.idequipo = 21491;
    this.selectedAll = [...(this.selectedAll as any[]), item];
  });
  this.selectedEquipo3.forEach(item=> {
    item.idequipo = 21492;
    this.selectedAll = [...(this.selectedAll as any[]), item];
  });

  this.selectedEquipo4.forEach(item=> {
    item.idequipo = 24275;
    this.selectedAll = [...(this.selectedAll as any[]), item];
  });



    this.traficoService.actualizarEquipos(this.selectedAll).subscribe(resp =>{


    });


}
cancelar() {
  this.reload();
}
public reload(){
  this.traficoService.getAllDepartmentsForTeam().subscribe(resp=> {

    let all = resp;




    this.selectedEquipo1  = [];
    this.selectedEquipo2  = [];
    this.selectedEquipo3  = [];
    this.selectedEquipo4  = [];



    all.forEach(item => {

        if( item.idequipo == 21490) {
          this.selectedEquipo1 = [...(this.selectedEquipo1 as any[]), item];
        };
        if( item.idequipo == 21491) {
          this.selectedEquipo2 = [...(this.selectedEquipo2 as any[]), item];
        };
        if( item.idequipo == 21492) {

          this.selectedEquipo3 = [...(this.selectedEquipo3 as any[]), item];
        };
        if( item.idequipo == 24275) {

          this.selectedEquipo4 = [...(this.selectedEquipo4 as any[]), item];
        };
        if( item.idequipo == null) {

          this.availableProducts = [...(this.availableProducts as any[]), item];
        };




      });


  })
}

}
