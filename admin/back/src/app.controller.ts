import {Controller, Get, HttpStatus, Res, Param, Post, Put, Body, Delete} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import {addNewBroker, deleteBroker, editBrokerById, findUser, getBroker, addStockToBroker, sellStock} from './brokersEdit'

export class BrokerDto {
  name: string;
  commission: string;
  startMoney: string;
}
export class TradeDto {
  startDate: string;
  tradeSpeed: string;
  stocks: string[];
}

export class UserDto{
  login: string;
  password: string;
}

export class TransferDto{
  broker: string;
  cost: number;
  count: number;
  stock: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getbroker:name')
  getBroker(@Res() res: Response, @Param() params){
    res.status(HttpStatus.OK).json(getBroker(params.name));
  }
  @Get('brokers')
  getBrokers(@Res() res: Response){
    res.status(HttpStatus.OK).json(require('../Data/brokers.json'));
  }
  @Get('stock')
  getStocks(@Res() res: Response){
    res.status(HttpStatus.OK).json(require('../Data/stock.json'));
  }
  @Get('getstock:stock')
  getStockData(@Res() res: Response, @Param() params){
    res.status(HttpStatus.OK).json(require('../Data/stocks/' + params.stock + '.json'));
  }
  @Post('starttrade')
  startTrade(@Body() body: TradeDto){
    this.appService.initTrade(body);
  }
  @Post('addbroker')
  addBroker(@Body() body: BrokerDto){
    addNewBroker(body);
  }
  @Put('editbroker:id')
  editBroker(@Param() params, @Body() body: BrokerDto){
    console.log("broker " + params.id + " updated on ");
    console.log(body);
    editBrokerById(params.id, body);
  }
  @Put('login')
  loginUser(@Res() res: Response, @Body() body: UserDto) {
    res.status(HttpStatus.OK).json(findUser(body.login, body.password));
  }
  @Put('buystock')
  buyStock(@Body() body: TransferDto){
    addStockToBroker(body.broker, body.stock, body.cost, body.count);
  }
  @Put('sellstock')
  sellStock(@Body() body: TransferDto) {
    sellStock(body.broker, body.stock, body.cost, body.count);
  }
  @Delete('delbroker:id')
  delBroker(@Param() params){
    deleteBroker(params.id);
  }
}
