import jpgStore from "../services/jpgStore";

const args = process.argv.slice(2);

async function run() {
  let cursor = 0;
  const searchText = args[0];
  const maxPrice = args[1] ? parseInt(args[1]) : 200; // in ADA
  let currentPrice = 0;
  while (true) {
    try {
      const cnftData = await jpgStore.getCnfts("axols", {
        cursor,
      });
      cursor = cnftData.cursor;
      cnftData.nfts.forEach((nft) => {
        const meta = nft.onchain_metadata;
        const price = Number(nft.price_lovelace);
        const { Traits } = meta;
        const isValid = Object.keys(Traits).some((key) =>
          Traits[key].toLowerCase().includes(searchText.toLowerCase())
        );
        if (isValid && price < maxPrice * 1000000) {
          const link = `https://www.jpg.store/asset/${nft.asset_id}`;
          console.log({
            Name: meta.name,
            Price: `${price / 1000000}₳`,
            Link: link,
          });
        }
        currentPrice = Math.max(currentPrice, price);
      });

      if (!cnftData.hasMore || currentPrice > maxPrice * 1000000) {
        break;
      }
    } catch (error) {
      break;
    }
  }
}

run();
