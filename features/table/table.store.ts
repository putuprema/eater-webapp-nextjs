import Table from "./table.model";
import {Query, Store, StoreConfig} from "@datorama/akita";
import {injectable} from "inversify";

export interface TableState {
    selectedTable?: Table
}

@StoreConfig({name: "table"})
@injectable()
export class TableStore extends Store<TableState> {
    constructor() {
        super({selectedTable: undefined});
        this.setLoading(true);
    }
}

@injectable()
export class TableStoreQuery extends Query<TableState> {
    loading$ = this.selectLoading()
    error$ = this.selectError()
    selectedTable$ = this.select(store => store.selectedTable)

    constructor(protected readonly store: TableStore) {
        super(store);
    }
}