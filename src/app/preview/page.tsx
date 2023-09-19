"use client";
import FlipCard from "@/components/FlipCard";
import Header from "@/components/Header";
import { LMContainer } from "@/components/LMContainer";
import { loadState } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const Result = () => {
  return (
    <main>
      <iframe
        title="eKoin"
        src={"https://hei-ekoin-dev-frontend.azurewebsites.net/test-link"}
        allow="camera;microphone;accelerometer;gyroscope;magnetometer"
        width="100%"
        style={{
          height: "100vh",
        }}
        frameBorder="0"
        // sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"
      />
    </main>
  );
};

export default Result;
