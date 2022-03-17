import jpgStore from "../services/jpgStore";
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

async function run() {
  const maxPrice = argv.price ? parseInt(argv.price) : 200; // in ADA
  const size = argv.size ? parseInt(argv.size) : 1; // in ADA
  let cursor = 0;
  let currentPrice = 0;
  while (true) {
    const cnftData = await jpgStore.getCnfts("worldofcardanoparcels", {
      cursor,
    });
    cursor = cnftData.cursor;
    cnftData.nfts.forEach((nft) => {
      const meta = nft.onchain_metadata;
      const { Characteristic, Region, City, Size } = meta;
      const price = parseInt(nft.price_lovelace, 0);
      const isValid =
        size == Size &&
        price <= maxPrice * 1000000 &&
        (argv.char
          ? Characteristic.toLowerCase().includes(
              argv.char.toLowerCase()
            )
          : true) &&
        (argv.region
          ? Region.toLowerCase().includes(argv.region.toLowerCase())
          : true) &&
        (argv.city
          ? City.toLowerCase().includes(argv.city.toLowerCase())
          : true);
      if (isValid) {
        const link = `https://www.jpg.store/asset/${nft.asset_id}`;
        console.log({
          City,
          Characteristic,
          Region,
          Coords:
            meta["1XY"] +
            " " +
            meta["2XY"] +
            " " +
            meta["3XY"] +
            " " +
            meta["4XY"] +
            " " +
            meta["5XY"] +
            " " +
            meta["6XY"] +
            " " +
            meta["7XY"] +
            " " +
            meta["8XY"] +
            " " +
            meta["9XY"],
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
