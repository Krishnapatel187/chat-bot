
import { redis } from "./radis";

const botNames = ["Rozy", "Sophia", "Max", "Olivia", "Liam", "Mia", "Ethan", "Ava", "Lucas", "Isabella", "Noah"];

export const getBotNameForSession = async (sessionId: string): Promise<string> => {
    // Log to check if the bot name is being retrieved from Redis
    console.log(`Checking for existing bot name for sessionId: ${sessionId}`);

    let botNameIndex = await redis.get<number>(`botNameIndex:${sessionId}`);
    // If the bot name index doesn't exist, start from 0
    if (botNameIndex === undefined) {
        botNameIndex = 0;
    }

    // Get the next bot name based on the index
    const botName = botNames[botNameIndex % botNames.length];
    console.log("bot name  " + botName)
    // Increment the bot name index and store it back in Redis
    await redis.set(`botNameIndex:${sessionId}`, botNameIndex + 1);

    return botName;
};
