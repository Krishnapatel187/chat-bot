import { type Message as TMessage } from "ai/react"
import { Message } from "./Message"
import { MessageSquare } from "lucide-react"
import { useState } from "react";


interface MessagesProps {
    messages: TMessage[]
}

const botNames = ["BotAlpha", "BotBeta", "BotGamma", "BotDelta"];  // array of bot names

export const Messages = ({ messages }: MessagesProps) => {

    const [assignedBotNames, setAssignedBotNames] = useState<Map<string, string>>(new Map());  // Track assigned bot names
    const [botNameIndex, setBotNameIndex] = useState(0);  // Index for selecting next bot name  


    // Function to get the next available bot name
    const getBotNameForUser  = (userId:string): string => {

        const existingBotName = assignedBotNames.get(userId);
  
        if (existingBotName) {
          // If a bot name exists, return it
          return existingBotName;
        }

        // Loop through the bot names array and return the first available bot name
        while (assignedBotNames.size < botNames.length) {
            const botName = botNames[botNameIndex % botNames.length];
            if (!Array.from(assignedBotNames.values()).includes(botName)) {
                setAssignedBotNames((prevMap) => new Map(prevMap.set(userId, botName)));  // Mark the bot name as assigned
                setBotNameIndex(prev => prev + 1);  // Increment the index for the next bot name
                return botName;
            }
            setBotNameIndex(prev => prev + 1);  // Increment the index if the bot name is already assigned
        }
        return "Bot";  // Default fallback bot name if no bot names are available
    }


    return (
        <div className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto">
            {messages.length ? (
                messages.map((message, i) => {
                    const botName = message.role === 'user' ? getBotNameForUser(message.id) : "Bot"; // Assign a new bot name for each user message
                    return (
                        <Message
                            key={i}
                            content={message.content}
                            isUserMessage={message.role === "user"}
                            botName={botName} />
                    )
                })
                ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                    <MessageSquare className="size-8 text-blue-500" />
                    <h3 className="font-semibold text-xl text-white"> You're all set !</h3>
                    <p className="text-zinc-500 text-sm">Ask Your first question to get started.</p>
                </div>
            )}
        </div>
    )
}