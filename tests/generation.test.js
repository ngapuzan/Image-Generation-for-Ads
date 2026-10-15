import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateGeneration,buildPrompt} from '../server/generation.js';
const valid={preset:'dark',reference:'data:image/png;base64,aGVsbG8=',prompt:'Low camera angle',mode:'scene'};
test('accepts supported generation options',()=>assert.equal(validateGeneration(valid),null));
test('rejects unsupported presets, images, modes and oversized prompts',()=>{
  for(const patch of [{preset:'unknown'},{reference:'https://untrusted.example/bike.png'},{mode:'unknown'},{prompt:'a'.repeat(2001)}]) assert.ok(validateGeneration({...valid,...patch}));
});
test('separates transparent cutout and full scene directions',()=>{
  assert.match(buildPrompt({...valid,mode:'cutout'}),/fully transparent background/);
  assert.match(buildPrompt(valid),/complete environment/);
  assert.match(buildPrompt(valid),/Do not add text/);
});

test('outdoor defaults suit the supplied bike and references cannot replace product identity',()=>{
  const prompt=buildPrompt({...valid,preset:'outdoor'});
  assert.match(prompt,/countryside lane/);
  assert.match(prompt,/Never force mountain-bike stunts/);
  assert.match(prompt,/style references only/);
});
