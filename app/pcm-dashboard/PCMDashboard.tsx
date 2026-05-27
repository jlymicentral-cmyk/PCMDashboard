import { getPCMStats, StaffStats } from "./ghl";

const STAGE_INFO: { key: string; label: string; desc: string; color: string; bar: string; dot: string }[] = [
  {
    key:   "First Time Visitor",
    label: "First Time Visitor",
    desc:  "Bagong dumalo sa simbahan — unang beses",
    color: "bg-sky-500/15 border-sky-500/40 text-sky-300",
    bar:   "bg-sky-500",
    dot:   "bg-sky-400",
  },
  {
    key:   "Return Visitor",
    label: "Return Visitor (OGV)",
    desc:  "Bumabalik na pero hindi pa regular — occasional goer",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-300",
    bar:   "bg-violet-500",
    dot:   "bg-violet-400",
  },
  {
    key:   "Regular Attendee",
    label: "Regular Attendee",
    desc:  "Regular na dumadalo — bawat Linggo",
    color: "bg-amber-500/15 border-amber-500/40 text-amber-300",
    bar:   "bg-amber-500",
    dot:   "bg-amber-400",
  },
  {
    key:   "Core Member",
    label: "Core Member",
    desc:  "Aktibong miyembro — involved sa ministry",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
    bar:   "bg-emerald-500",
    dot:   "bg-emerald-400",
  },
  {
    key:   "YOUTH",
    label: "Youth Track",
    desc:  "Kabataan — under youth ministry",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-300",
    bar:   "bg-pink-500",
    dot:   "bg-pink-400",
  },
];

const STAFF_COLORS: Record<string, string> = {
  Allan:   "from-blue-600 to-blue-800",
  Lulu:    "from-purple-600 to-purple-800",
  Cecile:  "from-rose-600 to-rose-800",
  Cecille: "from-rose-600 to-rose-800",
  Romar:   "from-teal-600 to-teal-800",
};

