import { Transaction } from "./transaction.interface";

export interface Block {
  id: number;
  transactions: Transaction[];
}
