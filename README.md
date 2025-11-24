<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<<<<<<< HEAD
# HashCare AI - Agentic Healthcare Dashboard

A comprehensive, AI-powered healthcare management platform built for the Mumbai Hacks Agentic AI Hackathon. HashCare AI provides intelligent health monitoring, real-time vitals tracking, emergency assistance, and hospital administration tools powered by Google Gemini AI.

## 🚀 Features

### Patient Features
- **AI-Powered Health Dashboard**: Real-time vitals monitoring with AI-generated insights
- **Health Assistant**: Context-aware AI chat assistant for health queries and medication guidance
- **IoT Vitals Monitor**: Live streaming of heart rate, SpO2, and glucose levels
- **Emergency SOS**: One-tap emergency assistance with location services
- **Medical Tracker**: Track medications, appointments, and health records
- **Hospital Finder**: Interactive map to locate nearby hospitals with real-time availability
- **Insurance Tracker**: Manage insurance claims and coverage
- **Community**: Connect with other patients and share experiences

### Hospital Admin Features
- **Admin Dashboard**: Real-time hospital operations overview
- **Staff Management**: Track doctors, nurses, and support staff
- **Bed Allocation**: Monitor and manage bed availability across wards
- **Pharmacy & Inventory**: Track medicine stock and low inventory alerts
- **Appointment Management**: Schedule and track patient appointments
- **Billing & Invoices**: Manage patient billing and payment tracking
- **Emergency Alerts**: Real-time critical alerts and incident management

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS with custom glassmorphism design
- **AI Integration**: Google Gemini 2.5 Flash
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mumbaihacks-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   **Note**: The app will work with mock responses if no API key is provided, but AI features will be limited.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🎯 Usage

### For Patients

1. **Sign Up/Login**: Choose "Patient" role and create an account
2. **Dashboard**: View your health metrics, AI insights, and daily tips
3. **Health Assistant**: Chat with AI about your health, medications, or symptoms
4. **IoT Monitor**: Connect wearable devices to monitor real-time vitals
5. **Emergency SOS**: Use the SOS button for immediate emergency assistance

### For Hospital Admins

1. **Sign Up/Login**: Choose "Hospital Admin" role
2. **Admin Dashboard**: Monitor hospital operations, patient flow, and alerts
3. **Manage Resources**: Allocate beds, track inventory, manage staff
4. **Handle Alerts**: Respond to emergency alerts and critical incidents

## 🤖 AI Capabilities

HashCare AI leverages Google Gemini for:

- **Personalized Health Tips**: Daily AI-generated health recommendations
- **Context-Aware Chat**: Health assistant that understands your medical history
- **Vital Analysis**: AI-powered analysis of your health metrics
- **Proactive Suggestions**: Intelligent recommendations based on your data
- **Emergency Assessment**: Quick health status evaluation

## 📁 Project Structure

```
Mumbaihacks-project/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── pages/              # Main application pages
├── services/          # API services (Gemini AI)
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── vite.config.ts     # Vite configuration
```

## 🎨 Design Features

- **Glassmorphism UI**: Modern, elegant glass-effect design
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Live data streaming and updates
- **Smooth Animations**: Polished transitions and interactions

## 🔒 Security & Privacy

- Secure authentication system
- Protected health data
- HIPAA-compliant design considerations
- Encrypted API communications

## 🚧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | No (uses mock responses if not provided) |

## 🤝 Contributing

This is a hackathon project. Contributions and improvements are welcome!

## 📄 License

This project is created for the Mumbai Hacks Agentic AI Hackathon.

## 🙏 Acknowledgments

- Google Gemini AI for powerful AI capabilities
- React and Vite teams for excellent tooling
- Tailwind CSS for beautiful styling utilities

---

**Built with ❤️ for Mumbai Hacks Agentic AI Hackathon**
=======
# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/11-H_VVVn3emt9EfjgBCgk6BdszzFLFyr

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
>>>>>>> 6e2d611bf0e0b8b3e276610de398eb797a5f7161
