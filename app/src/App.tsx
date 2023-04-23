import { CircularProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Countdown from "react-countdown";
import { JoinClientMessage, SequenceClientMessage, ServerMessage, Team } from "../../models";
import { produce } from "immer";

interface PlayerState {
    gameOver: boolean;
    team: Team;
    prompt: string;
    instrument: string;
    sequence: boolean[];
}

const teamColors: Record<Team, { primary: string; secondary: string; text: string }> = {
    red: { primary: "bg-red-500", secondary: "bg-red-200", text: "text-red-800" },
    blue: { primary: "bg-blue-500", secondary: "bg-blue-200", text: "text-blue-800" },
    green: { primary: "bg-green-500", secondary: "bg-green-200", text: "text-green-800" },
    yellow: { primary: "bg-yellow-500", secondary: "bg-yellow-200", text: "text-yellow-800" },
};

export const App = () => {
    const serverUrl = new URLSearchParams(window.location.search).get("serverUrl");

    const webSocket = useMemo(
        () => (serverUrl != null ? new WebSocket(serverUrl) : undefined),
        [serverUrl]
    );

    const [playerState, setPlayerState] = useState<PlayerState>();
    const [endTime, setEndTime] = useState<Date>();

    useEffect(() => {
        if (!webSocket) return;

        (async () => {
            if (webSocket.readyState === WebSocket.CONNECTING) {
                await new Promise<void>((resolve, reject) => {
                    webSocket.onopen = () => resolve();
                    webSocket.onerror = () => reject(new Error("error connecting to server"));
                });
            }

            webSocket.send(JSON.stringify({ type: "join" } satisfies JoinClientMessage));

            webSocket.onmessage = (event) => {
                const data: ServerMessage = JSON.parse(event.data);

                switch (data.type) {
                    case "setup":
                        setPlayerState({
                            gameOver: false,
                            team: data.team,
                            prompt: data.prompt,
                            instrument: data.instrument,
                            sequence: new Array(16).fill(() => Math.random() > 0.5).map((f) => f()),
                        });

                        break;
                    case "beginGame":
                        setEndTime(new Date(data.endTime));

                        break;
                    case "endGame":
                        setPlayerState((playerState) => ({
                            ...playerState!,
                            gameOver: true,
                        }));

                        break;
                }
            };
        })();
    }, [webSocket]);

    useEffect(() => {
        if (!webSocket || !playerState) {
            return;
        }

        if (webSocket.readyState !== WebSocket.OPEN) return;

        webSocket.send(
            JSON.stringify({
                type: "sequence",
                sequence: playerState.sequence,
            } satisfies SequenceClientMessage)
        );
    }, [webSocket, playerState?.sequence]);

    return !serverUrl ? (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-200 text-gray-500">
            <p className="text-xl font-semibold">Error</p>
            <p>Please scan the QR code to join the game.</p>
        </div>
    ) : playerState ? (
        playerState.gameOver ? (
            <div
                className={`w-screen h-screen flex flex-col items-center justify-center p-4 ${
                    teamColors[playerState.team].secondary
                } ${teamColors[playerState.team].text}`}
            >
                <p className="text-2xl font-semibold">Game over!</p>
            </div>
        ) : endTime ? (
            <div
                className={`w-screen h-screen flex flex-col items-center justify-between p-4 ${
                    teamColors[playerState.team].secondary
                } ${teamColors[playerState.team].text}`}
            >
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-row items-center justify-between">
                        <div className="capitalize font-semibold">{playerState.team} team</div>

                        <Countdown
                            date={endTime}
                            renderer={({ minutes, seconds }) => (
                                <p>
                                    {minutes.toString().padStart(2, "0")}:
                                    {seconds.toString().padStart(2, "0")}
                                </p>
                            )}
                        />
                    </div>

                    <p>
                        Your instrument:{" "}
                        <span className="font-semibold">{playerState.instrument}</span>
                    </p>
                    <p className="italic">{playerState.prompt}</p>
                </div>

                <div className="w-full flex flex-row items-center justify-center bg-gray-800 p-1 gap-1 lg:p-2 lg:gap-2">
                    {playerState.sequence.map((value, index) => (
                        <SequenceToggle
                            key={index}
                            team={playerState.team}
                            value={value}
                            disabled={endTime ? endTime < new Date() : true}
                            onChange={() => {
                                setPlayerState(
                                    produce((playerState) => {
                                        if (!playerState) return;

                                        playerState.sequence[index] = !playerState.sequence[index];
                                    })
                                );
                            }}
                        />
                    ))}
                </div>

                <div></div>
            </div>
        ) : (
            <div
                className={`w-screen h-screen flex flex-col items-center justify-between p-4 ${
                    teamColors[playerState.team].secondary
                } ${teamColors[playerState.team].text}`}
            >
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-row items-center justify-between">
                        <div className="capitalize font-semibold">{playerState.team} team</div>
                    </div>

                    <div
                        className={`w-screen h-screen flex flex-col items-center justify-center p-4 ${
                            teamColors[playerState.team].secondary
                        } ${teamColors[playerState.team].text}`}
                    >
                        <p className="text-2xl font-semibold">Waiting to start...</p>
                    </div>
                </div>
            </div>
        )
    ) : (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <CircularProgress />
        </div>
    );
};

const SequenceToggle = (props: {
    team: Team;
    disabled: boolean;
    value: boolean;
    onChange: () => void;
}) => (
    <button
        className="w-full aspect-square disabled:opacity-50"
        disabled={false && props.disabled}
        onClick={props.onChange}
    >
        <div
            className={`w-full h-full rounded-full ${
                props.value ? teamColors[props.team].primary : "bg-gray-500"
            }`}
        />
    </button>
);
