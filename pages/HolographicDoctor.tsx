import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Badge, Button } from '../components/Common';
import { 
  Bot, Mic, MicOff, Volume2, VolumeX, Zap, Brain, Heart, 
  Eye, Stethoscope, Activity, User, MessageCircle, Sparkles
} from 'lucide-react';
import { getChatResponse } from '../services/geminiService';

interface DoctorResponse {
  id: string;
  question: string;
  response: string;
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  timestamp: string;
}

const sampleResponses: DoctorResponse[] = [
  {
    id: '1',
    question: 'I have chest pain and shortness of breath',
    response: 'Based on your symptoms and vital signs, I detect potential cardiac stress. Your heart rate is elevated at 95 BPM, and your description suggests possible angina.',
    diagnosis: 'Possible Cardiac Stress',
    confidence: 87,
    recommendations: ['Immediate ECG test', 'Stress test recommended', 'Avoid strenuous activity'],
    timestamp: '2 minutes ago'
  },
  {
    id: '2', 
    question: 'I feel dizzy and have headaches',
    response: 'Your blood pressure reading of 145/92 combined with dizziness indicates hypertension. The headaches are likely related to elevated blood pressure.',
    diagnosis: 'Hypertension Stage 1',
    confidence: 92,
    recommendations: ['Blood pressure monitoring', 'Reduce sodium intake', 'Regular exercise'],
    timestamp: '5 minutes ago'
  }
];

