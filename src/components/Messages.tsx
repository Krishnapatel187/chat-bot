import { type Message as TMessage } from "ai/react"
import { Message } from "./Message"
import { MessageSquare } from "lucide-react"

interface MessagesProps {
    messages: TMessage[],
    sessionId: string;
    botName: string;
}

export const Messages = ({ messages, sessionId,botName  }: MessagesProps) => {
   
    return (
        <div className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto">
            {messages.length ? (
                messages.map((message, i) => {
                   
                    return (
                        <Message
                            key={i}
                            content={message.content}
                            isUserMessage={message.role === "user"}
                            botName={botName}
                             />
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