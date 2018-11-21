import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Proveedor} from './proveedor'
import { Globals } from 'src/globals'

@Injectable()
export class ProveedorService{
  constructor(private http: HttpClient, private globals: Globals){}

  selectProveedor(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.globals.url+'api/Proveedores')
  }

  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    console.log(proveedor);
    return this.http.post<Proveedor>(this.globals.url+'api/Proveedor',proveedor)
  }

  updateProveedor(proveedor: Proveedor): Observable<{}> {
    const url = this.globals.url+`api/Proveedor/${proveedor.id}`
    return this.http.put<Proveedor>(url,proveedor)
  }

}