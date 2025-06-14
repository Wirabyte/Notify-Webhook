import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have currentYear property set to current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
  });

  it('should render footer element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('footer');
    expect(footer).toBeTruthy();
  });

  it('should have correct footer classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('footer');
    expect(footer?.classList.contains('bg-gray-50')).toBe(true);
    expect(footer?.classList.contains('border-t')).toBe(true);
    expect(footer?.classList.contains('border-gray-200')).toBe(true);
    expect(footer?.classList.contains('mt-auto')).toBe(true);
  });

  it('should render copyright text with current year', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const copyrightText = compiled.querySelector('p.text-sm.text-gray-600');
    const currentYear = new Date().getFullYear();
    expect(copyrightText?.textContent?.trim()).toBe(`© ${currentYear} Webhook Manager. All rights reserved.`);
  });

  it('should have proper container structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.max-w-7xl.mx-auto');
    expect(container).toBeTruthy();
    
    const innerContainer = compiled.querySelector('.text-center');
    expect(innerContainer).toBeTruthy();
  });

  it('should have responsive padding classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.max-w-7xl.mx-auto');
    expect(container?.classList.contains('px-4')).toBe(true);
    expect(container?.classList.contains('sm:px-6')).toBe(true);
    expect(container?.classList.contains('lg:px-8')).toBe(true);
    expect(container?.classList.contains('py-6')).toBe(true);
  });

  it('should center align the copyright text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const textCenter = compiled.querySelector('.text-center');
    expect(textCenter).toBeTruthy();
  });

  it('should update currentYear when component initializes', () => {
    // Test if currentYear is properly initialized in constructor
    const newComponent = new FooterComponent();
    const currentYear = new Date().getFullYear();
    expect(newComponent.currentYear).toBe(currentYear);
  });

  it('should render with semantic footer tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('footer');
    expect(footer?.tagName.toLowerCase()).toBe('footer');
  });
});