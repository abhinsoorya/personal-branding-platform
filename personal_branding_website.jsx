import React, { useState, useRef } from "react";

// Personal Branding & NFC Business Card - Single-file React + Tailwind component
// Default export: App
// Notes: Uses Tailwind CSS classes. Replace placeholder images/links with your own assets.

export default function App() {
  // Sample profile state (editable via Web Editor)
  const [profile, setProfile] = useState({
    name: "Abhin",
    title: "Product Designer & NFC Creator",
    tagline: "Designing delightful experiences — one tap at a time.",
    heroImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUQnHOek1-3BzMXEtFhyHVc0D5z-pEyRn8Fq8cUX43-G-QhdiHZMt_b5wcYzbhkc3qiqI&usqp=CAU"
    ,
    heroVideo: "",
    email: "abhinsoorya2007@gmail.com",
      phone: "+91 628291354",
    company: "BrandTap Labs",
    website: "https://your-profile.example.com",
    about:
      "I help startups and creators ship beautiful product experiences, and craft digital business cards that actually get used.",
  });

  const [projects] = useState([
    {
      id: 1,
      title: "NFC Portfolio Card",
      desc: "Custom NFC profiles with analytics and instant sharing.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
      link: "#",
    },
    {
      id: 2,
      title: "Mobile App Dashboard",
      desc: "On-the-go editing and live preview for your landing profile.",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60",
      link: "#",
    },
    {
      id: 3,
      title: "Enterprise NFC Kit",
      desc: "Branded cards, packaging, and fulfillment for teams.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
      link: "#",
    },
  ]);

  const [timeline] = useState([
    { year: "2020", event: "Launched BrandTap MVP" },
    { year: "2021", event: "10K cards fulfilled" },
    { year: "2023", event: "Partnered with 50+ agencies" },
    { year: "2024", event: "Introduced analytics & dashboard" },
  ]);

  const [testimonials] = useState([
    {
      name: "Priya K.",
      role: "Founder, BloomTech",
      quote:
        "Our conversion rate from conferences rose 40% after switching to BrandTap cards.",
    },
    {
      name: "Marco S.",
      role: "Head of Sales, Nova",
      quote: "Instant sharing + analytics = game changer for field teams.",
    },
  ]);

  const [editorOpen, setEditorOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Save vCard (one-click contact save)
  function downloadVCard() {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${profile.name}\nORG:${profile.company}\nTITLE:${profile.title}\nTEL;TYPE=work,VOICE:${profile.phone}\nEMAIL:${profile.email}\nURL:${profile.website}\nNOTE:${profile.tagline}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Simulate NFC tap (open profile)
  function simulateNFCTap() {
    // In production the NFC tag would store profile.website or a short URL
    window.open(profile.website || "#", "_blank");
  }

  // Editor save
  function handleEditorSave(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const updated = {
      name: form.get("name"),
      title: form.get("title"),
      tagline: form.get("tagline"),
      email: form.get("email"),
      phone: form.get("phone"),
      company: form.get("company"),
      website: form.get("website"),
      about: form.get("about"),
    };
    setProfile((p) => ({ ...p, ...updated }));
    setEditorOpen(false);
  }

  // Handle image upload (hero image)
  function handleHeroUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((p) => ({ ...p, heroImage: url }));
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
            {profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div>
            <div className="font-semibold">{profile.name}</div>
            <div className="text-sm text-gray-500">{profile.title}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditorOpen(true)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-sm"
          >
            Edit profile
          </button>
          <button
            onClick={downloadVCard}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm shadow"
          >
            Save contact
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6 items-center">
        <div className="space-y-4">
          <div className="text-sm text-indigo-600 font-medium">Personal Branding · NFC · Portfolio</div>
          <h1 className="text-4xl font-extrabold">{profile.name}</h1>
          <p className="text-lg text-gray-700">{profile.tagline}</p>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={simulateNFCTap}
              className="px-4 py-3 bg-emerald-600 text-white rounded-lg shadow-sm text-sm"
            >
              Tap to share (simulate)
            </button>
            <button
              onClick={downloadVCard}
              className="px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white"
            >
              Save contact
            </button>
            <a
              href="#portfolio"
              className="px-4 py-3 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 text-sm"
            >
              View portfolio
            </a>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <strong>Works at:</strong> {profile.company} · <strong>Email:</strong> {profile.email}
          </div>
        </div>

        <div className="relative">
          <img
            src={profile.heroImage}
            alt="hero"
            className="rounded-2xl shadow-lg object-cover w-full h-80 md:h-96"
          />
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur rounded-xl p-3 flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">A</div>
            <div>
              <div className="text-sm font-semibold">{profile.name}</div>
              <div className="text-xs text-gray-600">{profile.title}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <a key={p.id} href={p.link} className="group block bg-white rounded-xl shadow p-4">
              <div className="h-40 rounded-lg overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transform group-hover:scale-105 transition" />
              </div>
              <div className="mt-3">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600">{p.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Milestones</h2>
        <div className="relative">
          <div className="border-l-2 border-gray-200 pl-6">
            {timeline.map((t, i) => (
              <div key={i} className="mb-8">
                <div className="absolute -ml-8 mt-1 w-6 h-6 rounded-full bg-indigo-600 border-2 border-white shadow" />
                <div className="text-sm text-indigo-600 font-semibold">{t.year}</div>
                <div className="text-lg font-medium">{t.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Spotlight */}
      <section className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow mt-6">
        <h2 className="text-2xl font-bold mb-2">Company Spotlight</h2>
        <p className="text-gray-600 mb-4">Products & Services · Testimonials</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold">Products & Services</h3>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li>• NFC Business Cards & Keychains</li>
              <li>• Branded Landing Profiles</li>
              <li>• Dashboard & Analytics</li>
              <li>• Fulfillment & Team Kits</li>
            </ul>
            <div className="mt-4">
              <a href="#" className="text-sm inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white">Explore offerings</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">What clients say</h3>
            <div className="mt-3 space-y-4">
              {testimonials.map((t, i) => (
                <blockquote key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm">"{t.quote}"</div>
                  <div className="text-xs text-gray-500 mt-2">— {t.name}, {t.role}</div>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NFC Card Section */}
      <section className="max-w-6xl mx-auto p-6 mt-6">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold">NFC Card</h2>
            <p className="text-gray-600 mt-2">Tap-to-Share · Custom Branding · Analytics</p>
            <ul className="mt-4 text-gray-700 space-y-2">
              <li>• Tap-to-Share instant profile launch</li>
              <li>• Custom logo, colors, and premium finishes</li>
              <li>• Analytics for taps, locations, and device breakdown</li>
            </ul>

            <div className="mt-4 flex gap-3">
              <button onClick={simulateNFCTap} className="px-4 py-2 rounded-lg bg-emerald-600 text-white">Simulate Tap</button>
              <a href="#" className="px-4 py-2 rounded-lg border border-gray-200">Customize card</a>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-indigo-50 via-white to-pink-50 rounded-xl p-6">
            <div className="w-full h-44 rounded-lg shadow-inner bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold text-lg">NFC Card Preview</div>
                <div className="text-sm text-gray-600 mt-2">{profile.name} — Tap to share</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">Tip: NFC works on most Android devices and iPhones (iPhone 7+ with background tag reading enabled).</div>
          </div>
        </div>
      </section>

      {/* Smart Management */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold">Smart Management</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">Web Editor Dashboard</h3>
            <p className="text-gray-600 mt-2">Update profile, media, links, and analytics from the dashboard instantly.</p>
            <div className="mt-4">
              <button onClick={() => setEditorOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Open editor</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">Android App Mobility</h3>
            <p className="text-gray-600 mt-2">Edit on-the-go with our Android app — update your profile, track taps, manage team cards.</p>
            <div className="mt-4 flex gap-3">
              <a className="px-4 py-2 border rounded-lg" href="#">Get on Android</a>
              <a className="px-4 py-2 border rounded-lg" href="#">Get on iOS</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto p-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.company}. Built with ♥.
      </footer>

      {/* Editor Modal */}
      {editorOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleEditorSave} className="bg-white rounded-xl max-w-2xl w-full p-6 shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Edit profile</h3>
              <button type="button" onClick={() => setEditorOpen(false)} className="text-gray-500">Close</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <input name="name" defaultValue={profile.name} className="p-2 border rounded" />
              <input name="title" defaultValue={profile.title} className="p-2 border rounded" />
              <input name="tagline" defaultValue={profile.tagline} className="p-2 border rounded col-span-2" />
              <input name="company" defaultValue={profile.company} className="p-2 border rounded" />
              <input name="email" defaultValue={profile.email} className="p-2 border rounded" />
              <input name="phone" defaultValue={profile.phone} className="p-2 border rounded" />
              <input name="website" defaultValue={profile.website} className="p-2 border rounded col-span-2" />
              <textarea name="about" defaultValue={profile.about} className="p-2 border rounded col-span-2" />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm text-gray-600">Upload hero image</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  handleHeroUpload(e);
                  // reset value so same file can be uploaded again if needed
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-sm"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setEditorOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
