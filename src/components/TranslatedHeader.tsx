// src/components/TranslatedHeader.tsx
import { useEffect, useState } from "react";
import { lingo } from "@/lib/lingoClient";

export default function TranslatedHeader() {
  const [text, setText] = useState("...");

  useEffect(() => {
    lingo.localizeText("Welcome to EasyMode", {
      targetLocale: "pcm"  // Pidgin
    }).then(r => setText(r))
      .catch(() => setText("Welcome to EasyMode"));
  }, []);

  return <h1>{text}</h1>;
}
