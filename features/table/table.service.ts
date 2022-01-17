import {inject, injectable} from "inversify";
import {TableStore} from "./table.store";
import Table from "./table.model";
import EaterApiClient from "../../shared/services/http-client.service";
import {Constants, EaterApi, Services} from "../../shared/constants";
import HttpRequestException from "../../shared/exceptions/http-request-exception";
import {debounce} from "@mui/material";
import cookies from "js-cookie";
import {transaction} from "@datorama/akita";

export default interface ITableService {
    getTable(tableId: string): Promise<void>

    trySetActiveTableFromCookie(): boolean
}

@injectable()
export class TableService implements ITableService {
    @inject(Services.TableStore) private tableStore: TableStore = undefined!

    async getTable(tableId: string) {
        this.tableStore.setLoading(true);
        try {
            const response = await EaterApiClient.get<Table>(EaterApi.getTable(tableId));
            debounce(() => {
                this.tableStore.update({selectedTable: response.data})
                this.tableStore.setLoading(false)
            }, 2000)()
        } catch (e) {
            if (e instanceof HttpRequestException && e.isNotFound) {
                this.tableStore.update({selectedTable: undefined})
            } else {
                this.tableStore.setError(e);
            }
            this.tableStore.setLoading(false);
        }
    }

    @transaction()
    trySetActiveTableFromCookie(): boolean {
        let success = false
        const tableCookieStr = cookies.get(Constants.CurrentTableCookieKey)
        if (tableCookieStr) {
            const table = JSON.parse(tableCookieStr)
            this.tableStore.update({selectedTable: table})
            success = true
        }

        this.tableStore.setLoading(false)
        return success
    }
}