export default async function PCMDashboard() {
  const { staffStats, total, lastUpdated } = await getPCMStats();

  // Merge Cecille into Cecile
  const merged: StaffStats[] = [];
  for (const s of staffStats) {
    const name = s.staff === "Cecille" ? "Cecile" : s.staff;
    const existing = merged.find(x => x.staff === name);
    if (existing) {
      existing.total += s.total;
      for (const [k, v] of Object.entries(s.byType)) {
        existing.byType[k] = (existing.byType[k] ?? 0) + v;
      }
    } else {
      merged.push({ ...s, staff: name });
    }
  }

  // Order: Allan, Lulu, Cecile, Romar
  const ORDER = ["Allan", "Lulu", "Cecile", "Romar"];
  merged.sort((a, b) => {
    const ai = ORDER.indexOf(a.staff), bi = ORDER.indexOf(b.staff);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  // Funnel totals
  const funnelTotals = STAGE_INFO.map(s => ({
    ...s,
    count: merged.reduce((sum, st) => sum + (st.byType[s.key] ?? 0), 0),
  }));
  const maxFunnel = Math.max(...funnelTotals.map(f => f.count), 1);

  return (
    <div className="space-y-8 font-sans">

      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {funnelTotals.map(f => (
          <div key={f.key} className={`rounded-2xl border p-4 ${f.color}`}>
            <div className="text-3xl font-extrabold">{f.count}</div>
            <div className="text-sm font-semibold mt-1">{f.label}</div>
            <div className="text-xs mt-1 opacity-70">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Journey Funnel */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="text-lg font-bold text-white mb-1">
          Spiritual Journey Funnel
        </h2>
        <p className="text-sm text-gray-400 mb-5">
          Gaano karaming members ang nasa bawat stage ng kanilang faith journey.
          Goal: ilipat ang bawat member pataas ng stage.
        </p>
        <div className="space-y-3">
          {funnelTotals.map(f => {
            const pct = Math.round((f.count / total) * 100);
            const barW = Math.round((f.count / maxFunnel) * 100);
            return (
              <div key={f.key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-200 font-medium">{f.label}</span>
                  <span className="text-gray-400">{f.count} members <span className="text-gray-600">({pct}%)</span></span>
                </div>
                <div className="h-5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${f.bar} flex items-center pl-3 transition-all`}
                    style={{ width: `${barW}%` }}
                  >
                    <span className="text-white text-xs font-bold whitespace-nowrap">{f.count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between text-sm">
          <span className="text-gray-500">Total tracked members</span>
          <span className="text-white font-bold">{total}</span>
        </div>
      </div>

      {/* Per Staff Cards */}
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Per PCM Staff Breakdown</h2>
        <p className="text-sm text-gray-400 mb-4">
          Bawat PCM staff ay may responsibilidad sa kanilang mga assigned members.
          Nakikita dito kung gaano na karami ang na-disciple at nasa anong stage na sila.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {merged.map(s => <StaffCard key={s.staff} stats={s} total={total} />)}
        </div>
      </div>

      {/* Summary Matrix */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="font-bold text-white">Summary Table — Staff vs. Member Stage</h2>
          <p className="text-sm text-gray-400 mt-1">Madaling makita kung sino ang may maraming FTV (baguhan) at kung sino ang may maraming Core Members (mature).</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800/60 border-b border-gray-700">
                <th className="text-left px-6 py-3 text-gray-300 font-semibold w-28">PCM Staff</th>
                {STAGE_INFO.map(s => (
                  <th key={s.key} className="px-4 py-3 text-center font-semibold">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${s.color}`}>{s.label}</span>
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-gray-300 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {merged.map((s, i) => (
                <tr key={s.staff} className={`border-b border-gray-800 ${i % 2 === 0 ? "" : "bg-gray-800/30"}`}>
                  <td className="px-6 py-3 font-semibold text-white capitalize">{s.staff}</td>
                  {STAGE_INFO.map(st => {
                    const count = s.byType[st.key] ?? 0;
                    const pct = s.total ? Math.round((count / s.total) * 100) : 0;
                    return (
                      <td key={st.key} className="px-4 py-3 text-center">
                        {count ? (
                          <div>
                            <div className="text-white font-bold">{count}</div>
                            <div className="text-gray-500 text-xs">{pct}%</div>
                          </div>
                        ) : (
                          <span className="text-gray-700">—</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-6 py-3 text-right font-extrabold text-white text-base">{s.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-800 border-t border-gray-600">
                <td className="px-6 py-3 font-extrabold text-white">TOTAL</td>
                {STAGE_INFO.map(st => {
                  const sum = merged.reduce((acc, s) => acc + (s.byType[st.key] ?? 0), 0);
                  return (
                    <td key={st.key} className="px-4 py-3 text-center font-extrabold text-white">
                      {sum || "—"}
                    </td>
                  );
                })}
                <td className="px-6 py-3 text-right font-extrabold text-white text-base">{total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="font-bold text-white mb-3">Key Insights para sa Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="text-gray-400 mb-1">Pinaka-maraming members</div>
            {(() => {
              const top = [...merged].sort((a,b) => b.total - a.total)[0];
              return <div className="text-white font-bold text-lg capitalize">{top?.staff} <span className="text-gray-400 font-normal text-sm">({top?.total} members)</span></div>;
            })()}
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="text-gray-400 mb-1">Pinaka-maraming Core Members</div>
            {(() => {
              const top = [...merged].sort((a,b) => (b.byType["Core Member"]??0) - (a.byType["Core Member"]??0))[0];
              return <div className="text-white font-bold text-lg capitalize">{top?.staff} <span className="text-gray-400 font-normal text-sm">({top?.byType["Core Member"]??0} core)</span></div>;
            })()}
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="text-gray-400 mb-1">Pinaka-maraming baguhan (FTV)</div>
            {(() => {
              const top = [...merged].sort((a,b) => (b.byType["First Time Visitor"]??0) - (a.byType["First Time Visitor"]??0))[0];
              return <div className="text-white font-bold text-lg capitalize">{top?.staff} <span className="text-gray-400 font-normal text-sm">({top?.byType["First Time Visitor"]??0} FTV)</span></div>;
            })()}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 text-right">Data mula sa GHL CRM · Updated: {lastUpdated} PHT</p>
    </div>
  );
}

function StaffCard({ stats, total }: { stats: StaffStats; total: number }) {
  const gradient = STAFF_COLORS[stats.staff] ?? "from-gray-600 to-gray-800";
  const initials = stats.staff.slice(0, 2).toUpperCase();
  const maxCount = Math.max(...Object.values(stats.byType), 1);
  const staffPct = Math.round((stats.total / total) * 100);

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      <div className={`bg-gradient-to-r ${gradient} px-6 py-4 flex items-center gap-4`}>
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-lg">
          {initials}
        </div>
        <div>
          <div className="text-white font-extrabold text-xl capitalize">{stats.staff}</div>
          <div className="text-white/70 text-sm">{stats.total} members · {staffPct}% ng total</div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {STAGE_INFO.map(si => {
          const count = stats.byType[si.key] ?? 0;
          if (!count) return null;
          const pct = Math.round((count / stats.total) * 100);
          const barW = Math.round((count / maxCount) * 100);
          return (
            <div key={si.key}>
              <div className="flex justify-between text-sm mb-1">
                <div>
                  <span className="text-gray-200 font-medium">{si.label}</span>
                  <span className="text-gray-600 text-xs ml-2">{si.desc}</span>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className="text-white font-bold">{count}</span>
                  <span className="text-gray-500 text-xs ml-1">({pct}%)</span>
                </div>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${si.bar}`} style={{ width: `${barW}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
