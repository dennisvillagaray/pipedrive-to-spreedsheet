// @ts-check

import { Request, Response } from "express";
import * as Joi from "joi";

import { registerDealSchema } from "../schemas/register";
import * as DealServices from '../services/deals';
import * as OrganizationServices from '../services/organizations';
import * as PersonServices from '../services/person';
import { addRowIntoGoogleSheet } from "../services/spreadsheet";

export const register = async (req: Request, res: Response) => {
  const { error } = Joi.validate(req.body, registerDealSchema)

  if (error) {
    return res.status(400).json({
      success: false,
      error: error,
      message: 'Wrong Parameters'
    })
  }

  try {
    console.log('Denn ~ createDeal ~ req.body ~>', req.body)
    const {
      storeName,
      email,
      product,
      utm_source,
      name,
      phone,
      origin
    } = req.body;

    console.log(`Searching organization with name= ${storeName}`)
    let organization = await OrganizationServices.find(storeName);

    if (!organization) {
      console.log(`Oranization not found. Creating new organization with name= ${storeName}`)
      organization = await OrganizationServices.create({
        name: storeName
      })
    }
    console.log(`Searching contact with email= ${email}`)
    let person = await PersonServices.find(email)

    if (organization && !person) {
      console.log(`Contact not found. Creatin new Contact with email= ${email}`)
      person = await PersonServices.create({
        name,
        email,
        phone,
        organizationId: organization.id,
      })
    }
    if (organization && person) {
      console.log(`Creating business for the email= ${email}`)
      await DealServices.create({
        origin,
        title: storeName || name || email,
        utm_source,
        product: product.toLowerCase(),
        personId: person.id,
        organizationId: organization.id
      })
      addRowIntoGoogleSheet(req.body)

      return res.json({
        success: true,
        message: 'Register Created'
      })
    }
  } catch (error) {
    console.error('Denn ~ registerDeal ~> error,', error)
  }
  return res.status(400).json({
    success: false,
    message: 'There was an error to creating register'
  })
}