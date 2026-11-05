"use strict";

/* =========================================================
   Konfiguration
   Hier die vier CSV-Links aus Google Sheets eintragen.
   Leere Links bedeuten: Beispieldaten werden angezeigt.
   ========================================================= */
const CONFIG = {
  teamsUrl: "",
  matchesUrl: "",
  playersUrl: "",
  settingsUrl: "",
  useDemoIfEmpty: true,
  autoRefreshMinutes: 5
};

const DEFAULT_SETTINGS = {
  league_name: "TVE Fall League",
  season: "2026/27",
  modus_1: "5vs5",
  modus_2: "35 Minuten pro Spiel",
  stallcount: "8",
  timeouts: "2 Timeouts pro Team à 1 min",
  cap_mode: "Cap One",
  start_time: "20:00",
  spiel_1_start: "20:45",
  spiel_1_ende: "21:20",
  spiel_2_start: "21:30",
  spiel_2_ende: "22:05",
  format_note: "7 Spieltage · 8 Teams auf 4 Feldern · 2 Spiele pro Team"
};

const DEMO_TEAMS = [
  { team_id: "TU", name: "Tuatara", short: "TU", color: "#0ea5e9" },
  { team_id: "AL", name: "Albatros", short: "AL", color: "#64748b" },
  { team_id: "WI", name: "Wisent", short: "WI", color: "#92400e" },
  { team_id: "BI", name: "Bison", short: "BI", color: "#7c2d12" },
  { team_id: "GI", name: "Giraffe", short: "GI", color: "#f59e0b" },
  { team_id: "WB", name: "Wasserbüffel", short: "WB", color: "#334155" },
  { team_id: "AB", name: "Ameisenbär", short: "AB", color: "#dc2626" },
  { team_id: "KA", name: "Känguru", short: "KA", color: "#16a34a" }
];

