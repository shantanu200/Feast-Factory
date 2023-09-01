import multer from "multer";
import express from "express";
import { Request, Response } from "express";
import s3 from "../config/AWS";
import {
  handleErrorMessage,
  handleSuccessMessage,
} from "../utils/StatusMessage";
import cloudinary from "cloudinary";
import expressAsyncHandler from "express-async-handler";
import { PayloadRequest } from "../interfaces/User.Interface";
import { handleRouteMessage } from "../utils/Message";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDACCESSKEYID,
  api_secret: process.env.CLOUDNAME,
});

export const uploadOnBucket = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files) {
      handleErrorMessage(res, 500, "Please Upload Images");
    }

    console.log(files);

    let multiplePicPromise = files?.map((picture) =>
      cloudinary.v2.uploader.upload(picture.path)
    );

    let imageResponses = await Promise.all(multiplePicPromise);

    if (imageResponses) {
      handleRouteMessage(200, req.url);
      handleSuccessMessage(res, 200, imageResponses);
    }
  } catch (error) {
    console.error(error);
    handleErrorMessage(res, 500, error);
  }
};
