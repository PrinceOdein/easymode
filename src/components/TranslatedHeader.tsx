import { useTambo } from "@tambo-ai/react";

export default function TranslatedHeader() {
  const tambo = useTambo();

  return (
    <h1 className="text-3xl font-bold text-center mb-6">
      {(tambo as any).t("Welcome to EasyMode")} 🎉

    </h1>
  );
}
