# Follower count → Awtrix

Small Node script that fetches an Instagram follower count via RapidAPI and publishes it to MQTT for an AWTRIX-compatible clock (for example Ulanzi TC001).

## Setup

1. Install Node.js, then run `npm install` in this folder.
2. Create a `.env` file with:
   - `RAPIDAPI_KEY` — your key for [instagram120 on RapidAPI](https://rapidapi.com/).
   - `MQTT_URL` — URL of the broker the clock uses (often `mqtt://YOUR_COMPUTER_LAN_IP:1883` if the broker runs on your PC).
3. Edit `index.js` and set `username` to the Instagram handle you want.
4. Adjust the MQTT topic if needed (`awtrix_72aea8` is the device prefix; `custom/instagram` is the custom app topic).

Run once with `node index.js`.

## Tips (hardware and network)

### First-time flashing

Use a **USB 2.0** port, not USB 3.0. Some boards fail or behave oddly on USB 3.x during the first flash. Instructions often say to hold the **REBOOT** button while flashing; if that is awkward or unreliable, try a different USB cable or another USB 2.0 port first.

### Network

Put the Ulanzi / AWTRIX device on the **same network** as the computer running this script (for example both on `192.168.68.x` when your LAN uses that range). If they are on different subnets or VLANs, MQTT from your PC may not reach the clock. A **yellow pixel** in the **bottom-left** corner of the display often means a connectivity problem—double-check Wi‑Fi and that the clock is on the same LAN as your broker/PC.

### AWTRIX dashboard

Set the MQTT broker hostname/IP to your **computer’s LAN IP** (the machine where the MQTT broker runs). Match that in `.env` with `MQTT_URL`.

### Windows Task Scheduler

Run the script:

- When you **log on** (refresh after boot).
- **Daily at 12:00** (midday update).

Use full paths—for example `C:/Program Files/nodejs/node.exe` and `C:/Projects/follower-count/index.js` (use your real project path for `index.js`)—and set “Start in” to this project folder so `.env` is found.
