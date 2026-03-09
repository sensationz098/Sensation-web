"use client";
import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

export default function VideoCallPage() {
  return (
    <div style={{ height: "100vh", display: "grid" }}>
      <JitsiMeeting
        domain="meet.jit.si"
        roomName="YourCustomRoomName123" // Change this to something unique
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: "User Name",
          email: "user@email.com",
        }}
        onApiReady={(externalApi) => {
          // You can use the API to execute commands or listen to events
          // Example: externalApi.executeCommand('toggleVideo');
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100%";
        }}
      />
    </div>
  );
}
