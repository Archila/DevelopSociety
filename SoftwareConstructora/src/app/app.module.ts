import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { InicioComponent } from './inicio/inicio.component'

const appRoutes: Routes = [
  { path:'',component: InicioComponent  },
  { path:'inicio',component: InicioComponent  },
  { path:'proveedor',component: ProveedorComponent  }  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProveedorComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
