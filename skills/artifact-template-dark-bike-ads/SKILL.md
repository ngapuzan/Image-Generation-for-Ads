---
name: artifact-template-dark-bike-ads
description: "Create an image using the Dark Bike Ads template and its retained reference file. Use when the user selects this template, selects this personal skill, or names Dark Bike Ads. Create bike ads with selectable fonts, text placement, and restrained dark backgrounds."
---

# Dark Bike Ads

Create an image from this template. Keep the reference file unchanged.

## Workflow

1. Read `artifact-template.json` and resolve its paths relative to this skill directory.
2. Invoke $imagegen with the retained PNG as a reference image and the user's requested content as the edit or generation brief.
3. Treat the user's prompt and available sources as the content input. Do not invent factual claims merely to fill the composition.
4. Preserve the reference's visual language unless the user explicitly requests a deviation.
5. Visually inspect the generated image for fidelity and defects, then return the final image.

## Fidelity

Preserve the reference image's composition, visual hierarchy, palette, typography, material treatment, lighting, and restrained brand placement. Replace the reference brand and product with the user's supplied brand and bike; never carry Specialized branding into another brand's ad.

User instructions control requested content and explicit deviations. The retained reference controls layout and formatting where the user has not requested a change.

## Selectable ad system

Use these choices independently. Honor choices supplied in the prompt. If no style is supplied, present this compact menu once and offer the default; accept a short combination such as Studio / Condensed / Lower left / Charcoal. If asked to generate immediately, proceed using defaults.

| Control | Choices | Default |
| --- | --- | --- |
| Composition | Studio full bike; Detail close-up; Muted outdoor | Studio full bike |
| Font style | Clean sans (Inter/Helvetica style); Condensed bold (DIN/Oswald style); Editorial serif | Clean sans |
| Text position | Upper left; Lower left; Lower centre; Right side | Lower left |
| Background | Charcoal; Dark olive; Midnight blue; Dark neutral landscape | Charcoal |
| Background element | Soft spotlight; Subtle grain; Tonal geometric shapes; None | Soft spotlight |
| Format | Story 9:16; Portrait feed 4:5; Square 1:1 | Story 9:16 |

Keep backgrounds dark and low saturation, with at most one subdued accent tone. Allow the supplied bike's actual colour to remain accurate. Use white or off-white readable copy, ample negative space, and a clear headline hierarchy. Place text away from important bike components, maintain approximately 6% edge margins, and leave extra top and bottom room for Story interface overlays. Avoid rainbow palettes, excessive effects, crowded copy, and invented badges.

## Inputs and accuracy

Collect brand/model, an accurate product photo, headline or offer, optional CTA/logo, and selected style. Ask only for essential missing product details. Use a supplied logo unchanged where feasible; otherwise use a plain brand name rather than fabricating a trademark. Preserve frame geometry, battery position, wheels, drivetrain, accessories, and colours. Treat retained ads as style references, not product evidence. Never substitute the reference bike for the requested model.

Use the full-bike studio reference as the primary default. Consult assets/detail-reference.png for close-up compositions and assets/outdoor-reference.png for muted outdoor compositions. Keep original references unchanged.

Never copy reference discounts, ratings, review counts, specifications, or availability claims without user-supplied confirmation. Use English unless another language is requested. Do not invent testimonials. If promotional copy is absent, draft a short neutral headline based on the supplied product information.

Use the available image-generation capability for raster creation and edits, following its current instructions. Inspect local reference images before using them. Preserve product accuracy; if source quality prevents a faithful result, explain the limitation and request a better product image. Named font styles guide generation; do not promise exact font fidelity or editable text layers in raster output. For exact fonts or separate text layers, use an appropriate layout capability and supplied font files, subject to available tools.

Generate one final ad by default. If the user asks to see options, make three variants using the same bike, copy, and dimensions, varying only the chosen design controls; label the choices clearly. Check spelling, text contrast, logo/brand, supplied offer, bike shape, cropping, and palette before delivery. Allow iterative requests such as 'same ad, condensed font, text upper left'.

## Reusable request

Recognize 'Create a Dark Bike Ad' as the reusable command when this skill is selected. Support this input pattern:

Create a Dark Bike Ad. Brand/model: [name]. Product image: [attached]. Headline/offer: [exact text or draft for me]. CTA: [optional]. Layout: [Studio/Detail/Outdoor]. Font: [Clean/Condensed/Editorial]. Text: [Upper left/Lower left/Lower centre/Right]. Tone: [Charcoal/Olive/Midnight]. Format: [9:16/4:5/1:1].
