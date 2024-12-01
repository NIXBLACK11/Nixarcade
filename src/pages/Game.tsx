import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkGameValid } from "../utils/userMethods";

export const Game = () => {
    const navigate = useNavigate();
    const { game, publicKey } = useParams();
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if(!game || !publicKey) {
            navigate("../");
            return;
        } else {
            const isValid = checkGameValid(publicKey);
            if(!isValid) {
                navigate("../");
                return;
            }
        }
    }, []);

    useEffect(() => {
        if (iframeRef.current && publicKey) {
            iframeRef.current.onload = () => {
                iframeRef.current?.contentWindow?.postMessage(
                    { publicKey },
                    `https://${game}.nixarcade.fun`
                );
            };
        }
    }, [publicKey, game]);

    return (
        <div className="w-screen h-screen bg-black">
            <iframe
                ref={iframeRef}
                src={`https://${game}.nixarcade.fun`}
                className="w-full h-full"
                title={game}
                sandbox="allow-scripts allow-same-origin"
            ></iframe>
        </div>
    );
};
