import { Operator } from "../interfaces/operator.interface";
import { Transaction } from "../interfaces/transaction.interface";
import { Validator } from "../interfaces/validator.interface";
import { findValidator } from "../utils/validators";
import { addOperator, findOperator } from "../utils/operators";
import { generateId } from "../utils/utils";

const processSingleTransaction = (
  transaction: Transaction,
  validators: Validator[],
  operators: Operator[]
): void => {
  const existingValidator: any = findValidator(validators, transaction.address);

  if (!existingValidator) {
    const newValidator: Validator = {
      id: generateId(),
      address: transaction.address,
      operators: transaction.register,
    };

    if (newValidator.operators.length >= 3) {
      validators.push(newValidator);

      for (const operatorId of transaction.register) {
        const existingOperator = findOperator(operators, operatorId);

        if (existingOperator) {
          if (!existingOperator.validators.includes(newValidator.id)) {
            existingOperator.validators.push(newValidator.id);
          }
        } else {
          const newOperator: Operator = {
            id: operatorId,
            validators: [newValidator.id],
          };

          addOperator(operators, newOperator);
        }
      }
    }
  }
};

export const processTransactions = (
  transactions: Transaction[],
  validators: Validator[],
  operators: Operator[]
): void => {
  for (const transaction of transactions) {
    if (transaction.register.length > 0) {
      processSingleTransaction(transaction, validators, operators);
    }
  }
};
