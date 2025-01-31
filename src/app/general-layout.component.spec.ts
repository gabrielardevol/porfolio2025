import { TestBed } from '@angular/core/testing';
import { GeneralLayoutComponent } from './general-layout.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralLayoutComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GeneralLayoutComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'proyecto-prueba' title`, () => {
    const fixture = TestBed.createComponent(GeneralLayoutComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('proyecto-prueba');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(GeneralLayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, proyecto-prueba');
  });
});
