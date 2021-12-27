import { accessSpreadSheet } from "../config";
import moment from 'moment';

export const addRowIntoGoogleSheet = async (params: any) => {
  const doc = await accessSpreadSheet()
  await doc.loadInfo();

  const currentTime = moment().format('DD/MM/YYYY HH:MM:SS')

  const sheet = doc.sheetsByIndex[2];
  await sheet.addRow({
    name: params.name,
    email: params.email,
    phone: params.phone,
    'Nombre Negocio': params.storeName,
    'producto Culqi': params.product,
    utm_source: params.utm_source,
    origin: params.origin,
    'Fecha-Hora Creado': currentTime,
  });
}