import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/models/estante';

@Component({
  selector: 'app-estante-add',
  templateUrl: './estante-add.component.html',
  styleUrls: ['./estante-add.component.css']
})
export class EstanteAddComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private estanteService: EstanteService,
    private modalService: NgbModal,
    private titleService: Title
    ) {
    this.estanteForm = this.formBuilder.group({
      capacidad: ['', Validators.required]
    });
  }

  public mensajeExito: string = ''
  public mensajeError: string = ''
  public mensajeTitulo: string = ''

  @ViewChild('modalAdd') modalAdd: any;
  estanteList: Array<Estante>
  estante = new Estante();
  estanteForm: FormGroup;

  ngOnInit() {
    this.titleService.setTitle('Agregar Estante');
    this.estanteForm = this.formBuilder.group({
      capacidad: new FormControl(this.estante.capacidad, {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(3)],
        updateOn: 'blur'
      }),
    });
    document.getElementsByTagName('input')[0].focus()

    this.estanteService.getAll().subscribe(
      (response: Estante[]) => {
        this.estanteList = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get capacidad() {
    return this.estanteForm.get('capacidad');
  }

  addEstante() {
      const estante = new Estante();
      estante.capacidad = this.capacidad.value;
      this.estanteService.add(estante).subscribe (
        (response) => {
          console.log(response)
          this.estanteForm.reset();
          document.getElementsByTagName('input')[0].focus();
          this.mensajeTitulo = "Registro Exitoso";
          this.mensajeExito = `El estante fue registrado correctamente`;
          this.openModal();
          document.getElementsByTagName('input')[0].focus();
        }, error => {
          console.error(error)
          this.mensajeTitulo = "Registro Fallido";
          this.mensajeError = "Hubo un error al cargar el estante";
          this.openModal();
        }
      );
  }

  openModal() {
    const modalRef = this.modalService.open(this.modalAdd);
    modalRef.result.then(
      (result) => {
        if (result === 'close') {
          location.reload()
        }
      },
    );
    modalRef.hidden.subscribe(() => {
      location.reload()
    });
  }

}
