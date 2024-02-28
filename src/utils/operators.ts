import { Operator } from "../interfaces/operator.interface";

export const findOperator = (
  operators: Operator[],
  operatorId: number
): Operator | undefined =>
  operators.find((operator) => operator.id === operatorId);

export const addOperator = (
  operators: Operator[],
  operator: Operator
): void => {
  if (!findOperator(operators, operator.id)) {
    operators.push(operator);
  }
};
