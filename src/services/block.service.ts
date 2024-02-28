import fs from "fs";
import { Validator } from "../interfaces/validator.interface";
import { Operator } from "../interfaces/operator.interface";
import { Block } from "../interfaces/block.interface";
import { generateUniqueAddress } from "../utils/utils";
import { processTransactions } from "./transaction.service";

const processBlocks = (
  blocks: Block[],
  blockNumber: number
): { validators: Validator[]; operators: Operator[] } => {
  const validators: Validator[] = [];
  const operators: Operator[] = [];

  for (let i = 0; i <= blockNumber; i++) {
    if (blocks[i] && blocks[i].transactions) {
      processTransactions(blocks[i].transactions, validators, operators);
    }
  }
  return { validators, operators };
};

const readBlocksAsync = async (fileName: string): Promise<Block[]> => {
  try {
    const fileContent = await fs.promises.readFile(fileName, "utf-8");
    return JSON.parse(fileContent).blocks;
  } catch (error) {
    console.error(error);
    throw new Error(`Error reading ${fileName}`);
  }
};

export const startContinuousBlockGeneration = async (
  fileName: string,
  stopBlock?: number
): Promise<void> => {
  let blocks: Block[] = await readBlocksAsync(fileName);
  let startBlockNumber = Math.max(...blocks.map((block) => block.id)) + 1;

  const intervalId = setInterval(() => {
    try {
      if (stopBlock !== undefined && startBlockNumber > stopBlock) {
        clearInterval(intervalId);
        console.log(
          `Continuous block generation stopped at block ${stopBlock}`
        );
        return;
      }

      const generateTransactions = (numTransactions: number): any[] => {
        const transactions = [];
        for (let i = 0; i < numTransactions; i++) {
          transactions.push({
            id: i,
            address: generateUniqueAddress(40),
            register: [],
          });
        }
        return transactions;
      };

      blocks.push({
        id: startBlockNumber,
        transactions: generateTransactions(3),
      });

      startBlockNumber++;

      fs.writeFileSync(fileName, JSON.stringify({ blocks }));
    } catch (error) {
      console.error(error);
    }
  }, 12000);
};

export const getBlockState = async (
  fileName: string,
  targetBlock: number
): Promise<{ validators: Validator[]; operators: Operator[] }> => {
  const blocks = await readBlocksAsync(fileName);
  return processBlocks(blocks, targetBlock);
};
