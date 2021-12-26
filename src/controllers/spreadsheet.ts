require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util')

const creds = require('../../conductive-bank-336300-b1757ee7ea9b.json')

async function accessSpreadSheet() {
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo()
  console.log('Denn ~> ~ accessSpreadSheet ~ doc: ', doc.title)
  const sheet = doc.sheetsByIndex[2];
  console.log('Denn ~> ~ accessSpreadSheet ~ sheet.title: ', sheet.title)
  console.log('Denn ~> ~ accessSpreadSheet ~ sheet.rowCount: ', sheet.rowCount)

  const rows = await sheet.getRows();
  console.log('Denn ~> ~ accessSpreadSheet ~ rows: ', rows[0])
  
}
accessSpreadSheet()