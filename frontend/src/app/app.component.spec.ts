import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: '',
  selector: 'app-mock-route'
})
class MockRouteComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, 
        CommonModule, 
        ButtonModule, 
        LayoutModule,
        RouterModule.forRoot([
          { path: '', component: MockRouteComponent },
          { path: '**', component: MockRouteComponent }
        ]),
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('Webhook Notification Manager');
  });

  it('should render the title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Welcome to Webhook Manager');
  });

  it('should display the correct main heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h2');
    expect(heading?.textContent?.trim()).toBe('Welcome to Webhook Manager');
  });

  it('should display the description text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const description = compiled.querySelector('p.text-gray-600');
    expect(description?.textContent?.trim()).toContain('Manage your webhooks and send notifications to multiple platforms');
  });

  it('should display Discord platform card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const discordCard = compiled.querySelector('.bg-blue-50');
    expect(discordCard).toBeTruthy();
    expect(discordCard?.textContent).toContain('Discord');
    expect(discordCard?.textContent).toContain('Send messages to Discord channels via webhooks');
  });

  it('should display LINE platform card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const lineCard = compiled.querySelector('.bg-green-50');
    expect(lineCard).toBeTruthy();
    expect(lineCard?.textContent).toContain('LINE');
    expect(lineCard?.textContent).toContain('Notify LINE users and groups');
  });

  it('should display Telegram platform card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const telegramCard = compiled.querySelector('.bg-purple-50');
    expect(telegramCard).toBeTruthy();
    expect(telegramCard?.textContent).toContain('Telegram');
    expect(telegramCard?.textContent).toContain('Send messages via Telegram bots');
  });

  it('should have Create Webhook button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('p-button[label="Create Webhook"]');
    expect(button).toBeTruthy();
  });

  it('should have header and footer components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should have router outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have proper layout structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const mainDiv = compiled.querySelector('div.min-h-screen.bg-gray-100.flex.flex-col');
    expect(mainDiv).toBeTruthy();
    
    const main = compiled.querySelector('main.flex-1');
    expect(main).toBeTruthy();
  });
});