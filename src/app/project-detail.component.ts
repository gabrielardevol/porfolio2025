import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {expand, Subscription} from 'rxjs';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {LayoutService, LayoutType, SectionType} from './layout.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgForOf, NgIf, NgStyle],
  styles: [
    `

    `
  ],
  template: `

    <div class="w-full flex justify-center overflow-hidden">
      <div class="w-full max-w-[700px] bg-white flex flex-col h-full overflow-auto "
           [ngClass]="layout == 'detail' ? 'overflow-auto p-4 gap-4' : ''">
        <div class="w-full aspect-video bg-gray-300 flex items-end justify-end gap-1 rounded-xl " (click)="layout == 'detail' ? displayImage = undefined : null">


        </div>

        <div class="flex flex-wrap gap-1">
          <h3 class="font-bold text-2xl">Landing lander</h3>

          <span class="bg-[#666666] h-min w-fit text-white px-1.5 py-0.5 rounded-full font-bold text-xs">HTML</span>
          <span class="bg-[#666666] h-min w-fit text-white px-1.5 py-0.5 rounded-full font-bold text-xs">Angular</span>

          <span class="bg-[#666666] h-min w-fit text-white px-1.5 py-0.5 rounded-full font-bold text-xs">Project #{{index}}</span>
        </div>
        <!--      <div class="relative overflow-hidden w-full h-12">-->
        <!--        <img class="" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="">-->
        <!--        <div class="absolute bottom-0 right-0 flex flex-wrap gap-2">-->

        <!--        </div>-->
        <!--      </div>-->

        <div *ngIf="layout === 'detail'">
          Easily build and export your landing page with a customizable template.

          <br>

          Dissenyar templates és un exercici d'abstracció. Es tracta de que el disseny sigui personalitzable i simple a la vegada. D'aquest equilibri depèn la escalabilitat del producte.
          <br>

          <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4a9c1868-e6d4-4e1a-b331-af9769962cfb/divwrr6-c1be81fa-429f-4941-a7e9-e12cd42e2420.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRhOWMxODY4LWU2ZDQtNGUxYS1iMzMxLWFmOTc2OTk2MmNmYlwvZGl2d3JyNi1jMWJlODFmYS00MjlmLTQ5NDEtYTdlOS1lMTJjZDQyZTI0MjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-eGlmAtFvFhq8qznLCFrOmnL4QJZ5ODBV7qnn-szMgY" alt=""
           (click)="displayImage = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4a9c1868-e6d4-4e1a-b331-af9769962cfb/divwrr6-c1be81fa-429f-4941-a7e9-e12cd42e2420.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRhOWMxODY4LWU2ZDQtNGUxYS1iMzMxLWFmOTc2OTk2MmNmYlwvZGl2d3JyNi1jMWJlODFmYS00MjlmLTQ5NDEtYTdlOS1lMTJjZDQyZTI0MjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-eGlmAtFvFhq8qznLCFrOmnL4QJZ5ODBV7qnn-szMgY'"
          >

          Aquesta eina pretèn agilitzar el procés de crear una landing page. És un projecte en què el resultat ja no és una interfaç <i>per se</i>, sinó que l'usuari final té accés a parts de codi. En aquest tipus de projecte, s'ha de parar cura a l'experiència del desenvolupador. El codi ha de ser "socialitzat" per a que l'usuari que en fa ús pugui llegir-lo i re-escriure'l de la forma més àgil i intuitiva. Em sembla que amb l'acumulació de frameworks i llenguatges cada vegada més abstractes a vegades passem per alt les coses més bàsiques d'HTML i CSS, i al final del dia cal tenir-les en compte: utilitzar amb rigor la semàntica d'HTML, o seguir nomenclatura BEM en CSS, són maneres elementals (i no per això menys efectives) de procurar un codi estructurat i facil de llegir.
          <br>


          ESCLAT
          Bé, aquest és un projecte de ja fa temps i no reflexa el meu moment actual, però en l'últim any no he pogut dedicar gaire temps als meus projectes personals.
          QUan vaig sortir del bootcamp tenia clar que havia de seguir picant codi de la manera que fos, així que vaig fer un escombrat brutal per a fundacións sense ànim de lucre oferint els meus serveis com a desenvolupador. Fent la vista enrere no sé dir si va ser osat o temerari, la qüestió és que la fundació esclat em va fer una proposta que m'encaixava molt bé, ja que podia mostrar les meves capacitats i a la vegada no requeria d'una gran responsabilitat. La veritat és que em van donar molta llibertat i


          This porfolio (yes)
        </div>



        <!--        https://www.brandmanic.com/kit-digital/-->

        <!--        <div class="w-20 h-20 bg-red-500">-->
        <!--          h-->
        <!--        </div>-->
        <!--      </div>-->
      </div>
    </div>

<div *ngIf="displayImage" class="w-full h-full absolute top-0 left-0 bg-[#00000099] z-40">

</div>
    <div id="lightbox" class="w-full h-full flex items-center justify-center absolute top-0 left-0 " *ngIf="displayImage">
      <div class="flex relative">
        <img class="z-50 max-w-[70vw]" src="{{displayImage}}" alt="">
        <button (click)="displayImage = undefined"
                class="top-0 right-[-70px] font-black absolute w-14 h-14 rounded-full bg-white flex items-center z-40 justify-center">
          <i class="material-icons">
            close
          </i>
        </button>
      </div>

    </div>
  `,
})
export class ProjectDetailComponent {
@Input() index: number = 0;
expanded: boolean = false;
  private subscription: Subscription = new Subscription();
  layout: LayoutType = 'detail';
  displayImage: string | undefined = undefined;

  constructor(public layoutService: LayoutService) {
}

  ngOnInit(): void {
    this.subscription.add(
      this.layoutService.syncLayout$().subscribe((valor: LayoutType) => {
        this.layout = valor;
      }),
    );
  }
}
