import {FeaturedProducts, ProductCategory} from "./menu.model";
import {injectable} from "inversify";
import EaterApiClient from "../../shared/services/http-client.service";
import {EaterApi} from "../../shared/constants";

export default interface IMenuService {
    getFeaturedMenu(): Promise<FeaturedProducts[]>

    getMenuCategories(): Promise<ProductCategory[]>
}

@injectable()
export class MenuService implements IMenuService {
    async getFeaturedMenu() {
        const response = await EaterApiClient.get<FeaturedProducts[]>(EaterApi.featuredProducts);
        return response.data
    }

    async getMenuCategories() {
        const response = await EaterApiClient.get<ProductCategory[]>(EaterApi.productCategory)
        return response.data
    }
}