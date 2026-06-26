import { useState } from "react";
import {
  LayoutDashboard, Brain, MapPin, Activity, Bell, Video, FileText,
  Phone, ChevronRight, Heart, Thermometer, Droplets, Wind,
  AlertTriangle, CheckCircle, Clock, Star, X, Menu, Search,
  TrendingUp, TrendingDown, Pill, Calendar, User, Shield,
  Zap, ArrowRight, Plus, Filter, ChevronDown
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar
} from "recharts";

type View = "dashboard" | "symptoms" | "hospitals" | "monitoring" | "reminders" | "consultation" | "records";

const heartRateData = [
  { time: "06:00", bpm: 62 }, { time: "08:00", bpm: 74 }, { time: "10:00", bpm: 88 },
  { time: "12:00", bpm: 82 }, { time: "14:00", bpm: 79 }, { time: "16:00", bpm: 91 },
  { time: "18:00", bpm: 85 }, { time: "20:00", bpm: 76 }, { time: "22:00", bpm: 68 },
];

const bloodPressureData = [
  { day: "Mon", systolic: 118, diastolic: 76 }, { day: "Tue", systolic: 122, diastolic: 79 },
  { day: "Wed", systolic: 115, diastolic: 74 }, { day: "Thu", systolic: 128, diastolic: 82 },
  { day: "Fri", systolic: 120, diastolic: 77 }, { day: "Sat", systolic: 116, diastolic: 75 },
  { day: "Sun", systolic: 119, diastolic: 78 },
];

const sleepData = [
  { day: "Mon", hours: 7.2 }, { day: "Tue", hours: 6.8 }, { day: "Wed", hours: 8.1 },
  { day: "Thu", hours: 5.9 }, { day: "Fri", hours: 7.5 }, { day: "Sat", hours: 8.4 }, { day: "Sun", hours: 7.8 },
];

const hospitals = [
  { name: "City General Hospital", distance: "0.8 km", rating: 4.8, type: "Multi-specialty", wait: "~12 min", beds: 24, emergency: true },
  { name: "Apollo Medical Center", distance: "1.4 km", rating: 4.6, type: "Cardiac & Neuro", wait: "~18 min", beds: 8, emergency: true },
  { name: "Sunrise Clinic", distance: "2.1 km", rating: 4.4, type: "General Practice", wait: "~5 min", beds: 12, emergency: false },
  { name: "St. Mary's Hospital", distance: "3.2 km", rating: 4.9, type: "Children & Women", wait: "~25 min", beds: 3, emergency: true },
];

