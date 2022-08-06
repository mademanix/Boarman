import {ApiBaseController} from "./api-base-controller";
import express from "express";
import {DrinkEntityModel} from "../models/drink-entity.model";

export class DrinkController extends ApiBaseController {
  constructor(app: express.Application) {
    super(app, 'DrinkController');
  }

  public configureRoutes(): express.Application {
    this.app.route('/drink/details/:idDrink')
      .get((req: express.Request, res: express.Response) => {
        this.getDrinkDetailsByDrinkId(req, res);
      });

    this.app.route('/drinks')
      .get((req: express.Request, res: express.Response) => {
        this.getDrinks(res);
      })

    return this.app;
  }

  protected createSchema(): void {
    const drinkEntityModelBuilder: DrinkEntityModel = {
      strIngredient: "",
      idxDrink: 0,
      strAlcoholic: "",
      strCategory: "",
      strCreativeCommonsConfirmed: "",
      strDateModified: "",
      strDrink: "",
      strDrinkAlternate: "",
      strDrinkThumb: "",
      strGlass: "",
      strIBA: "",
      strImageAttribution: "",
      stlImageSource: "",
      stlInstructions: "",
      stlInstructionsDE: "",
      stlInstructionsES: "",
      stlInstructionsFR: "",
      stlInstructionsIT: "",
      stlInstructionsZHHANS: "",
      stlInstructionsZHHANT: "",
      strTags: "",
      strVideo: "",
      strIngredientMeasures: ""
    }

    const fields = this.prepareSqlTableFieldForQuery(drinkEntityModelBuilder);
    this.dbConnection.run(`CREATE TABLE IF NOT EXISTS DRINK ${fields}`);
  }

  private getDrinkDetailsByDrinkId(req: express.Request, res: express.Response) {
    const sqlQuery = `SELECT * FROM DRINK WHERE idxDrink=${req.params.idDrink}`;
    this.dbConnection.get(sqlQuery, (error, row) => {
      if (error) {
        res.status(400).json({"error": error.message});
        return;
      }

      if (!row) {
        res.status(204).send();
        return;
      }

      res.status(200).json({
        ...row
      });
    })
  }

  private getDrinks(res: express.Response) {
    const sqlQuery = `SELECT * FROM DRINK`;
    this.dbConnection.all(sqlQuery, (error, rows) => {
      if (error) {
        res.status(400).json({"error": error.message});
        return;
      }

      if (!rows.length) {
        res.status(204).send();
        return;
      }

      res.status(200).json({
        ...rows
      });
    });
  }
}
