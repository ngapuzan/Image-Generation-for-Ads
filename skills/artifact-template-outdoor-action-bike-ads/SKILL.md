---
name: artifact-template-outdoor-action-bike-ads
description: "Create an image using the Outdoor Action Bike Ads template and its retained reference file. Use when the user selects this template, names Outdoor Action Bike Ads, or asks to create an Outdoor Action Bike Ad. Create realistic outdoor cycling ads with dynamic riding perspectives, natural light, city or trail settings, and selectable captions, fonts and text placement."
---

# Outdoor Action Bike Ads

Create an image from this template. Keep the reference file unchanged.

## Workflow

1. Read `artifact-template.json` and resolve its paths relative to this skill directory.
2. Invoke $imagegen with the retained PNG as a reference image and the user's requested content as the edit or generation brief.
3. Treat the user's prompt and available sources as the content input. Do not invent factual claims merely to fill the composition.
4. Preserve the reference's visual language unless the user explicitly requests a deviation.
5. Visually inspect the generated image for fidelity and defects, then return the final image.

## Fidelity

Preserve the reference image's composition, visual hierarchy, palette, typography, material treatment, lighting, and restrained brand placement. Replace reference branding with the requested brand; never carry Specialized branding or its model names into another bike’s ad.

User instructions control requested content and explicit deviations. The retained reference controls layout and formatting where the user has not requested a change.


## Outdoor photography system

Use the retained images as photography and layout references, never as evidence of the requested product's construction or performance. Read the relevant image before using it. Prioritize a supplied product image for bicycle identity and the retained reference for style. Use the current image-generation capability and follow its instructions; do not render the photography in code.

| Control | Choices | Default |
| --- | --- | --- |
| Setting | City commute; Countryside lane; Gravel path; Forest trail; Coastal route; Rocky trail | Countryside lane suitable for the supplied bike |
| Perspective | Side tracking; Low front three-quarter; Rear three-quarter; Close-up in motion; Wide environmental; Paused lifestyle portrait | Side tracking |
| Light | Soft daylight; Bright natural daylight; Warm late afternoon; Overcast | Soft daylight |
| Captions | With captions; Without captions; Matched pairs | With captions |
| Font | Clean bold sans; Condensed bold; Editorial serif | Clean bold sans |
| Text placement | Lower left; Upper left; Lower centre; Right side | Lower left |
| Format | Portrait feed 4:5; Story 9:16; Square 1:1; Landscape | Portrait feed 4:5 |

Honor controls supplied in the prompt. When asked to generate, use defaults for omitted optional choices and proceed. Show the compact options only when the user wants to choose; avoid a compulsory questionnaire. Generate one image by default. Do not assume every request needs 14 images based on earlier projects. If the user requests a batch, deliver the requested number of separate images, not a single collage. For a request such as seven captioned and seven blank, use seven distinct compositions and make corresponding text-free versions, keeping each pair consistent. “Blank” means the complete photograph without added ad copy or overlay branding, not an empty canvas; preserve authentic bike markings.

## Reference map

- `assets/reference.png` and `assets/gravel-tracking.png`: close side tracking shot, rider partly cropped, prominent frame and front wheel, natural motion blur, short white headline and small model label.
- `assets/drivetrain-action.png`: low rear tracking shot emphasizing drivetrain, wheel and pedalling motion.
- `assets/forest-action.png`: dynamic forest trail action, low angle, earthy greens and browns.
- `assets/rocky-trail.png`: mountain-bike terrain, directional warm light and close action crop.
- `assets/urban-editorial.png`: paused city lifestyle composition, architectural setting, human character and full bike presence.
- `assets/low-angle-lifestyle.png`: bold low-angle bike-and-person portrait with clear sky and strong product presence.
- `assets/city-side-profile.jpg`, `assets/commuter-side-profile.webp`, `assets/city-panning.jpg`: everyday city cycling, side-on composition and panning movement. Use stock references for broad photographic cues only; create a fresh scene and never reproduce their watermarks, captions or stock IDs.

Do not force mountain-bike stunts onto commuter or step-through bikes. Choose ordinary paths and realistic riding for those products; reserve rough terrain and jumps for suitable bikes when requested. Use natural, relaxed posture, believable clothing and practical rider interaction. Default to a helmet, hands on the bars, and plausible feet-to-pedal contact while riding. Do not copy the hands-free pose from the city-panning reference by default.

## Product fidelity and realism

Obtain the brand/model and a clear product photo or available exact product source before generation; ask only if essential information is missing. Inspect supplied photos and prioritize them over style references. Preserve frame geometry, step-through opening, wheel size and relative proportions, fork, handlebars, saddle, drivetrain, motor, battery location, racks, mudguards, cables, accessories and actual colour. Never invent a battery-removal mechanism, suspension, component or specification. If the angle hides a feature, select a supported angle instead of inventing details. Use feature callouts only when supported by the supplied material.

Match light direction, exposure, colour temperature, shadows, perspective and sharpness across rider, bike and environment. Avoid a pasted-on bike or excessive contrast. Keep skin and fabric textures natural. Match weather, sky, clothing and ground conditions. Apply motion blur coherently to the background and rotating wheels while keeping the main product identifiable. Check wheel alignment, spokes, chain routing, human anatomy, hand grips and foot placement. Avoid duplicated components, floating tyres and impossible contact shadows.

Use natural greens, stone, earth, muted city tones and authentic daylight. Outdoor images need not follow the Dark Bike Ads template's dark studio palette. Keep saturation controlled and reserve stronger colour for the real bike or clothing when appropriate.

## Typography and copy

Use readable white or off-white headlines, a small optional model label and restrained brand placement, with about 6% edge clearance and extra Story interface space. Use a subtle local gradient only when needed for contrast. Keep text off the bike's main features and rider's face. Use the supplied logo when available; otherwise use a plain brand name. Do not invent a brand logo.

Use English with British spelling unless directed otherwise. Preserve supplied copy exactly. When asked to draft, use a short original lifestyle headline based on known product information; do not copy the references' slogans or carry over their French text. Never invent range, speed, power, battery capacity, discounts, reviews, availability or testimonials. Named font styles are visual guidance, not a promise of exact font files or editable raster text.

## Finish and reusable command

Inspect every output for correct brand and model, product shape, realistic rider interaction, lighting, cropping, text spelling and requested caption state. Correct visible defects before delivery. Do not generate sample ads merely because the user asks to create or configure this template; generate images when requested.

Recognize “Create an Outdoor Action Bike Ad” when this skill is selected. Support:

Create an Outdoor Action Bike Ad. Brand/model: [name]. Product photos: [attached]. Setting: [city/countryside/gravel/forest/coast]. Perspective: [side/low front/rear/detail/wide/lifestyle]. Light: [daylight/golden hour/overcast]. Captions: [with/without/matched pairs]. Headline: [exact text/draft for me]. Font: [clean/condensed/editorial]. Text: [position]. Format: [4:5/9:16/1:1]. Quantity: [number].
