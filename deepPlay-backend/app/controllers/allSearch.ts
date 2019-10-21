import { Request, Response, response } from "express";
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

    const filterData: String = ''

    // define condition
    let condition: any = {
      $and: []
    };
    condition.$and.push({
      isDeleted: false
    });

    index.search(search,
      {
        filters: filterData,
      },
      (err: string, hits: Object | any) => {
        if (err) throw err;
        console.log("FFFFFFFFFFFFFFFFFF", hits);

        return res.status(200).json({
          data: hits.hits,
          message: "This is algolia search data"
        });
      }
    );
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