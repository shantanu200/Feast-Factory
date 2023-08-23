// import multer from "multer";
// import express from "express";
import { Request, Response } from "express";
// import s3 from "../config/AWS";
// import {
//   handleErrorMessage,
//   handleSuccessMessage,
// } from "../utils/StatusMessage";

import expressAsyncHandler from "express-async-handler";

// export const uploadImages = async (req: Request, res: Response) => {
//   const files = req.files as Express.Multer.File[];

//   const uploadPromises = files.map((file) => {
//     const params = {
//       Bucket: "garageplusbucket",
//       Key: file.originalname,
//       Body: file.buffer,
//     };

//     const uploadResult = s3.upload(params).promise();

//     const preSignedUrl = s3.getSignedUrl("getObject", {
//       Bucket: "garageplusbucket",
//       Key: file.originalname,
//     });

//     return {
//       fileName: file.originalname,
//       preSignedUrl,
//     };
//   });

//   try {
//     const links = await Promise.all(uploadPromises);
//     console.log("[Image Upload]: All Images uploaded on AWS server");
//     handleSuccessMessage(res, 200, links);
//   } catch (error) {
//     handleErrorMessage(res, 500, error);
//   }
// };

export const uploadOnBucket = expressAsyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json("Hello World");
  }
);
