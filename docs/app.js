const DATA_PATH = "data/programme_data.json";

function renderKpis(kpis) {
  const labels = {
    milestones_on_track: ["Milestones on track", "%"],
    active_customer_engagements: ["Active customer engagements", ""],
    emea_markets: ["EMEA markets", ""],
    high_priority_dependencies: ["High-priority dependencies", ""],
    content_assets_in_flight: ["Content assets in flight", ""],
    video_event_assets_in_production: ["Video / event assets in production", ""],
    event_campaign_activations: ["Event / campaign activations", ""],
    stakeholder_actions_overdue: ["Overdue stakeholder actions", ""]
  };

  const container = document.getElementById("kpis");

  container.innerHTML = Object.entries(kpis)
    .map(([key, value]) => {
      const [label, suffix] = labels[key] || [key.replaceAll("_", " "), ""];

      return `
        <article class="kpi-card">
          <span class="kpi-label">${label}</span>
          <strong class="kpi-value">${value}${suffix}</strong>
          <small>Illustrative programme metric</small>
        </article>
      `;
    })
    .join("");
}

function renderWorkstreams(workstreams) {
  const container = document.getElementById("workstreams");

  container.innerHTML = workstreams
    .map(
      (workstream) => `
        <div class="workstream">
          <div class="workstream-head">
            <div>
              <strong>${workstream.name}</strong>
              <small>${workstream.owner}</small>
            </div>
            <span class="status ${workstream.status.toLowerCase()}">
              ${workstream.status}
            </span>
          </div>

          <div class="progress-track">
            <div
              class="progress-bar"
              style="width: ${workstream.progress}%"
            ></div>
          </div>

          <div class="workstream-meta">
            <span>${workstream.progress}% complete</span>
            <span>Next: ${workstream.next}</span>
          </div>

          <div class="dependency">
            Dependency: ${workstream.dependency}
          </div>
        </div>
      `
    )
    .join("");
}

function renderRaid(risks) {
  const container = document.getElementById("raid");

  container.innerHTML = `
    <div class="raid-table-wrap">
      <table class="raid-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Item</th>
            <th>Impact</th>
            <th>Status</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          ${risks
            .map(
              (risk) => `
                <tr>
                  <td>${risk.id}</td>
                  <td>${risk.type}</td>
                  <td>
                    <strong>${risk.item}</strong>
                    <small>${risk.mitigation}</small>
                  </td>
                  <td>${risk.impact}</td>
                  <td>
                    <span class="status ${risk.status.toLowerCase()}">
                      ${risk.status}
                    </span>
                  </td>
                  <td>${risk.owner}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderMilestones(milestones) {
  const container = document.getElementById("milestones");

  container.innerHTML = milestones
    .map((milestone) => {
      const statusClass = milestone.status
        .toLowerCase()
        .replaceAll(" ", "-");

      return `
        <div class="milestone ${statusClass}">
          <div class="milestone-marker"></div>

          <div>
            <strong>${milestone.name}</strong>
            <small>${milestone.status}</small>
          </div>

          <span>${milestone.date}</span>
        </div>
      `;
    })
    .join("");
}

async function loadProgrammeData() {
  try {
    const response = await fetch(DATA_PATH);

    if (!response.ok) {
      throw new Error("Unable to load programme data");
    }

    const data = await response.json();

    renderKpis(data.kpis);
    renderWorkstreams(data.workstreams);
    renderRaid(data.risks);
    renderMilestones(data.milestones);
  } catch (error) {
    console.error(error);

    document.querySelector("main").insertAdjacentHTML(
      "beforeend",
      `
        <div class="error-message">
          Programme data could not be loaded.
        </div>
      `
    );
  }
}

loadProgrammeData();
