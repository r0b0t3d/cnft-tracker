import axios from 'axios';

type FilterOptions = {
    sale_type?: string;
    sort_by?: string;
    filters?: any
    search_text?: string;
    cursor?: number;
};

type Project = 'adarealm-lazyisland';

type CnftData = {
    nfts: any[];
    cursor: number;
    hasMore: boolean;
}

const getCnfts = async (project: Project, filters: FilterOptions): Promise<CnftData> => {
    const url = `https://www.jpg.store/api/collection/${project}/assets?is_scraped=false&is_confirmed=undefined`
    const data = await axios.post(url, filters);
    return data.data;    
}

const findCnft = async () => {
    let cursor = 0;
    while (true) {
        const cnftData = await getCnfts("adarealm-lazyisland", {
            cursor
        });
        cursor = cnftData.cursor;
        cnftData.nfts.forEach(nft => {
            const name = nft.onchain_metadata.Attributes[0];
            if (name.toLowerCase().includes("treasure")) {
                console.log(nft);
            }
        });
        if (!cnftData.hasMore) {
            break;
        }
    }
}

export default {
    getCnfts
}