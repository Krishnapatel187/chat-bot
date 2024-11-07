"use client"


import { Message, useChat } from 'ai/react'
import React from 'react'
import { Messages } from './Messages'
import { ChatInput } from './ChatInput'
import { useEffect, useState } from "react";

const ChatWrapper = ({ sessionId,initialMessages, botName }: { sessionId: string, initialMessages: Message[], botName: string }) => {

    const { messages, handleInputChange, input, handleSubmit, setInput } = useChat({
        api: "/api/chat-stream",
        body: { sessionId ,botName },
        initialMessages,
    })
  
    return (
        <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
            <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
                <Messages messages={messages} sessionId={sessionId} botName={botName!} />

            </div>

            <ChatInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                setInput={setInput}
            />
        </div>
    )
}

export default ChatWrapper