import { AgentConfig, db } from "@/db";
import { getOrCreateAgentSession } from "@/lib/get-agent-composio-session";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {toolSlug, agentId} = await req.json() ; 
    const user = await currentUser() ; 

    if(!user) {
        return NextResponse.json({'error': "Unauthorized user"}, {status: 400})
    }

    const agentConfig = await db.select().from(AgentConfig)
        .where(eq(AgentConfig.agentId, agentId)) ; 

    // @ts-ignore

    const session = await getOrCreateAgentSession(agentConfig[0], user?.primaryEmailAddress?.emailAddress) ; 

    const connectionRequest = await session.authorize(toolSlug) ; 

    return NextResponse.json({
        redirectUrl: connectionRequest.redirectUrl
    })
}