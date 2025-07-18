import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit, OnDestroy {
  isDark = false;
  private sub?: Subscription;

  constructor(private themeService: ThemeService) {}

  async ngOnInit() {
    await this.themeService.init();
    this.isDark = this.themeService.isDarkMode();
    this.sub = this.themeService.getDarkModeObservable().subscribe(
      (dark) => (this.isDark = dark)
    );
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  toggleTheme() {
    this.themeService.toggle();
  }
}
