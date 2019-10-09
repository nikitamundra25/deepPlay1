import { UserModel } from "../models";
import { Response, Request } from "express";
// import Mongoose, { Document } from "mongoose";
/**
 *
 */
const getDateOfUser = async (
   req: Request,
   res: Response
): Promise<any> => {
   try {
      const { query } = req;
      const { startDate, endDate } = query;
      const start: Date = new Date(startDate);
      start.setUTCHours(0);
      start.setUTCMinutes(0);
      start.setUTCSeconds(0);
      start.setUTCMilliseconds(0);
      const end: Date = new Date(endDate);
      end.setUTCHours(23);
      end.setUTCMinutes(59);
      end.setUTCSeconds(59);
      end.setUTCMilliseconds(999);
      const actualStartDate: Date = new Date(start);
      const acutalEndDate: Date = new Date(end);
      let condition: Object = {
         createdAt: {
            $gte: actualStartDate,
            $lte: acutalEndDate
         },
         isDeleted: false,
         roleType: {
            $ne: "admin"
         }
      };
      const userDoc: Document | any = await UserModel.aggregate([
         {
            $match: { ...condition }
         },
         {
            $group: {
               _id: {
                  day: { $dayOfMonth: "$createdAt" },
                  month: { $month: "$createdAt" },
                  year: { $year: "$createdAt" }
               },
               totalCount: { $sum: 1 }
            }
         },
         {
            $sort: {
               createdAt: 1
            }
         }
      ]);
      let daysOfWeekTotal = [];
      for (let index = 0; index < userDoc.length; index++) {
         const element = userDoc[index];
         const date = new Date(
            `${element._id.month}/${element._id.day}/${element._id.year}`
         );
         daysOfWeekTotal.push({
            day: date,
            count: element.totalCount
         });
      }
      // sends the response
      return res.status(200).send({
         data: daysOfWeekTotal
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         message: error.message
      });
   }
};
/**
 *
 */
const getRoleUserCount = async (
   req: Request,
   res: Response
): Promise<any> => {
   try {
      const { query } = req;
      const { startDate, endDate } = query;
      const start: Date = new Date(startDate);
      start.setUTCHours(0);
      start.setUTCMinutes(0);
      start.setUTCSeconds(0);
      start.setUTCMilliseconds(0);
      const end: Date = new Date(endDate);
      end.setUTCHours(23);
      end.setUTCMinutes(59);
      end.setUTCSeconds(59);
      end.setUTCMilliseconds(999);
      const actualStartDate: Date = new Date(start);
      const acutalEndDate: Date = new Date(end);
      let condition: Object = {
         createdAt: {
            $gte: actualStartDate,
            $lte: acutalEndDate
         },
         isDeleted: false,
         roleType:{
            $ne:"admin"
         }
      };
      const userDoc: Document | any = await UserModel.aggregate([
         {
            $match: { ...condition }
         },
         {
            $group: {
               _id: "$roleType",
               roleType: { $first: "$roleType" },
               totalCount: { $sum: 1 }
            }
         },
         {
            $sort: {
               createdAt: 1
            }
         }
      ]);
      // sends the response
      return res.status(200).send({
         data: userDoc
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         message: error.message
      });
   }
};
export {
   getDateOfUser,
   getRoleUserCount
};