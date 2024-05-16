import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  @Input('erro') erro: string = ''
  
  name = new FormControl('')
  block = new FormControl('', Validators.required)


  @Output()
  enviandoEndpoint = new EventEmitter<string>()

  send() {
    if(this.block.value === "") {
      this.erro = '*Por favor, selecione um bloco válido'
    } else {
      this.erro = ''
      let endpoint: string = ''
      if(this.name.value !== "") {
        endpoint = `${this.name.value}|${this.block.value}`
      } else {
        endpoint = `${this.block.value}`
      }
      this.enviandoEndpoint.emit(`https://api.magicthegathering.io/v1/sets?name=${endpoint}`)
    }
  }
}
