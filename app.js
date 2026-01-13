const investmentTypes={
  stocks:{title:"Stocks",desc:"Ownership shares in a company with growth and dividend potential.",
    pros:["High long-term return potential","Liquid and widely accessible","Dividend income potential","Diversification across sectors"],
    cons:["High volatility","Risk of permanent loss","Requires research and monitoring","Emotional stress in downturns"],
    look:["Understand business model and financials","Diversify across sectors","Match risk to timeline","Be mindful of fees","Consider dollar-cost averaging"]},
  bonds:{title:"Bonds",desc:"Debt securities that pay interest and return principal at maturity.",
    pros:["Predictable income","Lower risk than stocks","Portfolio diversification","Government bonds are safer"],
    cons:["Lower returns than stocks","Interest rate & inflation risk","Credit risk of issuer","Liquidity can vary"],
    look:["Check credit ratings","Know maturity & yield","Watch interest rate trends","Diversify issuers and types"]},
  "mutual-funds":{title:"Mutual Funds",desc:"Pooled investments managed by professionals for diversification.",
    pros:["Professional management","Instant diversification","Accessible for small amounts","Regulated and transparent"],
    cons:["Management fees","Less control over holdings","Taxable distributions","Performance depends on manager"],
    look:["Review expense ratio","Check strategy & track record","Index funds for low fees","Match risk level to goals"]},
  etf:{title:"ETFs",desc:"Index‑tracking funds that trade like stocks with low fees.",
    pros:["Low expense ratios","Intra‑day trading","Diversification","Transparent holdings"],
    cons:["Bid‑ask spreads","Potential tracking error","Low liquidity for niche ETFs","May tempt frequent trading"],
    look:["Check expense ratio & liquidity","Understand index tracked","Review holdings & rebalancing","Compare similar ETFs"]},
  "real-estate":{title:"Real Estate",desc:"Property investments for rental income and appreciation.",
    pros:["Steady rental income","Potential appreciation","Tangible asset","Tax benefits"],
    cons:["High upfront cost","Illiquid","Maintenance & management","Location risk"],
    look:["Research local market","Factor full ownership costs","Plan property management","Consider REITs for easier entry"]},
  crypto:{title:"Cryptocurrency",desc:"Digital assets on decentralized networks with high volatility.",
    pros:["Very high return potential","24/7 markets","Borderless and decentralized","Diversification"],
    cons:["Extreme volatility","Regulatory uncertainty","Security risks","No backing or insurance"],
    look:["Invest only what you can lose","Use reputable exchanges","Enable strong security","Understand tax implications"]},
  "savings-accounts":{title:"Savings Accounts",desc:"Insured bank deposits earning interest, very safe and liquid.",
    pros:["Very safe","Easy access","No principal loss","Predictable interest"],
    cons:["Very low returns","Rates can change","Limited growth","Interest is taxable"],
    look:["Compare rates","Check minimums & fees","Know insurance limits","Use for emergency funds"]},
  "retirement-accounts":{title:"Retirement Accounts (401k, IRA)",desc:"Tax‑advantaged accounts for long‑term savings.",
    pros:["Tax advantages","Employer match","Automatic contributions","Compound growth"],
    cons:["Early withdrawal penalties","Contribution limits","Limited options in plans","RMDs for some accounts"],
    look:["Contribute to get match","Start early","Know Roth vs Traditional","Rebalance periodically"]}
};

const typeOptions=document.getElementById("typeOptions");
const detailsContent=document.getElementById("detailsContent");
const promptInput=document.getElementById("promptInput");
const promptButton=document.getElementById("promptButton");
const chatMessages=document.getElementById("chatMessages");
const chatInput=document.getElementById("chatInput");
const sendButton=document.getElementById("sendButton");
const stockSymbolInput=document.getElementById("stockSymbolInput");
const searchStockButton=document.getElementById("searchStockButton");
const sampleTags=document.getElementById("sampleTags");
let trendChart=null;
let predictChart=null;

