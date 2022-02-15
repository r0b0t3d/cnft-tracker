import jpgStore from "../jpgStore";

async function run() {
    let cursor = 0;
    while (true) {
        const cnftData = await jpgStore.getCnfts("adarealm-lazyisland", {
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

run();