import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const orderService = {
    fetchOrderList: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.ORDER}/${data}`).then(res => res.data)
    },
    createOrder: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(API_ENDPOINT.ORDER, data).then(res => res.data)
    },

}

export default orderService
