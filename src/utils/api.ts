import axios from 'axios';
import { Holiday } from '../types/types';

const API_KEY = '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx';
const BASE_URL = 'https://api-ninjas.com/api/holidays';

export const fetchHolidays = async (year: number): Promise<Holiday[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                country: 'PL',
                year: year,
            },
            headers: {
                'X-Api-Key': API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching holidays:', error);
        return [];
    }
};