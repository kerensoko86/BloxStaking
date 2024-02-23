import { Request, Response } from "express";
import {
  getBlockState,
  startContinuousBlockGeneration,
} from "../services/block.service";

const stopBlock = 10; // just for the example if we want to stop the continious block generations

export const getBlockStateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const fileName = req.query.fileName as string;
  const blockNumber = parseInt(req.query.blockNumber as string);

  try {
    startContinuousBlockGeneration(fileName, stopBlock);
    const { validators, operators } = await getBlockState(
      fileName,
      blockNumber
    );

    res.json({ validators, operators });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
