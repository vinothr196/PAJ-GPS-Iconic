import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://connect.paj-gps.de/api/v1';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  getDevices(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/device`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getLastTrackingData(deviceId: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/trackerdata/${deviceId}/last_points?lastPoints=50`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getRouteData(deviceId: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/trackerdata/${deviceId}/route`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
