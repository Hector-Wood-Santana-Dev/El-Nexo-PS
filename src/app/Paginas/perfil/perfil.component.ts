import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";
import {AuthService} from "../../auth.service";
import {collection, doc, Firestore, getDoc, setDoc} from "@angular/fire/firestore";
import {Router} from "@angular/router";




@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgStyle,
    ReactiveFormsModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  authService = inject(AuthService)
  @ViewChild('emailInput', {static: true}) emailInput!: ElementRef;
  @ViewChild('usernameInput', {static: true}) usernameInput!: ElementRef;
  @ViewChild('direccionInput', {static: true}) direccionInput!: ElementRef;
  @ViewChild('postalInput', {static: true}) postalInput!: ElementRef;
  @ViewChild('telefonoInput', {static: true}) telefonoInput!: ElementRef;
  @ViewChild('nombreInput', {static: true}) nombreInput!: ElementRef;
  @ViewChild('numerotarjetaInput', {static: true}) numerotarjetaInput!: ElementRef;
  @ViewChild('csvInput', {static: true}) csvInput!: ElementRef;
  @ViewChild('mescaducidadInput', {static: true}) mescaducidadInput!: ElementRef;
  @ViewChild('yearcaducidadInput', {static: true}) yearcaducidadInput!: ElementRef;


  mostrarDetallesTarjeta: boolean = false;

  postalValue: string | undefined;
  TelefonoValue: string | undefined;
  DireccionValue : string | undefined;
  NombreValue : string | undefined;
  TarjetaValue : string | undefined;
  CSVValue : string | undefined;
  MesValue : string | undefined;
  YearValue : string | undefined;

  constructor(private firestore: Firestore, private router: Router) {

  }
  cargarPagina(url: string) {
    this.router.navigate([url]);
  }

  async getUserData() {
    this.mostrarDetallesTarjeta = !this.mostrarDetallesTarjeta;
    const uid: string | undefined = this.authService.currentUserSig()?.uid;
    const userRef = doc(collection(this.firestore, 'users'), uid);
    try {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.postalValue = userData['postal'];
        this.TelefonoValue = userData['telefono'];
        this.DireccionValue = userData['direccion'];
        this.NombreValue = userData['nombre_titular'];
        this.TarjetaValue = userData['numero_tarjeta'];
        this.CSVValue = userData['csv'];
        this.MesValue = userData['mes_caducidad'];
        this.YearValue = userData['year_caducidad'];
        console.log(this.postalValue);
        console.log(this.CSVValue);

      } else {
        console.log('No se encontró el documento para el UID especificado.');
        this.cargarPagina('/editar');
      }
    } catch (error) {
      console.error('Error al recuperar los datos del usuario:', error);
    }
  }
  async guardarUser() {
    const valorEmail = this.emailInput.nativeElement.value;
    const valorUsername = this.usernameInput.nativeElement.value;
    const valorDireccion = this.direccionInput.nativeElement.value;
    const valorPostal = this.postalInput.nativeElement.value;
    const valorTelefono = this.telefonoInput.nativeElement.value;
    const valorNombre = this.nombreInput.nativeElement.value;
    const valorNumeroTarjeta = this.numerotarjetaInput.nativeElement.value;
    const valorCsv = this.csvInput.nativeElement.value;
    const valorMesCaducidad = this.mescaducidadInput.nativeElement.value;
    const valorYearCaducidad = this.yearcaducidadInput.nativeElement.value;
    const uid: string | undefined = this.authService.currentUserSig()?.uid;
    if (typeof uid === "string") {
      await setDoc(doc(this.firestore, "users", uid), {
        username: valorUsername,
        email: valorEmail,
        direccion: valorDireccion,
        postal: valorPostal,
        telefono: valorTelefono,
        nombre_titular: valorNombre,
        numero_tarjeta: valorNumeroTarjeta,
        csv: valorCsv,
        mes_caducidad: valorMesCaducidad,
        year_caducidad: valorYearCaducidad,

      });
    }
  }
}
