import axios from "axios";

const WEBSERVICE_BASE_URL = process.env.WEBSERVICE_BASE_URL as string;

export default class webservice{
    public static async post(url: string, data: any): Promise<any>{
        const response = await axios.post(WEBSERVICE_BASE_URL, 
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    }
    public static async get(url: string): Promise<any>{
        const response = await fetch(WEBSERVICE_BASE_URL + url);
        return response.json();
    }
}