const skins=[
 {id:1,name:'Неоновый гонщик',weapon:'AK-47',rarity:'ЗАПРЕЩЁННОЕ',price:1240,src:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=700&q=85',glow:'#c7ff4a35'},
 {id:2,name:'Пустынный повстанец',weapon:'M4A4',rarity:'ЗАПРЕЩЁННОЕ',price:860,src:'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=700&q=85',glow:'#e2a64b35'},
 {id:3,name:'Синяя титанка',weapon:'USP-S',rarity:'ЗАСЕКРЕЧЕННОЕ',price:420,src:'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=85',glow:'#548dff42'},
 {id:4,name:'Городской камуфляж',weapon:'AWP',rarity:'ЗАПРЕЩЁННОЕ',price:1730,src:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=700&q=85',glow:'#b6bdc833'}
];
const targets=[
 {name:'Неонуар',weapon:'AWP',rarity:'ЗАСЕКРЕЧЕННОЕ',price:3720,src:'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=700&q=85'},
 {name:'Поверхностная закалка',weapon:'AK-47',rarity:'ТАЙНОЕ',price:6840,src:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=700&q=85'},
 {name:'Сайрекс',weapon:'AWP',rarity:'ЗАСЕКРЕЧЕННОЕ',price:2950,src:'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=85'}
];
let selected=skins[0],targetIndex=0,busy=false;
const money=n=>n.toLocaleString('ru-RU');
const $=id=>document.getElementById(id);
function update(){
 $('sourceImage').src=selected.src;$('sourceImage').alt=selected.name;$('sourceName').textContent=selected.name;$('sourceRarity').textContent=selected.rarity;$('sourcePrice').textContent=money(selected.price);
 const t=targets[targetIndex];$('targetImage').src=t.src;$('targetImage').alt=t.name;$('targetName').textContent=t.name;$('targetRarity').textContent=t.rarity;$('targetPrice').textContent=money(t.price);
 const chance=Math.max(3,Math.floor(selected.price/t.price*95));$('chance').textContent=chance+'%';$('multiplier').textContent='×'+(t.price/selected.price).toFixed(1);$('chanceRing').style.background=`conic-gradient(var(--lime) 0deg ${chance*3.6}deg,#343944 ${chance*3.6}deg 360deg)`;document.querySelector('.ring-marker').style.transform=`rotate(${chance*3.6}deg)`;
 document.querySelectorAll('.skin-card').forEach(c=>c.classList.toggle('selected',Number(c.dataset.id)===selected.id));
}
function renderInventory(){
 $('inventoryGrid').innerHTML=skins.map(s=>`<article class="skin-card ${s.id===selected.id?'selected':''}" data-id="${s.id}" style="--skin-glow:${s.glow}"><div class="skin-visual"><img src="${s.src}" alt="${s.name}"></div><div class="skin-bottom"><div><small>${s.weapon} · ${s.rarity}</small><b>${s.name}</b></div><span class="skin-price"><em>◆</em> ${money(s.price)} ₽</span></div></article>`).join('');
 $('inventoryGrid').addEventListener('click',e=>{const card=e.target.closest('.skin-card');if(!card)return;selected=skins.find(s=>s.id===Number(card.dataset.id));$('upgradeStatus').textContent='Скин выбран — можно запускать';update()});
}
let toastTimer;function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
function runUpgrade(){if(busy)return;busy=true;const button=$('upgradeButton');button.disabled=true;$('buttonLabel').textContent='ПРОВЕРЯЕМ УДАЧУ';$('upgradeStatus').textContent='Апгрейд запущен…';$('chanceRing').classList.add('rolling');setTimeout(()=>{const chance=parseInt($('chance').textContent,10),won=Math.random()*100<chance; $('chanceRing').classList.remove('rolling');if(won){$('upgradeStatus').textContent='УСПЕХ! Скин добавлен в инвентарь';toast('Апгрейд успешен! Ты получил '+targets[targetIndex].name);$('balance').textContent=money(2450+targets[targetIndex].price)}else{$('upgradeStatus').textContent='Не повезло. Попробуй ещё раз';toast('На этот раз мимо. Удача рядом!')};button.disabled=false;$('buttonLabel').textContent='ИСПЫТАТЬ УДАЧУ';busy=false},1350)}
renderInventory();update();$('upgradeButton').addEventListener('click',runUpgrade);$('changeTarget').addEventListener('click',()=>{targetIndex=(targetIndex+1)%targets.length;update();$('upgradeStatus').textContent='Цель обновлена'});
document.querySelector('.filter-button').addEventListener('click',()=>toast('Показаны все доступные скины'));
document.querySelector('.menu-toggle').addEventListener('click',()=>{const nav=document.querySelector('.main-nav');const opened=nav.style.display==='flex';nav.style.display=opened?'none':'flex';if(!opened){nav.style.position='absolute';nav.style.top='65px';nav.style.left='0';nav.style.right='0';nav.style.height='auto';nav.style.padding='18px 5vw';nav.style.background='#101319';nav.style.borderBottom='1px solid #282d37';nav.style.flexDirection='column';nav.style.alignItems='flex-start';nav.style.gap='18px'}});
