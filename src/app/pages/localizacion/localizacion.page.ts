import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Geolocation } from '@capacitor/geolocation';
//import * as L from 'leaflet';

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.page.html',
  styleUrls: ['./localizacion.page.scss'],
})
export class LocalizacionPage implements OnInit {

  //localizaciones: any = [];
  userUbicacion: any;
  latitude!: number;
  longitude!: number;

  //map!: L.Map;

  constructor(private apiService: ApiService) { }
   

  ngOnInit() {

    this.getUsuarios();   

    this.loadUserLocation();

    //this.apiService.getUsers().subscribe((data) => {
      //this.localizaciones = data;

    //});
  }

  async loadUserLocation() {
    try{
      const position = await Geolocation.getCurrentPosition();

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      
      /*
      this.userUbicacion = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log("Ubicación actual: ", this.userUbicacion);
      */

      //Inicializar el mapa
      //this.initializeMap();

    }catch (error){
      console.error("Error obteniendo la ubicación ", error);
    }
  }

  /*initializeMap() {
    this.map = L.map('map').setView([this.userPosition.lat, this.userPosition.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'     

    }).addTo(this.map);

    L.marker([this.userPosition.lat, this.userPosition.lng]).addTo(this.map)
      .bindPopup('Mi ubicacion')
      .openPopup();
  }*/

  getUsuarios() {

    this.apiService.getUsers().subscribe(
      (locations: any[]) => {

        for (let user of locations) {
          if (user.latitud && user.longitud && user.nombre){
            this.userUbicacion = user;
            break;
          }
        }

        //this.userUbicacion = locations.find(user => user.latitud && user.longitud);
       


      }

    );
  }    

}
