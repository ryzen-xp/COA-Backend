
import { Repository } from 'typeorm';
//import { AppDataSource } from '../../../data-source'; //FUTURO ISSUE HABLADO CON EL MAINTAINER
import { Transaction } from '../entities/transaction.entity';

export const TransactionRepository: Repository<Transaction> = 
  AppDataSource.getRepository(Transaction);