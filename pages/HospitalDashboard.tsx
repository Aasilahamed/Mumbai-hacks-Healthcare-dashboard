import React from 'react';
import { Card, CardContent, CardHeader, Badge, Button } from '../components/Common';
import { 
<<<<<<< HEAD
  Users, Bed, Activity, DollarSign, AlertTriangle, Clock, Plus, Pill, Satellite, Shield, Zap, Phone, MapPin, Eye
=======
  Users, Bed, Activity, DollarSign, AlertTriangle, Clock, Plus, Pill
>>>>>>> 6e2d611bf0e0b8b3e276610de398eb797a5f7161
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useHospital } from '../contexts/HospitalContext';

const analyticsData = [
  { time: '8am', patients: 12 },
  { time: '10am', patients: 35 },
  { time: '12pm', patients: 48 },
  { time: '2pm', patients: 40 },
  { time: '4pm', patients: 25 },
  { time: '6pm', patients: 18 },
];

<<<<<<< HEAD
// Mass Emergency Detection System Data
const emergencyDetectionData = {
  status: 'ACTIVE',
  lastScan: '2 seconds ago',
  sourcesMonitored: 847,
  alertsProcessed: 1247,
  currentIncidents: [
    {
      id: 'INC-001',
      type: 'TRAFFIC_ACCIDENT',
      severity: 'HIGH',
      location: 'Highway 101, Mile 23',
      confidence: 94,
      sources: ['Twitter', 'Traffic Cams', 'Emergency Radio'],
      estimatedCasualties: '3-5',
      timeDetected: '3 min ago',
      status: 'VERIFIED',
      actionsTriggered: ['EMS_DISPATCH', 'HOSPITAL_ALERT', 'BED_RESERVE']
    },
    {
      id: 'INC-002', 
      type: 'BUILDING_FIRE',
      severity: 'CRITICAL',
      location: 'Downtown Plaza, 5th Street',
      confidence: 98,
      sources: ['Fire Dept Radio', 'Social Media', 'News Feed'],
      estimatedCasualties: '10-15',
      timeDetected: '8 min ago',
      status: 'ACTIVE_RESPONSE',
      actionsTriggered: ['FIRE_DEPT', 'MASS_CASUALTY_PREP', 'STAFF_ALERT']
    }
  ],
  recentActions: [
    { time: '11:37 AM', action: 'Auto-reserved 8 trauma beds for Highway 101 incident' },
    { time: '11:35 AM', action: 'Notified Dr. Martinez (Trauma Lead) - ETA 5 mins' },
    { time: '11:34 AM', action: 'Dispatched ambulances to Highway 101, Mile 23' },
    { time: '11:32 AM', action: 'Incident verified via traffic camera analysis' }
  ]
};

