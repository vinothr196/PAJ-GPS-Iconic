import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Map, Marker } from 'maplibre-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map!: Map;
  private devices: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.login('testkunde@paj-gps.de', 'app123#').subscribe(res => {
      const token = res.token;  // Adjust based on actual response structure
      this.apiService.getDevices(token).subscribe(devices => {
        this.devices = devices;
        devices.forEach(device => {
          this.apiService.getLastTrackingData(device.id, token).subscribe(data => {
            const lastPosition = data[0]; // Assuming the last position is the first element
            this.addMarker(lastPosition);
          });
        });
      });
    });

    this.initMap();
  }

  private initMap() {
    this.map = new Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0], // Initial center
      zoom: 2
    });
  }

  private addMarker(position: any) {
    new Marker()
      .setLngLat([position.longitude, position.latitude])
      .addTo(this.map);
  }
}
