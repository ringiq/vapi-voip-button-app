"use client";

import {useVapi} from "../../hooks/useVapi";
import {AssistantButton} from "./assistantButton";
import {AssistantStatus} from "./assistantStatus";
import {Display} from "./display";

function Assistant() {
    const {toggleCall, callStatus, audioLevel} = useVapi();
    // @ts-ignore
    return (
        <>
            <div className="chat-history">
                <Display/>
            </div>
            <div className="user-input">

                <p className="text-md mb-5 text-center">TSO Midlothian</p>
                <AssistantButton
                    audioLevel={audioLevel}
                    callStatus={callStatus}
                    toggleCall={toggleCall}
                ></AssistantButton>
            </div>
        </>
    );
}

export {Assistant};