const DEMO_MATCHES = [
  { match_id: "R01G1", round: 1, game_no: 1, home_team_id: "TU", away_team_id: "AL", home_score: 11, away_score: 7, status: "finished" },
  { match_id: "R01G2", round: 1, game_no: 2, home_team_id: "WI", away_team_id: "KA", home_score: 13, away_score: 5, status: "finished" },
  { match_id: "R01G3", round: 1, game_no: 3, home_team_id: "BI", away_team_id: "WB", home_score: 6, away_score: 10, status: "finished" },
  { match_id: "R01G4", round: 1, game_no: 4, home_team_id: "GI", away_team_id: "AB", home_score: 8, away_score: 9, status: "finished" },
  { match_id: "R01G5", round: 1, game_no: 5, home_team_id: "BI", away_team_id: "TU", home_score: 9, away_score: 12, status: "finished" },
  { match_id: "R01G6", round: 1, game_no: 6, home_team_id: "GI", away_team_id: "AL", home_score: 10, away_score: 7, status: "finished" },
  { match_id: "R01G7", round: 1, game_no: 7, home_team_id: "WB", away_team_id: "WI", home_score: 8, away_score: 11, status: "finished" },
  { match_id: "R01G8", round: 1, game_no: 8, home_team_id: "AB", away_team_id: "KA", home_score: 12, away_score: 6, status: "finished" },
  { match_id: "R02G1", round: 2, game_no: 1, home_team_id: "TU", away_team_id: "KA", home_score: 12, away_score: 4, status: "finished" },
  { match_id: "R02G2", round: 2, game_no: 2, home_team_id: "AL", away_team_id: "WI", home_score: 6, away_score: 11, status: "finished" },
  { match_id: "R02G3", round: 2, game_no: 3, home_team_id: "BI", away_team_id: "GI", home_score: 10, away_score: 8, status: "finished" },
  { match_id: "R02G4", round: 2, game_no: 4, home_team_id: "WB", away_team_id: "AB", home_score: 9, away_score: 7, status: "finished" },
  { match_id: "R02G5", round: 2, game_no: 5, home_team_id: "GI", away_team_id: "TU", home_score: 8, away_score: 13, status: "finished" },
  { match_id: "R02G6", round: 2, game_no: 6, home_team_id: "WB", away_team_id: "AL", home_score: 12, away_score: 6, status: "finished" },
  { match_id: "R02G7", round: 2, game_no: 7, home_team_id: "AB", away_team_id: "WI", home_score: 5, away_score: 10, status: "finished" },
  { match_id: "R02G8", round: 2, game_no: 8, home_team_id: "KA", away_team_id: "BI", home_score: 9, away_score: 11, status: "finished" },
  { match_id: "R03G1", round: 3, game_no: 1, home_team_id: "TU", away_team_id: "WI", home_score: 9, away_score: 8, status: "finished" },
  { match_id: "R03G2", round: 3, game_no: 2, home_team_id: "AL", away_team_id: "KA", home_score: 11, away_score: 6, status: "finished" },
  { match_id: "R03G3", round: 3, game_no: 3, home_team_id: "BI", away_team_id: "AB", home_score: 7, away_score: 9, status: "finished" },
  { match_id: "R03G4", round: 3, game_no: 4, home_team_id: "GI", away_team_id: "WB", home_score: 6, away_score: 12, status: "finished" },
  { match_id: "R03G5", round: 3, game_no: 5, home_team_id: "WB", away_team_id: "TU", home_score: 10, away_score: 8, status: "finished" },
  { match_id: "R03G6", round: 3, game_no: 6, home_team_id: "AB", away_team_id: "AL", home_score: 9, away_score: 7, status: "finished" },
  { match_id: "R03G7", round: 3, game_no: 7, home_team_id: "BI", away_team_id: "WI", home_score: 5, away_score: 12, status: "finished" },
  { match_id: "R03G8", round: 3, game_no: 8, home_team_id: "KA", away_team_id: "GI", home_score: 10, away_score: 9, status: "finished" },
  { match_id: "R04G1", round: 4, game_no: 1, home_team_id: "TU", away_team_id: "BI", home_score: 12, away_score: 6, status: "finished" },
  { match_id: "R04G2", round: 4, game_no: 2, home_team_id: "AL", away_team_id: "GI", home_score: 9, away_score: 8, status: "finished" },
  { match_id: "R04G3", round: 4, game_no: 3, home_team_id: "WI", away_team_id: "WB", home_score: 10, away_score: 7, status: "finished" },
  { match_id: "R04G4", round: 4, game_no: 4, home_team_id: "KA", away_team_id: "AB", home_score: 8, away_score: 11, status: "finished" },
  { match_id: "R04G5", round: 4, game_no: 5, home_team_id: "AB", away_team_id: "TU", home_score: 7, away_score: 10, status: "finished" },
  { match_id: "R04G6", round: 4, game_no: 6, home_team_id: "BI", away_team_id: "AL", home_score: 11, away_score: 6, status: "finished" },
  { match_id: "R04G7", round: 4, game_no: 7, home_team_id: "GI", away_team_id: "WI", home_score: 6, away_score: 13, status: "finished" },
  { match_id: "R04G8", round: 4, game_no: 8, home_team_id: "KA", away_team_id: "WB", home_score: 4, away_score: 12, status: "finished" },
  { match_id: "R05G1", round: 5, game_no: 1, home_team_id: "TU", away_team_id: "GI", home_score: 11, away_score: 6, status: "finished" },
  { match_id: "R05G2", round: 5, game_no: 2, home_team_id: "AL", away_team_id: "WB", home_score: 5, away_score: 10, status: "finished" },
  { match_id: "R05G3", round: 5, game_no: 3, home_team_id: "WI", away_team_id: "AB", home_score: 12, away_score: 7, status: "finished" },
  { match_id: "R05G4", round: 5, game_no: 4, home_team_id: "BI", away_team_id: "KA", home_score: 10, away_score: 5, status: "finished" },
  { match_id: "R05G5", round: 5, game_no: 5, home_team_id: "AL", away_team_id: "TU", home_score: 8, away_score: 11, status: "finished" },
  { match_id: "R05G6", round: 5, game_no: 6, home_team_id: "KA", away_team_id: "WI", home_score: 7, away_score: 12, status: "finished" },
  { match_id: "R05G7", round: 5, game_no: 7, home_team_id: "WB", away_team_id: "BI", home_score: 9, away_score: 6, status: "finished" },
  { match_id: "R05G8", round: 5, game_no: 8, home_team_id: "AB", away_team_id: "GI", home_score: 11, away_score: 8, status: "finished" },
  { match_id: "R06G1", round: 6, game_no: 1, home_team_id: "TU", away_team_id: "WB", home_score: 8, away_score: 10, status: "finished" },
  { match_id: "R06G2", round: 6, game_no: 2, home_team_id: "AL", away_team_id: "AB", home_score: 7, away_score: 9, status: "finished" },
  { match_id: "R06G3", round: 6, game_no: 3, home_team_id: "WI", away_team_id: "BI", home_score: 11, away_score: 5, status: "finished" },
  { match_id: "R06G4", round: 6, game_no: 4, home_team_id: "GI", away_team_id: "KA", home_score: 9, away_score: 7, status: "finished" },
  { match_id: "R06G5", round: 6, game_no: 5, home_team_id: "KA", away_team_id: "TU", home_score: 6, away_score: 12, status: "finished" },
  { match_id: "R06G6", round: 6, game_no: 6, home_team_id: "WI", away_team_id: "AL", home_score: 12, away_score: 6, status: "finished" },
  { match_id: "R06G7", round: 6, game_no: 7, home_team_id: "GI", away_team_id: "BI", home_score: 7, away_score: 10, status: "finished" },
  { match_id: "R06G8", round: 6, game_no: 8, home_team_id: "AB", away_team_id: "WB", home_score: 6, away_score: 9, status: "finished" },
  { match_id: "R07G1", round: 7, game_no: 1, home_team_id: "TU", away_team_id: "AB", home_score: null, away_score: null, status: "scheduled" },
  { match_id: "R07G2", round: 7, game_no: 2, home_team_id: "AL", away_team_id: "BI", home_score: null, away_score: null, status: "scheduled" },
  { match_id: "R07G3", round: 7, game_no: 3, home_team_id: "WI", away_team_id: "GI", home_score: null, away_score: null, status: "scheduled" },
  { match_id: "R07G4", round: 7, game_no: 4, home_team_id: "WB", away_team_id: "KA", home_score: null, away_score: null, status: "scheduled" },
  { match_id: "R07G5", round: 7, game_no: 5, home_team_id: "WI", away_team_id: "TU", home_score: null, away_score: null, status: "scheduled" },
  { match_id: "R07G6", round: 7, game_no: 6, home_team_id: "KA", away_team_id: "AL", home_score: null, away_score: null, status: "scheduled" },
  { match_id: "R07G7", round: 7, game_no: 7, home_team_id: "AB", away_team_id: "BI", home_score: null, away_score: null, status: "scheduled" },
  { match_id: "R07G8", round: 7, game_no: 8, home_team_id: "WB", away_team_id: "GI", home_score: null, away_score: null, status: "scheduled" }
];

