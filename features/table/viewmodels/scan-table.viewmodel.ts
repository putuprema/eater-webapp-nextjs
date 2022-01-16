import {useService} from "../../../shared/ioc.react";
import {Services} from "../../../shared/constants";
import ITableService from "../table.service";
import {useRouter} from "next/router";
import {TableStoreQuery} from "../table.store";
import {useObservableState} from "observable-hooks";
import {useEffect} from "react";
import Table from "../table.model";

export default function useScanTableViewModel(): [Table | undefined, boolean, any] {
    const router = useRouter();
    const tableService = useService<ITableService>(Services.TableService);
    const tableStoreQuery = useService<TableStoreQuery>(Services.TableStoreQuery);

    const loading = useObservableState(tableStoreQuery.loading$, true);
    const error = useObservableState(tableStoreQuery.error$);
    const selectedTable = useObservableState(tableStoreQuery.selectedTable$);

    useEffect(() => {
        if (selectedTable) {
            router.push('/menu')
        } else if (router.query.tableId) {
            tableService.getTable(router.query.tableId as string);
        }
    }, [router, selectedTable, tableService])

    useEffect(() => {
        console.log([selectedTable, loading, error])
    }, [loading, selectedTable, error])

    return [selectedTable, loading, error];
}