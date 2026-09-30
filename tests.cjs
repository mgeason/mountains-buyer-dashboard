'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];
new Function(script);
const elements = new Map();
function el(id) {
  if (!elements.has(id)) elements.set(id, {
    value: id === 'askBase' ? 'original' : '', innerHTML: '', elements: {},
    addEventListener() {}, querySelectorAll() { return []; }, setAttribute() {},
    showModal() {}, close() {}, reset() {}
  });
  return elements.get(id);
}
const api = new Function('document', 'localStorage', 'confirm', 'setTimeout', script +
  ';return {normal,fit,campaign,asks,csv,observe,iso,safeURL,getState:()=>state};')(
    { getElementById: el, querySelectorAll: () => [] },
    { getItem: () => null, setItem() {} }, () => true, () => {}
  );
assert.equal(api.iso('2026-02-30'), false);
assert.equal(api.safeURL('javascript:alert(1)'), null);
let p = api.normal({address:'A',suburb:'Katoomba',status:'active',studio:'no',beds:3,land:900,askLow:800000});
assert.equal(api.fit(p).label, 'Needs evidence');
p.buildSpace='yes';
assert.equal(api.fit(p).label, 'Criteria fit');
p.askLow=900000;
assert.equal(api.fit(p).label, 'Outside brief');
p.studio='yes';p.approval='confirmed';p.askLow=1100000;
assert.equal(api.fit(p).label, 'Criteria fit');
assert.equal(api.csv('address,suburb\n"A, B",Leura\n')[0].address, 'A, B');
p.events=[
  {date:'2026-01-01',kind:'listed'}, {date:'2026-02-01',kind:'withdrawn'},
  {date:'2026-04-01',kind:'relisted'}, {date:'2026-05-01',kind:'sold'}
];
p.status='sold';p.soldDate='2026-05-01';
assert.equal(api.campaign(p).age, 30);
assert.equal(api.campaign(p).total, 61);
p.events=[{date:'2026-04-01',kind:'guide',low:800000}];
assert.equal(api.asks(p).original, null);
p.events=[];p.soldPrice=null;p.status='active';p.soldDate='';
assert.equal(api.observe(p,null).events.length,1);
assert.equal(api.campaign(p).age,null);
el('demo').onclick();
assert.equal(api.getState().properties.length,24);
el('examples').onclick();
assert.equal(api.getState().properties.length,2);
assert.equal(api.getState().properties[0].soldPrice,632000);
assert.equal(api.getState().properties[1].soldDate,'');
console.log('PASS: syntax, application initialization/render functions, budget paths, evidence uncertainty, dates, safe URLs, CSV, campaign gaps, guide observations, examples and demo.');
