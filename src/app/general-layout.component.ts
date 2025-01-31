import {Component, HostListener} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {VerticalLayoutComponent} from './vertical-layout.component';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {LogoComponent} from './logo.component';
import {LayoutService, LayoutType, SectionType} from './layout.service';
import {Subscription} from 'rxjs';
import {MatMenuModule} from '@angular/material/menu';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VerticalLayoutComponent, NgClass, NgStyle, VerticalLayoutComponent, LogoComponent, NgIf, MatMenuModule, NgForOf,],
  styles: [`
    #main-grid {
      display: grid;
      /*gap: 1px;*/
      background: black;
      overflow: hidden;
      grid-template-areas:
      "navbar navbar navbar"
    "about about skills"
    "contact logo skills"
    "contact projects projects";
    }

    app-section {
      border-radius: 1rem 1rem 0 0;
    }
  `],
  template: `
    <div class="flex flex-col gap-4 bg-black h-[100vh] relative items-center justify-center p-3">
      <div
        id="main-grid"
        [ngStyle]="{
        'border-radius': layout === 'general' ? '3rem' : '0 0 3rem 3rem',
        'gap': layout === 'general' ? '1px' : '',
    'grid-template-columns':
      section === 'projects' ? '0px 0px ' + viewportWidth + 'px' :
      section === 'about' ? viewportWidth + 'px 0px 0px' :
      section === 'contact'  ? viewportWidth + 'px 0px 0px'  :
      section === 'skills' ? '0px 0px ' + viewportWidth + 'px' :
      (viewportWidth / 2 - logoWidth / 2) + 'px '+ logoWidth + 'px ' + (viewportWidth / 2 - logoWidth / 2) + 'px',

      'grid-template-rows':
      section === 'projects' ? '32px ' + '0px 0px ' + viewportHeight + 'px' :
      section === 'about' ? '32px ' +  viewportHeight + 'px 0px 0px' :
      section === 'contact'  ? '32px ' +  '0px 0px ' + viewportHeight + 'px' :
      section === 'skills' ? '32px ' + viewportHeight + 'px 0px 0px' :
      '0px ' + (viewportHeight / 2 - logoHeight / 2) + 'px ' + logoHeight + 'px ' + (viewportHeight / 2 - logoHeight / 2) + 'px'
  }"

        class=" grid w-full transition-all duration-500 max-w-[1400px] max-h-[1000vh] relative"
        style="transition-duration: 500ms">
        <div style="grid-area: navbar"
             class="overflow-hidden flex justify-between items-center">
          <app-logo style="" class="z-40 flex mix-blend-difference h-min"
                    (click)="openSection(undefined);layoutService.setLayout('general')"
                    [ngStyle]="{'width': 200}"
                    [columnNumber]="15"
                    [ngClass]="
                    section ? '' : 'hidden'"/>
          <div (click)="menu = !menu"
            class="h-full aspect-square rounded-full flex items-center justify-center hover:bg-[#666666] cursor-pointer">
            <i class="material-icons text-white">menu</i>
          </div>
          <div class="absolute top-7 right-3 bg-white z-40 border rounded-xl overflow-hidden"
               style="box-shadow: 0 0px 140px 70px rgba(0,0,0,0.28)"
               *ngIf="menu"
          >
            <li class="w-full px-5 py-3 hover:bg-[#e5e7eb] cursor-pointer list-none" *ngFor="let section of ['experience', 'education', 'stack', 'projects', 'contact']">
              {{section}}
            </li>
          </div>
        </div>

        <app-section [name]="'about'" [expanded]="section === 'about'"
                     [sections]="['about', 'skills', 'contact', 'projects']" class="flex" style="grid-area: about;"
                     (click)="openSection('about')"/>
        <app-section [name]="'skills'" [expanded]="section === 'skills'"
                     [sections]="['skills', 'about', 'contact', 'projects']" class="flex" style="grid-area: skills;"
                     (click)="openSection('skills')"/>
        <app-logo style="grid-area: logo" class="z-40 flex mix-blend-difference"
                  [ngStyle]="{'width': logoWidth}"
                  [width]="logoWidth"
                  [ngClass]="
                    section ? 'hidden' : ''
"/>

        <app-section [name]="'contact'" [expanded]="section === 'contact'"
                     [sections]="['contact', 'about', 'skills', 'projects']" class="flex" style="grid-area: contact;"
                     (click)="openSection('contact')"/>
        <app-section [name]="'projects'" [expanded]="section === 'projects'"
                     [sections]="['projects', 'contact', 'about', 'skills']" class="flex" style="grid-area: projects;"
                     (click)="openSection('projects')"/>

      </div>
      <div id="color-layer"></div>
      <button *ngIf="layout == 'vertical'  && device === 'desktop'" (click)="openSection(undefined);layoutService.setLayout('general'); layoutService.selectProject(undefined)"
              style="box-shadow: 0 0px 80px 80px rgb(255 255 255 / 28%), 0 0px 0px 0px rgb(0 0 0 / 0.1)"
              class="shadow-xl text-white font-black absolute bottom-2 right-4 w-14 h-14 rounded-full bg-black flex items-center justify-center">
        <i class="material-icons">
          arrow_back
        </i>
      </button>
      <button *ngIf="layout == 'detail'" (click)="layoutService.setLayout('vertical'); layoutService.selectProject(undefined)"
              style="box-shadow: 0 0px 80px 80px rgb(255 255 255 / 28%), 0 0px 0px 0px rgb(0 0 0 / 0.1)"
              class=" text-white font-black absolute bottom-2 right-4 w-14 h-14 rounded-full bg-black flex items-center justify-center">
        <i class="material-icons">
          close
        </i>
      </button>
    </div>

  `,
})
export class GeneralLayoutComponent {

  title = 'proyecto-prueba';
  layout: LayoutType = 'general';
  section: SectionType = undefined; //todo: passar a 'section'
  device: 'desktop' | 'mobile' = 'desktop';

  menu: boolean = false;
  viewportWidth: number = 0;
  logoWidth: number = 0;
  viewportHeight: number = 0;
  logoHeight: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(
    public layoutService: LayoutService
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.layoutService.syncLayout$().subscribe((value: LayoutType) => {
        this.layout = value;
      })
    );
    this.subscription.add(
      this.layoutService.syncSection$().subscribe((value: SectionType) => {
        this.section = value;
      })
    );
    this.subscription.add(
      this.layoutService.syncDevice$().subscribe((value) => {
        this.device = value;
      })
    );
    this.setSizes()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openSection(section: SectionType) {
    if(!this.isMobile()) this.section = section;
    this.layoutService.setSection(section);
    this.layout == 'general' ? this.layoutService.setLayout("vertical") : null;

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    console.log("onResize")
    this.setSizes()
  }

  setSizes() {
    this.viewportWidth = window.innerWidth < 1400 ? window.innerWidth - 30 : 1400;
    this.viewportHeight = window.innerHeight < 1000 ? window.innerHeight - 2 : 1000;
    this.logoWidth = this.viewportWidth / 4;
    this.logoHeight = (this.logoWidth / 5) * 3;
  }

  isMobile() {
    return this.viewportWidth <= 600
  }
}
