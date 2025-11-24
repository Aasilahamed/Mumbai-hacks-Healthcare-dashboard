import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Badge, Button } from '../components/Common';
import { 
  Bot, MessageSquare, Zap, Users, MapPin, Clock, AlertTriangle, 
  Heart, Ambulance, Building2, Phone, CheckCircle, ArrowRight
} from 'lucide-react';

interface AgentMessage {
  id: string;
  agentType: 'patient' | 'hospital' | 'ambulance' | 'emergency' | 'system';
  agentName: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'sending' | 'sent' | 'received' | 'processing' | 'completed';
  actions?: string[];
}

const agentProfiles = {
  patient: { name: 'Patient AI', color: 'bg-blue-500', icon: Heart },
  hospital: { name: 'Hospital AI', color: 'bg-green-500', icon: Building2 },
  ambulance: { name: 'Ambulance AI', color: 'bg-orange-500', icon: Ambulance },
  emergency: { name: 'Emergency AI', color: 'bg-red-500', icon: AlertTriangle },
  system: { name: 'System AI', color: 'bg-purple-500', icon: Bot }
};

const initialMessages: AgentMessage[] = [
  {
    id: '1',
    agentType: 'patient',
    agentName: 'Patient AI - John Doe',
    message: '🚨 CRITICAL: Detected cardiac anomaly. Heart rate: 145 BPM, BP: 180/110. Patient experiencing chest pain. Requesting immediate assistance.',
    timestamp: '11:42:15 AM',
    priority: 'critical',
    status: 'completed',
    actions: ['Vitals Analysis', 'Risk Assessment', 'Emergency Protocol']
  },
  {
    id: '2',
    agentType: 'emergency',
    agentName: 'Emergency Dispatch AI',
    message: '⚡ ALERT RECEIVED: Cardiac emergency detected. Analyzing nearest resources... Found: St. Mary\'s Hospital (2.3 miles), Ambulance Unit 7 (1.8 miles). Initiating coordination protocol.',
    timestamp: '11:42:18 AM',
    priority: 'critical',
    status: 'completed',
    actions: ['Resource Mapping', 'Distance Calculation', 'Priority Assignment']
  },
  {
    id: '3',
    agentType: 'hospital',
    agentName: 'St. Mary\'s Hospital AI',
    message: '🏥 RESPONSE: Emergency received. Cardiac team alerted. Trauma Bay 3 prepared. Dr. Martinez (Cardiologist) notified - ETA 4 minutes. Bed reserved, equipment ready.',
    timestamp: '11:42:22 AM',
    priority: 'high',
    status: 'completed',
    actions: ['Staff Notification', 'Bed Allocation', 'Equipment Prep']
  },
  {
    id: '4',
    agentType: 'ambulance',
    agentName: 'Ambulance Unit 7 AI',
    message: '🚑 DISPATCHED: En route to patient location (123 Oak Street). ETA: 6 minutes. Optimal route calculated avoiding traffic. Paramedic team briefed on cardiac emergency.',
    timestamp: '11:42:25 AM',
    priority: 'high',
    status: 'completed',
    actions: ['Route Optimization', 'Team Briefing', 'Equipment Check']
  }
];

