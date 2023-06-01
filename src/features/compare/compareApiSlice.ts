import apiSlice from "../../app/api/apiSlice";
import {IProduct} from "../../interfaces";

const compareApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getCompareProducts: build.query<IProduct[], string>({
            query: () => ({
                url: ``
            })
        })
    })
})