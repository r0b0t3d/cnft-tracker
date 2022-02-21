import axios from "axios";

type FilterOptions = {
  search?: string;
  types?: "listing" | "auction" | "offer" | "bundle"[];
  project?: string;
  sort?: { price: 1 };
  priceMin?: number;
  priceMax?: number;
  page?: number;
  verified?: true;
  nsfw?: false;
  sold?: false;
  smartContract?: true;
};

const DEFAULT_FILTERS = {"search":"","types":["listing","auction","offer","bundle"],"project":"UnboundedEarth","sort":{"price":1},"priceMin":null,"priceMax":null,"page":3,"verified":true,"nsfw":false,"sold":false,"smartContract":true}

type CnftData = {
  results: any[];
  count: number;
  page: boolean;
};

const getCnfts = async (
  project: string,
  filters: FilterOptions
): Promise<CnftData> => {
  const url = `https://api.cnft.io/market/listings`;
  const data = await axios.post(url, {
      ...DEFAULT_FILTERS,
      ...filters,   
      project
  });
  return data.data;
};

export default {
  getCnfts,
};
