import { sampleBike } from './sample.js';
export const fonts = { Arial: 'Arial, sans-serif', Helvetica: 'Helvetica, Arial, sans-serif', Georgia: 'Georgia, serif', Impact: 'Impact, sans-serif', Courier: '"Courier New", monospace', Verdana: 'Verdana, sans-serif' };
const fontFor = layer => fonts[layer.font || 'Arial'] || fonts.Arial;
export const formats = {portrait:[1080,1350],square:[1080,1080],story:[1080,1920],landscape:[1920,1080]};
export const templates = {
  dark: {name:'Dark bike',eyebrow:'THE AFTER-HOURS COLLECTION',headline:'OWN THE\nNIGHT.',tagline:'Precision built. Unapologetically bold.',background:'#171c19',accent:'#d9e8b6',scene:'studio'},
  outdoor: {name:'Outdoor action',eyebrow:'BUILT FOR THE WAY OUT',headline:'BEYOND\nTHE ROAD.',tagline:'Find your line. Leave the ordinary behind.',background:'#b4b29c',accent:'#edffad',scene:'mountains'}
};
export function createProject(preset='outdoor') {
  const t=templates[preset];
  return {version:1,name:'Untitled campaign',preset,format:'portrait',background:{color:t.background,image:null,scene:t.scene},effects:{brightness:100,contrast:100,saturation:85,noise:8,vignette:25},layers:[
    {id:'bike',type:'photo',name:'Hero bike',src:sampleBike,x:0.5,y:0.59,width:1.02,opacity:100,rotation:0,visible:true,sample:true},
    {id:'brand',type:'text',name:'Brand',text:'RIDGE / CYCLES',x:0.075,y:0.055,size:22,color:'#ffffff',opacity:90,weight:700,align:'left',rotation:0,visible:true},
    {id:'eyebrow',type:'text',name:'Eyebrow',text:t.eyebrow,x:0.075,y:0.15,size:17,color:t.accent,opacity:100,weight:600,align:'left',rotation:0,visible:true},
    {id:'headline',type:'text',name:'Headline',text:t.headline,x:0.07,y:0.198,size:116,color:'#f6f4eb',opacity:100,weight:900,align:'left',rotation:0,visible:true},
    {id:'tagline',type:'text',name:'Tagline',text:t.tagline,x:0.075,y:0.863,size:22,color:'#f6f4eb',opacity:90,weight:400,align:'left',rotation:0,visible:true},
    {id:'cta',type:'text',name:'Call to action',text:'EXPLORE THE COLLECTION  ↗',x:0.075,y:0.92,size:18,color:t.accent,opacity:100,weight:700,align:'left',rotation:0,visible:true}
  ]};
}
const cache=new Map();
export function loadImage(src) {
  if(!cache.has(src)) cache.set(src,new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>{cache.delete(src);reject(new Error('Could not load this image.'));};im.src=src;}));
  return cache.get(src);
}
export async function layerBounds(layer,w,h,ctx) {
  if(layer.type === 'text') {
    ctx.font=`${layer.weight} ${layer.size*w/1080}px ${fontFor(layer)}`;
    const lines=layer.text.split('\n');
    const width=Math.max(10,...lines.map(t=>ctx.measureText(t).width));
    return {x:layer.x*w-(layer.align==='center'?width/2:layer.align==='right'?width:0),y:layer.y*h,w:width,h:lines.length*layer.size*w/1080*1.02};
  }
  const img=await loadImage(layer.src);
  const width=layer.width*w,height=width*img.height/img.width;
  return {x:layer.x*w-width/2,y:layer.y*h-height/2,w:width,h:height};
}
export async function renderProject(canvas,project) {
  const [w,h]=formats[project.format];canvas.width=w;canvas.height=h;
  const c=canvas.getContext('2d');
  c.fillStyle=project.background.color;c.fillRect(0,0,w,h);
  c.save();
  const f=project.effects;
  c.filter=`brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturation}%)`;
  // Draw the base into a temporary surface so adjustments cover the background too.
  const base=document.createElement('canvas');base.width=w;base.height=h;const b=base.getContext('2d');
  b.fillStyle=project.background.color;b.fillRect(0,0,w,h);
  if(project.background.scene === 'mountains' && !project.background.image) {
    const sky=b.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#434e43');sky.addColorStop(.48,project.background.color);sky.addColorStop(1,'#343d2b');b.fillStyle=sky;b.fillRect(0,0,w,h);
    for(let i=0;i<4;i++) {
      b.fillStyle=['#6f7866','#515f4d','#394b39','#283c2d'][i];b.beginPath();b.moveTo(0,h);
      for(let j=0;j<=14;j++) {const x=j*w/14;const y=h*(.45+i*.13) + Math.sin(j*1.5+i*2.2)*h*.055+Math.cos(j*2.8+i)*h*.04;b.lineTo(x,y);}
      b.lineTo(w,h);b.fill();
    }
    const ground=b.createLinearGradient(0,h*.65,0,h);ground.addColorStop(0,'#8a8a66');ground.addColorStop(1,'#313c2a');b.fillStyle=ground;b.beginPath();b.moveTo(0,h*.83);b.lineTo(w,h*.7);b.lineTo(w,h);b.lineTo(0,h);b.fill();
  } else if(project.background.scene==='studio' && !project.background.image) {
    const g=b.createRadialGradient(w*.5,h*.5,0,w*.5,h*.5,w*.8);g.addColorStop(0,'#57614a');g.addColorStop(1,project.background.color);b.fillStyle=g;b.fillRect(0,0,w,h);
  }
  if(project.background.image) {
    const im=await loadImage(project.background.image);const r=Math.max(w/im.width,h/im.height);b.drawImage(im,(w-im.width*r)/2,(h-im.height*r)/2,im.width*r,im.height*r);
  }
  for(const l of project.layers.filter(l=>l.type==='photo' && l.visible)) await drawLayer(b,l,w,h);
  c.drawImage(base,0,0);c.restore();
  if(f.vignette) {const v=c.createRadialGradient(w/2,h*.45,w*.1,w/2,h/2,Math.max(w,h)*.7);v.addColorStop(0,'transparent');v.addColorStop(1,`rgba(0,0,0,${f.vignette/100})`);c.fillStyle=v;c.fillRect(0,0,w,h);}
  if(f.noise) {
    // Deterministic film grain: exports and previews use the same texture.
    const grain=document.createElement('canvas');grain.width=256;grain.height=256;const gc=grain.getContext('2d');const pixels=gc.createImageData(256,256);let seed=23;
    for(let i=0;i<pixels.data.length;i+=4){seed=(seed*1664525+1013904223)>>>0;const v=seed>>>24;pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=v;pixels.data[i+3]=Math.round(f.noise*1.5);}
    gc.putImageData(pixels,0,0);c.fillStyle=c.createPattern(grain,'repeat');c.fillRect(0,0,w,h);
  }
  for(const l of project.layers.filter(l=>l.type!=='photo' && l.visible)) await drawLayer(c,l,w,h);
  return canvas;
}
async function drawLayer(c,l,w,h) {
  c.save();c.globalAlpha=l.opacity/100;const bounds=await layerBounds(l,w,h,c);
  c.translate(l.x*w,l.y*h);c.rotate((l.rotation||0)*Math.PI/180);c.translate(-l.x*w,-l.y*h);
  if(l.type==='text') {
    c.fillStyle=l.color;c.font=`${l.weight} ${l.size*w/1080}px ${fontFor(l)}`;c.textBaseline='top';c.textAlign=l.align;
    l.text.split('\n').forEach((line,i)=>c.fillText(line,l.x*w,l.y*h+i*l.size*w/1080*1.02));
  } else c.drawImage(await loadImage(l.src),bounds.x,bounds.y,bounds.w,bounds.h);
  c.restore();
}
export function validateProject(p) {
  if(!p || p.version!==1 || !Object.hasOwn(formats,p.format) || !Object.hasOwn(templates,p.preset) || typeof p.name!=='string' || p.name.length>200 || !Array.isArray(p.layers) || p.layers.length>60) throw new Error('This is not a supported Ride Studio project.');
  const image=v=>typeof v==='string' && v.length<22*1024*1024 && /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(v);
  const color=v=>typeof v==='string' && /^#[0-9a-f]{6}$/i.test(v);
  const num=(v,min,max)=>typeof v==='number' && Number.isFinite(v) && v>=min && v<=max;
  if(!p.background || !color(p.background.color) || !['mountains','studio','solid'].includes(p.background.scene) || (p.background.image!==null && !image(p.background.image))) throw new Error('Invalid background.');
  const ranges={brightness:[0,200],contrast:[0,200],saturation:[0,200],noise:[0,100],vignette:[0,100]};
  if(!p.effects || Object.entries(ranges).some(([k,[a,b]])=>!num(p.effects[k],a,b))) throw new Error('Invalid adjustments.');
  const ids=new Set();
  for(const l of p.layers) {
    if(!l || typeof l.id!=='string' || ids.has(l.id) || typeof l.name!=='string' || !['text','photo','image'].includes(l.type) || typeof l.visible!=='boolean' || !num(l.x,-2,3) || !num(l.y,-2,3) || !num(l.opacity,0,100) || !num(l.rotation,-180,180)) throw new Error('Invalid layer.');
    ids.add(l.id);
    if(l.type==='text') {if((l.font!==undefined && !Object.hasOwn(fonts,l.font)) || typeof l.text!=='string' || l.text.length>3000 || !color(l.color) || !num(l.size,8,240) || ![400,600,700,900].includes(l.weight) || !['left','center','right'].includes(l.align)) throw new Error('Invalid text layer.');}
    else if(!num(l.width,.05,3) || !(image(l.src) || (l.sample===true && l.src===sampleBike))) throw new Error('Invalid image layer.');
  }
  return p;
}
export function download(blob,name) {const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export async function readImage(file) {
  if(!file || !['image/png','image/jpeg','image/webp'].includes(file.type)) throw new Error('Choose a PNG, JPG, or WebP image.');
  if(file.size>15*1024*1024) throw new Error('Choose an image smaller than 15 MB.');
  const src=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file);});
  const im=await loadImage(src);if(im.width*im.height>50000000) throw new Error('Image exceeds 50 megapixels. Please resize it first.');return src;
}
export async function saveLocal(project) {
  const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction('projects','readwrite');tx.objectStore('projects').put(project,'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>{db.close();reject(tx.error);};});
}
export async function loadLocal() {const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction('projects');const r=tx.objectStore('projects').get('current');r.onsuccess=()=>{db.close();resolve(r.result);};r.onerror=()=>{db.close();reject(r.error);};});}
function openDB() {return new Promise((resolve,reject)=>{const r=indexedDB.open('ride-studio',1);r.onupgradeneeded=()=>r.result.createObjectStore('projects');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
