import { Error } from "@types";

// Dollar formatter
export const SmallUSDollar = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 5,
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 5,
});

export const USDollar = new Intl.NumberFormat("en-US");

export const toLocaleString = (num: number) => {
  if (isNaN(num)) {
    return num;
  }
  return num.toLocaleString("en-US");
};

export const roundUsDollar = (amount: number) => Math.round(Math.abs(amount));

export const removeDollarSign = (text: string) => {
  return text.replace(/[^\d.]/g, "");
};

export const addDollarSign = (text: string) => {
  return `$${toLocaleString(Number(removeDollarSign(text)))}`;
};

export const formatAndRoundUsDollar = (amount: number) =>
  addDollarSign(`${roundUsDollar(amount)}`);

export const convertDollarStringToFormattedDollar = (amount: number) => {
  if (typeof amount !== "number") return "--";
  let formartedAmount = Number(amount.toFixed(5));
  if (amount >= 1) {
    formartedAmount = Number(amount.toFixed(2));
    return `$${USDollar.format(formartedAmount)}`;
  }
  return `$${SmallUSDollar.format(formartedAmount)}`;
};

export const convertPercentChange = (value: number) => {
  if (typeof value === "number") {
    return `${value.toFixed(2)}%`;
  }
  return "--";
};

export function isErrorResponse(error: unknown): error is Error {
  return (
    !!error &&
    typeof error === "object" &&
    typeof (error as Error).data === "object" &&
    typeof (error as Error).data?.error_description === 'string'
  );
}
