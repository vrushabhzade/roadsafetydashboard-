// Road Safety Guide Dashboard
// Single-file React + Tailwind + lucide-react. No backend, all mock data.
// Drop into a React + Vite (or CRA) project with Tailwind + lucide-react installed.

import React, { useState, useEffect, useMemo } from "react";
import {
  ShieldAlert,
  TriangleAlert,
  Clock,
  ShieldCheck,
  Car,
  MapPin,
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  Circle,
  Phone,
  Flame,
  Siren,
  Cross,
  ChevronDown,
  Activity,
  TrafficCone,
  Ban,
  Construction,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  CircleStop,
  Hand,
  School,
  Wrench,
  Droplet,
  Lightbulb,
  Eye,
  Gauge,
  Users,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                              MOCK DATA                                     */
/* -------------------------------------------------------------------------- */

const LOCATION = {
  city: "Pune",
  region: "Maharashtra, IN",
  coords: "18.5204° N, 73.8567° E",
};

const STATS = [
  {
    key: "accidents",
    label: "Reported Accidents (7d)",
    value: 1284,
    delta: -8.4,
    color: "rose",
    icon: AlertOctagon,
    sub: "Down vs last week",
  },
  {
    key: "violation",
    label: "Top Violation",
    value: "Speeding",
    delta: 32.7,
    color: "amber",
    icon: Gauge,
    sub: "32.7% of all tickets",
  },
  {
    key: "time",
    label: "Safest Travel Time",
    value: "10–11 AM",
    delta: "Lowest risk window",
    color: "emerald",
    icon: Clock,
    sub: "Avg severity: 0.8 / 5",
  },
  {
    key: "seatbelt",
    label: "Seatbelt Compliance",
    value: "84%",
    delta: 4.1,
    color: "sky",
    icon: ShieldCheck,
    sub: "Up 4.1% this month",
  },
];

const SAFETY_RULES = [
  {
    id: "before-driving",
    title: "Before Driving",
    icon: Wrench,
    color: "sky",
    rules: [
      "Inspect tires for tread depth and pressure weekly.",
      "Test brakes, headlights, indicators, and horn before leaving.",
      "Adjust mirrors and seat so you sit upright with elbows slightly bent.",
      "Plan your route and check weather, traffic, and road closures.",
      "Never drive under the influence of alcohol, drugs, or strong medication.",
    ],
  },
  {
    id: "while-driving",
    title: "While Driving",
    icon: Car,
    color: "emerald",
    rules: [
      "Buckle up — every passenger, every trip, every seat.",
      "Obey speed limits; reduce speed in rain, fog, or near schools.",
      "Maintain a 3-second following distance (more in poor conditions).",
      "Use indicators before every lane change or turn.",
      "Avoid mobile phones — pull over if a call is essential.",
    ],
  },
  {
    id: "night-bad-weather",
    title: "Night & Bad Weather",
    icon: Lightbulb,
    color: "indigo",
    rules: [
      "Use low beams in fog; high beams reflect back and reduce visibility.",
      "If visibility is near zero, pull off the road and switch on hazard lights.",
      "On wet roads, brake earlier and gentler — avoid sudden moves.",
      "In aquaplaning, ease off the accelerator — do not brake hard.",
      "At night, slow down: depth perception and color recognition drop.",
    ],
  },
  {
    id: "pedestrians-cyclists",
    title: "Pedestrians & Cyclists",
    icon: Users,
    color: "amber",
    rules: [
      "Pedestrians: cross at marked crossings; look both ways twice.",
      "Wear bright or reflective clothing after dusk.",
      "Cyclists: wear a helmet and use lights at night.",
      "Drivers: treat cyclists as vehicles — give 1.5 m clearance when passing.",
      "Watch for children near schools, parks, and residential streets.",
    ],
  },
  {
    id: "emergency",
    title: "In an Emergency",
    icon: Siren,
    color: "rose",
    rules: [
      "At the scene: secure the area, switch on hazard lights, set a warning triangle.",
      "Check for danger before helping — never move an injured person unless at risk.",
      "Call emergency services immediately. Note location and number of vehicles.",
      "Do not eat, drink, or use your phone near a fuel spill.",
      "Exchange details with other drivers; photograph damage if it is safe to do so.",
    ],
  },
];

const CHECKLIST = [
  { id: "tires", label: "Tire pressure & tread checked", icon: Gauge },
  { id: "brakes", label: "Brakes responsive", icon: Activity },
  { id: "lights", label: "Headlights, indicators & brake lights work", icon: Lightbulb },
  { id: "mirrors", label: "Mirrors & seat adjusted", icon: Eye },
  { id: "fluid", label: "Washer fluid topped up", icon: Droplet },
  { id: "fuel", label: "Fuel level above ¼ tank", icon: Flame },
  { id: "documents", label: "License, registration & insurance present", icon: ShieldCheck },
  { id: "firstaid", label: "First-aid kit & warning triangle in car", icon: Cross },
  { id: "seatbelt", label: "All passengers buckled before moving", icon: ShieldCheck },
  { id: "phone", label: "Phone on Do-Not-Disturb", icon: Phone },
];

const SIGN_TABS = [
  {
    id: "warning",
    label: "Warning",
    icon: TriangleAlert,
    signs: [
      { name: "Sharp bend ahead", icon: ArrowLeft, color: "amber" },
      { name: "Steep descent", icon: ArrowDown, color: "amber" },
      { name: "Steep ascent", icon: ArrowUp, color: "amber" },
      { name: "Two-way traffic", icon: ArrowLeft, color: "amber" },
      { name: "Pedestrian crossing", icon: Users, color: "amber" },
      { name: "School zone", icon: School, color: "amber" },
      { name: "Road works", icon: Construction, color: "amber" },
      { name: "Slippery road", icon: Droplet, color: "amber" },
    ],
  },
  {
    id: "regulatory",
    label: "Regulatory",
    icon: Ban,
    signs: [
      { name: "No entry", icon: Ban, color: "rose" },
      { name: "No parking", icon: Ban, color: "rose" },
      { name: "No overtaking", icon: Ban, color: "rose" },
      { name: "Speed limit", icon: Gauge, color: "rose" },
      { name: "Stop", icon: CircleStop, color: "rose" },
      { name: "Give way", icon: TriangleAlert, color: "rose" },
      { name: "One way", icon: ArrowRight, color: "rose" },
      { name: "Roundabout", icon: Activity, color: "rose" },
    ],
  },
  {
    id: "info",
    label: "Information",
    icon: Info,
    signs: [
      { name: "Parking", icon: MapPin, color: "sky" },
      { name: "Hospital", icon: Cross, color: "sky" },
      { name: "Fuel station", icon: Flame, color: "sky" },
      { name: "Restaurant", icon: Info, color: "sky" },
      { name: "Bus stop", icon: Users, color: "sky" },
      { name: "Rest area", icon: Info, color: "sky" },
      { name: "Pedestrian path", icon: Users, color: "sky" },
      { name: "Bike route", icon: Activity, color: "sky" },
    ],
  },
];

const ALERTS = [
  {
    id: 1,
    level: "critical",
    title: "Multi-vehicle pile-up on NH-48",
    detail: "3 lanes blocked near Katraj tunnel. Expect 45+ min delays.",
    time: "Just now",
    icon: AlertOctagon,
  },
  {
    id: 2,
    level: "warning",
    title: "Heavy congestion — MG Road",
    detail: "Slow traffic from Camp to Pune Station. Use FC Road instead.",
    time: "5 min ago",
    icon: TrafficCone,
  },
  {
    id: 3,
    level: "info",
    title: "Roadworks on Baner-Pashan Link",
    detail: "Single lane open. Resurfacing work in progress until 6 PM.",
    time: "22 min ago",
    icon: Construction,
  },
  {
    id: 4,
    level: "critical",
    title: "Tree fell across NDA Road",
    detail: "Both directions closed. Use Ganesh Khind Road as detour.",
    time: "38 min ago",
    icon: AlertTriangle,
  },
  {
    id: 5,
    level: "warning",
    title: "Waterlogging reported — Sinhagad Road",
    detail: "Avoid low-lying stretches near the petrol pump.",
    time: "1 h ago",
    icon: Droplet,
  },
  {
    id: 6,
    level: "info",
    title: "Fog advisory for Hadapsar bypass",
    detail: "Visibility ~40 m. Use low beams, reduce speed to 30 km/h.",
    time: "2 h ago",
    icon: Eye,
  },
];

/* -------------------------------------------------------------------------- */
/*                          SMALL REUSABLE PARTS                             */
/* -------------------------------------------------------------------------- */

const COLOR_MAP = {
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    ring: "ring-rose-200",
    chip: "bg-rose-100 text-rose-800",
    bar: "bg-rose-500",
    border: "border-rose-200",
    icon: "text-rose-600",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200",
    chip: "bg-amber-100 text-amber-800",
    bar: "bg-amber-500",
    border: "border-amber-200",
    icon: "text-amber-600",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
    chip: "bg-emerald-100 text-emerald-800",
    bar: "bg-emerald-500",
    border: "border-emerald-200",
    icon: "text-emerald-600",
  },
  sky: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    ring: "ring-sky-200",
    chip: "bg-sky-100 text-sky-800",
    bar: "bg-sky-500",
    border: "border-sky-200",
    icon: "text-sky-600",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    ring: "ring-indigo-200",
    chip: "bg-indigo-100 text-indigo-800",
    bar: "bg-indigo-500",
    border: "border-indigo-200",
    icon: "text-indigo-600",
  },
};

