import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();
const router = Router();

router.get("/main", async (req, res) => {
    try {
        const apiResponse = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.3724&lng=78.4378&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING", {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'MyApp/1.0'
            }
        });

        if (!apiResponse.ok) {
            throw new Error(`Api responded with status ${apiResponse.status}`);
        }

        const responseData = await apiResponse.json();
        res.json(responseData);

    } catch (error) {
        console.error("Fetch error: ", error);
        res.status(500).json({ error: "Error fetching data from API" });
    }
});

api.use("/api/", router);

export const handler = serverless(api);
