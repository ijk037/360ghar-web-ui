// Map backend snake_case tool names to human-readable labels
const TOOL_LABELS = {
  owner_properties_list: 'Checking properties',
  owner_properties_create: 'Creating property',
  owner_properties_get: 'Getting property details',
  owner_properties_update: 'Updating property',
  owner_properties_toggle_availability: 'Updating availability',
  tenant_lease_current: 'Checking lease',
  tenant_rent_history: 'Checking rent history',
  tenant_maintenance_create: 'Creating request',
  tenant_maintenance_list: 'Checking maintenance',
  bookings_check_availability: 'Checking availability',
  bookings_get_pricing: 'Getting pricing',
  bookings_create: 'Creating booking',
  bookings_list: 'Checking bookings',
  bookings_get: 'Getting booking details',
  bookings_cancel: 'Cancelling booking',
  user_system_status: 'Checking status',
  agent_properties_list: 'Listing properties',
  agent_properties_get: 'Getting property',
  agent_properties_create_for_owner: 'Creating property',
  agent_properties_verify: 'Verifying property',
  agent_leases_list: 'Checking leases',
  agent_leases_create: 'Creating lease',
  agent_leases_terminate: 'Terminating lease',
  agent_rent_list_due: 'Checking overdue rent',
  agent_rent_record_payment: 'Recording payment',
  agent_maintenance_list: 'Checking maintenance',
  agent_maintenance_update_status: 'Updating maintenance',
  agent_bookings_list_all: 'Checking all bookings',
  agent_bookings_update_status: 'Updating booking',
  agent_dashboard_overview: 'Loading dashboard',
  admin_system_status: 'Checking system',
  discovery_search: 'Searching properties',
  discovery_property_get: 'Getting property',
  discovery_feed: 'Loading feed',
};

function humanize(snakeName) {
  return snakeName
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Spinner SVG for running state
function Spinner() {
  return (
    <svg className="chatbot-tool-chip__spinner" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
  );
}

// Checkmark SVG for done state
function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

// X icon for error state
function ErrorIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

export default function ToolChip({ toolCall }) {
  const { tool, status, summary } = toolCall;
  const label = TOOL_LABELS[tool] || humanize(tool);

  return (
    <span
      className={`chatbot-tool-chip chatbot-tool-chip--${status}`}
      title={summary || label}
      aria-label={`${label}: ${status}`}
    >
      {status === 'running' && <Spinner />}
      {status === 'done' && <CheckIcon />}
      {status === 'error' && <ErrorIcon />}
      <span className="chatbot-tool-chip__label">{label}</span>
    </span>
  );
}
