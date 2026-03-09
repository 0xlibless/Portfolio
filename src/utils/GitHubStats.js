const GITHUB_USERNAME = '0xlibless';

export async function fetchGitHubStats() {
  const [prsRes, contribRes] = await Promise.all([
    fetch(`https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}+is:merged&per_page=1`),
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`)
  ]);

  if (!prsRes.ok) throw new Error('Error al obtener PRs');
  if (!contribRes.ok) throw new Error('Error al obtener contribuciones');

  const prsData = await prsRes.json();
  const contribData = await contribRes.json();

  const contributions = contribData.contributions || [];

  let currentStreak = 0;
  let started = false;
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      currentStreak++;
      started = true;
    } else if (started) {
      break;
    }
  }

  const year = new Date().getFullYear().toString();
  const totalContribs = contribData.total?.[year] ?? 0;

  return {
    mergedPRs: prsData.total_count ?? 0,
    currentStreak,
    totalContribs,
  };
}
