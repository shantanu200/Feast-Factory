import { Response } from "express";
export function handleSuccessMessage(
  res: Response,
  statusNumber: number,
  data: any
) {
  switch (statusNumber) {
    case 200:
      return res
        .status(200)
        .json({ status: true, msg: "Data is fetched", data });

    case 201:
      return res
        .status(201)
        .json({ status: true, msg: "Document is created", data });

    default:
      res.status(200).json("Invalid Operation is called");
  }
}

export function handleErrorMessage(
  res: Response,
  statusNumber: number,
  errorMessage: string
) {
  switch (statusNumber) {
    case 400:
      return res
        .status(400)
        .json({ status: false, msg: "Invalid Request is fired" });

    case 401:
      return res
        .status(401)
        .json({ status: false, msg: "Invalid headers is passed in routed" });

    case 500:
      return res.status(401).json({
        status: false,
        msg: "Internal Server overloaded...",
        error: errorMessage,
      });

    default:
      res.status(400).json("Invalid Operation is called");
  }
}
