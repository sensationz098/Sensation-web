"use client";

import { JitsiMeeting } from "@jitsi/react-sdk";

export default function VideoCall() {
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <JitsiMeeting
        domain="meet.jit.si"
        roomName="sensationz-meeting-room"
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: false,
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
        }}
        getIFrameRef={(iframe) => {
          iframe.style.height = "600px";
        }}
      />
    </div>
  );
}
