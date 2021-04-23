import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();



  }

  ngOnInit(): void {
  }

  get pasatiempos (){
    return this.forma.get('pasatiempos') as FormArray;
  };


  get nombreNoValido (){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido (){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido (){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get distritoNoValido (){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadNoValido (){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  get pass1NoValido (){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }

  get pass2NoValido (){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return (pass1 === pass2) ? false :true; //si son iguales regreso true, si no es así regreso false
  }

  get usuarioNoValido (){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }




  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]], //Valor por defecto, validadores síncronos (inmediatos) y validadores asíncronos
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      correo: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });
  }

  cargarDataAlFormulario(){
    this.forma.reset({ //setValue debes asgignar todos los campos
      nombre: 'Fernando',
      apellido: 'Perez',
      correo: 'fernando@gmail.com',
      pass1: '123',
      pass2: '123',
        direccion: {
        distrito: 'Ontario',
        ciudad: 'Otawa'
      },
    });

    ['Comer','Dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }


  agregarPasatiempos(){
    this.pasatiempos.push( this.fb.control(''));
  }

  borrarPasatiempos(i: number){
    this.pasatiempos.removeAt(i);
  }



  guardar(){
    console.log(this.forma);


    if (this.forma.invalid){

      return Object.values( this.forma.controls).forEach(control => {
        
        if ( control instanceof FormGroup) {
          Object.values( control.controls).forEach(control => control.markAsTouched())
        } else {
          control.markAsTouched();
        }
        
      });
    }
    //Posteo de la información
    this.forma.reset({ //reset establece las propiedades que tiene el objeto, setValue tienes que establecer todas las propiedades
      nombre: 'Sin nombre'
    });
  }

}
