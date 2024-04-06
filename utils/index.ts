import OpenAI from "openai";
import axios from 'axios'
import { useLocalStorage } from "@vueuse/core";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const delay = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));


export class AIClient {
    private _openai: OpenAI;

    constructor(apiKey: string) {
        this._openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
        });;
    }
    async generateContent(prompt: string) {

        return await this._openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        });
        // try {

        // } catch (error: Error) {
        //     toast.error(error.message)
        // }

    }

    async generateUsingObject(messages: ChatCompletionMessageParam[]) {
        const respsone = await this._openai.chat.completions.create({
            messages,
            model: "gpt-3.5-turbo",
        });

        return JSON.parse(respsone.choices[0].message.content as string);
    }
}

export const http = axios.create({
    baseURL: 'http://codesgate.test/api',
    withCredentials: false,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 3000
})

// toast('est')
// Define a function to display toast messages
const displayToast = (message: string, type = 'error') => {
    // Check if toast is already displayed with same message
    toast[type](message);
};

// Modify response interceptor
http.interceptors.response.use(
    function (response) {
        // You can customize this logic based on response status or other criteria
        console.log("Ressponse", response);

        if (response.data.message) {
            displayToast(response.data.message, 'success');
        }
        console.log('error Occurred');
        return response;
    },
    function (error) {
        console.error('Error config:', error.message);
        return Promise.reject(error);
    }
);

// Modify request interceptor
http.interceptors.request.use(
    function (config) {
        // Modify request config if needed
        config.data = {
            ...config.data,
            platform_id: 1
        };

        return config;
    },
    function (error) {
        // Display error message
        displayToast(error.message);

        return Promise.reject(error);
    }
);

export const extractNameFromSlug = (slug: string) => {
    const slugStr = slug?.replace(/-/g, ' ');
    return slugStr ? slugStr[0].toUpperCase() + slugStr.slice(1) : '';
}

export const persistIndex = (state: string, index: number) => useLocalStorage(state, index);
