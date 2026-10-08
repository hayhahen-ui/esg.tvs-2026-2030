// Dashboard biểu đồ báo cáo mẫu — vẽ từ dữ liệu giả định (reportExample),
// nhãn 3 ngôn ngữ, mỗi biểu đồ kèm "Cách tính" (công thức + số liệu đầu vào).
import type { ReactNode } from "react";
import { exampleYears, sampleMetrics, sampleMonths } from "./reportExample";
import { fmtNum, monthName, t, type ReportLang } from "./reportI18n";
import { fill, rp } from "./reportProse";
import { CHART_COLORS, Donut, GroupedBars, SingleBars } from "./charts";

function Calc({ lang, children }: { lang: ReportLang; children: ReactNode }) {
  return (
    <details className="chart-calc">
      <summary>{t(lang, "howCalculated")}</summary>
      <div className="text-small">{children}</div>
    </details>
  );
}

export default function ReportCharts({ lang }: { lang: ReportLang }) {
  const f0 = (v: number) => fmtNum(lang, v, 0);
  const f1 = (v: number) => fmtNum(lang, v, 1);
  const f2 = (v: number) => fmtNum(lang, v, 2);
  const [y24, y25] = exampleYears;
  const m24 = sampleMetrics(y24);
  const m25 = sampleMetrics(y25);

  const months = sampleMonths.map((m, i) => ({ label: monthName(lang, i), value: m.electricityKwh }));

  const idx = (a: number, b: number) => (b / a) * 100;

  return (
    <section aria-label={t(lang, "chartsTitle")}>
      <p className="text-small text-secondary" style={{ margin: "0 0 12px" }}>{t(lang, "chartsIntro")}</p>
      <p className="resource-notice" style={{ marginBottom: 12 }}><strong>{t(lang, "sampleNote")}</strong></p>

      <div className="chart-grid">
        <div className="card">
          <SingleBars title={t(lang, "chElectricityTitle")} data={months} color={CHART_COLORS[0]} formatValue={f0} />
          <Calc lang={lang}>
            <p>{t(lang, "source")}: {t(lang, "sampleDataMonths")} — DEMO-ELEC.</p>
          </Calc>
        </div>

        <div className="card">
          <GroupedBars
            title={t(lang, "chGhgTitle")}
            categories={["2024", "2025"]}
            series={[
              { name: t(lang, "scope1"), color: CHART_COLORS[1], values: [m24.scope1, m25.scope1] },
              { name: t(lang, "scope2loc"), color: CHART_COLORS[0], values: [m24.scope2Location, m25.scope2Location] },
            ]}
            formatValue={(v) => `${f1(v)} ${t(lang, "unitTco2e")}`}
          />
          <Calc lang={lang}>
            <p>{fill(rp(lang, "ex_calc_ghg1"), { d: f0(y25.dieselLitres), l: f0(y25.lpgKg), v: f1(m25.scope1), u: t(lang, "unitTco2e") })}</p>
            <p>{fill(rp(lang, "ex_calc_ghg2"), { kwh: f0(y25.electricityKwh), v: f1(m25.scope2Location), u: t(lang, "unitTco2e") })}</p>
            <p>{t(lang, "source")}: {t(lang, "sampleDataYears")} — DEMO-FUEL + DEMO-ELEC.</p>
          </Calc>
        </div>

        <div className="card">
          <GroupedBars
            title={`${t(lang, "chIntensityTitle")} (2024 = 100)`}
            categories={[t(lang, "intElectricity"), t(lang, "intGhg"), t(lang, "intWater")]}
            series={[
              { name: "2024", color: CHART_COLORS[4], values: [100, 100, 100] },
              {
                name: "2025", color: CHART_COLORS[2],
                values: [idx(m24.electricityPerPair, m25.electricityPerPair), idx(m24.ghgKgPerPair, m25.ghgKgPerPair), idx(m24.waterLitresPerPair, m25.waterLitresPerPair)],
              },
            ]}
            formatValue={(v) => f1(v)}
          />
          <Calc lang={lang}>
            <p>{rp(lang, "ex_calc_int1")}</p>
            <p>{fill(rp(lang, "ex_calc_int2"), { e: f2(m25.electricityPerPair), g: f2(m25.ghgKgPerPair), w: f1(m25.waterLitresPerPair) })}</p>
          </Calc>
        </div>

        <div className="card">
          <Donut
            title={t(lang, "chWasteTitle")}
            data={[
              { label: t(lang, "wasteRecycled"), value: y25.wasteRecycledT, color: CHART_COLORS[5] },
              { label: t(lang, "wasteDisposed"), value: y25.wasteDisposedT, color: CHART_COLORS[1] },
              { label: t(lang, "wasteHazardous"), value: y25.wasteHazardousT, color: CHART_COLORS[3] },
            ]}
            formatValue={(v) => `${f0(v)} ${t(lang, "unitTon")}`}
          />
          <Calc lang={lang}>
            <p>{t(lang, "source")}: DEMO-WASTE. Tổng = {f0(m25.wasteTotal)} {t(lang, "unitTon")}.</p>
          </Calc>
        </div>

        <div className="card">
          <Donut
            title={`${t(lang, "kpiHeadcount")} — 2025`}
            data={[
              { label: t(lang, "female"), value: y25.women, color: CHART_COLORS[3] },
              { label: t(lang, "male"), value: y25.men, color: CHART_COLORS[4] },
            ]}
            formatValue={(v) => `${f0(v)}`}
          />
          <Calc lang={lang}>
            <p>{t(lang, "femaleShare")}: {f1(m25.womenPct)}% · {t(lang, "source")}: DEMO-HR.</p>
          </Calc>
        </div>

        <div className="card">
          <SingleBars
            title={t(lang, "trainingPerPerson")}
            data={[{ label: "2024", value: m24.trainingHoursPerEmployee }, { label: "2025", value: m25.trainingHoursPerEmployee }]}
            color={CHART_COLORS[2]}
            formatValue={f1}
          />
          <Calc lang={lang}>
            <p>{fill(rp(lang, "ex_calc_train"), { h: f0(y25.trainingHours), e: f0(y25.employees), v: f1(m25.trainingHoursPerEmployee) })}</p>
          </Calc>
        </div>
      </div>
    </section>
  );
}
