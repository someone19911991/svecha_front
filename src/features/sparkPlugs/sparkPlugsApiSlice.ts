import apiSlice from "../../app/api/apiSlice";
import {ISparkPlug} from "../../interfaces";

const sparkPlugsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSparkPlugs:builder.query<ISparkPlug[], void>({
            query: () => "/product/spark_plugs",
            providesTags: result => ['SparkPlugs']
        }),
        getSparkPlug:builder.query<ISparkPlug, number>({
            query: (sparkPlugId) => `/product/spark_plugs/${sparkPlugId}`
        })
    })
})

export const {useLazyGetSparkPlugsQuery} = sparkPlugsApiSlice

export default sparkPlugsApiSlice