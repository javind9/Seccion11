import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getMaxListeners } from 'process';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Javier',
    apellido: 'Navarro',
    correo: 'javier@gmail.com'
  }

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe( paises =>{
        console.log(paises);
      })
  }

  guardar( forma: NgForm ){
    console.log(forma);

    if (forma.invalid){

      Object.values( forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }

    console.log(forma.value);

  }

}
