import { Component, Input, OnInit, inject, input } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { CollectionsComponent } from '../collections/collections.component';
import { CardsComponent } from '../cards/cards.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchFormComponent, CollectionsComponent, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @Input('style') style: string = ''
  @Input('loading') loading: string = 'display: none;'
  @Input('errorMessage') errorMessage: string = ''

  http = inject(HttpClient)
  posts: any = [];
  endpointColecoes: string = ''

  ngOnInit(): void {
  }

  recebendoEndpointColecoes(text: string) {
    this.endpointColecoes = text
    this.fetchColecoes()
  }

  fetchColecoes() {
    this.http.get(this.endpointColecoes)
      .subscribe((posts: any) => {
        this.posts = posts.sets
        console.log(posts.sets)
      })
  }

  endpointCartas: string = ''
  cardsProntos: any = []
  recebendoEndpointCartas(text: string) {
    this.endpointCartas = text
    this.fetchCartas()
  }

  fetchCartas() {
    console.log("Buscando...")
    this.style = 'display: none;'
    this.loading = 'display: block'
    this.errorMessage = 'Desculpe. Esta coleção não está funcionando, por favor, tente novamente mais tarde.'
    this.http.get(this.endpointCartas)
      .subscribe({
        next: (cards: any) => {
          for (let card of cards.cards) {
            if (card.types[0] == 'Creature') {
              if (this.cardsProntos.length < 30) {
                this.cardsProntos.push(card)
              }
            }
          }
          if (this.cardsProntos.length == 30) {
            this.loading = 'display: none;'
            console.log('Finalizado.')
            console.log(this.cardsProntos)
          } else {
            this.fetchCartas()
          }
        },
        error: (err) => {
          this.loading = 'display: none;'
          this.style = 'display: block;'
          this.errorMessage = 'Desculpe, esta coleção não está funcionando. Por favor, tente novamente mais tarde.'
        }
      })
  }
}
