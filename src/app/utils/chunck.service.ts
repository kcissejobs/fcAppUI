import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChunckService {

  constructor() { }

  public splitArrayChunks<T>(periodes: T[], n: number) : T[][] {
    const result: T[][] = [];

    for(let i = 0; i< periodes.length; i += n) {
      result.push(periodes.splice(i, i + n));
    }

    console.log(result)

    return result;
  }
}
