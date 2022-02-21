import axios from 'axios';

type FilterOptions = {
    sale_type?: string;
    sort_by?: string;
    filters?: any
    search_text?: string;
    cursor?: number;
};

type CnftData = {
    nfts: any[];
    cursor: number;
    hasMore: boolean;
}

const getCnfts = async (project: string, filters: FilterOptions): Promise<CnftData> => {
    const url = `https://www.jpg.store/api/collection/${project}/assets?is_scraped=false&is_confirmed=undefined`
    const data = await axios.post(url, filters);
    return data.data;    
}

export default {
    getCnfts
}