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

const typeGrid=document.getElementById("typeGrid");
const detailsContent=document.getElementById("detailsContent");
const promptInput=document.getElementById("promptInput");
const promptButton=document.getElementById("promptButton");

function renderTypes(){
  typeGrid.innerHTML="";
  Object.entries(investmentTypes).forEach(([key,val])=>{
    const card=document.createElement("div");
    card.className="type-card";
    card.innerHTML=`<div class="type-title">${val.title}</div><div class="type-desc">${val.desc}</div>`;
    card.addEventListener("click",()=>renderDetails(key));
    typeGrid.appendChild(card);
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
}

function handlePrompt(){
  const q=(promptInput.value||"").toLowerCase().trim();
  if(!q){detailsContent.innerHTML=`<div class="empty">Type a question to get started.</div>`;return}
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

promptButton.addEventListener("click",handlePrompt);
promptInput.addEventListener("keypress",e=>{if(e.key==="Enter")handlePrompt()});
renderTypes();

