import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {readFile} from 'node:fs/promises';
import { validateGeneration, buildPrompt } from './generation.js';
const app = express();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
app.disable('x-powered-by');
app.use(express.json({limit:'22mb'}));
app.get('/api/status', (_req,res) => res.json({generationConfigured:Boolean(process.env.IMAGE_API_KEY), model:process.env.IMAGE_MODEL || 'gpt-image-1'}));
let busy = false;
app.post('/api/generate', async (req,res) => {
  const error = validateGeneration(req.body);
  if (error) return res.status(400).json({error});
  if (!process.env.IMAGE_API_KEY) return res.status(503).json({error:'Image generation is not connected. Add IMAGE_API_KEY in server environment settings, then restart. You can upload an existing photo and use every editor feature now.'});
  if (busy) return res.status(429).json({error:'Another image is generating. Please wait for it to finish.'});
  busy = true;
  try {
    const [header,data] = req.body.reference.split(',');
    const mime = header.match(/data:(.*);base64/)[1];
    const form = new FormData();
    form.set('model',process.env.IMAGE_MODEL || 'gpt-image-1');
    form.set('image',new Blob([Buffer.from(data,'base64')],{type:mime}),`reference.${mime.split('/')[1]}`);
    const styleFolder = req.body.preset === 'dark' ? 'artifact-template-dark-bike-ads' : 'artifact-template-outdoor-action-bike-ads';
    const style = await readFile(path.join(root,'skills',styleFolder,'assets','reference.png'));
    form.append('image',new Blob([style],{type:'image/png'}),'style-reference.png');
    form.set('prompt',buildPrompt(req.body));
    form.set('size','1024x1536');
    form.set('quality','high');
    form.set('background',req.body.mode === 'cutout' ? 'transparent' : 'opaque');
    form.set('output_format','png');
    const upstream = await fetch('https://api.openai.com/v1/images/edits',{method:'POST',headers:{Authorization:`Bearer ${process.env.IMAGE_API_KEY}`},body:form,signal:AbortSignal.timeout(240000)});
    if (!upstream.ok) {
      // Do not expose provider responses, request credentials, or internal headers.
      return res.status(502).json({error:`The image provider returned ${upstream.status}. Check the server key, model access, billing, and network access before trying again.`});
    }
    const output = await upstream.json();
    if (!output.data?.[0]?.b64_json) throw new Error('missing image');
    res.json({image:`data:image/png;base64,${output.data[0].b64_json}`});
  } catch (err) {
    res.status(502).json({error:err.name === 'TimeoutError' ? 'Generation timed out. The provider may still have processed the request; check usage before retrying.' : 'Could not complete generation. Check provider connectivity and server configuration.'});
  } finally { busy = false; }
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(root,'dist')));
  app.get('/{*path}',(_req,res)=>res.sendFile(path.join(root,'dist/index.html')));
} else {
  const {createServer} = await import('vite');
  const vite = await createServer({root, server:{middlewareMode:true},appType:'spa'});
  app.use(vite.middlewares);
}
app.use((err,_req,res,_next)=>res.status(err.status || 500).json({error:err.type === 'entity.too.large' ? 'Image is too large. Use a file under 15 MB.' : 'Request could not be processed.'}));
app.listen(Number(process.env.PORT || 3000),'0.0.0.0',()=>console.log(`Ride Studio listening on port ${process.env.PORT || 3000}`));
