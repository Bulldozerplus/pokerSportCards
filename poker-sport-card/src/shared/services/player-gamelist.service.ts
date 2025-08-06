import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../app/models/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerGameListService {
  private apiUrl = 'api/players'; // Замените на ваш реальный endpoint

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }
}
