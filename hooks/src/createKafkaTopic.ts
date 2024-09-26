import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-zap-app",
  brokers: ["localhost:9092"],
});

const admin = kafka.admin();

const createTopic = async (topic: string) => {
  try {
    await admin.connect();

    // Creating the topic
    const response = await admin.createTopics({
      validateOnly: false,
      timeout: 6000,
      topics: [
        {
          topic: topic,
          numPartitions: 2,
          replicationFactor: 1, // Ensure this is <= the number of brokers
        },
      ],
    });

    console.log(response); // Log the response for debugging

    // Check the response to see if the topic was created
    console.log("Topic created successfully");
  } catch (error) {
    console.error("Error while creating the topic:", error);
  } finally {
    await admin.disconnect();
  }
};

createTopic("ZapServices");