export const HospitalDashboard: React.FC = () => {
  const { staff, beds, inventory, appointments, alerts, resolveAlert } = useHospital();
  const [emergencySystemActive, setEmergencySystemActive] = React.useState(true);
  const [liveCounter, setLiveCounter] = React.useState(847);
  const [alertsCounter, setAlertsCounter] = React.useState(1247);
  const [newIncidentAlert, setNewIncidentAlert] = React.useState(false);

  // Live counter simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter(prev => prev + Math.floor(Math.random() * 3));
      setAlertsCounter(prev => prev + Math.floor(Math.random() * 2));
      
      // Random new incident alert
      if (Math.random() < 0.1) {
        setNewIncidentAlert(true);
        setTimeout(() => setNewIncidentAlert(false), 3000);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);
=======
export const HospitalDashboard: React.FC = () => {
  const { staff, beds, inventory, appointments, alerts, resolveAlert } = useHospital();
>>>>>>> 6e2d611bf0e0b8b3e276610de398eb797a5f7161

  // --- Computed Stats from Context ---
  const doctorsOnDuty = staff.filter(s => s.role === 'Doctor' && s.status === 'On Duty').length;
  const bedsAvailable = beds.filter(b => b.status === 'Available').length;
  const activePatients = beds.filter(b => b.status === 'Occupied').length;
  const revenue = 42500; // Static for now as invoicing logic is simple

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h1>
           <p className="text-slate-500 dark:text-slate-400">Real-time Hospital Overview</p>
        </div>
        <div className="flex items-center gap-2">
           <Button icon={Plus}>New Admission</Button>
           <Button variant="secondary">Generate Report</Button>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
            { label: 'Active In-Patients', val: activePatients, sub: 'Live Count', icon: Users, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
            { label: 'Beds Available', val: bedsAvailable, sub: bedsAvailable < 3 ? 'Critical Low' : 'Stable', icon: Bed, color: bedsAvailable < 3 ? 'text-red-600 bg-red-50' : 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
            { label: 'Doctors On Duty', val: doctorsOnDuty, sub: 'Shift A', icon: Activity, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
            { label: 'Est. Revenue', val: `$${(revenue/1000).toFixed(1)}k`, sub: 'Today', icon: DollarSign, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' }
         ].map((stat, i) => (
             <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                   <div className="flex justify-between items-start">
                      <div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stat.val}</h3>
                          <span className={`text-xs font-medium ${String(stat.sub).includes('Critical') ? 'text-red-500' : 'text-emerald-500'}`}>{stat.sub}</span>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.color}`}>
                          <stat.icon className="w-5 h-5" />
                      </div>
                   </div>
                </CardContent>
             </Card>
         ))}
      </div>

<<<<<<< HEAD
      {/* Mass Emergency Detection System */}
      <Card className={`border-2 transition-all duration-500 ${newIncidentAlert ? 'border-red-500 shadow-2xl shadow-red-500/50 animate-pulse' : 'border-red-200 dark:border-red-800'} bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 relative overflow-hidden`}>
        {/* Scanning Animation Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse opacity-30"></div>
        {newIncidentAlert && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce z-10">
            🚨 NEW INCIDENT DETECTED
          </div>
        )}
        <CardHeader 
          title="🚨 Mass Emergency Detection System" 
          subtitle={`Agentic AI monitoring ${liveCounter.toLocaleString()} sources in real-time`}
          icon={<Satellite className="w-6 h-6 text-red-600 animate-spin" />}
          action={
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${emergencySystemActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {emergencySystemActive ? 'ACTIVE' : 'OFFLINE'}
                </span>
              </div>
              <Button 
                variant={emergencySystemActive ? 'danger' : 'primary'} 
                size="sm"
                onClick={() => setEmergencySystemActive(!emergencySystemActive)}
              >
                {emergencySystemActive ? 'Disable' : 'Enable'}
              </Button>
            </div>
          }
        />
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* 24/7 Monitoring Radar */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                <Satellite className="w-4 h-4 animate-pulse" /> 24/7 Live Radar
              </h4>
              
              {/* Radar Visualization */}
              <div className="relative w-48 h-48 mx-auto mb-4">
                {/* Radar Background */}
                <div className="absolute inset-0 rounded-full border-2 border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
                  {/* Concentric Circles */}
                  <div className="absolute inset-4 rounded-full border border-green-500/20"></div>
                  <div className="absolute inset-8 rounded-full border border-green-500/20"></div>
                  <div className="absolute inset-12 rounded-full border border-green-500/20"></div>
                  
                  {/* Crosshairs */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-green-500/30"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-500/30"></div>
                  
                  {/* Rotating Sweep */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 w-24 h-px bg-gradient-to-r from-green-500 to-transparent origin-left animate-spin" style={{transformOrigin: '0 0', animationDuration: '3s'}}></div>
                  </div>
                  
                  {/* Threat Dots */}
                  <div className="absolute top-8 right-12 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  <div className="absolute bottom-16 left-8 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-20 left-16 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 right-20 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  
                  {/* Center Hub */}
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                </div>
                
                {/* Radar Labels */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-green-500 font-mono">N</div>
                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 text-xs text-green-500 font-mono">E</div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-green-500 font-mono">S</div>
                <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 text-xs text-green-500 font-mono">W</div>
              </div>
              
              {/* Threat Legend */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  <span className="text-slate-600 dark:text-slate-400">Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-400">High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-400">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-400">Low</span>
                </div>
              </div>
            </div>
            
            {/* System Status */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                <Eye className="w-4 h-4" /> System Status
              </h4>
              <div className="space-y-3">
                {[
                  { label: 'Sources Monitored', value: liveCounter, icon: Satellite, color: 'text-green-500', animate: true },
                  { label: 'Alerts Processed', value: alertsCounter, icon: Shield, color: 'text-blue-500', animate: true },
                  { label: 'Last Scan', value: 'Live', icon: Clock, color: 'text-red-500', animate: false }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-slate-700/50 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <stat.icon className={`w-4 h-4 ${stat.color} ${stat.animate ? 'animate-pulse' : ''}`} />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</span>
                    </div>
                    <span className={`font-bold text-lg ${stat.animate ? 'animate-pulse' : ''} ${stat.color}`}>
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Incidents */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Active Incidents ({emergencyDetectionData.currentIncidents.length})
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {emergencyDetectionData.currentIncidents.map((incident, index) => (
                  <div key={incident.id} className={`p-4 rounded-lg border-l-4 transform transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                    incident.severity === 'CRITICAL' 
                      ? 'border-l-red-500 bg-red-50 dark:bg-red-950/30 shadow-red-500/20 animate-pulse' 
                      : 'border-l-orange-500 bg-orange-50 dark:bg-orange-950/30 shadow-orange-500/20'
                  } ${newIncidentAlert && index === 0 ? 'ring-2 ring-red-500 animate-bounce' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-sm text-slate-800 dark:text-white">
                        {incident.type.replace('_', ' ')}
                      </h5>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          incident.severity === 'CRITICAL' ? 'bg-red-500' : 'bg-orange-500'
                        }`}></div>
                        <Badge variant={incident.severity === 'CRITICAL' ? 'danger' : 'warning'} className="animate-pulse">
                          {incident.confidence}% Confidence
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {incident.location}
                      </div>
                      <div>Est. Casualties: {incident.estimatedCasualties}</div>
                      <div>Sources: {incident.sources.join(', ')}</div>
                      <div className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1 animate-pulse">
                        <Zap className="w-3 h-3" />
                        ✓ {incident.actionsTriggered.length} actions triggered
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent AI Actions */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" /> Recent AI Actions
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {emergencyDetectionData.recentActions.map((action, i) => (
                  <div key={i} className={`p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg border-l-2 border-l-blue-500 transform transition-all duration-300 hover:translate-x-2 hover:shadow-md ${
                    i === 0 ? 'animate-pulse bg-blue-50 dark:bg-blue-950/30' : ''
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className={`w-3 h-3 text-slate-500 ${i === 0 ? 'animate-spin' : ''}`} />
                      <span className="text-xs text-slate-500">{action.time}</span>
                      {i === 0 && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full animate-pulse">LIVE</span>}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{action.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Workflow Visualization */}
          <div className="mt-6 p-4 bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800 dark:to-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              🤖 Agentic AI Workflow
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </h4>
            <div className="flex items-center justify-between text-sm relative">
              {[
                { step: 'Monitor', icon: Eye, desc: `${liveCounter} sources`, active: true },
                { step: 'Detect', icon: AlertTriangle, desc: 'AI analysis', active: true },
                { step: 'Verify', icon: Shield, desc: 'Cross-reference', active: newIncidentAlert },
                { step: 'Act', icon: Zap, desc: 'Auto-dispatch', active: newIncidentAlert },
                { step: 'Coordinate', icon: Phone, desc: 'Multi-agency', active: false }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    item.active 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg animate-pulse transform scale-110' 
                      : 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                  }`}>
                    <item.icon className={`w-5 h-5 ${item.active ? 'animate-pulse' : ''}`} />
                  </div>
                  <div className="text-center">
                    <div className={`font-medium transition-colors ${
                      item.active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-white'
                    }`}>{item.step}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </div>
                </div>
              ))}
              {/* Animated Connection Lines */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-green-300 to-slate-300 opacity-60">
                <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 animate-pulse" style={{width: newIncidentAlert ? '80%' : '40%', transition: 'width 2s ease-in-out'}}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

=======
>>>>>>> 6e2d611bf0e0b8b3e276610de398eb797a5f7161
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Real-Time Analytics */}
          <Card className="lg:col-span-2">
              <CardHeader title="Patient Flow" subtitle="Admissions Today" />
              <div className="h-80 w-full p-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData}>
                        <defs>
                            <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
                        <Area type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
          </Card>

          {/* Notifications / ER Alerts */}
          <Card className="lg:col-span-1 bg-slate-900 text-white border-slate-800 max-h-[400px] overflow-y-auto">
              <CardHeader title={`Live Alerts (${alerts.length})`} icon={<AlertTriangle className="w-5 h-5 text-red-400" />} />
              <CardContent className="space-y-4">
                  {alerts.length === 0 ? (
                      <div className="text-center text-slate-500 py-10">No active alerts</div>
                  ) : alerts.map((alert) => (
                      <div key={alert.id} className={`p-3 rounded-xl border border-slate-700 bg-slate-800/50 animate-in slide-in-from-right-5 ${alert.severity === 'critical' || alert.severity === 'high' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-amber-500'}`}>
                          <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-sm text-slate-200">{alert.type}</h4>
                              <span className="text-xs text-slate-500">{alert.time}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{alert.location}</p>
                          <div className="mt-2 flex gap-2">
                              <button onClick={() => resolveAlert(alert.id)} className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition-colors">Resolve</button>
                          </div>
                      </div>
                  ))}
              </CardContent>
          </Card>

          {/* Appointments List */}
          <Card className="lg:col-span-2">
              <CardHeader title="Today's Appointments" action={<Button variant="ghost" className="text-xs">View All</Button>} />
              <CardContent>
                  <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                          <thead className="text-xs text-slate-400 uppercase bg-slate-50 dark:bg-slate-700/50">
                              <tr>
                                  <th className="px-4 py-3">Patient</th>
                                  <th className="px-4 py-3">Doctor</th>
                                  <th className="px-4 py-3">Type</th>
                                  <th className="px-4 py-3">Time</th>
                                  <th className="px-4 py-3 text-right">Status</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                              {appointments.slice(0, 5).map((appt) => (
                                  <tr key={appt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">{appt.patientName}</td>
                                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{appt.doctorName}</td>
                                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{appt.type}</td>
                                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 flex items-center gap-2"><Clock className="w-3 h-3" /> {appt.time}</td>
                                      <td className="px-4 py-3 text-right">
                                          <Badge variant={appt.status === 'Checked In' ? 'success' : 'neutral'}>{appt.status}</Badge>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </CardContent>
          </Card>

          {/* Low Stock Warning */}
          <Card className="lg:col-span-1">
              <CardHeader title="Low Inventory" icon={<Pill className="w-5 h-5 text-purple-500" />} />
              <CardContent>
                  <div className="space-y-3">
                      {inventory.filter(i => i.status !== 'Good').length === 0 ? (
                          <p className="text-sm text-slate-500">All stock levels optimal.</p>
                      ) : inventory.filter(i => i.status !== 'Good').slice(0, 4).map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                              <div>
                                  <p className="text-sm font-medium text-slate-800 dark:text-white">{item.name}</p>
                                  <p className="text-xs text-slate-400">{item.stock} {item.unit} remaining</p>
                              </div>
                              <Badge variant={item.status === 'Critical' ? 'danger' : 'warning'}>{item.status}</Badge>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
};
