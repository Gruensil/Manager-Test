import { Injectable } from '@angular/core';
import { Location } from '../types/location';

declare var google: any;

@Injectable()
export class GeolocationService {

    geocoder = new google.maps.Geocoder;
    latlng = new google.maps.LatLng({lat: 51, lng:8});
    address: string;

    constructor() { }

    setPosition = (position: any) => {
        var la = "" + position.coords.latitude;
        var lo = "" + position.coords.longitude;
        this.latlng = new google.maps.LatLng({lat: parseFloat(la), lng: parseFloat(lo)});
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition);
        } else {
            console.log('Geolocation not supported');
        }
    }

    getGeocode = (results: any, status:any) => {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                this.address = "" + results[1].formatted_address;
            } else {
                console.log('No location results found');
            }
        } else {
            console.log('Geocoder failed due to: ' + status);
        }
    }

    getAddress(): string{
        this.getLocation();
        this.geocoder.geocode({ 'location': this.latlng }, this.getGeocode);
        return this.address;
    }
}