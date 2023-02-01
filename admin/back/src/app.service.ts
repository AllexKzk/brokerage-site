import { Injectable } from '@nestjs/common';
import {ChatGateway} from "./gateway";

@Injectable()
export class AppService {
  tradeSpeed: number;
  stocks = [];
  prevCost = [];
  curDate: Date;
  lastDate: Date;
  constructor(private readonly socket: ChatGateway) {

  }
  initTrade(settings: TradeSettings): void {
    this.tradeSpeed = parseFloat(settings.tradeSpeed);
    this.stocks = settings.stocks;
    if (!this.stocks.length)
      return;
    console.log(this.stocks);
    this.curDate = new Date(settings.startDate);
    this.curDate.setHours(0,0,0,0);
    this.lastDate = new Date('11/23/2022');
    this.simTrade();
  }
  simTrade(): void {
    if (this.curDate.getTime() > this.lastDate.getTime()){
      console.log("end");
      this.emitStatus(false);
      return;
    }
    let costOnDate = [];
    for (let i = 0; i < this.stocks.length; i++){
      const stockData = require('../Data/stocks/' + this.stocks[i] + '.json');
      for (const day of stockData){
        console.log("go " + day.date);
        const dateOfDay = new Date(day.date);
        if (dateOfDay.getTime() === this.curDate.getTime()){
          console.log("curDate: " + this.curDate);
          console.log("dateOfDay: " + dateOfDay);
          const ratio = this.prevCost[i] ? Math.floor((day.open.split('$')[1]/this.prevCost[i].cost.split('$')[1] - 1) * 10000)/10000 : 0;
          costOnDate.push({
            date: this.curDate.getDate() + '.' + (this.curDate.getMonth() + 1) + '.' + this.curDate.getFullYear(),
            stock: this.stocks[i], cost: day.open, ratio: ratio
          });
          break;
        }
      }
    }
    console.log("stocks: ");
    console.log(costOnDate);

    if (costOnDate.length){
      this.emitStock(costOnDate);
      this.prevCost = costOnDate;
      this.emitStatus(true);
      let plusDay = this.curDate.getDay() === 5 ? 3 : 1; //Fri
      this.curDate.setDate(this.curDate.getDate()+plusDay);
      setTimeout(this.simTrade.bind(this), this.tradeSpeed * 1000);
    }
  }
  emitStock(stocks: StockUpdate[]): void {
    console.log('emit: ');
    console.log(stocks);
    this.socket.server.emit('tradeStarted', stocks)
  }
  emitStatus(status: boolean): void {
    this.socket.server.emit('tradeStatus', status);
  }
}

interface TradeSettings {
  startDate: string;
  tradeSpeed: string;
  stocks: string[];
}

interface StockUpdate {
  date: string;
  stock: string;
  cost: string;
  ratio: number;
}