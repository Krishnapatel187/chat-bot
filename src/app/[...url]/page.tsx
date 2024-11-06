import { ragChat } from '@/lib/rag-chat';
import { redis } from '@/lib/radis';
import React from 'react'
import ChatWrapper from '@/components/ChatWrapper';
import { cookies } from 'next/headers';

interface PageProps {
    params: {
        url: string | string[] | undefined
    }
}

function reconstructUrl({ url }: { url: string[] }) {
    const decodedComponents = url.map((component) => decodeURIComponent(component))

    return decodedComponents.join("/")
}

const page = async ({ params }: PageProps) => {

    const sessionCookie = (await cookies()).get("sessionId")?.value
    
    const { url } = await params;
    
    // Check if url is defined and handle it properly
    if (!url) {
        return <div>No URL provided</div>;
    }
    
    // Ensure url is treated as an array
    const urlArray = Array.isArray(url) ? url : [url];
    const reconstructedUrl = reconstructUrl({ url: urlArray });
    
    const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g,"")

    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

    //console.log('is Already Indexed:  ' + isAlreadyIndexed)

    const initialMessages = await ragChat.history.getMessages({amount:10, sessionId})

    if (!isAlreadyIndexed) {

        await ragChat.context.add({
            type: "html",
            source: reconstructedUrl,
            config: { chunkOverlap: 50, chunkSize: 200 },
        })

        await redis.sadd("indexed-urls", reconstructedUrl)
    }

    return (
        <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
    )
}

export default page