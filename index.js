require("dotenv").config();
const axios = require("axios");
const mqtt = require("mqtt");

const client = mqtt.connect(process.env.MQTT_URL, { reconnectPeriod: 0 });

const username = "webbyvaris";

async function update() {
    try {
        const res = await axios.post(
            "https://instagram120.p.rapidapi.com/api/instagram/userInfo",
            { username },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-host": "instagram120.p.rapidapi.com",
                    "x-rapidapi-key": process.env.RAPIDAPI_KEY
                }
            }
        );

        const count = res.data?.result?.[0]?.user?.follower_count;

        client.publish(
            "awtrix_72aea8/custom/instagram",
            JSON.stringify({
                text: count ? count.toString() : "no data",
                icon: "8649",
                duration: 10
            }),
            { retain: true },
            () => client.end()
        );

        console.log("Updated:", count);
    } catch (err) {
        console.log("Error:", err.message);
        client.end();
    }
}

client.on("error", (err) => {
    console.log("Error:", err.message);
    client.end();
});

client.on("connect", () => {
    update();
});