import {Query, Store, StoreConfig} from "@datorama/akita";
import {injectable} from "inversify";
import {FeaturedProducts, Product, ProductCategory} from "./menu.model";

export interface MenuState {
    categories?: ProductCategory[]
    featuredMenuList?: FeaturedProducts[]
    selectedMenu?: Product
}

@StoreConfig({name: "menu"})
@injectable()
export class MenuStore extends Store<MenuState> {
    constructor() {
        super({});
        this.setLoading(true);
    }

    setCategories(categories: ProductCategory[]) {
        this.update({categories})
    }

    setFeaturedMenuList(featuredMenuList: FeaturedProducts[]) {
        this.update({featuredMenuList})
    }

    selectMenu(menu?: Product) {
        this.update({selectedMenu: menu})
    }

    selectMenuById(menuId: string) {
        const featuredMenuList = this.getValue().featuredMenuList;
        if (featuredMenuList) {
            let foundMenu: Product | undefined;
            for (const featured of featuredMenuList) {
                const filteredMenus = featured.products.filter(prod => prod.id === menuId);
                if (filteredMenus.length > 0) {
                    foundMenu = filteredMenus[0]
                    break
                }
            }
            if (foundMenu) {
                this.update({selectedMenu: foundMenu})
            }
        }
    }
}

@injectable()
export class MenuStoreQuery extends Query<MenuState> {
    loading$ = this.selectLoading()
    error$ = this.selectError()
    featuredMenuList$ = this.select(store => store.featuredMenuList)
    selectedMenu$ = this.select(store => store.selectedMenu)
    categories$ = this.select(store => store.categories)

    constructor(protected readonly store: MenuStore) {
        super(store);
    }
}