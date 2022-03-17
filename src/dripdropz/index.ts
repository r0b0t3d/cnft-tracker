import { solveCaptcha } from "./2captcha";
import { checkMyDrops, reloadRecaptcha } from "./services";

const address = 'addr1qymslgq6x9r6kk8s0tam62chydkuy7ez66gt9lk9355wwxwy0t098xk2ets0c4ch2wyep4u3hlpc88wdle0lzc37neuq7y6mgh'
const recaptcha = '03AGdBq266nrIzLfpMtq9yr9Z49ViXH1bNIL0ipUl70BauhiyVRHlF4t4FHMBs4A-2cof7rv_t4059cuo6OEhhnLyMK_b-UgIf01NrFi-FPm1ps6-XY6xMHKLEbh0KA3rzMvVQq0So30C8d5AwgYZ0tUdkuG5xQtZzVhc_Y-2FhF-r56lJ0E-IFx9H18Bdb0sd4-NdKjX0b_rQQ2jHdGPEmF3w2aEQvQ-7num_QybSpgI5lpXXyfddJD6zcPqZcXyPTwDABgfCamC8495rmaw35skuO3CkeiEZ8NblxyaZ0QWDniTAzXrqEm-qPgFrTkodu0Ui5Wtw38I0WPhx537FWoPR5anvIpQiq5oHlnsgQdMU1lPQJ6hukD_UFy0E-mtZ0LoPwngZGFlFemkX-iOb7VsVz6GEkNGSuZOD7yyEAqDvksixV9lQz88zGjyMPJOJC0l9Ez9VP2pEhczDPTq9963QB9qypcLtdg'

async function run() {
  const data = await checkMyDrops(address, recaptcha);
  console.log({data});
  
}

run();