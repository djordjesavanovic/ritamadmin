import axios from 'axios';


export default {

    getDancers: async () => {
        return axios({
            method: 'GET',
            url: 'https://dance-club.herokuapp.com/dancer/',
            headers: {
                'Content-Type': 'application/json'
            },
        })

    },

    getDancer: async (id) => {
        return axios({
            method: 'GET',
            url: `https://dance-club.herokuapp.com/dancer/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        })

    },

    addDancer: async (dancer) => {
        return axios({
            method: 'POST',
            url: 'https://dance-club.herokuapp.com/dancer/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(dancer)
        })

    },

    editDancer: async (dancer) => {
        return axios({
            method: 'PUT',
            url: `https://dance-club.herokuapp.com/dancer/edit/${dancer.id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(dancer)
        })

    },

    deleteDancer: async (id) => {
        return axios({
            method: 'DELETE',
            url: `https://dance-club.herokuapp.com/dancer/delete/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    },

}