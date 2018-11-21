import { Component, OnInit } from '@angular/core';
import { ProveedorService } from './proveedor.service';
import {HttpClient} from '@angular/common/http';
import { Proveedor } from './proveedor';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [ProveedorService, Globals]
})
export class ProveedorComponent implements OnInit {

  proveedores: Proveedor[]
  editandoProveedor: Proveedor
  nombre: string ="";
  telefono: string = "";
  correo: string = "";
  ubicacion: string ="";

  constructor(private proveedorService: ProveedorService, private html: HttpClient) { }

  ngOnInit() {
    this.selectProveedor();
  }

  selectProveedor(): void {
    this.proveedorService.selectProveedor().subscribe(proveedores => (this.proveedores = proveedores))
  }
  addProveedor(nombre: string, telefono: string, correo:string, ubicacion: string ): void {
    this.editandoProveedor = undefined;
    nombre = nombre.trim()
    if(!nombre){
      return
    }
    const nuevoProveedor: Proveedor = {nombre, telefono, correo, ubicacion} as Proveedor
    this.proveedorService.createProveedor(nuevoProveedor).subscribe(() => this.selectProveedor())
    //console.log(nuevoProveedor)
  }

  createProveedor(): void {
    this.editandoProveedor = undefined;
    this.nombre = this.nombre.trim();
    if(!this.nombre){
      alert("Ingrese nombre de proveedor");

    }
    else {      
      let inputNombre: string = this.nombre;
      let inputTelefono: string = this.telefono;
      let inputCorreo: string = this.correo;
      let inputUbicacion: string = this.ubicacion;
      this.addProveedor(inputNombre,inputTelefono,inputCorreo,inputUbicacion);
    }
  }

  editar(proveedor){
    this.editandoProveedor = proveedor;
  }

  update(){
    if (this.editandoProveedor){
      this.proveedorService.updateProveedor(this.editandoProveedor).subscribe(()=>{this.selectProveedor()})
      this.editandoProveedor = undefined;
    }
  }

}
