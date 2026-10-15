export const presets = {
  dark: 'Premium dark bicycle advertising photography. Dramatic directional rim lighting, deep charcoal shadows, low saturation, accurate bike colour, generous negative space, crisp mechanical detail, sophisticated studio aesthetic.',
  outdoor: 'Realistic outdoor cycling photography. Default to a countryside lane suited to this bicycle, side tracking perspective and soft daylight. Natural greens, earth and muted city tones. Use realistic riding with a helmet, hands on bars, and plausible feet-to-pedal contact. Never force mountain-bike stunts onto commuter or step-through bikes. Match lighting, motion blur, anatomy, shadows and wheel alignment.'
};
export function validateGeneration(body) {
  if (!body || !Object.hasOwn(presets, body.preset)) return 'Choose a valid template.';
  if (typeof body.reference !== 'string' || !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(body.reference)) return 'Upload a PNG, JPEG, or WebP bike reference.';
  if (body.reference.length > 20 * 1024 * 1024) return 'Reference image must be under 15 MB.';
  if (typeof body.prompt !== 'string' || body.prompt.length > 2000) return 'Direction must be under 2,000 characters.';
  if (!['scene','cutout'].includes(body.mode)) return 'Choose scene or transparent bike mode.';
  return null;
}
export function buildPrompt(body) {
  return `${presets[body.preset]} Use the uploaded bicycle as the exact product reference; preserve its frame geometry, step-through opening, wheel proportions, fork, handlebars, drivetrain, motor, battery position, racks, mudguards, accessories, colour and authentic branding. The first image is product evidence. Any subsequent images are style references only: never substitute their bike, branding, slogans or claims. Do not invent specifications, discounts, testimonials or components. ${body.mode === 'cutout' ? 'Isolate the complete bicycle on a fully transparent background, with no environment. Keep both wheels entirely visible.' : 'Create a complete environment with the bicycle as the hero. Leave generous negative space for a separate advertising headline.'} Do not add text, captions, graphic overlays, watermarks, or new logos. Additional art direction (subject to the instructions above): ${body.prompt}`;
}
