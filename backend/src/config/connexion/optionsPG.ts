import pgPromise from "pg-promise";
import { camelizeColumns, IClient } from "./connexionFunction";

export const optionsPG: pgPromise.IInitOptions<IClient> = {
  receive(e) {
    camelizeColumns(e.data);
  },
};