function renderTypes(){
  typeOptions.innerHTML="";
  Object.entries(investmentTypes).forEach(([key,val])=>{
    const btn=document.createElement("button");
    btn.className="option-btn";
    btn.textContent=val.title;
    btn.addEventListener("click",()=>renderDetails(key));
    typeOptions.appendChild(btn);
  });
}

function renderDetails(key){
  const inv=investmentTypes[key];
  if(!inv)return;
  detailsContent.innerHTML=
    `<div class="section">
       <div class="section-title">Overview</div>
       <div class="list"><ul><li>${inv.desc}</li></ul></div>
     </div>
     <div class="section">
       <div class="section-title">Pros</div>
       <div class="list good"><ul>${inv.pros.map(p=>`<li>${p}</li>`).join("")}</ul></div>
     </div>
     <div class="section">
       <div class="section-title">Cons</div>
       <div class="list bad"><ul>${inv.cons.map(c=>`<li>${c}</li>`).join("")}</ul></div>
     </div>
     <div class="section">
       <div class="section-title">What to look out for</div>
       <div class="list look"><ul>${inv.look.map(x=>`<li>${x}</li>`).join("")}</ul></div>
     </div>`;
  renderFeedback('details', key);
}

function handlePrompt(){
  const raw=(promptInput.value||"").trim();
  const q=raw.toLowerCase();
  if(!q){detailsContent.innerHTML=`<div class="empty">Type a symbol (e.g., MSFT) or a question to get started.</div>`;return}
  const sym=getSymbolFromText(raw);
  if(sym){
    detailsContent.innerHTML=`<div class="empty">Loading ${sym} 5-year simulated trend...</div>`;
    const data=generateDummy(sym);
    renderTrend(data);
    return;
  }
  if(q.includes("type")&&(q.includes("investment")||q.includes("invest"))){
    detailsContent.innerHTML=`<div class="section"><div class="section-title">Common types</div>
      <div class="list"><ul>${Object.values(investmentTypes).map(v=>`<li>${v.title}</li>`).join("")}</ul></div></div>`;
    return;
  }
  for(const [key,val] of Object.entries(investmentTypes)){
    const aliases=[val.title.toLowerCase(),key.replace("-"," ").toLowerCase()];
    if(aliases.some(a=>q.includes(a))||q.includes(key)){
      renderDetails(key);return;
    }
  }
  detailsContent.innerHTML=`<div class="empty">I can explain investment types or go deep on one. Try “Tell me about stocks”.</div>`;
}