const TEAM_QUOTES = {
  TU: [
    "Der Wind darf mitspielen. Den Punkt machen wir trotzdem selbst.",
    "Ein spektakulärer Hechtsprung ist gut. Ein faires Gespräch danach ist besser.",
    "Ohne Schiedsrichter heißt nicht ohne Regeln. Wir klären sie gemeinsam.",
    "Die Scheibe fliegt, der Puls steigt, die Fairness bleibt.",
    "Wenn der eigene Pass zurückkommt, nennen wir es Doppelpass mit dem Wind.",
    "Der beste Trickwurf ist der, den das eigene Team fangen kann.",
    "Wir mögen Überraschungen – außer beim eigenen Wurf in die Endzone."
  ],
  AL: [
    "Flügel helfen wenig, wenn der Pass ins Aus segelt.",
    "Der Wind hat heute die Vorlage geliefert. Jetzt will er auch einen Punkt in der Tabelle.",
    "Die Scheibe kennt die Tabelle nicht. Genau deshalb zählt jeder Punkt.",
    "Gegenwind ist nur Rückenwind mit schlechter Presse.",
    "Unsere langen Pässe haben Fernweh. Unser Team bevorzugt erreichbare Reiseziele.",
    "Höhenflug erlaubt, Übermut nicht.",
    "Die Scheibe ist in der Luft. Unser Plan hoffentlich auch."
  ],
  WI: [
    "Manchmal ist der klügste Wurf der, den man nicht wirft.",
    "Ein Block dreht den Spielzug. Fairness gewinnt den Spieltag.",
    "Ein guter Pass findet den Mitspieler. Ein großartiger findet ihn im Lauf.",
    "Geduld ist eine Taktik – besonders, wenn der Wind den Pass zurückschickt.",
    "Wir setzen auf Ruhe, Übersicht und gelegentlich sehr schnelle Beine.",
    "Wenn der Laufweg frei ist, wird aus „gleich“ plötzlich „Punkt“."
  ],
  BI: [
    "Zehn Sekunden sind reichlich Zeit – bis jemand laut mitzählt.",
    "Bei Gegenwind zählt nicht die Wurfkraft, sondern der nächste gute Laufweg.",
    "Ein Fehlwurf ist nur ein Spielzug mit unerwartetem Ende.",
    "Wir stürmen nicht blind. Wir stürmen mit einem sehr überzeugenden Plan.",
    "Der Punkt ist nah. Also bitte keine Heldentaten mehr.",
    "Die Scheibe wiegt fast nichts. Der entscheidende Punkt dagegen ganz schön viel."
  ],
  GI: [
    "Von hier oben sieht man den freien Laufweg. Hoffentlich auch den eigenen.",
    "Wer nur auf die Scheibe schaut, verpasst manchmal den besten Laufweg.",
    "Ein weiter Wurf macht Eindruck. Ein freier Mitspieler macht den Punkt.",
    "Übersicht ist gut. Die eigene Endzone im Blick zu behalten, ist besser.",
    "Hohe Scheiben sind unser Spezialgebiet. Den Spielstand haben wir auch im Blick.",
    "Der Pass war nicht zu hoch. Ihr wart nur zu wenig Giraffe."
  ],
  WB: [
    "Nasse Schuhe, kalte Scheibe, warme Stimmung: Herbstliga.",
    "Nach dem Punkt ist vor dem Gespräch darüber, ob der Fuß noch drin war.",
    "Richtig schön ist ein Punkt erst, wenn danach beide Teams lachen.",
    "Regen ist nur Wasser mit einem Spielplan.",
    "Schlamm am Trikot? Beweisfoto für einen gelungenen Spieltag.",
    "Bei diesem Wetter glänzt nicht die Scheibe, sondern die Fairness."
  ],
  AB: [
    "Kleine Lücke, großer Punkt.",
    "Der schnellste Weg zum Punkt führt manchmal einen Schritt zurück.",
    "Ein langer Punkt besteht aus vielen kleinen, gut platzierten Pässen.",
    "Wir haben einen Riecher für freie Räume. Für nasse Socken leider auch.",
    "Wer Geduld mitbringt, findet auch im Gedränge die Lücke.",
    "Ein cleverer Laufweg ist schneller als ein besonders lauter Ruf."
  ],
  KA: [
    "Hohe Scheiben? Für uns kein Problem – die Landung danach schon.",
    "Über Pfützen springen wir. Über Regeln nicht.",
    "Kommt der Pass zu hoch, nennen wir es Sprungtraining.",
    "Unsere Beine sagen: „Noch ein Lauf!“ Unsere Lunge beantragt eine Auszeit.",
    "Wenn der erste Sprung nicht reicht, war das eben die Aufwärmrunde.",
    "Ein Punkt in der Endzone? Das nennen wir einen gelungenen Hopser."
  ]
};


const DEMO_PLAYERS = [];
const DEMO_SETTINGS_ROWS = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({ key, value }));

const STATUS = {
  finished: { label: "Endstand", cls: "is-finished" },
  scheduled: { label: "Geplant", cls: "is-scheduled" },
  postponed: { label: "Verlegt", cls: "is-postponed" },
  cancelled: { label: "Abgesagt", cls: "is-cancelled" }
};

const TABS = ["tabelle", "spieltage", "modus"];
const TAB_TITLES = { tabelle: "Tabelle", spieltage: "Spieltage", modus: "Modus & Teams" };

