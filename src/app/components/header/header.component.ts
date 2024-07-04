import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  httpClient = inject(HttpClient);
  usdToUah: number = 0;
  eurToUah: number = 0;

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    const apiKey = '62c4251c3f304008a47f89fbf57d315d';
    const url = `https://api.currencyfreaks.com/latest?apikey=${apiKey}&symbols=USD,EUR,UAH`;

    this.httpClient.get(url).subscribe(
      (data: any) => {
        this.usdToUah = data.rates.UAH / data.rates.USD;
        this.eurToUah = data.rates.UAH / data.rates.EUR;
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }

  ImgUsa = '/assets/img/usa.png';
}
