import { Validator } from "../interfaces/validator.interface";

export const findValidator = (
  validators: Validator[],
  address: string
): Validator | undefined =>
  validators.find((validator) => validator.address === address);
