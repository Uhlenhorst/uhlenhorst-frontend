
(function(){
  const cfg = window.STATION_CONFIG;
  if(!cfg) return;
  const key = "uhlenhorst_progress_"+cfg.group;
  const solved = JSON.parse(localStorage.getItem(key) || "{}");
  const feedback = document.getElementById("feedback");
  const hint = document.getElementById("hint");
  const nextWrap = document.getElementById("nextWrap");
  function norm(v){ return String(v||"").trim().toLocaleLowerCase("de-DE"); }
  window.showHint = function(){ if(hint) hint.style.display="block"; };
  function success(){
    solved[cfg.n] = cfg.reveal;
    localStorage.setItem(key, JSON.stringify(solved));
    feedback.className = "feedback ok";
    let extra = cfg.fact ? '<div class="fact"><strong>Wusstest du schon?</strong><br>'+cfg.fact+'</div>' : '';
    feedback.innerHTML = '<strong>Richtig gelöst!</strong><div style="margin-top:5px">Euer Fundstück für diese Station ist:</div><div class="reveal">'+cfg.reveal+'</div><div><strong>Gut merken oder notieren.</strong> Erst am Ende werden alle Fundstücke sortiert.</div>'+extra;
    if(nextWrap) nextWrap.style.display="block";
    document.querySelectorAll(".answer-control").forEach(el=>el.disabled=true);
  }
  function fail(){
    feedback.className = "feedback bad";
    feedback.innerHTML = '<strong>Noch nicht ganz.</strong><div style="margin-top:5px">Versucht es noch einmal – oder nutzt den Hinweis unter der Rätselkarte.</div>';
  }
  window.checkAnswer = function(v){ if(norm(v) === norm(cfg.correct)) success(); else fail(); };
  window.checkInput = function(){ const el=document.getElementById("answerInput"); window.checkAnswer(el?el.value:""); };
  if(solved[cfg.n]) success();
})();
