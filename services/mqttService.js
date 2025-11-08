import mqtt from "mqtt";
import Message from "../models/Message.js";

export const initMQTT = (io) => {
  const client = mqtt.connect(process.env.MQTT_BROKER);

  client.on("connect", () => {
    console.log("✅ MQTT connected");
    client.subscribe(process.env.MQTT_TOPIC, () =>
      console.log(`📡 Subscribed to ${process.env.MQTT_TOPIC}`)
    );
  });

  client.on("message", async (topic, message) => {
    const payload = message.toString();
    console.log(`📩 [MQTT] ${topic}: ${payload}`);

    // save to MongoDB
    await Message.create({ topic, payload });

    // send to frontend via websocket
    io.emit("mqtt_message", {
      topic,
      payload,
      createdAt: new Date().toISOString(),
    });
  });
};
