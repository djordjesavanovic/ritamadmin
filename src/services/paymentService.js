import axios from 'axios';


export default {

    getPayments: async () => {
        return axios({
            method: 'GET',
            url: 'https://dance-club.herokuapp.com/payment/',
            headers: {
                'Content-Type': 'application/json'
            },
        })

    },

    getDancerPayments: async (id) => {
        return axios({
            method: 'GET',
            url: `https://dance-club.herokuapp.com/payment/dancer/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        })

    },

    addPayment: async (payment) => {
        console.log(payment)
        return axios({
            method: 'POST',
            url: 'https://dance-club.herokuapp.com/payment/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(payment)
        })

    },

    deletePayment: async (id) => {
        return axios({
            method: 'DELETE',
            url: `https://dance-club.herokuapp.com/payment/delete/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    },

}