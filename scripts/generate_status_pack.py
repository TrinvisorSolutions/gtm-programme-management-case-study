from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
d=json.loads((ROOT/'data/programme_data.json').read_text(encoding='utf-8'))
lines=['# Executive Programme Status Pack','',f"**Programme:** {d['meta']['subtitle']}",'', '## Executive summary','',f"- {d['kpis']['milestones_on_track']}% of milestones are on track.",f"- {d['kpis']['active_customer_engagements']} active customer engagements across {d['kpis']['markets']} EMEA markets.",f"- {d['kpis']['stakeholder_actions_overdue']} stakeholder actions are overdue.",'','## Workstream health','', '| Workstream | RAG | Progress | Next action |','|---|---:|---:|---|']
for w in d['workstreams']: lines.append(f"| {w['name']} | {w['status']} | {w['progress']}% | {w['next']} |")
lines += ['', '## Priority RAID items','']
for r in d['risks']:
    if r['impact']=='High': lines.append(f"- **{r['id']} {r['item']}**: {r['mitigation']}")
(ROOT/'outputs/status_report.md').write_text('\n'.join(lines),encoding='utf-8')
print('Generated outputs/status_report.md')
