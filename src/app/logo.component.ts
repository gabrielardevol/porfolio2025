import {Component, HostListener, Input, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {expand} from 'rxjs';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgForOf, NgIf, NgStyle],
  styles: [
    `
    `
  ],
  template: `

      <div class="flex-wrap text-white grid"
      [ngStyle]="{minWidth: width + 'px', gridTemplateColumns: 'repeat(' + columnNumber + ', 1fr)'}">
        <div *ngFor="let char of string, let i = index"
             class=" flex justify-center aspect-square  items-center font-black text-center rounded-full text-black text-2xl"
             [ngClass]="string[i] ? 'bg-white' : 'bg-black'">
          {{char}}
        </div>
      </div>



  `,
})
export class LogoComponent implements OnInit{
  @Input() width: number = 200;  // Input del componente
  @Input() columnNumber: number = 5;
  @Input() rowNumber: number = 3;
  string: string[] = ["g", "a", "b", "r", "i", "e", "l", "", "a", "r" ,"d", "è" ,"v", "o", "l"]
  constructor() {}

  ngOnInit(): void {
  }

}
