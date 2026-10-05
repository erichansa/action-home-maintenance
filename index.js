import fs from 'fs';
import path from 'path';

const TASKS = [
  {
    category: "HVAC & Air Quality",
    task: "Replace or Inspect HVAC Air Filters",
    freq: "Every 3 Months",
    savings: "$60 - $180 / year on electric bills and prevents motor burnout",
    tip: "Use MERV 8 to MERV 11 for optimal balance between air filtration and airflow.",
    url: "https://www.fixcosthome.com"
  },
  {
    category: "Plumbing Protection",
    task: "Flush Water Heater Tank to Remove Sediment",
    freq: "Every 12 Months",
    savings: "$1,200+ by extending water heater tank lifespan",
    tip: "Inspect the sacrificial anode rod while draining; replace if wire core is exposed.",
    url: "https://www.fixcosthome.com"
  },
  {
    category: "Exterior & Roof",
    task: "Clear Gutters and Extend Downspouts",
    freq: "Every 6 Months (Late Autumn & Spring)",
    savings: "$3,000 - $10,000 preventing foundation water damage",
    tip: "Ensure all downspout extensions discharge water at least 6 feet away from foundation walls.",
    url: "https://www.fixcosthome.com"
  },
  {
    category: "Kitchen Appliances",
    task: "Clean Refrigerator Condenser Coils",
    freq: "Every 6 Months",
    savings: "$50 / year in energy and extends compressor life",
    tip: "Use a coil cleaning brush and vacuum attachment underneath or behind the unit.",
    url: "https://www.fixcosthome.com"
  }
];

async function run() {
  try {
    const readmePath = process.env['INPUT_README-PATH'] || 'README.md';
    const tagStart = process.env['INPUT_TAG-START'] || '<!-- HOME-MAINTENANCE:START -->';
    const tagEnd = process.env['INPUT_TAG-END'] || '<!-- HOME-MAINTENANCE:END -->';

    const pick = TASKS[Math.floor(Math.random() * TASKS.length)];

    const block = `
### 🛠️ Seasonal Home Maintenance Tip: ${pick.task}

> **Category:** ${pick.category} · **Frequency:** ${pick.freq}

* 💰 **Cost Savings Potential:** ${pick.savings}
* 💡 **Pro-Tip:** ${pick.tip}
* 📖 **Detailed DIY Checklist:** [Read full guide on FixCostHome.com](${pick.url}?utm_source=github_action&utm_medium=readme&utm_campaign=home_maintenance) · *Powered by [FixCostHome.com](https://www.fixcosthome.com)*
`;

    const fullPath = path.resolve(process.cwd(), readmePath);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, `${tagStart}\n${block}\n${tagEnd}\n`, 'utf-8');
      console.log('Created README with home maintenance block.');
      return;
    }

    const content = fs.readFileSync(fullPath, 'utf-8');
    const regex = new RegExp(`${tagStart}[\\s\\S]*?${tagEnd}`, 'm');

    if (!regex.test(content)) {
      fs.writeFileSync(fullPath, `${content}\n\n${tagStart}\n${block}\n${tagEnd}\n`, 'utf-8');
    } else {
      fs.writeFileSync(fullPath, content.replace(regex, `${tagStart}\n${block}\n${tagEnd}`), 'utf-8');
    }

    console.log('Successfully updated README with home maintenance checklist!');
  } catch (error) {
    console.error('Action failed:', error.message);
    process.exit(1);
  }
}

run();

