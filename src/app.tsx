import React, { useEffect } from 'react';
import './app.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const App = () => {
  const options = {
    commands: [
      {
        command: 'Обновить страницу',
        callback: () => window.location.reload(),
      },
    ],
  }

  const { transcript, finalTranscript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition(options);

  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true, language: 'ru-RU' }).then(() => {})
    } else {
      alert('Упс, ваш браузер не поддерживает распознавание речи!');
    }
  }, [])

  useEffect(() => {
    if (finalTranscript) resetTranscript()
  }, [finalTranscript]);

  return (
    <div className="app">
      <div>
        {transcript ? 'Фраза, которую вы сейчас назвали' : 'Назовите свое слово или фразу'}
        <br />
        <br />
        {transcript ? (
            <div style={{ textAlign: 'center', fontSize: '170%', fontWeight: 700 }}>{transcript}</div>
          ) : (
            <div style={{ textAlign: 'center' }}>...</div>
          )}
      </div>
    </div>
  );
}
