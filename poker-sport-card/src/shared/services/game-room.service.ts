import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameRoomEndpoints } from '../../app/core/constans/api.endpoins';


@Injectable({ providedIn: 'root' })
export class GameRoomService {
  constructor(private httpClient: HttpClient) {}

  getRooms() {
    return this.httpClient.get(GameRoomEndpoints.ROOMS_LIST);
  }

}
