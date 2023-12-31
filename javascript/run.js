!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t="undefined"!=typeof globalThis?globalThis:t||self).countUp={})}(this,function(t){"use strict";var s=function(){return(s=Object.assign||function(t){for(var i,a=1,s=arguments.length;a<s;a++)for(var n in i=arguments[a])Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);return t}).apply(this,arguments)},i=(a.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal||this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;Math.abs(i)>this.options.smartEasingThreshold?(this.finalEndVal=t,i=this.countDown?1:-1,this.endVal=t+i*this.options.smartEasingAmount,this.duration=this.duration/2):(this.endVal=t,this.finalEndVal=null),this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},a.prototype.start=function(t){this.error||(this.callback=t,0<this.duration?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},a.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},a.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},a.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},a.prototype.printValue=function(t){t=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=t:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=t:this.el.innerHTML=t},a.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},a.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: "+t,null)},a.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},a);function a(t,i,a){var r=this;this.target=t,this.endVal=i,this.options=a,this.version="2.0.8",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){r.startTime||(r.startTime=t);t-=r.startTime;r.remaining=r.duration-t,r.useEasing?r.countDown?r.frameVal=r.startVal-r.easingFn(t,0,r.startVal-r.endVal,r.duration):r.frameVal=r.easingFn(t,r.startVal,r.endVal-r.startVal,r.duration):r.countDown?r.frameVal=r.startVal-(r.startVal-r.endVal)*(t/r.duration):r.frameVal=r.startVal+(r.endVal-r.startVal)*(t/r.duration),r.countDown?r.frameVal=r.frameVal<r.endVal?r.endVal:r.frameVal:r.frameVal=r.frameVal>r.endVal?r.endVal:r.frameVal,r.frameVal=Number(r.frameVal.toFixed(r.options.decimalPlaces)),r.printValue(r.frameVal),t<r.duration?r.rAF=requestAnimationFrame(r.count):null!==r.finalEndVal?r.update(r.finalEndVal):r.callback&&r.callback()},this.formatNumber=function(t){var i=t<0?"-":"",t=Math.abs(t).toFixed(r.options.decimalPlaces),t=(t+="").split("."),a=t[0],t=1<t.length?r.options.decimal+t[1]:"";if(r.options.useGrouping){for(var s="",n=0,e=a.length;n<e;++n)0!==n&&n%3==0&&(s=r.options.separator+s),s=a[e-n-1]+s;a=s}return r.options.numerals&&r.options.numerals.length&&(a=a.replace(/[0-9]/g,function(t){return r.options.numerals[+t]}),t=t.replace(/[0-9]/g,function(t){return r.options.numerals[+t]})),i+r.options.prefix+a+t+r.options.suffix},this.easeOutExpo=function(t,i,a,s){return a*(1-Math.pow(2,-10*t/s))*1024/1023+i},this.options=s(s({},this.defaults),a),this.formattingFn=this.options.formattingFn||this.formatNumber,this.easingFn=this.options.easingFn||this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(i),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined"}t.CountUp=i,Object.defineProperty(t,"__esModule",{value:!0})});


let done = [];

function isComing(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function s_counters() {
  const s_counters = document.querySelectorAll(".s-counter");
  s_counters.forEach(function (cntr) {
    if (isComing(cntr)) {
      var cntr_id = cntr.id;
      if (!done[cntr_id]) {
        var cntr_val = cntr.dataset.value;
        var cntr_run = new countUp.CountUp(cntr_id, cntr_val);
        cntr_run.start();
        done[cntr_id] = true;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", s_counters);
window.addEventListener("scroll", s_counters, { passive: true });