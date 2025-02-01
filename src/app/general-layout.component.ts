import {Component, HostListener} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {VerticalLayoutComponent} from './vertical-layout.component';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {LayoutService, LayoutType, SectionType} from './layout.service';
import {Subscription} from 'rxjs';
import {MatMenuModule} from '@angular/material/menu';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VerticalLayoutComponent, NgClass, NgStyle, VerticalLayoutComponent, NgIf, MatMenuModule, NgForOf],
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
      @apply sm:rounded-t-3xl
    }

    .sm-rows {
      grid-template-rows: 64px 1fr!important;
    }
  `],
  template: `

    <div class="flex flex-col gap-4 bg-black h-[100vh] relative items-center justify-center sm:p-3">
      <div
        id="main-grid"
        [ngClass]="[layout === 'general' ? 'sm:rounded-3xl' : '', device === 'mobile' ? 'sm-rows' : '']"
        [ngStyle]="{
        'gap': layout === 'general' ? '1px' : '',
    'grid-template-columns':
      section === 'projects' ? '0px 0px ' + viewportWidth + 'px' :
      section === 'about' ? viewportWidth + 'px 0px 0px' :
      section === 'contact'  ? viewportWidth + 'px 0px 0px'  :
      section === 'skills' ? '0px 0px ' + viewportWidth + 'px' :
      (viewportWidth / 2 - logoWidth / 2) + 'px '+ logoWidth + 'px ' + (viewportWidth / 2 - logoWidth / 2) + 'px',

      'grid-template-rows':
      section === 'projects' ? '64px ' + '0px 0px ' + viewportHeight + 'px' :
      section === 'about' ? '64px ' +  viewportHeight + 'px 0px 0px' :
      section === 'contact'  ? '64px ' +  '0px 0px ' + viewportHeight + 'px' :
      section === 'skills' ? '64px ' + viewportHeight + 'px 0px 0px' :
      '0px ' + (viewportHeight / 2 - logoHeight / 2) + 'px ' + logoHeight + 'px ' + (viewportHeight / 2 - logoHeight / 2) + 'px'
  }"

        class=" grid w-full transition-all duration-500 max-w-[1400px] max-h-[1000vh] relative"
        style="transition-duration: 500ms">
        <div style="grid-area: navbar"
             class="overflow-hidden flex justify-between items-center">

<!--          horizontal logo -->

          <div class="flex-wrap text-white grid"
               [ngStyle]="{minWidth: '200px', gridTemplateColumns: 'repeat(7, 1fr)'}"
               (click)="openSection(undefined);layoutService.setLayout('general')">
            <div *ngFor='let char of  ["g", "a", "b", "r", "i", "e", "l", "a", "r" ,"d", "è" ,"v", "o", "l"], let i = index'
                 class=" flex justify-center aspect-square  items-center font-black text-center rounded-full text-black text-2xl"
                 [ngClass]="char ? 'bg-white' : 'bg-black'">
              {{char}}
            </div>
          </div>

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

        <app-section [clickedSection]="'about'" [expanded]="section === 'about'"
                     [sections]="['about', 'skills', 'contact', 'projects']" class="flex" style="grid-area: about;"
                     (click)="openSection('about')"/>
        <app-section [clickedSection]="'skills'" [expanded]="section === 'skills'"
                     [sections]="['skills', 'about', 'contact', 'projects']" class="flex" style="grid-area: skills;"
                     (click)="openSection('skills')"/>

        <!--          centered logo -->

        <div class="flex-wrap text-white grid"
             [ngStyle]="{minWidth: '200px', gridTemplateColumns: 'repeat(5, 1fr)'}">
          <div *ngFor='let char of  ["g", "a", "b", "r", "i", "e", "l", "", "a", "r" ,"d", "è" ,"v", "o", "l"], let i = index'
               class=" flex justify-center aspect-square  items-center font-black text-center rounded-full text-black text-2xl"
               [ngClass]="char ? 'bg-white' : 'bg-black'">
            {{char}}
          </div>
        </div>

        <app-section [clickedSection]="'contact'" [expanded]="section === 'contact'"
                     [sections]="['contact', 'about', 'skills', 'projects']" class="flex" style="grid-area: contact;"
                     (click)="openSection('contact')"/>
        <app-section [clickedSection]="'projects'" [expanded]="section === 'projects'"
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
    this.viewportWidth = window.innerWidth < 1400 ? window.innerWidth : 1400;
    this.viewportHeight = window.innerHeight < 1000 ? window.innerHeight - 2 : 1000;
    this.logoWidth = this.viewportWidth / 4;
    this.logoHeight = (this.logoWidth / 5) * 3;
  }

  isMobile() {
    return this.viewportWidth <= 600
  }
}
