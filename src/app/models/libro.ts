import { Estante } from "./estante"

export class Libro {
    id: number
    titulo: string
    descripcion: string
    autor: string
    editorial: string
    estante: Estante; 
}