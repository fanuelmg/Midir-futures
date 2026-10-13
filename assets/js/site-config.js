/**
 * MIDIR FUTURES — Site Configuration
 * ====================================
 * Update ALL placeholder values below before launch.
 * This is the single source of truth for configurable content.
 */

const SITE_CONFIG = {

  // ── DOMAIN & URLs ──────────────────────────────────────────
  // Replace with your purchased domain before going live.
  domain: 'REPLACE_WITH_OFFICIAL_DOMAIN',           // e.g. 'midirfutures.org'
  siteUrl: 'https://REPLACE_WITH_OFFICIAL_DOMAIN',

  // ── ORGANISATION ──────────────────────────────────────────
  orgName: 'MIDIR FUTURES',
  tagline: 'RESTORING NATURE. EMPOWERING PEOPLE.',
  shortMission: 'Restoring Ethiopia\'s natural landscapes while empowering communities to build resilient, sustainable futures.',

  // ── CONTACT DETAILS ───────────────────────────────────────
  // Replace these placeholder values with approved contact information.
  email: 'REPLACE_WITH_OFFICIAL_EMAIL',             // e.g. 'info@midirfutures.org'
  phone1: 'REPLACE_WITH_OFFICIAL_PHONE',            // e.g. '+251 911 850 920'
  phone2: '',                                        // optional second number
  address: 'REPLACE_WITH_APPROVED_ADDRESS',         // full office address

  // ── SOCIAL MEDIA ──────────────────────────────────────────
  // Replace with verified, approved social URLs.
  social: {
    facebook:  'REPLACE_WITH_OFFICIAL_SOCIAL_URL',
    twitter:   'REPLACE_WITH_OFFICIAL_SOCIAL_URL',
    linkedin:  'REPLACE_WITH_OFFICIAL_SOCIAL_URL',
    instagram: 'REPLACE_WITH_OFFICIAL_SOCIAL_URL',
    youtube:   ''
  },

  // ── IMPACT METRICS ────────────────────────────────────────
  // Values sourced from the organisation's verified records.
  // Mark any uncertain value with a note and confirm before launch.
  impact: {
    treesPlanted:     { value: '40M+',   label: 'Trees Planted',          note: 'Confirmed from organisational records' },
    yearsExperience:  { value: '25+',    label: 'Years of Experience',     note: 'Founded 2001' },
    communitiesServed:{ value: '100+',   label: 'Communities Reached',     note: '*** REQUIRES CONFIRMATION before launch ***' },
    farmersSupported: { value: '10,000+',label: 'Farmers Supported',       note: '*** REQUIRES CONFIRMATION before launch ***' },
    hectaresRestored: { value: '50,000+',label: 'Hectares Under Restoration', note: '*** REQUIRES CONFIRMATION before launch ***' }
  },

  // ── FORM ENDPOINT ─────────────────────────────────────────
  // Configure a backend service (e.g. Formspree, Netlify Forms) before launch.
  // Leave empty to show the honest "not yet configured" notice.
  formEndpoint: '',                                  // e.g. 'https://formspree.io/f/YOUR_FORM_ID'

};

// Make config available globally
window.SITE_CONFIG = SITE_CONFIG;