const doctors = [
  { name: "Dr. Sarah Chen", specialty: "Cardiologist", rating: 4.9, available: true, next: "Today 3:30 PM", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&auto=format" },
  { name: "Dr. James Okafor", specialty: "General Physician", rating: 4.7, available: true, next: "Today 5:00 PM", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&auto=format" },
  { name: "Dr. Priya Sharma", specialty: "Neurologist", rating: 4.8, available: false, next: "Tomorrow 10:00 AM", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&h=80&fit=crop&auto=format" },
  { name: "Dr. Marcus Webb", specialty: "Orthopedist", rating: 4.6, available: true, next: "Today 7:00 PM", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&h=80&fit=crop&auto=format" },
];

const medicines = [
  { name: "Metformin 500mg", time: "08:00 AM", taken: true, remaining: 24, color: "#059669" },
  { name: "Atorvastatin 20mg", time: "09:00 PM", taken: false, remaining: 18, color: "#059669" },
  { name: "Aspirin 81mg", time: "08:00 AM", taken: true, remaining: 30, color: "#3b82f6" },
  { name: "Lisinopril 10mg", time: "12:00 PM", taken: false, remaining: 12, color: "#f59e0b" },
  { name: "Vitamin D3", time: "08:00 AM", taken: true, remaining: 60, color: "#a78bfa" },
];

const records = [
  { title: "Complete Blood Count", date: "Jun 18, 2026", doctor: "Dr. Sarah Chen", type: "Lab Report", icon: "🧪" },
  { title: "Chest X-Ray", date: "Jun 10, 2026", doctor: "Dr. James Okafor", type: "Imaging", icon: "🫁" },
  { title: "ECG Report", date: "May 28, 2026", doctor: "Dr. Sarah Chen", type: "Cardiology", icon: "❤️" },
  { title: "MRI Brain Scan", date: "May 15, 2026", doctor: "Dr. Priya Sharma", type: "Imaging", icon: "🧠" },
  { title: "Annual Physical Exam", date: "Apr 22, 2026", doctor: "Dr. James Okafor", type: "General", icon: "📋" },
];

const symptoms = [
  "Headache", "Fever", "Cough", "Fatigue", "Chest Pain",
  "Shortness of Breath", "Nausea", "Dizziness", "Sore Throat", "Back Pain",
  "Joint Pain", "Rash", "Abdominal Pain", "Insomnia", "Palpitations",
];

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "monitoring", icon: Activity, label: "Health Monitor" },
  { id: "symptoms", icon: Brain, label: "AI Symptom Check" },
  { id: "hospitals", icon: MapPin, label: "Nearby Hospitals" },
  { id: "reminders", icon: Bell, label: "Reminders" },
  { id: "consultation", icon: Video, label: "Consultations" },
  { id: "records", icon: FileText, label: "Medical Records" },
] as const;

function EmergencyButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        background: "linear-gradient(135deg, #ff3b5c 0%, #c41230 100%)",
        boxShadow: "0 0 40px rgba(255,59,92,0.5), 0 8px 32px rgba(255,59,92,0.3)",
        animation: "emergencyPulse 2s ease-in-out infinite",
      }}
    >
      <Phone className="w-5 h-5" />
      <span>Emergency SOS</span>
      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
    </button>
  );
}

