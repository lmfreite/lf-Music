import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { TabsComponent } from "../tabs/tabs.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [RouterOutlet, TabsComponent],
})
export class LayoutComponent  implements OnInit {
  title: string = 'My App';
  constructor() { }

  ngOnInit() {}

}
