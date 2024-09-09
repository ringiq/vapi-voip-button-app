"use client";

import {useVapi} from "@/hooks/useVapi";
import {AssistantButton} from "./assistantButton";
import {AssistantStatus} from "./assistantStatus";
import {Display} from "./display";
import Vapi from "@vapi-ai/web";
import {useEffect, useState} from "react";

interface VapiVoip {
    enabled: boolean;
    assistantId: string;
    token: string;
}

interface Office {
    _id: string;
    name: string;
    vapiVoip?: VapiVoip;
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
    if (!office.vapiVoip) return;
    if (!office.vapiVoip?.token) return;
    if (!office.vapiVoip?.assistantId) return;

    const token  = office.vapiVoip?.token;
    const assistantId  = office.vapiVoip?.assistantId;


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
