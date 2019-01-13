import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtractService {

  constructor() { }

  extractIndexFromUrl(url: string): number {
    const pathnameToSegment = new URL(url).pathname;
    const extractedIndex = pathnameToSegment.substr(pathnameToSegment.lastIndexOf('/') + 1);
    return parseInt(extractedIndex, 10);
  }
}
