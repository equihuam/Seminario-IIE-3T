// Card navigation is independent of data capture and the Supabase transport.
import {swipeDirection} from './navigation.mjs';
const cards=[...document.querySelectorAll('[data-step]')];
const labels=['Empezar','Tu pregunta','Motivación','Contexto','Documento','Compartir','Tu copia','Tu acceso','Enviar'];
let step=0;
const $=id=>document.getElementById(id);
const resume=document.createElement('button');
resume.type='button';resume.className='text-button';resume.textContent='Abrir un registro JSON anterior';
resume.onclick=()=>$('import').click();
$('import-open').onclick=()=>$('import').click();
cards[0].querySelector('.card-note').replaceWith(resume);
export function setView(view){
  for(const name of ['seed','agenda','mine'])$(`${name}-view`).hidden=name!==view;
  for(const button of document.querySelectorAll('[data-view]')){
    if(button.dataset.view===view)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
  }
  $('app-status').textContent='';
}
export function showStep(next,{focus=true}={}){
  next=Math.max(0,Math.min(cards.length-1,next));
  const direction=next<step?'enter-back':'enter-forward';
  step=next;
  cards.forEach((card,index)=>{card.hidden=index!==step;card.classList.remove('enter-back','enter-forward');});
  cards[step].classList.add(direction);
  $('step-label').textContent=`${String(step+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')} · ${labels[step]}`;
  $('progress-fill').style.width=`${(step+1)/cards.length*100}%`;
  document.querySelector('.progress').setAttribute('aria-valuenow',String(step+1));
  $('previous').disabled=step===0;$('next').hidden=step===cards.length-1;
  $('app-status').textContent='';
  if(focus){const heading=cards[step].querySelector('h1,h2');heading.tabIndex=-1;heading.focus({preventScroll:true});}
}
function advance(){
  const invalid=step<=2?[...cards[step].querySelectorAll('input,textarea,select')].find(el=>!el.checkValidity()):null;
  if(invalid){invalid.reportValidity();return;}
  showStep(step+1);
}
$('next').onclick=advance;
$('previous').onclick=()=>showStep(step-1);
for(const button of document.querySelectorAll('[data-view]'))button.onclick=()=>setView(button.dataset.view);
let touch=null;
$('deck').addEventListener('pointerdown',event=>{
  if(event.pointerType==='mouse'||event.target.closest('input,textarea,select,button,a,label'))return;
  touch={x:event.clientX,y:event.clientY};
});
$('deck').addEventListener('pointerup',event=>{
  if(!touch)return;
  const direction=swipeDirection(touch,{x:event.clientX,y:event.clientY});touch=null;
  if(direction===1)advance();else if(direction===-1)showStep(step-1);
});
$('deck').addEventListener('pointercancel',()=>{touch=null;});
document.addEventListener('keydown',event=>{
  if($('seed-view').hidden||event.target.closest('input,textarea,select,button,a'))return;
  if(event.key==='ArrowRight'){event.preventDefault();advance();}
  if(event.key==='ArrowLeft'){event.preventDefault();showStep(step-1);}
});
const form=$('seed-form');form.noValidate=true;
form.addEventListener('submit',event=>{
  const invalid=[...form.elements].find(el=>typeof el.checkValidity==='function'&&!el.checkValidity());
  if(!invalid)return;
  event.preventDefault();event.stopImmediatePropagation();
  setView('seed');showStep(Number(invalid.closest('[data-step]')?.dataset.step??8));invalid.reportValidity();
});
for(const [index,card] of cards.entries()){card.setAttribute('role','group');card.setAttribute('aria-label',`Tarjeta ${index+1}: ${labels[index]}`);}
showStep(0,{focus:false});
