import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import { ApiMethod } from './constants'

Vue.use(VueAxios, axios)

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.headers = { 'Content-Type': 'application/json' }

export const transferData = (parameters) => {
    return new Promise((resolve, reject) => {
        const { url, method = ApiMethod.GET } = parameters

        const config = {
            method,
            url
        }

        if (parameters.payload && method === ApiMethod.GET) {
            config.params = parameters.payload
        }

        if (parameters.payload && (method === ApiMethod.POST || method === ApiMethod.PATCH)) {
            config.data = parameters.payload
        }

        axios.interceptors.request.use(
            config => {
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )

        axios(config)
            .then((response) => {
                resolve(response.data)
            })
            .catch(e => {
                reject(e.response.data)
            }
        )
    })
}
