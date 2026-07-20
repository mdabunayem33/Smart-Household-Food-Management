// Expiry progress math shared by Inventory screen — computes remaining shelf life
// percentage, color tier, and (for expired items) a reversed right-to-left red fill.
// Non-expired fill/color follow fixed day-based bands (not a ratio of total shelf life)
// so the bar communicates urgency consistently: >7d green ~95%, 4–7d yellow 60–80%,
// 2–3d orange 35–48%, 1d red ~15%, today solid red ~8%.
function fkExpiryProgress(addedDateStr, expiryDateStr) {
  const msPerDay = 86400000;
  const now = new Date();
  const expiry = new Date(expiryDateStr);
  const remainingDays = Math.ceil((expiry - now) / msPerDay);

  if (remainingDays < 0) {
    const daysExpired = Math.max(1, Math.floor((now - expiry) / msPerDay));
    const capDays = Math.min(daysExpired, 14);
    const fillPct = Math.min(100, 15 + (capDays / 14) * 85);
    const label = daysExpired === 1 ? 'Expired yesterday' : `Expired ${daysExpired} days ago`;
    return { expired: true, daysExpired, label, fillPct, color: 'var(--color-expired)' };
  }

  let fillPct;
  let color;
  if (remainingDays > 7) { fillPct = 95; color = 'var(--color-fresh)'; }
  else if (remainingDays >= 4) { fillPct = 60 + ((remainingDays - 4) / 3) * 20; color = 'var(--color-aging)'; }
  else if (remainingDays >= 2) { fillPct = 35 + (remainingDays - 2) * 13; color = 'var(--color-soon)'; }
  else if (remainingDays === 1) { fillPct = 15; color = 'var(--color-expired)'; }
  else { fillPct = 8; color = 'var(--color-expired)'; }

  const label = remainingDays === 0 ? 'Expires today'
    : remainingDays === 1 ? 'Expires tomorrow'
    : `Expires in ${remainingDays} days`;
  return { expired: false, remainingDays, label, fillPct, color };
}
window.fkExpiryProgress = fkExpiryProgress;