function StatCard({ label, value, unit, icon: Icon, color, delta, deltaUp }: {
  label: string; value: string; unit: string; icon: React.ElementType;
  color: string; delta?: string; deltaUp?: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold" style={{ fontFamily: "Outfit, sans-serif", color }}>{value}</span>
        <span className="text-sm text-muted-foreground mb-1">{unit}</span>
      </div>
      {delta && (
        <div className={`flex items-center gap-1 text-xs font-medium ${deltaUp ? "text-accent" : "text-destructive"}`}>
          {deltaUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {delta} from yesterday
        </div>
      )}
    </div>
  );
}

function Dashboard({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
            Good morning, Alex 👋
          </h1>
          <p className="text-muted-foreground mt-1">Thursday, June 26 · Here's your health overview</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 px-4 py-2 rounded-xl">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">All vitals normal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Heart Rate" value="76" unit="bpm" icon={Heart} color="#ff3b5c" delta="+2 bpm" deltaUp={false} />
        <StatCard label="Blood Pressure" value="119/78" unit="mmHg" icon={Activity} color="#059669" delta="Stable" deltaUp={true} />
        <StatCard label="Temperature" value="98.4" unit="°F" icon={Thermometer} color="#f59e0b" delta="Normal" deltaUp={true} />
        <StatCard label="SpO₂" value="98" unit="%" icon={Droplets} color="#059669" delta="+0.5%" deltaUp={true} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ fontFamily: "Outfit, sans-serif" }}>Heart Rate — Today</h3>
            <span className="text-xs text-muted-foreground font-mono">avg 78 bpm</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={heartRateData}>
              <defs>
                <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff3b5c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff3b5c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#6888aa", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 100]} tick={{ fontSize: 11, fill: "#6888aa", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0c1835", border: "1px solid rgba(6,200,216,0.2)", borderRadius: "10px", color: "#e2e8f4" }} />
              <Area type="monotone" dataKey="bpm" stroke="#ff3b5c" strokeWidth={2} fill="url(#hrGrad)" dot={false} activeDot={{ r: 4, fill: "#ff3b5c" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Today's Medicines</h3>
            {medicines.slice(0, 3).map((m) => (
              <div key={m.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <Pill className="w-3.5 h-3.5" style={{ color: m.color }} />
                  <span className="text-sm">{m.name}</span>
                </div>
                {m.taken ? (
                  <CheckCircle className="w-4 h-4 text-accent" />
                ) : (
                  <Clock className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            ))}
            <button onClick={() => setView("reminders")} className="mt-3 text-xs text-primary flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Next Appointment</h3>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=48&h=48&fit=crop&auto=format" alt="Dr. Sarah Chen" className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <p className="font-medium text-sm">Dr. Sarah Chen</p>
                <p className="text-xs text-muted-foreground">Cardiology · Today 3:30 PM</p>
              </div>
            </div>
            <button onClick={() => setView("consultation")} className="mt-3 w-full py-2 rounded-xl text-sm font-medium text-primary-foreground transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
              Join Call
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { id: "symptoms", icon: Brain, label: "AI Symptom Check", desc: "Analyze your symptoms", color: "#a78bfa" },
          { id: "hospitals", icon: MapPin, label: "Find Hospital", desc: "Nearby emergency care", color: "#059669" },
          { id: "records", icon: FileText, label: "Medical Records", desc: "View your history", color: "#059669" },
          { id: "monitoring", icon: Activity, label: "Full Monitoring", desc: "Detailed vitals", color: "#f59e0b" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className="bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/30 transition-all hover:translate-y-[-2px] group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${item.color}15` }}>
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <p className="font-semibold text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{item.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            <ChevronRight className="w-4 h-4 text-muted-foreground mt-2 group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}

function HealthMonitoring() {
  const [metric, setMetric] = useState<"bp" | "sleep">("bp");
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>Health Monitoring</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Heart Rate" value="76" unit="bpm" icon={Heart} color="#ff3b5c" />
        <StatCard label="Blood Pressure" value="119/78" unit="mmHg" icon={Activity} color="#059669" />
        <StatCard label="SpO₂" value="98" unit="%" icon={Droplets} color="#059669" />
        <StatCard label="Respiration" value="16" unit="br/min" icon={Wind} color="#a78bfa" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setMetric("bp")} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${metric === "bp" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>Blood Pressure</button>
            <button onClick={() => setMetric("sleep")} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${metric === "sleep" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>Sleep</button>
          </div>
          {metric === "bp" ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={bloodPressureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6888aa", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6888aa", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0c1835", border: "1px solid rgba(6,200,216,0.2)", borderRadius: "10px", color: "#e2e8f4" }} />
                <Bar dataKey="systolic" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="diastolic" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={sleepData}>
                <defs>
                  <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6888aa" }} axisLine={false} tickLine={false} />
                <YAxis domain={[4, 10]} tick={{ fontSize: 11, fill: "#6888aa" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0c1835", border: "1px solid rgba(6,200,216,0.2)", borderRadius: "10px", color: "#e2e8f4" }} />
                <Area type="monotone" dataKey="hours" stroke="#a78bfa" strokeWidth={2} fill="url(#sleepGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Weekly Health Score</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="90%" data={[
                { name: "Heart", value: 92, fill: "#ff3b5c" },
                { name: "Sleep", value: 78, fill: "#a78bfa" },
                { name: "Activity", value: 85, fill: "#059669" },
                { name: "Nutrition", value: 70, fill: "#f59e0b" },
              ]} startAngle={180} endAngle={0}>
                <RadialBar dataKey="value" cornerRadius={4} />
                <Tooltip contentStyle={{ background: "#0c1835", border: "1px solid rgba(6,200,216,0.2)", borderRadius: "10px", color: "#e2e8f4" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[["Heart", "#ff3b5c", "92%"], ["Sleep", "#a78bfa", "78%"], ["Activity", "#059669", "85%"], ["Nutrition", "#f59e0b", "70%"]].map(([name, color, val]) => (
              <div key={name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: color as string }} />
                <span className="text-xs text-muted-foreground">{name}</span>
                <span className="text-xs font-mono ml-auto" style={{ color: color as string }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Heart Rate — Full Day</h3>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={heartRateData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#6888aa", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
            <YAxis domain={[55, 100]} tick={{ fontSize: 11, fill: "#6888aa", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#0c1835", border: "1px solid rgba(6,200,216,0.2)", borderRadius: "10px", color: "#e2e8f4" }} />
            <Line type="monotone" dataKey="bpm" stroke="#ff3b5c" strokeWidth={2} dot={{ r: 3, fill: "#ff3b5c" }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SymptomChecker() {
  const [selected, setSelected] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { risk: string; conditions: string[]; advice: string }>(null);

  const toggle = (s: string) => setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const analyze = () => {
    if (selected.length === 0) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      const hasChest = selected.includes("Chest Pain") || selected.includes("Shortness of Breath");
      setResult({
        risk: hasChest ? "High — Seek immediate care" : selected.length > 3 ? "Moderate" : "Low",
        conditions: hasChest
          ? ["Angina / Cardiac Event", "Pulmonary Embolism", "Severe Anxiety Disorder"]
          : selected.length > 3
          ? ["Viral Syndrome", "Stress / Exhaustion", "Early Flu"]
          : ["Common Cold", "Mild Fatigue", "Seasonal Allergies"],
        advice: hasChest
          ? "Please seek emergency care immediately or call 911."
          : "Schedule a doctor visit within the next 24-48 hours.",
      });
    }, 2200);
  };

  const riskColor = result?.risk.startsWith("High") ? "#ff3b5c" : result?.risk === "Moderate" ? "#f59e0b" : "#059669";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>AI Symptom Checker</h1>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full border border-border">
          <Zap className="w-3 h-3 text-primary" /> Powered by HealthAI v3
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <p className="text-muted-foreground text-sm mb-4">Select all symptoms you are currently experiencing:</p>
        <div className="flex flex-wrap gap-2">
          {symptoms.map(s => (
            <button
              key={s}
              onClick={() => toggle(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                selected.includes(s)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-muted-foreground">{selected.length} symptom{selected.length !== 1 ? "s" : ""} selected</span>
          <div className="flex gap-3">
            {selected.length > 0 && (
              <button onClick={() => { setSelected([]); setResult(null); }} className="px-4 py-2 rounded-xl text-sm border border-border text-muted-foreground hover:text-foreground transition-colors">
                Clear
              </button>
            )}
            <button
              onClick={analyze}
              disabled={selected.length === 0 || analyzing}
              className="px-6 py-2 rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-40 transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #059669, #047857)" }}
            >
              {analyzing ? "Analyzing..." : "Analyze Symptoms"}
            </button>
          </div>
        </div>
      </div>

      {analyzing && (
        <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-muted-foreground text-sm">AI is analyzing your symptoms...</p>
        </div>
      )}

      {result && (
        <div className="bg-card border rounded-2xl p-6 space-y-4" style={{ borderColor: `${riskColor}40` }}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Analysis Result</h3>
            <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: `${riskColor}20`, color: riskColor }}>
              {result.risk}
            </span>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Possible Conditions</p>
            {result.conditions.map(c => (
              <div key={c} className="flex items-center gap-2 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: riskColor }} />
                <span className="text-sm">{c}</span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: `${riskColor}10` }}>
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: riskColor }} />
            <p className="text-sm" style={{ color: riskColor }}>{result.advice}</p>
          </div>

          <p className="text-xs text-muted-foreground">This is not a medical diagnosis. Always consult a qualified healthcare professional.</p>
        </div>
      )}
    </div>
  );
}

function HospitalFinder() {
  const [search, setSearch] = useState("");
  const filtered = hospitals.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>Nearby Hospitals</h1>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search hospitals..."
            className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden" style={{ height: 220 }}>
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=220&fit=crop&auto=format"
          alt="Map view of nearby hospitals"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ position: "relative", marginTop: -220 }}>
          <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 inline mr-1.5 text-primary" />
            4 hospitals found within 5 km
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {filtered.map((h, i) => (
          <div key={h.name} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold" style={{ fontFamily: "Outfit, sans-serif" }}>{h.name}</h3>
                  {i === 0 && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Nearest</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{h.type}</p>
              </div>
              <div className="text-right">
                <p className="text-primary font-semibold text-sm">{h.distance}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{h.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Wait {h.wait}</span>
              <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {h.beds} beds avail.</span>
              {h.emergency && <span className="flex items-center gap-1 text-destructive"><AlertTriangle className="w-3 h-3" /> 24/7 ER</span>}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl text-sm font-medium text-primary-foreground transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
                Get Directions
              </button>
              <button className="flex-1 py-2 rounded-xl text-sm font-medium border border-border text-foreground hover:border-primary/40 transition-all">
                Call Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reminders() {
  const [tab, setTab] = useState<"medicine" | "appointments">("medicine");
  const appointments = [
    { title: "Cardiology Follow-up", doctor: "Dr. Sarah Chen", date: "Today", time: "3:30 PM", color: "#059669" },
    { title: "Blood Test", doctor: "City Lab, 2nd Floor", date: "Jun 28", time: "8:00 AM", color: "#059669" },
    { title: "Physical Therapy", doctor: "Dr. Marcus Webb", date: "Jun 30", time: "11:00 AM", color: "#a78bfa" },
    { title: "Annual Eye Check", doctor: "Vision Care Center", date: "Jul 5", time: "2:00 PM", color: "#f59e0b" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>Reminders</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
          <Plus className="w-4 h-4" /> Add Reminder
        </button>
      </div>

      <div className="flex gap-2">
        {(["medicine", "appointments"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            {t === "medicine" ? "Medicines" : "Appointments"}
          </button>
        ))}
      </div>

      {tab === "medicine" ? (
        <div className="space-y-3">
          {medicines.map(m => (
            <div key={m.name} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${m.color}15` }}>
                <Pill className="w-5 h-5" style={{ color: m.color }} />
              </div>
              <div className="flex-1">
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.time} · {m.remaining} pills remaining</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(m.remaining / 60) * 100}%`, background: m.color }} />
                  </div>
                </div>
                {m.taken ? (
                  <div className="flex items-center gap-1.5 text-accent text-sm">
                    <CheckCircle className="w-4 h-4" /> Taken
                  </div>
                ) : (
                  <button className="px-4 py-1.5 rounded-lg text-xs font-semibold text-primary-foreground" style={{ background: m.color }}>
                    Mark Taken
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map(a => (
            <div key={a.title} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${a.color}15` }}>
                <Calendar className="w-5 h-5" style={{ color: a.color }} />
              </div>
              <div className="flex-1">
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-muted-foreground">{a.doctor}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold" style={{ color: a.color }}>{a.date}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Consultation() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>Instant Consultation</h1>

      <div className="bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 rounded-2xl p-6 flex items-center gap-6">
        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Video className="w-8 h-8 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Connect with a doctor now</h3>
          <p className="text-sm text-muted-foreground mt-1">Average wait time: under 5 minutes · Available 24/7</p>
        </div>
        <button className="px-6 py-3 rounded-xl font-semibold text-primary-foreground flex-shrink-0 transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
          Start Now
        </button>
      </div>

      <h3 className="font-semibold" style={{ fontFamily: "Outfit, sans-serif" }}>Available Specialists</h3>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {doctors.map(d => (
          <div
            key={d.name}
            onClick={() => setSelected(selected === d.name ? null : d.name)}
            className={`bg-card border rounded-2xl p-5 cursor-pointer transition-all ${selected === d.name ? "border-primary/60" : "border-border hover:border-primary/30"}`}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={d.img} alt={d.name} className="w-14 h-14 rounded-xl object-cover bg-secondary" />
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-card ${d.available ? "bg-accent" : "bg-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{d.name}</p>
                <p className="text-sm text-muted-foreground">{d.specialty}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{d.rating}</span>
                  <span className={`text-xs font-medium ${d.available ? "text-accent" : "text-muted-foreground"}`}>
                    · {d.available ? "Available now" : "Next available"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{d.next}</p>
              </div>
            </div>
            {selected === d.name && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <button className="flex-1 py-2 rounded-xl text-sm font-medium text-primary-foreground" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
                  Video Call
                </button>
                <button className="flex-1 py-2 rounded-xl text-sm font-medium border border-border hover:border-primary/40 transition-all">
                  Book Appointment
                </button>
                <button className="flex-1 py-2 rounded-xl text-sm font-medium border border-border hover:border-primary/40 transition-all">
                  Chat
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MedicalRecords() {
  const [search, setSearch] = useState("");
  const filtered = records.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>Medical Records</h1>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
          <Plus className="w-4 h-4" /> Upload Record
        </button>
      </div>

      <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-2.5">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search records..."
          className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {filtered.map(r => (
          <div key={r.title} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {r.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold" style={{ fontFamily: "Outfit, sans-serif" }}>{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.doctor}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs bg-secondary px-2.5 py-0.5 rounded-full text-muted-foreground">{r.type}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{r.date}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Storage</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>2.4 GB used of 10 GB</span>
          <span>24%</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: "24%", background: "linear-gradient(90deg, #059669, #059669)" }} />
        </div>
      </div>
    </div>
  );
}

function EmergencyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(5,13,31,0.85)", backdropFilter: "blur(8px)" }}>
      <div className="bg-card border rounded-2xl p-8 max-w-sm w-full text-center" style={{ borderColor: "rgba(255,59,92,0.4)" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,59,92,0.15)", boxShadow: "0 0 40px rgba(255,59,92,0.3)" }}>
          <Phone className="w-9 h-9 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-destructive mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Emergency SOS</h2>
        <p className="text-muted-foreground text-sm mb-6">Activating emergency services. Your location is being shared with nearby hospitals and emergency contacts.</p>
        <div className="space-y-3">
          <button className="w-full py-3 rounded-xl font-bold text-white" style={{ background: "linear-gradient(135deg, #ff3b5c, #c41230)" }}>
            Call 911 Now
          </button>
          <button className="w-full py-3 rounded-xl font-semibold border border-border text-muted-foreground hover:text-foreground transition-colors" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emergency, setEmergency] = useState(false);

  const activeNav = navItems.find(n => n.id === view);

  return (
    <div className="min-h-screen bg-background flex" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes emergencyPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(255,59,92,0.5), 0 8px 32px rgba(255,59,92,0.3); }
          50% { box-shadow: 0 0 60px rgba(255,59,92,0.8), 0 8px 40px rgba(255,59,92,0.5); }
        }
      `}</style>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>MediCare AI</p>
              <p className="text-xs text-muted-foreground">Health Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setView(item.id as View); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                view === item.id
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {view === item.id && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={() => setEmergency(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #ff3b5c, #c41230)", boxShadow: "0 4px 20px rgba(255,59,92,0.35)" }}
          >
            <Phone className="w-4 h-4" /> Emergency SOS
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-semibold" style={{ fontFamily: "Outfit, sans-serif" }}>{activeNav?.label}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Live monitoring
            </div>
            <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-secondary">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&auto=format" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {view === "dashboard" && <Dashboard setView={setView} />}
          {view === "monitoring" && <HealthMonitoring />}
          {view === "symptoms" && <SymptomChecker />}
          {view === "hospitals" && <HospitalFinder />}
          {view === "reminders" && <Reminders />}
          {view === "consultation" && <Consultation />}
          {view === "records" && <MedicalRecords />}
        </main>
      </div>

      <EmergencyButton onClick={() => setEmergency(true)} />
      {emergency && <EmergencyModal onClose={() => setEmergency(false)} />}
    </div>
  );
}
