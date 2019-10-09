import { Request, Response, response } from "express";
import Mongoose, { Document } from "mongoose";
import { algoliaAppId, algoliaAPIKey } from "../config/app";
const algoliasearch = require("algoliasearch");
const client = algoliasearch(algoliaAppId, algoliaAPIKey);
const index = client.initIndex("deep_play_data");

const allSearchModule = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser } = req;
    const { query } = req;
    const { search } = query
    const headToken: Request | any = currentUser;
    // define condition
    let condition: any = {
      $and: []
    };
    condition.$and.push({
      isDeleted: false
    });
    // if (search) {
    //   condition.$and.push({
    //     $or: [
    //       {
    //         title: {
    //           $regex: new RegExp(search.trim(), "i")
    //         }
    //       },
    //       {
    //         description: {
    //           $regex: new RegExp(search.trim(), "i")
    //         }
    //       }
    //     ]
    //   });
    // }
    // console.log("!!!!!!!!!!!!!!", condition);

    index.search({
      query: search,
      condition: {
        userId: headToken.id
      }
    }).then((data: string | any) => {
      return res.status(200).json({
        data: data.hits,
        message: "This is algolia search data"
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

export {
  allSearchModule
};