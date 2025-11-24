import { GoogleGenAI } from "@google/genai";

<<<<<<< HEAD
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''; 
=======
const apiKey = process.env.API_KEY || ''; 
>>>>>>> 6e2d611bf0e0b8b3e276610de398eb797a5f7161
// Note: In a real environment, ensure this is set. 
// For this demo, we will fallback to mock responses if API key is missing or fails to avoid breaking the UI.

let ai: GoogleGenAI | null = null;

try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (e) {
  console.warn("Failed to initialize Gemini Client", e);
}

<<<<<<< HEAD
// Enhanced context interface for better AI responses
export interface HealthContext {
  vitals?: {
    heartRate?: number;
    bloodPressure?: string;
    glucose?: number;
    spo2?: number;
  };
  medications?: string[];
  conditions?: string[];
  age?: number;
  recentSymptoms?: string[];
  lastAppointment?: string;
}

// Mock responses for demo when API is unavailable
const getMockResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
    return "I understand you're experiencing discomfort. Based on your vitals, your heart rate is stable. If the pain is severe or persistent, please contact your doctor immediately or use the Emergency SOS feature. For mild discomfort, try deep breathing exercises and ensure you're well-hydrated.";
  }
  
  if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
    return "Based on your profile, you're currently on Metformin (500mg) and Lisinopril (10mg). Your next dose should be taken with your meal. Would you like me to set a reminder? Remember to never skip doses without consulting your doctor.";
  }
  
  if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
    return "For optimal health with your conditions, I recommend a balanced diet rich in whole grains, lean proteins, and vegetables. Limit processed foods and maintain regular meal times. Your current glucose levels are well-controlled, so keep up the good work!";
  }
  
  if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('activity')) {
    return "Great that you're thinking about exercise! For someone with your health profile, I recommend 30 minutes of moderate activity daily - walking, swimming, or cycling are excellent choices. Start slowly and gradually increase intensity. Your activity tracker shows good progress this week!";
  }
  
  if (lowerMessage.includes('appointment') || lowerMessage.includes('doctor')) {
    return "Your next appointment is with Dr. Richards (Cardiologist) tomorrow at 10:00 AM at St. Mary's Hospital. Make sure to bring your medication list and any questions you have. Would you like me to help you prepare a list of topics to discuss?";
  }
  
  return "I've analyzed your query. Based on your current vitals and health history, I recommend maintaining your current routine. Your heart rate (72 bpm) and blood pressure (118/78) are within healthy ranges. Stay hydrated, take your medications as prescribed, and continue monitoring your glucose levels. Is there anything specific you'd like me to help you with?";
};

