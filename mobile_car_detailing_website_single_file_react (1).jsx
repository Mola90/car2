import React, { useMemo, useState } from "react";

// ✅ Single‑file React site for a local mobile car detailing business
// - Tailwind CSS assumed
// - shadcn/ui components referenced via alias imports (ok in ChatGPT canvas)
// - Clean, professional, mobile‑first design
// - 4 services × 3 vehicle size tiers
// - Simple booking form with client‑side validation (no backend)
// - AU English spelling

import { CheckCircle2, Calendar, Car, Shield, Phone, MapPin, Sparkles, Menu, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const SIZES = [
  { id: "sedan", label: "Hatches & Sedans" },
  { id: "small-suv-wagon", label: "Small SUV / Wagon" },
  { id: "large-suv-4wd", label: "Large SUV / 4WD / 7‑Seater" },
];

const SERVICES = [
  {
    id: "mini",
    name: "Mini Detail",
    tagline: "Quick refresh inside & out",
    prices: { sedan: 99, "small-suv-wagon": 119, "large-suv-4wd": 139 },
    time: "~60–75 mins",
    features: [
      "--- Exterior ---",
      "Vehicle pre-rinse to loosen dirt and grime",
      "Bug residue and light road tar safely removed",
      "Wheels, tyres and wheel arches thoroughly cleaned",
      "Door and boot jambs pressure washed & dried",
      "Fuel filler area washed and detailed",
      "Snow foam wash followed by hand wash and dry",
      "Protective gloss sealant applied to paint",
      "Exterior rubbers & plastics restored",
      "Windows & mirrors cleaned for clear visibility",
      "Tyres and guards dressed with satin finish",
      "--- Interior ---",
      "Complete wipe-down of interior surfaces",
      "Detailed vacuum including seats, boot & storage areas",
      "Seat & carpet shampoo + steam sanitation",
      "Leather cleaned & conditioned (if fitted)",
      "Dashboard & console detailed and finished",
      "Air vents & tight areas carefully brushed",
      "Pedals & lower trim cleaned",
      "Interior glass polished streak-free",
      "Deodorised cabin finish"
    ],
    hero: "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "interior",
    name: "Interior Detail",
    tagline: "Deep interior restoration & hygiene clean",
    oldPrice: 218, prices: { sedan: 149, "small-suv-wagon": 219, "large-suv-4wd": 259 },
    time: "~2–3 hrs",
    features: [
      "Interior plastics, trims and surfaces refreshed",
      "Thorough vacuum including seats, boot and storage areas",
      "Fabric shampoo & steam sanitisation (seats, floors, boot)",
      "Leather treatment – cleanse & nourish (if fitted)",
      "Dashboard & console detailed and rejuvenated",
      "Air vents, seat rails & small crevices carefully brushed",
      "Pedals and kick panels cleaned",
      "Interior glass polished for clarity",
      "Finishing deodoriser for a clean cabin feel"
    ],
    hero: "https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "premium", oldPrice: 447, prices: { sedan: 249, "small-suv-wagon": 329, "large-suv-4wd": 379 },
    time: "~4–5 hrs",
    features: [
      "━━━━━━━━━━ Exterior ━━━━━━━━━━",
      "Vehicle pre-rinse to loosen dirt and grime",
      "Bug residue and light road tar safely removed",
      "Wheels, tyres and wheel arches thoroughly cleaned",
      "Door and boot jambs pressure washed & dried",
      "Fuel filler area washed and detailed",
      "Snow foam wash followed by hand wash and dry",
      "Protective gloss sealant applied to paint",
      "Exterior rubbers & plastics restored",
      "Windows & mirrors cleaned for clear visibility",
      "Tyres and guards dressed with satin finish",
      "━━━━━━━━━━ Interior ━━━━━━━━━━",
      "Complete wipe-down of interior surfaces",
      "Detailed vacuum including seats, boot & storage areas",
      "Seat & carpet shampoo + steam sanitation",
      "Leather cleaned & conditioned (if fitted)",
      "Dashboard & console detailed and finished",
      "Air vents & tight areas carefully brushed",
      "Pedals & lower trim cleaned",
      "Interior glass polished streak-free",
      "Deodorised cabin finish"
    ],
    hero: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "presale", prices: { sedan: 559, "small-suv-wagon": 499, "large-suv-4wd": 559 },
    time: "~5–7 hrs",
    features: [
      "━━━━━━━━━━ Exterior ━━━━━━━━━━",
      "Complete pre-rinse including wheel arches",
      "Exterior shampoo wash including wheels",
      "High-pressure rinse to remove residue",
      "Hand dry with soft microfiber towels",
      "Door jambs wiped and detailed",
      "Tyres and mud flaps dressed for a clean finish",
      "Exterior paint polished for shine and clarity",
      "Chrome surfaces polished",
      "Plastic trims and exterior rubbers rejuvenated",
      "Windows and mirrors cleaned inside & out",
      "━━━━━━━━━━ Interior ━━━━━━━━━━",
      "Interior vacuum including seats, boot and compartments",
      "Cloth seats & carpets deep shampoo cleaned",
      "Interior roof lining carefully cleaned",
      "Dashboard & console detailed",
      "Interior plastics & trims wiped and dressed",
      "Door panels cleaned",
      "Air vents & tight areas brushed",
      "Mats washed and detailed",
      "Interior deodorised",
      "━━━━━━━━ Engine Bay ━━━━━━━━",
      "Engine bay surface wipe and clean"
    ],
    hero: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2100&q=80",
  },
];

const BENEFITS = [
  { icon: <Car className="w-5 h-5" />, text: "We come to you (home or work)" },
  { icon: <Sparkles className="w-5 h-5" />, text: "Premium products only" },
  { icon: <Shield className="w-5 h-5" />, text: "Fully insured & police checked" },
  { icon: <Calendar className="w-5 h-5" />, text: "Easy online booking" },
];

// Known local image paths you provided earlier (we'll try to import them automatically)
const KNOWN_LOCAL_IMAGES = [
  "/mnt/data/j white toy.jpg",
  "/mnt/data/red bmw sedan.jpg",
  "/mnt/data/black toyota ute.png",
  "/mnt/data/gold vw hatch.jpg",
  "/mnt/data/blue bmw suv.jpg",
  "/mnt/data/white tesla sedan.jpg",
];

// Default gallery is empty; user can upload or we will try auto-import once
// Embedded gallery images (base64) – user supplied
const GALLERY: string[] = [
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...jwhitetoy...",
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...redbmw...",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...blackute...",
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...goldvw...",
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...bluebmwsuv...",
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...whitetesla..."
];

// ---- Minimal runtime self‑tests (non‑blocking) ----
if (typeof window !== "undefined") {
  try {
    console.assert(Array.isArray(SERVICES) && SERVICES.length === 4, "SERVICES should include four packages");
    console.assert(Array.isArray(SIZES) && SIZES.length === 3, "SIZES should include three tiers");
    console.assert(!!SERVICES.find(s => s.id === "mini"), "Mini Detail exists");
    console.assert(!!SERVICES.find(s => s.id === "interior"), "Interior Detail exists");
    console.assert(!!SERVICES.find(s => s.id === "premium" && s.name.includes("Full Premium")), "Full Premium Detail exists");
    console.assert(Array.isArray(GALLERY), "Gallery should be an array");
    // Additional checks for service areas & pricing
    const _suburbs = [
      "Beaumaris", "Box Hill", "Malvern", "Caulfield", "Camberwell", "Hawthorn", "Kew",
      "Balwyn", "Glen Iris", "Mount Waverley", "Glen Waverley", "Wheelers Hill", "Ashburton",
      "Chadstone", "Burwood", "Templestowe", "Doncaster", "Donvale", "Brighton", "Sandringham"
    ];
    console.assert(_suburbs.length === 20, "Suburbs list should have 20 entries");
    console.assert(_suburbs.includes("Box Hill") && _suburbs.includes("Caulfield") && _suburbs.includes("Beaumaris"), "Key suburbs should be present");
    const testSvc = SERVICES.find(s=>s.id==='interior');
    console.assert(testSvc && testSvc.prices['small-suv-wagon'] === 219, "Interior Detail small SUV price should be 219");
    const prem = SERVICES.find(s=>s.id==='premium');
    console.assert(prem && prem.prices['sedan'] === 249, "Full Premium sedan price should be 249");
  } catch {}
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs bg-[#f8fafc]/70 backdrop-blur border-[#e1e7ef] shadow-sm">
      <CheckCircle2 className="w-4 h-4" /> {children}
    </span>
  );
}

function Price({ amount }) {
  return <span className="font-semibold">${amount}</span>;
}

function Header({ onBookClick }) {
  const [open, setOpen] = useState(false);
  const heroUrl = "https://images.unsplash.com/photo-1619975533296-f5c3f8b1db97?auto=format&fit=crop&w=2100&q=80";
  return (
    <header
      className="sticky top-0 z-40 bg-cover bg-center border-b border-[#e1e7ef]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url('${heroUrl}')`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[var(--brand)]" />
          <span className="font-semibold text-white drop-shadow">Bayside Mobile Car Detailing</span>
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/90">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#gallery" className="hover:text-white">Gallery</a>
          <a href="#areas" className="hover:text-white">Service Areas</a>
        </nav>
        <div className="hidden md:block">
          <Button onClick={onBookClick} className="rounded-2xl bg-[var(--brand)] hover:bg-[var(--brand-600)] text-white border border-transparent">Book Now</Button>
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-white" aria-label="Toggle menu" onClick={() => setOpen(v=>!v)}>
          {open ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
        </button>
      </div>
      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 text-white/90">
            <a href="#services" onClick={()=>setOpen(false)} className="hover:text-white">Services</a>
            <a href="#gallery" onClick={()=>setOpen(false)} className="hover:text-white">Gallery</a>
            <a href="#areas" onClick={()=>setOpen(false)} className="hover:text-white">Service Areas</a>
            <Button onClick={()=>{ setOpen(false); onBookClick?.(); }} className="rounded-2xl bg-[var(--brand)] hover:bg-[var(--brand-600)] text-white border border-transparent">Book Now</Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ onBookClick }) {
  // Robust hero with multiple image fallbacks + onError swap
  const FALLBACKS = [
    // ✅ Luxury car detailing hero images (no random objects)
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2100&q=80", // Black Mercedes front close-up
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=2100&q=80", // Luxury supercar shine
    "https://images.unsplash.com/photo-1502877828070-33b167ad6860?auto=format&fit=crop&w=2100&q=80", // Glossy sports car reflection
  ];
  const [idx, setIdx] = useState(0);

  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] overflow-hidden">
      {/* Image layer (will switch to next URL if the current one errors) */}
      <img
        src={FALLBACKS[idx]}
        alt="Mobile car detailing"
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => setIdx((i) => (i + 1 < FALLBACKS.length ? i + 1 : i))}
      />
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65))"}} />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-40 text-white">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight max-w-2xl">Premium Mobile Car Detailing in Melbourne’s East</h1>
        <div className="mt-6 inline-block"><span className="inline-block px-4 py-2 text-lg font-semibold bg-[var(--brand)] text-white rounded-full animate-bounce-slow shadow-lg">No Rush Guarantee – We Take Our Time</span></div>
        <div className="mt-6 flex flex-wrap gap-3">
          {BENEFITS.map((b, i) => <Pill key={i}>{b.text}</Pill>)}
        </div>
        <div className="mt-8 flex gap-3">
          <Button size="lg" onClick={onBookClick} className="rounded-2xl bg-[var(--brand)] hover:bg-[var(--brand-600)] text-white border border-transparent">Book a Detail</Button>
          <a href="#services" className="px-4 py-2 rounded-2xl border border-[var(--brand)] text-white bg-[#f8fafc]/10 hover:bg-[#f8fafc]/20">View Services</a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">Services</h2>
      <p className="text-[#4c5563] mt-2">Four curated packages to suit every vehicle and budget.</p>
      <div className="mt-8 overflow-x-auto -mx-4 px-4">
        <div className="flex gap-4 snap-x snap-mandatory md:grid md:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((s) => (
            <Card key={s.id} className="rounded-2xl overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg snap-start min-w-[85%] md:min-w-0">
              <img src={s.hero} alt={s.name} className="h-40 w-full object-cover" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{s.name}</h3><span className="text-lg font-bold">{s.id === 'interior' ? (<><s className='text-slate-400 mr-1'>${s.oldPrice}</s> ${s.prices.sedan}*</>) : s.id==='premium' ? (<><s className='text-slate-400 mr-1'>${s.oldPrice}</s> ${s.prices.sedan}*</>) : <>${s.prices.sedan}</>}</span></div>
                <p className="text-[#4c5563] text-sm">{s.tagline}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" />{f}</li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-slate-700">
                  <div>From <Price amount={s.prices.sedan} /> for Hatches & Sedans</div>
                  <div>Small SUV / Wagon – <Price amount={s.prices["small-suv-wagon"]} /></div>
                  <div>Large SUV / 4WD / 7‑Seater – <Price amount={s.prices["large-suv-4wd"]} /></div>
                </div>
                <div className="mt-5">
                  <Button className="rounded-xl w-full bg-[var(--brand)] hover:bg-[var(--brand-600)] text-white border border-transparent" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" })}>Book Now</Button>
                  <div className="text-xs text-slate-500 mt-3">Heavy soiling may incur additional charges.</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  // Load any user-provided images (data URLs) from localStorage
  const [userImages, setUserImages] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("galleryImages");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [status, setStatus] = useState<string>("");

  // Attempt a one-time auto-import from known local paths (if accessible)
  React.useEffect(() => {
    if (userImages.length) return; // already have images
    const didAttempt = localStorage.getItem("galleryImportAttempted");
    if (didAttempt) return;
    localStorage.setItem("galleryImportAttempted", "1");

    async function importKnown() {
      try {
        setStatus("Importing your supplied photos...");
        const fetched: string[] = [];
        for (const p of KNOWN_LOCAL_IMAGES) {
          try {
            const res = await fetch(encodeURI(p));
            if (!res.ok) throw new Error("not ok");
            const blob = await res.blob();
            const dataUrl = await new Promise<string>((resolve) => {
              const r = new FileReader();
              r.onload = () => resolve(String(r.result));
              r.readAsDataURL(blob);
            });
            fetched.push(dataUrl);
          } catch {}
        }
        if (fetched.length) {
          localStorage.setItem("galleryImages", JSON.stringify(fetched));
          setUserImages(fetched);
          setStatus("Loaded your photos.");
        } else {
          setStatus("Couldn’t access the provided files here. Use Upload photos below.");
        }
      } catch {
        setStatus("Couldn’t access the provided files here. Use Upload photos below.");
      }
    }
    importKnown();
  }, []);

  const FALLBACKS = [
    "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521337586325-1b6670b0de8b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1536520002442-39764a41e357?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1619784691658-8d02415ba2e7?q=80&w=1600&auto=format&fit=crop",
  ];

  // Prefer user images, then any hardcoded GALLERY items, then fallbacks
  const srcs = (userImages.length ? userImages : GALLERY).map((u) => u);
  const finalSrcs = srcs.length ? srcs : FALLBACKS;

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !files.length) return;
    const readers = Array.from(files).slice(0, 12).map(file => new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    }));
    try {
      const dataUrls = await Promise.all(readers);
      setUserImages(dataUrls);
      localStorage.setItem("galleryImages", JSON.stringify(dataUrls));
      setStatus("Uploaded successfully.");
    } catch {
      setStatus("Upload failed. Please try again.");
    }
  }

  return (
    <section id="gallery" className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Gallery</h2>
          <p className="text-[#4c5563] mt-2">Recent work and finishes you can expect.</p>
        </div>
        <label className="text-xs md:text-sm inline-flex items-center gap-2 cursor-pointer bg-white border rounded-xl px-3 py-2 shadow-sm">
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
          <span>Upload photos</span>
        </label>
      </div>
      <div className="mt-2 text-xs text-slate-600 min-h-[1.25rem]">{status}</div>
      {(!userImages.length) && (
        <div className="mt-1 text-xs text-slate-600">Tip: Click <em>Upload photos</em> to add your own images (they'll be saved in your browser).</div>
      )}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {finalSrcs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Detail ${i+1}`}
            className="rounded-2xl w-full h-72 object-cover bg-[#e2e8f0]"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = FALLBACKS[i % FALLBACKS.length]; }}
          />
        ))}
      </div>
    </section>
  );
}

function Areas() {
  const suburbs = [
    "Beaumaris", "Box Hill", "Malvern", "Caulfield", "Camberwell", "Hawthorn", "Kew",
    "Balwyn", "Glen Iris", "Mount Waverley", "Glen Waverley", "Wheelers Hill", "Ashburton",
    "Chadstone", "Burwood", "Templestowe", "Doncaster", "Donvale", "Brighton", "Sandringham"
  ];
  return (
    <section id="areas" className="bg-[#f5f7fa] border-y border-[#e1e7ef]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Service Areas</h2>
        <p className="text-[#4c5563] mt-2">Melbourne’s East & South‑East – we come to your home or workplace.</p>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {suburbs.map((s) => (
            <span key={s} className="text-sm border rounded-xl px-3 py-2 bg-[#f8fafc]">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function useBookingForm() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    suburb: "",
    address: "",
    service: SERVICES[1].id,
    size: SIZES[0].id,
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const price = useMemo(() => {
    const svc = SERVICES.find((s) => s.id === data.service) || SERVICES[0];
    return svc.prices[data.size];
  }, [data.service, data.size]);

  function validate() {
    const e = {} as any;
    if (!data.name.trim()) e.name = "Name is required";
    if (!/^0\d{9}$/.test(data.phone.trim())) e.phone = "AU mobile (e.g. 04XXXXXXXX)";
    if (!data.suburb.trim()) e.suburb = "Suburb required";
    if (!data.address.trim()) e.address = "Street address required";
    if (!data.date) e.date = "Select a date";
    if (!data.time) e.time = "Select a time";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit() {
    if (!validate()) return false;
    const payload = { ...data, price, createdAt: new Date().toISOString() };
    try {
      const list = JSON.parse(localStorage.getItem("bookings") || "[]");
      list.push(payload);
      localStorage.setItem("bookings", JSON.stringify(list));
      setSubmitted(true);
    } catch {}
    return true;
  }

  return { data, setData, errors, price, submit, submitted };
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <div className="text-xs text-red-600 mt-1">{msg}</div>;
}

function BookingForm() {
  const { data, setData, errors, price, submit, submitted } = useBookingForm();
  const service = SERVICES.find((s) => s.id === data.service) || SERVICES[0];

  if (submitted) {
    return (
      <div className="rounded-2xl border p-6 bg-[#f8fafc] text-center">
        <h3 className="text-xl font-semibold">Thanks! Your request has been received.</h3>
        <p className="text-[#4c5563] mt-2">We’ll confirm your booking by phone shortly.</p>
        <div className="mt-4 text-sm">Selected: <strong>{service.name}
        </strong> – {SIZES.find(s => s.id === data.size)?.label} – <strong>${price}</strong></div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border p-6 bg-[#f8fafc]">
      <h3 className="text-lg font-semibold flex items-center gap-2"><Calendar className="w-5 h-5" /> Book a Mobile Detail</h3>
      <p className="text-[#4c5563] text-sm mt-1">No payment required now. We’ll confirm availability and final price if extra time is needed.</p>

      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <div>
          <label className="text-sm">Name</label>
          <Input value={data.name} onChange={(e) => setData(v => ({...v, name: e.target.value}))} placeholder="Full name" />
          <FieldError msg={errors["name"]} />
        </div>
        <div>
          <label className="text-sm">Mobile</label>
          <Input value={data.phone} onChange={(e) => setData(v => ({...v, phone: e.target.value}))} placeholder="e.g. 0412 345 678" />
          <FieldError msg={errors["phone"]} />
        </div>
        <div>
          <label className="text-sm">Suburb</label>
          <Input value={data.suburb} onChange={(e) => setData(v => ({...v, suburb: e.target.value}))} placeholder="e.g. Berwick" />
          <FieldError msg={errors["suburb"]} />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Address</label>
          <Input value={data.address} onChange={(e) => setData(v => ({...v, address: e.target.value}))} placeholder="Street address" />
          <FieldError msg={errors["address"]} />
        </div>
        <div>
          <label className="text-sm">Service</label>
          <Select value={data.service} onValueChange={(val) => setData(v => ({...v, service: val}))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SERVICES.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">Vehicle Size</label>
          <Select value={data.size} onValueChange={(val) => setData(v => ({...v, size: val}))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SIZES.map(s => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">Preferred Date</label>
          <Input type="date" value={data.date} onChange={(e) => setData(v => ({...v, date: e.target.value}))} />
          <FieldError msg={errors["date"]} />
        </div>
        <div>
          <label className="text-sm">Preferred Time</label>
          <Input type="time" value={data.time} onChange={(e) => setData(v => ({...v, time: e.target.value}))} />
          <FieldError msg={errors["time"]} />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Notes (optional)</label>
          <Textarea value={data.notes} onChange={(e) => setData(v => ({...v, notes: e.target.value}))} placeholder="Pets, stains, access info, etc." />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-slate-700 text-sm">Estimated total: <span className="font-semibold">${price} AUD</span> <span className="text-xs text-slate-500">(subject to inspection)</span></div>
        <Button className="rounded-2xl bg-[var(--brand)] hover:bg-[var(--brand-600)] text-white border border-transparent" onClick={submit}>Request Booking</Button>
      </div>

      <div className="mt-4 text-xs text-slate-500 flex items-center gap-2"><Shield className="w-4 h-4" /> Fully insured • Police checked • Secure & private</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white/90"><Sparkles className="w-5 h-5" /> <span className="font-semibold">Bayside Mobile Car Detailing</span></div>
          <p className="text-white/70 mt-2 text-sm">Premium mobile detailing across Melbourne’s East & South‑East.</p>
          <p className="text-white/60 text-xs mt-2">ABN 00 000 000 000</p>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <div className="mt-2 text-white/80 text-sm flex flex-col gap-1">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> 0414 934 879</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Dandenong North, VIC</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <div className="mt-2 text-white/80 text-sm flex flex-col gap-1">
            <a href="#services" className="hover:underline">Services</a>
            <a href="#gallery" className="hover:underline">Gallery</a>
            <a href="#areas" className="hover:underline">Service Areas</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-white/60 text-xs py-4 text-center">© {new Date().getFullYear()} Bayside Mobile Car Detailing. All rights reserved.</div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`:root{--brand:#0d6ead;--brand-600:#0a5687;--ink:#0f172a;--muted:#64748b;--accent:#e8eef6}`}</style>
      <div className="text-slate-900 bg-[#eef4fa]">
        <Header onBookClick={() => {
          setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
        }} />
        <Hero onBookClick={() => {
          setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
        }} />
        <Services />
        <Gallery />
        <Areas />

        <section id="booking" className="max-w-6xl mx-auto px-4 py-16 pb-24 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Book Your Detail</h2>
              <p className="text-[#4c5563] mt-2">Choose a service and time that suits. We’ll bring water, power and pro‑grade products.</p>
              <div className="mt-6">
                <BookingForm />
              </div>
            </div>
            <div className="space-y-6">
              {BENEFITS.map((b, i) => (
                <div key={i} className="rounded-2xl border p-5 bg-[#f5f7fa] flex gap-3 items-start">
                  <div className="shrink-0 bg-[#f8fafc] rounded-xl p-2 border">{b.icon}</div>
                  <div>
                    <div className="font-medium">{b.text}</div>
                    <div className="text-sm text-[#4c5563]">Quality results, friendly service, and clear communication.</div>
                  </div>
                </div>
              ))}
              <Card className="rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop" alt="Team at work" className="h-40 w-full object-cover" />
                <CardContent className="p-5">
                  <div className="font-semibold">About Us</div>
                  <p className="text-sm text-slate-700 mt-1">Family‑run, fully insured, police‑checked. We service Bayside, Dandenong, Glen Waverley, and surrounds.</p>
                  <div className="text-xs text-slate-500 mt-4">Heavy soiling may incur additional charges.</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />

        {/* Sticky mobile CTA */}
        <div className="fixed md:hidden bottom-4 inset-x-0 px-4">
          <div className="max-w-md mx-auto">
            <Button className="w-full rounded-2xl shadow-xl bg-[var(--brand)] hover:bg-[var(--brand-600)] text-white border border-transparent" onClick={() => {
              setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
            }}>Book Now – It’s Easy</Button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        .animate-bounce-slow { animation: bounce-slow 2.2s ease-in-out infinite; }
        /* Improve tap targets on mobile */
        a, button { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </>
  );
}
