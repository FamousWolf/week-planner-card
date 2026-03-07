function e(e){return e&&e.__esModule?e.default:e}let t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class a{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(n&&void 0===e){let n=void 0!==t&&1===t.length;n&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&r.set(t,e))}return e}toString(){return this.cssText}}let s=(e,...t)=>new a(1===e.length?e[0]:t.reduce((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1],e[0]),e,i),o=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t,n="";for(let t of e.cssRules)n+=t.cssText;return new a("string"==typeof(t=n)?t:t+"",void 0,i)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:f}=Object,m=globalThis,v=m.trustedTypes,y=v?v.emptyScript:"",g=m.reactiveElementPolyfillSupport,p={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},w=(e,t)=>!l(e,t),A={attribute:!0,type:String,converter:p,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class F extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=A){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(e,n,t);void 0!==i&&u(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){let{get:i,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){let a=i?.call(this);r?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??A}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[...c(e),...h(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,n]of t)this.elementProperties.set(e,n)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let n of new Set(e.flat(1/0).reverse()))t.unshift(o(n));else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(n)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of i){let i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(void 0!==i&&!0===n.reflect){let r=(void 0!==n.converter?.toAttribute?n.converter:p).toAttribute(t,n.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){let n=this.constructor,i=n._$Eh.get(e);if(void 0!==i&&this._$Em!==i){let e=n.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:p;this._$Em=i;let a=r.fromAttribute(t,e.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,n,i=!1,r){if(void 0!==e){let a=this.constructor;if(!1===i&&(r=this[e]),!(((n??=a.getPropertyOptions(e)).hasChanged??w)(r,t)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:r},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==r||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,n,i)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}F.elementStyles=[],F.shadowRootOptions={mode:"open"},F.elementProperties=new Map,F.finalized=new Map,g?.({ReactiveElement:F}),(m.reactiveElementVersions??=[]).push("2.1.2");let k=globalThis,b=e=>e,_=k.trustedTypes,E=_?_.createPolicy("lit-html",{createHTML:e=>e}):void 0,D="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+T,B=`<${S}>`,x=document,C=()=>x.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,N="[ 	\n\f\r]",$=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,L=/>/g,V=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,z=/"/g,P=/^(?:script|style|textarea|title)$/i,U=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),W=U(1),j=(U(2),U(3),Symbol.for("lit-noChange")),R=Symbol.for("lit-nothing"),Q=new WeakMap,Z=x.createTreeWalker(x,129);function Y(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}class J{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,a=0,s=e.length-1,o=this.parts,[l,u]=((e,t)=>{let n=e.length-1,i=[],r,a=2===t?"<svg>":3===t?"<math>":"",s=$;for(let t=0;t<n;t++){let n=e[t],o,l,u=-1,d=0;for(;d<n.length&&(s.lastIndex=d,null!==(l=s.exec(n)));)d=s.lastIndex,s===$?"!--"===l[1]?s=I:void 0!==l[1]?s=L:void 0!==l[2]?(P.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=V):void 0!==l[3]&&(s=V):s===V?">"===l[0]?(s=r??$,u=-1):void 0===l[1]?u=-2:(u=s.lastIndex-l[2].length,o=l[1],s=void 0===l[3]?V:'"'===l[3]?z:H):s===z||s===H?s=V:s===I||s===L?s=$:(s=V,r=void 0);let c=s===V&&e[t+1].startsWith("/>")?" ":"";a+=s===$?n+B:u>=0?(i.push(o),n.slice(0,u)+D+n.slice(u)+T+c):n+T+(-2===u?t:c)}return[Y(e,a+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]})(e,t);if(this.el=J.createElement(l,n),Z.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Z.nextNode())&&o.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(D)){let t=u[a++],n=i.getAttribute(e).split(T),s=/([.?@])?(.*)/.exec(t);o.push({type:1,index:r,name:s[2],strings:n,ctor:"."===s[1]?ee:"?"===s[1]?et:"@"===s[1]?en:X}),i.removeAttribute(e)}else e.startsWith(T)&&(o.push({type:6,index:r}),i.removeAttribute(e));if(P.test(i.tagName)){let e=i.textContent.split(T),t=e.length-1;if(t>0){i.textContent=_?_.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],C()),Z.nextNode(),o.push({type:2,index:++r});i.append(e[t],C())}}}else if(8===i.nodeType)if(i.data===S)o.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(T,e+1));)o.push({type:7,index:r}),e+=T.length-1}r++}}static createElement(e,t){let n=x.createElement("template");return n.innerHTML=e,n}}function G(e,t,n=e,i){if(t===j)return t;let r=void 0!==i?n._$Co?.[i]:n._$Cl,a=O(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(e))._$AT(e,n,i),void 0!==i?(n._$Co??=[])[i]=r:n._$Cl=r),void 0!==r&&(t=G(e,r._$AS(e,t.values),r,i)),t}class q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??x).importNode(t,!0);Z.currentNode=i;let r=Z.nextNode(),a=0,s=0,o=n[0];for(;void 0!==o;){if(a===o.index){let t;2===o.type?t=new K(r,r.nextSibling,this,e):1===o.type?t=new o.ctor(r,o.name,o.strings,this,e):6===o.type&&(t=new ei(r,this,e)),this._$AV.push(t),o=n[++s]}a!==o?.index&&(r=Z.nextNode(),a++)}return Z.currentNode=x,i}p(e){let t=0;for(let n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){let n;O(e=G(this,e,t))?e===R||null==e||""===e?(this._$AH!==R&&this._$AR(),this._$AH=R):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):M(n=e)||"function"==typeof n?.[Symbol.iterator]?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==R&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=J.createElement(Y(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{let e=new q(i,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Q.get(e.strings);return void 0===t&&Q.set(e.strings,t=new J(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,i=0;for(let r of e)i===t.length?t.push(n=new K(this.O(C()),this.O(C()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=b(e).nextSibling;b(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,r){this.type=1,this._$AH=R,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=R}_$AI(e,t=this,n,i){let r=this.strings,a=!1;if(void 0===r)(a=!O(e=G(this,e,t,0))||e!==this._$AH&&e!==j)&&(this._$AH=e);else{let i,s,o=e;for(e=r[0],i=0;i<r.length-1;i++)(s=G(this,o[n+i],t,i))===j&&(s=this._$AH[i]),a||=!O(s)||s!==this._$AH[i],s===R?e=R:e!==R&&(e+=(s??"")+r[i+1]),this._$AH[i]=s}a&&!i&&this.j(e)}j(e){e===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===R?void 0:e}}class et extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==R)}}class en extends X{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??R)===j)return;let n=this._$AH,i=e===R&&n!==R||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==R&&(n===R||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ei{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}let er=k.litHtmlPolyfillSupport;er?.(J,K),(k.litHtmlVersions??=[]).push("3.3.2");let ea=globalThis;class es extends F{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{let i=n?.renderBefore??t,r=i._$litPart$;if(void 0===r){let e=n?.renderBefore??null;i._$litPart$=r=new K(t.insertBefore(C(),e),e,void 0,n??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}es._$litElement$=!0,es.finalized=!0,ea.litElementHydrateSupport?.({LitElement:es});let eo=ea.litElementPolyfillSupport;eo?.({LitElement:es}),(ea.litElementVersions??=[]).push("4.2.2");class el{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class eu extends el{constructor(e){if(super(e),this.it=R,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===R||null==e)return this._t=void 0,this.it=e;if(e===j)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}eu.directiveName="unsafeHTML",eu.resultType=1;let ed=(...e)=>({_$litDirective$:eu,values:e});var ec,eh={};function ef(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(i.key),i)}}function em(e,t,n){return t&&ef(e.prototype,t),n&&ef(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function ev(){return(ev=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function ey(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ep(e,t)}function eg(e){return(eg=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function ep(e,t){return(ep=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function ew(e,t,n){return(ew=!function(){if("u"<typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}()?function(e,t,n){var i=[null];i.push.apply(i,t);var r=new(Function.bind.apply(e,i));return n&&ep(r,n.prototype),r}:Reflect.construct.bind()).apply(null,arguments)}function eA(e){var t="function"==typeof Map?new Map:void 0;return(eA=function(e){if(null===e||-1===Function.toString.call(e).indexOf("[native code]"))return e;if("function"!=typeof e)throw TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return ew(e,arguments,eg(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),ep(n,e)})(e)}function eF(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}function ek(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}function eb(e,t){var n="u">typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return ek(e,void 0);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ek(e,void 0)}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(eh,"__esModule",{value:!0});var e_=function(e){function t(){return e.apply(this,arguments)||this}return ey(t,e),t}(eA(Error)),eE=function(e){function t(t){return e.call(this,"Invalid DateTime: "+t.toMessage())||this}return ey(t,e),t}(e_),eD=function(e){function t(t){return e.call(this,"Invalid Interval: "+t.toMessage())||this}return ey(t,e),t}(e_),eT=function(e){function t(t){return e.call(this,"Invalid Duration: "+t.toMessage())||this}return ey(t,e),t}(e_),eS=function(e){function t(){return e.apply(this,arguments)||this}return ey(t,e),t}(e_),eB=function(e){function t(t){return e.call(this,"Invalid unit "+t)||this}return ey(t,e),t}(e_),ex=function(e){function t(){return e.apply(this,arguments)||this}return ey(t,e),t}(e_),eC=function(e){function t(){return e.call(this,"Zone is an abstract class")||this}return ey(t,e),t}(e_),eO="numeric",eM="short",eN="long",e$={year:eO,month:eO,day:eO},eI={year:eO,month:eM,day:eO},eL={year:eO,month:eM,day:eO,weekday:eM},eV={year:eO,month:eN,day:eO},eH={year:eO,month:eN,day:eO,weekday:eN},ez={hour:eO,minute:eO},eP={hour:eO,minute:eO,second:eO},eU={hour:eO,minute:eO,second:eO,timeZoneName:eM},eW={hour:eO,minute:eO,second:eO,timeZoneName:eN},ej={hour:eO,minute:eO,hourCycle:"h23"},eR={hour:eO,minute:eO,second:eO,hourCycle:"h23"},eQ={hour:eO,minute:eO,second:eO,hourCycle:"h23",timeZoneName:eM},eZ={hour:eO,minute:eO,second:eO,hourCycle:"h23",timeZoneName:eN},eY={year:eO,month:eO,day:eO,hour:eO,minute:eO},eJ={year:eO,month:eO,day:eO,hour:eO,minute:eO,second:eO},eG={year:eO,month:eM,day:eO,hour:eO,minute:eO},eq={year:eO,month:eM,day:eO,hour:eO,minute:eO,second:eO},eK={year:eO,month:eM,day:eO,weekday:eM,hour:eO,minute:eO},eX={year:eO,month:eN,day:eO,hour:eO,minute:eO,timeZoneName:eM},e2={year:eO,month:eN,day:eO,hour:eO,minute:eO,second:eO,timeZoneName:eM},e0={year:eO,month:eN,day:eO,weekday:eN,hour:eO,minute:eO,timeZoneName:eN},e1={year:eO,month:eN,day:eO,weekday:eN,hour:eO,minute:eO,second:eO,timeZoneName:eN},e3=function(){function e(){}var t=e.prototype;return t.offsetName=function(e,t){throw new eC},t.formatOffset=function(e,t){throw new eC},t.offset=function(e){throw new eC},t.equals=function(e){throw new eC},em(e,[{key:"type",get:function(){throw new eC}},{key:"name",get:function(){throw new eC}},{key:"ianaName",get:function(){return this.name}},{key:"isUniversal",get:function(){throw new eC}},{key:"isValid",get:function(){throw new eC}}]),e}(),e4=null,e6=function(e){function t(){return e.apply(this,arguments)||this}ey(t,e);var n=t.prototype;return n.offsetName=function(e,t){return ns(e,t.format,t.locale)},n.formatOffset=function(e,t){return nd(this.offset(e),t)},n.offset=function(e){return-new Date(e).getTimezoneOffset()},n.equals=function(e){return"system"===e.type},em(t,[{key:"type",get:function(){return"system"}},{key:"name",get:function(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}},{key:"isUniversal",get:function(){return!1}},{key:"isValid",get:function(){return!0}}],[{key:"instance",get:function(){return null===e4&&(e4=new t),e4}}]),t}(e3),e8=new Map,e5={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6},e7=new Map,e9=function(e){function t(n){var i;return(i=e.call(this)||this).zoneName=n,i.valid=t.isValidZone(n),i}ey(t,e),t.create=function(e){var n=e7.get(e);return void 0===n&&e7.set(e,n=new t(e)),n},t.resetCache=function(){e7.clear(),e8.clear()},t.isValidSpecifier=function(e){return this.isValidZone(e)},t.isValidZone=function(e){if(!e)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:e}).format(),!0}catch(e){return!1}};var n=t.prototype;return n.offsetName=function(e,t){return ns(e,t.format,t.locale,this.name)},n.formatOffset=function(e,t){return nd(this.offset(e),t)},n.offset=function(e){if(!this.valid)return NaN;var t,n,i,r,a,s,o=new Date(e);if(isNaN(o))return NaN;var l=(t=this.name,void 0===(n=e8.get(t))&&(n=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"}),e8.set(t,n)),n),u=l.formatToParts?function(e,t){for(var n=e.formatToParts(t),i=[],r=0;r<n.length;r++){var a=n[r],s=a.type,o=a.value,l=e5[s];"era"===s?i[l]=o:tJ(l)||(i[l]=parseInt(o,10))}return i}(l,o):(i=l.format(o).replace(/\u200E/g,""),a=(r=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(i))[1],s=r[2],[r[3],a,s,r[4],r[5],r[6],r[7]]),d=u[0],c=u[1],h=u[2],f=u[3],m=u[4],v=u[5],y=u[6];"BC"===f&&(d=-Math.abs(d)+1);var g=nn({year:d,month:c,day:h,hour:24===m?0:m,minute:v,second:y,millisecond:0}),p=+o,w=p%1e3;return(g-(p-=w>=0?w:1e3+w))/6e4},n.equals=function(e){return"iana"===e.type&&e.name===this.name},em(t,[{key:"type",get:function(){return"iana"}},{key:"name",get:function(){return this.zoneName}},{key:"isUniversal",get:function(){return!1}},{key:"isValid",get:function(){return this.valid}}]),t}(e3),te=["base"],tt=["padTo","floor"],tn={},ti=new Map;function tr(e,t){void 0===t&&(t={});var n=JSON.stringify([e,t]),i=ti.get(n);return void 0===i&&(i=new Intl.DateTimeFormat(e,t),ti.set(n,i)),i}var ta=new Map,ts=new Map,to=null,tl=new Map;function tu(e){var t=tl.get(e);return void 0===t&&(t=new Intl.DateTimeFormat(e).resolvedOptions(),tl.set(e,t)),t}var td=new Map;function tc(e,t,n,i){var r=e.listingMode();return"error"===r?null:"en"===r?n(t):i(t)}var th=function(){function e(e,t,n){this.padTo=n.padTo||0,this.floor=n.floor||!1,n.padTo,n.floor;var i=eF(n,tt);if(!t||Object.keys(i).length>0){var r,a,s,o=ev({useGrouping:!1},n);n.padTo>0&&(o.minimumIntegerDigits=n.padTo),this.inf=(void 0===(r=o)&&(r={}),a=JSON.stringify([e,r]),void 0===(s=ta.get(a))&&(s=new Intl.NumberFormat(e,r),ta.set(a,s)),s)}}return e.prototype.format=function(e){if(!this.inf)return t4(this.floor?Math.floor(e):t7(e,3),this.padTo);var t=this.floor?Math.floor(e):e;return this.inf.format(t)},e}(),tf=function(){function e(e,t,n){this.opts=n,this.originalZone=void 0;var i=void 0;if(this.opts.timeZone)this.dt=e;else if("fixed"===e.zone.type){var r=-1*(e.offset/60),a=r>=0?"Etc/GMT+"+r:"Etc/GMT"+r;0!==e.offset&&e9.create(a).valid?(i=a,this.dt=e):(i="UTC",this.dt=0===e.offset?e:e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone)}else"system"===e.zone.type?this.dt=e:"iana"===e.zone.type?(this.dt=e,i=e.zone.name):(i="UTC",this.dt=e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone);var s=ev({},this.opts);s.timeZone=s.timeZone||i,this.dtf=tr(t,s)}var t=e.prototype;return t.format=function(){return this.originalZone?this.formatToParts().map(function(e){return e.value}).join(""):this.dtf.format(this.dt.toJSDate())},t.formatToParts=function(){var e=this,t=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?t.map(function(t){if("timeZoneName"!==t.type)return t;var n=e.originalZone.offsetName(e.dt.ts,{locale:e.dt.locale,format:e.opts.timeZoneName});return ev({},t,{value:n})}):t},t.resolvedOptions=function(){return this.dtf.resolvedOptions()},e}(),tm=function(){function e(e,t,n){var i,r,a,s;this.opts=ev({style:"long"},n),!t&&tK()&&(this.rtf=(void 0===(i=n)&&(i={}),(r=i).base,a=JSON.stringify([e,eF(r,te)]),void 0===(s=ts.get(a))&&(s=new Intl.RelativeTimeFormat(e,i),ts.set(a,s)),s))}var t=e.prototype;return t.format=function(e,t){return this.rtf?this.rtf.format(e,t):function(e,t,n,i){void 0===n&&(n="always"),void 0===i&&(i=!1);var r={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},a=-1===["hours","minutes","seconds"].indexOf(e);if("auto"===n&&a){var s="days"===e;switch(t){case 1:return s?"tomorrow":"next "+r[e][0];case -1:return s?"yesterday":"last "+r[e][0];case 0:return s?"today":"this "+r[e][0]}}var o=Object.is(t,-0)||t<0,l=Math.abs(t),u=1===l,d=r[e],c=i?u?d[1]:d[2]||d[1]:u?r[e][0]:e;return o?l+" "+c+" ago":"in "+l+" "+c}(t,e,this.opts.numeric,"long"!==this.opts.style)},t.formatToParts=function(e,t){return this.rtf?this.rtf.formatToParts(e,t):[]},e}(),tv={firstDay:1,minimalDays:4,weekend:[6,7]},ty=function(){function e(e,t,n,i,r){var a,s,o,l=function(e){var t=e.indexOf("-x-");-1!==t&&(e=e.substring(0,t));var n=e.indexOf("-u-");if(-1===n)return[e];try{i=tr(e).resolvedOptions(),r=e}catch(t){var i,r,a=e.substring(0,n);i=tr(a).resolvedOptions(),r=a}var s=i;return[r,s.numberingSystem,s.calendar]}(e),u=l[0],d=l[1],c=l[2];this.locale=u,this.numberingSystem=t||d||null,this.outputCalendar=n||c||null,this.weekSettings=i,this.intl=(a=this.locale,s=this.numberingSystem,((o=this.outputCalendar)||s)&&(a.includes("-u-")||(a+="-u"),o&&(a+="-ca-"+o),s&&(a+="-nu-"+s)),a),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=r,this.fastNumbersCached=null}e.fromOpts=function(t){return e.create(t.locale,t.numberingSystem,t.outputCalendar,t.weekSettings,t.defaultToEN)},e.create=function(t,n,i,r,a){void 0===a&&(a=!1);var s=t||tN.defaultLocale;return new e(s||(a?"en-US":to||(to=new Intl.DateTimeFormat().resolvedOptions().locale)),n||tN.defaultNumberingSystem,i||tN.defaultOutputCalendar,t1(r)||tN.defaultWeekSettings,s)},e.resetCache=function(){to=null,ti.clear(),ta.clear(),ts.clear(),tl.clear(),td.clear()},e.fromObject=function(t){var n=void 0===t?{}:t,i=n.locale,r=n.numberingSystem,a=n.outputCalendar,s=n.weekSettings;return e.create(i,r,a,s)};var t=e.prototype;return t.listingMode=function(){var e=this.isEnglish(),t=(null===this.numberingSystem||"latn"===this.numberingSystem)&&(null===this.outputCalendar||"gregory"===this.outputCalendar);return e&&t?"en":"intl"},t.clone=function(t){return t&&0!==Object.getOwnPropertyNames(t).length?e.create(t.locale||this.specifiedLocale,t.numberingSystem||this.numberingSystem,t.outputCalendar||this.outputCalendar,t1(t.weekSettings)||this.weekSettings,t.defaultToEN||!1):this},t.redefaultToEN=function(e){return void 0===e&&(e={}),this.clone(ev({},e,{defaultToEN:!0}))},t.redefaultToSystem=function(e){return void 0===e&&(e={}),this.clone(ev({},e,{defaultToEN:!1}))},t.months=function(e,t){var n=this;return void 0===t&&(t=!1),tc(this,e,nv,function(){var i="ja"===n.intl||n.intl.startsWith("ja-"),r=(t&=!i)?{month:e,day:"numeric"}:{month:e},a=t?"format":"standalone";if(!n.monthsCache[a][e]){var s=i?function(e){return n.dtFormatter(e,r).format()}:function(e){return n.extract(e,r,"month")};n.monthsCache[a][e]=function(e){for(var t=[],n=1;n<=12;n++){var i=i8.utc(2009,n,1);t.push(e(i))}return t}(s)}return n.monthsCache[a][e]})},t.weekdays=function(e,t){var n=this;return void 0===t&&(t=!1),tc(this,e,nw,function(){var i=t?{weekday:e,year:"numeric",month:"long",day:"numeric"}:{weekday:e},r=t?"format":"standalone";return n.weekdaysCache[r][e]||(n.weekdaysCache[r][e]=function(e){for(var t=[],n=1;n<=7;n++){var i=i8.utc(2016,11,13+n);t.push(e(i))}return t}(function(e){return n.extract(e,i,"weekday")})),n.weekdaysCache[r][e]})},t.meridiems=function(){var e=this;return tc(this,void 0,function(){return nA},function(){if(!e.meridiemCache){var t={hour:"numeric",hourCycle:"h12"};e.meridiemCache=[i8.utc(2016,11,13,9),i8.utc(2016,11,13,19)].map(function(n){return e.extract(n,t,"dayperiod")})}return e.meridiemCache})},t.eras=function(e){var t=this;return tc(this,e,n_,function(){var n={era:e};return t.eraCache[e]||(t.eraCache[e]=[i8.utc(-40,1,1),i8.utc(2017,1,1)].map(function(e){return t.extract(e,n,"era")})),t.eraCache[e]})},t.extract=function(e,t,n){var i=this.dtFormatter(e,t).formatToParts().find(function(e){return e.type.toLowerCase()===n});return i?i.value:null},t.numberFormatter=function(e){return void 0===e&&(e={}),new th(this.intl,e.forceSimple||this.fastNumbers,e)},t.dtFormatter=function(e,t){return void 0===t&&(t={}),new tf(e,this.intl,t)},t.relFormatter=function(e){return void 0===e&&(e={}),new tm(this.intl,this.isEnglish(),e)},t.listFormatter=function(e){var t,n,i,r;return void 0===e&&(e={}),t=this.intl,void 0===(n=e)&&(n={}),(r=tn[i=JSON.stringify([t,n])])||(r=new Intl.ListFormat(t,n),tn[i]=r),r},t.isEnglish=function(){return"en"===this.locale||"en-us"===this.locale.toLowerCase()||tu(this.intl).locale.startsWith("en-us")},t.getWeekSettings=function(){if(this.weekSettings)return this.weekSettings;if(!tX())return tv;var e=this.locale,t=td.get(e);if(!t){var n=new Intl.Locale(e);"minimalDays"in(t="getWeekInfo"in n?n.getWeekInfo():n.weekInfo)||(t=ev({},tv,t)),td.set(e,t)}return t},t.getStartOfWeek=function(){return this.getWeekSettings().firstDay},t.getMinDaysInFirstWeek=function(){return this.getWeekSettings().minimalDays},t.getWeekendDays=function(){return this.getWeekSettings().weekend},t.equals=function(e){return this.locale===e.locale&&this.numberingSystem===e.numberingSystem&&this.outputCalendar===e.outputCalendar},t.toString=function(){return"Locale("+this.locale+", "+this.numberingSystem+", "+this.outputCalendar+")"},em(e,[{key:"fastNumbers",get:function(){return null==this.fastNumbersCached&&(this.fastNumbersCached=(!this.numberingSystem||"latn"===this.numberingSystem)&&("latn"===this.numberingSystem||!this.locale||this.locale.startsWith("en")||"latn"===tu(this.locale).numberingSystem)),this.fastNumbersCached}}]),e}(),tg=null,tp=function(e){function t(t){var n;return(n=e.call(this)||this).fixed=t,n}ey(t,e),t.instance=function(e){return 0===e?t.utcInstance:new t(e)},t.parseSpecifier=function(e){if(e){var n=e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(n)return new t(no(n[1],n[2]))}return null};var n=t.prototype;return n.offsetName=function(){return this.name},n.formatOffset=function(e,t){return nd(this.fixed,t)},n.offset=function(){return this.fixed},n.equals=function(e){return"fixed"===e.type&&e.fixed===this.fixed},em(t,[{key:"type",get:function(){return"fixed"}},{key:"name",get:function(){return 0===this.fixed?"UTC":"UTC"+nd(this.fixed,"narrow")}},{key:"ianaName",get:function(){return 0===this.fixed?"Etc/UTC":"Etc/GMT"+nd(-this.fixed,"narrow")}},{key:"isUniversal",get:function(){return!0}},{key:"isValid",get:function(){return!0}}],[{key:"utcInstance",get:function(){return null===tg&&(tg=new t(0)),tg}}]),t}(e3),tw=function(e){function t(t){var n;return(n=e.call(this)||this).zoneName=t,n}ey(t,e);var n=t.prototype;return n.offsetName=function(){return null},n.formatOffset=function(){return""},n.offset=function(){return NaN},n.equals=function(){return!1},em(t,[{key:"type",get:function(){return"invalid"}},{key:"name",get:function(){return this.zoneName}},{key:"isUniversal",get:function(){return!1}},{key:"isValid",get:function(){return!1}}]),t}(e3);function tA(e,t){if(tJ(e)||null===e)return t;if(e instanceof e3)return e;if("string"==typeof e){var n=e.toLowerCase();return"default"===n?t:"local"===n||"system"===n?e6.instance:"utc"===n||"gmt"===n?tp.utcInstance:tp.parseSpecifier(n)||e9.create(e)}if(tG(e))return tp.instance(e);if("object"==typeof e&&"offset"in e&&"function"==typeof e.offset)return e;else return new tw(e)}var tF={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},tk={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},tb=tF.hanidec.replace(/[\[|\]]/g,"").split(""),t_=new Map;function tE(e,t){var n=e.numberingSystem;void 0===t&&(t="");var i=n||"latn",r=t_.get(i);void 0===r&&(r=new Map,t_.set(i,r));var a=r.get(t);return void 0===a&&(a=RegExp(""+tF[i]+t),r.set(t,a)),a}var tD,tT=function(){return Date.now()},tS="system",tB=null,tx=null,tC=null,tO=60,tM=null,tN=function(){function e(){}return e.resetCaches=function(){ty.resetCache(),e9.resetCache(),i8.resetCache(),t_.clear()},em(e,null,[{key:"now",get:function(){return tT},set:function(e){tT=e}},{key:"defaultZone",get:function(){return tA(tS,e6.instance)},set:function(e){tS=e}},{key:"defaultLocale",get:function(){return tB},set:function(e){tB=e}},{key:"defaultNumberingSystem",get:function(){return tx},set:function(e){tx=e}},{key:"defaultOutputCalendar",get:function(){return tC},set:function(e){tC=e}},{key:"defaultWeekSettings",get:function(){return tM},set:function(e){tM=t1(e)}},{key:"twoDigitCutoffYear",get:function(){return tO},set:function(e){tO=e%100}},{key:"throwOnInvalid",get:function(){return tD},set:function(e){tD=e}}]),e}(),t$=function(){function e(e,t){this.reason=e,this.explanation=t}return e.prototype.toMessage=function(){return this.explanation?this.reason+": "+this.explanation:this.reason},e}(),tI=[0,31,59,90,120,151,181,212,243,273,304,334],tL=[0,31,60,91,121,152,182,213,244,274,305,335];function tV(e,t){return new t$("unit out of range","you specified "+t+" (of type "+typeof t+") as a "+e+", which is invalid")}function tH(e,t,n){var i=new Date(Date.UTC(e,t-1,n));e<100&&e>=0&&i.setUTCFullYear(i.getUTCFullYear()-1900);var r=i.getUTCDay();return 0===r?7:r}function tz(e,t){var n=t9(e)?tL:tI,i=n.findIndex(function(e){return e<t}),r=t-n[i];return{month:i+1,day:r}}function tP(e,t){return(e-t+7)%7+1}function tU(e,t,n){void 0===t&&(t=4),void 0===n&&(n=1);var i,r=e.year,a=e.month,s=e.day,o=s+(t9(r)?tL:tI)[a-1],l=tP(tH(r,a,s),n),u=Math.floor((o-l+14-t)/7);return u<1?u=nr(i=r-1,t,n):u>nr(r,t,n)?(i=r+1,u=1):i=r,ev({weekYear:i,weekNumber:u,weekday:l},nc(e))}function tW(e,t,n){void 0===t&&(t=4),void 0===n&&(n=1);var i,r=e.weekYear,a=e.weekNumber,s=e.weekday,o=tP(tH(r,1,t),n),l=ne(r),u=7*a+s-o-7+t;u<1?u+=ne(i=r-1):u>l?(i=r+1,u-=ne(r)):i=r;var d=tz(i,u),c=d.month,h=d.day;return ev({year:i,month:c,day:h},nc(e))}function tj(e){var t=e.year,n=e.month,i=e.day+(t9(t)?tL:tI)[n-1];return ev({year:t,ordinal:i},nc(e))}function tR(e){var t=e.year,n=tz(t,e.ordinal),i=n.month,r=n.day;return ev({year:t,month:i,day:r},nc(e))}function tQ(e,t){if(!(!tJ(e.localWeekday)||!tJ(e.localWeekNumber)||!tJ(e.localWeekYear)))return{minDaysInFirstWeek:4,startOfWeek:1};if(!tJ(e.weekday)||!tJ(e.weekNumber)||!tJ(e.weekYear))throw new eS("Cannot mix locale-based week fields with ISO-based week fields");return tJ(e.localWeekday)||(e.weekday=e.localWeekday),tJ(e.localWeekNumber)||(e.weekNumber=e.localWeekNumber),tJ(e.localWeekYear)||(e.weekYear=e.localWeekYear),delete e.localWeekday,delete e.localWeekNumber,delete e.localWeekYear,{minDaysInFirstWeek:t.getMinDaysInFirstWeek(),startOfWeek:t.getStartOfWeek()}}function tZ(e){var t=tq(e.year),n=t3(e.month,1,12),i=t3(e.day,1,nt(e.year,e.month));return t?n?!i&&tV("day",e.day):tV("month",e.month):tV("year",e.year)}function tY(e){var t=e.hour,n=e.minute,i=e.second,r=e.millisecond,a=t3(t,0,23)||24===t&&0===n&&0===i&&0===r,s=t3(n,0,59),o=t3(i,0,59),l=t3(r,0,999);return a?s?o?!l&&tV("millisecond",r):tV("second",i):tV("minute",n):tV("hour",t)}function tJ(e){return void 0===e}function tG(e){return"number"==typeof e}function tq(e){return"number"==typeof e&&e%1==0}function tK(){try{return"u">typeof Intl&&!!Intl.RelativeTimeFormat}catch(e){return!1}}function tX(){try{return"u">typeof Intl&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch(e){return!1}}function t2(e,t,n){if(0!==e.length)return e.reduce(function(e,i){var r=[t(i),i];return e&&n(e[0],r[0])===e[0]?e:r},null)[1]}function t0(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function t1(e){if(null==e)return null;if("object"!=typeof e)throw new ex("Week settings must be an object");if(!t3(e.firstDay,1,7)||!t3(e.minimalDays,1,7)||!Array.isArray(e.weekend)||e.weekend.some(function(e){return!t3(e,1,7)}))throw new ex("Invalid week settings");return{firstDay:e.firstDay,minimalDays:e.minimalDays,weekend:Array.from(e.weekend)}}function t3(e,t,n){return tq(e)&&e>=t&&e<=n}function t4(e,t){return void 0===t&&(t=2),e<0?"-"+(""+-e).padStart(t,"0"):(""+e).padStart(t,"0")}function t6(e){if(!tJ(e)&&null!==e&&""!==e)return parseInt(e,10)}function t8(e){if(!tJ(e)&&null!==e&&""!==e)return parseFloat(e)}function t5(e){if(!tJ(e)&&null!==e&&""!==e)return Math.floor(1e3*parseFloat("0."+e))}function t7(e,t,n){void 0===n&&(n="round");var i=Math.pow(10,t);switch(n){case"expand":return e>0?Math.ceil(e*i)/i:Math.floor(e*i)/i;case"trunc":return Math.trunc(e*i)/i;case"round":return Math.round(e*i)/i;case"floor":return Math.floor(e*i)/i;case"ceil":return Math.ceil(e*i)/i;default:throw RangeError("Value rounding "+n+" is out of range")}}function t9(e){return e%4==0&&(e%100!=0||e%400==0)}function ne(e){return t9(e)?366:365}function nt(e,t){var n,i=(n=t-1)-12*Math.floor(n/12)+1;return 2===i?t9(e+(t-i)/12)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][i-1]}function nn(e){var t=Date.UTC(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond);return e.year<100&&e.year>=0&&(t=new Date(t)).setUTCFullYear(e.year,e.month-1,e.day),+t}function ni(e,t,n){return-tP(tH(e,1,t),n)+t-1}function nr(e,t,n){void 0===t&&(t=4),void 0===n&&(n=1);var i=ni(e,t,n),r=ni(e+1,t,n);return(ne(e)-i+r)/7}function na(e){return e>99?e:e>tN.twoDigitCutoffYear?1900+e:2e3+e}function ns(e,t,n,i){void 0===i&&(i=null);var r=new Date(e),a={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};i&&(a.timeZone=i);var s=ev({timeZoneName:t},a),o=new Intl.DateTimeFormat(n,s).formatToParts(r).find(function(e){return"timezonename"===e.type.toLowerCase()});return o?o.value:null}function no(e,t){var n=parseInt(e,10);Number.isNaN(n)&&(n=0);var i=parseInt(t,10)||0,r=n<0||Object.is(n,-0)?-i:i;return 60*n+r}function nl(e){var t=Number(e);if("boolean"==typeof e||""===e||!Number.isFinite(t))throw new ex("Invalid unit value "+e);return t}function nu(e,t){var n={};for(var i in e)if(t0(e,i)){var r=e[i];if(null==r)continue;n[t(i)]=nl(r)}return n}function nd(e,t){var n=Math.trunc(Math.abs(e/60)),i=Math.trunc(Math.abs(e%60)),r=e>=0?"+":"-";switch(t){case"short":return""+r+t4(n,2)+":"+t4(i,2);case"narrow":return""+r+n+(i>0?":"+i:"");case"techie":return""+r+t4(n,2)+t4(i,2);default:throw RangeError("Value format "+t+" is out of range for property format")}}function nc(e){return["hour","minute","second","millisecond"].reduce(function(t,n){return t[n]=e[n],t},{})}var nh=["January","February","March","April","May","June","July","August","September","October","November","December"],nf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],nm=["J","F","M","A","M","J","J","A","S","O","N","D"];function nv(e){switch(e){case"narrow":return[].concat(nm);case"short":return[].concat(nf);case"long":return[].concat(nh);case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}var ny=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],ng=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],np=["M","T","W","T","F","S","S"];function nw(e){switch(e){case"narrow":return[].concat(np);case"short":return[].concat(ng);case"long":return[].concat(ny);case"numeric":return["1","2","3","4","5","6","7"];default:return null}}var nA=["AM","PM"],nF=["Before Christ","Anno Domini"],nk=["BC","AD"],nb=["B","A"];function n_(e){switch(e){case"narrow":return[].concat(nb);case"short":return[].concat(nk);case"long":return[].concat(nF);default:return null}}function nE(e,t){for(var n,i="",r=eb(e);!(n=r()).done;){var a=n.value;a.literal?i+=a.val:i+=t(a.val)}return i}var nD={D:e$,DD:eI,DDD:eV,DDDD:eH,t:ez,tt:eP,ttt:eU,tttt:eW,T:ej,TT:eR,TTT:eQ,TTTT:eZ,f:eY,ff:eG,fff:eX,ffff:e0,F:eJ,FF:eq,FFF:e2,FFFF:e1},nT=function(){function e(e,t){this.opts=t,this.loc=e,this.systemLoc=null}e.create=function(t,n){return void 0===n&&(n={}),new e(t,n)},e.parseFormat=function(e){for(var t=null,n="",i=!1,r=[],a=0;a<e.length;a++){var s=e.charAt(a);"'"===s?((n.length>0||i)&&r.push({literal:i||/^\s+$/.test(n),val:""===n?"'":n}),t=null,n="",i=!i):i||s===t?n+=s:(n.length>0&&r.push({literal:/^\s+$/.test(n),val:n}),n=s,t=s)}return n.length>0&&r.push({literal:i||/^\s+$/.test(n),val:n}),r},e.macroTokenToFormatOpts=function(e){return nD[e]};var t=e.prototype;return t.formatWithSystemDefault=function(e,t){return null===this.systemLoc&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(e,ev({},this.opts,t)).format()},t.dtFormatter=function(e,t){return void 0===t&&(t={}),this.loc.dtFormatter(e,ev({},this.opts,t))},t.formatDateTime=function(e,t){return this.dtFormatter(e,t).format()},t.formatDateTimeParts=function(e,t){return this.dtFormatter(e,t).formatToParts()},t.formatInterval=function(e,t){return this.dtFormatter(e.start,t).dtf.formatRange(e.start.toJSDate(),e.end.toJSDate())},t.resolvedOptions=function(e,t){return this.dtFormatter(e,t).resolvedOptions()},t.num=function(e,t,n){if(void 0===t&&(t=0),void 0===n&&(n=void 0),this.opts.forceSimple)return t4(e,t);var i=ev({},this.opts);return t>0&&(i.padTo=t),n&&(i.signDisplay=n),this.loc.numberFormatter(i).format(e)},t.formatDateTimeFromString=function(t,n){var i=this,r="en"===this.loc.listingMode(),a=this.loc.outputCalendar&&"gregory"!==this.loc.outputCalendar,s=function(e,n){return i.loc.extract(t,e,n)},o=function(e){return t.isOffsetFixed&&0===t.offset&&e.allowZ?"Z":t.isValid?t.zone.formatOffset(t.ts,e.format):""},l=function(e,n){return r?nv(e)[t.month-1]:s(n?{month:e}:{month:e,day:"numeric"},"month")},u=function(e,n){return r?nw(e)[t.weekday-1]:s(n?{weekday:e}:{weekday:e,month:"long",day:"numeric"},"weekday")},d=function(n){var r=e.macroTokenToFormatOpts(n);return r?i.formatWithSystemDefault(t,r):n},c=function(e){return r?n_(e)[t.year<0?0:1]:s({era:e},"era")};return nE(e.parseFormat(n),function(e){switch(e){case"S":return i.num(t.millisecond);case"u":case"SSS":return i.num(t.millisecond,3);case"s":return i.num(t.second);case"ss":return i.num(t.second,2);case"uu":return i.num(Math.floor(t.millisecond/10),2);case"uuu":return i.num(Math.floor(t.millisecond/100));case"m":return i.num(t.minute);case"mm":return i.num(t.minute,2);case"h":return i.num(t.hour%12==0?12:t.hour%12);case"hh":return i.num(t.hour%12==0?12:t.hour%12,2);case"H":return i.num(t.hour);case"HH":return i.num(t.hour,2);case"Z":return o({format:"narrow",allowZ:i.opts.allowZ});case"ZZ":return o({format:"short",allowZ:i.opts.allowZ});case"ZZZ":return o({format:"techie",allowZ:i.opts.allowZ});case"ZZZZ":return t.zone.offsetName(t.ts,{format:"short",locale:i.loc.locale});case"ZZZZZ":return t.zone.offsetName(t.ts,{format:"long",locale:i.loc.locale});case"z":return t.zoneName;case"a":return r?nA[t.hour<12?0:1]:s({hour:"numeric",hourCycle:"h12"},"dayperiod");case"d":return a?s({day:"numeric"},"day"):i.num(t.day);case"dd":return a?s({day:"2-digit"},"day"):i.num(t.day,2);case"c":case"E":return i.num(t.weekday);case"ccc":return u("short",!0);case"cccc":return u("long",!0);case"ccccc":return u("narrow",!0);case"EEE":return u("short",!1);case"EEEE":return u("long",!1);case"EEEEE":return u("narrow",!1);case"L":return a?s({month:"numeric",day:"numeric"},"month"):i.num(t.month);case"LL":return a?s({month:"2-digit",day:"numeric"},"month"):i.num(t.month,2);case"LLL":return l("short",!0);case"LLLL":return l("long",!0);case"LLLLL":return l("narrow",!0);case"M":return a?s({month:"numeric"},"month"):i.num(t.month);case"MM":return a?s({month:"2-digit"},"month"):i.num(t.month,2);case"MMM":return l("short",!1);case"MMMM":return l("long",!1);case"MMMMM":return l("narrow",!1);case"y":return a?s({year:"numeric"},"year"):i.num(t.year);case"yy":return a?s({year:"2-digit"},"year"):i.num(t.year.toString().slice(-2),2);case"yyyy":return a?s({year:"numeric"},"year"):i.num(t.year,4);case"yyyyyy":return a?s({year:"numeric"},"year"):i.num(t.year,6);case"G":return c("short");case"GG":return c("long");case"GGGGG":return c("narrow");case"kk":return i.num(t.weekYear.toString().slice(-2),2);case"kkkk":return i.num(t.weekYear,4);case"W":return i.num(t.weekNumber);case"WW":return i.num(t.weekNumber,2);case"n":return i.num(t.localWeekNumber);case"nn":return i.num(t.localWeekNumber,2);case"ii":return i.num(t.localWeekYear.toString().slice(-2),2);case"iiii":return i.num(t.localWeekYear,4);case"o":return i.num(t.ordinal);case"ooo":return i.num(t.ordinal,3);case"q":return i.num(t.quarter);case"qq":return i.num(t.quarter,2);case"X":return i.num(Math.floor(t.ts/1e3));case"x":return i.num(t.ts);default:return d(e)}})},t.formatDurationFromString=function(t,n){var i=this,r="negativeLargestOnly"===this.opts.signMode?-1:1,a=function(e){switch(e[0]){case"S":return"milliseconds";case"s":return"seconds";case"m":return"minutes";case"h":return"hours";case"d":return"days";case"w":return"weeks";case"M":return"months";case"y":return"years";default:return null}},s=e.parseFormat(n),o=s.reduce(function(e,t){var n=t.literal,i=t.val;return n?e:e.concat(i)},[]),l=t.shiftTo.apply(t,o.map(a).filter(function(e){return e})),u={isNegativeDuration:l<0,largestUnit:Object.keys(l.values)[0]};return nE(s,function(e){var t=a(e);if(!t)return e;var n,s=u.isNegativeDuration&&t!==u.largestUnit?r:1;return n="negativeLargestOnly"===i.opts.signMode&&t!==u.largestUnit?"never":"all"===i.opts.signMode?"always":"auto",i.num(l.get(t)*s,e.length,n)})},e}(),nS=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function nB(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return RegExp("^"+t.reduce(function(e,t){return e+t.source},"")+"$")}function nx(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return t.reduce(function(t,n){var i=t[0],r=t[1],a=n(e,t[2]),s=a[0],o=a[1],l=a[2];return[ev({},i,s),o||r,l]},[{},null,1]).slice(0,2)}}function nC(e){if(null==e)return[null,null];for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];for(var r=0;r<n.length;r++){var a=n[r],s=a[0],o=a[1],l=s.exec(e);if(l)return o(l)}return[null,null]}function nO(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e,n){var i,r={};for(i=0;i<t.length;i++)r[t[i]]=t6(e[n+i]);return[r,null,n+i]}}var nM=/(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/,nN=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,n$=RegExp(""+nN.source+("(?:"+nM.source+"?(?:\\[("+nS.source)+")\\])?)?"),nI=RegExp("(?:[Tt]"+n$.source+")?"),nL=nO("weekYear","weekNumber","weekDay"),nV=nO("year","ordinal"),nH=RegExp(nN.source+" ?(?:"+nM.source+"|("+nS.source+"))?"),nz=RegExp("(?: "+nH.source+")?");function nP(e,t,n){var i=e[t];return tJ(i)?n:t6(i)}function nU(e,t){return[{hours:nP(e,t,0),minutes:nP(e,t+1,0),seconds:nP(e,t+2,0),milliseconds:t5(e[t+3])},null,t+4]}function nW(e,t){var n=!e[t]&&!e[t+1],i=no(e[t+1],e[t+2]);return[{},n?null:tp.instance(i),t+3]}function nj(e,t){return[{},e[t]?e9.create(e[t]):null,t+1]}var nR=RegExp("^T?"+nN.source+"$"),nQ=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function nZ(e){var t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],s=e[5],o=e[6],l=e[7],u=e[8],d="-"===t[0],c=l&&"-"===l[0],h=function(e,t){return void 0===t&&(t=!1),void 0!==e&&(t||e&&d)?-e:e};return[{years:h(t8(n)),months:h(t8(i)),weeks:h(t8(r)),days:h(t8(a)),hours:h(t8(s)),minutes:h(t8(o)),seconds:h(t8(l),"-0"===l),milliseconds:h(t5(u),c)}]}var nY={GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function nJ(e,t,n,i,r,a,s){var o={year:2===t.length?na(t6(t)):t6(t),month:nf.indexOf(n)+1,day:t6(i),hour:t6(r),minute:t6(a)};return s&&(o.second=t6(s)),e&&(o.weekday=e.length>3?ny.indexOf(e)+1:ng.indexOf(e)+1),o}var nG=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function nq(e){var t=e[1],n=e[2],i=e[3],r=e[4],a=e[5],s=e[6],o=e[7],l=e[8],u=e[9],d=e[10],c=e[11];return[nJ(t,r,i,n,a,s,o),new tp(l?nY[l]:u?0:no(d,c))]}var nK=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,nX=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,n2=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function n0(e){var t=e[1],n=e[2],i=e[3];return[nJ(t,e[4],i,n,e[5],e[6],e[7]),tp.utcInstance]}function n1(e){var t=e[1],n=e[2],i=e[3],r=e[4],a=e[5],s=e[6];return[nJ(t,e[7],n,i,r,a,s),tp.utcInstance]}var n3=nB(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,nI),n4=nB(/(\d{4})-?W(\d\d)(?:-?(\d))?/,nI),n6=nB(/(\d{4})-?(\d{3})/,nI),n8=nB(n$),n5=nx(function(e,t){return[{year:nP(e,t),month:nP(e,t+1,1),day:nP(e,t+2,1)},null,t+3]},nU,nW,nj),n7=nx(nL,nU,nW,nj),n9=nx(nV,nU,nW,nj),ie=nx(nU,nW,nj),it=nx(nU),ii=nB(/(\d{4})-(\d\d)-(\d\d)/,nz),ir=nB(nH),ia=nx(nU,nW,nj),is="Invalid Duration",io={weeks:{days:7,hours:168,minutes:10080,seconds:604800,milliseconds:6048e5},days:{hours:24,minutes:1440,seconds:86400,milliseconds:864e5},hours:{minutes:60,seconds:3600,milliseconds:36e5},minutes:{seconds:60,milliseconds:6e4},seconds:{milliseconds:1e3}},il=ev({years:{quarters:4,months:12,weeks:52,days:365,hours:8760,minutes:525600,seconds:31536e3,milliseconds:31536e6},quarters:{months:3,weeks:13,days:91,hours:2184,minutes:131040,seconds:7862400,milliseconds:78624e5},months:{weeks:4,days:30,hours:720,minutes:43200,seconds:2592e3,milliseconds:2592e6}},io),iu=ev({years:{quarters:4,months:12,weeks:52.1775,days:365.2425,hours:8765.82,minutes:525949.2,seconds:0x1e18558,milliseconds:31556952e3},quarters:{months:3,weeks:13.044375,days:91.310625,hours:2191.455,minutes:131487.3,seconds:7889238,milliseconds:7889238e3},months:{weeks:30.436875/7,days:30.436875,hours:730.485,minutes:43829.1,seconds:2629746,milliseconds:2629746e3}},io),id=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],ic=id.slice(0).reverse();function ih(e,t,n){return void 0===n&&(n=!1),new ig({values:n?t.values:ev({},e.values,t.values||{}),loc:e.loc.clone(t.loc),conversionAccuracy:t.conversionAccuracy||e.conversionAccuracy,matrix:t.matrix||e.matrix})}function im(e,t){for(var n,i,r=null!=(n=t.milliseconds)?n:0,a=eb(ic.slice(1));!(i=a()).done;){var s=i.value;t[s]&&(r+=t[s]*e[s].milliseconds)}return r}function iv(e,t){var n=0>im(e,t)?-1:1;id.reduceRight(function(i,r){if(tJ(t[r]))return i;if(i){var a=t[i]*n,s=e[r][i],o=Math.floor(a/s);t[r]+=o*n,t[i]-=o*s*n}return r},null),id.reduce(function(n,i){if(tJ(t[i]))return n;if(n){var r=t[n]%1;t[n]-=r,t[i]+=r*e[n][i]}return i},null)}function iy(e){for(var t={},n=0,i=Object.entries(e);n<i.length;n++){var r=i[n],a=r[0],s=r[1];0!==s&&(t[a]=s)}return t}var ig=function(e){function t(e){var t="longterm"===e.conversionAccuracy,n=t?iu:il;e.matrix&&(n=e.matrix),this.values=e.values,this.loc=e.loc||ty.create(),this.conversionAccuracy=t?"longterm":"casual",this.invalid=e.invalid||null,this.matrix=n,this.isLuxonDuration=!0}t.fromMillis=function(e,n){return t.fromObject({milliseconds:e},n)},t.fromObject=function(e,n){if(void 0===n&&(n={}),null==e||"object"!=typeof e)throw new ex("Duration.fromObject: argument expected to be an object, got "+(null===e?"null":typeof e));return new t({values:nu(e,t.normalizeUnit),loc:ty.fromObject(n),conversionAccuracy:n.conversionAccuracy,matrix:n.matrix})},t.fromDurationLike=function(e){if(tG(e))return t.fromMillis(e);if(t.isDuration(e))return e;if("object"==typeof e)return t.fromObject(e);throw new ex("Unknown duration argument "+e+" of type "+typeof e)},t.fromISO=function(e,n){var i=nC(e,[nQ,nZ])[0];return i?t.fromObject(i,n):t.invalid("unparsable",'the input "'+e+"\" can't be parsed as ISO 8601")},t.fromISOTime=function(e,n){var i=nC(e,[nR,it])[0];return i?t.fromObject(i,n):t.invalid("unparsable",'the input "'+e+"\" can't be parsed as ISO 8601")},t.invalid=function(e,n){if(void 0===n&&(n=null),!e)throw new ex("need to specify a reason the Duration is invalid");var i=e instanceof t$?e:new t$(e,n);if(!tN.throwOnInvalid)return new t({invalid:i});throw new eT(i)},t.normalizeUnit=function(e){var t={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[e?e.toLowerCase():e];if(!t)throw new eB(e);return t},t.isDuration=function(e){return e&&e.isLuxonDuration||!1};var n=t.prototype;return n.toFormat=function(e,t){void 0===t&&(t={});var n=ev({},t,{floor:!1!==t.round&&!1!==t.floor});return this.isValid?nT.create(this.loc,n).formatDurationFromString(this,e):is},n.toHuman=function(e){var t=this;if(void 0===e&&(e={}),!this.isValid)return is;var n=!1!==e.showZeros,i=id.map(function(i){var r=t.values[i];return tJ(r)||0===r&&!n?null:t.loc.numberFormatter(ev({style:"unit",unitDisplay:"long"},e,{unit:i.slice(0,-1)})).format(r)}).filter(function(e){return e});return this.loc.listFormatter(ev({type:"conjunction",style:e.listStyle||"narrow"},e)).format(i)},n.toObject=function(){return this.isValid?ev({},this.values):{}},n.toISO=function(){if(!this.isValid)return null;var e="P";return 0!==this.years&&(e+=this.years+"Y"),(0!==this.months||0!==this.quarters)&&(e+=this.months+3*this.quarters+"M"),0!==this.weeks&&(e+=this.weeks+"W"),0!==this.days&&(e+=this.days+"D"),(0!==this.hours||0!==this.minutes||0!==this.seconds||0!==this.milliseconds)&&(e+="T"),0!==this.hours&&(e+=this.hours+"H"),0!==this.minutes&&(e+=this.minutes+"M"),(0!==this.seconds||0!==this.milliseconds)&&(e+=t7(this.seconds+this.milliseconds/1e3,3)+"S"),"P"===e&&(e+="T0S"),e},n.toISOTime=function(e){if(void 0===e&&(e={}),!this.isValid)return null;var t=this.toMillis();return t<0||t>=864e5?null:(e=ev({suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended"},e,{includeOffset:!1}),i8.fromMillis(t,{zone:"UTC"}).toISOTime(e))},n.toJSON=function(){return this.toISO()},n.toString=function(){return this.toISO()},n[e]=function(){return this.isValid?"Duration { values: "+JSON.stringify(this.values)+" }":"Duration { Invalid, reason: "+this.invalidReason+" }"},n.toMillis=function(){return this.isValid?im(this.matrix,this.values):NaN},n.valueOf=function(){return this.toMillis()},n.plus=function(e){if(!this.isValid)return this;for(var n=t.fromDurationLike(e),i={},r=0;r<id.length;r++){var a=id[r];(t0(n.values,a)||t0(this.values,a))&&(i[a]=n.get(a)+this.get(a))}return ih(this,{values:i},!0)},n.minus=function(e){if(!this.isValid)return this;var n=t.fromDurationLike(e);return this.plus(n.negate())},n.mapUnits=function(e){if(!this.isValid)return this;for(var t={},n=0,i=Object.keys(this.values);n<i.length;n++){var r=i[n];t[r]=nl(e(this.values[r],r))}return ih(this,{values:t},!0)},n.get=function(e){return this[t.normalizeUnit(e)]},n.set=function(e){return this.isValid?ih(this,{values:ev({},this.values,nu(e,t.normalizeUnit))}):this},n.reconfigure=function(e){var t=void 0===e?{}:e,n=t.locale,i=t.numberingSystem,r=t.conversionAccuracy,a=t.matrix;return ih(this,{loc:this.loc.clone({locale:n,numberingSystem:i}),matrix:a,conversionAccuracy:r})},n.as=function(e){return this.isValid?this.shiftTo(e).get(e):NaN},n.normalize=function(){if(!this.isValid)return this;var e=this.toObject();return iv(this.matrix,e),ih(this,{values:e},!0)},n.rescale=function(){return this.isValid?ih(this,{values:iy(this.normalize().shiftToAll().toObject())},!0):this},n.shiftTo=function(){for(var e,n=arguments.length,i=Array(n),r=0;r<n;r++)i[r]=arguments[r];if(!this.isValid||0===i.length)return this;i=i.map(function(e){return t.normalizeUnit(e)});for(var a={},s={},o=this.toObject(),l=0;l<id.length;l++){var u=id[l];if(i.indexOf(u)>=0){e=u;var d=0;for(var c in s)d+=this.matrix[c][u]*s[c],s[c]=0;tG(o[u])&&(d+=o[u]);var h=Math.trunc(d);a[u]=h,s[u]=(1e3*d-1e3*h)/1e3}else tG(o[u])&&(s[u]=o[u])}for(var f in s)0!==s[f]&&(a[e]+=f===e?s[f]:s[f]/this.matrix[e][f]);return iv(this.matrix,a),ih(this,{values:a},!0)},n.shiftToAll=function(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this},n.negate=function(){if(!this.isValid)return this;for(var e={},t=0,n=Object.keys(this.values);t<n.length;t++){var i=n[t];e[i]=0===this.values[i]?0:-this.values[i]}return ih(this,{values:e},!0)},n.removeZeros=function(){return this.isValid?ih(this,{values:iy(this.values)},!0):this},n.equals=function(e){if(!this.isValid||!e.isValid||!this.loc.equals(e.loc))return!1;for(var t=0;t<id.length;t++){var n,i,r=id[t];if(n=this.values[r],i=e.values[r],void 0===n||0===n?void 0!==i&&0!==i:n!==i)return!1}return!0},em(t,[{key:"locale",get:function(){return this.isValid?this.loc.locale:null}},{key:"numberingSystem",get:function(){return this.isValid?this.loc.numberingSystem:null}},{key:"years",get:function(){return this.isValid?this.values.years||0:NaN}},{key:"quarters",get:function(){return this.isValid?this.values.quarters||0:NaN}},{key:"months",get:function(){return this.isValid?this.values.months||0:NaN}},{key:"weeks",get:function(){return this.isValid?this.values.weeks||0:NaN}},{key:"days",get:function(){return this.isValid?this.values.days||0:NaN}},{key:"hours",get:function(){return this.isValid?this.values.hours||0:NaN}},{key:"minutes",get:function(){return this.isValid?this.values.minutes||0:NaN}},{key:"seconds",get:function(){return this.isValid?this.values.seconds||0:NaN}},{key:"milliseconds",get:function(){return this.isValid?this.values.milliseconds||0:NaN}},{key:"isValid",get:function(){return null===this.invalid}},{key:"invalidReason",get:function(){return this.invalid?this.invalid.reason:null}},{key:"invalidExplanation",get:function(){return this.invalid?this.invalid.explanation:null}}]),t}(Symbol.for("nodejs.util.inspect.custom")),ip="Invalid Interval",iw=function(e){function t(e){this.s=e.start,this.e=e.end,this.invalid=e.invalid||null,this.isLuxonInterval=!0}t.invalid=function(e,n){if(void 0===n&&(n=null),!e)throw new ex("need to specify a reason the Interval is invalid");var i=e instanceof t$?e:new t$(e,n);if(!tN.throwOnInvalid)return new t({invalid:i});throw new eD(i)},t.fromDateTimes=function(e,n){var i,r,a=i5(e),s=i5(n),o=(i=a,r=s,i&&i.isValid?r&&r.isValid?r<i?iw.invalid("end before start","The end of an interval must be after its start, but you had start="+i.toISO()+" and end="+r.toISO()):null:iw.invalid("missing or invalid end"):iw.invalid("missing or invalid start"));return null==o?new t({start:a,end:s}):o},t.after=function(e,n){var i=ig.fromDurationLike(n),r=i5(e);return t.fromDateTimes(r,r.plus(i))},t.before=function(e,n){var i=ig.fromDurationLike(n),r=i5(e);return t.fromDateTimes(r.minus(i),r)},t.fromISO=function(e,n){var i=(e||"").split("/",2),r=i[0],a=i[1];if(r&&a){try{o=(s=i8.fromISO(r,n)).isValid}catch(e){o=!1}try{u=(l=i8.fromISO(a,n)).isValid}catch(e){u=!1}if(o&&u)return t.fromDateTimes(s,l);if(o){var s,o,l,u,d=ig.fromISO(a,n);if(d.isValid)return t.after(s,d)}else if(u){var c=ig.fromISO(r,n);if(c.isValid)return t.before(l,c)}}return t.invalid("unparsable",'the input "'+e+"\" can't be parsed as ISO 8601")},t.isInterval=function(e){return e&&e.isLuxonInterval||!1};var n=t.prototype;return n.length=function(e){return void 0===e&&(e="milliseconds"),this.isValid?this.toDuration.apply(this,[e]).get(e):NaN},n.count=function(e,t){if(void 0===e&&(e="milliseconds"),!this.isValid)return NaN;var n,i=this.start.startOf(e,t);return Math.floor((n=(n=null!=t&&t.useLocaleWeeks?this.end.reconfigure({locale:i.locale}):this.end).startOf(e,t)).diff(i,e).get(e))+(n.valueOf()!==this.end.valueOf())},n.hasSame=function(e){return!!this.isValid&&(this.isEmpty()||this.e.minus(1).hasSame(this.s,e))},n.isEmpty=function(){return this.s.valueOf()===this.e.valueOf()},n.isAfter=function(e){return!!this.isValid&&this.s>e},n.isBefore=function(e){return!!this.isValid&&this.e<=e},n.contains=function(e){return!!this.isValid&&this.s<=e&&this.e>e},n.set=function(e){var n=void 0===e?{}:e,i=n.start,r=n.end;return this.isValid?t.fromDateTimes(i||this.s,r||this.e):this},n.splitAt=function(){var e=this;if(!this.isValid)return[];for(var n=arguments.length,i=Array(n),r=0;r<n;r++)i[r]=arguments[r];for(var a=i.map(i5).filter(function(t){return e.contains(t)}).sort(function(e,t){return e.toMillis()-t.toMillis()}),s=[],o=this.s,l=0;o<this.e;){var u=a[l]||this.e,d=+u>+this.e?this.e:u;s.push(t.fromDateTimes(o,d)),o=d,l+=1}return s},n.splitBy=function(e){var n=ig.fromDurationLike(e);if(!this.isValid||!n.isValid||0===n.as("milliseconds"))return[];for(var i,r=this.s,a=1,s=[];r<this.e;){var o=this.start.plus(n.mapUnits(function(e){return e*a}));i=+o>+this.e?this.e:o,s.push(t.fromDateTimes(r,i)),r=i,a+=1}return s},n.divideEqually=function(e){return this.isValid?this.splitBy(this.length()/e).slice(0,e):[]},n.overlaps=function(e){return this.e>e.s&&this.s<e.e},n.abutsStart=function(e){return!!this.isValid&&+this.e==+e.s},n.abutsEnd=function(e){return!!this.isValid&&+e.e==+this.s},n.engulfs=function(e){return!!this.isValid&&this.s<=e.s&&this.e>=e.e},n.equals=function(e){return!!this.isValid&&!!e.isValid&&this.s.equals(e.s)&&this.e.equals(e.e)},n.intersection=function(e){if(!this.isValid)return this;var n=this.s>e.s?this.s:e.s,i=this.e<e.e?this.e:e.e;return n>=i?null:t.fromDateTimes(n,i)},n.union=function(e){if(!this.isValid)return this;var n=this.s<e.s?this.s:e.s,i=this.e>e.e?this.e:e.e;return t.fromDateTimes(n,i)},t.merge=function(e){var t=e.sort(function(e,t){return e.s-t.s}).reduce(function(e,t){var n=e[0],i=e[1];return i?i.overlaps(t)||i.abutsStart(t)?[n,i.union(t)]:[n.concat([i]),t]:[n,t]},[[],null]),n=t[0],i=t[1];return i&&n.push(i),n},t.xor=function(e){for(var n,i,r=null,a=0,s=[],o=e.map(function(e){return[{time:e.s,type:"s"},{time:e.e,type:"e"}]}),l=(n=Array.prototype).concat.apply(n,o).sort(function(e,t){return e.time-t.time}),u=eb(l);!(i=u()).done;){var d=i.value;1===(a+="s"===d.type?1:-1)?r=d.time:(r&&+r!=+d.time&&s.push(t.fromDateTimes(r,d.time)),r=null)}return t.merge(s)},n.difference=function(){for(var e=this,n=arguments.length,i=Array(n),r=0;r<n;r++)i[r]=arguments[r];return t.xor([this].concat(i)).map(function(t){return e.intersection(t)}).filter(function(e){return e&&!e.isEmpty()})},n.toString=function(){return this.isValid?"["+this.s.toISO()+" – "+this.e.toISO()+")":ip},n[e]=function(){return this.isValid?"Interval { start: "+this.s.toISO()+", end: "+this.e.toISO()+" }":"Interval { Invalid, reason: "+this.invalidReason+" }"},n.toLocaleString=function(e,t){return void 0===e&&(e=e$),void 0===t&&(t={}),this.isValid?nT.create(this.s.loc.clone(t),e).formatInterval(this):ip},n.toISO=function(e){return this.isValid?this.s.toISO(e)+"/"+this.e.toISO(e):ip},n.toISODate=function(){return this.isValid?this.s.toISODate()+"/"+this.e.toISODate():ip},n.toISOTime=function(e){return this.isValid?this.s.toISOTime(e)+"/"+this.e.toISOTime(e):ip},n.toFormat=function(e,t){var n=(void 0===t?{}:t).separator;return this.isValid?""+this.s.toFormat(e)+(void 0===n?" – ":n)+this.e.toFormat(e):ip},n.toDuration=function(e,t){return this.isValid?this.e.diff(this.s,e,t):ig.invalid(this.invalidReason)},n.mapEndpoints=function(e){return t.fromDateTimes(e(this.s),e(this.e))},em(t,[{key:"start",get:function(){return this.isValid?this.s:null}},{key:"end",get:function(){return this.isValid?this.e:null}},{key:"lastDateTime",get:function(){return this.isValid&&this.e?this.e.minus(1):null}},{key:"isValid",get:function(){return null===this.invalidReason}},{key:"invalidReason",get:function(){return this.invalid?this.invalid.reason:null}},{key:"invalidExplanation",get:function(){return this.invalid?this.invalid.explanation:null}}]),t}(Symbol.for("nodejs.util.inspect.custom")),iA=function(){function e(){}return e.hasDST=function(e){void 0===e&&(e=tN.defaultZone);var t=i8.now().setZone(e).set({month:12});return!e.isUniversal&&t.offset!==t.set({month:6}).offset},e.isValidIANAZone=function(e){return e9.isValidZone(e)},e.normalizeZone=function(e){return tA(e,tN.defaultZone)},e.getStartOfWeek=function(e){var t=void 0===e?{}:e,n=t.locale,i=t.locObj;return((void 0===i?null:i)||ty.create(void 0===n?null:n)).getStartOfWeek()},e.getMinimumDaysInFirstWeek=function(e){var t=void 0===e?{}:e,n=t.locale,i=t.locObj;return((void 0===i?null:i)||ty.create(void 0===n?null:n)).getMinDaysInFirstWeek()},e.getWeekendWeekdays=function(e){var t=void 0===e?{}:e,n=t.locale,i=t.locObj;return((void 0===i?null:i)||ty.create(void 0===n?null:n)).getWeekendDays().slice()},e.months=function(e,t){void 0===e&&(e="long");var n=void 0===t?{}:t,i=n.locale,r=n.numberingSystem,a=n.locObj,s=n.outputCalendar;return((void 0===a?null:a)||ty.create(void 0===i?null:i,void 0===r?null:r,void 0===s?"gregory":s)).months(e)},e.monthsFormat=function(e,t){void 0===e&&(e="long");var n=void 0===t?{}:t,i=n.locale,r=n.numberingSystem,a=n.locObj,s=n.outputCalendar;return((void 0===a?null:a)||ty.create(void 0===i?null:i,void 0===r?null:r,void 0===s?"gregory":s)).months(e,!0)},e.weekdays=function(e,t){void 0===e&&(e="long");var n=void 0===t?{}:t,i=n.locale,r=n.numberingSystem,a=n.locObj;return((void 0===a?null:a)||ty.create(void 0===i?null:i,void 0===r?null:r,null)).weekdays(e)},e.weekdaysFormat=function(e,t){void 0===e&&(e="long");var n=void 0===t?{}:t,i=n.locale,r=n.numberingSystem,a=n.locObj;return((void 0===a?null:a)||ty.create(void 0===i?null:i,void 0===r?null:r,null)).weekdays(e,!0)},e.meridiems=function(e){var t=(void 0===e?{}:e).locale;return ty.create(void 0===t?null:t).meridiems()},e.eras=function(e,t){void 0===e&&(e="short");var n=(void 0===t?{}:t).locale;return ty.create(void 0===n?null:n,null,"gregory").eras(e)},e.features=function(){return{relative:tK(),localeWeek:tX()}},e}();function iF(e,t){var n=function(e){return e.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf()},i=n(t)-n(e);return Math.floor(ig.fromMillis(i).as("days"))}function ik(e,t){return void 0===t&&(t=function(e){return e}),{regex:e,deser:function(e){var n=e[0];return t(function(e){var t=parseInt(e,10);if(!isNaN(t))return t;t="";for(var n=0;n<e.length;n++){var i=e.charCodeAt(n);if(-1!==e[n].search(tF.hanidec))t+=tb.indexOf(e[n]);else for(var r in tk){var a=tk[r],s=a[0],o=a[1];i>=s&&i<=o&&(t+=i-s)}}return parseInt(t,10)}(n))}}}var ib="[ "+String.fromCharCode(160)+"]",i_=RegExp(ib,"g");function iE(e){return e.replace(/\./g,"\\.?").replace(i_,ib)}function iD(e){return e.replace(/\./g,"").replace(i_," ").toLowerCase()}function iT(e,t){return null===e?null:{regex:RegExp(e.map(iE).join("|")),deser:function(n){var i=n[0];return e.findIndex(function(e){return iD(i)===iD(e)})+t}}}function iS(e,t){return{regex:e,deser:function(e){return no(e[1],e[2])},groups:t}}function iB(e){return{regex:e,deser:function(e){return e[0]}}}var ix={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}},iC=null;function iO(e,t){var n;return(n=Array.prototype).concat.apply(n,e.map(function(e){if(e.literal)return e;var n=i$(nT.macroTokenToFormatOpts(e.val),t);return null==n||n.includes(void 0)?e:n}))}var iM=function(){function e(e,t){if(this.locale=e,this.format=t,this.tokens=iO(nT.parseFormat(t),e),this.units=this.tokens.map(function(t){var n,i,r,a,s,o,l,u,d,c,h,f,m;return n=tE(e),i=tE(e,"{2}"),r=tE(e,"{3}"),a=tE(e,"{4}"),s=tE(e,"{6}"),o=tE(e,"{1,2}"),l=tE(e,"{1,3}"),u=tE(e,"{1,6}"),d=tE(e,"{1,9}"),c=tE(e,"{2,4}"),h=tE(e,"{4,6}"),f=function(e){return{regex:RegExp(e.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")),deser:function(e){return e[0]},literal:!0}},(m=function(m){if(t.literal)return f(m);switch(m.val){case"G":return iT(e.eras("short"),0);case"GG":return iT(e.eras("long"),0);case"y":return ik(u);case"yy":case"kk":return ik(c,na);case"yyyy":case"kkkk":return ik(a);case"yyyyy":return ik(h);case"yyyyyy":return ik(s);case"M":case"L":case"d":case"H":case"h":case"m":case"q":case"s":case"W":return ik(o);case"MM":case"LL":case"dd":case"HH":case"hh":case"mm":case"qq":case"ss":case"WW":return ik(i);case"MMM":return iT(e.months("short",!0),1);case"MMMM":return iT(e.months("long",!0),1);case"LLL":return iT(e.months("short",!1),1);case"LLLL":return iT(e.months("long",!1),1);case"o":case"S":return ik(l);case"ooo":case"SSS":return ik(r);case"u":return iB(d);case"uu":return iB(o);case"uuu":case"E":case"c":return ik(n);case"a":return iT(e.meridiems(),0);case"EEE":return iT(e.weekdays("short",!1),1);case"EEEE":return iT(e.weekdays("long",!1),1);case"ccc":return iT(e.weekdays("short",!0),1);case"cccc":return iT(e.weekdays("long",!0),1);case"Z":case"ZZ":return iS(RegExp("([+-]"+o.source+")(?::("+i.source+"))?"),2);case"ZZZ":return iS(RegExp("([+-]"+o.source+")("+i.source+")?"),2);case"z":return iB(/[a-z_+-/]{1,256}?/i);case" ":return iB(/[^\S\n\r]/);default:return f(m)}}(t)||{invalidReason:"missing Intl.DateTimeFormat.formatToParts support"}).token=t,m}),this.disqualifyingUnit=this.units.find(function(e){return e.invalidReason}),!this.disqualifyingUnit){var n,i=["^"+(n=this.units).map(function(e){return e.regex}).reduce(function(e,t){return e+"("+t.source+")"},"")+"$",n],r=i[0],a=i[1];this.regex=RegExp(r,"i"),this.handlers=a}}return e.prototype.explainFromTokens=function(e){if(!this.isValid)return{input:e,tokens:this.tokens,invalidReason:this.invalidReason};var t,n,i,r=function(e,t,n){var i=e.match(t);if(!i)return[i,{}];var r={},a=1;for(var s in n)if(t0(n,s)){var o=n[s],l=o.groups?o.groups+1:1;!o.literal&&o.token&&(r[o.token.val[0]]=o.deser(i.slice(a,a+l))),a+=l}return[i,r]}(e,this.regex,this.handlers),a=r[0],s=r[1],o=s?(n=function(e){switch(e){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}},i=null,tJ(s.z)||(i=e9.create(s.z)),tJ(s.Z)||(i||(i=new tp(s.Z)),t=s.Z),tJ(s.q)||(s.M=(s.q-1)*3+1),tJ(s.h)||(s.h<12&&1===s.a?s.h+=12:12===s.h&&0===s.a&&(s.h=0)),0===s.G&&s.y&&(s.y=-s.y),tJ(s.u)||(s.S=t5(s.u)),[Object.keys(s).reduce(function(e,t){var i=n(t);return i&&(e[i]=s[t]),e},{}),i,t]):[null,null,void 0],l=o[0],u=o[1],d=o[2];if(t0(s,"a")&&t0(s,"H"))throw new eS("Can't include meridiem when specifying 24-hour format");return{input:e,tokens:this.tokens,regex:this.regex,rawMatches:a,matches:s,result:l,zone:u,specificOffset:d}},em(e,[{key:"isValid",get:function(){return!this.disqualifyingUnit}},{key:"invalidReason",get:function(){return this.disqualifyingUnit?this.disqualifyingUnit.invalidReason:null}}]),e}();function iN(e,t,n){return new iM(e,n).explainFromTokens(t)}function i$(e,t){if(!e)return null;var n=nT.create(t,e).dtFormatter((iC||(iC=i8.fromMillis(0x16a2e5618e3)),iC)),i=n.formatToParts(),r=n.resolvedOptions();return i.map(function(t){return function(e,t,n){var i=e.type,r=e.value;if("literal"===i){var a=/^\s+$/.test(r);return{literal:!a,val:a?" ":r}}var s=t[i],o=i;"hour"===i&&(o=null!=t.hour12?t.hour12?"hour12":"hour24":null!=t.hourCycle?"h11"===t.hourCycle||"h12"===t.hourCycle?"hour12":"hour24":n.hour12?"hour12":"hour24");var l=ix[o];if("object"==typeof l&&(l=l[s]),l)return{literal:!1,val:l}}(t,e,r)})}var iI="Invalid DateTime";function iL(e){return new t$("unsupported zone",'the zone "'+e.name+'" is not supported')}function iV(e){return null===e.weekData&&(e.weekData=tU(e.c)),e.weekData}function iH(e){return null===e.localWeekData&&(e.localWeekData=tU(e.c,e.loc.getMinDaysInFirstWeek(),e.loc.getStartOfWeek())),e.localWeekData}function iz(e,t){var n={ts:e.ts,zone:e.zone,c:e.c,o:e.o,loc:e.loc,invalid:e.invalid};return new i8(ev({},n,t,{old:n}))}function iP(e,t,n){var i=e-6e4*t,r=n.offset(i);if(t===r)return[i,t];i-=(r-t)*6e4;var a=n.offset(i);return r===a?[i,r]:[e-6e4*Math.min(r,a),Math.max(r,a)]}function iU(e,t){var n=new Date(e+=6e4*t);return{year:n.getUTCFullYear(),month:n.getUTCMonth()+1,day:n.getUTCDate(),hour:n.getUTCHours(),minute:n.getUTCMinutes(),second:n.getUTCSeconds(),millisecond:n.getUTCMilliseconds()}}function iW(e,t){var n=e.o,i=e.c.year+Math.trunc(t.years),r=e.c.month+Math.trunc(t.months)+3*Math.trunc(t.quarters),a=ev({},e.c,{year:i,month:r,day:Math.min(e.c.day,nt(i,r))+Math.trunc(t.days)+7*Math.trunc(t.weeks)}),s=ig.fromObject({years:t.years-Math.trunc(t.years),quarters:t.quarters-Math.trunc(t.quarters),months:t.months-Math.trunc(t.months),weeks:t.weeks-Math.trunc(t.weeks),days:t.days-Math.trunc(t.days),hours:t.hours,minutes:t.minutes,seconds:t.seconds,milliseconds:t.milliseconds}).as("milliseconds"),o=iP(nn(a),n,e.zone),l=o[0],u=o[1];return 0!==s&&(l+=s,u=e.zone.offset(l)),{ts:l,o:u}}function ij(e,t,n,i,r,a){var s=n.setZone,o=n.zone;if((!e||0===Object.keys(e).length)&&!t)return i8.invalid(new t$("unparsable",'the input "'+r+"\" can't be parsed as "+i));var l=i8.fromObject(e,ev({},n,{zone:t||o,specificOffset:a}));return s?l:l.setZone(o)}function iR(e,t,n){return void 0===n&&(n=!0),e.isValid?nT.create(ty.create("en-US"),{allowZ:n,forceSimple:!0}).formatDateTimeFromString(e,t):null}function iQ(e,t,n){var i=e.c.year>9999||e.c.year<0,r="";if(i&&e.c.year>=0&&(r+="+"),r+=t4(e.c.year,i?6:4),"year"===n)return r;if(t){if(r+="-",r+=t4(e.c.month),"month"===n)return r;r+="-"}else if(r+=t4(e.c.month),"month"===n)return r;return r+t4(e.c.day)}function iZ(e,t,n,i,r,a,s){var o=!n||0!==e.c.millisecond||0!==e.c.second,l="";switch(s){case"day":case"month":case"year":break;default:if(l+=t4(e.c.hour),"hour"===s)break;if(t){if(l+=":",l+=t4(e.c.minute),"minute"===s)break;o&&(l+=":",l+=t4(e.c.second))}else{if(l+=t4(e.c.minute),"minute"===s)break;o&&(l+=t4(e.c.second))}if("second"===s)break;o&&(!i||0!==e.c.millisecond)&&(l+=".",l+=t4(e.c.millisecond,3))}return r&&(e.isOffsetFixed&&0===e.offset&&!a?l+="Z":e.o<0?(l+="-",l+=t4(Math.trunc(-e.o/60)),l+=":",l+=t4(Math.trunc(-e.o%60))):(l+="+",l+=t4(Math.trunc(e.o/60)),l+=":",l+=t4(Math.trunc(e.o%60)))),a&&(l+="["+e.zone.ianaName+"]"),l}var iY={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},iJ={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},iG={ordinal:1,hour:0,minute:0,second:0,millisecond:0},iq=["year","month","day","hour","minute","second","millisecond"],iK=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],iX=["year","ordinal","hour","minute","second","millisecond"];function i2(e){var t={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[e.toLowerCase()];if(!t)throw new eB(e);return t}function i0(e){switch(e.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return i2(e)}}function i1(e,t){var n,i,r=tA(t.zone,tN.defaultZone);if(!r.isValid)return i8.invalid(iL(r));var a=ty.fromObject(t);if(tJ(e.year))n=tN.now();else{for(var s=0;s<iq.length;s++){var o=iq[s];tJ(e[o])&&(e[o]=iY[o])}var l=tZ(e)||tY(e);if(l)return i8.invalid(l);var u=function(e){if(void 0===ec&&(ec=tN.now()),"iana"!==e.type)return e.offset(ec);var t=e.name,n=i6.get(t);return void 0===n&&(n=e.offset(ec),i6.set(t,n)),n}(r),d=iP(nn(e),u,r);n=d[0],i=d[1]}return new i8({ts:n,zone:r,loc:a,o:i})}function i3(e,t,n){var i=!!tJ(n.round)||n.round,r=tJ(n.rounding)?"trunc":n.rounding,a=function(e,a){return e=t7(e,i||n.calendary?0:2,n.calendary?"round":r),t.loc.clone(n).relFormatter(n).format(e,a)},s=function(i){return n.calendary?t.hasSame(e,i)?0:t.startOf(i).diff(e.startOf(i),i).get(i):t.diff(e,i).get(i)};if(n.unit)return a(s(n.unit),n.unit);for(var o,l=eb(n.units);!(o=l()).done;){var u=o.value,d=s(u);if(Math.abs(d)>=1)return a(d,u)}return a(e>t?-0:0,n.units[n.units.length-1])}function i4(e){var t,n={};return e.length>0&&"object"==typeof e[e.length-1]?(n=e[e.length-1],t=Array.from(e).slice(0,e.length-1)):t=Array.from(e),[n,t]}var i6=new Map,i8=function(e){function t(e){var t=e.zone||tN.defaultZone,n=e.invalid||(Number.isNaN(e.ts)?new t$("invalid input"):null)||(t.isValid?null:iL(t));this.ts=tJ(e.ts)?tN.now():e.ts;var i=null,r=null;if(!n)if(e.old&&e.old.ts===this.ts&&e.old.zone.equals(t)){var a=[e.old.c,e.old.o];i=a[0],r=a[1]}else{var s=tG(e.o)&&!e.old?e.o:t.offset(this.ts);i=(n=Number.isNaN((i=iU(this.ts,s)).year)?new t$("invalid input"):null)?null:i,r=n?null:s}this._zone=t,this.loc=e.loc||ty.create(),this.invalid=n,this.weekData=null,this.localWeekData=null,this.c=i,this.o=r,this.isLuxonDateTime=!0}t.now=function(){return new t({})},t.local=function(){var e=i4(arguments),t=e[0],n=e[1];return i1({year:n[0],month:n[1],day:n[2],hour:n[3],minute:n[4],second:n[5],millisecond:n[6]},t)},t.utc=function(){var e=i4(arguments),t=e[0],n=e[1],i=n[0],r=n[1],a=n[2],s=n[3],o=n[4],l=n[5],u=n[6];return t.zone=tp.utcInstance,i1({year:i,month:r,day:a,hour:s,minute:o,second:l,millisecond:u},t)},t.fromJSDate=function(e,n){void 0===n&&(n={});var i="[object Date]"===Object.prototype.toString.call(e)?e.valueOf():NaN;if(Number.isNaN(i))return t.invalid("invalid input");var r=tA(n.zone,tN.defaultZone);return r.isValid?new t({ts:i,zone:r,loc:ty.fromObject(n)}):t.invalid(iL(r))},t.fromMillis=function(e,n){if(void 0===n&&(n={}),tG(e))if(e<-864e13||e>864e13)return t.invalid("Timestamp out of range");else return new t({ts:e,zone:tA(n.zone,tN.defaultZone),loc:ty.fromObject(n)});throw new ex("fromMillis requires a numerical input, but received a "+typeof e+" with value "+e)},t.fromSeconds=function(e,n){if(void 0===n&&(n={}),tG(e))return new t({ts:1e3*e,zone:tA(n.zone,tN.defaultZone),loc:ty.fromObject(n)});throw new ex("fromSeconds requires a numerical input")},t.fromObject=function(e,n){void 0===n&&(n={}),e=e||{};var i,r,a,s,o,l,u,d,c,h=tA(n.zone,tN.defaultZone);if(!h.isValid)return t.invalid(iL(h));var f=ty.fromObject(n),m=nu(e,i0),v=tQ(m,f),y=v.minDaysInFirstWeek,g=v.startOfWeek,p=tN.now(),w=tJ(n.specificOffset)?h.offset(p):n.specificOffset,A=!tJ(m.ordinal),F=!tJ(m.year),k=!tJ(m.month)||!tJ(m.day),b=F||k,_=m.weekYear||m.weekNumber;if((b||A)&&_)throw new eS("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(k&&A)throw new eS("Can't mix ordinal dates with month/day");var E,D,T=_||m.weekday&&!b,S=iU(p,w);T?(E=iK,D=iJ,S=tU(S,y,g)):A?(E=iX,D=iG,S=tj(S)):(E=iq,D=iY);for(var B,x=!1,C=eb(E);!(B=C()).done;){var O=B.value;tJ(m[O])?x?m[O]=D[O]:m[O]=S[O]:x=!0}var M=(T?(i=m,void 0===(r=y)&&(r=4),void 0===(a=g)&&(a=1),s=tq(i.weekYear),o=t3(i.weekNumber,1,nr(i.weekYear,r,a)),l=t3(i.weekday,1,7),s?o?!l&&tV("weekday",i.weekday):tV("week",i.weekNumber):tV("weekYear",i.weekYear)):A?(u=tq(m.year),d=t3(m.ordinal,1,ne(m.year)),u?!d&&tV("ordinal",m.ordinal):tV("year",m.year)):tZ(m))||tY(m);if(M)return t.invalid(M);var N=(c=T?tW(m,y,g):A?tR(m):m,iP(nn(c),w,h)),$=new t({ts:N[0],zone:h,o:N[1],loc:f});return m.weekday&&b&&e.weekday!==$.weekday?t.invalid("mismatched weekday","you can't specify both a weekday of "+m.weekday+" and a date of "+$.toISO()):$.isValid?$:t.invalid($.invalid)},t.fromISO=function(e,t){void 0===t&&(t={});var n=nC(e,[n3,n5],[n4,n7],[n6,n9],[n8,ie]);return ij(n[0],n[1],t,"ISO 8601",e)},t.fromRFC2822=function(e,t){void 0===t&&(t={});var n=nC(e.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim(),[nG,nq]);return ij(n[0],n[1],t,"RFC 2822",e)},t.fromHTTP=function(e,t){void 0===t&&(t={});var n=nC(e,[nK,n0],[nX,n0],[n2,n1]);return ij(n[0],n[1],t,"HTTP",t)},t.fromFormat=function(e,n,i){if(void 0===i&&(i={}),tJ(e)||tJ(n))throw new ex("fromFormat requires an input string and a format");var r,a=i,s=a.locale,o=a.numberingSystem,l=[(r=iN(ty.fromOpts({locale:void 0===s?null:s,numberingSystem:void 0===o?null:o,defaultToEN:!0}),e,n)).result,r.zone,r.specificOffset,r.invalidReason],u=l[0],d=l[1],c=l[2],h=l[3];return h?t.invalid(h):ij(u,d,i,"format "+n,e,c)},t.fromString=function(e,n,i){return void 0===i&&(i={}),t.fromFormat(e,n,i)},t.fromSQL=function(e,t){void 0===t&&(t={});var n=nC(e,[ii,n5],[ir,ia]);return ij(n[0],n[1],t,"SQL",e)},t.invalid=function(e,n){if(void 0===n&&(n=null),!e)throw new ex("need to specify a reason the DateTime is invalid");var i=e instanceof t$?e:new t$(e,n);if(!tN.throwOnInvalid)return new t({invalid:i});throw new eE(i)},t.isDateTime=function(e){return e&&e.isLuxonDateTime||!1},t.parseFormatForOpts=function(e,t){void 0===t&&(t={});var n=i$(e,ty.fromObject(t));return n?n.map(function(e){return e?e.val:null}).join(""):null},t.expandFormat=function(e,t){return void 0===t&&(t={}),iO(nT.parseFormat(e),ty.fromObject(t)).map(function(e){return e.val}).join("")},t.resetCache=function(){ec=void 0,i6.clear()};var n=t.prototype;return n.get=function(e){return this[e]},n.getPossibleOffsets=function(){if(!this.isValid||this.isOffsetFixed)return[this];var e=nn(this.c),t=this.zone.offset(e-864e5),n=this.zone.offset(e+864e5),i=this.zone.offset(e-6e4*t),r=this.zone.offset(e-6e4*n);if(i===r)return[this];var a=e-6e4*i,s=e-6e4*r,o=iU(a,i),l=iU(s,r);return o.hour===l.hour&&o.minute===l.minute&&o.second===l.second&&o.millisecond===l.millisecond?[iz(this,{ts:a}),iz(this,{ts:s})]:[this]},n.resolvedLocaleOptions=function(e){void 0===e&&(e={});var t=nT.create(this.loc.clone(e),e).resolvedOptions(this);return{locale:t.locale,numberingSystem:t.numberingSystem,outputCalendar:t.calendar}},n.toUTC=function(e,t){return void 0===e&&(e=0),void 0===t&&(t={}),this.setZone(tp.instance(e),t)},n.toLocal=function(){return this.setZone(tN.defaultZone)},n.setZone=function(e,n){var i=void 0===n?{}:n,r=i.keepLocalTime,a=i.keepCalendarTime;if((e=tA(e,tN.defaultZone)).equals(this.zone))return this;if(!e.isValid)return t.invalid(iL(e));var s=this.ts;if(void 0!==r&&r||void 0!==a&&a){var o,l,u=e.offset(this.ts);s=(o=this.toObject(),l=e,iP(nn(o),u,l))[0]}return iz(this,{ts:s,zone:e})},n.reconfigure=function(e){var t=void 0===e?{}:e,n=t.locale,i=t.numberingSystem,r=t.outputCalendar;return iz(this,{loc:this.loc.clone({locale:n,numberingSystem:i,outputCalendar:r})})},n.setLocale=function(e){return this.reconfigure({locale:e})},n.set=function(e){if(!this.isValid)return this;var t,n,i,r,a=nu(e,i0),s=tQ(a,this.loc),o=s.minDaysInFirstWeek,l=s.startOfWeek,u=!tJ(a.weekYear)||!tJ(a.weekNumber)||!tJ(a.weekday),d=!tJ(a.ordinal),c=!tJ(a.year),h=!tJ(a.month)||!tJ(a.day),f=a.weekYear||a.weekNumber;if((c||h||d)&&f)throw new eS("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(h&&d)throw new eS("Can't mix ordinal dates with month/day");u?r=tW(ev({},tU(this.c,o,l),a),o,l):tJ(a.ordinal)?(r=ev({},this.toObject(),a),tJ(a.day)&&(r.day=Math.min(nt(r.year,r.month),r.day))):r=tR(ev({},tj(this.c),a));var m=(t=r,n=this.o,i=this.zone,iP(nn(t),n,i));return iz(this,{ts:m[0],o:m[1]})},n.plus=function(e){return this.isValid?iz(this,iW(this,ig.fromDurationLike(e))):this},n.minus=function(e){return this.isValid?iz(this,iW(this,ig.fromDurationLike(e).negate())):this},n.startOf=function(e,t){var n=(void 0===t?{}:t).useLocaleWeeks;if(!this.isValid)return this;var i={},r=ig.normalizeUnit(e);switch(r){case"years":i.month=1;case"quarters":case"months":i.day=1;case"weeks":case"days":i.hour=0;case"hours":i.minute=0;case"minutes":i.second=0;case"seconds":i.millisecond=0}if("weeks"===r)if(void 0!==n&&n){var a=this.loc.getStartOfWeek();this.weekday<a&&(i.weekNumber=this.weekNumber-1),i.weekday=a}else i.weekday=1;return"quarters"===r&&(i.month=(Math.ceil(this.month/3)-1)*3+1),this.set(i)},n.endOf=function(e,t){var n;return this.isValid?this.plus(((n={})[e]=1,n)).startOf(e,t).minus(1):this},n.toFormat=function(e,t){return void 0===t&&(t={}),this.isValid?nT.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this,e):iI},n.toLocaleString=function(e,t){return void 0===e&&(e=e$),void 0===t&&(t={}),this.isValid?nT.create(this.loc.clone(t),e).formatDateTime(this):iI},n.toLocaleParts=function(e){return void 0===e&&(e={}),this.isValid?nT.create(this.loc.clone(e),e).formatDateTimeParts(this):[]},n.toISO=function(e){var t=void 0===e?{}:e,n=t.format,i=t.suppressSeconds,r=t.suppressMilliseconds,a=t.includeOffset,s=t.extendedZone,o=t.precision,l=void 0===o?"milliseconds":o;if(!this.isValid)return null;l=i2(l);var u="extended"===(void 0===n?"extended":n),d=iQ(this,u,l);return iq.indexOf(l)>=3&&(d+="T"),d+=iZ(this,u,void 0!==i&&i,void 0!==r&&r,void 0===a||a,void 0!==s&&s,l)},n.toISODate=function(e){var t=void 0===e?{}:e,n=t.format,i=t.precision;return this.isValid?iQ(this,"extended"===(void 0===n?"extended":n),i2(void 0===i?"day":i)):null},n.toISOWeekDate=function(){return iR(this,"kkkk-'W'WW-c")},n.toISOTime=function(e){var t=void 0===e?{}:e,n=t.suppressMilliseconds,i=t.suppressSeconds,r=t.includeOffset,a=t.includePrefix,s=t.extendedZone,o=t.format,l=t.precision,u=void 0===l?"milliseconds":l;return this.isValid?(u=i2(u),(void 0!==a&&a&&iq.indexOf(u)>=3?"T":"")+iZ(this,"extended"===(void 0===o?"extended":o),void 0!==i&&i,void 0!==n&&n,void 0===r||r,void 0!==s&&s,u)):null},n.toRFC2822=function(){return iR(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)},n.toHTTP=function(){return iR(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")},n.toSQLDate=function(){return this.isValid?iQ(this,!0):null},n.toSQLTime=function(e){var t=void 0===e?{}:e,n=t.includeOffset,i=void 0===n||n,r=t.includeZone,a=void 0!==r&&r,s=t.includeOffsetSpace,o="HH:mm:ss.SSS";return(a||i)&&((void 0===s||s)&&(o+=" "),a?o+="z":i&&(o+="ZZ")),iR(this,o,!0)},n.toSQL=function(e){return(void 0===e&&(e={}),this.isValid)?this.toSQLDate()+" "+this.toSQLTime(e):null},n.toString=function(){return this.isValid?this.toISO():iI},n[e]=function(){return this.isValid?"DateTime { ts: "+this.toISO()+", zone: "+this.zone.name+", locale: "+this.locale+" }":"DateTime { Invalid, reason: "+this.invalidReason+" }"},n.valueOf=function(){return this.toMillis()},n.toMillis=function(){return this.isValid?this.ts:NaN},n.toSeconds=function(){return this.isValid?this.ts/1e3:NaN},n.toUnixInteger=function(){return this.isValid?Math.floor(this.ts/1e3):NaN},n.toJSON=function(){return this.toISO()},n.toBSON=function(){return this.toJSDate()},n.toObject=function(e){if(void 0===e&&(e={}),!this.isValid)return{};var t=ev({},this.c);return e.includeConfig&&(t.outputCalendar=this.outputCalendar,t.numberingSystem=this.loc.numberingSystem,t.locale=this.loc.locale),t},n.toJSDate=function(){return new Date(this.isValid?this.ts:NaN)},n.diff=function(e,t,n){if(void 0===t&&(t="milliseconds"),void 0===n&&(n={}),!this.isValid||!e.isValid)return ig.invalid("created by diffing an invalid DateTime");var i,r,a,s,o,l,u,d,c,h,f,m=ev({locale:this.locale,numberingSystem:this.numberingSystem},n),v=(Array.isArray(i=t)?i:[i]).map(ig.normalizeUnit),y=e.valueOf()>this.valueOf(),g=y?this:e,p=y?e:this,w=(o=(s=function(e,t,n){for(var i,r,a=[["years",function(e,t){return t.year-e.year}],["quarters",function(e,t){return t.quarter-e.quarter+(t.year-e.year)*4}],["months",function(e,t){return t.month-e.month+(t.year-e.year)*12}],["weeks",function(e,t){var n=iF(e,t);return(n-n%7)/7}],["days",iF]],s={},o=e,l=0;l<a.length;l++){var u=a[l],d=u[0],c=u[1];n.indexOf(d)>=0&&(i=d,s[d]=c(e,t),(r=o.plus(s))>t?(s[d]--,(e=o.plus(s))>t&&(r=e,s[d]--,e=o.plus(s))):e=r)}return[e,s,r,i]}(g,p,v))[0],l=s[1],u=s[2],d=s[3],c=p-o,0===(h=v.filter(function(e){return["hours","minutes","seconds","milliseconds"].indexOf(e)>=0})).length&&(u<p&&(u=o.plus(((r={})[d]=1,r))),u!==o&&(l[d]=(l[d]||0)+c/(u-o))),f=ig.fromObject(l,m),h.length>0?(a=ig.fromMillis(c,m)).shiftTo.apply(a,h).plus(f):f);return y?w.negate():w},n.diffNow=function(e,n){return void 0===e&&(e="milliseconds"),void 0===n&&(n={}),this.diff(t.now(),e,n)},n.until=function(e){return this.isValid?iw.fromDateTimes(this,e):this},n.hasSame=function(e,t,n){if(!this.isValid)return!1;var i=e.valueOf(),r=this.setZone(e.zone,{keepLocalTime:!0});return r.startOf(t,n)<=i&&i<=r.endOf(t,n)},n.equals=function(e){return this.isValid&&e.isValid&&this.valueOf()===e.valueOf()&&this.zone.equals(e.zone)&&this.loc.equals(e.loc)},n.toRelative=function(e){if(void 0===e&&(e={}),!this.isValid)return null;var n=e.base||t.fromObject({},{zone:this.zone}),i=e.padding?this<n?-e.padding:e.padding:0,r=["years","months","days","hours","minutes","seconds"],a=e.unit;return Array.isArray(e.unit)&&(r=e.unit,a=void 0),i3(n,this.plus(i),ev({},e,{numeric:"always",units:r,unit:a}))},n.toRelativeCalendar=function(e){return(void 0===e&&(e={}),this.isValid)?i3(e.base||t.fromObject({},{zone:this.zone}),this,ev({},e,{numeric:"auto",units:["years","months","days"],calendary:!0})):null},t.min=function(){for(var e=arguments.length,n=Array(e),i=0;i<e;i++)n[i]=arguments[i];if(!n.every(t.isDateTime))throw new ex("min requires all arguments be DateTimes");return t2(n,function(e){return e.valueOf()},Math.min)},t.max=function(){for(var e=arguments.length,n=Array(e),i=0;i<e;i++)n[i]=arguments[i];if(!n.every(t.isDateTime))throw new ex("max requires all arguments be DateTimes");return t2(n,function(e){return e.valueOf()},Math.max)},t.fromFormatExplain=function(e,t,n){void 0===n&&(n={});var i=n,r=i.locale,a=i.numberingSystem;return iN(ty.fromOpts({locale:void 0===r?null:r,numberingSystem:void 0===a?null:a,defaultToEN:!0}),e,t)},t.fromStringExplain=function(e,n,i){return void 0===i&&(i={}),t.fromFormatExplain(e,n,i)},t.buildFormatParser=function(e,t){void 0===t&&(t={});var n=t,i=n.locale,r=n.numberingSystem;return new iM(ty.fromOpts({locale:void 0===i?null:i,numberingSystem:void 0===r?null:r,defaultToEN:!0}),e)},t.fromFormatParser=function(e,n,i){if(void 0===i&&(i={}),tJ(e)||tJ(n))throw new ex("fromFormatParser requires an input string and a format parser");var r=i,a=r.locale,s=r.numberingSystem,o=ty.fromOpts({locale:void 0===a?null:a,numberingSystem:void 0===s?null:s,defaultToEN:!0});if(!o.equals(n.locale))throw new ex("fromFormatParser called with a locale of "+o+", but the format parser was created for "+n.locale);var l=n.explainFromTokens(e),u=l.result,d=l.zone,c=l.specificOffset,h=l.invalidReason;return h?t.invalid(h):ij(u,d,i,"format "+n.format,e,c)},em(t,[{key:"isValid",get:function(){return null===this.invalid}},{key:"invalidReason",get:function(){return this.invalid?this.invalid.reason:null}},{key:"invalidExplanation",get:function(){return this.invalid?this.invalid.explanation:null}},{key:"locale",get:function(){return this.isValid?this.loc.locale:null}},{key:"numberingSystem",get:function(){return this.isValid?this.loc.numberingSystem:null}},{key:"outputCalendar",get:function(){return this.isValid?this.loc.outputCalendar:null}},{key:"zone",get:function(){return this._zone}},{key:"zoneName",get:function(){return this.isValid?this.zone.name:null}},{key:"year",get:function(){return this.isValid?this.c.year:NaN}},{key:"quarter",get:function(){return this.isValid?Math.ceil(this.c.month/3):NaN}},{key:"month",get:function(){return this.isValid?this.c.month:NaN}},{key:"day",get:function(){return this.isValid?this.c.day:NaN}},{key:"hour",get:function(){return this.isValid?this.c.hour:NaN}},{key:"minute",get:function(){return this.isValid?this.c.minute:NaN}},{key:"second",get:function(){return this.isValid?this.c.second:NaN}},{key:"millisecond",get:function(){return this.isValid?this.c.millisecond:NaN}},{key:"weekYear",get:function(){return this.isValid?iV(this).weekYear:NaN}},{key:"weekNumber",get:function(){return this.isValid?iV(this).weekNumber:NaN}},{key:"weekday",get:function(){return this.isValid?iV(this).weekday:NaN}},{key:"isWeekend",get:function(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}},{key:"localWeekday",get:function(){return this.isValid?iH(this).weekday:NaN}},{key:"localWeekNumber",get:function(){return this.isValid?iH(this).weekNumber:NaN}},{key:"localWeekYear",get:function(){return this.isValid?iH(this).weekYear:NaN}},{key:"ordinal",get:function(){return this.isValid?tj(this.c).ordinal:NaN}},{key:"monthShort",get:function(){return this.isValid?iA.months("short",{locObj:this.loc})[this.month-1]:null}},{key:"monthLong",get:function(){return this.isValid?iA.months("long",{locObj:this.loc})[this.month-1]:null}},{key:"weekdayShort",get:function(){return this.isValid?iA.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}},{key:"weekdayLong",get:function(){return this.isValid?iA.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}},{key:"offset",get:function(){return this.isValid?+this.o:NaN}},{key:"offsetNameShort",get:function(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}},{key:"offsetNameLong",get:function(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}},{key:"isOffsetFixed",get:function(){return this.isValid?this.zone.isUniversal:null}},{key:"isInDST",get:function(){return!this.isOffsetFixed&&(this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset)}},{key:"isInLeapYear",get:function(){return t9(this.year)}},{key:"daysInMonth",get:function(){return nt(this.year,this.month)}},{key:"daysInYear",get:function(){return this.isValid?ne(this.year):NaN}},{key:"weeksInWeekYear",get:function(){return this.isValid?nr(this.weekYear):NaN}},{key:"weeksInLocalWeekYear",get:function(){return this.isValid?nr(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}}],[{key:"DATE_SHORT",get:function(){return e$}},{key:"DATE_MED",get:function(){return eI}},{key:"DATE_MED_WITH_WEEKDAY",get:function(){return eL}},{key:"DATE_FULL",get:function(){return eV}},{key:"DATE_HUGE",get:function(){return eH}},{key:"TIME_SIMPLE",get:function(){return ez}},{key:"TIME_WITH_SECONDS",get:function(){return eP}},{key:"TIME_WITH_SHORT_OFFSET",get:function(){return eU}},{key:"TIME_WITH_LONG_OFFSET",get:function(){return eW}},{key:"TIME_24_SIMPLE",get:function(){return ej}},{key:"TIME_24_WITH_SECONDS",get:function(){return eR}},{key:"TIME_24_WITH_SHORT_OFFSET",get:function(){return eQ}},{key:"TIME_24_WITH_LONG_OFFSET",get:function(){return eZ}},{key:"DATETIME_SHORT",get:function(){return eY}},{key:"DATETIME_SHORT_WITH_SECONDS",get:function(){return eJ}},{key:"DATETIME_MED",get:function(){return eG}},{key:"DATETIME_MED_WITH_SECONDS",get:function(){return eq}},{key:"DATETIME_MED_WITH_WEEKDAY",get:function(){return eK}},{key:"DATETIME_FULL",get:function(){return eX}},{key:"DATETIME_FULL_WITH_SECONDS",get:function(){return e2}},{key:"DATETIME_HUGE",get:function(){return e0}},{key:"DATETIME_HUGE_WITH_SECONDS",get:function(){return e1}}]),t}(Symbol.for("nodejs.util.inspect.custom"));function i5(e){if(i8.isDateTime(e))return e;if(e&&e.valueOf&&tG(e.valueOf()))return i8.fromJSDate(e);if(e&&"object"==typeof e)return i8.fromObject(e);throw new ex("Unknown datetime argument: "+e+", of type "+typeof e)}eh.DateTime=i8,eh.Duration=ig,eh.FixedOffsetZone=tp,eh.IANAZone=e9,eh.Info=iA,eh.Interval=iw,eh.InvalidZone=tw,eh.Settings=tN,eh.SystemZone=e6,eh.VERSION="3.7.2",eh.Zone=e3;var i7=s`
    ha-card {
        --header-spacing: 15px;
        --legend-spacing: 15px;
        --legend-dot-size: 10px;
        --navigation-spacing: 5px;
        --navigation-month-font-size: 2em;
        --days-columns: 7;
        --days-spacing: 15px;
        --day-date-number-font-size: 3.5em;
        --day-date-number-line-height: 1.2em;
        --day-date-text-font-size: 1.25em;
        --events-margin-top: 10px;
        --event-spacing: 5px;
        --event-padding: 10px;
        --event-border-width: 5px;
        --event-border-radius: 5px;
        --event-font-size: 1em;
        --event-line-height: 1.2em;
        --event-icon-size: 18px;
        --weather-icon-size: 30px;
        --weather-temperature-separator: ' / ';
        --weather-temperature-font-size: 1em;
    }

    ha-card.nobackground {
        border: none !important;
        background-color: transparent !important;
        box-shadow: none !important;
    }

    ha-card.compact {
        --days-spacing: 5px;
        --day-date-number-font-size: 1.5em;
        --day-date-text-font-size: 1em;
        --events-margin-top: 5px;
        --event-spacing: 2px;
        --event-padding: 2px 5px;
        --event-border-width: 2px;
        --event-font-size: .9em;
        --event-line-height: 1.1em;
        --weather-icon-size: 20px;
        --weather-temperature-font-size: 0.8em;
    }

    /* --- Skylight theme --- */
    ha-card.skylight {
        --event-border-width: 0px;
        --event-border-radius: 10px;
        --event-spacing: 6px;
        --event-padding: 10px 12px;
        --events-margin-top: 8px;
        --day-date-number-font-size: 1.1em;
        --day-date-text-font-size: 1em;
    }

    ha-card.compact.skylight {
        --event-border-radius: 8px;
        --event-padding: 4px 8px;
    }

    ha-card.skylight .container .day .date {
        display: flex;
        align-items: baseline;
        gap: 8px;
    }

    ha-card.skylight .container .day .date .skylight-day-header {
        display: flex;
        align-items: baseline;
        gap: 8px;
        width: 100%;
    }

    ha-card.skylight .container .day .date .day-label {
        font-size: 1.1em;
        font-weight: 700;
    }

    ha-card.skylight .container .day .date .add-event-text {
        font-size: 0.85em;
        color: var(--secondary-text-color, #888);
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.2s;
        white-space: nowrap;
        margin-left: auto;
    }

    ha-card.skylight .container .day .date .add-event-text:hover {
        opacity: 1;
        color: var(--primary-color, #03a9f4);
    }

    ha-card.skylight .container .day .add-event {
        display: none;
    }

    ha-card.skylight .container .day .events .event {
        border-left: none;
        border-radius: var(--event-border-radius);
        background-color: color-mix(in srgb, var(--event-bg-tint, #888) 15%, var(--card-background-color, white) 85%);
    }

    ha-card.skylight .container .day .events .event .additionalColor {
        display: none;
    }

    ha-card.skylight .container .day .events .event .calendar-dot {
        width: 10px;
        height: 10px;
        min-width: 10px;
        border-radius: 50%;
        background-color: var(--dot-color, var(--divider-color, #888));
        align-self: center;
        margin-right: 4px;
        flex-shrink: 0;
    }

    ha-card.skylight .container .day .events .none,
    ha-card.skylight .container .day .events .more {
        border-radius: var(--event-border-radius);
        background-color: transparent;
    }

    .card-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .card-header-row .card-title {
        margin: 0;
    }

    .current-weather {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: var(--weather-temperature-font-size);
    }

    .current-weather .icon {
        display: inline-block;
        vertical-align: middle;
        background-size: cover;
        width: var(--weather-icon-size);
        height: var(--weather-icon-size);
    }

    .current-weather .icon img {
        max-width: var(--weather-icon-size);
        max-height: var(--weather-icon-size);
    }

    .errors {
        white-space: pre-line;
    }

    .container {
        container-name: weekplanner;
        container-type: inline-size;
        display: flex;
        flex-wrap: wrap;
        gap: var(--days-spacing);
    }
  
    .container.hasActions {
      cursor: pointer;
    }
  
    .container .header {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: var(--header-spacing);
    }
    
    .container .legend {
        display: flex;
        align-items: center;
    }

    .container .legend ul {
        display: flex;
        flex-wrap: wrap;
        gap: var(--legend-spacing);
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    .container .legend ul li {
        display: block;
        --mdc-icon-size: 16px;
    }
    
    .container .legend ul li.hasToggle {
        cursor: pointer;
    }

    .container .legend ul li.hidden {
        opacity: .5;
    }

    .container .legend ul li ha-icon {
        color: var(--legend-calendar-color, var(--divider-color, #ffffff));
    }

    .container .legend ul li.hidden ha-icon {
        color: var(--divider-color, #ffffff);
    }

    .container .legend ul li.noIcon:before {
        content: '';
        display: inline-block;
        width: var(--legend-dot-size);
        height: var(--legend-dot-size);
        background-color: var(--legend-calendar-color, var(--divider-color, #ffffff));
        border-radius: 50%;
        margin: 0 5px 0 0;
        vertical-align: middle;
    }

    .container .legend ul li.hidden.noIcon:before {
        background-color: var(--divider-color, #ffffff);
    }

    .container .navigation {
        display: flex;
        gap: var(--navigation-spacing);
        align-items: center;
    }

    .container .navigation .month {
        font-size: var(--navigation-month-font-size);
    }

    .container .navigation ul {
        display: flex;
        flex-wrap: wrap;
        gap: var(--navigation-spacing);
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .container .navigation ul li {
        display: block;
        cursor: pointer;
    }

    .container .day {
        position: relative;
        display: flex;
        flex-direction: column;
        width: calc((100% - (var(--days-columns) - 1) * var(--days-spacing)) / var(--days-columns));
        margin: 0 0 var(--days-spacing) 0;
    }

    .container .day .date {
        position: relative;
        z-index: 1;
    }

    .container .day .date .number {
        font-size: var(--day-date-number-font-size);
        line-height: var(--day-date-number-line-height);
    }

    .container .day .date .text {
        font-size: var(--day-date-text-font-size);
    }

    .container .day.header .date .text {
        font-size: var(--day-header-font-size, var(--day-date-text-font-size));
        color: var(--day-header-color, var(--primary-text-color));
        font-weight: bold;
        text-transform: capitalize;
    }

    .container .day .add-event {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0.3;
        transition: opacity 0.2s;
        color: var(--primary-text-color);
        --mdc-icon-size: 18px;
        margin-left: auto;
        margin-top: auto;
        padding-top: 4px;
    }

    .container .day .add-event:hover {
        opacity: 0.8;
    }

    .container .day .weather {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        font-size: var(--weather-temperature-font-size);
        cursor: pointer;
    }

    .container .day .weather .icon {
        display: inline-block;
        vertical-align: middle;
        background-size: cover;
        width: var(--weather-icon-size);
        height: var(--weather-icon-size);
    }

    .container .day .weather .icon img {
        max-width: var(--weather-icon-size);
        max-height: var(--weather-icon-size);
    }

    .container .day .weather div.temperature {
        display: inline-block;
        margin: 0 5px 0 0;
        vertical-align: middle;
    }

    .container .day .weather .temperature:has(.high) .low:before {
        content: var(--weather-temperature-separator);
    }

    .container .day .events {
        margin-top: var(--events-margin-top);
    }

    .container .day .events .none,
    .container .day .events .more,
    .container .day .events .event {
        margin-bottom: var(--event-spacing);
        background-color: var(--event-background-color);
        border-radius: 0 var(--event-border-radius) var(--event-border-radius) 0;
        font-size: var(--event-font-size);
        line-height: var(--event-line-height);
    }

    .container .day .events .none,
    .container .day .events .more {
        padding: var(--event-padding);
        border-radius: var(--event-border-radius);
    }

    .container .day .events .event {
        display: flex;
        border-left: var(--event-border-width) solid var(--border-color, var(--divider-color, #ffffff));
        cursor: pointer;
    }

    .container .day .events .event .additionalColor {
        width: var(--event-border-width);
        background-color: var(--event-additional-color);
    }

    .container .day .events .event .icon {
        padding: var(--event-padding);
    }

    .container .day .events .event .inner {
        flex-grow: 1;
        padding: var(--event-padding);
    }

    .container .day .events .event .time {
        color: var(--secondary-text-color, #aaaaaa);
        margin: 0 0 3px 0;
    }

    .container .day .events .event .location {
        margin: 3px 0 0 0;
        --mdc-icon-size: var(--event-icon-size);
    }

    .loader {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 40px;
        height: 40px;
    }

    .loader:after {
        content: " ";
        display: block;
        width: 24px;
        height: 24px;
        margin: 4px;
        border-radius: 50%;
        border: 3px solid var(--primary-text-color);
        border-color: var(--primary-text-color) transparent var(--primary-text-color) transparent;
        animation: loader 1.2s linear infinite;
    }

    ha-dialog .calendar,
    ha-dialog .datetime,
    ha-dialog .location {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    ha-dialog .calendar ha-icon,
    ha-dialog .datetime ha-icon,
    ha-dialog .location ha-icon {
        margin-right: 8px;
    }

    ha-dialog .location .info a {
        color: var(--primary-text-color);
    }

    ha-dialog .description {
        border-top: 1px solid var(--primary-text-color);
        margin-top: 16px;
        padding-top: 16px;
    }

    ha-dialog .event-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    ha-dialog .event-actions .btn {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
        --mdc-icon-size: 16px;
    }

    ha-dialog .event-actions .btn-edit {
        background-color: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, #fff);
    }

    ha-dialog .event-actions .btn-delete {
        background-color: var(--error-color, #db4437);
        color: #fff;
    }

    ha-dialog .event-actions .btn:hover {
        opacity: 0.9;
    }

    .create-event-form {
        padding: 8px 0;
    }

    .create-event-form .form-row {
        margin-bottom: 12px;
    }

    .create-event-form .form-row label {
        display: block;
        margin-bottom: 4px;
        font-size: 0.9em;
        color: var(--secondary-text-color, #aaaaaa);
    }

    .create-event-form .form-input {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background-color: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 1em;
        box-sizing: border-box;
    }

    .create-event-form .form-input:focus {
        outline: none;
        border-color: var(--primary-color, #03a9f4);
    }

    .create-event-form .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 16px;
    }

    .create-event-form .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
    }

    .create-event-form .btn-delete {
        display: flex;
        align-items: center;
        gap: 4px;
        background-color: var(--error-color, #db4437);
        color: #fff;
        margin-right: auto;
        --mdc-icon-size: 16px;
    }

    .create-event-form .btn-delete:hover {
        opacity: 0.9;
    }

    .create-event-form .btn-cancel {
        background-color: transparent;
        color: var(--primary-text-color);
    }

    .create-event-form .btn-submit {
        background-color: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, #fff);
    }

    .create-event-form .btn-submit:hover {
        opacity: 0.9;
    }

    @keyframes loader {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @container weekplanner (width <= 1920px) {
        ha-card .container .day {
            --days-columns: var(--days-columns-lg, 7);
        }
        ha-card.compact .container .day {
            --days-columns: var(--days-columns-lg, 7);
        }
    }
    
    @container weekplanner (width <= 1280px) {
        ha-card .container .day {
            --days-columns: var(--days-columns-md, 5);
        }
        ha-card.compact .container .day {
            --days-columns: var(--days-columns-md, 7);
        }
    }

    @container weekplanner (width <= 1024px) {
        ha-card .container .header .legend,
        ha-card .container .header .navigation {
            width: 100%;
        }
        ha-card .container .day {
            --days-columns: var(--days-columns-sm, 3);
        }
        ha-card.compact .container .day {
            --days-columns: var(--days-columns-sm, 4);
        }
    }
  
    @container weekplanner (width <= 640px) {
        ha-card .container .day {
            --days-columns: var(--days-columns-xs, 1);
        }
        ha-card.compact .container .day {
            --days-columns: var(--days-columns-xs, 2);
        }
    }
`,i9={};i9="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAHlBMVEUAAADL2%2FvK2%2FrH2fnI2vrG2PrJ2%2FvL3fzI3PzG2vz01DCXAAAAB3RSTlMAFzNfjrze%2FOgtNAAAAZBJREFUeNrt2UtuwzAMBFBR%2FN%2F%2Fwm2KFkSbOlJMz84PWQ8tUowDZNxut300WdQIFM7qXwSTbv4tx%2FWmemFQPOwApF4ABxD%2FLWhcicz%2F0HEl9icT0B7YiNWfCSAfdYfMSyHs83tg5lsUcD8hIyA%2FMDEDLoQZQAE0CFFAwQWmgwsYuMB0cAEFFyAHF2B%2FhTAjLhPcIWdwh1wwd6jY6PIF8Aj6U56%2BIP0ZY4cgDu6R%2BkIItEB8Qn5RxAOPjlzmh6EKxA%2BGtCiKjQaNw%2FQirQKf%2Fg8vndeOxA4dp3Fs6GzbjC0%2Bx0kUm2iclLHHqHGNthhoysWwQ8jTXbLYloTpUXEG9ago6B6VnKBlLkrII%2BTjIwQ8Qj6ETtQR8lsY09hGuZ9f3HhevAv5V7gJT7pqnfNAhLv1m5Qv0Vjg7MQnjyXp5Evv90WuaGsbckkb%2B5bZyF92KUsvv0gehDfnWzgj38LjTWT5BqPxPgY9fiHNLUrjrKm5pHN0TAXFF2LLA%2FUyayKWfKJM1%2F%2Fdq2amKsKTxu122%2FYBlItVl6a3MA0AAAAASUVORK5CYII%3D";var re={};re="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAHlBMVEUAAADr6%2Bvk5OTn5%2Bfo6Ojo6Ojq6urp6enm5ubf3991rVFGAAAABnRSTlMAIj93rtiU3SZWAAAB6UlEQVR42u2Y247CMBBDc5ux8%2F8%2FvFrQ0otpSdIi7UNOJNQnH5yJQkWYTCaTyWTy74m5GN0dtJJjuJlsvsNyuI1o%2FpYSvxrvgNsNiuJHAICXcI3kx%2BBJuvfrq8EvTNu8QQDYl%2FIdFw3mrQK3r%2BQ7Fsqt89V893z5fCrYGFLow%2FsEAO%2FYIBWMjiF6vwAxtGMjAru7gBBvLzA8BR8TeGgkj%2BUDrCT8F1rJ6foOqaCSeOHlwDGaDzwEayxdOkPaQAywODQC4NiAHVKi3CcgCCD3zxiHAq1AMbArXwWVmwa6SxgX4JH%2FMiyS2HVKcd6AJHcNYD0CnFDXhkVCpPYtAj41WAwEoRXYl6%2BCJ9sG6wrWE6%2BCxfBcepeXnnwV8MWmAVquCnziNYFVB70xYk%2B8CtYsDYj84RihhW0BctVgLbDmdB0BdywNyuEQ0AwrhbdvNRikUvkrsBEUCM0FFOhLTcQQq7hdB%2FlRsOEdgq6HdCeIvLGAXEaDUyCJExi2cECAF5SFshMk9uefksKOfCGfuiwI1ieQRykwbNBQyrLwDhvLJwTGcMnA3TP3K4UDMhvzTxswh0NS7d9%2BaZDDGYUQ%2BgqlcE60dgWlAS2Gj8RSOdaAlkIb2SqbC%2Fx91pJ6%2F1qurVjJOYXJZDKZTN7zA3Auaa9qRnCHAAAAAElFTkSuQmCC";var rt={};rt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAOVBMVEUAAADHx8fKysrJycnIyMjHx8fGxsbDw8PBwcG%2Fv7%2FCwsLCwsK%2Bvr67u7u4uLi3t7e4uLi5ubm4uLhyXqCUAAAAE3RSTlMAFkaMtND6%2F%2F%2F%2FCGT%2F%2F7BAhezMkbzxVAAAAi9JREFUeAHtloeS2zAMRF0JrA60yv9%2FbBQagS2YpOj05PiS6zvYURk8Hv5vOp1Op9M5ns6XawjXy%2Fl0bM80c7oGIr5D4XrKZ4ihgCzTwPARKMFsHR%2FDS4axxWdKHM%2BBFNZ%2FqeN83GTwFdZ%2FimWKDMfTJZDBilZcTsfhniFmgPEKp0yREHS6vwK7jLCivQDbv2eYqFjgxkNiFHAevQKJKyJ4RpoKcNMbMt5yHWm83MZ0Q9ZMfLNANo90EvYAiNMmE9sLeH59KWdfkMtISwFjGQ8ZxkXACqSUiVItmJfbNJYXwzjdlrmeGVLmoHS6D1gh%2BgU%2BMNn8Gh%2Bkmelf2QdeB%2B0%2BSOPcFbD3AfCdPiAd76%2FA1JkiNl4voN0HOl0%2FIa6g6AIGqw%2Bi4IGI1ApsfMUHOt77oKGADZkqPgBQ9kFLQdYHcDeo5APZLZA9HwA1H1QLWnZ9uw863QfExq%2FwATt%2BgQ88OR94uN0HRskHWUT2fcBFsEKkPsgiiZoPeIOe%2FfFYcYaJRmJCtEBpKpDb%2BM0Hog5g%2B6fEjQ%2FknYLMrvdXAJ9pL0DWB%2B4Ykcs0FVR2PYz4q30wdB98Gh8M4w%2F5AErFB7aEwO%2F6AHf0a9YHbsk1%2BcCf%2Fe0L4HxAMMRo9AFW%2FBWkTw8fMPx8BTs%2BsLO%2FvwLWDiKvA%2FGAyz6whfa07AUVzAdbagWMxObsn%2B9wPmgqKO96ZCj4IO4VFM%2F%2BG%2BS7fLC366FIOROrBaVd333Q6XQ6nc4Xua9QVFRZEEsAAAAASUVORK5CYII%3D";var rn={};rn="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAIaklEQVR42u2dW2wUVRjHjxpjfPDFENEnE33wwRhfvQBt99qWmyCJkSC%2BmCCJ%2BGQkBmI0GhMTwqXljkChpSDdmeVWKxEtl4hxW6E7bdnS0hvdbbcXLi30Qrvs53x0D9My7U7nnG07szMn%2BWWTdnfo%2FH%2FnO%2BfM2dmF2M1udrOb3exmN7vZbbpbd3f3ax0dHeuj0agoU9fe3g5dXV2P6ezsBPwZ%2Fk5GxOfia4jd2Fsi8DoMmAc8Bh6L2G1qPV0jdF4Zol0ZMx68MkwhtCpsEYmGvZIhUFYBT4oQiVVbOBzOYAmSX4Aa%2FFuIlZqq18%2ByBPydZSZqOtYbR4AC%2Fm0knRsN36gC0loCDd%2FoAuTnpZ8EGr4ZBCRInxUSnojZwpefnx4TM11qmk3AGAnmXqLiCZhVAEI3%2BYgZGw496SDAlPMB7rPgSaeLAMRUe0e46kk3AaZZmqZj7zdVFaRj7zfVXIAnnK4C5GMZe0WEFy7pGv7YZWlzczM%2BIlTMk6jeo8brCXv4SZ0AlQQd%2B0wiyrDE8KMRCCsqAayrKhRhr34YK4BfgiICs0u78Z8hDB4J3MfEarC3HmZGAH2%2B6nXYidNiAmYIlUUAjwS1EF4J8kEsEb5KgEoCUwXwD0fyCy0jAJkgfA0J%2BoTgxGy6JShXqPxD0Fg4KkBZHZlKANcWQ7gRblWfZqgABgmaQpRHHIpMMQTx9uj%2BwHboDezmrQANCXoqQKkCw0%2FC3FvMrTUAghPuVB7kFTAZrBWgrwrQlpmCR6LRDhgqXw9QMh9uVxawC9CWoBU0%2FxY4PtFM4SN3rpUBiG6sAFYBSvDaMFUAMuWtCDOF3xlpgYelKwH8OXoFaI39eiohddsUuG41RfAJ7gV2AAgugBOLAEQn3KpgFqAX7QpQHvVdHctPNnzwSE9LEMCfLYe%2FkEUAW%2B9X0FMB%2BgTgRGzU0B8TbYcHf6wDED0Y%2FiiiAwWwvCHDw1QqQN9EjKaMfhV7t8aPY74SPlaBmCULOMjwliQ3qb8lBl9gWMJNED%2B9AifeRPi5iB4BrOGzLFHZBGC5GFXAwD%2BbAEQXDV4lgLn388NzLaBeDRkx%2FJ7GAIAfx%2F0cVgF6guOpBP73CLBkDCWgIwLDZ9cA%2BN0YOKsA7P0agXE9IqyrIHUV0IMZgb6qYgDBgWFrCJi13j%2Fl%2FSDTzQVdbfUQP7UM1%2F2sAlQhMTA7n08wQhUM%2Fv2jauJVIcgCApoC9ITG%2B5ia%2B1GxdGZTwq36S8nD9yOKAP7wUw9myH2%2F0Kz88e1tECv7VD3x%2BikqAbzhp3pSTrr%2BN%2FyqqO%2FKIQxWFfrkAg6ow2QYdqaj95tOQvfNUCLcbI3wc0YRMqG78gh7oKmvgHG931wSolEYPL8R93u0wlcQXXDv4g9wJ1QGfTUC3K0Woa%2FWPzk1fuitPckhTFsivS3FdBJu151LhJ%2BjCjw5Hhkvbs6pUMkTPfDg1EoaVqorgGHoYZiYp2VlEWmFeOnHGBCGqoPsBN7xiBTPeEoyoCt0QR08f8%2BfuU%2Fno2W8tE%2BlgHsVuwB8WTpCT4LonRhfBtwv34hBqXovY4%2FnDp%2F7rupU9J5oQwVuMWN4GoEzBo8IbogLHog0h1K1CuIZdlL%2FpX3snzbpgIGytZOEn80bvgIOPZVHIRKhvZarAhADfYGgIkLUe5NrV5Uf4JQSNkPo2vgcMPTbZ9AeiXBfB9DgDf1FIPSLWzVltDVA7OQHOGnyhK6NLxOidZeS7dto%2FhzPBTuYoYPX%2BupiKoXSczkfQHRyhq0d%2Fp2%2Fvoempib672ox7iOqyLSHDgAzRnivl4T3ecmtgmxPXPTG6JJxWvB74KHP3dF06dA7wWv1pLa2hjKT52wsAcHNuaTlwLLn46cWXwHRM33h47GPz4fo71%2BvrWqsJVLD1bFYV0Co8HPSU7hkPZyYntAp2Pv7D2Vcrite%2B2zwUjGRzh8Yi3UFhAP73wTBMTAakncK6AleCT%2Fucw437fC%2Be3XrEiJt9j6JdQX0Cit%2FjhVnNsSOukJajBx1Ig1yyHFV4Mnwu%2BD%2BwffzbubPJy3bM0mrGusKGDyc9fRIkYMMF06N2DHnHPB7BjFYbdwAggOGxcU3b5Tnz6kv304ayvMnwroCBorc5JGApNDwXUQO%2FyUQUYBW8C4AUaYkAzqLlq%2B6WldJgvVXZP6bCFuAZvhHXUQOF5mrCFCHTqECeguc56T8pU9Je1cRae8nk2ELSB6%2Bk8gBJwS458oMqgNXEz%2BeMdS%2Bc8Hb1%2FKySd02dzJsAUnDF1xjmSszKAPJccLdko9%2BailaTdqOrNLCFjBR%2BCM0fL0CRBeMFM%2B7fu3qmReqWq4TqVHSwhag6vnFifAZBMR9Lojsca2oFr8lUtkWIpVu0sIWMK7nFzswaCYB2PvvH8o6IW1bTIJbckn1Zo%2BMNzlWvhCjAlThswgQ3RA%2FntXXuXvBGzd3ZpK2nVlTxRaAAmj4rAJws63r7Fcbair8pO7fY3qwtoBH4dMxn1WA6IIHh98LXj%2Fz3fNVoQAJVl%2FQg4UFFLppz2cWgOHHSxyx5p3ZOVX5y4m0XTfWFTB4xE1AcHIIQBwwUDCvqCkvizTku0lDnksv1hUQ99FgdQrwOWEUB8TERT2t%2Fi9fbfZ9QVoFJqwrQA5RL3NlFAHyxNstrF53pfUGCbaEWLEFMAkQHNBf6AiEdn%2F4nFSygUgl37BiC2ASIE%2B8nfuyFgS3LSU1W7wcWPhCjFmA4IT%2BIte%2B8B433lkh4%2BHBFqBLgOAYiR13dl6v%2BPWVGulPUhs8y4stQAcvy0DXL841wYuFJFhZSqTASV4sLKDEqQcU8PpQUWaplLfkmeDWhUTakkukrdxYV8Dtg259FLhf7N7vfKtpVy5p3LUwVczgORv7f06xm93sZrn2P%2BHsOlkQh9N3AAAAAElFTkSuQmCC";var ri={};ri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAyVBMVEUAAADCyKx%2FxLnk1s3ut00P3%2Fni19Mc6P%2Fvs0jk2tYq6P8n6P8n6P%2Fk29j71Uvs4%2BH0o0Po4tgC2%2Fv92kXl4d8E4f3%2BslD1pEL92T%2Fn5eT920b6p0Pr6uj9sE8P5%2F8F5v%2Fp6Ojh4OD%2B2kIL4f3r6uoH5f%2F9qkXq6urp6enr6OHo6Ojn5%2Bfm5ubk5OTr49Pj4uLh4eHd3d3r28Da2trz1pbW1dT32Gn92j792Tv81jv60z33v3jiwZr8tl7%2Fsk%2F%2FsEr%2Fr0f%2FrUUA5f%2BMUhpmAAAAJ3RSTlMABREdHyg1PElPT05PX19mhpOTm6SkrK29vs3P0dHX3uPl7O7x%2BPprAiJZAAAD3klEQVR42u2WbXuiOBSGk%2Foyurvasdrd2nZn1KLYEKtYHbFuZez%2F%2F1GbgM4jQkwA%2BdDrmvs7z03OyeFAfvNpKTfb94PBXbtZJgVAm4PVHm81aFJyYWqDFfA8b1C77Ou3V8d4glU74yFK153HnmU9djuNEj3k369OBJL79AZabVn2MZ0qRT7wMhrqlh3DalDSXicLvDZJQ7VnJzHutd7e3tar9alAkqLTtGsnMx7bLz9giAoG1Li1PVslEDzDAEFA07Q8lq0WSBbSkCAYGObbtkZgRwweKBvVx9IKxkxWCYJUNaI9Wy%2BQfVivIUhzU7u2ViCZy9saE9zlaAAEaLQHgXGXe6aCZyEQBs9LJ6jr8sEiMAjW4C5HhyHAEYQiSjtPByDAEUBo017TVhqBHeH5Zb74oR00S5Ovwbau6fkhPhsNgRLGrPo5QUOZzgRjLUzSpWlbIB6cTzl3mJmAPV4pBV1F%2FvO7Kwyc6QWhgaYa4zFzFlvXdSfcYcxIwDpGlwj58%2B329fXV1VaJ%2FaKeSjDZCIFgZi6wqLZEyOeLbShwpzoBuNY2GQV6eQ8FrjubMMN81jO8puIpvhH5vhTMZlOuEYCS2aCJ%2FLnM95dSMJ1OuKmgcf5TgQJN30V8IJhJwRkDA8qbSq2EDvuhwA0EOING0NU0ASPgHwmEQXkGJtB3uRobAT8imEi4kUC%2FMsfyG%2BGfCJQGdkJXtfTHR4gRiAskjl7QUgho%2F%2BgZLgsEgWyBysBOaSjXPt7fmfsxAQwaQYmo6OyfkCMQFUiDokoMoMfni8QcvvBPBIozmFUIlKwwf76NCKRBKkJgSD4AJWeocimQIwC2YDOdzmCI5GsWDgwzkb%2FwT%2FkZ4C9%2FzbSjEnSIhlKfv2yT83f%2FBZthJgWcJed3KdFBO5tYfMj7qyAUcM5ZQv5Y5Ospx%2BND5svDCbiExfJ5hxID%2Fo3Eg80yEMge8ACHRXD6dWJCM5IOtkspwAEkDEz6DUpMuIqFHzq8DAj6cEK%2F22qUiCF%2F%2F0zmK7kMNT85f0TJRaCj5PxdjVyGryNwLPhH%2BUY5Tob43Uj12195eqrkFux2ygL9Mfz4GP6ZS7CTPJBkvnwEfMks2O0pK0ZmGAqGV9kEuwOqEfj2sedbPsGInikQipRVoO7wLQS3eQTKEfgOwffsAoxAjCEEw0wCFKjIEj0QJRUIKtkFZaLm5pB%2FQzKBEVBA94Ybmlmg2wKV26en2wrJCDpcEBiBgsAIFCWoafZXXh40%2Bys3sRH4C%2FurCLC%2FclPM%2FgIF7S9QxP4CRX2cQWH7C%2Bj31%2BcsUa79BYrZX6C4%2FQX0%2B%2Bs3n4v%2FAbjVlbDYgcSfAAAAAElFTkSuQmCC";var rr={};rr="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAllBMVEUAAAC5usK8y84R4PrU2OUi6P%2FX3Onqokjd3eL0o0TY3%2BwC2%2FsJ5v%2FW3%2B4A4v0C2fn3p0bj5ObN3%2F3l5ef6qkcK5v%2Fl5ebO3ffp6er9rEYL4f0H5f%2Fq6urp6eno6Ojn5%2Bfk5OTh4eHp3c7U3vLb29vJ3PzH2vvt0rDF2PnW1tbC1Pfxw4n7uWf%2Fsk%2F%2FsEr%2Fr0f%2FrEQA5f%2F%2FZTw0AAAAHHRSTlMABxcqL0RLTGGGjpOeo6aprLW%2BxtDb3%2Bjq6%2B75KExeYQAAA41JREFUeNrtmNtS2zAQhleOcVJTt4SAMcSWHIjJiZjk%2FV%2BuYkm8BlsHLHTRab9huGH4P7S%2FxA7AP00QxSH4I7yuqioAX7CkeoN5m85dhXjLX1deBeyuQpxHFE6SWSZEOosnH9pMKsStZBbGWd5CJGHjfW4EEQwlatKJ7BR3XTWGZGh8mvdRpBE2%2FCwNLiWwad5PUeQJg2jdMsRD7mCaqwSSNIi3aBhccyhynaDgd9u24frL%2BbmaAsmf2obnL%2FYcCL0AWaPhuRpgYGluIeBrFJyOUF0HYM00NwkQsW0MSMycCyAB8l4DUSVRYCNJbQX8LCBsnl1kl09HaDnWElPdLDMKiK1kjWzfPpDQ2IC9gD9tO8RgIDbnE5%2B%2FKJ7ujC2bJmQgzyZ6RaiNJoESzrMINEyU6VxSGOFvTJltBZTPV6UQgpsFSKo2zBT55ctyYWPgJkPaK%2BBit18uF6U0cKMAmYIC0Z%2F%2FuJcCizPwBlXTZa%2BgfJECNFgLMmYeER1gtT8JFiYBMbEomQYk2aCg5Pp8IrO8pgU2vN%2FXJ4EwCIjA4qHRgOqzQGvg3DijsJtfvsh4FCykQGfgH0igD1b2PIG6JSCDSTAzlEAN1yQoEaHON7ccdp5A3RGUwkEA2ccbtKo7AoWBE9rfFlHRohkQCchgEMQKAUuLBtlw3REoDPwzE1AQ0s%2BPA%2BodERr0ggBUJOfvEE3DdE0Joc9PAdEMiYtmQCToTsl%2BQkSwwPxzwyQgyKDIz0BHKIoCB9RiT%2BxQ0TbwDhHoDQuZv6o%2F84rUjwsyKASJ%2BY9AGlArH9kt6dcS78%2BfgRGW7PrjDy%2BbpQQFuKP78hmYCXvikdWmWQ1v8E6%2BSMCGm%2F74w26zwQuFAuRTfBqBDeNuOrLftA7QNZTpBKxg3XQ6ALJswPPIz%2BmU%2FuNj5AqTu%2FyA72GsyL9n8C2w%2B9d%2BxvA9%2FDgQ7fwrUMAcTtZuWBUzengYOQiMA7qYH4%2FzC3fBjSr%2FiFy4Cg6KOx7Mj8g8cBMcVE%2Fg9nji1kEgb9M90wzIZUgyHVE1%2FJMEP2EIh3euQDsh5NZFwEDBnARzB8EYVPwiwa%2FhghtQMiLBaLggADWX5%2FxLGCzQb4FLl3wUmLbA6PfDw%2B8RDAQb9gk%2BAb8C5lkw1u4vd270%2B8udQLG%2FfEH7yxk%2F%2B4vwtL8IP%2FuL8LO%2FCE%2F7i%2FCzvwg%2F%2B4vwtL8Il%2F3lbvCbT%2FvrP38XfwAyJMdyHNNMWAAAAABJRU5ErkJggg%3D%3D";var ra={};ra="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAsVBMVEUAAAD5zEP0z2L81EPcxLb70z%2Fm29X93U%2F0wjH92kP2xjD93lLp4t%2F93Ej4yjPq5OL93Ev81D%2FkxIDt7Ov93Ef4zTPp49z%2B2Tv4yjL%2B3Uzs6%2Bv70jf72k7x8fHv7%2B%2Fu7u7x7uTx6c3m5eT15af44Yvo3L%2F43G393Ej920X920P920Lq05f92kH92j%2F92j392Tv92Tn92D7810L92Df71Dz70jX5zzTvyWD4yzP2xjPyvzPo8pfJAAAAHXRSTlMACRckL0dJVVdwdXmGl5yjo7zHy9PT2%2BLj5ejy%2Bq6%2BcVQAAAPvSURBVHja7ZnbdqpIEEALlOAlcmQO3hlo4gWNGo0KAf%2F%2Fw4bujmmHUho6PrrXinnb26oirqwEnjx5UhrdbHdtZ%2BRmjBy72zZ1eBya2XHCcLlavb%2B%2Fb75ZhU7H1OARGF03XHFEYEtZuV0DfonWHoXLDFEQAdYYNbVf6wsClFFbOWEyPQft6MLHx3Zkggo1O6R%2BaSBjY9cU3r4bhqwg2dEHw606hNYJwyqB3bZT6RK6E4oARxLYfTp6hfU7YZUAL%2BycWmn%2FKFQJ7Aa10n6FACpI9l%2F1Bpwyd9CEv8pTdCloIKMTKgY4HZBg5vxoQ5LAzpQc2JUFNsWB%2FaT40DbySzaEAnu7woKUAkVL0kbILz0BCuwHGtyjvVwiPRpAGtg37w%2BwRJTckAgUjdC8594csi%2FulwaKRhADhLNpQIjnkSCYztxDBhfLN8QYwE2MJcedBcS7JmCNjWArCewNuEWX6cMp8RBkyhPyDXG6N0%2FsUv%2BM6TFkdlkU9uPARAOMSbcTeHcJFrRwkG2IYwKmszwsiFcAWZzYFFvJhigdwDirme8VMzvRhGRDDAcQ%2BnJGHfLC56dkQ5SjjgLGwvfkLE6nz6yA%2FChgoECbeCUgvCALHI9NFOh7pQhOJ5qQDXBEV64Lh%2FQMfIaPwoANOf6WDRCXFSQDHJ2c%2F8UrzZQGOMKPAoNcYFw%2BQA6XAh5ABCYqFxBXYAmmpd%2FRABT4H69eFf6lEBJMF3SY%2FR4NQFHcEP4YZ4ncAGhFuqeMPz2xRH6AAXqGlAncKEschZ%2FhoBOoQ7JCxAsiYMM1f34V8IkbR1Em5X6OhX6MlfF9P0hY4TrQRA%2BRKj5lnUTRic1w%2FMZ4VMBnkEnCl3S8oD9oRf430zMtCHrwmCP7F8g5ja8DHXjIY%2BoLvrLCUSQa6MNa1S92lCbCn%2F%2FFS1f1C%2BZpmoiCBTnGin5BkAVEwYAcr4p%2BAUmzQhzzwgDy1BX8KJBkAV5oAaKv4McrinlhoAHiRUGPj0z9USQGUB3Bv8FaBIYa3KDuq%2BgFX%2FTGLBA34CavCnrB288JIhvu8FdRLzaUxFEc3f9jiD5W1vvkTAO5BSHqb0p6PsAlYEEB9bGCnTL%2FGaCnQRF6v4QdE5zZANSvQzHaHx%2FLpf6vi39YAyn1vo%2FM0v3wBXG%2FnJe%2BX4G39Y%2B%2FJ%2FwS6q%2Fjknaqp34aQPsvbvyznr8VM5%2Bvv4Q%2BsTSoRuMsIWXyNGH%2BSUPlXyznFJMg6Nu3a6BCY%2Fjt5C%2FJLTll2ABFtNYwvbYlMSKKhy22ffVEcmVjL1cgvQqGlSZMHuWJJ5YBj0BrWD32USAq2WF7VkODx6EbLcvuDSdJMhn2bKtl6PDkyZOy%2FAdXbwfjjFzP2wAAAABJRU5ErkJggg%3D%3D";var rs={};rs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAS1BMVEUAAADO1fHO1ejZ4fLR2ezd5vbB0vXDzufS4vzP4PzN3vvV3fDk5%2B%2FAyerc5vfu7u7v7%2B%2Ft7e7k5eavwOrT2OO4y%2FDAzOi2ye%2B%2F0vYf7YBFAAAAGHRSTlMAByNNhqbMO%2F%2F%2F%2F2bRFP%2F%2F%2F%2Bv%2F%2F%2F%2F%2F9qxLSnpnAAACKklEQVR4Ae3U2YKzKgzA8QRBXECgdTnv%2F6RH%2B2V2LWLgzl%2Fn%2Bh8NOHDe7XZDUUlVY6G4Vk276voi9cps9U2HkJ1QW51UpfKkg8ws5Uu9QP%2BZL3IC1rS%2FKMhJN%2B1vAjKS1C91xKr5O0BCNqianQE65%2FPvDcC8%2FabcEcjmpdglrf72s37Gdk1TvcxXYNoDFrLo2yOYa0FHIAvVlh0g%2FmS7f3INqFuyMyPnC3R7cp0A5YfB%2BY1zw9C9ILAhxVuKf3JDngFV220TBr9j6CywmW43T3rgst3K%2BUMKgUd3XePfCQJY1PF6iNPAEe2vOBOw8XGOsSXt%2FAkB4SrjT1FwkfYnVSVfgLGkyvuyrxD8aQEuED6BhnTSJwtG9YK%2FoYjQ8zcUEap8d4jxb1x6DhOfoDyDc%2FEJhjfAKYgIrP6qKjfAvQQstSJH%2BkKH7D6EMtfUfbElPjRH4juyzH78pgZu35nsh%2BDIuVMWvH58ABhWP74i0Ix85JCJ4fVdDxHaMfIrATGSk%2FePZy0rYRHhEJpLeTI%2BN9NqPpxhw6U8vcDnAAuHxCM9T%2BaP%2FKThDREu1GlBNEHCW9ak1cnjcz8LRKB0iXHqr2J9oo07Wybjn%2BePj0jwmFOen2gZ0vLTpocUQo7j471xpPr6o%2FuZBJdnFMVXtYV0ejqtgktwmU5ZEK6yy%2FTfron%2B1t8igGQdQabFAhfq%2Bihfa4QsUMvp77NTPRe0ul%2BWep7rRfbaJsRvt9v%2Fh4jJKdZPEXkAAAAASUVORK5CYII%3D";var ro={};ro="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAATlBMVEUAAADj4%2BPp6enn5%2Bfp6enp6enp6enq6urm5ubm5ubg4ODg4ODm5ubo6Ojc3Nww6v8Y6P8T5%2F8m6P8H5v8A5f8L5v8N4PoF4f0C4P0D2%2FuDNJb%2FAAAAGnRSTlMAE2SS0e7%2F%2F7smT%2F%2F%2F%2F%2F0a6ehI%2F%2F%2FbMaX0k6g43vIAAAKLSURBVHgB7JjpmuQgCEVjiBdTgu%2F%2FtrMPX5uuoLSzT5%2F6f09xyb6984eTdjoymBm57OmHpxO4A%2BVHOs6DXwHOjx%2F17ws%2FA%2BD8Q6Ygfg4%2BwWU9%2F2BHAOTVejL7AvC5tF2%2BBz%2FAkNgBxtsNeU7AaXG%2FjmBp08SzAqYfvgDLXyipjAVLJZ0cEeCMbzgmyD94A4wrtYooM%2BdC%2B8w4FBXIF4PiM6w0dOSogJsJPsOUflBDRm0iYgJV7J7gERdIq51AlX7AWdwLai%2FQsngZ6tH2ydALnBlyXIBPAjPoN273oMF8E0gvQLoRhPNNIJ1AKS7AQCCdQM9oRRgKxPKdEXI8X7%2Fni7wUSOwwxT3SqhlURx1ROB9i8b1hn79UwKW%2BFMhoCQnBeMDyL4YytWUM0YvADPm5gBAItxtOhy9ICFJNYLgVbQeM6ACGe7FIigBcvwf2Bu%2BCWhDA4lRE7SfSn2g9STCN2u1Yr%2BTtFtLQADcC2u45fkC%2BpM0hBwpSyx8NEF%2BDky9pczklkv9aII9tQGqT%2FYQLMg55e37ZZqDq1uP0Q9MfQ8T5%2Fzrfv6M4quKCheJpvlAKfpDK1VvGJb1ZfMTxoNJaHdEmX6He%2BdheXR04DAQxGO7ANFrqv9DD1eyBSWH6Hv9wDLpB%2FTD0m2UcWWSTfZi2CsCimuzLtF4AgEXTW9WvFXxhkQSrwp8CtIKKRRDNxZ8Fn1hALIJkLrWCbywgFkEwF1hALCAWQTaXa4GbL0f%2FRXDz5eiDDDdfRMW%2BoXhBNV9kBcbXesFmUcSUc4pqebkfXCuxCLhWWhHMrNWEL%2FNF1tZKKYK2VkIRRLi4vwgSXNpfBAEu7C%2BCDJf3lNv7i85%2BkH2tzrloeC3ayx7vgDWcARqOBsEAAAAASUVORK5CYII%3D";var rl={};rl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAARVBMVEUAAACy6fHl5eXq6uro6Ojm5ubp6enq6urm5ubi4uLj4%2BPf39%2Fo6Ojh4eES3%2FkP5%2F8k6f8M5%2F8G5v8A5f8G4f0C4P0E2%2FuRTESCAAAAF3RSTlMAEFuV5P%2F%2F%2F8EbLv%2F%2FjCngQ%2Fz%2F%2F6X0kyzJZw0AAAJ0SURBVHgB7NYHlqQ6DIVhOejKLsv7X27ndj0KrELAm%2FzNSZPuTz5Nv7h%2FQkyZISLIJQa6WE2QBZR65XyWFUi%2B0TVCkS2A5EoXSLINAKTQaVmMAMCBTqksdgByoxNuMocLClUMGCodxfsCEs7fXzMAPv982gEkOiDs34dU8iuOAPL5J8gO4EZe2RfIl5%2FAo9aYVURySX3P6SRvgD8KineiqdIT7A3ICHyQFMgSXPvjGvEIqCKSIfoD3NoioJpOvsXrQFsGtBx9y7BFVwHrHPhYYBT0S6QJde8D7R0vAwi07cA%2Bf%2BwzLwKa%2FAHMfAV4EdDqvUSY4XYv6F068sPK%2FCn6BL1j32MK7DgDZv2Pm%2BdFgx3gQe%2Fi%2Fk8FTK2tCsZNCHDOA2P%2BoVB2vcp4StukkGlTx2rcxo0f2IEKH2lfBeXBvERU4LKaf2d%2BLKrCQcfgqhDpilMYc8qs49fHH1WaCOw7AcU7fcQ01RV78TzQaa5csM%2BVDNlxgXS1bz5Drttg7HMg0409%2B%2BsAR3oitP3XB%2Bq5w0Ph4%2FuF9uhWgY197rRPKGwcv%2Fqv%2F1otrJv777C5zz2QR%2BiNGXMP661Xcguxl9yeyqXH%2BtpeXWQxDMNAAG0OYBL4%2Fjct%2BikrOS%2BacvvXEzDO4SP95VIynvHVRtTqVoa51fj7t75Qic8o9IWl0VVbZhm%2BsswehYYyyfBQAhNEproZNvsnSciIm2EjgRkyZTJD8TlSMupm2Oj7TVEmk90MGzfj6zT0SYaHkYl8gfs0Y%2B%2BPyKIqGc%2F8fV%2FHIay%2FYEB%2FAaD%2BWoH9BYD6ywNczsAM4XOE99d7ThHWXyu4vwDWX4Av7K%2B%2FE4vvci3LGOUMAAAAAElFTkSuQmCC";var ru={};ru="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAPFBMVEUAAADZ2dnl5eXn5%2Bfo6Ojm5ubp6enq6urg4ODm5ubQ0NDBwcHo6OjExMS9vb2%2Fv7%2FAwMC8vLy9vb23t7ftsDFCAAAAFHRSTlMAEVuR2P%2F%2F%2F%2F67J0z%2F%2F%2F%2Bq%2B4HR%2BIsFiaoAAAJsSURBVHgB7ZWHYusgDEUlY4lhsv%2F%2FXx%2BNGtrEhliJ3vbpXvdUAwwbfzg4uJHYe88hDmie7tjfwdHSkUa%2FQJjABox%2BCWY%2FmlTh%2FDJc8BHeZvRtQYHeLAKz7wvYp7em69uwgQF9B668bqB1Ao%2Bm850LmGz3cy5gZzyAKnhr0HFdvjDabmgVvLNJo04Q9BPQCTgEouy9D9G5NeU4ZT7T1ZBl5vm5I2sF%2FiYQvEODHZ31iKqgqAboMOgF0qMqKDiDU3wvCPeCHPVL2hHkmaBXA2nzRVAN%2BZPhpSXiZcIHdC9gbAheyKdrPlEVdJukz5cKKIghV5K2Rcz9CgqS3y8hKPPrkK%2BK7wLSrSm3oWu8kIVOj5w6Xw4azQ3D%2BquCu9zyhWdDQFbFi4AWDXHVUeanZKlgZmg9rh3z2nCBJH5uaAiQldwalKnSbRGMrOIhXuheFolYQa6BM8MADSIrIApEWQT59iKGBA2QdAVk%2BewRgiYuKwpoChy0GQ3yCaFDUDQoS76mgNVj6OQTQpdEmvy5gAZ4Aob1%2FVE3SBjp9fwIa3A9A%2FX642AdGKnz%2F2d9%2F%2BfgSJnnSCgv5pND0IAuEHGbh%2FQg8TpwcjE8Z4xuSLCx8YewK8DPZF%2FYBL9DgGlJkBCsOBwP%2BCjA8k0wIpXU3elecDqWzxLYcN5%2FcJy%2BBFOJL5zBiJMYzkkE6Sz5J8MpH0Rx%2FXCQeBmLGUn6VCnVWDNdpIp94TKBPTKK2vy%2FTlBXs66s8LcMGQ%2Bfmy%2FvZGXRsPkS%2F3XQRGE2Csm7fL8qLqZXRaqbI4K6UWZzOOyXruv94U984Pz5z%2BRNcCnAxsYv5gcBJmV5WFk6DwAAAABJRU5ErkJggg%3D%3D";var rd={};rd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAYFBMVEUAAADT3t%2Fh4eHq6urp6enn5%2Bfp6enq6urm5ubG0NLLy8uds7bo6Ojj4%2BPn5%2Bfh4eHe3t4U5%2F8Y5P0B5f%2FExMS%2Bvr4K5v8D3vy%2Bvr4A3%2F28vLy9vb29vb29vb3BwcG4uLjMVSTuAAAAH3RSTlMAD1uV0e7%2F%2F7ohOgX%2F%2F%2F%2BM%2F%2Bg6%2F%2F3%2F252t9H3R8%2F%2BTcABA0AAAAzBJREFUeAHsmAe6rCAMhUWGBO8kwf1v9jbsSonM6%2B9fwPm%2Fk1jpfnP%2BY3r7cICI4HxvXp0%2BWMAd4IdXxj%2FwBKB7e9VsPF4BgO4lLSxeA5%2Bgb45%2FPjAjAHDPxvEQ5gWATWN6wzQwGxp2bbAgiNzu8HR1AjQ3BQ%2BsE4Brvz7zArCtC0jnN1xKvihoG9KAGgG86TesE7gfXACAmYUQ0XkbaupYrUDGLwPFnZMtbl20AlwEEWtarlGEM%2BPIIouACPqcoNcLeGTeCD6xrXfxcQnjQUC%2B%2BTG0hcZPw1aQ7eBuCmYDTST3QOp8gPHbsBeASQhu5Mt3PssiyA5JnR8b8GSglUF7nwFkG0QDUamCU%2BcDzfksW4HoLlOAXIMpn4WKM7LaeACO%2BZGNoK9%2FVECVIDpKSzCgio8X0VyAZTslX7VlKELzBqJjNbhrQYDq8AgvG5gleYEBJXP%2BxpEdUfcAFbLJXzaRfVgMoi0QA2VL9oHqlQViHMnRMKQERlGBlrclHeEuSSBFAYkCOhFiWNueRZIFZMj%2BgCgGlChguxyG6wqk89kUfgK5LV%2F6roBxUIBivn7Dy4%2B4lOefyvddDYGz148k8yVUH4Zwej5CqXzuNcc5TJf5X8BlPgfTaTDBsUCaQ%2FoYhjtHasG7sYjz4aO9OtlyEASiMHwrO6xNBolYiL7%2FWzYcbKtP5tBmzpdxVb8zC4Ovh2HGTZnVyuB2eL2J1vinOsJBcf4cBRvhENqM6EaB7W9ge5vAejNZ3yTQaKDB9cgcChjaOULlx8jVjnYD5KzDpNVAi6tVcWot%2FDfAUsd%2F1UyHyNukqzRQdTbxM51klpDnmRwwuRiED5zlBiXI5USfv5LgCAo8FhpGGeNjQgVvsGPdtG2zRiE97no%2BZsdiR8K4Be7tqL9JYFHrGagXmFvlp%2BmJ9QfOAhFKkcuz%2BxD1OeF2xxFzYYFlujRDlC7ZZOdcSxcJSuR56dLMgXTJhsRD9TZHUcCEEAZhaAAsQ%2FxnMJE4v7zgBkeABhJywWFCXRh1VL7gaGB3wSHWABOKaWAHQwPgGwTAGmDcIgAJI8FtApBZ5mOIoEputHKc3jfFjOf29QPQe5BuJum%2B4AAAAABJRU5ErkJggg%3D%3D";var rc={},rh={};rh="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2219%22%20height%3D%2220%22%20viewBox%3D%220%200%2019%2020%22%3E%3Cpath%20fill%3D%22%23d8d8d8%22%20d%3D%22M1%208a1%201%200%200%201%200-2h8a2%202%200%201%200-1.414-3.414%201%201%200%200%201-1.414-1.414A4%204%200%201%201%209%208Zm15%202a1%201%200%201%200-.707-1.707%201%201%200%200%201-1.414-1.414A3%203%200%201%201%2016%2012H2a1%201%200%200%201%200-2Zm-1%206H1a1%201%200%200%201%200-2h14a3%203%200%201%201-2.121%205.121%201%201%200%201%201%201.414-1.414A1%201%200%201%200%2015%2016%22%2F%3E%3C%2Fsvg%3E";let rf={"clear-day":e(rc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAKlBMVEUAAAD4yz%2F81kP71UL71kD81kD81z%2F91z793Eb920L92kD92j792Tv92TexM71sAAAACHRSTlMACx9Qc5vL5%2BHfWOMAAAKCSURBVHja7ZkxFuMwCAUlSwIki%2Ftfdzcvu6YQzjdxSk%2F6GQN5KeL08PBwma3URsQswkzUatnS78ilkYj0f4y%2F9C7USk6%2FoDRzW2GMfe%2FSSrpJriwvvMCLzjXf1Z8G3owbicJysAbGfiS%2BW9RGYrgjHAzaUpgiAgNGeIjcJBSYo%2BXgehY%2BB%2BZO200%2FCMx5vbCxfBOYvMX9RhcUsALeT3yCN5QTJJs%2FMsH1QhMjNMGblgAF%2BFFgFnAAuRXAhybfvpxgCRgEFhQewAJ4SZl9u3QJBDinM6rvD06gNTbAsX9wAgucjlBP7LEBpp6OwOLTQydQVb7%2BFerrBAMHtCSPdn4BCW1Itbkndt3edxQH9uxt6C0Ukx%2BNaMDfUTuMR6h%2F6fd3RN3M5nYXhAPk%2FY72l%2B5wW8MbAAV0W0%2FwNkg%2FvDf83hFq77J8DPNfC9T1xv8nkG52Cfot0JwbL0g%2F8eMBlPyAzbDogR8H2J7aZYQGUD4L3PCDANBf9BuRwHD88QADfcAPboD0vh8HaIyx2n0%2FHkDJCXxmB34YaL%2Fz%2Bz8VFet9vx%2BoS6AAfcDv%2F1xvwB7z65YWaAf2iJ%2FSStuvM1GgpZVy1%2B%2BfwMgjoAf%2BmZNDu%2BPHG8I7wn5%2FQwbH9b6fk0%2BFete%2FJmryyRzWT3XgnOAIWG%2FPP%2FEAeITpo2CAhTKRHT%2B%2FlvQBwnJDXQj822VqgPrPj%2F71KhNi6%2FEoCdCu%2Bn1aQmS6qHcblNMPCmbHfv%2FQge2jA8cLb9UEflQgsHwXMj8kE7CD%2FWNyC%2Bq15RSj8DQU2JVLCrORTpObHqw%2FNoSCRwePD8mVsf72mzSsv0lpfGpv5WcvS3Uh8LI08rpX9Xjd%2B%2FDwcJU%2FkH3TfyEXazkAAAAASUVORK5CYII%3D"),"clear-night":e(i9),cloudy:e(re),overcast:e(re),fog:e(rt),hail:e(rd),lightning:e(rn),"lightning-rainy":e(ri),"partly-cloudy-day":e(ra),"partly-cloudy-night":e(rs),partlycloudy:e(ra),pouring:e(ro),rain:e(rl),rainy:e(rl),sleet:e(rd),snow:e(ru),snowy:e(ru),"snowy-rainy":e(rd),sunny:e(rc),wind:e(rh),windy:e(rh),"windy-variant":e(rh)};({...rf,sunny:e(i9),partlycloudy:e(rs),"lightning-rainy":e(rr)});var rm=s`
    ha-textfield,
    ha-select,
    ha-formfield,
    ha-expansion-panel,
    ha-button,
    ha-entity-picker,
    ha-icon-picker {
      margin: 8px 0;
    }
`,rv={};rv=JSON.parse('{"name":"week-planner-card","version":"1.0.12","description":"Custom Home Assistant card to display events for a number of days from one or several calendars.","source":"src/index.js","module":"dist/week-planner-card.js","targets":{"module":{"includeNodeModules":true,"optimize":true}},"scripts":{"watch":"parcel watch","build":"parcel build"},"repository":{"type":"git","url":"git+https://github.com/FamousWolf/week-planner-card.git"},"keywords":["lovelace"],"author":"Rudy Gnodde","licence":"MIT","bugs":{"url":"https://github.com/FamousWolf/week-planner-card/issues"},"homepage":"https://github.com/FamousWolf/week-planner-card","devDependencies":{"@parcel/optimizer-data-url":"^2.12.0","@parcel/transformer-inline-string":"^2.11.0","parcel":"^2.16.3","svgo":"^3.3.2"},"dependencies":{"lit":"^3.1.2","luxon":"^3.4.4"}}'),customElements.define("week-planner-card",class extends es{static styles=i7;_initialized=!1;_loading=0;_events={};_calendarEvents={};_calendars;_numberOfDays;_numberOfDaysIsMonth;_updateInterval;_noCardBackground;_eventBackground;_compact;_language;_weather;_dateFormat;_timeFormat;_multiDayTimeFormat;_multiDayMode;_locationLink;_startDate;_hideWeekend;_startingDay;_startingDayOffset;_weatherForecast=null;_showLocation;_hidePastEvents;_hideAllDayEvents;_hideDaysWithoutEvents;_hideTodayWithoutEvents;_filter;_filterText;_replaceTitleText;_combineSimilarEvents;_showLegend;_legendToggle;_actions;_columns;_loader;_showNavigation;_navigationOffset=0;_updateEventsTimeouts=[];_calendarErrors=[];static getConfigElement(){return document.createElement("week-planner-card-editor")}static getStubConfig(){return{calendars:[],days:7,startingDay:"today",startingDayOffset:0,showWeekDayText:!0,hideWeekend:!1,noCardBackground:!1,compact:!1,weather:{showCondition:!0,showTemperature:!1,showLowTemperature:!1,roundTemperature:!1,useTwiceDaily:!1},locale:"en",showLocation:!1,hidePastEvents:!1,hideDaysWithoutEvents:!1,hideTodayWithoutEvents:!1,combineSimilarEvents:!1,showLegend:!1}}static get properties(){return{_days:{type:Array},_config:{type:Object},_error:{type:String},_currentEventDetails:{type:Object},_hideCalendars:{type:Array},_showCreateEventDialog:{type:Object},_showEditEventDialog:{type:Object},_editFormData:{type:Object}}}setConfig(e){if(this._config=e,!e.calendars)throw Error("No calendars are configured");this._numberOfDaysIsMonth=this._isNumberOfDaysMonth(e.days??7),this._title=e.title??null,this._calendars=e.calendars,this._defaultCalendar=e.defaultCalendar??null,this._weather=this._getWeatherConfig(e.weather),this._numberOfDays=this._getNumberOfDays(e.days??7),this._hideWeekend=e.hideWeekend??!1,this._showNavigation=e.showNavigation??!1,this._startingDay=e.startingDay??"today",this._startingDayOffset=e.startingDayOffset??0,this._showWeekDayText=e.showWeekDayText??!0,this._startDate=this._getStartDate(),this._updateInterval=e.updateInterval??60,this._noCardBackground=e.noCardBackground??!1,this._eventBackground=e.eventBackground??"var(--card-background-color, inherit)",this._compact=e.compact??!1,this._theme=e.theme??"default",this._dayFormat=e.dayFormat??null,this._dateFormat=e.dateFormat??"cccc d LLLL yyyy",this._timeFormat=e.timeFormat??"HH:mm",this._multiDayTimeFormat=e._multiDayTimeFormat??"d LLL HH:mm",this._multiDayMode=e.multiDayMode??"default",this._locationLink=e.locationLink??"https://www.google.com/maps/search/?api=1&query=",this._showTitle=e.showTitle??!0,this._showDescription=e.showDescription??!1,this._showLocation=e.showLocation??!1,this._showTime=e.showTime??!1,this._showDayName=e.showDayName??!1,this._showDate=e.showDate??!1,this._showCalendarName=e.showCalendarName??!1,this._showWeather=e.showWeather??!0,this._showCurrentWeather=e.showCurrentWeather??!1,this._hidePastEvents=e.hidePastEvents??!1,this._hideAllDayEvents=e.hideAllDayEvents??!1,this._hideDaysWithoutEvents=e.hideDaysWithoutEvents??!1,this._hideTodayWithoutEvents=e.hideTodayWithoutEvents??!1,this._filter=e.filter??!1,this._filterText=e.filterText??!1,this._replaceTitleText=e.replaceTitleText??!1,this._combineSimilarEvents=e.combineSimilarEvents??!1,this._showLegend=e.showLegend??!1,this._legendToggle=e.legendToggle??!1,this._actions=e.actions??!1,this._columns=e.columns??{},this._dayHeaderFontSize=e.dayHeaderFontSize??null,this._dayHeaderColor=e.dayHeaderColor??null,this._maxEvents=e.maxEvents??!1,this._maxDayEvents=e.maxDayEvents??!1,this._hideCalendars=(e.calendars||[]).reduce((e,t)=>(t.initiallyHidden&&t.entity&&e.push(t.entity),e),[]),e.locale&&(eh.Settings.defaultLocale=e.locale),this._language=Object.assign({},{fullDay:"Entire day",noEvents:"No events",moreEvents:"More events",today:"Today",tomorrow:"Tomorrow",yesterday:"Yesterday",sunday:eh.Info.weekdays("long")[6],monday:eh.Info.weekdays("long")[0],tuesday:eh.Info.weekdays("long")[1],wednesday:eh.Info.weekdays("long")[2],thursday:eh.Info.weekdays("long")[3],friday:eh.Info.weekdays("long")[4],saturday:eh.Info.weekdays("long")[5]},e.texts??{})}_isNumberOfDaysMonth(e){return"month"===String(e).toLowerCase().trim()}_getWeatherConfig(e){if(!e||"string"!=typeof e&&"object"!=typeof e)return null;let t={entity:null,showCondition:!0,showTemperature:!1,showLowTemperature:!1,roundTemperature:!1};return("string"==typeof e?t.entity=e:Object.assign(t,e),t.hasOwnProperty("entity")&&null!==t.entity)?t:null}render(){this._loader||(this._loader=this._getLoader()),this._initialized||(this._initialized=!0,this._waitForHassAndConfig());let e=[];this._noCardBackground&&e.push("nobackground"),this._compact&&e.push("compact"),this._theme&&"default"!==this._theme&&e.push(this._theme);let t=["--event-background-color: "+this._eventBackground+";"];return this._columns.extraLarge&&t.push("--days-columns: "+this._columns.extraLarge+";"),this._columns.large&&t.push("--days-columns-lg: "+this._columns.large+";"),this._columns.medium&&t.push("--days-columns-md: "+this._columns.medium+";"),this._columns.small&&t.push("--days-columns-sm: "+this._columns.small+";"),this._columns.extraSmall&&t.push("--days-columns-xs: "+this._columns.extraSmall+";"),this._dayHeaderFontSize&&t.push("--day-header-font-size: "+this._dayHeaderFontSize+";"),this._dayHeaderColor&&t.push("--day-header-color: "+this._dayHeaderColor+";"),W`
            <ha-card class="${e.join(" ")}" style="${t.join(" ")}">
                <div class="card-content">
                    ${this._error?W`<div class="errors"><ha-alert alert-type="error">${this._error}</ha-alert></div>`:""}
                    ${this._title&&this._showTitle||this._showCurrentWeather?W`<div class="card-header-row">
                            ${this._title&&this._showTitle?W`<h1 class="card-title">${this._title}</h1>`:W`<div></div>`}
                            ${this._renderCurrentWeather()}
                        </div>`:""}
                    <div class="container${this._actions?" hasActions":""}" @click="${this._handleContainerClick}">
                        ${this._renderHeader()}
                        ${this._renderWeekDays()}
                        ${this._renderDays()}
                    </div>
                    ${this._renderEventDetailsDialog()}
                    ${this._renderCreateEventDialog()}
                    ${this._renderEditEventDialog()}
                    ${this._loader}
                </div>
            </ha-card>
        `}_renderHeader(){return this._showLegend||this._showNavigation?W`
            <div class="header">
                ${this._renderNavigation()}
                ${this._renderLegend()}
            </div>
        `:W``}_renderLegend(){return this._showLegend?W`
            <div class="legend">
                <ul>
                    ${this._calendars.map(e=>{if(!e.hideInLegend)return W`
                                <li class="${e.icon?"icon":"noIcon"}${this._legendToggle?" hasToggle":""}${-1===this._hideCalendars.indexOf(e.entity)?"":" hidden"}" style="--legend-calendar-color: ${e.color??"inherit"}" @click="${()=>{this._handleLegendClick(e)}}">
                                    ${e.icon?W`<ha-icon icon="${e.icon}"></ha-icon>`:""}
                                    ${e.name??e.entity}
                                </li>
                            `})}
                </ul>
            </div>
        `:W``}_renderNavigation(){return this._showNavigation?W`
            <div class="navigation">
                <ul>
                    <li @click="${this._handleNavigationPreviousClick}"><ha-icon icon="mdi:arrow-left"></ha-icon></li>
                    <li @click="${this._handleNavigationOriginalClick}"><ha-icon icon="mdi:circle-medium"></ha-icon></li>
                    <li @click="${this._handleNavigationNextClick}"><ha-icon icon="mdi:arrow-right"></ha-icon></li>
                </ul>
                <div class="month">${this._startDate.toFormat("MMMM yyyy")}</div>
            </div>
        `:W``}_renderWeekDays(){if(this._showWeekDayText||!this._days||!this._numberOfDaysIsMonth&&this._numberOfDays<7)return W``;let e=this._days.slice(0,7),t=[this._language.sunday,this._language.monday,this._language.tuesday,this._language.wednesday,this._language.thursday,this._language.friday,this._language.saturday,this._language.sunday];return W`
            ${e.map(e=>W`
                    <div class="day header">
                        <div class="date">
                            <span class="text">${t[e.date.weekday]}</span>
                        </div>
                    </div>
                `)}
        `}_renderDays(){return this._days?W`
            ${this._days.map(e=>e.isOutsideMonth?W`<div class="day ${e.class}"></div>`:this._hideDaysWithoutEvents&&0===e.events.length&&(this._hideTodayWithoutEvents||!this._isToday(e.date))?W``:W`
                    <div class="day ${e.class}" data-date="${e.date.day}" data-weekday="${e.date.weekday}" data-month="${e.date.month}" data-year="${e.date.year}" data-week="${e.date.weekNumber}">
                        <div class="date">
                            ${"skylight"===this._theme?W`
                                    <span class="skylight-day-header">
                                        <span class="day-label">${e.date.toFormat("ccc")} ${e.date.day}</span>
                                        <span class="add-event-text" @click="${t=>this._handleAddEventClick(t,e)}">+ Add Event</span>
                                    </span>
                                `:this._dayFormat?ed(e.date.toFormat(this._dayFormat)):W`
                                        <span class="number">${e.date.day}</span>
                                        ${this._showDayName||this._showWeekDayText&&!this._numberOfDaysIsMonth&&this._numberOfDays<7?W`<span class="text">${this._getWeekDayText(e.date)}</span>`:""}
                                    `}
                        </div>
                        ${this._showWeather&&e.weather?W`
                                <div class="weather" @click="${this._handleWeatherClick}">
                                    ${this._weather?.showTemperature||this._weather?.showLowTemperature?W`
                                            <div class="temperature">
                                                ${this._weather?.showTemperature?W`
                                                        <span class="high">${e.weather.temperature}</span>
                                                    `:""}
                                                ${this._weather?.showLowTemperature?W`
                                                            <span class="low">${e.weather.templow}</span>
                                                    `:""}
                                            </div>
                                        `:""}
                                    ${this._weather?.showCondition?this._getWeatherIcon(e.weather.state,e.weather.condition):""}
                                </div>
                            `:""}
                        <div class="events">
                            ${this._renderEvents(e)}
                        </div>
                        <div class="add-event" @click="${t=>this._handleAddEventClick(t,e)}">
                            <ha-icon icon="mdi:plus"></ha-icon>
                        </div>
                    </div>
                `)}
        `:W``}_renderEvents(e){let t=[];if(e.events.map(e=>{if(!this._calendarEvents[e])return;let n=Object.assign({},this._calendarEvents[e]),i=[...n.calendars],r=[...n.colors],a=0;for(;a<i.length;)this._hideCalendars.indexOf(i[a])>-1?(i.splice(a,1),r.splice(a,1)):a++;0!==i.length&&(n.calendars=i,n.colors=r,t.push(n))}),0===t.length)return this._renderNoEvents();let n=!1;return this._maxDayEvents>0&&t.length>this._maxDayEvents&&(t.splice(this._maxDayEvents),n=!0),W`
            ${t.map(e=>{let t=[e.colors[0]];return W`
                    <div
                        class="event ${e.class}"
                        data-entity="${e.calendars[0]}"
                        data-additional-entities="${e.calendars.join(",")}"
                        data-summary="${e.summary}"
                        data-location="${e.location??""}"
                        data-start-hour="${e.start.toFormat("H")}"
                        data-start-minute="${e.start.toFormat("mm")}"
                        data-end-hour="${e.end.toFormat("H")}"
                        data-end-minute="${e.end.toFormat("mm")}"
                        style="--border-color: ${e.colors[0]}; --event-bg-tint: ${e.colors[0]}; --dot-color: ${e.colors[0]}"
                        @click="${()=>{this._handleEventClick(e)}}"
                    >
                        ${e.colors.map(e=>t.indexOf(e)>-1?"":(t.push(e),W`
                                <div
                                    class="additionalColor"
                                    style="--event-additional-color: ${e}"
                                ></div>
                            `))}
                        <div class="inner">
                            ${"skylight"===this._theme?W`
                                    <div class="title">${e.summary}</div>
                                    ${this._showTime?W`<div class="time">${this._renderEventTime(e)}</div>`:""}
                                `:W`
                                    ${this._showTime?W`<div class="time">${this._renderEventTime(e)}</div>`:""}
                                    <div class="title">${e.summary}</div>
                                `}
                            ${this._showDescription?W`
                                    <div class="description">
                                        ${ed(e.description)}
                                    </div>
                                `:""}
                            ${this._showLocation&&e.location?W`
                                    <div class="location">
                                        <ha-icon icon="mdi:map-marker"></ha-icon>
                                        ${e.location}
                                    </div>
                                `:""}
                        </div>
                        ${e.icon?W`
                                <div class="icon">
                                    <ha-icon icon="${e.icon}"></ha-icon>
                                </div>
                            `:""}
                        ${"skylight"===this._theme?W`<div class="calendar-dot"></div>`:""}
                    </div>
                `})}
            ${n?W`
                    <div class="more">
                        ${this._language.moreEvents}
                    </div>
                `:""}
        `}_renderEventTime(e){return e.multiDay&&"default"!==this._multiDayMode?W`
                ${e.originalStart.toFormat(this._multiDayTimeFormat)}
                ${" - "+e.originalEnd.toFormat(this._multiDayTimeFormat)}
            `:e.fullDay?W`${this._language.fullDay}`:W`
                ${e.start.toFormat(this._timeFormat)}
                ${e.end?" - "+e.end.toFormat(this._timeFormat):""}
            `}_renderNoEvents(){return W`
            <div class="none">
                ${this._language.noEvents}
            </div>
        `}_renderCurrentWeather(){if(!this._showCurrentWeather||!this._weather)return W``;let e=this.hass?.states[this._weather.entity];if(!e)return W``;let t=e.state,n=this._weather.roundTemperature?Math.round(e.attributes.temperature):e.attributes.temperature,i=this.hass.formatEntityAttributeValue(e,"temperature",n);return W`
            <div class="current-weather" @click="${this._handleWeatherClick}">
                ${this._getWeatherIcon(t,this.hass.formatEntityState(e))}
                <span class="temperature">${i}</span>
            </div>
        `}_renderEventDetailsDialog(){return this._currentEventDetails?W`
            <ha-dialog
                open
                @closed="${this._closeDialog}"
                .heading="${this._renderEventDetailsDialogHeading()}"
            >
                <div class="content">
                    ${this._showCalendarName?W`<div class="calendar">
                            <ha-icon icon="mdi:calendar-account"></ha-icon>
                            <div class="info">
                                ${this._currentEventDetails.calendarNames.join(", ")}
                            </div>
                        </div>`:""}
                    ${this._showDate?W`<div class="datetime">
                            <ha-icon icon="mdi:calendar-clock"></ha-icon>
                            <div class="info">
                                ${this._renderEventDetailsDate()}
                            </div>
                        </div>`:""}
                    ${this._currentEventDetails.location?W`
                            <div class="location">
                                <ha-icon icon="mdi:map-marker"></ha-icon>
                                <div class="info">
                                    <a href="${this._locationLink}${encodeURI(this._currentEventDetails.location)}" target="_blank">${this._currentEventDetails.location}</a>
                                </div>
                            </div>
                        `:""}
                    ${this._currentEventDetails.description?W`
                            <div class="description">
                                ${ed(this._currentEventDetails.description)}
                            </div>
                        `:""}
                    ${this._currentEventDetails.uid?W`
                            <div class="event-actions">
                                <button class="btn btn-edit" @click="${this._handleEditEventClick}">
                                    <ha-icon icon="mdi:pencil"></ha-icon> Modifier
                                </button>
                                <button class="btn btn-delete" @click="${this._handleDeleteEvent}">
                                    <ha-icon icon="mdi:delete"></ha-icon> Supprimer
                                </button>
                            </div>
                        `:""}
                </div>
            </ha-dialog>
        `:W``}_renderEventDetailsDialogHeading(){return W`
            <div class="header_title">
                <span>${this._currentEventDetails.summary}</span>
                <ha-icon-button
                    .label="${this.hass?.localize("ui.dialogs.generic.close")??"Close"}"
                    dialogAction="close"
                    class="header_button"
                ><ha-icon icon="mdi:close"></ha-icon></ha-icon-button>
            </div>
        `}_renderEventDetailsDate(){let e=this._currentEventDetails.originalStart,t=this._currentEventDetails.originalEnd??null;if(null===t)return W`
                ${e.toFormat(this._dateFormat+" "+this._timeFormat)}
            `;if(this._isFullDay(e,t,!0))if(24>=Math.abs(e.diff(t,"hours").toObject().hours))return W`
                    ${e.toFormat(this._dateFormat)}
                `;else{let n=t.minus({seconds:1});return W`
                    ${e.toFormat(this._dateFormat)} - ${n.toFormat(this._dateFormat)}
                `}return this._isSameDay(e,t)?W`
                ${e.toFormat(this._dateFormat+" "+this._timeFormat)+" - "+t.toFormat(this._timeFormat)}
            `:W`
            ${e.toFormat(this._dateFormat+" "+this._timeFormat)} - ${t.toFormat(this._dateFormat+" "+this._timeFormat)}
        `}_renderCreateEventDialog(){if(!this._showCreateEventDialog)return W``;let e=this._showCreateEventDialog.date,t=eh.DateTime.now(),n=e.set({hour:t.hour+1,minute:0,second:0,millisecond:0}),i=n.plus({hours:1}),r=n.toFormat("yyyy-MM-dd'T'HH:mm"),a=i.toFormat("yyyy-MM-dd'T'HH:mm");return W`
            <ha-dialog
                open
                @closed="${this._closeCreateEventDialog}"
                .heading="${this._renderCreateEventDialogHeading()}"
            >
                <div class="create-event-form">
                    <div class="form-row">
                        <label for="event-title">Titre *</label>
                        <input type="text" id="event-title" class="form-input" required placeholder="Titre de l'événement" />
                    </div>
                    <div class="form-row">
                        <label for="event-calendar">Calendrier</label>
                        <select id="event-calendar" class="form-input">
                            ${this._calendars.map(e=>W`
                                <option value="${e.entity}" ?selected="${e.entity===this._defaultCalendar}">${e.name??e.entity}</option>
                            `)}
                        </select>
                    </div>
                    <div class="form-row">
                        <label for="event-start">Début *</label>
                        <input type="datetime-local" id="event-start" class="form-input" .value="${r}" required />
                    </div>
                    <div class="form-row">
                        <label for="event-end">Fin</label>
                        <input type="datetime-local" id="event-end" class="form-input" .value="${a}" />
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-cancel" @click="${this._closeCreateEventDialog}">Annuler</button>
                        <button class="btn btn-submit" @click="${this._handleCreateEvent}">Créer</button>
                    </div>
                </div>
            </ha-dialog>
        `}_renderCreateEventDialogHeading(){return W`
            <div class="header_title">
                <span>Nouvel événement</span>
                <ha-icon-button
                    .label="${this.hass?.localize("ui.dialogs.generic.close")??"Close"}"
                    dialogAction="close"
                    class="header_button"
                ><ha-icon icon="mdi:close"></ha-icon></ha-icon-button>
            </div>
        `}_renderEditEventDialog(){if(!this._showEditEventDialog||!this._editFormData)return W``;this._showEditEventDialog;let e=this._editFormData;return W`
            <ha-dialog
                open
                @closed="${this._closeEditEventDialog}"
                .heading="${this._renderEditEventDialogHeading()}"
            >
                <div class="create-event-form">
                    <div class="form-row">
                        <label for="edit-event-title">Titre *</label>
                        <input type="text" id="edit-event-title" class="form-input" required
                            .value="${e.title}"
                            @input="${e=>{this._editFormData={...this._editFormData,title:e.target.value}}}" />
                    </div>
                    <div class="form-row">
                        <label for="edit-event-calendar">Calendrier</label>
                        <select id="edit-event-calendar" class="form-input"
                            @change="${e=>{this._editFormData={...this._editFormData,calendar:e.target.value}}}">
                            ${this._calendars.map(t=>W`
                                <option value="${t.entity}" ?selected="${t.entity===e.calendar}">${t.name??t.entity}</option>
                            `)}
                        </select>
                    </div>
                    <div class="form-row">
                        <label for="edit-event-start">Début *</label>
                        <input type="datetime-local" id="edit-event-start" class="form-input" required
                            .value="${e.start}"
                            @input="${e=>{this._editFormData={...this._editFormData,start:e.target.value}}}" />
                    </div>
                    <div class="form-row">
                        <label for="edit-event-end">Fin</label>
                        <input type="datetime-local" id="edit-event-end" class="form-input"
                            .value="${e.end}"
                            @input="${e=>{this._editFormData={...this._editFormData,end:e.target.value}}}" />
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-delete" @click="${this._handleDeleteEventFromEdit}">
                            <ha-icon icon="mdi:delete"></ha-icon> Supprimer
                        </button>
                        <button class="btn btn-cancel" @click="${this._closeEditEventDialog}">Annuler</button>
                        <button class="btn btn-submit" @click="${this._handleUpdateEvent}">Enregistrer</button>
                    </div>
                </div>
            </ha-dialog>
        `}_renderEditEventDialogHeading(){return W`
            <div class="header_title">
                <span>Modifier l'événement</span>
                <ha-icon-button
                    .label="${this.hass?.localize("ui.dialogs.generic.close")??"Close"}"
                    dialogAction="close"
                    class="header_button"
                ><ha-icon icon="mdi:close"></ha-icon></ha-icon-button>
            </div>
        `}_getLoader(){let e=document.createElement("div");return e.className="loader",e.style.display="none",e}_updateLoader(){this._loading>0?this._loader.style.display="inherit":this._loader.style.display="none"}_getWeatherIcon(e,t){if(!e)return null;let n=getComputedStyle(this).getPropertyValue("--weather-icon-"+e).trim();return null!==n&&-1===["","none","inherit"].indexOf(n)?W`<div class="icon" style="background-image: var(--weather-icon-${e})"></div>`:W`
                <div class="icon">
                    <img src="${rf[e]}" alt="${t}">
                </div>
            `}_waitForHassAndConfig(){this.hass&&this._calendars?this._updateEvents():window.setTimeout(()=>{this._waitForHassAndConfig()},50)}_subscribeToWeatherForecast(){this._loading++,this._updateLoader();let e=!0;this.hass.connection.subscribeMessage(t=>{this._weatherForecast=t.forecast??[],e&&(this._loading--,e=!1)},{type:"weather/subscribe_forecast",forecast_type:this._weather.useTwiceDaily?"twice_daily":"daily",entity_id:this._weather.entity})}_updateEvents(){if(this._loading>0)return;this._loading++,this._updateLoader(),this._clearUpdateEventsTimeouts(),this._events={},this._calendarEvents={},this._startDate=this._getStartDate(),this._numberOfDaysIsMonth&&(this._numberOfDays=this._startDate.daysInMonth);let e=this._startDate,t=this._startDate.plus({days:this._numberOfDays}),n=eh.DateTime.now(),i=this._startDate.toISO();this._weather&&null===this._weatherForecast&&this._subscribeToWeatherForecast();let r=0;this._calendars.forEach(a=>{if(!a.entity||!this.hass.states[a.entity])return;a.name||(a={...a,name:this.hass.formatEntityAttributeValue(this.hass.states[a.entity],"friendly_name")}),a.sorting||(a={...a,sorting:r});let s=r;this._loading++,this.hass.callApi("get","calendars/"+a.entity+"?start="+encodeURIComponent(e.toISO())+"&end="+encodeURIComponent(t.toISO())).then(e=>{this._startDate.toISO()!==i||(this._calendarErrors[s]="",e.forEach(e=>{if(this._isFilterEvent(e,a.filter??""))return;let t=this._convertApiDate(e.start),i=this._convertApiDate(e.end);if(this._hidePastEvents&&i<n)return;let r=this._isFullDay(t,i);r||this._isSameDay(t,i)?this._addEvent(e,t,i,r,a):this._handleMultiDayEvent(e,t,i,a)})),this._loading--}).catch(e=>{this._calendarErrors[s]='Error while fetching calendar "'+a.entity+'": '+(e.error??"Unknown error"),this._loading--}),r++});let a=window.setInterval(()=>{0===this._loading&&(clearInterval(a),this._updateCard(),this._updateLoader(),this._updateEventsTimeouts.push(window.setTimeout(()=>{this._updateEvents()},1e3*this._updateInterval)))},50);this._loading--}_clearUpdateEventsTimeouts(){this._updateEventsTimeouts.forEach(e=>{clearTimeout(e)})}_isFilterEvent(e,t){return this._filter&&e.summary.match(this._filter)||t&&e.summary.match(t)}_addEvent(e,t,n,i,r,a){if(a=a??!1,this._hideWeekend&&t.weekday>=6||i&&this._hideAllDayEvents)return;let s=t.toISODate();this._events.hasOwnProperty(s)||(this._events[s]=[]);let o=this._filterEventSummary(e,r),l=t.toISO()+"-"+n.toISO()+"-"+o;this._combineSimilarEvents||(l=t.toISO()+"-"+n.toISO()+"-"+o+"-"+r.entity),this._calendarEvents.hasOwnProperty(l)?(this._calendarEvents[l].calendars.push(r.entity),this._calendarEvents[l].colors.push(r.color??"inherit"),r.name&&-1===this._calendarEvents[l].calendarNames.indexOf(r.name)&&this._calendarEvents[l].calendarNames.push(r.name),r.sorting<this._calendarEvents[l].calendarSorting&&(this._calendarEvents[l].calendarSorting=r.sorting)):(this._calendarEvents[l]={summary:o,description:e.description??null,location:e.location??null,start:t,originalStart:this._convertApiDate(e.start),end:n,originalEnd:this._convertApiDate(e.end),fullDay:i,multiDay:a,colors:[r.color??"inherit"],icon:r.icon??null,calendars:[r.entity],calendarSorting:r.sorting,calendarNames:[r.name],class:this._getEventClass(t,n,i,a),uid:e.uid??null,recurrence_id:e.recurrence_id??null},this._events[s].push(l))}_filterEventSummary(e,t){let n=t.eventTitleField?e[t.eventTitleField]:e.summary;if(!n)return"";if(t.filterText&&(n=n.replace(new RegExp(t.filterText),"")),this._filterText&&(n=n.replace(new RegExp(this._filterText),"")),t.replaceTitleText)for(let e in t.replaceTitleText){let i=t.replaceTitleText[e];n=n.replace(e,i)}if(this._replaceTitleText)for(let e in this._replaceTitleText){let t=this._replaceTitleText[e];n=n.replace(e,t)}return n}_getEventClass(e,t,n,i){let r=[],a=eh.DateTime.now();return n&&r.push("fullday"),i&&r.push("multiday"),t<a?r.push("past"):e<=a&&t>a?r.push("ongoing"):r.push("future"),r.join(" ")}_getDayClass(e){let t=[];return this._isToday(e)?t.push("today"):this._isTomorrow(e)?(t.push("tomorrow"),t.push("future")):this._isYesterday(e)?(t.push("yesterday"),t.push("past")):e>eh.DateTime.now()?t.push("future"):t.push("past"),t.push(["sunday","monday","tuesday","wednesday","thursday","friday","saturday","sunday"][e.weekday]),t.join(" ")}_handleMultiDayEvent(e,t,n,i){for(;t<n;){let r=t,a=(t=t.plus({days:1}).startOf("day"))<n?t:n;if(this._addEvent(e,r,a,this._isFullDay(r,a),i,!0),"single"===this._multiDayMode&&r>=this._startDate)break}}_updateCard(){this._error=this._calendarErrors.join("\n").trim();let e=[],t=this._weather?this.hass.states[this._weather.entity]:null,n={};this._weatherForecast?.forEach(e=>{if(e.hasOwnProperty("is_daytime")&&!1===e.is_daytime)return;let i=eh.DateTime.fromISO(e.datetime).toISODate(),r=this._weather.roundTemperature?Math.round(e.temperature):e.temperature,a=this._weather.roundTemperature?Math.round(e.templow):e.templow;n[i]={state:e.condition,condition:this.hass.formatEntityState(t,e.condition),temperature:this.hass.formatEntityAttributeValue(t,"temperature",r),templow:this.hass.formatEntityAttributeValue(t,"templow",a)}});let i=this._startDate,r=this._startDate.plus({days:this._numberOfDays}),a=null,s=String(this._startingDay).toLowerCase().trim();if(this._numberOfDaysIsMonth&&["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].includes(s)){a=i.plus({days:7}).month;let e=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].indexOf(s)+1;i=this._getWeekDayDate(i,e);let t=this._startDate.endOf("month");for(r=i;r<=t;)r=r.plus({days:7})}let o=0;for(;i<r;){if(!this._hideWeekend||i.weekday<6){let t=[],r=null!==a&&i.month!==a,s=i.toISODate();if(this._events.hasOwnProperty(s)&&!r&&(o+=(t=this._events[s].sort((e,t)=>this._calendarEvents[e].start.toISO()===this._calendarEvents[t].start.toISO()?this._calendarEvents[e].calendarSorting<this._calendarEvents[t].calendarSorting?1:this._calendarEvents[e].calendarSorting>this._calendarEvents[t].calendarSorting?-1:0:this._calendarEvents[e].start>this._calendarEvents[t].start?1:-1)).length,this._maxEvents>0&&o>this._maxEvents&&t.splice(this._maxEvents-o)),e.push({date:i,events:t,weather:r?null:n[s]??null,class:this._getDayClass(i)+(r?" outside-month":""),isOutsideMonth:r}),this._maxEvents>0&&o>=this._maxEvents)break}i=i.plus({days:1})}this._days=e}_getWeekDayText(e){return this._language.today&&this._isToday(e)?this._language.today:this._language.tomorrow&&this._isTomorrow(e)?this._language.tomorrow:this._language.yesterday&&this._isYesterday(e)?this._language.yesterday:[this._language.sunday,this._language.monday,this._language.tuesday,this._language.wednesday,this._language.thursday,this._language.friday,this._language.saturday,this._language.sunday][e.weekday]}_handleContainerClick(e){if(!this._actions)return;let t=new Event("hass-action",{bubbles:!0,composed:!0});t.detail={config:this._actions,action:"tap"},this.dispatchEvent(t),e.stopImmediatePropagation()}_handleEventClick(e){this._actions||(e.uid?(this._editFormData={title:e.summary||"",calendar:e.calendars[0]||"",start:e.originalStart?e.originalStart.toFormat("yyyy-MM-dd'T'HH:mm"):"",end:e.originalEnd?e.originalEnd.toFormat("yyyy-MM-dd'T'HH:mm"):""},this._showEditEventDialog=e):this._currentEventDetails=e)}_closeDialog(){this._currentEventDetails=null}_handleAddEventClick(e,t){e.stopImmediatePropagation(),this._showCreateEventDialog={date:t.date}}_closeCreateEventDialog(){this._showCreateEventDialog=null}async _handleCreateEvent(){let e=this.shadowRoot.querySelector("#event-title")?.value?.trim(),t=this.shadowRoot.querySelector("#event-calendar")?.value,n=this.shadowRoot.querySelector("#event-start")?.value,i=this.shadowRoot.querySelector("#event-end")?.value;if(!e||!n)return;let r=eh.DateTime.fromISO(n),a=i?eh.DateTime.fromISO(i):r.plus({hours:1});try{await this.hass.callService("calendar","create_event",{entity_id:t,summary:e,start_date_time:r.toFormat("yyyy-MM-dd HH:mm:ss"),end_date_time:a.toFormat("yyyy-MM-dd HH:mm:ss")}),this._showCreateEventDialog=null,this._updateEvents()}catch(e){console.error("Failed to create event:",e)}}async _handleDeleteEvent(){let e=this._currentEventDetails;if(e&&e.uid)try{let t={type:"calendar/event/delete",entity_id:e.calendars[0],uid:e.uid};e.recurrence_id&&(t.recurrence_id=e.recurrence_id,t.recurrence_range="THISANDFUTURE"),await this.hass.callWS(t),this._currentEventDetails=null,this._updateEvents()}catch(e){console.error("Failed to delete event:",e)}}_handleEditEventClick(){let e=this._currentEventDetails;this._currentEventDetails=null,this._editFormData={title:e.summary||"",calendar:e.calendars[0]||"",start:e.originalStart?e.originalStart.toFormat("yyyy-MM-dd'T'HH:mm"):"",end:e.originalEnd?e.originalEnd.toFormat("yyyy-MM-dd'T'HH:mm"):""},this._showEditEventDialog=e}_closeEditEventDialog(){this._showEditEventDialog=null,this._editFormData=null}async _handleDeleteEventFromEdit(){let e=this._showEditEventDialog;if(e&&e.uid)try{let t={type:"calendar/event/delete",entity_id:e.calendars[0],uid:e.uid};e.recurrence_id&&(t.recurrence_id=e.recurrence_id,t.recurrence_range="THISANDFUTURE"),await this.hass.callWS(t),this._showEditEventDialog=null,this._editFormData=null,this._updateEvents()}catch(e){console.error("Week Planner: Failed to delete event:",e)}}async _handleUpdateEvent(){let e=this._showEditEventDialog,t=this._editFormData;if(!e||!t)return void console.error("Week Planner: No event or form data for update");let n=t.title?.trim(),i=t.calendar,r=t.start,a=t.end;if(!n||!r)return void console.error("Week Planner: Missing required fields",{title:n,startInput:r});let s=eh.DateTime.fromISO(r),o=a?eh.DateTime.fromISO(a):s.plus({hours:1}),l=i||e.calendars[0];try{if(e.uid){let t={type:"calendar/event/update",entity_id:l,uid:e.uid,event:{summary:n,dtstart:s.toFormat("yyyy-MM-dd'T'HH:mm:ss"),dtend:o.toFormat("yyyy-MM-dd'T'HH:mm:ss")}};e.recurrence_id&&(t.recurrence_id=e.recurrence_id,t.recurrence_range="THISANDFUTURE"),await this.hass.callWS(t)}this._showEditEventDialog=null,this._editFormData=null,this._updateEvents()}catch(t){if("not_supported"===t.code&&e.uid)try{let t={type:"calendar/event/delete",entity_id:l,uid:e.uid};e.recurrence_id&&(t.recurrence_id=e.recurrence_id,t.recurrence_range="THISANDFUTURE"),await this.hass.callWS(t),await this.hass.callService("calendar","create_event",{entity_id:l,summary:n,start_date_time:s.toFormat("yyyy-MM-dd HH:mm:ss"),end_date_time:o.toFormat("yyyy-MM-dd HH:mm:ss")}),this._showEditEventDialog=null,this._editFormData=null,this._updateEvents()}catch(e){console.error("Week Planner: Failed to update event (fallback):",e)}else console.error("Week Planner: Failed to update event:",t)}}_handleLegendClick(e){if(!this._legendToggle)return;let t=this._hideCalendars.indexOf(e.entity),n=[...this._hideCalendars];t>-1?n.splice(t,1):n.push(e.entity),this._hideCalendars=n}_handleNavigationOriginalClick(){this._navigationOffset=0,this._updateEvents()}_handleNavigationNextClick(e){this._navigationOffset++,this._updateEvents()}_handleNavigationPreviousClick(e){this._navigationOffset--,this._updateEvents()}_handleWeatherClick(e){let t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:this._weather.entity},this.dispatchEvent(t),e.stopImmediatePropagation()}_getNumberOfDays(e){return this._numberOfDaysIsMonth&&(e=eh.DateTime.now().daysInMonth),e}_getStartDate(e){let t=eh.DateTime.now();0!==this._navigationOffset&&(t=this._numberOfDaysIsMonth?t.plus({months:this._navigationOffset}):t.plus({days:this._numberOfDays*this._navigationOffset}));let n=String(e??this._startingDay).toLowerCase().trim(),i=this._numberOfDaysIsMonth&&["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].includes(n);switch(i&&(t=t.startOf("month")),n){case"yesterday":t=t.minus({days:1});break;case"tomorrow":t=t.plus({days:1});break;case"sunday":i||(t=this._getWeekDayDate(t,7));break;case"monday":i||(t=this._getWeekDayDate(t,1));break;case"tuesday":i||(t=this._getWeekDayDate(t,2));break;case"wednesday":i||(t=this._getWeekDayDate(t,3));break;case"thursday":i||(t=this._getWeekDayDate(t,4));break;case"friday":i||(t=this._getWeekDayDate(t,5));break;case"saturday":i||(t=this._getWeekDayDate(t,6));break;case"month":t=t.startOf("month")}return 0===this._startingDayOffset||i||(t=t.plus({days:this._startingDayOffset})),this._hideWeekend&&t.weekday>=6&&(t=this._getStartDate("monday")),t.startOf("day")}_getWeekDayDate(e,t){let n=e.weekday;return n>t?e.minus({days:n-t}):n<t?e.minus({days:7-t+n}):e}_convertApiDate(e){let t=null;return e&&(e.dateTime?t=eh.DateTime.fromISO(e.dateTime):e.date&&(t=eh.DateTime.fromISO(e.date))),t}_isFullDay(e,t,n){return null!==e&&null!==t&&!(e.hour>0)&&!(e.minute>0)&&!(e.second>0)&&!(t.hour>0)&&!(t.minute>0)&&!(t.second>0)&&(n||1===Math.abs(e.diff(t,"days").toObject().days))}_isSameDay(e,t){return null===e&&null===t||null!==e&&null!==t&&e.day===t.day&&e.month===t.month&&e.year===t.year}_isToday(e){let t=eh.DateTime.now().startOf("day");return this._isSameDay(e,t)}_isTomorrow(e){let t=eh.DateTime.now().startOf("day").plus({days:1});return this._isSameDay(e,t)}_isYesterday(e){let t=eh.DateTime.now().startOf("day").minus({days:1});return this._isSameDay(e,t)}}),window.customCards=window.customCards||[],window.customCards.push({type:"week-planner-card",name:"Week Planner Card",description:"Card to display events for a number of days from one or several calendars."}),customElements.define("week-planner-card-editor",class extends es{static styles=rm;connectedCallback(){super.connectedCallback(),this.loadCustomElements()}async loadCustomElements(){customElements.get("ha-entity-picker")||await customElements.get("hui-entities-card").getConfigElement()}static get properties(){return{hass:{},_config:{}}}setConfig(e){this._config=e}render(){return this.hass&&this._config?W`
            <div style="display: flex; flex-direction: column">
                ${this.addTextField("title","Title")}
                ${this.addExpansionPanel("Calendars",W`
                        ${this.getConfigValue("calendars").map((e,t)=>W`
                                ${this.addExpansionPanel(`Calendar: ${e.name??e.entity}`,W`
                                        ${this.addEntityPickerField("calendars."+t+".entity","Entity",["calendar"])}
                                        ${this.addTextField("calendars."+t+".name","Name")}
                                        ${this.addTextField("calendars."+t+".color","Color")}
                                        ${this.addIconPickerField("calendars."+t+".icon","Icon")}
                                        ${this.addTextField("calendars."+t+".eventTitleField","Event title field","text","summary")}
                                        ${this.addTextField("calendars."+t+".filter","Filter events (regex)")}
                                        ${this.addTextField("calendars."+t+".filterText","Filter event text (regex)")}
                                        ${this.addBooleanField("calendars."+t+".hideInLegend","Hide in legend")}
                                        ${this.addBooleanField("calendars."+t+".initiallyHidden","Initially hide calendar events")}
                                        ${this.addButton("Remove calendar","mdi:trash-can",()=>{let e=JSON.parse(JSON.stringify(this._config));1===e.calendars.length?e.calendars=[]:(delete e.calendars[t],e.calendars=e.calendars.filter(Boolean)),this._config=e,this.dispatchConfigChangedEvent()})}
                                    `)}
                            `)}
                        ${this.addButton("Add calendar","mdi:plus",()=>{let e=this.getConfigValue("calendars").length;this.setConfigValue("calendars."+e,{})})}
                    `)}
                ${this.addExpansionPanel("Days",W`
                        ${this.addTextField("days","Days")}
                        ${this.addSelectField("startingDay","Starting day",[{value:"today",label:"Today"},{value:"tomorrow",label:"Tomorrow"},{value:"yesterday",label:"Yesterday"},{value:"sunday",label:"Sunday"},{value:"monday",label:"Monday"},{value:"tuesday",label:"Tuesday"},{value:"wednesday",label:"Wednesday"},{value:"thursday",label:"Thursday"},{value:"friday",label:"Friday"},{value:"saturday",label:"Saturday"},{value:"month",label:"Month"}],!0)}
                        ${this.addTextField("startingDayOffset","Starting day offset","number")}
                        ${this.addBooleanField("showWeekDayText","Show week day text",!0)}
                        ${this.addBooleanField("hideWeekend","Hide weekend")}
                        ${this.addBooleanField("hideDaysWithoutEvents","Hide days without events except for today")}
                        ${this.addBooleanField("hideTodayWithoutEvents","Also hide today without events")}
                        ${this.addTextField("maxDayEvents","Maximum number of events per day (0 is no maximum)","number",0)}
                        ${this.addBooleanField("showNavigation","Show navigation")}
                    `)}
                ${this.addExpansionPanel("Events",W`
                        ${this.addTextField("maxEvents","Maximum number of events (0 is no maximum)","number",0)}
                        ${this.addBooleanField("hidePastEvents","Hide past events")}
                        ${this.addBooleanField("hideAllDayEvents","Hide all day events")}
                        ${this.addSelectField("multiDayMode","Multi day mode",[{value:"default",label:"Default"},{value:"multiple",label:"Multiple"},{value:"single",label:"Single"}],!0)}
                        ${this.addTextField("filter","Filter events (regex)")}
                        ${this.addTextField("filterText","Filter event text (regex)")}
                        ${this.addBooleanField("combineSimilarEvents","Combine similar events")}
                        ${this.addBooleanField("showDayName","Show day name")}
                        ${this.addBooleanField("showDate","Show date in event details")}
                        ${this.addBooleanField("showTime","Show time")}
                        ${this.addBooleanField("showCalendarName","Show calendar name in event details")}
                        ${this.addBooleanField("showTitle","Show title in overview",!0)}
                        ${this.addBooleanField("showDescription","Show description in overview")}
                        ${this.addBooleanField("showLocation","Show location in overview")}
                        ${this.addTextField("locationLink","Override location link base URL")}
                    `)}
                ${this.addExpansionPanel("Date/time formats",W`
                        <p>These formats use <a href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens" target="_blank">Luxon format tokens</a></p>
                        ${this.addTextField("locale","Locale")}
                        ${this.addTextField("dateFormat","Date format")}
                        ${this.addTextField("timeFormat","Time format")}
                        ${this.addTextField("multiDayTimeFormat","Multi day time format")}
                        ${this.addTextField("dayFormat","Override day number")}
                    `)}
                ${this.addExpansionPanel("Weather",W`
                        ${this.addEntityPickerField("weather.entity","Weather entity",["weather"])}
                        ${this.addBooleanField("showCurrentWeather","Show current weather in header")}
                        ${this.addBooleanField("showWeather","Show weather in calendar",!0)}
                        ${this.addBooleanField("weather.showCondition","Show condition icon")}
                        ${this.addBooleanField("weather.showTemperature","Show temperature")}
                        ${this.addBooleanField("weather.showLowTemperature","Show low temperature")}
                        ${this.addBooleanField("weather.roundTemperature","Round temperatures to nearest integer")}
                        ${this.addBooleanField("weather.useTwiceDaily","Use twice daily if entity does not support daily")}
                    `)}
                ${this.addExpansionPanel("Override columns",W`
                        <p>The number of columns is based on the size of the card.</p>
                        ${this.addTextField("columns.extraLarge","Extra large (>= 1920px)","number")}
                        ${this.addTextField("columns.large","Large (>= 1280px)","number")}
                        ${this.addTextField("columns.medium","Medium (>= 1024px)","number")}
                        ${this.addTextField("columns.small","Small (>= 640px)","number")}
                        ${this.addTextField("columns.extraSmall","Extra small (< 640px)","number")}
                    `)}
                ${this.addExpansionPanel("Appearance",W`
                        ${this.addSelectField("theme","Theme",[{value:"default",label:"Default"},{value:"skylight",label:"Skylight"}],!0)}
                        ${this.addBooleanField("noCardBackground","No card background")}
                        ${this.addTextField("eventBackground","Override events background color")}
                        ${this.addBooleanField("compact","Compact mode")}
                    `)}
                ${this.addExpansionPanel("Legend",W`
                        ${this.addBooleanField("showLegend","Show legend")}
                        ${this.addBooleanField("legendToggle","Toggle calendars by clicking on the legend")}
                    `)}
                ${this.addExpansionPanel("Texts",W`
                        ${this.addTextField("texts.fullDay","Entire day")}
                        ${this.addTextField("texts.noEvents","No events")}
                        ${this.addTextField("texts.moreEvents","More events")}
                        ${this.addTextField("texts.today","Today")}
                        ${this.addTextField("texts.tomorrow","Tomorrow")}
                        ${this.addTextField("texts.yesterday","Yesterday")}
                        ${this.addTextField("texts.sunday","Sunday")}
                        ${this.addTextField("texts.monday","Monday")}
                        ${this.addTextField("texts.tuesday","Tuesday")}
                        ${this.addTextField("texts.wednesday","Wednesday")}
                        ${this.addTextField("texts.thursday","Thursday")}
                        ${this.addTextField("texts.friday","Friday")}
                        ${this.addTextField("texts.saturday","Saturday")}
                    `)}
                ${this.addExpansionPanel("Miscellaneous",W`
                        ${this.addTextField("updateInterval","Override update interval","number")}
                    `)}
            </div>
        `:W``}addTextField(e,t,n,i){return W`
            <ha-textfield
                name="${e}"
                label="${t??e}"
                type="${n??"text"}"
                value="${this.getConfigValue(e,i)}"
                @keyup="${this._valueChanged}"
                @change="${this._valueChanged}"
            />
        `}addEntityPickerField(e,t,n,i){return W`
            <ha-entity-picker
                .hass="${this.hass}"
                name="${e}"
                label="${t??e}"
                value="${this.getConfigValue(e,i)}"
                .includeDomains="${n}"
                @value-changed="${this._valueChanged}"
            />
        `}addIconPickerField(e,t,n){return W`
            <ha-icon-picker
                .hass="${this.hass}"
                name="${e}"
                label="${t??e}"
                value="${this.getConfigValue(e,n)}"
                @value-changed="${this._valueChanged}"
            />
        `}addSelectField(e,t,n,i,r){return W`
            <ha-select
                name="${e}"
                label="${t??e}"
                value="${this.getConfigValue(e,r)}"
                .clearable="${i}"
                @change="${this._valueChanged}"
                @closed="${e=>{e.stopPropagation()}}"
            >
                ${n.map(e=>W`
                        <mwc-list-item
                            value="${e.value}"
                        >${e.label??e.value}</mwc-list-item>
                    `)}
            </ha-select>
        `}addBooleanField(e,t,n){return W`
            <ha-formfield
                label="${t??e}"
            >
                <ha-switch
                    name="${e}"
                    .checked="${this.getConfigValue(e,n)}"
                    value="true"
                    @change="${this._valueChanged}"
                />
            </ha-formfield>
        `}addExpansionPanel(e,t,n){return W`
            <ha-expansion-panel
                header="${e}"
                .expanded="${n??!1}"
                outlined="true"
            >
                <div style="display: flex; flex-direction: column">
                    ${t}
                </div>
            </ha-expansion-panel>
        `}addButton(e,t,n){return W`
            <ha-button
                @click="${n}"
            >
                <ha-icon icon="${t}"></ha-icon>
                ${e}
            </ha-button>
        `}_valueChanged(e){let t=e.target,n=e.detail?e.detail.value??t.value??"":t.value??"";"HA-SWITCH"===t.tagName&&(n=t.checked),this.setConfigValue(t.attributes.name.value,n)}getConfigValue(e,t){return this._config?(t=t??"",e.split(".").reduce((e,n)=>e[n]??t,this._config)??t):""}setConfigValue(e,t){let n=JSON.parse(JSON.stringify(this._config)),i=e.split("."),r=i.pop(),a=i.reduce((e,t)=>(e[t]||(e[t]={}),e[t]),n);""===t?delete a[r]:a[r]=t,this._config=n,this.dispatchConfigChangedEvent()}dispatchConfigChangedEvent(){let e=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(e)}}),console.info(`%c WEEK-PLANNER-CARD %c v${rv.version} `,"color: white; background: black; font-weight: 700;","color: black; background: white; font-weight: 700;");
//# sourceMappingURL=week-planner-card.js.map
