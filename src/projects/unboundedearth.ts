import cnftio from "../services/cnftio";
import jpgStore from "../services/jpgStore";

const args = process.argv.slice(2);

function isCoordValid(season: string, x: number, y: number) {
  if (season.toLowerCase() === "summer") {
    return x < 80;
  }
  if (season.toLowerCase() === "winter") {
    return x < 80 && y > -122;
  }
  return true;
}

async function run() {
  let cursor = 0;
  const searchText = args[0];
  const maxPrice = args[1] ? parseInt(args[1]) : 200; // in ADA
  let currentPrice = 0;
  while (true) {
    try {
      const cnftData = await jpgStore.getCnfts("unboundedearth", {
        cursor,
      });
      cursor = cnftData.cursor;
      cnftData.nfts.forEach((nft) => {
        const meta = nft.onchain_metadata;
        const season = meta["---SEASON---"];
        const price = Number(nft.price_lovelace);
        if (
          season.toLowerCase().includes(searchText.toLowerCase()) &&
          price < maxPrice * 1000000 &&
          isCoordValid(season, Number(meta["---X---"]), Number(meta["---Y---"]))
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
    } catch (error) {
      break;
    }
  }

  currentPrice = 0;
  let page = 1;
  while (true) {
    try {
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
    } catch (error) {
      break;
    }
  }
}

run();
