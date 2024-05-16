import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent {
  @Input('title') title: string = ''
  @Input('block') block: string = ''
  @Input('date') date: string = ''
  @Input('code') code: string = ''
  
  @Output()
  enviandoEndpoint = new EventEmitter<string>()

  onClick() {
    this.enviandoEndpoint.emit(`https://api.magicthegathering.io/v1/sets/${this.code}/booster`)
  }
}
