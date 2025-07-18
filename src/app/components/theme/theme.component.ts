import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/services/theme/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit {
  isDark = false;

  constructor(private themeService: ThemeService) {}

  async ngOnInit() {
    await this.themeService.init();
    this.isDark = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.themeService.toggle();
    this.isDark = this.themeService.isDarkMode();
  }
}
