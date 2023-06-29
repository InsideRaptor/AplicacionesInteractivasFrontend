import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { LibroService } from 'src/app/services/libro.service';
import { Libro } from 'src/app/models/libro';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/models/estante';

@Component({
  selector: 'app-libro-add',
  templateUrl: './libro-add.component.html',
  styleUrls: ['./libro-add.component.css']
})
export class LibroAddComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private estanteService: EstanteService,
    private libroService: LibroService,
    private modalService: NgbModal,
    private titleService: Title
    ) {
    this.libroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      estante: ['', Validators.required]
    });
  }

  public mensajeExito: string = ''
  public mensajeError: string = ''
  public mensajeTitulo: string = ''

  @ViewChild('modalAdd') modalAdd: any;
  estanteList: Array<Estante>
  libro = new Libro();
  libroForm: FormGroup;

  ngOnInit() {
    this.titleService.setTitle('Agregar Libro');
    this.libroForm = this.formBuilder.group({
      titulo: new FormControl(this.libro.titulo, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      descripcion: new FormControl(this.libro.descripcion, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      autor: new FormControl(this.libro.autor, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      editorial: new FormControl(this.libro.editorial, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      estante: new FormControl(this.libro.estante, {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(2)],
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

  get titulo() {
    return this.libroForm.get('titulo');
  }
  get descripcion() {
    return this.libroForm.get('descripcion');
  }
  get autor() {
    return this.libroForm.get('autor');
  }
  get editorial() {
    return this.libroForm.get('editorial');
  }
  get estante() {
    return this.libroForm.get('estante');
  }

  addLibro() {
      const libro = new Libro();
      libro.titulo = this.titulo.value;
      libro.descripcion = this.descripcion.value;
      libro.autor = this.autor.value;
      libro.editorial = this.editorial.value;
      const estante = new Estante();
      estante.id = this.estante.value;
      libro.estante = estante;
      this.libroService.add(libro).subscribe (
        (response) => {
          console.log(response)
          this.libroForm.reset();
          document.getElementsByTagName('input')[0].focus();
          this.mensajeTitulo = "Registro Exitoso";
          this.mensajeExito = `El libro ${libro.titulo} fue registrado correctamente`;
          this.openModal();
          document.getElementsByTagName('input')[0].focus();
        }, error => {
          console.error(error)
          this.mensajeTitulo = "Registro Fallido";
          this.mensajeError = "Hubo un error al cargar el libro";
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
