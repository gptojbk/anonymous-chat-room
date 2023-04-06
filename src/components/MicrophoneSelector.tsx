import {
  useMediaDeviceSelect,
  useRoomContext,
} from "@livekit/components-react";
import { defaultConfig } from "@/tools/utils";
import { useMemo, useState } from "react";

export function MicrophoneSelector() {
  // TODO remove roomContext, this is only needed because of a bug in `useMediaDeviceSelect`
  const roomContext = useRoomContext();
  const { devices, activeDeviceId, setActiveMediaDevice } =
    useMediaDeviceSelect({ kind: "audioinput", room: roomContext });
    const deviceId2label = useMemo(() => {
        const map = new Map<string, string>();
        devices.forEach((d) => {
            map.set(d.deviceId, d.label);
        });
        return map;
    }, [devices]);
    const [actIdx, setActIdx] = useState<number>(0);
  return (
    <div className="px-2">
    <div className="dropdown dropdown-top dropdown-end  relative">
        <label tabIndex={0} className="btn m-1  border-none bg-yellow-600 hover:bg-yellow-800">{devices.length > 0 && devices[actIdx].label}</label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-100 text-black">
            {devices.map((m, k) => (
            <li value={m.deviceId} key={k} onClick={
                ()=>{
                    roomContext.localParticipant.setMicrophoneEnabled(false);
                    roomContext.localParticipant.setMicrophoneEnabled(true, {
                        deviceId:m.deviceId,
                        ...defaultConfig
                    });
                    // setActiveMediaDevice(m.deviceId);
                    setActIdx(k)
                }
            }>
              <a>{m.label}</a>
            </li>
          ))}
        </ul>
    </div>
      {/* <div className="flex items-center">
        <select
          onChange={(e) => {
            setActiveMediaDevice(e.currentTarget.value);
          }}
          value={activeDeviceId}
          className="select select-sm w-full sm:max-w-[200px] max-w-[100px] m-2 select-none"
        >
          <option value={-1} disabled>
            Choose your microphone
          </option>
          {devices.map((m) => (
            <option value={m.deviceId} key={m.deviceId}>
              {m.label}
            </option>
          ))}
        </select>
      </div> */}

    </div>
  );
}
