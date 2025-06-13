import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG Modules
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  imports: [CommonModule, RouterModule, MenubarModule, ButtonModule, SidebarModule, ToolbarModule],
  exports: [CommonModule, RouterModule, MenubarModule, ButtonModule, SidebarModule, ToolbarModule],
})
export class SharedModule {}
