import express, { Express, Request, Response } from 'express';
import { CustomRequest } from '../interfaces/request.interface';
import { ErrorResponse, SuccessResponse } from '../common/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { connectToDatabase } from '../utils/DatabaseUtils';
import { nameOf } from '../helpers/helper';
import { MerchantEntity } from '../model/Tables/merchant.model';

export const insertMerchant = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const merchantRepo = database.getRepository(MerchantEntity);
    const returnMerchant = await merchantRepo.upsert({
        CityId: req.body.CityId,
        DistributorId: req.body.DistributorId,
        MerchantName: req.body.MerchantName,
        MerchantGSTNumber: req.body?.MerchantGSTNumber,
        MerchantEmail: req.body?.MerchantEmail,
        MerchantTelNo: req.body?.MerchantTelNo,
        MerchantAddress: req.body?.MerchantAddress,
        MerchantCity: req.body?.MerchantCity
    }, {
        conflictPaths: [nameOf<MerchantEntity>('CityId'), nameOf<MerchantEntity>('DistributorId'), nameOf<MerchantEntity>('MerchantId')]
    });
    return new SuccessResponse(StatusCodes.OK, returnMerchant, 'Added merchant successfully!!').send(res);
};
export const getAllMerchant = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const merchantRepo = database.getRepository(MerchantEntity);
    const returnMerchant = await merchantRepo.find({
        relations: { distributor_details: true }
    });
    if (returnMerchant) {
        return new SuccessResponse(StatusCodes.OK, returnMerchant, 'Get merchant successfully!!').send(res);
    };
};


export const getMerchantById = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const merchanrRepo = database.getRepository(MerchantEntity);
    const returnMerchant = await merchanrRepo.findOne({ where: { MerchantId: req.query.MerchantId as any }});
    if (returnMerchant) {
      return new SuccessResponse(StatusCodes.OK, returnMerchant, 'Get Merchant successfully!!').send(res);
  } else return new ErrorResponse(StatusCodes.NOT_FOUND, 'No Merchant found!!').send(res);
  };

export const updateMerchant = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const merchantRepo = database.getRepository(MerchantEntity);
    const returnMerchant = await merchantRepo.findOne({ where: { MerchantId: req.query.MerchantId as any } })
    const updatedData = { ...returnMerchant, ...req.body }
    const update = await merchantRepo.update(req.query.MerchantId as any, updatedData);
    if (update) {
        return new SuccessResponse(StatusCodes.OK, updatedData, 'Updated merchant successfully!!').send(res);
    };
};

export const deleteMerchant = async (req: CustomRequest, res: Response) => {
    const database = await connectToDatabase();
    const merchantRepo = database.getRepository(MerchantEntity);
    const returnMerchant = await merchantRepo.delete({ MerchantId: req.query.MerchantId as any });
    if (returnMerchant) {
        return new SuccessResponse(StatusCodes.OK, {}, 'Merchant deleted successfully!!').send(res);
    };
};