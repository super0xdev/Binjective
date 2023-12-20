// type SupraResponseResult = {
//   id: { id: string };
//   name: number;
//   value: {
//     fields: {
//       decimal: number;
//       round: string;
//       timestamp: string;
//       value: string;
//     };
//   };
//   type: string;
// };

export type PriceList = {
  [key: string]: number;
};

export const getMultiAggregatorInfo = async () => {
  try {
    const assestPriceList: PriceList = {};

    return assestPriceList;
  } catch (error) {
    return {};
  }
};
