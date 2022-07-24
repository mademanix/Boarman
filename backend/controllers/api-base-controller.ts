import express from "express";
import sqlite3 from "sqlite3"
import {EntityTypeModel} from "../models/entity-type.model";

export abstract class ApiBaseController {
  protected app: express.Application;
  protected dbConnection: sqlite3.Database;
  private readonly name: string;

  protected constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.dbConnection = new sqlite3.Database('./database/boarman.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
      if (error) {
        console.error(error.message)
      } else {
        console.log('Connected to DB');
      }
    });
    this.configureRoutes();
    this.createSchema();
  }

  public getName(): string {
    return this.name;
  }

  // oof
  protected prepareSqlTableFieldForQuery(model: object): string {
    let query = '('
    Object.keys(model).forEach(field => {
      let fieldType = '';
      const fieldTypeValue: EntityTypeModel = field.slice(0, 3) as EntityTypeModel;
      const fieldName = field;
      switch (fieldTypeValue) {
        case EntityTypeModel.NUMBER:
          fieldType = ' NUMBER,';
          break;
        case EntityTypeModel.TEXT:
          fieldType = ' TEXT,';
          break;
        case EntityTypeModel.VARCHAR_100:
          fieldType = ' VARCHAR(100),';
          break;
        default:
          fieldType = ' VARCHAR(100),';
          break;
      }
      query += fieldName + fieldType + ' ';
    });

    return query.slice(0, -2) + ')';
  }

  protected abstract configureRoutes(): express.Application;

  protected abstract createSchema(): void;
}
