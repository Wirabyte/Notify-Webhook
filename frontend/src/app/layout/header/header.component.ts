import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  sidebarVisible = false;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Webhooks',
        icon: 'pi pi-link',
        items: [
          {
            label: 'Create Webhook',
            icon: 'pi pi-plus',
          },
          {
            label: 'Manage Webhooks',
            icon: 'pi pi-cog',
          },
        ],
      },
      {
        label: 'Platforms',
        icon: 'pi pi-share-alt',
        items: [
          {
            label: 'Discord',
            icon: 'pi pi-discord',
          },
          {
            label: 'LINE',
            icon: 'pi pi-comment',
          },
          {
            label: 'Telegram',
            icon: 'pi pi-send',
          },
        ],
      },
    ];
  }
}
