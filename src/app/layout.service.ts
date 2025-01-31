import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LayoutType = 'general' | 'vertical' | 'detail';
export type SectionType = 'about' | 'contact' | 'skills' | 'projects' | undefined;

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _layoutSubject: BehaviorSubject<LayoutType> = new BehaviorSubject<LayoutType>('general');
  private _sectionSubject: BehaviorSubject<SectionType> = new BehaviorSubject<SectionType>(undefined);
  private _selectedProject: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private _device: BehaviorSubject<'mobile' | 'desktop'> = new BehaviorSubject<'mobile' | 'desktop'>('desktop');

  constructor() {
    this.detectScreenSize();
    window.addEventListener('resize', this.detectScreenSize.bind(this));
  }

  syncLayout$() {
    return this._layoutSubject.asObservable();
  }

  syncSection$() {
    return this._sectionSubject.asObservable();
  }
  syncDevice$() {
    return this._device.asObservable();
  }
  syncProject$() {
    return this._selectedProject.asObservable();
  }

  setSection(valor: SectionType): void {
    console.log('Sección actualizada:', valor);
    this._sectionSubject.next(valor);
  }

  setLayout(valor: LayoutType): void {
    console.log('Valor actualizado:', valor);
    this._layoutSubject.next(valor);
    this._selectedProject.next(undefined);

  }
  setDevice(valor: 'desktop' | 'mobile'): void {
    console.log('Valor actualizado:', valor);
    this._device.next(valor);
  }

  selectProject(valor: number | undefined): void {
    console.log('Proyecto seleccionado:', valor);
    this._selectedProject.next(valor);
  }

  private detectScreenSize(): void {
    console.log("screen size changing")
    if (window.innerWidth < 650) {
      this.setDevice('mobile');
      this.setLayout('vertical')
      this.setSection('about')
    } else {
      this.setDevice('desktop');
      this.setLayout('general')
      this.setSection(undefined)
    }
  }
}
