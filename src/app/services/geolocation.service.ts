import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/Rx';

declare var google: any;

@Injectable()
export class GeolocationService {

    private geocoder = new google.maps.Geocoder;
    private latlng = new google.maps.LatLng({lat: 51, lng:8});
    private address: string;
    private _subject: BehaviorSubject<string> = new BehaviorSubject("");
    public subject: Observable<string> = this._subject.asObservable();

    constructor() { 
        this.getLocation();
    }

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

    getAddress() {
        this.getLocation();
        this.geocoder.geocode({ 'location': this.latlng }, this.getGeocode);
        this._subject.next(this.address);
    }
}