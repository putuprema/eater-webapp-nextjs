import axios, {AxiosError} from "axios";
import HttpRequestException from "../exceptions/http-request-exception";

const EaterApiClient = axios.create({
    baseURL: "https://eaterapigwap01.azure-api.net"
})

EaterApiClient.interceptors.response.use(
    res => res,
    (err: AxiosError) => {
        const responseMessage = err.response?.data?.message || "Unknown error, please try again";
        throw new HttpRequestException(responseMessage, err.response?.status || 500, err);
    }
)

export default EaterApiClient;