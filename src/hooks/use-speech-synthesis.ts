import { useEffect, useRef, useState } from 'react';

export const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synth = useRef<any>();

  const updateVoices = () => {
    setVoices(synth.current.getVoices());
  };

  const speak = (text = '', voice = voices[15], pitch = 1, rate = 1) => {
    const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    synth.current.speak(utterance);
  }

  useEffect(() => {
    if (typeof window !== 'object' || !window.speechSynthesis) return;
    synth.current = window.speechSynthesis;
    synth.current.onvoiceschanged = updateVoices;
    updateVoices();

    return () => {
      synth.current.onvoiceschanged = null
    }
  }, []);

  return ([
    voices,
    speak,
  ]);
}
