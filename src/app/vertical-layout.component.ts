import {Component, Input} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {expand, Subscription} from 'rxjs';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {SquiggleComponent} from './squiggle.component';
import {LayoutService, LayoutType, SectionType} from './layout.service';
import data from './data.json' ;
import {ProjectDetailComponent} from './project-detail.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgForOf, NgIf, SquiggleComponent, ProjectDetailComponent],
  styles: [
    `
      .section {
        @apply rounded-3xl;
        padding: clamp(30px, 3vw, 3.4rem);
      }

      .section h1 {
        @apply text-2xl font-black;
      }
    `
  ],
  template: `
    <div *ngIf="name == section || layout != 'vertical'  && !selectedProject"
         class="flex flex-1 flex-col bg-black w-full transition-all duration-500  h-full overflow-auto "
         [ngClass]="[layout == 'vertical' ? 'sm:rounded-3xl gap-[1px]' : '', device == 'mobile' ? 'h-[calc(100vh-64px)]' :'']">


      <div *ngFor="let section of sections" class="bg-white" [ngClass]="section == name ? 'flex-1' : ''">

        <!--      SKILLS-->
        <div *ngIf="(name == 'skills' || layout == 'vertical') && section == 'skills'"
             class="p-4 flex flex-col gap-3 bg-white section"
             [ngClass]="layout == 'vertical' ? 'rounded-3xl' : ''">
          <p class="text-xl">
            El domini de software d'edició d'imatge, juntament amb la meva formació, em converteix en un perfil versàtil
            i polivalent.
          </p>

          <!--              <h1 [ngClass]="layout == 'vertical' ? 'text-2xl' : 'text-xl'">Skills</h1>-->
          <style>
            li {
              display: flex;
              justify-content: space-between
            }
          </style>

          <ul *ngFor="let category of skills" class="max-w-[60ch]">
            <li class="font-bold mt-2">{{category.category}}</li>
            <li *ngFor="let skill of category.items" class="border-b py-2 hover:bg-gray-50">
              {{skill['name']}}
              <div class="flex gap-1">
                <i *ngFor="let i of [0, 1, 2,3 ,4]" class="bi" [ngClass]="
skill['rate'] - i >= 1 ? 'bi-star-fill' : skill['rate'] - i > 0 && skill['rate'] - i < 1 ? 'bi-star-half' : 'bi-star'">
                </i>
              </div>

            </li>
          </ul>
        </div>


        <!--      ABOUT-->
        <div *ngIf="(name == 'about' || layout == 'vertical') && section == 'about' && !selectedProject"
             class="flex flex-col gap-1 bg-white section"
             [ngClass]="layout == 'vertical' ? '' : 'p-8 pt-[15vh]'">

          <h1 class="">
            Creative Web Developer<span class="emoji">🐞</span></h1>

          <p class="text-xl">V-type profile with interest in the intersections between design and development,
            experimentation and expertise, playfulness and proficiency.
          </p>
          <br> <br>

          <div *ngFor="let item of about">
            <h2 class="bg-black text-white w-fit font-medium mt-3">{{item['category']}}</h2>
            <div class="max-w-[60ch]" *ngFor="let item2 of item['items']">
              <b>{{item2['title']}}</b> at {{item2['institution']}}<br>
              {{item2['duration']}} <br>
              <ul class=" pl-3 max-w-[60ch] border-l border-black ">
                <li *ngFor="let item3 of item2['acquaintances']">{{item3}}</li>
              </ul>
              <br>

            </div>
          </div>
        </div>


        <!--      CONTACT-->
        <div *ngIf="(name == 'contact' || layout == 'vertical') && section == 'contact' && !selectedProject "
             class="p-4 flex flex-col gap-1 bg-white section h-full items-center justify-center text-xl"
             [ngClass]="layout == 'vertical' ? 'rounded-3xl' : ''">
          <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" alt=""
               class="max-w-[300px] aspect-square rounded-xl">
          <br>
          <div class="flex gap-2"><i class="bi bi-whatsapp"></i> <span class="font-medium">+34 646 18 16 10</span></div>
          <div class="flex gap-2"><i class="bi bi-envelope-fill"></i> <span
            class="font-medium">artsdevol&#64;gmail.com</span></div>
          <div class="flex gap-2"><i class="bi bi-linkedin"></i> <a class="underline font-medium" target="_blank"
                                                                    href="https://www.linkedin.com/in/gabrielardevol/">Linkedin</a>
          </div>
          <div class="flex gap-2"><i class="bi bi-github"></i> <a class="underline font-medium" target="_blank"
                                                                  href="https://github.com/gabrielardevol">Github</a>
          </div>
        </div>


        <!--      PROJECTS-->
        <!--          <app-projects *ngIf="(layout == 'vertical' || layout == 'detail' || name == 'projects') && section == 'projects'"-->
        <!--                        class="bg-white"-->
        <!--                        [ngClass]="layout == 'vertical' ? 'rounded-3xl' : ''"/>-->

        <div *ngIf="(layout == 'vertical' || layout == 'detail' || name == 'projects') && section == 'projects'"
             class="w-full grid transition-all duration-500 overflow-hidden bg-white rounded-3xl"
             [ngClass]="layout == 'detail' ? 'gap-0' : 'gap-8 p-12'"
        >


          <div class="grid gap-6"
               [ngClass]="selectedProject ? '' : 'grid-cols-[repeat(auto-fill,minmax(256px,1fr))]'"
          >
            <div class="px-5 bg-white" [ngClass]="selectedProject ? 'hidden' : '' ">
              <h1 class="transition-all duration-500 font-black bg-white w-full"
                  [ngClass]="layout == 'vertical' ? 'text-2xl h-[48px]' : layout == 'detail' ? 'h-[0px]' : 'text-xl'">
                Projects</h1>
              <p class="text-xl bg-white">
                El domini de software d'edició d'imatge, juntament amb la meva formació, em converteix en un perfil
                versàtil i
                polivalent.
              </p>
            </div>
            <app-project
              *ngFor="let project of [1, 2, 3, 4, 5], let i = index"
              [ngClass]="selectedProject && selectedProject!== i + 1 ? 'hidden' : '' "
              (click)="layoutService.setLayout('detail'); layoutService.selectProject(i + 1)"
              [index]="i"/>
          </div>

        </div>
      </div>
    </div>

  `,
})
export class VerticalLayoutComponent {
  @Input() expanded: boolean = false; // TODO: deprecar
  layout: LayoutType = 'vertical';
  @Input() name: string = "";
  @Input() sections: string[] = ['about', 'skills', 'contact', 'projects'];
  section: SectionType = undefined;
  private subscription: Subscription = new Subscription();

  selectedProject: number | undefined = undefined;
  skills = data.skills
  about = data.about
  device: 'mobile' | 'desktop' = 'desktop';


  constructor(public layoutService: LayoutService
  ) {
  }

  ngOnInit()
    :
    void {
    this.subscription.add(
      this.layoutService.syncLayout$().subscribe((value: LayoutType) => {
        this.layout = value;
      }),
    );
    this.subscription.add(
      this.layoutService.syncSection$().subscribe((value: SectionType) => {
        this.section = value;
      }),
    );
    this.subscription.add(
      this.layoutService.syncProject$().subscribe((value: number | undefined) => {
        this.selectedProject = value;
      }),
    )
    this.subscription.add(
      this.layoutService.syncDevice$().subscribe((value: 'desktop' | 'mobile') => {
        this.device = value;
      }),
    )
  }

  ngOnDestroy()
    :
    void {
    this.subscription.unsubscribe();
  }


}