export const MultiAgentCoordination: React.FC = () => {
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages);
  const [activeScenario, setActiveScenario] = useState<'cardiac' | 'accident' | 'fire'>('cardiac');
  const [isLiveDemo, setIsLiveDemo] = useState(false);

  // Live demo simulation
  useEffect(() => {
    if (!isLiveDemo) return;

    const liveMessages = [
      {
        id: Date.now().toString(),
        agentType: 'system' as const,
        agentName: 'System Monitor AI',
        message: '🔍 SCANNING: Monitoring 847 data sources... Social media analysis detecting potential incident...',
        timestamp: new Date().toLocaleTimeString(),
        priority: 'medium' as const,
        status: 'sending' as const,
        actions: ['Social Media Scan', 'Pattern Recognition']
      },
      {
        id: (Date.now() + 1).toString(),
        agentType: 'emergency' as const,
        agentName: 'Emergency Detection AI',
        message: '⚠️ INCIDENT DETECTED: Multi-vehicle accident on Highway 101. Confidence: 94%. Estimated casualties: 3-5. Coordinating response...',
        timestamp: new Date().toLocaleTimeString(),
        priority: 'critical' as const,
        status: 'processing' as const,
        actions: ['Incident Verification', 'Casualty Estimation', 'Resource Allocation']
      }
    ];

    const interval = setInterval(() => {
      if (liveMessages.length > 0) {
        const newMessage = liveMessages.shift()!;
        setMessages(prev => [...prev, newMessage]);
        
        // Update message status after delay
        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'completed' as const }
              : msg
          ));
        }, 2000);
      } else {
        setIsLiveDemo(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveDemo]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sending': return 'text-yellow-500';
      case 'processing': return 'text-blue-500 animate-pulse';
      case 'completed': return 'text-green-500';
      default: return 'text-slate-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
      case 'high': return 'border-l-orange-500 bg-orange-50 dark:bg-orange-950/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      default: return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <Bot className="w-8 h-8 text-purple-500 animate-pulse" />
            Multi-Agent Coordination
          </h1>
          <p className="text-slate-500 dark:text-slate-400">AI Agents communicating in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant={isLiveDemo ? 'danger' : 'primary'}
            onClick={() => setIsLiveDemo(!isLiveDemo)}
            icon={isLiveDemo ? AlertTriangle : Zap}
          >
            {isLiveDemo ? 'Stop Demo' : 'Start Live Demo'}
          </Button>
        </div>
      </div>

      {/* Agent Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(agentProfiles).map(([type, profile]) => (
          <Card key={type} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className={`w-12 h-12 ${profile.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <profile.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-slate-800 dark:text-white">{profile.name}</h3>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400">ACTIVE</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Communication Feed */}
      <Card className="min-h-[600px]">
        <CardHeader 
          title="🤖 Live Agent Communication" 
          subtitle={`${messages.length} messages exchanged`}
          action={
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">LIVE</span>
            </div>
          }
        />
        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-y-auto space-y-4 p-6">
            {messages.map((message, index) => {
              const agent = agentProfiles[message.agentType];
              return (
                <div 
                  key={message.id} 
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(message.priority)} animate-in slide-in-from-bottom-4`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${agent.color} rounded-full flex items-center justify-center`}>
                        <agent.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-slate-800 dark:text-white">
                          {message.agentName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{message.timestamp}</span>
                          <Badge variant={message.priority === 'critical' ? 'danger' : 'warning'}>
                            {message.priority.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 ${getStatusColor(message.status)}`}>
                      {message.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      )}
                      <span className="text-xs font-medium">{message.status.toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                    {message.message}
                  </p>
                  
                  {message.actions && (
                    <div className="flex flex-wrap gap-2">
                      {message.actions.map((action, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full text-slate-600 dark:text-slate-300"
                        >
                          ⚡ {action}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Coordination Workflow */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardHeader title="🔄 Agent Coordination Workflow" />
        <CardContent>
          <div className="flex items-center justify-between">
            {[
              { step: 'Detect', icon: AlertTriangle, desc: 'Patient AI detects emergency' },
              { step: 'Alert', icon: Zap, desc: 'Emergency AI processes alert' },
              { step: 'Coordinate', icon: Users, desc: 'Hospital AI prepares resources' },
              { step: 'Dispatch', icon: Ambulance, desc: 'Ambulance AI responds' },
              { step: 'Complete', icon: CheckCircle, desc: 'System AI monitors outcome' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center animate-pulse">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-slate-800 dark:text-white">{item.step}</div>
                  <div className="text-xs text-slate-500 max-w-20">{item.desc}</div>
                </div>
                {i < 4 && (
                  <ArrowRight className="absolute -right-8 top-5 w-4 h-4 text-slate-400 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};