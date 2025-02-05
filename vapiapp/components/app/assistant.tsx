"use client";

import {useVapi} from "@/hooks/useVapi";
import {AssistantButton} from "./assistantButton";
import Vapi from "@vapi-ai/web";

interface Office {
    // _id: string;
    // name: string;
    enabled: boolean;
    assistantId: string;
    token: string;
}

interface AssistantProps {
    error: boolean;
    loading: boolean;
    office: Office;
    vapi: Vapi;
}



function Assistant({ error, loading, office, vapi }: AssistantProps) {
    // @ts-ignore
    if (error) return;
    if (loading) return;
    if (!office) return;
    if (!office?.token) return;
    if (!office?.assistantId) return;

    const token  = office?.token;
    const assistantId  = office?.assistantId;


    const {toggleCall, callStatus, audioLevel} = useVapi({
        vapi: vapi || {} as Vapi,
        assistantId: assistantId || '',
    });

    return (
        <AssistantButton
            audioLevel={audioLevel}
            callStatus={callStatus}
            toggleCall={toggleCall}
        ></AssistantButton>
    );
}

export {Assistant};