export const getChatResponse = async (message: string, context?: HealthContext | string): Promise<string> => {
  if (!ai) {
    // Fallback mock response for demo purposes if no API key
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate latency
    return getMockResponse(message);
=======
export const getChatResponse = async (message: string, context?: string): Promise<string> => {
  if (!ai) {
    // Fallback mock response for demo purposes if no API key
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate latency
    return "I've analyzed your input. Based on your current vitals and history, I recommend maintaining your current hydration levels. Would you like me to schedule a reminder for your next medication?";
>>>>>>> 6e2d611bf0e0b8b3e276610de398eb797a5f7161
  }

  try {
    const model = 'gemini-2.5-flash';
<<<<<<< HEAD
    
    // Build comprehensive context string
    let contextString = '';
    if (typeof context === 'object' && context) {
      const ctx = context as HealthContext;
      contextString = `Patient Context:
- Age: ${ctx.age || 45} years
- Current Vitals: Heart Rate: ${ctx.vitals?.heartRate || 72} bpm, BP: ${ctx.vitals?.bloodPressure || '118/78'}, Glucose: ${ctx.vitals?.glucose || 96} mg/dL, SpO2: ${ctx.vitals?.spo2 || 98}%
- Medications: ${ctx.medications?.join(', ') || 'Metformin 500mg, Lisinopril 10mg'}
- Conditions: ${ctx.conditions?.join(', ') || 'Type 2 Diabetes, Hypertension'}
${ctx.recentSymptoms ? `- Recent Symptoms: ${ctx.recentSymptoms.join(', ')}` : ''}
${ctx.lastAppointment ? `- Last Appointment: ${ctx.lastAppointment}` : ''}`;
    } else if (typeof context === 'string') {
      contextString = context;
    } else {
      contextString = 'User is a 45-year-old patient with Type 2 Diabetes and mild hypertension. Current vitals are stable.';
    }
    
    const prompt = `You are HashCare AI, an advanced, empathetic, and professional medical health assistant powered by Google Gemini. Your role is to provide helpful health guidance, answer questions, and support patients in managing their health.

IMPORTANT GUIDELINES:
- Be empathetic, supportive, and professional
- Provide evidence-based health information
- Always remind users to consult healthcare professionals for serious concerns
- Use the patient's context to personalize responses
- Be concise but thorough
- Never provide definitive diagnoses - always recommend consulting a doctor for medical decisions
- Focus on prevention, wellness, and health management

${contextString}

User Question: ${message}

Provide a helpful, personalized response that addresses their question while considering their health context.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    
    const responseText = response.text || "I'm having trouble processing that request right now.";
    
    // Ensure response is not too long for UI
    return responseText.length > 500 ? responseText.substring(0, 500) + "..." : responseText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback to mock response on error
    await new Promise(resolve => setTimeout(resolve, 800));
    return getMockResponse(message);
  }
};

export const getDailyTip = async (context?: HealthContext): Promise<string> => {
    if (!ai) {
        const tips = [
            "Drink at least 8 glasses of water today to improve kidney function.",
            "Take a 10-minute walk after meals to help regulate blood sugar levels.",
            "Practice deep breathing for 5 minutes to reduce stress and lower blood pressure.",
            "Ensure you get 7-9 hours of quality sleep for optimal health recovery.",
            "Include a serving of leafy greens in your next meal for essential nutrients."
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }
    
    try {
        let contextString = '';
        if (context) {
            contextString = `Patient has: ${context.conditions?.join(', ') || 'Type 2 Diabetes, Hypertension'}. Current vitals are stable. `;
        }
        
        const prompt = `${contextString}Give me a personalized, actionable health tip in one short sentence (max 100 characters) for today. Make it specific and relevant to their health profile.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        const tip = response.text || "Stay active and hydrated!";
        return tip.length > 120 ? tip.substring(0, 120) + "..." : tip;
    } catch (e) {
        return "Take a deep breath and relax for 5 minutes.";
    }
}

// New function: Get health insights based on vitals
export const getHealthInsights = async (vitals: HealthContext['vitals']): Promise<string> => {
    if (!ai) {
        return "Your vitals are within normal ranges. Continue maintaining your current health routine.";
    }
    
    try {
        const prompt = `Analyze these patient vitals and provide a brief, actionable health insight (2-3 sentences):
- Heart Rate: ${vitals?.heartRate || 72} bpm
- Blood Pressure: ${vitals?.bloodPressure || '118/78'} mmHg
- Blood Glucose: ${vitals?.glucose || 96} mg/dL
- SpO2: ${vitals?.spo2 || 98}%

Provide a personalized insight focusing on what's good and any recommendations.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return response.text || "Your vitals look good. Keep up the healthy habits!";
    } catch (e) {
        return "Your vitals are stable. Continue monitoring regularly.";
    }
=======
    const response = await ai.models.generateContent({
      model,
      contents: `System: You are HashCare AI, a helpful, empathetic, and professional medical health assistant.
      Context: ${context || 'User is a 45-year-old patient with mild hypertension.'}
      User: ${message}`,
    });
    return response.text || "I'm having trouble processing that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline. Please check your internet connection or API configuration.";
  }
};

export const getDailyTip = async (): Promise<string> => {
    if (!ai) {
        return "Drink at least 8 glasses of water today to improve kidney function.";
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Give me a short, single sentence health tip for a dashboard.",
        });
        return response.text || "Stay active and hydrated!";
    } catch (e) {
        return "Take a deep breath and relax for 5 minutes.";
    }
>>>>>>> 6e2d611bf0e0b8b3e276610de398eb797a5f7161
}