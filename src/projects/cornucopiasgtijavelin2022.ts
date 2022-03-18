import jpgStore from "../services/jpgStore";
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

async function run() {
  const maxPrice = argv.price ? parseInt(argv.price) : 200; // in ADA
  let cursor = 0;
  let currentPrice = 0;
  while (true) {
    const cnftData = await jpgStore.getCnfts("cornucopiasgtijavelin2022", {
      cursor,
    });
    cursor = cnftData.cursor;
    cnftData.nfts.forEach((nft) => {
      const meta = nft.onchain_metadata;     
      const { rarity, fullName } = meta;
      const price = parseInt(nft.price_lovelace, 0);
      const isValid =
      rarity.toLowerCase().includes(argv.rarity.toLowerCase()) &&
        price <= maxPrice * 1000000;
      if (isValid) {
        const link = `https://www.jpg.store/asset/${nft.asset_id}`;
        console.log({
          rarity,
          fullName,
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
}

run();