const ALERT_COLOR = {
  critical: "bg-rose-50 border-rose-300 text-rose-900",
  warning: "bg-amber-50 border-amber-300 text-amber-900",
  info: "bg-sky-50 border-sky-300 text-sky-900",
};

const ALERT_ICON_COLOR = {
  critical: "text-rose-600",
  warning: "text-amber-600",
  info: "text-sky-600",
};

/* -------------------------------------------------------------------------- */
/*                              HEADER                                       */
/* -------------------------------------------------------------------------- */

function Header() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const date = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 grid place-items-center shadow-md">
            <ShieldAlert className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              Road Safety Guide
            </h1>
            <p className="text-xs text-slate-500">
              Stay aware. Stay alive. Drive responsibly.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm"
            aria-label="Current local time"
          >
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span className="font-mono tabular-nums">{time}</span>
            <span className="hidden md:inline text-slate-500">· {date}</span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 text-sm"
            aria-label="Current location"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">{LOCATION.city}</span>
            <span className="hidden md:inline text-sky-700/70">
              · {LOCATION.coords}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                             STAT CARDS                                    */
/* -------------------------------------------------------------------------- */

function StatCard({ stat }) {
  const c = COLOR_MAP[stat.color];
  const Icon = stat.icon;
  const positive = typeof stat.delta === "number" && stat.delta > 0;

  return (
    <div
      className={`rounded-2xl p-5 ring-1 ${c.ring} ${c.bg} shadow-sm flex flex-col gap-3`}
      role="group"
      aria-label={stat.label}
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl bg-white grid place-items-center shadow-sm ${c.icon}`}>
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        {typeof stat.delta === "number" && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              positive ? "bg-emerald-100 text-emerald-700" : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {positive ? "▲" : "▼"} {Math.abs(stat.delta)}%
          </span>
        )}
        {typeof stat.delta === "string" && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white text-slate-600">
            {stat.delta}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-slate-600">{stat.label}</p>
        <p className={`text-2xl sm:text-3xl font-bold mt-1 ${c.text}`}>
          {stat.value}
        </p>
      </div>
      <p className="text-xs text-slate-500">{stat.sub}</p>
    </div>
  );
}

function StatGrid() {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      aria-label="Key safety statistics"
    >
      {STATS.map((s) => (
        <StatCard key={s.key} stat={s} />
      ))}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                          SAFETY RULES ACCORDION                           */
/* -------------------------------------------------------------------------- */

function SafetyRules() {
  const [open, setOpen] = useState("while-driving");

  return (
    <section
      className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5"
      aria-label="Safety rules by category"
    >
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="w-5 h-5 text-rose-600" aria-hidden="true" />
        <h2 className="text-lg font-bold text-slate-900">Safety Rules</h2>
        <span className="text-xs text-slate-500 ml-auto">
          {SAFETY_RULES.length} categories
        </span>
      </div>

      <div className="divide-y divide-slate-200">
        {SAFETY_RULES.map((cat) => {
          const c = COLOR_MAP[cat.color];
          const Icon = cat.icon;
          const isOpen = open === cat.id;
          return (
            <div key={cat.id}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : cat.id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${cat.id}`}
                className={`w-full flex items-center gap-3 py-3 text-left transition ${
                  isOpen ? "" : "hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg grid place-items-center ${c.bg} ${c.icon}`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="font-semibold text-slate-900 flex-1">
                  {cat.title}
                </span>
                <span className={`text-xs ${c.chip} px-2 py-0.5 rounded-full`}>
                  {cat.rules.length}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <ul
                  id={`panel-${cat.id}`}
                  className="pb-4 pl-12 space-y-2 text-sm text-slate-700"
                >
                  {cat.rules.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full ${c.bar}`}
                        aria-hidden="true"
                      />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                       PRE-TRIP CHECKLIST + PROGRESS                       */
/* -------------------------------------------------------------------------- */

function PreTripChecklist() {
  const [done, setDone] = useState(() =>
    new Set(["tires", "lights", "seatbelt"])
  );

  const toggle = (id) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => setDone(new Set());

  const progress = Math.round((done.size / CHECKLIST.length) * 100);

  const status = useMemo(() => {
    if (progress === 100)
      return { text: "All clear — drive safe!", color: "bg-emerald-500" };
    if (progress >= 70)
      return { text: "Almost ready", color: "bg-emerald-500" };
    if (progress >= 40)
      return { text: "Keep going", color: "bg-amber-500" };
    return { text: "Not yet road-ready", color: "bg-rose-500" };
  }, [progress]);

  return (
    <section
      className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5"
      aria-label="Pre-trip checklist"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />
          <h2 className="text-lg font-bold text-slate-900">Pre-Trip Checklist</h2>
        </div>
        <button
          onClick={reset}
          className="text-xs font-medium px-2 py-1 rounded-md text-slate-600 hover:bg-slate-100"
        >
          Reset
        </button>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
          <span className="font-medium">{status.text}</span>
          <span className="tabular-nums">
            {done.size} / {CHECKLIST.length} · {progress}%
          </span>
        </div>
        <div
          className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Checklist progress"
        >
          <div
            className={`h-full ${status.color} transition-all duration-300`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Items */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {CHECKLIST.map((item) => {
          const checked = done.has(item.id);
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-pressed={checked}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                  checked
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                {checked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                )}
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    checked ? "text-emerald-600" : "text-slate-500"
                  }`}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                       SIGN / SIGNAL REFERENCE GRID                       */
/* -------------------------------------------------------------------------- */

function SignReference() {
  const [tab, setTab] = useState("warning");
  const current = SIGN_TABS.find((t) => t.id === tab);

  return (
    <section
      className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5"
      aria-label="Sign and signal reference"
    >
      <div className="flex items-center gap-2 mb-4">
        <TrafficCone className="w-5 h-5 text-amber-600" aria-hidden="true" />
        <h2 className="text-lg font-bold text-slate-900">Sign & Signal Reference</h2>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Sign categories"
        className="flex p-1 bg-slate-100 rounded-xl mb-4"
      >
        {SIGN_TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              aria-controls={`sign-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition ${
                active
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div
        id={`sign-panel-${current.id}`}
        role="tabpanel"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {current.signs.map((sign, i) => {
          const c = COLOR_MAP[sign.color];
          const Icon = sign.icon;
          return (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${c.border} ${c.bg} text-center`}
            >
              <div
                className={`w-12 h-12 rounded-full grid place-items-center bg-white shadow-sm ${c.icon}`}
              >
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <p className="text-xs font-medium text-slate-800">{sign.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            LIVE ALERTS FEED                               */
/* -------------------------------------------------------------------------- */

function AlertsFeed() {
  return (
    <section
      className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5"
      aria-label="Live alerts"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
        </span>
        <h2 className="text-lg font-bold text-slate-900">Live Alerts</h2>
        <span className="ml-auto text-xs text-slate-500">
          {ALERTS.length} active · {LOCATION.city}
        </span>
      </div>

      <ul className="space-y-3 max-h-[28rem] overflow-y-auto pr-1">
        {ALERTS.map((a) => {
          const Icon = a.icon;
          return (
            <li
              key={a.id}
              className={`p-3 rounded-xl border-l-4 ${ALERT_COLOR[a.level]}`}
            >
              <div className="flex items-start gap-3">
                <Icon
                  className={`w-5 h-5 mt-0.5 shrink-0 ${ALERT_ICON_COLOR[a.level]}`}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm">{a.title}</p>
                    <span className="text-xs opacity-70 whitespace-nowrap">
                      {a.time}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5 opacity-80">{a.detail}</p>
                  <span
                    className={`inline-block mt-2 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      a.level === "critical"
                        ? "bg-rose-200 text-rose-900"
                        : a.level === "warning"
                        ? "bg-amber-200 text-amber-900"
                        : "bg-sky-200 text-sky-900"
                    }`}
                  >
                    {a.level}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           STICKY EMERGENCY FOOTER                         */
/* -------------------------------------------------------------------------- */

const EMERGENCY_BUTTONS = [
  {
    label: "Police",
    number: "100",
    icon: ShieldAlert,
    color: "bg-rose-600 hover:bg-rose-700",
  },
  {
    label: "Ambulance",
    number: "108",
    icon: Cross,
    color: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    label: "Fire",
    number: "101",
    icon: Flame,
    color: "bg-amber-600 hover:bg-amber-700",
  },
  {
    label: "Highway Help",
    number: "1033",
    icon: Siren,
    color: "bg-sky-600 hover:bg-sky-700",
  },
];

function EmergencyFooter() {
  return (
    <footer className="sticky bottom-0 z-30 bg-slate-900 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 pr-3 mr-1 border-r border-slate-700">
            <Phone className="w-5 h-5 text-rose-400" aria-hidden="true" />
            <span className="text-sm font-semibold">Emergency</span>
          </div>
          <div className="grid grid-cols-2 sm:flex sm:flex-1 gap-2 sm:gap-2">
            {EMERGENCY_BUTTONS.map((b) => {
              const Icon = b.icon;
              return (
                <a
                  key={b.label}
                  href={`tel:${b.number}`}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${b.color} shadow-md focus:outline-none focus:ring-2 focus:ring-white/60`}
                  aria-label={`Call ${b.label} at ${b.number}`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{b.label}</span>
                  <span className="font-mono tabular-nums opacity-90">
                    {b.number}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                                APP                                        */
/* -------------------------------------------------------------------------- */

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <StatGrid />

        {/* Two-column grid for content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SafetyRules />
            <PreTripChecklist />
            <SignReference />
          </div>

          <div className="lg:col-span-1">
            <AlertsFeed />
          </div>
        </div>
      </main>

      <EmergencyFooter />
    </div>
  );
}
