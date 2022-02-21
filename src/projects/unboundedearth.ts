import cnftio from "../services/cnftio";
import jpgStore from "../services/jpgStore";

const args = process.argv.slice(2);

async function run() {
  let cursor = 0;
  const searchText = args[0];
  const maxPrice = args[1] ? parseInt(args[1]) : 200; // in ADA
  let currentPrice = 0;
  while (true) {
    const cnftData = await jpgStore.getCnfts("unboundedearth", {
      cursor,
    });
    cursor = cnftData.cursor;
    cnftData.nfts.forEach((nft) => {
      const meta = nft.onchain_metadata;
      const season = meta["---SEASON---"];
      const price = parseInt(nft.price_lovelace, 0);
      if (
        season.toLowerCase().includes(searchText.toLowerCase()) &&
        price < maxPrice * 1000000
      ) {
        const link = `https://www.jpg.store/asset/${nft.asset_id}`;
        console.log({
          Season: season,
          Coords: meta["---X---"] + "," + meta["---Y---"],
          Price: `${price / 1000000}₳`,
          Link: link,
        });
      }
      currentPrice = Math.max(currentPrice, price);
    });

    if (!cnftData.hasMore || currentPrice > maxPrice * 1000000) {
      break;
    }
  }

  currentPrice = 0;
  let page = 1;
  while (true) {
    const { results, count } = await cnftio.getCnfts("unboundedearth", {
      page,
    });
    results.forEach((nft) => {
      const price = parseInt(nft.price, 0);
      const asset = nft.assets[0];
      if (asset) {
        const meta = asset.metadata;
        const season = meta["---SEASON---"];
        if (
          season.toLowerCase().includes(searchText.toLowerCase()) &&
          price < maxPrice * 1000000
        ) {
          const link = `https://cnft.io/token/${nft._id}`;
          console.log({
            Season: season,
            Coords: meta["---X---"] + "," + meta["---Y---"],
            Price: `${price / 1000000}₳`,
            Link: link,
          });
        }
      }
      currentPrice = Math.max(currentPrice, price);
    });
    if (count === 0 || currentPrice > maxPrice * 1000000) {
      break;
    }
    page += 1;
  }
}

run();
