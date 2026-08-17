
function uhRead(group){
  try{return JSON.parse(localStorage.getItem('uhlenhorst_progress_'+group)||'{}')}catch(e){return {}}
}
function uhCount(group){return Object.keys(uhRead(group)).length}
function uhReset(group){
  if(confirm('Fortschritt dieser Schnitzeljagd wirklich löschen und neu beginnen?')){
    localStorage.removeItem('uhlenhorst_progress_'+group); location.reload();
  }
}
function uhUpdateStatus(group,total){
  var el=document.getElementById('savedStatus'); if(!el)return;
  var n=uhCount(group);
  el.innerHTML=n?('<strong>'+n+' von '+total+' Stationen</strong> sind auf diesem Gerät bereits gespeichert.'):'Auf diesem Gerät ist noch kein Fortschritt gespeichert.';
}
function uhShowFinds(group,total){
  var p=uhRead(group), wrap=document.getElementById('finds'); if(!wrap)return;
  var parts=[];
  for(var i=1;i<=total;i++) if(p[i]) parts.push('<span class="chip">Station '+i+': '+p[i]+'</span>');
  wrap.innerHTML=parts.length?parts.join(''):'<div class="note">Noch keine Fundstücke gespeichert. Löst zuerst eine Station.</div>';
}
