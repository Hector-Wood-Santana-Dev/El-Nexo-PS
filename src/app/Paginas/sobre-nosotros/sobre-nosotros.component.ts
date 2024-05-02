import {Component} from '@angular/core';
import {HeaderComponent} from "../../Componentes/header/header.component";
import {FooterComponent} from "../../Componentes/footer/footer.component";

import datos_es from "../../../assets/json/textos-paginas.json"
import datosJson from "../../../assets/json/textos-paginas.json";


@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css'
})
export class SobreNosotrosComponent {

  datosJson = datos_es;
}