function getSymbolFromText(text){
  const upperToken=(text.match(/\b[A-Z]{2,6}\b/)||[])[0];
  if(upperToken)return upperToken.toUpperCase();
  const map={
    bitcoin:'BTC',
    btc:'BTC',
    ethereum:'ETH',
    eth:'ETH',
    google:'GOOGL',
    alphabet:'GOOGL',
    microsoft:'MSFT',
    msft:'MSFT',
    ibm:'IBM',
    tesla:'TSLA',
    tsla:'TSLA'
  };
  const cleaned=text.trim().toLowerCase();
  if(map[cleaned])return map[cleaned];
  // If user typed a single word, convert to uppercase as symbol guess
  if(/^[a-z0-9]{2,6}$/i.test(text) && !text.includes(' ')) return text.toUpperCase();
  return null;
}
function initUI(){
  if(promptButton)promptButton.addEventListener("click",handlePrompt);
  if(promptInput)promptInput.addEventListener("keypress",e=>{if(e.key==="Enter")handlePrompt()});
  if(sendButton)sendButton.addEventListener("click",()=>{const q=(chatInput.value||"").trim();if(!q)return;addMessage(q,true);chatInput.value="";processChat(q)});
  if(chatInput)chatInput.addEventListener("keypress",e=>{if(e.key==="Enter")sendButton?.click()});
  if(searchStockButton)searchStockButton.addEventListener("click",searchStock);
  if(stockSymbolInput)stockSymbolInput.addEventListener("keypress",e=>{if(e.key==="Enter")searchStock()});
  if(sampleTags)sampleTags.addEventListener('click',e=>{
    const btn=e.target.closest('.sample-btn');if(!btn)return;
    const q=btn.getAttribute('data-q')||'';if(!q)return;chatInput.value=q;sendButton?.click();
  });
  renderTypes();
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",initUI)}else{initUI()}

function addMessage(text,isUser){
  const row=document.createElement("div");
  row.className=`msg ${isUser?'user':'bot'}`;
  const bubble=document.createElement("div");
  bubble.className="bubble";
  bubble.textContent=text;
  row.appendChild(bubble);
  chatMessages.appendChild(row);
  chatMessages.scrollTop=chatMessages.scrollHeight;
}
function processChat(q){
  const lower=q.toLowerCase();
  if(lower.includes('predict')||lower.includes('forecast')||lower.includes('outlook')){
    processPredictive(q);return;
  }
  if(lower.includes("type")&&(lower.includes("investment")||lower.includes("invest"))){
    addMessage("Common types include: "+Object.values(investmentTypes).map(v=>v.title).join(", ")+".",false);
    return;
  }
  const modes=[
    {mode:'proscons',patterns:['pros and cons','pros & cons','advantages','disadvantages']},
    {mode:'factors',patterns:['factors','consider','look out','what to look','things to consider']},
    {mode:'risks',patterns:['risk','risks','issues','problems','downsides']}
  ];
  let requestedMode=null;
  for(const m of modes){if(m.patterns.some(p=>lower.includes(p))){requestedMode=m.mode;break}}
  if(!requestedMode && (lower.includes('trend')||lower.includes('chart')||lower.includes('graph'))){
    const match=q.match(/[A-Z]{2,6}/);
    if(match){const sym=match[0];addMessage(`Showing ${sym} 5-year trend in the right pane.`,false);renderTrend(generateDummy(sym));return}
    addMessage("Please include a stock symbol (e.g., AAPL) to show the trend.",false);
    return;
  }
  for(const [key,val] of Object.entries(investmentTypes)){
    const aliases=[val.title.toLowerCase(),key.replace("-"," ").toLowerCase()];
    if(aliases.some(a=>lower.includes(a))||lower.includes(key)){
      addMessage(`Showing ${requestedMode?requestedMode:'details'} for ${val.title} in the right pane.`,false);
      if(requestedMode){renderByMode(key,requestedMode)}else{renderDetails(key)}
      return;
    }
  }
  addMessage("Ask “Tell me about bonds” or “What are investment types?”.",false);
}

function renderByMode(key,mode){
  const inv=investmentTypes[key];if(!inv)return;
  if(mode==='proscons'){
    detailsContent.innerHTML=`<div class="section"><div class="section-title">${inv.title}: Pros</div><div class="list good"><ul>${inv.pros.map(p=>`<li>${p}</li>`).join("")}</ul></div></div>
    <div class="section"><div class="section-title">${inv.title}: Cons</div><div class="list bad"><ul>${inv.cons.map(c=>`<li>${c}</li>`).join("")}</ul></div></div>`;
  }else if(mode==='factors'){
    detailsContent.innerHTML=`<div class="section"><div class="section-title">${inv.title}: Factors to consider</div><div class="list look"><ul>${inv.look.map(x=>`<li>${x}</li>`).join("")}</ul></div></div>`;
  }else if(mode==='risks'){
    detailsContent.innerHTML=`<div class="section"><div class="section-title">${inv.title}: Risks and issues</div><div class="list bad"><ul>${inv.cons.map(c=>`<li>${c}</li>`).join("")}</ul></div></div>`;
  }
  renderFeedback('details', key);
}
// listeners moved into initUI
if(searchStockButton)searchStockButton.addEventListener("click",searchStock);
if(stockSymbolInput)stockSymbolInput.addEventListener("keypress",e=>{if(e.key==="Enter")searchStock()});

function renderFeedback(scope,itemKey){
  const container=document.getElementById("detailsFeedback");
  const up=container.querySelector("#fb-up");
  const down=container.querySelector("#fb-down");
  const score=container.querySelector("#fb-score");
  const storageKey=`fb:${scope}:${itemKey}`;
  function read(){try{return JSON.parse(localStorage.getItem(storageKey)||'{}')}catch{return {}}}
  function write(obj){localStorage.setItem(storageKey,JSON.stringify(obj))}
  function refresh(){
    const data=read();const h=data.helpful||0;const nh=data.notHelpful||0;const t=h+nh;
    score.textContent=t===0?"No feedback yet":`${Math.round((h/t)*100)}% helpful (${h} 👍 / ${nh} 👎)`;
  }
  function send(helpful){
    const data=read();
    if(helpful){data.helpful=(data.helpful||0)+1}else{data.notHelpful=(data.notHelpful||0)+1}
    write(data);refresh();
  }
  if(up)up.onclick=()=>send(true);
  if(down)down.onclick=()=>send(false);
  refresh();
}

function searchStock(){
  const symbol=(stockSymbolInput.value||'').trim();
  if(!symbol){detailsContent.innerHTML=`<div class="empty">Enter a stock symbol</div>`;return}
  const data=generateDummy(symbol);
  renderTrend(data);
}

function generateDummy(symbol){
  const now=new Date();
  const start=new Date();
  start.setFullYear(now.getFullYear()-5);
  start.setMonth(start.getMonth(),1);
  const points=60;
  let price=100+Math.random()*50;
  const dates=[];const closes=[];const highs=[];const lows=[];
  for(let i=0;i<points;i++){
    const d=new Date(start);d.setMonth(start.getMonth()+i,1);
    const drift=.002;const vol=.05;
    const u1=Math.random()||1e-6;const u2=Math.random()||1e-6;
    const z=Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
    const r=drift+vol*z;
    const next=Math.max(1,price*Math.exp(r));
    const spread=Math.max(.5,Math.abs(next-price)*(.6+Math.random()*.8));
    dates.push(d.toISOString().slice(0,10));
    closes.push(+next.toFixed(2));
    highs.push(+Math.max(price,next)+spread*.5);
    lows.push(+Math.min(price,next)-spread*.5);
    price=next;
  }
  const latest=closes[closes.length-1];const oldest=closes[0];
  const totalReturn=((latest-oldest)/oldest)*100;
  const highest=Math.max(...highs);const lowest=Math.min(...lows);
  return{symbol:symbol.trim().toUpperCase(),dates,closes,highs,lows,stats:{latest,oldest,totalReturn,highest,lowest}};
}

function renderTrend(stock){
  const labelDates=stock.dates.map(x=>new Date(x).toLocaleDateString('en-US',{month:'short',year:'numeric'}));
  const html=
    `<div class="section">
       <div class="section-title">${stock.symbol} • 5-Year Trend (Simulated)</div>
       <div class="list">
         <ul>
           <li>5-year return: ${stock.stats.totalReturn.toFixed(2)}%</li>
           <li>Highest price: $${stock.stats.highest.toFixed(2)}</li>
           <li>Lowest price: $${stock.stats.lowest.toFixed(2)}</li>
         </ul>
       </div>
     </div>
     <div class="section">
       <div class="list"><canvas id="trendCanvas" height="180"></canvas></div>
     </div>`;
  detailsContent.innerHTML=html;
  const ctx=document.getElementById('trendCanvas').getContext('2d');
  if(trendChart)trendChart.destroy();
  trendChart=new Chart(ctx,{type:'line',data:{labels:labelDates,datasets:[{label:`${stock.symbol} Close`,data:stock.closes,borderColor:'#4f46e5',backgroundColor:'rgba(79,70,229,.15)',fill:true,tension:.1}]},options:{plugins:{legend:{display:true}}}});
  renderFeedback('trend', stock.symbol);
}

function processPredictive(q){
  const sym=getSymbolFromText(q);
  if(!sym){addMessage("Include a stock symbol (e.g., MSFT) to generate a predictive outlook.",false);return}
  addMessage(`Showing predictive outlook for ${sym} in the right pane.`,false);
  renderPredictive(sym);
}

function seeded(sym){
  let s=Array.from(sym).reduce((a,c)=>a+c.charCodeAt(0),0);
  return function(){s=(s*9301+49297)%233280;return s/233280}
}
function simulatePredictive(sym){
  const base=generateDummy(sym);
  const last=base.stats.latest;
  const r=seeded(sym);
  const marketStates=["Neutral","Risk‑on (moderate)","Risk‑off (cautious)"];
  const market=marketStates[Math.floor(r()*marketStates.length)];
  const vol=0.28+0.12*r();
  const driftBase=0.05+0.05*(r()-0.5);
  const bullRet=0.18+0.08*r();
  const baseRet=driftBase;
  const bearRet=-0.10-0.10*r();
  const probs={bull:0.20,base:0.35,bear:0.45};
  const targets={
    bull:last*(1+bullRet),
    base:last*(1+baseRet),
    bear:last*(1+bearRet)
  };
  const revCagr=8+Math.floor(r()*7);
  const epsCagr=10+Math.floor(r()*9);
  const marginTrend=r()>0.5?"Stable to improving":"Flat to slightly compressing";
  const techSignal=r()>0.5?"Momentum up: 20-period > 50-period; RSI ~55":"Momentum mixed: 20-period ≈ 50-period; RSI ~48";
  const risksPool=[
    "Macro slowdown reduces demand",
    "Execution risks on new product roadmap",
    "Competitive pricing pressure",
    "Regulatory or compliance changes",
    "FX and supply chain volatility"
  ];
  const risks=[risksPool[Math.floor(r()*risksPool.length)],risksPool[Math.floor(r()*risksPool.length)],risksPool[Math.floor(r()*risksPool.length)]];
  const snapshot={
    price:last,
    vol:(vol*100).toFixed(0)+"% annualized (simulated)",
    valuation:`12m base target ~$${targets.base.toFixed(2)} (${(baseRet*100).toFixed(1)}%)`
  };
  const narrative=`Based on current context (${market}), the probability‑weighted path skews cautious near‑term, with improvement under a normalizing macro. Upside depends on execution and margin resilience; downside reflects demand softness and multiple compression.`;
  return{symbol:sym,market,probs,targets,ret:{bull:bullRet,base:baseRet,bear:bearRet},growth:{revCagr,epsCagr,marginTrend},signals:techSignal,risks,snapshot,narrative};
}
function renderPredictive(sym){
  const d=simulatePredictive(sym);
  const html=
    `<div class="section">
       <div class="section-title">${d.symbol} • Current Market Context</div>
       <div class="list"><ul><li>${d.market}</li></ul></div>
     </div>
     <div class="section">
       <div class="section-title">Consensus Analyst Forecast (12‑Month Trend)</div>
       <div class="list"><ul>
         <li>Bull target: $${d.targets.bull.toFixed(2)} (${(d.ret.bull*100).toFixed(1)}%)</li>
         <li>Base target: $${d.targets.base.toFixed(2)} (${(d.ret.base*100).toFixed(1)}%)</li>
         <li>Bear target: $${d.targets.bear.toFixed(2)} (${(d.ret.bear*100).toFixed(1)}%)</li>
       </ul></div>
       <div class="list"><canvas id="forecastCanvas" height="120"></canvas></div>
     </div>
     <div class="section">
       <div class="section-title">Growth & Financial Trend Projections</div>
       <div class="list"><ul>
         <li>Revenue CAGR (simulated): ${d.growth.revCagr}%</li>
         <li>EPS CAGR (simulated): ${d.growth.epsCagr}%</li>
         <li>Margin trend: ${d.growth.marginTrend}</li>
       </ul></div>
     </div>
     <div class="section">
       <div class="section-title">Scenario Outlook (Probability Weighted)</div>
       <div class="list"><ul>
         <li>Bull Case (low probability): ${(d.probs.bull*100).toFixed(0)}%</li>
         <li>Base Case (moderate probability): ${(d.probs.base*100).toFixed(0)}%</li>
         <li>Bear Case (highest probability): ${(d.probs.bear*100).toFixed(0)}%</li>
       </ul></div>
       <div class="weights-row" id="weightsRow" data-sym="${sym}">
         <span>Set weights (%):</span>
         <label>Bull <input type="number" id="w-bull" min="0" max="100" value="${(d.probs.bull*100).toFixed(0)}"></label>
         <label>Base <input type="number" id="w-base" min="0" max="100" value="${(d.probs.base*100).toFixed(0)}"></label>
         <label>Bear <input type="number" id="w-bear" min="0" max="100" value="${(d.probs.bear*100).toFixed(0)}"></label>
         <button class="apply-btn" id="w-apply">Apply</button>
       </div>
     </div>
     <div class="section">
       <div class="section-title">Near‑Term Technical/Model Signals</div>
       <div class="list"><ul><li>${d.signals}</li></ul></div>
     </div>
     <div class="section">
       <div class="section-title">Key Risks That Could Drive Trends</div>
       <div class="list bad"><ul>${d.risks.map(x=>`<li>${x}</li>`).join("")}</ul></div>
     </div>
     <div class="section">
       <div class="section-title">Summary Snapshot</div>
       <div class="list"><ul>
         <li>Last price (simulated): $${d.snapshot.price.toFixed(2)}</li>
         <li>Volatility: ${d.snapshot.vol}</li>
         <li>${d.snapshot.valuation}</li>
       </ul></div>
     </div>
     <div class="section">
       <div class="section-title">Overall Predictive Narrative</div>
       <div class="list"><ul><li>${d.narrative}</li></ul></div>
     </div>`;
  detailsContent.innerHTML=html;
  renderFeedback('predict', sym);
  const ctx=document.getElementById('forecastCanvas').getContext('2d');
  if(predictChart)predictChart.destroy();
  predictChart=new Chart(ctx,{type:'bar',data:{labels:['Bull','Base','Bear'],datasets:[{label:`${d.symbol} 12m Targets`,data:[d.targets.bull,d.targets.base,d.targets.bear],backgroundColor:['#10b981','#6366f1','#ef4444']}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:false}}}});
  const wb=document.getElementById('w-bull');
  const wm=document.getElementById('w-base');
  const wr=document.getElementById('w-bear');
  const apply=document.getElementById('w-apply');
  function applyWeights(){
    const b=parseFloat(wb.value||'0');const m=parseFloat(wm.value||'0');const r=parseFloat(wr.value||'0');
    const sum=b+m+r;
    if(sum<=0)return;
    wb.value=((b/sum)*100).toFixed(0);wm.value=((m/sum)*100).toFixed(0);wr.value=((r/sum)*100).toFixed(0);
    const weights={bull:parseFloat(wb.value)/100,base:parseFloat(wm.value)/100,bear:parseFloat(wr.value)/100};
    const expected= d.targets.bull*weights.bull + d.targets.base*weights.base + d.targets.bear*weights.bear;
    const snap=`Probability‑weighted expected 12m target: ~$${expected.toFixed(2)} • weights: ${Math.round(weights.bull*100)}%/${Math.round(weights.base*100)}%/${Math.round(weights.bear*100)}%`;
    const summaryList=document.querySelector('.section .list ul');
    if(summaryList){const li=document.createElement('li');li.textContent=snap;summaryList.appendChild(li)}
  }
  if(apply)apply.onclick=applyWeights;
}