export const HolographicDoctor: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<DoctorResponse | null>(null);
  const [consultationHistory, setConsultationHistory] = useState<DoctorResponse[]>(sampleResponses);
  const [doctorMood, setDoctorMood] = useState<'analyzing' | 'speaking' | 'listening' | 'idle'>('idle');
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceInput(finalTranscript);
        }
      };
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
        setDoctorMood('listening');
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
        if (isActive) {
          setDoctorMood('idle');
        }
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  // Audio Level Detection
  useEffect(() => {
    if (!isActive || !isListening) return;
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        microphone.connect(analyser);
        analyser.fftSize = 256;
        
        const updateAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average);
          if (isListening) requestAnimationFrame(updateAudioLevel);
        };
        updateAudioLevel();
      })
      .catch(err => console.log('Microphone access denied:', err));
  }, [isActive, isListening]);

  const processVoiceInput = async (input: string) => {
    setDoctorMood('analyzing');
    
    try {
      // Get real AI response from Gemini
      const aiResponse = await getChatResponse(
        `You are JARVIS, an advanced medical AI assistant. A patient says: "${input}". 
        
        Analyze their symptoms and provide:
        1. Brief assessment of their condition
        2. Possible causes
        3. Immediate recommendations
        
        Respond in JARVIS's professional but caring tone. Keep under 80 words. Start with "Based on your symptoms..."`,
        {
          vitals: { heartRate: 75, bloodPressure: '125/82', glucose: 98, spo2: 97 },
          age: 32,
          conditions: ['Routine Health Monitoring'],
          medications: ['Daily Multivitamin'],
          recentSymptoms: [input]
        }
      );
      
      // Extract diagnosis and confidence (simulate for demo)
      const diagnosis = input.toLowerCase().includes('chest') ? 'Possible Cardiac Stress' :
                       input.toLowerCase().includes('dizzy') ? 'Possible Hypertension' :
                       input.toLowerCase().includes('tired') ? 'Possible Fatigue Syndrome' :
                       'General Health Assessment';
      
      const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%
      
      const response: DoctorResponse = {
        id: Date.now().toString(),
        question: input,
        response: aiResponse,
        diagnosis,
        confidence,
        recommendations: ['Consult your doctor', 'Monitor symptoms', 'Follow up in 1 week'],
        timestamp: new Date().toLocaleTimeString()
      };
      
      setCurrentResponse(response);
      setConsultationHistory(prev => [response, ...prev]);
      setDoctorMood('speaking');
      setIsSpeaking(true);
      
      // Text-to-Speech with AI response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.onend = () => {
          setIsSpeaking(false);
          setDoctorMood('listening');
          if (recognition && isActive) {
            recognition.start();
          }
        };
        speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => {
          setIsSpeaking(false);
          setDoctorMood('listening');
          if (recognition && isActive) {
            recognition.start();
          }
        }, 3000);
      }
    } catch (error) {
      console.error('AI Response Error:', error);
      // Fallback to sample response
      const fallbackResponse = sampleResponses[0];
      setCurrentResponse(fallbackResponse);
      setDoctorMood('speaking');
      setIsSpeaking(true);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('I apologize, but I\'m having trouble processing your request. Please try again.');
        utterance.onend = () => {
          setIsSpeaking(false);
          setDoctorMood('listening');
          if (recognition && isActive) {
            recognition.start();
          }
        };
        speechSynthesis.speak(utterance);
      }
    }
  };

  const startVoiceRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  // Activate JARVIS with real voice recognition
  const activateDoctor = () => {
    setIsActive(true);
    setDoctorMood('analyzing');
    
    setTimeout(() => {
      setDoctorMood('speaking');
      setIsSpeaking(true);
      
      // Welcome message with TTS
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('JARVIS medical assistant online. How may I help you today?');
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.onend = () => {
          setIsSpeaking(false);
          setDoctorMood('listening');
          startVoiceRecognition();
        };
        speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => {
          setIsSpeaking(false);
          setDoctorMood('listening');
          startVoiceRecognition();
        }, 3000);
      }
    }, 1000);
  };

  const deactivateDoctor = () => {
    setIsActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    setDoctorMood('idle');
    setAudioLevel(0);
    if (recognition) {
      recognition.stop();
    }
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  // Quick consultation (still works for demo)
  const startConsultation = (question: string) => {
    if (recognition) {
      recognition.stop();
    }
    processVoiceInput(question);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <Bot className="w-8 h-8 text-blue-500 animate-pulse" />
            AI Holographic Doctor
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Advanced 3D AI Medical Consultation</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant={isActive ? 'danger' : 'primary'}
            onClick={() => isActive ? deactivateDoctor() : activateDoctor()}
            icon={isActive ? VolumeX : Sparkles}
          >
            {isActive ? 'Deactivate JARVIS' : 'Activate JARVIS AI'}
          </Button>
          {isActive && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              Voice Recognition Active
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Holographic Doctor Display */}
        <Card className={`relative overflow-hidden transition-all duration-1000 ${
          isActive 
            ? 'bg-black border-4 border-blue-500 shadow-2xl shadow-blue-500/50 scale-105' 
            : 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-blue-200 dark:border-blue-800'
        }`}>
          <CardHeader 
            title="🥼 Dr. HashCare AI" 
            subtitle="Holographic Medical Assistant"
            action={
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium">
                  {isActive ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
            }
          />
          <CardContent className={`relative transition-all duration-1000 ${
            isActive ? 'h-[500px] bg-black' : 'h-96'
          }`}>
            {/* JARVIS Environment Background */}
            <div className={`absolute inset-0 transition-all duration-1000 ${
              isActive 
                ? 'bg-gradient-radial from-blue-900/30 via-black to-black' 
                : 'bg-gradient-to-t from-blue-500/10 via-transparent to-purple-500/10'
            } animate-pulse`}></div>
            
            {/* Matrix-style Background */}
            {isActive && (
              <div className="absolute inset-0 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute text-blue-400 text-xs font-mono animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  >
                    {Math.random().toString(36).substring(7)}
                  </div>
                ))}
              </div>
            )}
            
            {/* 3D Doctor Avatar */}
            <div className={`relative w-full h-full flex items-center justify-center transition-all duration-1000 ${
              isActive ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
            }`}>
              {/* Holographic Grid Lines */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`absolute w-full h-px bg-blue-400 animate-pulse`} 
                       style={{top: `${(i + 1) * 12.5}%`, animationDelay: `${i * 0.2}s`}}></div>
                ))}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`absolute h-full w-px bg-blue-400 animate-pulse`} 
                       style={{left: `${(i + 1) * 16.66}%`, animationDelay: `${i * 0.3}s`}}></div>
                ))}
              </div>

              {/* JARVIS-Style AI Core */}
              <div className={`relative transform transition-all duration-1000 ${
                doctorMood === 'analyzing' ? 'scale-125' :
                doctorMood === 'speaking' ? 'scale-110' :
                doctorMood === 'listening' ? 'scale-105' : 'scale-100'
              }`}>
                {/* Central AI Core */}
                <div className="relative w-32 h-32 mx-auto">
                  {/* Outer Ring */}
                  <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                    isActive ? 'border-blue-400 animate-spin' : 'border-gray-400'
                  }`} style={{animationDuration: '8s'}}></div>
                  
                  {/* Middle Ring */}
                  <div className={`absolute inset-2 rounded-full border transition-all duration-500 ${
                    isActive ? 'border-purple-400 animate-spin' : 'border-gray-300'
                  }`} style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
                  
                  {/* Inner Ring */}
                  <div className={`absolute inset-4 rounded-full border transition-all duration-500 ${
                    isActive ? 'border-cyan-400 animate-spin' : 'border-gray-200'
                  }`} style={{animationDuration: '4s'}}></div>
                  
                  {/* Core Center */}
                  <div className={`absolute inset-8 rounded-full transition-all duration-500 ${
                    isActive ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse' : 'bg-gray-300'
                  }`}></div>
                  
                  {/* Sound Visualization Bars */}
                  {(isSpeaking || isListening) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[...Array(12)].map((_, i) => {
                        const angle = (i * 30) * (Math.PI / 180);
                        const x = Math.cos(angle) * 80;
                        const y = Math.sin(angle) * 80;
                        return (
                          <div
                            key={i}
                            className={`absolute w-1 bg-blue-400 rounded-full animate-pulse ${
                              isSpeaking ? 'h-8' : 'h-4'
                            }`}
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`,
                              transform: 'translate(-50%, -50%)',
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                
                {/* Floating Data Particles */}
                {isActive && (
                  <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45) * (Math.PI / 180);
                      const radius = 120 + (i % 2) * 20;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      return (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping"
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: 'translate(-50%, -50%)',
                            animationDelay: `${i * 0.3}s`
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* JARVIS Status Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-black/80 border border-blue-400 text-blue-400' 
                    : 'bg-gray-100 text-gray-600'
                } ${
                  doctorMood === 'analyzing' ? 'animate-pulse' :
                  doctorMood === 'speaking' ? 'animate-bounce' :
                  doctorMood === 'listening' ? 'animate-pulse' : ''
                }`}>
                  {doctorMood === 'analyzing' && '⚡ ANALYZING BIOMETRICS...'}
                  {doctorMood === 'speaking' && '🔊 JARVIS RESPONDING...'}
                  {doctorMood === 'listening' && '🎤 VOICE DETECTED...'}
                  {doctorMood === 'idle' && (isActive ? '🤖 JARVIS ONLINE' : '💤 OFFLINE')}
                </div>
              </div>
            </div>


          </CardContent>
        </Card>

        {/* Consultation Interface */}
        <div className="space-y-6">
          {/* Quick Consultation Buttons */}
          <Card>
            <CardHeader title="🎤 Quick Consultation" />
            <CardContent className="space-y-3">
              {transcript && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">You said:</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">"{transcript}"</p>
                </div>
              )}
              
              <div className="text-center p-4 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-lg">
                <Mic className={`w-8 h-8 mx-auto mb-2 ${
                  isListening ? 'text-green-500 animate-pulse' : 'text-slate-400'
                }`} />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {isListening ? '🎤 Listening... Speak now!' : 'Click "Activate JARVIS" to start voice chat'}
                </p>
              </div>
              
              <div className="text-xs text-slate-500 text-center mb-3">Or try these quick examples:</div>
              
              {[
                'I have chest pain and shortness of breath',
                'I feel dizzy and have headaches', 
                'I have been feeling tired lately',
                'My blood pressure seems high'
              ].map((question, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start"
                  onClick={() => startConsultation(question)}
                  disabled={!isActive}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  "{question}"
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Current Response */}
          {currentResponse && (
            <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
              <CardHeader 
                title="🩺 AI Diagnosis" 
                action={
                  <Badge variant="success">
                    {currentResponse.confidence}% Confidence
                  </Badge>
                }
              />
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Response:</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentResponse.response}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Diagnosis:</h4>
                  <Badge variant="warning">{currentResponse.diagnosis}</Badge>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Recommendations:</h4>
                  <div className="space-y-1">
                    {currentResponse.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Zap className="w-3 h-3 text-blue-500" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Consultation History */}
      <Card>
        <CardHeader title="📋 Recent Consultations" subtitle={`${consultationHistory.length} consultations completed`} />
        <CardContent>
          <div className="space-y-4">
            {consultationHistory.map((consultation) => (
              <div key={consultation.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-800 dark:text-white">"{consultation.question}"</h4>
                  <span className="text-xs text-slate-500">{consultation.timestamp}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{consultation.response}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="warning">{consultation.diagnosis}</Badge>
                  <Badge variant="success">{consultation.confidence}% Confidence</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};