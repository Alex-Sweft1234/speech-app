import { useEffect, useRef, useState } from 'react';

export const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synth = useRef<SpeechSynthesis | null>(null);

  const updateVoices = () => {
    if (synth.current) setVoices(synth.current.getVoices());
  };

  const speak = (text: string, voice: SpeechSynthesisVoice | null, pitch: number, rate: number) => {
    const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    if (synth.current) synth.current.speak(utterance);
  }

  useEffect(() => {
    if (typeof window !== 'object' || !window.speechSynthesis) return;
    synth.current = window.speechSynthesis;
    synth.current.onvoiceschanged = updateVoices;
    updateVoices();

    return () => {
      if (synth.current) synth.current.onvoiceschanged = null
    }
  }, []);

  return ([
    voices,
    speak,
  ]);
}
