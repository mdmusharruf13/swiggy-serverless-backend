import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();
const router = Router();

router.get("/main", async (req, res) => {
    try {
        const apiResponse = await fetch(process.env.BASE_URL, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'MyApp/1.0'
            }
        });

        if (!apiResponse.ok) {
            throw new Error(`Api responded with status ${apiResponse.status}`);
        }

        const responseData = await apiResponse.json();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://mmfoods.netlify.app",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify(responseData)
        }

    } catch (error) {
        console.error("Fetch error: ", error);
        res.status(500).json({ error: "Error fetching data from API" });
    }
});

api.use("/api/", router);

export const handler = serverless(api);
