import { Suspense } from "react";
import Link from "next/link";
import { getStaffMembers } from "../../ghl";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const VALID_STAFF = ["allan", "lulu", "cecile", "romar"];

const STAGE_COLORS: Record<string, string> = {
  "First Time Visitor": "bg-sky-500/20 text-sky-300 border-sky-500/40",
  "Return Visitor":     "bg-violet-500/20 text-violet-300 border-violet-500/40",
  "Regular Attendee":   "bg-amber-500/20 text-amber-300 border-amber-500/40",
  "Core Member":        "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  "YOUTH":              "bg-pink-500/20 text-pink-300 border-pink-500/40",
};

const STAFF_GRADIENT: Record<string, string> = {
  allan:  "from-blue-600 to-blue-800",
  lulu:   "from-purple-600 to-purple-800",
  cecile: "from-rose-600 to-rose-800",
  romar:  "from-teal-600 to-teal-800",
};

const STAGE_ORDER = [
  "First Time Visitor",
  "Return Visitor",
  "Regular Attendee",
  "Core Member",
  "YOUTH",
];

export default async function StaffPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const staffName = decodeURIComponent(name).toLowerCase();

  if (!VALID_STAFF.includes(staffName)) notFound();

  const { members, lastUpdated } = await getStaffMembers(staffName);
  const displayName = staffName.charAt(0).toUpperCase() + staffName.slice(1);
  const gradient = STAFF_GRADIENT[staffName] ?? "from-gray-600 to-gray-800";

  // Stage breakdown
  const stageCounts: Record<string, number> = {};
  for (const m of members) {
    stageCounts[m.stage] = (stageCounts[m.stage] ?? 0) + 1;
  }
  const maxCount = Math.max(...Object.values(stageCounts), 1);

  // Area breakdown
  const areaCounts: Record<string, number> = {};
  for (const m of members) {
    if (m.area) areaCounts[m.area] = (areaCounts[m.area] ?? 0) + 1;
  }
  const topAreas = Object.entries(areaCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Reachability
  const withPhone   = members.filter(m => m.phone).length;
  const withEmail   = members.filter(m => m.email).length;
  const noContact   = members.filter(m => !m.phone && !m.email).length;
  const coreMembers = stageCounts["Core Member"] ?? 0;
  const ftvMembers  = stageCounts["First Time Visitor"] ?? 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradient} px-6 py-8`}>
        <div className="max-w-6xl mx-auto">
          <Link href="/pcm-dashboard" className="text-white/60 hover:text-white text-sm mb-4 inline-flex items-center gap-1">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center gap-5 mt-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-2xl">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">{displayName}</h1>
              <p className="text-white/70 mt-1">PCM Staff · {members.length} assigned members</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
            <div className="text-3xl font-extrabold text-white">{members.length}</div>
            <div className="text-sm text-gray-400 mt-1">Total Members</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
            <div className="text-3xl font-extrabold text-emerald-400">{coreMembers}</div>
            <div className="text-sm text-emerald-300/70 mt-1">Core Members</div>
          </div>
          <div className="bg-sky-500/10 border border-sky-500/30 rounded-2xl p-4">
            <div className="text-3xl font-extrabold text-sky-400">{ftvMembers}</div>
            <div className="text-sm text-sky-300/70 mt-1">First Time Visitors</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
            <div className="text-3xl font-extrabold text-white">{withPhone}</div>
            <div className="text-sm text-gray-400 mt-1">May Phone</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
            <div className="text-3xl font-extrabold text-white">{withEmail}</div>
            <div className="text-sm text-gray-400 mt-1">May Email</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stage Breakdown */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="font-bold text-white mb-4">Member Stage Breakdown</h2>
            <div className="space-y-3">
              {STAGE_ORDER.map(stage => {
                const count = stageCounts[stage] ?? 0;
                if (!count) return null;
                const pct = Math.round((count / members.length) * 100);
                const barW = Math.round((count / maxCount) * 100);
                const colorClass = STAGE_COLORS[stage] ?? "bg-gray-500/20 text-gray-300 border-gray-500/40";
                const barColor = colorClass.split(" ")[0].replace("/20", "").replace("bg-", "bg-");
                return (
                  <div key={stage}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${colorClass}`}>{stage}</span>
                      <span className="text-white font-bold">{count} <span className="text-gray-500 font-normal">({pct}%)</span></span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${barColor}`} style={{ width: `${barW}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Areas */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="font-bold text-white mb-4">Top Areas</h2>
            {topAreas.length ? (
              <div className="space-y-3">
                {topAreas.map(([area, count]) => {
                  const pct = Math.round((count / members.length) * 100);
                  return (
                    <div key={area}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-200 uppercase tracking-wide">{area}</span>
                        <span className="text-white font-bold">{count} <span className="text-gray-500 font-normal">({pct}%)</span></span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gray-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No area data available.</p>
            )}

            {/* Reachability */}
            <div className="mt-6 pt-5 border-t border-gray-800">
              <h3 className="font-semibold text-gray-300 mb-3 text-sm">Reachability</h3>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-gray-800 rounded-xl p-3">
                  <div className="text-white font-bold text-lg">{withPhone}</div>
                  <div className="text-gray-500 text-xs mt-0.5">Phone</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-3">
                  <div className="text-white font-bold text-lg">{withEmail}</div>
                  <div className="text-gray-500 text-xs mt-0.5">Email</div>
                </div>
                <div className={`rounded-xl p-3 ${noContact > 0 ? "bg-red-900/30" : "bg-gray-800"}`}>
                  <div className={`font-bold text-lg ${noContact > 0 ? "text-red-400" : "text-white"}`}>{noContact}</div>
                  <div className="text-gray-500 text-xs mt-0.5">No Contact</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Member Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-white">Member List</h2>
              <p className="text-sm text-gray-400 mt-0.5">{members.length} members assigned to {displayName}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800/60 border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-gray-300 font-semibold">#</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-semibold">Phone</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-semibold">Stage</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-semibold">Area</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={m.id} className={`border-b border-gray-800/60 hover:bg-gray-800/30 ${i % 2 === 0 ? "" : "bg-gray-800/20"}`}>
                    <td className="px-4 py-3 text-gray-600 text-xs">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{m.name || "—"}</div>
                      {m.email && <div className="text-gray-500 text-xs mt-0.5">{m.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{m.phone || <span className="text-gray-700">—</span>}</td>
                    <td className="px-4 py-3">
                      {m.stage ? (
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs border ${STAGE_COLORS[m.stage] ?? "bg-gray-700 text-gray-300 border-gray-600"}`}>
                          {m.stage}
                        </span>
                      ) : <span className="text-gray-700">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-400 uppercase text-xs">{m.area || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-600 text-right">Data from GHL CRM · Updated: {lastUpdated} PHT</p>
      </div>
    </div>
  );
}
