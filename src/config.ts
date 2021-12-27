require('dotenv').config({ path: `./enviroments/${process.env.NODE_ENV}.env` })
const { GoogleSpreadsheet } = require('google-spreadsheet');

export enum Stage {
  prueba = 2
}
export enum owner {
  prueba = 13879929
}

export const token = process.env.TOKEN_API;

export const accessSpreadSheet = async () => {
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });
  return doc;
}