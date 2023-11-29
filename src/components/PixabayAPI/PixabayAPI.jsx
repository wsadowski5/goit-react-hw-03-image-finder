import axios from "axios"


const url = 'https://pixabay.com/api/';
const apiKey = '39805913-a4bc2a6c03690a5e9014989d5';

export async function getItems (query, pageNumber, perPage) {

        const response = await axios.get(url, {
            params: {
                key: apiKey,
                q: query,
                page: pageNumber,
                per_page: perPage,
                image_type : 'photo',
                orientation : 'horizontal',
                safesearch : true,
            },
        });
        return response.data

    }
    

