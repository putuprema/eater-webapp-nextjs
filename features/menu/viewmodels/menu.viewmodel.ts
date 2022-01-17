import {useService} from "../../../shared/ioc.react";
import {TableStoreQuery} from "../../table/table.store";
import {useObservableState} from "observable-hooks";
import {MenuStore, MenuStoreQuery} from "../menu.store";
import {MenuService} from "../menu.service";
import {Services} from "../../../shared/constants";
import Table from "../../table/table.model";
import {FeaturedProducts, ProductCategory} from "../menu.model";
import {useCallback, useEffect} from "react";
import {debounce} from "@mui/material";
import ITableService from "../../table/table.service";

export default function useMenuViewModel(): [Table | undefined, FeaturedProducts[] | undefined, ProductCategory[] | undefined, boolean, any] {
    const tableService = useService<ITableService>(Services.TableService)
    const tableStoreQuery = useService<TableStoreQuery>(Services.TableStoreQuery)
    const menuStore = useService<MenuStore>(Services.MenuStore)
    const menuStoreQuery = useService<MenuStoreQuery>(Services.MenuStoreQuery)
    const menuService = useService<MenuService>(Services.MenuService)

    const selectedTable = useObservableState(tableStoreQuery.selectedTable$)
    const featuredMenuList = useObservableState(menuStoreQuery.featuredMenuList$)
    const categories = useObservableState(menuStoreQuery.categories$)
    const loading = useObservableState(menuStoreQuery.loading$, true)
    const error = useObservableState(menuStoreQuery.error$)

    const fetchRequiredData = useCallback(async () => {
        menuStore.setLoading(true)
        try {
            const [categoriesPromise, featuredMenuListPromise] = await Promise.allSettled([menuService.getMenuCategories(), menuService.getFeaturedMenu()])
            if (categoriesPromise.status === "fulfilled") {
                menuStore.setCategories(categoriesPromise.value)
            }
            if (featuredMenuListPromise.status === "fulfilled") {
                menuStore.setFeaturedMenuList(featuredMenuListPromise.value)
            }
        } catch (e) {
            menuStore.setError(e)
        }
        debounce(() => menuStore.setLoading(false), 1000)()
    }, [menuService, menuStore])

    useEffect(() => {
        fetchRequiredData()
    }, [fetchRequiredData])

    useEffect(() => {
        tableService.trySetActiveTableFromCookie()
    }, [tableService])

    return [selectedTable, featuredMenuList, categories, loading, error]
}