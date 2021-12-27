import { accessSpreadSheet } from "../config";

export const addRowIntoGoogleSheet = async (params: any) => {
  const doc = await accessSpreadSheet()
  await doc.loadInfo();

  const date = new Date()
  const curretDay = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  const sheet = doc.sheetsByIndex[2];
  await sheet.addRow({
    name: params.name,
    email: params.email,
    phone: params.phone,
    'Nombre Negocio': params.storeName,
    'producto Culqi': params.product,
    utm_source: params.utm_source,
    origin: params.origin,
    'Fecha-Hora Creado': curretDay,
  });
}