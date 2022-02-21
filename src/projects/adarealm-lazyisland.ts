import jpgStore from "../services/jpgStore";

const args = process.argv.slice(2);

async function run() {
  const searchText = args[0];
  const maxPrice = args[1] ? parseInt(args[1]) : 200; // in ADA
  let cursor = 0;
  let currentPrice = 0;
  while (true) {
    const cnftData = await jpgStore.getCnfts("adarealm-lazyisland", {
      cursor,
    });
    cursor = cnftData.cursor;
    cnftData.nfts.forEach((nft) => {
      const meta = nft.onchain_metadata;
      const name = nft.onchain_metadata.Attributes.join(' ');
      const price = parseInt(nft.price_lovelace, 0);
      if (
        (!name || name.toLowerCase().includes(searchText.toLowerCase())) &&
        price <= maxPrice * 1000000
      ) {
        const link = `https://www.jpg.store/asset/${nft.asset_id}`;
        console.log({
          Name: name,
          Coords: meta.Coordinates,
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
