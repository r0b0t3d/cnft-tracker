const KEY_2CAPTCHA = "157120d300ec15536966f660a56d5ab0";

const Captcha = require("2captcha");

const solver = new Captcha.Solver(KEY_2CAPTCHA);

/*****
@params
- dataSiteKey
- website url where captcha is placed
*****/
export async function solveCaptcha(dataSiteKey: string, website: string) {
  return solver.recaptcha(
    "6Lepn-cdAAAAAOsR-VKpLVCeTDx-Z-E_VZmyljWN",
    "https://patrickhlauke.github.io/recaptcha/"
  );
}
