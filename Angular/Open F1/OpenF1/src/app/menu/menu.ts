import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggle } from "../components/theme-toggle/theme-toggle";

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, ThemeToggle],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}
