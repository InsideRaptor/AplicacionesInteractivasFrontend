import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { EstanteService } from 'src/app/services/estante.service';
import { Estante } from 'src/app/models/estante';

@Component({
  selector: 'app-estante-list',
  templateUrl: './estante-list.component.html',
  styleUrls: ['./estante-list.component.css']
})
export class EstanteListComponent implements OnInit {

  constructor(
    private estanteService: EstanteService,
    private modalService: NgbModal,
    private titleService: Title
  ) {}

  capacidad: string
  p: number = 1;

  public mensajeExito: string = '';
  public mensajeError: string = '';
  public mensajeTitulo: string = '';

  @ViewChild('modalAdd') modalAdd: any;
  estanteList: Array<Estante>;

  ngOnInit() {
    this.titleService.setTitle('Listar Estantes');
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

  edit(updateModal: any, estante: Estante) {
    this.capacidad = estante.capacidad;
    this.modalService.open(updateModal).result.then(() => {
      if (this.capacidad.trim() !== '') {
        estante.capacidad = this.capacidad;
        this.estanteService.edit(estante).subscribe(
          (response) => {
            console.log(response, 'response');
            this.mensajeTitulo = 'Actualización Exitosa';
            this.mensajeExito = `El estante ${estante.id} fue actualizado correctamente`;
            this.openModal();
          },
          (error) => {
            console.error(error, 'error');
            this.mensajeTitulo = 'Actualización Fallida';
            this.mensajeError = `El estante ${estante.id} no pudo ser actualizado`;
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
    this.estanteService.delete(id).subscribe(
      (response) => {
        console.log(response);
        this.mensajeTitulo = 'Borrado Exitoso';
        this.mensajeExito = `El estante ${id} fue eliminado correctamente`;
        this.openModal();
      },
      (error) => {
        console.error(error);
        this.mensajeTitulo = 'Borrado Fallido';
        this.mensajeExito = `El estante ${id} no pudo ser eliminado`;
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