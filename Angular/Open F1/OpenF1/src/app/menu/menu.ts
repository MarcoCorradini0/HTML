import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from "../components/theme-toggle/theme-toggle";

@Component({
  selector: 'app-menu',
  imports: [RouterLink, ThemeToggle],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}
