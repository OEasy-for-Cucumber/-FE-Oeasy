const $=Symbol.for("constructDateFrom");function D(t,e){return typeof t=="function"?t(e):t&&typeof t=="object"&&$ in t?t[$](e):t instanceof Date?new t.constructor(e):new Date(e)}function h(t,e){return D(e||t,t)}let B={};function T(){return B}function k(t,e){var s,c,u,f;const n=T(),r=(e==null?void 0:e.weekStartsOn)??((c=(s=e==null?void 0:e.locale)==null?void 0:s.options)==null?void 0:c.weekStartsOn)??n.weekStartsOn??((f=(u=n.locale)==null?void 0:u.options)==null?void 0:f.weekStartsOn)??0,a=h(t,e==null?void 0:e.in),i=a.getDay(),o=(i<r?7:0)+i-r;return a.setDate(a.getDate()-o),a.setHours(0,0,0,0),a}function N(t,e){return k(t,{...e,weekStartsOn:1})}function L(t,e){const n=h(t,e==null?void 0:e.in),r=n.getFullYear(),a=D(n,0);a.setFullYear(r+1,0,4),a.setHours(0,0,0,0);const i=N(a),o=D(n,0);o.setFullYear(r,0,4),o.setHours(0,0,0,0);const s=N(o);return n.getTime()>=i.getTime()?r+1:n.getTime()>=s.getTime()?r:r-1}function F(t){const e=h(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function C(t,...e){const n=D.bind(null,t||e.find(r=>typeof r=="object"));return e.map(n)}function H(t,e){const n=h(t,e==null?void 0:e.in);return n.setHours(0,0,0,0),n}function G(t,e,n){const[r,a]=C(n==null?void 0:n.in,t,e),i=H(r),o=H(a),s=+i-F(i),c=+o-F(o);return Math.round((s-c)/864e5)}function U(t,e){const n=L(t,e),r=D(t,0);return r.setFullYear(n,0,4),r.setHours(0,0,0,0),N(r)}function Y(t,e){const n=+h(t)-+h(e);return n<0?-1:n>0?1:n}function J(t){return D(t,Date.now())}function p(t){return t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]"}function Z(t){return!(!p(t)&&typeof t!="number"||isNaN(+h(t)))}function K(t,e,n){const[r,a]=C(n==null?void 0:n.in,t,e),i=r.getFullYear()-a.getFullYear(),o=r.getMonth()-a.getMonth();return i*12+o}function ee(t){return e=>{const r=(t?Math[t]:Math.trunc)(e);return r===0?0:r}}function te(t,e){return+h(t)-+h(e)}function ne(t,e){const n=h(t,e==null?void 0:e.in);return n.setHours(23,59,59,999),n}function re(t,e){const n=h(t,e==null?void 0:e.in),r=n.getMonth();return n.setFullYear(n.getFullYear(),r+1,0),n.setHours(23,59,59,999),n}function ae(t,e){const n=h(t,e==null?void 0:e.in);return+ne(n,e)==+re(n,e)}function ie(t,e,n){const[r,a,i]=C(n==null?void 0:n.in,t,t,e),o=Y(a,i),s=Math.abs(K(a,i));if(s<1)return 0;a.getMonth()===1&&a.getDate()>27&&a.setDate(30),a.setMonth(a.getMonth()-o*s);let c=Y(a,i)===-o;ae(r)&&s===1&&Y(r,i)===1&&(c=!1);const u=o*(s-+c);return u===0?0:u}function se(t,e,n){const r=te(t,e)/1e3;return ee(n==null?void 0:n.roundingMethod)(r)}function oe(t,e){const n=h(t,e==null?void 0:e.in);return n.setFullYear(n.getFullYear(),0,1),n.setHours(0,0,0,0),n}const ue={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},ce=(t,e,n)=>{let r;const a=ue[t];return typeof a=="string"?r=a:e===1?r=a.one:r=a.other.replace("{{count}}",e.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r};function O(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const de={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},fe={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},le={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},me={date:O({formats:de,defaultWidth:"full"}),time:O({formats:fe,defaultWidth:"full"}),dateTime:O({formats:le,defaultWidth:"full"})},he={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},ge=(t,e,n,r)=>he[t];function b(t){return(e,n)=>{const r=n!=null&&n.context?String(n.context):"standalone";let a;if(r==="formatting"&&t.formattingValues){const o=t.defaultFormattingWidth||t.defaultWidth,s=n!=null&&n.width?String(n.width):o;a=t.formattingValues[s]||t.formattingValues[o]}else{const o=t.defaultWidth,s=n!=null&&n.width?String(n.width):t.defaultWidth;a=t.values[s]||t.values[o]}const i=t.argumentCallback?t.argumentCallback(e):e;return a[i]}}const we={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},ye={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},be={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},Me={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},De={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},Pe={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},ve=(t,e)=>{const n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},We={ordinalNumber:ve,era:b({values:we,defaultWidth:"wide"}),quarter:b({values:ye,defaultWidth:"wide",argumentCallback:t=>t-1}),month:b({values:be,defaultWidth:"wide"}),day:b({values:Me,defaultWidth:"wide"}),dayPeriod:b({values:De,defaultWidth:"wide",formattingValues:Pe,defaultFormattingWidth:"wide"})};function M(t){return(e,n={})=>{const r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],i=e.match(a);if(!i)return null;const o=i[0],s=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(s)?xe(s,y=>y.test(o)):Oe(s,y=>y.test(o));let u;u=t.valueCallback?t.valueCallback(c):c,u=n.valueCallback?n.valueCallback(u):u;const f=e.slice(o.length);return{value:u,rest:f}}}function Oe(t,e){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(t[n]))return n}function xe(t,e){for(let n=0;n<t.length;n++)if(e(t[n]))return n}function R(t){return(e,n={})=>{const r=e.match(t.matchPattern);if(!r)return null;const a=r[0],i=e.match(t.parsePattern);if(!i)return null;let o=t.valueCallback?t.valueCallback(i[0]):i[0];o=n.valueCallback?n.valueCallback(o):o;const s=e.slice(a.length);return{value:o,rest:s}}}const ke=/^(\d+)(th|st|nd|rd)?/i,Te=/\d+/i,Se={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Ye={any:[/^b/i,/^(a|c)/i]},Ne={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Fe={any:[/1/i,/2/i,/3/i,/4/i]},Ce={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},Ee={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Ie={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},$e={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},He={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Xe={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},qe={ordinalNumber:R({matchPattern:ke,parsePattern:Te,valueCallback:t=>parseInt(t,10)}),era:M({matchPatterns:Se,defaultMatchWidth:"wide",parsePatterns:Ye,defaultParseWidth:"any"}),quarter:M({matchPatterns:Ne,defaultMatchWidth:"wide",parsePatterns:Fe,defaultParseWidth:"any",valueCallback:t=>t+1}),month:M({matchPatterns:Ce,defaultMatchWidth:"wide",parsePatterns:Ee,defaultParseWidth:"any"}),day:M({matchPatterns:Ie,defaultMatchWidth:"wide",parsePatterns:$e,defaultParseWidth:"any"}),dayPeriod:M({matchPatterns:He,defaultMatchWidth:"any",parsePatterns:Xe,defaultParseWidth:"any"})},V={code:"en-US",formatDistance:ce,formatLong:me,formatRelative:ge,localize:We,match:qe,options:{weekStartsOn:0,firstWeekContainsDate:1}};function _e(t,e){const n=h(t,e==null?void 0:e.in);return G(n,oe(n))+1}function Qe(t,e){const n=h(t,e==null?void 0:e.in),r=+N(n)-+U(n);return Math.round(r/6048e5)+1}function A(t,e){var f,y,m,w;const n=h(t,e==null?void 0:e.in),r=n.getFullYear(),a=T(),i=(e==null?void 0:e.firstWeekContainsDate)??((y=(f=e==null?void 0:e.locale)==null?void 0:f.options)==null?void 0:y.firstWeekContainsDate)??a.firstWeekContainsDate??((w=(m=a.locale)==null?void 0:m.options)==null?void 0:w.firstWeekContainsDate)??1,o=D((e==null?void 0:e.in)||t,0);o.setFullYear(r+1,0,i),o.setHours(0,0,0,0);const s=k(o,e),c=D((e==null?void 0:e.in)||t,0);c.setFullYear(r,0,i),c.setHours(0,0,0,0);const u=k(c,e);return+n>=+s?r+1:+n>=+u?r:r-1}function Le(t,e){var s,c,u,f;const n=T(),r=(e==null?void 0:e.firstWeekContainsDate)??((c=(s=e==null?void 0:e.locale)==null?void 0:s.options)==null?void 0:c.firstWeekContainsDate)??n.firstWeekContainsDate??((f=(u=n.locale)==null?void 0:u.options)==null?void 0:f.firstWeekContainsDate)??1,a=A(t,e),i=D((e==null?void 0:e.in)||t,0);return i.setFullYear(a,0,r),i.setHours(0,0,0,0),k(i,e)}function Re(t,e){const n=h(t,e==null?void 0:e.in),r=+k(n,e)-+Le(n,e);return Math.round(r/6048e5)+1}function d(t,e){const n=t<0?"-":"",r=Math.abs(t).toString().padStart(e,"0");return n+r}const P={y(t,e){const n=t.getFullYear(),r=n>0?n:1-n;return d(e==="yy"?r%100:r,e.length)},M(t,e){const n=t.getMonth();return e==="M"?String(n+1):d(n+1,2)},d(t,e){return d(t.getDate(),e.length)},a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h(t,e){return d(t.getHours()%12||12,e.length)},H(t,e){return d(t.getHours(),e.length)},m(t,e){return d(t.getMinutes(),e.length)},s(t,e){return d(t.getSeconds(),e.length)},S(t,e){const n=e.length,r=t.getMilliseconds(),a=Math.trunc(r*Math.pow(10,n-3));return d(a,e.length)}},W={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},X={G:function(t,e,n){const r=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if(e==="yo"){const r=t.getFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return P.y(t,e)},Y:function(t,e,n,r){const a=A(t,r),i=a>0?a:1-a;if(e==="YY"){const o=i%100;return d(o,2)}return e==="Yo"?n.ordinalNumber(i,{unit:"year"}):d(i,e.length)},R:function(t,e){const n=L(t);return d(n,e.length)},u:function(t,e){const n=t.getFullYear();return d(n,e.length)},Q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return d(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return d(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){const r=t.getMonth();switch(e){case"M":case"MM":return P.M(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){const r=t.getMonth();switch(e){case"L":return String(r+1);case"LL":return d(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){const a=Re(t,r);return e==="wo"?n.ordinalNumber(a,{unit:"week"}):d(a,e.length)},I:function(t,e,n){const r=Qe(t);return e==="Io"?n.ordinalNumber(r,{unit:"week"}):d(r,e.length)},d:function(t,e,n){return e==="do"?n.ordinalNumber(t.getDate(),{unit:"date"}):P.d(t,e)},D:function(t,e,n){const r=_e(t);return e==="Do"?n.ordinalNumber(r,{unit:"dayOfYear"}):d(r,e.length)},E:function(t,e,n){const r=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){const a=t.getDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(i);case"ee":return d(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){const a=t.getDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(i);case"cc":return d(i,e.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){const r=t.getDay(),a=r===0?7:r;switch(e){case"i":return String(a);case"ii":return d(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){const a=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){const r=t.getHours();let a;switch(r===12?a=W.noon:r===0?a=W.midnight:a=r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,e,n){const r=t.getHours();let a;switch(r>=17?a=W.evening:r>=12?a=W.afternoon:r>=4?a=W.morning:a=W.night,e){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,e,n){if(e==="ho"){let r=t.getHours()%12;return r===0&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return P.h(t,e)},H:function(t,e,n){return e==="Ho"?n.ordinalNumber(t.getHours(),{unit:"hour"}):P.H(t,e)},K:function(t,e,n){const r=t.getHours()%12;return e==="Ko"?n.ordinalNumber(r,{unit:"hour"}):d(r,e.length)},k:function(t,e,n){let r=t.getHours();return r===0&&(r=24),e==="ko"?n.ordinalNumber(r,{unit:"hour"}):d(r,e.length)},m:function(t,e,n){return e==="mo"?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):P.m(t,e)},s:function(t,e,n){return e==="so"?n.ordinalNumber(t.getSeconds(),{unit:"second"}):P.s(t,e)},S:function(t,e){return P.S(t,e)},X:function(t,e,n){const r=t.getTimezoneOffset();if(r===0)return"Z";switch(e){case"X":return _(r);case"XXXX":case"XX":return v(r);case"XXXXX":case"XXX":default:return v(r,":")}},x:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"x":return _(r);case"xxxx":case"xx":return v(r);case"xxxxx":case"xxx":default:return v(r,":")}},O:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+q(r,":");case"OOOO":default:return"GMT"+v(r,":")}},z:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+q(r,":");case"zzzz":default:return"GMT"+v(r,":")}},t:function(t,e,n){const r=Math.trunc(+t/1e3);return d(r,e.length)},T:function(t,e,n){return d(+t,e.length)}};function q(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),a=Math.trunc(r/60),i=r%60;return i===0?n+String(a):n+String(a)+e+d(i,2)}function _(t,e){return t%60===0?(t>0?"-":"+")+d(Math.abs(t)/60,2):v(t,e)}function v(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),a=d(Math.trunc(r/60),2),i=d(r%60,2);return n+a+e+i}const Q=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}},j=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}},Ve=(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],r=n[1],a=n[2];if(!a)return Q(t,e);let i;switch(r){case"P":i=e.dateTime({width:"short"});break;case"PP":i=e.dateTime({width:"medium"});break;case"PPP":i=e.dateTime({width:"long"});break;case"PPPP":default:i=e.dateTime({width:"full"});break}return i.replace("{{date}}",Q(r,e)).replace("{{time}}",j(a,e))},Ae={p:j,P:Ve},je=/^D+$/,ze=/^Y+$/,Be=["D","DD","YY","YYYY"];function Ge(t){return je.test(t)}function Ue(t){return ze.test(t)}function Je(t,e,n){const r=pe(t,e,n);if(console.warn(r),Be.includes(t))throw new RangeError(r)}function pe(t,e,n){const r=t[0]==="Y"?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const Ze=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Ke=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,et=/^'([^]*?)'?$/,tt=/''/g,nt=/[a-zA-Z]/;function Ut(t,e,n){var f,y,m,w;const r=T(),a=r.locale??V,i=r.firstWeekContainsDate??((y=(f=r.locale)==null?void 0:f.options)==null?void 0:y.firstWeekContainsDate)??1,o=r.weekStartsOn??((w=(m=r.locale)==null?void 0:m.options)==null?void 0:w.weekStartsOn)??0,s=h(t,n==null?void 0:n.in);if(!Z(s))throw new RangeError("Invalid time value");let c=e.match(Ke).map(l=>{const g=l[0];if(g==="p"||g==="P"){const E=Ae[g];return E(l,a.formatLong)}return l}).join("").match(Ze).map(l=>{if(l==="''")return{isToken:!1,value:"'"};const g=l[0];if(g==="'")return{isToken:!1,value:rt(l)};if(X[g])return{isToken:!0,value:l};if(g.match(nt))throw new RangeError("Format string contains an unescaped latin alphabet character `"+g+"`");return{isToken:!1,value:l}});a.localize.preprocessor&&(c=a.localize.preprocessor(s,c));const u={firstWeekContainsDate:i,weekStartsOn:o,locale:a};return c.map(l=>{if(!l.isToken)return l.value;const g=l.value;(Ue(g)||Ge(g))&&Je(g,e,String(t));const E=X[g[0]];return E(s,g,a.localize,u)}).join("")}function rt(t){const e=t.match(et);return e?e[1].replace(tt,"'"):t}function at(t,e,n){const r=T(),a=(n==null?void 0:n.locale)??r.locale??V,i=2520,o=Y(t,e);if(isNaN(o))throw new RangeError("Invalid time value");const s=Object.assign({},n,{addSuffix:n==null?void 0:n.addSuffix,comparison:o}),[c,u]=C(n==null?void 0:n.in,...o>0?[e,t]:[t,e]),f=se(u,c),y=(F(u)-F(c))/1e3,m=Math.round((f-y)/60);let w;if(m<2)return n!=null&&n.includeSeconds?f<5?a.formatDistance("lessThanXSeconds",5,s):f<10?a.formatDistance("lessThanXSeconds",10,s):f<20?a.formatDistance("lessThanXSeconds",20,s):f<40?a.formatDistance("halfAMinute",0,s):f<60?a.formatDistance("lessThanXMinutes",1,s):a.formatDistance("xMinutes",1,s):m===0?a.formatDistance("lessThanXMinutes",1,s):a.formatDistance("xMinutes",m,s);if(m<45)return a.formatDistance("xMinutes",m,s);if(m<90)return a.formatDistance("aboutXHours",1,s);if(m<1440){const l=Math.round(m/60);return a.formatDistance("aboutXHours",l,s)}else{if(m<i)return a.formatDistance("xDays",1,s);if(m<43200){const l=Math.round(m/1440);return a.formatDistance("xDays",l,s)}else if(m<43200*2)return w=Math.round(m/43200),a.formatDistance("aboutXMonths",w,s)}if(w=ie(u,c),w<12){const l=Math.round(m/43200);return a.formatDistance("xMonths",l,s)}else{const l=w%12,g=Math.trunc(w/12);return l<3?a.formatDistance("aboutXYears",g,s):l<9?a.formatDistance("overXYears",g,s):a.formatDistance("almostXYears",g+1,s)}}function Jt(t,e){return at(t,J(t),e)}function pt(t,e){const n=()=>D(e==null?void 0:e.in,NaN),a=ut(t);let i;if(a.date){const u=ct(a.date,2);i=dt(u.restDateString,u.year)}if(!i||isNaN(+i))return n();const o=+i;let s=0,c;if(a.time&&(s=ft(a.time),isNaN(s)))return n();if(a.timezone){if(c=lt(a.timezone),isNaN(c))return n()}else{const u=new Date(o+s),f=h(0,e==null?void 0:e.in);return f.setFullYear(u.getUTCFullYear(),u.getUTCMonth(),u.getUTCDate()),f.setHours(u.getUTCHours(),u.getUTCMinutes(),u.getUTCSeconds(),u.getUTCMilliseconds()),f}return h(o+s+c,e==null?void 0:e.in)}const S={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},it=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,st=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,ot=/^([+-])(\d{2})(?::?(\d{2}))?$/;function ut(t){const e={},n=t.split(S.dateTimeDelimiter);let r;if(n.length>2)return e;if(/:/.test(n[0])?r=n[0]:(e.date=n[0],r=n[1],S.timeZoneDelimiter.test(e.date)&&(e.date=t.split(S.timeZoneDelimiter)[0],r=t.substr(e.date.length,t.length))),r){const a=S.timezone.exec(r);a?(e.time=r.replace(a[1],""),e.timezone=a[1]):e.time=r}return e}function ct(t,e){const n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),r=t.match(n);if(!r)return{year:NaN,restDateString:""};const a=r[1]?parseInt(r[1]):null,i=r[2]?parseInt(r[2]):null;return{year:i===null?a:i*100,restDateString:t.slice((r[1]||r[2]).length)}}function dt(t,e){if(e===null)return new Date(NaN);const n=t.match(it);if(!n)return new Date(NaN);const r=!!n[4],a=x(n[1]),i=x(n[2])-1,o=x(n[3]),s=x(n[4]),c=x(n[5])-1;if(r)return yt(e,s,c)?mt(e,s,c):new Date(NaN);{const u=new Date(0);return!gt(e,i,o)||!wt(e,a)?new Date(NaN):(u.setUTCFullYear(e,i,Math.max(a,o)),u)}}function x(t){return t?parseInt(t):1}function ft(t){const e=t.match(st);if(!e)return NaN;const n=I(e[1]),r=I(e[2]),a=I(e[3]);return bt(n,r,a)?n*36e5+r*6e4+a*1e3:NaN}function I(t){return t&&parseFloat(t.replace(",","."))||0}function lt(t){if(t==="Z")return 0;const e=t.match(ot);if(!e)return 0;const n=e[1]==="+"?-1:1,r=parseInt(e[2]),a=e[3]&&parseInt(e[3])||0;return Mt(r,a)?n*(r*36e5+a*6e4):NaN}function mt(t,e,n){const r=new Date(0);r.setUTCFullYear(t,0,4);const a=r.getUTCDay()||7,i=(e-1)*7+n+1-a;return r.setUTCDate(r.getUTCDate()+i),r}const ht=[31,null,31,30,31,30,31,31,30,31,30,31];function z(t){return t%400===0||t%4===0&&t%100!==0}function gt(t,e,n){return e>=0&&e<=11&&n>=1&&n<=(ht[e]||(z(t)?29:28))}function wt(t,e){return e>=1&&e<=(z(t)?366:365)}function yt(t,e,n){return e>=1&&e<=53&&n>=0&&n<=6}function bt(t,e,n){return t===24?e===0&&n===0:n>=0&&n<60&&e>=0&&e<60&&t>=0&&t<25}function Mt(t,e){return e>=0&&e<=59}const Dt={lessThanXSeconds:{one:"1초 미만",other:"{{count}}초 미만"},xSeconds:{one:"1초",other:"{{count}}초"},halfAMinute:"30초",lessThanXMinutes:{one:"1분 미만",other:"{{count}}분 미만"},xMinutes:{one:"1분",other:"{{count}}분"},aboutXHours:{one:"약 1시간",other:"약 {{count}}시간"},xHours:{one:"1시간",other:"{{count}}시간"},xDays:{one:"1일",other:"{{count}}일"},aboutXWeeks:{one:"약 1주",other:"약 {{count}}주"},xWeeks:{one:"1주",other:"{{count}}주"},aboutXMonths:{one:"약 1개월",other:"약 {{count}}개월"},xMonths:{one:"1개월",other:"{{count}}개월"},aboutXYears:{one:"약 1년",other:"약 {{count}}년"},xYears:{one:"1년",other:"{{count}}년"},overXYears:{one:"1년 이상",other:"{{count}}년 이상"},almostXYears:{one:"거의 1년",other:"거의 {{count}}년"}},Pt=(t,e,n)=>{let r;const a=Dt[t];return typeof a=="string"?r=a:e===1?r=a.one:r=a.other.replace("{{count}}",e.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?r+" 후":r+" 전":r},vt={full:"y년 M월 d일 EEEE",long:"y년 M월 d일",medium:"y.MM.dd",short:"y.MM.dd"},Wt={full:"a H시 mm분 ss초 zzzz",long:"a H:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},Ot={full:"{{date}} {{time}}",long:"{{date}} {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},xt={date:O({formats:vt,defaultWidth:"full"}),time:O({formats:Wt,defaultWidth:"full"}),dateTime:O({formats:Ot,defaultWidth:"full"})},kt={lastWeek:"'지난' eeee p",yesterday:"'어제' p",today:"'오늘' p",tomorrow:"'내일' p",nextWeek:"'다음' eeee p",other:"P"},Tt=(t,e,n,r)=>kt[t],St={narrow:["BC","AD"],abbreviated:["BC","AD"],wide:["기원전","서기"]},Yt={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1분기","2분기","3분기","4분기"]},Nt={narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],abbreviated:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],wide:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]},Ft={narrow:["일","월","화","수","목","금","토"],short:["일","월","화","수","목","금","토"],abbreviated:["일","월","화","수","목","금","토"],wide:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]},Ct={narrow:{am:"오전",pm:"오후",midnight:"자정",noon:"정오",morning:"아침",afternoon:"오후",evening:"저녁",night:"밤"},abbreviated:{am:"오전",pm:"오후",midnight:"자정",noon:"정오",morning:"아침",afternoon:"오후",evening:"저녁",night:"밤"},wide:{am:"오전",pm:"오후",midnight:"자정",noon:"정오",morning:"아침",afternoon:"오후",evening:"저녁",night:"밤"}},Et={narrow:{am:"오전",pm:"오후",midnight:"자정",noon:"정오",morning:"아침",afternoon:"오후",evening:"저녁",night:"밤"},abbreviated:{am:"오전",pm:"오후",midnight:"자정",noon:"정오",morning:"아침",afternoon:"오후",evening:"저녁",night:"밤"},wide:{am:"오전",pm:"오후",midnight:"자정",noon:"정오",morning:"아침",afternoon:"오후",evening:"저녁",night:"밤"}},It=(t,e)=>{const n=Number(t);switch(String(e==null?void 0:e.unit)){case"minute":case"second":return String(n);case"date":return n+"일";default:return n+"번째"}},$t={ordinalNumber:It,era:b({values:St,defaultWidth:"wide"}),quarter:b({values:Yt,defaultWidth:"wide",argumentCallback:t=>t-1}),month:b({values:Nt,defaultWidth:"wide"}),day:b({values:Ft,defaultWidth:"wide"}),dayPeriod:b({values:Ct,defaultWidth:"wide",formattingValues:Et,defaultFormattingWidth:"wide"})},Ht=/^(\d+)(일|번째)?/i,Xt=/\d+/i,qt={narrow:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(기원전|서기)/i},_t={any:[/^(bc|기원전)/i,/^(ad|서기)/i]},Qt={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234]사?분기/i},Lt={any:[/1/i,/2/i,/3/i,/4/i]},Rt={narrow:/^(1[012]|[123456789])/,abbreviated:/^(1[012]|[123456789])월/i,wide:/^(1[012]|[123456789])월/i},Vt={any:[/^1월?$/,/^2/,/^3/,/^4/,/^5/,/^6/,/^7/,/^8/,/^9/,/^10/,/^11/,/^12/]},At={narrow:/^[일월화수목금토]/,short:/^[일월화수목금토]/,abbreviated:/^[일월화수목금토]/,wide:/^[일월화수목금토]요일/},jt={any:[/^일/,/^월/,/^화/,/^수/,/^목/,/^금/,/^토/]},zt={any:/^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i},Bt={any:{am:/^(am|오전)/i,pm:/^(pm|오후)/i,midnight:/^자정/i,noon:/^정오/i,morning:/^아침/i,afternoon:/^오후/i,evening:/^저녁/i,night:/^밤/i}},Gt={ordinalNumber:R({matchPattern:Ht,parsePattern:Xt,valueCallback:t=>parseInt(t,10)}),era:M({matchPatterns:qt,defaultMatchWidth:"wide",parsePatterns:_t,defaultParseWidth:"any"}),quarter:M({matchPatterns:Qt,defaultMatchWidth:"wide",parsePatterns:Lt,defaultParseWidth:"any",valueCallback:t=>t+1}),month:M({matchPatterns:Rt,defaultMatchWidth:"wide",parsePatterns:Vt,defaultParseWidth:"any"}),day:M({matchPatterns:At,defaultMatchWidth:"wide",parsePatterns:jt,defaultParseWidth:"any"}),dayPeriod:M({matchPatterns:zt,defaultMatchWidth:"any",parsePatterns:Bt,defaultParseWidth:"any"})},Zt={code:"ko",formatDistance:Pt,formatLong:xt,formatRelative:Tt,localize:$t,match:Gt,options:{weekStartsOn:0,firstWeekContainsDate:1}};export{Ut as a,Jt as f,Zt as k,pt as p};