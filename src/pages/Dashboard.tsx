import { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { LanguagesIcon, RefreshCwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { motion } from 'framer-motion';

const LANGUAGES = [
  { code: 'auto', name: 'Detect language' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arab' },
  { code: 'ru', name: 'Russian' },
  { code: 'it', name: 'Italian' },
  { code: 'ko', name: 'Korean' },
];

export default function Dashboard() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('es');
  const [text, setText] = useState('');
  const [result, setOutput] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  // const [input, setInput] = useState("");

const handleTranslate = async () => {
  

  if (!user) {
    console.error("User not authenticated.");
    return;
  }

  const token = (await supabase.auth.getSession()).data.session?.access_token;

  const response = await fetch("https://yhuuwwxjexgcezodvyid.functions.supabase.co/lingo-translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
      sourceLocale: sourceLang,
      targetLocale: targetLang,
    }),
  });

  const result = await response.json();
  console.log("Translated:", result);
  setOutput(result?.data?.text || "Translation failed.");
};

  return (
    <div className={`min-h-screen px-4 py-10 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex items-center space-x-4">
            <LanguagesIcon className="h-10 w-10" />
            <h1 className="text-3xl font-bold">Lingo Translator</h1>
          </div>
        </motion.div>

        <div className="flex items-center justify-between">
          <p className="text-sm">Signed in as {user?.email} | Tambo mode simple</p>
          <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block mb-1">From</Label>
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger>
                <SelectValue placeholder="Select source language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block mb-1">To</Label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger>
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.filter(l => l.code !== 'auto').map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="block mb-1">Enter text</Label>
          <Textarea className="min-h-[100px]" value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div className="flex flex-wrap gap-4">
          <Button onClick={handleTranslate} className="gap-2">
            <LanguagesIcon className="h-4 w-4" /> Translate
          </Button>
          <Button variant="secondary" className="gap-2">
            <RefreshCwIcon className="h-4 w-4 animate-spin" /> Test Tambo
          </Button>
        </div>

        {result && (
          <Card>
            <CardContent className="p-4">
              <p className="text-lg font-semibold">Translated:</p>
              <p className="mt-2 text-black-200">{result}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
