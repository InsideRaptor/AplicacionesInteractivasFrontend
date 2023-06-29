import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { LibroService } from 'src/app/services/libro.service';
import { Libro } from 'src/app/models/libro';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/models/estante';

@Component({
  selector: 'app-libro-list',
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.css'],
})
export class LibroListComponent implements OnInit {
  constructor(
    private estanteService: EstanteService,
    private libroService: LibroService,
    private modalService: NgbModal,
    private titleService: Title
  ) {}

  titulo = '';
  descripcion = '';
  autor = '';
  editorial = '';
  estanteId = null;
  p: number = 1;

  public mensajeExito: string = '';
  public mensajeError: string = '';
  public mensajeTitulo: string = '';

  @ViewChild('modalAdd') modalAdd: any;
  libroList: Array<Libro>;
  estanteList: Array<Estante>;

  ngOnInit() {
    this.titleService.setTitle('Listar libros');
    this.estanteService.getAll().subscribe(
      (response: Estante[]) => {
        this.estanteList = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.libroService.getAll().subscribe((response: Libro[]) => {
      this.libroList = response;
      console.log(response);
    });
  }

  edit(updateModal: any, libro: Libro) {
    this.titulo = libro.titulo;
    this.descripcion = libro.descripcion;
    this.autor = libro.autor;
    this.editorial = libro.editorial;
    this.estanteId = libro.estante.id;
    this.modalService.open(updateModal).result.then(() => {
      if (this.titulo.trim() !== '' && this.descripcion.trim() !== '' && this.autor.trim() !== '' && this.editorial.trim() !== '') {
        libro.titulo = this.titulo;
        libro.descripcion = this.descripcion;
        libro.autor = this.autor;
        libro.editorial = this.editorial;
        libro.estante.id = this.estanteId;
        this.libroService.edit(libro).subscribe(
          (response) => {
            console.log(response, 'response');
            this.mensajeTitulo = 'Actualización Exitosa';
            this.mensajeExito = `El libro ${libro.titulo} fue actualizado correctamente`;
            this.openModal();
          },
          (error) => {
            console.error(error, 'error');
            this.mensajeTitulo = 'Actualización Fallida';
            this.mensajeError = `El libro ${libro.titulo} no pudo ser actualizado`;
            this.openModal();
          }
        );
      } else {
        this.mensajeTitulo = 'Actualización Fallida';
        this.mensajeError = `Debe completar todos los campos`;
        this.openModal();
      }
    });
  }

  delete(id: number) {
    this.libroService.delete(id).subscribe(
      (response) => {
        console.log(response);
        this.mensajeTitulo = 'Borrado Exitoso';
        this.mensajeExito = `El libro ${id} fue eliminado correctamente`;
        this.openModal();
      },
      (error) => {
        console.error(error);
        this.mensajeTitulo = 'Borrado Fallido';
        this.mensajeExito = `El libro ${id} no pudo ser eliminado`;
        this.openModal();
      }
    );
  }

  openModal() {
    const modalRef = this.modalService.open(this.modalAdd);
    modalRef.result.then((result) => {
      if (result === 'close') {
        this.modalService.dismissAll();
        location.reload();
      }
    });
    modalRef.hidden.subscribe(() => {
      location.reload();
    });
  }
}
