import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input('name') name: string = ""
  @Input('manaCost') manaCost: string = ""
  @Input('text') text: string = ""
  @Input("imageUrl") imageUrl: string = ""
}
