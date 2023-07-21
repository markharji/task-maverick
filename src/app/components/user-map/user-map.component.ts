import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Map, LatLngExpression, tileLayer, marker, icon } from 'leaflet';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.scss'],
})
export class UserMapComponent implements OnInit, OnChanges {
  @Input() user: User = {} as User;
  private map: Map | undefined;

  ngOnInit(): void {
    // this.map?.remove();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user?.email) {
      this.map?.remove();
      this.initMap();
      this.addUserMarker();
    }
  }

  private initMap(): void {
    const { latitude, longitude } = this.user?.location?.coordinates || {};

    this.map = new Map('userMap').setView([+latitude, +longitude], 1);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map);
  }

  private addUserMarker(): void {
    // this.users?.map((user) => {
    const { latitude, longitude } = this.user?.location?.coordinates || {};
    if (latitude || longitude) {
      const latLng: LatLngExpression = [+latitude, +longitude];
      const userIcon = icon({
        iconUrl: this.user.profileImage,
        iconSize: [31, 31],
      });
      if (this.map) {
        marker(latLng, { icon: userIcon }).addTo(this.map);
      }
    }
    // });
  }
}