const state = {
  teams: [],
  matches: [],
  players: [],
  settings: { ...DEFAULT_SETTINGS },
  tab: "tabelle",
  teamId: null,
  round: null,
  roundTouched: false,
  loading: false,
  updatedAt: null,
  status: "demo",
  demo: { missingLabels: [], failed: [], blocked: false }
};

/* =========================================================
   Kleine Helfer
   ========================================================= */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function clean(value) {
  return String(value ?? "").replace(/\u00A0/g, " ").trim();
}

function escapeHtml(value) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value ?? "").replace(/[&<>"']/g, char => map[char]);
}

function safeColor(value) {
  const color = clean(value);
  return /^#[0-9a-f]{6}$/i.test(color) ? color : "#8b8274";
}

function isHttp(url) {
  return /^https?:\/\//i.test(clean(url));
}

function parseScore(value) {
  const raw = clean(value).replace(",", ".");
  if (!raw) return null;
  const number = Number(raw);
  return Number.isFinite(number) ? number : null;
}

function toInt(value) {
  const number = parseInt(clean(value), 10);
  return Number.isFinite(number) ? number : 0;
}

function fmtScore(value) {
  if (typeof value !== "number") return "–";
  return Number.isInteger(value) ? String(value) : String(value).replace(".", ",");
}

function formatDiff(value) {
  if (value > 0) return `+${value}`;
  return String(value);
}

function formatTime(date) {
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function timeRange(start, end) {
  const from = clean(start);
  const to = clean(end);
  if (from && to) return `${from}–${to} Uhr`;
  if (from) return `ab ${from} Uhr`;
  if (to) return `bis ${to} Uhr`;
  return "";
}

/* =========================================================
   CSV laden und normalisieren
   ========================================================= */
async function fetchCsv(url) {
  if (typeof Papa === "undefined") {
    throw new Error("PapaParse ist nicht geladen.");
  }

  const target = new URL(url);
  target.searchParams.set("_", String(Date.now()));

  const response = await fetch(target.toString(), { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const text = await response.text();
  if (!text.trim()) throw new Error("Leere Antwort");
  if (/^\s*</.test(text)) throw new Error("Antwort ist kein CSV");

  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: header => header.replace(/^\uFEFF/, "").trim().toLowerCase()
  });

  if (parsed.errors && parsed.errors.length) {
    console.warn("[TVE] CSV-Warnungen:", parsed.errors);
  }

  return parsed.data.filter(row => row && Object.values(row).some(value => clean(value) !== ""));
}

async function loadJob(job) {
  if (!isHttp(job.url)) {
    return { job, rows: job.demo, demo: true, reason: "missing" };
  }

  try {
    const rows = await fetchCsv(job.url);
    if (!rows.length) throw new Error("Keine Zeilen");
    return { job, rows, demo: false };
  } catch (error) {
    console.warn(`[TVE] ${job.label} konnten nicht geladen werden.`, error);
    return { job, rows: job.demo, demo: true, reason: "failed", error };
  }
}

function normalizeTeams(rows) {
  const teams = new Map();

  rows.forEach(row => {
    const rawId = clean(row.team_id) || clean(row.id);
    if (!rawId) return;

    const id = rawId.toUpperCase();
    teams.set(id, {
      id,
      name: clean(row.name) || rawId,
      short: (clean(row.short) || rawId).toUpperCase().slice(0, 4),
      color: safeColor(row.color)
    });
  });

  return [...teams.values()];
}

function normalizeMatches(rows) {
  const matches = [];

  rows.forEach(row => {
    const home = clean(row.home_team_id).toUpperCase();
    const away = clean(row.away_team_id).toUpperCase();
    if (!home || !away) return;

    const homeScore = parseScore(row.home_score);
    const awayScore = parseScore(row.away_score);
    let status = clean(row.status).toLowerCase();

    if (!Object.prototype.hasOwnProperty.call(STATUS, status)) {
      status = homeScore !== null && awayScore !== null ? "finished" : "scheduled";
    }

    const round = toInt(row.round);
    const gameNo = toInt(row.game_no);

    matches.push({
      id: clean(row.match_id) || `${round}-${gameNo}-${home}-${away}`,
      round: round > 0 ? round : 0,
      gameNo: gameNo > 0 ? gameNo : 0,
      home,
      away,
      homeScore,
      awayScore,
      status
    });
  });

  return matches;
}

function normalizePlayers(rows) {
  return rows
    .map(row => {
      const teamId = clean(row.team_id).toUpperCase();
      const name = clean(row.name);
      if (!teamId || !name) return null;

      return {
        teamId,
        name,
        role: clean(row.role) || "Spieler",
        sort: toInt(row.sort) || 999
      };
    })
    .filter(Boolean);
}

function normalizeSettings(rows) {
  const settings = { ...DEFAULT_SETTINGS };

  rows.forEach(row => {
    const key = clean(row.key);
    const value = clean(row.value);
    if (key && value !== "") settings[key] = value;
  });

  return settings;
}

/* =========================================================
   Daten laden
   ========================================================= */
async function loadData() {
  if (state.loading) return;
  state.loading = true;
  setLoading(true);

  try {
    const jobs = [
      { key: "teams", label: "Teams", url: CONFIG.teamsUrl, demo: DEMO_TEAMS },
      { key: "matches", label: "Spiele", url: CONFIG.matchesUrl, demo: DEMO_MATCHES },
      { key: "players", label: "Spieler", url: CONFIG.playersUrl, demo: DEMO_PLAYERS },
      { key: "settings", label: "Einstellungen", url: CONFIG.settingsUrl, demo: DEMO_SETTINGS_ROWS }
    ];

    const results = await Promise.all(jobs.map(loadJob));
    const byKey = Object.fromEntries(results.map(result => [result.job.key, result]));
    const allowDemo = CONFIG.useDemoIfEmpty;
    const failedLabels = [];

    const pick = key => {
      const result = byKey[key];

      if (result.reason === "missing" && !allowDemo) return [];
      if (result.reason === "failed") {
        if (key === "teams" || key === "matches") failedLabels.push(result.job.label);
        if (!allowDemo) return [];
      }

      return result.rows;
    };

    const teamRows = pick("teams");
    const matchRows = pick("matches");
    const playerRows = pick("players");
    const settingsRows = pick("settings");

    const pairUsesDemo = byKey.teams.demo || byKey.matches.demo;

    if (pairUsesDemo && allowDemo) {
      state.teams = normalizeTeams(DEMO_TEAMS);
      state.matches = normalizeMatches(DEMO_MATCHES);
      state.players = normalizePlayers(DEMO_PLAYERS);
    } else {
      state.teams = normalizeTeams(teamRows);
      state.matches = normalizeMatches(matchRows);
      state.players = normalizePlayers(playerRows);
    }

    state.settings = normalizeSettings(settingsRows.length ? settingsRows : DEMO_SETTINGS_ROWS);

    const missingLabels = ["teams", "matches"]
      .filter(key => byKey[key].reason === "missing")
      .map(key => byKey[key].job.label);

    const usedDemo = pairUsesDemo && allowDemo;

    state.demo = {
      missingLabels,
      failed: failedLabels,
      blocked: !allowDemo && (missingLabels.length > 0 || failedLabels.length > 0)
    };
    state.status = state.demo.blocked ? "error" : usedDemo ? "demo" : "live";
    state.updatedAt = new Date();

    if (state.round === null || !state.roundTouched) state.round = defaultRound();

    render();
  } catch (error) {
    console.error("[TVE] Daten konnten nicht geladen werden.", error);
    state.teams = [];
    state.matches = [];
    state.players = [];
    state.demo = { missingLabels: [], failed: ["Daten"], blocked: true };
    state.status = "error";
    state.updatedAt = new Date();
    render();
  } finally {
    state.loading = false;
    setLoading(false);
  }
}

function setLoading(isLoading) {
  const button = $("#refreshBtn");
  if (!button) return;
  button.classList.toggle("is-loading", isLoading);
  button.disabled = isLoading;
  button.setAttribute("aria-busy", String(isLoading));
}

/* =========================================================
   Berechnungen
   ========================================================= */
function getFinishedMatches() {
  return state.matches.filter(match =>
    match.status === "finished" &&
    match.homeScore !== null &&
    match.awayScore !== null
  );
}

function latestFinishedRound() {
  const rounds = getFinishedMatches()
    .map(match => match.round)
    .filter(round => round > 0);

  return rounds.length ? Math.max(...rounds) : null;
}

function defaultRound() {
  return latestFinishedRound() || 1;
}

function teamById(id) {
  const key = clean(id).toUpperCase();
  return state.teams.find(team => team.id === key) || {
    id: key,
    name: key || "Unbekannt",
    short: (key || "?").slice(0, 3),
    color: "#8b8274"
  };
}

function computeStandings() {
  const rows = new Map();

  state.teams.forEach(team => {
    rows.set(team.id, {
      team,
      played: 0,
      wins: 0,
      losses: 0,
      scored: 0,
      against: 0
    });
  });

  const getRow = id => {
    if (!rows.has(id)) {
      rows.set(id, {
        team: teamById(id),
        played: 0,
        wins: 0,
        losses: 0,
        scored: 0,
        against: 0
      });
    }
    return rows.get(id);
  };

  getFinishedMatches().forEach(match => {
    const home = getRow(match.home);
    const away = getRow(match.away);

    home.played += 1;
    away.played += 1;
    home.scored += match.homeScore;
    home.against += match.awayScore;
    away.scored += match.awayScore;
    away.against += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.wins += 1;
      away.losses += 1;
    } else if (match.homeScore < match.awayScore) {
      away.wins += 1;
      home.losses += 1;
    }
  });

  return [...rows.values()]
    .map(row => ({ ...row, diff: row.scored - row.against }))
    .sort((a, b) =>
      b.wins - a.wins ||
      b.diff - a.diff ||
      b.scored - a.scored ||
      a.team.name.localeCompare(b.team.name, "de", { sensitivity: "base" })
    );
}

function roundNumbers() {
  const highestMatchRound = state.matches.reduce((max, match) => Math.max(max, match.round || 0), 0);
  const highest = Math.max(1, highestMatchRound, state.round || 0);
  return Array.from({ length: highest }, (_, index) => index + 1);
}

function compareMatches(a, b) {
  return (a.gameNo || 0) - (b.gameNo || 0) || a.id.localeCompare(b.id);
}

/* =========================================================
   Rendern
   ========================================================= */
function render() {
  const route = parseRoute();
  state.tab = route.tab;
  state.teamId = route.teamId;

  showView();
  renderChrome();
  renderNotice();
  renderTabelle();
  renderSpieltage();
  renderModus();
  renderTeam();
  renderFooter();
}

function parseRoute() {
  const hash = location.hash.replace(/^#/, "");

  if (hash.startsWith("team/")) {
    let teamId = "";
    try {
      teamId = decodeURIComponent(hash.slice(5)).trim().toUpperCase();
    } catch {
      teamId = "";
    }
    return teamId
      ? { tab: "team", teamId }
      : { tab: "tabelle", teamId: null };
  }

  return { tab: TABS.includes(hash) ? hash : "tabelle", teamId: null };
}

const VIEWS = [...TABS, "team"];

function showView() {
  VIEWS.forEach(tab => {
    const view = document.getElementById(`view-${tab}`);
    if (view) view.hidden = tab !== state.tab;
  });

  const activeTab = state.tab === "team" ? "tabelle" : state.tab;

  $$(".site-nav a").forEach(link => {
    const active = link.dataset.tab === activeTab;
    link.classList.toggle("is-active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderChrome() {
  const league = state.settings.league_name || "TVE Fall League";
  const season = state.settings.season || "";

  $("#brandName").textContent = league;
  $("#brandSeason").textContent = season ? `Saison ${season}` : "";
  $("#brandSeason").hidden = !season;

  $$("[data-league-meta]").forEach(element => {
    element.textContent = season ? `${league} · Saison ${season}` : league;
  });

  document.title = state.tab === "team"
    ? `${league} – ${state.teams.find(team => team.id === state.teamId)?.name || "Team"}`
    : `${league} – ${TAB_TITLES[state.tab] || "Tabelle"}`;
}

function renderNotice() {
  const element = $("#notice");
  let text = "";

  if (state.demo.blocked) {
    text = "Keine Daten verfügbar. Bitte später erneut laden.";
  } else if (state.demo.failed.length) {
    text = "Vorschau: Die Live-Daten konnten nicht geladen werden. Es werden Beispieldaten angezeigt.";
  } else if (state.demo.missingLabels.length) {
    text = "Vorschau: Es werden Beispieldaten angezeigt. Die echten Ergebnisse folgen.";
  }

  element.textContent = text;
  element.hidden = !text;
}

function renderTabelle() {
  const finished = getFinishedMatches();
  const latest = latestFinishedRound();
  const updated = state.updatedAt ? formatTime(state.updatedAt) : "–";

  $("#heroRound").textContent = latest ? `Spieltag ${latest}` : "Saisonstart";
  $("#heroSub").innerHTML =
    `${state.teams.length} Teams · ${finished.length} ${finished.length === 1 ? "Spiel" : "Spiele"} gespielt` +
    `<br>Aktualisiert ${escapeHtml(updated)} Uhr`;

  const host = $("#standings");

  if (!state.teams.length && !state.matches.length) {
    host.innerHTML = emptyState("Noch keine Teams hinterlegt", "Sobald die Teams eingetragen sind, erscheinen sie hier.");
    renderDailyQuote();
    return;
  }

  const rows = computeStandings();
  const noResults = finished.length === 0;

  host.innerHTML = `
    ${noResults ? `<p class="empty-note">Noch keine Ergebnisse eingetragen. Die Rangliste füllt sich nach dem ersten gespielten Spiel.</p>` : ""}
    <table class="standings">
      <caption class="sr-only">Tabelle der ${escapeHtml(state.settings.league_name || "TVE Fall League")}</caption>
      <thead>
        <tr>
          <th>Platz</th>
          <th>Team</th>
          <th class="num hide-sm">Sp</th>
          <th class="num">S</th>
          <th class="num">N</th>
          <th class="num">Diff</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row, index) => standingsRow(row, index)).join("")}
      </tbody>
    </table>
  `;

  renderDailyQuote();
}

function standingsRow(row, index) {
  const rank = index + 1;
  const diffClass = row.diff > 0 ? "plus" : row.diff < 0 ? "minus" : "";
  const leader = rank === 1 && row.played > 0;

  return `
    <tr class="${leader ? "is-leader" : ""}" data-team="${escapeHtml(row.team.id)}">
      <td><span class="rank">${rank}</span></td>
      <td>
        <a class="team team-link" href="#team/${encodeURIComponent(row.team.id)}">
          <span class="swatch" style="background:${row.team.color}" aria-hidden="true"></span>
          <span class="team-name">${escapeHtml(row.team.name)}</span>
          <span class="team-code">${escapeHtml(row.team.short)}</span>
        </a>
      </td>
      <td class="num hide-sm">${row.played}</td>
      <td class="num">${row.wins}</td>
      <td class="num">${row.losses}</td>
      <td class="num diff ${diffClass}">${formatDiff(row.diff)}</td>
    </tr>
  `;
}

function renderSpieltage() {
  const rounds = roundNumbers();

  if (state.round === null || !rounds.includes(state.round)) {
    state.round = defaultRound();
  }

  const chips = $("#roundChips");
  chips.innerHTML = rounds.map(round => `
    <button class="round-btn" type="button" data-round="${round}"
      aria-pressed="${round === state.round}" aria-label="Spieltag ${round}">${round}</button>
  `).join("");

  $("#roundCount").textContent = `1 bis ${rounds[rounds.length - 1]}`;
  $("#roundTitle").textContent = `Spieltag ${state.round}`;

  const matches = state.matches
    .filter(match => match.round === state.round)
    .sort(compareMatches);
  const finished = matches.filter(match => match.status === "finished").length;

  $("#roundMeta").textContent = matches.length
    ? `${matches.length} ${matches.length === 1 ? "Spiel" : "Spiele"}${finished ? ` · ${finished} gespielt` : ""}`
    : "Noch keine Spiele eingetragen";

  $("#roundMatches").innerHTML = matches.length
    ? matches.map(matchRow).join("")
    : `<p class="empty-note">Für Spieltag ${state.round} sind noch keine Spiele eingetragen.</p>`;

  const active = chips.querySelector('[aria-pressed="true"]');
  if (active && !$("#view-spieltage").hidden && chips.scrollWidth > chips.clientWidth + 1) {
    chips.scrollLeft = Math.max(0, active.offsetLeft - chips.clientWidth / 2 + active.offsetWidth / 2);
  }
}

function matchRow(match) {
  const home = teamById(match.home);
  const away = teamById(match.away);
  const status = STATUS[match.status] || STATUS.scheduled;
  const hasScore = match.status === "finished" && match.homeScore !== null && match.awayScore !== null;
  const homeWin = hasScore && match.homeScore > match.awayScore;
  const awayWin = hasScore && match.awayScore > match.homeScore;
  const label = `${match.gameNo ? `Spiel ${match.gameNo}` : "Spiel"} · ${status.label}`;

  return `
    <article class="match">
      <div class="match-main">
        <div class="match-side home ${homeWin ? "win" : awayWin ? "loss" : ""}">
          <a class="match-team" href="#team/${encodeURIComponent(home.id)}">${escapeHtml(home.name)}</a>
          <span class="swatch" style="background:${home.color}" aria-hidden="true"></span>
        </div>
        <div class="match-mid">
          <span class="match-label ${status.cls}">${label}</span>
          <span class="match-score ${hasScore ? "" : "is-empty"}">
            ${hasScore ? `${fmtScore(match.homeScore)}<i>:</i>${fmtScore(match.awayScore)}` : "–:–"}
          </span>
        </div>
        <div class="match-side away ${awayWin ? "win" : homeWin ? "loss" : ""}">
          <span class="swatch" style="background:${away.color}" aria-hidden="true"></span>
          <a class="match-team" href="#team/${encodeURIComponent(away.id)}">${escapeHtml(away.name)}</a>
        </div>
      </div>
    </article>
  `;
}

/* =========================================================
   Zitate und Team-Ansicht
   ========================================================= */
function dayIndex() {
  const now = new Date();
  return Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
}

function renderDailyQuote() {
  const figure = $("#dailyQuote");
  if (!figure) return;

  const teams = state.teams.filter(team => (TEAM_QUOTES[team.id] || []).length);
  if (!teams.length) {
    figure.hidden = true;
    return;
  }

  const day = dayIndex();
  const team = teams[day % teams.length];
  const quotes = TEAM_QUOTES[team.id];
  const text = quotes[day % quotes.length];

  $("#dailyQuoteText").textContent = `„${text}“`;
  $("#dailyQuoteBy").innerHTML =
    `<span class="swatch" style="background:${team.color}" aria-hidden="true"></span>` +
    `<span>${escapeHtml(team.name)}</span>`;
  figure.hidden = false;
}

function teamQuote(teamId) {
  const quotes = TEAM_QUOTES[teamId] || [];
  if (!quotes.length) return "";
  return quotes[dayIndex() % quotes.length];
}

function renderTeam() {
  if (state.tab !== "team" || !state.teamId) return;

  const host = $("#teamHero");
  const gamesHost = $("#teamGames");
  const body = $("#teamBody");
  const team = state.teams.find(candidate => candidate.id === state.teamId);

  if (!team) {
    body.hidden = true;
    host.innerHTML = `
      <a class="back-link" href="#tabelle">&larr; Tabelle</a>
      <h1 id="title-team" class="team-missing-title">Team nicht gefunden</h1>
      <p class="empty-note">Dieses Team steht nicht in der Teamliste.</p>
    `;
    gamesHost.innerHTML = "";
    $("#teamGameMeta").textContent = "";
    return;
  }

  body.hidden = false;

  const standings = computeStandings();
  const rank = standings.findIndex(row => row.team.id === team.id);
  const row = standings[rank] || { played: 0, wins: 0, losses: 0, diff: 0 };
  const quote = teamQuote(team.id);

  host.innerHTML = `
    <a class="back-link" href="#tabelle">&larr; Tabelle</a>
    <div class="team-title">
      <span class="swatch swatch-lg" style="background:${team.color}" aria-hidden="true"></span>
      <h1 id="title-team">${escapeHtml(team.name)}</h1>
      <span class="team-code">${escapeHtml(team.short)}</span>
    </div>
    <dl class="team-facts">
      <div><dt>Platz</dt><dd>${rank >= 0 ? rank + 1 : "–"}</dd></div>
      <div><dt>Spiele</dt><dd>${row.played}</dd></div>
      <div><dt>Bilanz</dt><dd>${row.wins}–${row.losses}</dd></div>
      <div><dt>Diff</dt><dd class="${row.diff > 0 ? "plus" : row.diff < 0 ? "minus" : ""}">${formatDiff(row.diff)}</dd></div>
    </dl>
    ${quote ? `<figure class="team-quote"><blockquote>„${escapeHtml(quote)}“</blockquote></figure>` : ""}
  `;

  const matches = state.matches
    .filter(match => match.home === team.id || match.away === team.id)
    .sort((a, b) => (a.round || 0) - (b.round || 0) || compareMatches(a, b));

  const finished = matches.filter(match =>
    match.status === "finished" && match.homeScore !== null && match.awayScore !== null
  ).length;

  $("#teamGameMeta").textContent = matches.length
    ? `${matches.length} Spiele · ${finished} gespielt`
    : "";

  if (!matches.length) {
    gamesHost.innerHTML = `<p class="empty-note">Für dieses Team sind noch keine Spiele eingetragen.</p>`;
    return;
  }

  const rounds = new Map();
  matches.forEach(match => {
    if (!rounds.has(match.round)) rounds.set(match.round, []);
    rounds.get(match.round).push(match);
  });

  gamesHost.innerHTML = [...rounds.entries()].map(([round, roundMatches]) => `
    <section class="team-round">
      <div class="team-round-head">
        <h3>${round > 0 ? `Spieltag ${round}` : "Ohne Spieltag"}</h3>
        <span>${roundMatches.length} ${roundMatches.length === 1 ? "Spiel" : "Spiele"}</span>
      </div>
      ${roundMatches.map(matchRow).join("")}
    </section>
  `).join("");
}

function renderModus() {
  const settings = state.settings;
  const facts = [
    ["Format", settings.modus_1],
    ["Spielzeit", settings.modus_2],
    ["Stallcount", settings.stallcount],
    ["Timeouts", settings.timeouts],
    ["Cap", settings.cap_mode],
    ["Start", settings.start_time ? `${settings.start_time} Uhr` : ""],
    ["Spiel 1", timeRange(settings.spiel_1_start, settings.spiel_1_ende)],
    ["Spiel 2", timeRange(settings.spiel_2_start, settings.spiel_2_ende)]
  ].filter(([, value]) => clean(value));

  $("#modeMeta").textContent = settings.season ? `Saison ${settings.season}` : "";

  $("#modeFacts").innerHTML = facts.map(([label, value]) => `
    <div class="fact">
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value)}</dd>
    </div>
  `).join("");

  const note = clean(settings.format_note);
  $("#formatNote").textContent = note;
  $("#formatNote").hidden = !note;

  $("#teamCount").textContent = state.teams.length ? `${state.teams.length} Teams` : "";

  if (!state.teams.length) {
    $("#teamGrid").innerHTML = emptyState("Noch keine Teams hinterlegt", "Sobald die Teams eingetragen sind, erscheinen sie hier.");
    return;
  }

  $("#teamGrid").innerHTML = state.teams.map(teamCard).join("");
}

function teamCard(team) {
  const roster = state.players
    .filter(player => player.teamId === team.id)
    .sort((a, b) =>
      a.sort - b.sort ||
      a.name.localeCompare(b.name, "de", { sensitivity: "base" })
    );

  let rosterHtml = "";
  if (roster.length) {
    rosterHtml = `
      <ul class="roster">
        ${roster.map(player => `
          <li>
            <span>${escapeHtml(player.name)}</span>
            <span class="role">${escapeHtml(player.role)}</span>
          </li>
        `).join("")}
      </ul>
    `;
  } else if (state.players.length) {
    rosterHtml = `<p class="roster-empty">Kein Kader hinterlegt</p>`;
  }

  return `
    <article class="team-card">
      <a class="team-head" href="#team/${encodeURIComponent(team.id)}">
        <span class="swatch" style="background:${team.color}" aria-hidden="true"></span>
        <h3>${escapeHtml(team.name)}</h3>
        <span class="team-code">${escapeHtml(team.short)}</span>
      </a>
      ${rosterHtml}
    </article>
  `;
}

function emptyState(title, text) {
  return `
    <div class="empty-state">
      <p class="empty-title">${escapeHtml(title)}</p>
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}

function renderFooter() {
  const labels = {
    live: "Aktuell",
    demo: "Vorschau",
    error: "Keine Daten"
  };

  $("#dataStatus").textContent = labels[state.status] || "Vorschau";
  $("#statusDot").className = `dot ${state.status}`;
  $("#updatedAt").textContent = state.updatedAt ? `Aktualisiert ${formatTime(state.updatedAt)} Uhr` : "";
  $("#footerBrand").textContent = state.settings.league_name || "TVE Fall League";
}

/* =========================================================
   Ereignisse
   ========================================================= */
function handleRoundClick(event) {
  const button = event.target.closest("button[data-round]");
  if (!button) return;

  const round = Number(button.dataset.round);
  if (!Number.isFinite(round) || round === state.round) return;

  state.round = round;
  state.roundTouched = true;
  renderSpieltage();

  const selected = $(`#roundChips button[data-round="${round}"]`);
  if (selected) selected.focus({ preventScroll: true });
}

function handleStandingsClick(event) {
  const row = event.target.closest("tr[data-team]");
  if (!row || event.target.closest("a")) return;
  location.hash = `#team/${encodeURIComponent(row.dataset.team)}`;
}

function scheduleAutoRefresh() {
  if (!CONFIG.autoRefreshMinutes || !isHttp(CONFIG.matchesUrl)) return;

  setInterval(() => {
    if (!document.hidden && !state.loading) loadData();
  }, CONFIG.autoRefreshMinutes * 60 * 1000);
}

function init() {
  $("#refreshBtn").addEventListener("click", () => loadData());
  $("#roundChips").addEventListener("click", handleRoundClick);
  $("#standings").addEventListener("click", handleStandingsClick);

  window.addEventListener("hashchange", () => {
    render();
    window.scrollTo(0, 0);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden || !CONFIG.autoRefreshMinutes || !isHttp(CONFIG.matchesUrl) || !state.updatedAt) return;
    const age = Date.now() - state.updatedAt.getTime();
    if (age > CONFIG.autoRefreshMinutes * 60 * 1000) loadData();
  });

  loadData().then(scheduleAutoRefresh);
}

init();
