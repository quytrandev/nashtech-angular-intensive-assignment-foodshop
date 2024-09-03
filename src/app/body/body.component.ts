import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './body.component.html',
})
export class BodyComponent {

}
