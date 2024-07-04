import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  amount1: number = 0;
  amount2: number = 0;
  currency1: string = 'UAH';
  currency2: string = 'USD';
  exchangeRates: { [key: string]: number } = {};

  private apiKey = '62c4251c3f304008a47f89fbf57d315d';
  private apiUrl = `https://api.currencyfreaks.com/latest?apikey=${this.apiKey}&symbols=USD,EUR,UAH`;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.httpClient.get(this.apiUrl).subscribe(
      (data: any) => {
        this.exchangeRates = data.rates;
        this.convertFromAmount1();
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }

  convertFromAmount1() {
    const rate1ToUah = this.exchangeRates[this.currency1];
    const rate2ToUah = this.exchangeRates[this.currency2];
    if (rate1ToUah && rate2ToUah) {
      this.amount2 = parseFloat(
        ((this.amount1 * rate1ToUah) / rate2ToUah).toFixed(2)
      );
    }
  }

  convertFromAmount2() {
    const rate1ToUah = this.exchangeRates[this.currency1];
    const rate2ToUah = this.exchangeRates[this.currency2];
    if (rate1ToUah && rate2ToUah) {
      this.amount1 = parseFloat(
        ((this.amount2 * rate2ToUah) / rate1ToUah).toFixed(2)
      );
    }
  }

  onCurrencyChange() {
    this.convertFromAmount1();
  }
}
