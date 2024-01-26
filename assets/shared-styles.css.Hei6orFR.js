import{_ as s,r as x,n as l,a as w,s as F,x as u,e as O,T as p,j as tt,E as et,i as Y,b as G,c as X,d as y,w as _}from"./ripple.uo11bOlx.js";import{o as D,i as g,m as rt}from"./form-label-activation.WOp997Gu.js";import{r as it}from"./md-focus-ring.EDTuL-Ow.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class h extends F{constructor(){super(...arguments),this.disabled=!1,this.error=!1,this.focused=!1,this.label="",this.populated=!1,this.required=!1,this.resizable=!1,this.supportingText="",this.errorText="",this.count=-1,this.max=-1,this.hasStart=!1,this.hasEnd=!1,this.isAnimating=!1,this.refreshErrorAlert=!1,this.disableTransitions=!1}get counterText(){const t=this.count??-1,r=this.max??-1;return t<0||r<=0?"":`${t} / ${r}`}get supportingOrErrorText(){return this.error&&this.errorText?this.errorText:this.supportingText}reannounceError(){this.refreshErrorAlert=!0}update(t){t.has("disabled")&&t.get("disabled")!==void 0&&(this.disableTransitions=!0),this.disabled&&this.focused&&(t.set("focused",!0),this.focused=!1),this.animateLabelIfNeeded({wasFocused:t.get("focused"),wasPopulated:t.get("populated")}),super.update(t)}render(){var a,n,c;const t=this.renderLabel(!0),r=this.renderLabel(!1),e=(a=this.renderOutline)==null?void 0:a.call(this,t),o={disabled:this.disabled,"disable-transitions":this.disableTransitions,error:this.error&&!this.disabled,focused:this.focused,"with-start":this.hasStart,"with-end":this.hasEnd,populated:this.populated,resizable:this.resizable,required:this.required,"no-label":!this.label};return u`
      <div class="field ${O(o)}">
        <div class="container-overflow">
          ${(n=this.renderBackground)==null?void 0:n.call(this)} ${(c=this.renderIndicator)==null?void 0:c.call(this)} ${e}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${r} ${e?p:t}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `}updated(t){(t.has("supportingText")||t.has("errorText")||t.has("count")||t.has("max"))&&this.updateSlottedAriaDescribedBy(),this.refreshErrorAlert&&requestAnimationFrame(()=>{this.refreshErrorAlert=!1}),this.disableTransitions&&requestAnimationFrame(()=>{this.disableTransitions=!1})}renderSupportingText(){const{supportingOrErrorText:t,counterText:r}=this;if(!t&&!r)return p;const e=u`<span>${t}</span>`,o=r?u`<span class="counter">${r}</span>`:p,n=this.error&&this.errorText&&!this.refreshErrorAlert?"alert":p;return u`
      <div class="supporting-text" role=${n}>${e}${o}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `}updateSlottedAriaDescribedBy(){for(const t of this.slottedAriaDescribedBy)tt(u`${this.supportingOrErrorText} ${this.counterText}`,t),t.setAttribute("hidden","")}renderLabel(t){if(!this.label)return p;let r;t?r=this.focused||this.populated||this.isAnimating:r=!this.focused&&!this.populated&&!this.isAnimating;const e={hidden:!r,floating:t,resting:!t},o=`${this.label}${this.required?"*":""}`;return u`
      <span class="label ${O(e)}" aria-hidden=${!r}
        >${o}</span
      >
    `}animateLabelIfNeeded({wasFocused:t,wasPopulated:r}){var a,n,c;if(!this.label)return;t??(t=this.focused),r??(r=this.populated);const e=t||r,o=this.focused||this.populated;e!==o&&(this.isAnimating=!0,(a=this.labelAnimation)==null||a.cancel(),this.labelAnimation=(n=this.floatingLabelEl)==null?void 0:n.animate(this.getLabelKeyframes(),{duration:150,easing:et.STANDARD}),(c=this.labelAnimation)==null||c.addEventListener("finish",()=>{this.isAnimating=!1}))}getLabelKeyframes(){const{floatingLabelEl:t,restingLabelEl:r}=this;if(!t||!r)return[];const{x:e,y:o,height:a}=t.getBoundingClientRect(),{x:n,y:c,height:b}=r.getBoundingClientRect(),f=t.scrollWidth,T=r.scrollWidth,m=T/f,J=n-e,Q=c-o+Math.round((b-a*m)/2),q=`translateX(${J}px) translateY(${Q}px) scale(${m})`,N="translateX(0) translateY(0) scale(1)",U=r.clientWidth,A=T>U?`${U/m}px`:"";return this.focused||this.populated?[{transform:q,width:A},{transform:N,width:A}]:[{transform:N,width:A},{transform:q,width:A}]}getSurfacePositionClientRect(){return this.containerEl.getBoundingClientRect()}}s([l({type:Boolean})],h.prototype,"disabled",void 0);s([l({type:Boolean})],h.prototype,"error",void 0);s([l({type:Boolean})],h.prototype,"focused",void 0);s([l()],h.prototype,"label",void 0);s([l({type:Boolean})],h.prototype,"populated",void 0);s([l({type:Boolean})],h.prototype,"required",void 0);s([l({type:Boolean})],h.prototype,"resizable",void 0);s([l({attribute:"supporting-text"})],h.prototype,"supportingText",void 0);s([l({attribute:"error-text"})],h.prototype,"errorText",void 0);s([l({type:Number})],h.prototype,"count",void 0);s([l({type:Number})],h.prototype,"max",void 0);s([l({type:Boolean,attribute:"has-start"})],h.prototype,"hasStart",void 0);s([l({type:Boolean,attribute:"has-end"})],h.prototype,"hasEnd",void 0);s([D({slot:"aria-describedby"})],h.prototype,"slottedAriaDescribedBy",void 0);s([x()],h.prototype,"isAnimating",void 0);s([x()],h.prototype,"refreshErrorAlert",void 0);s([x()],h.prototype,"disableTransitions",void 0);s([w(".label.floating")],h.prototype,"floatingLabelEl",void 0);s([w(".label.resting")],h.prototype,"restingLabelEl",void 0);s([w(".container")],h.prototype,"containerEl",void 0);/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */const Et=Y`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start,.with-end .end{min-width:48px}.with-start .start{margin-inline-end:4px}.with-end .end{margin-inline-start:4px}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}/*# sourceMappingURL=shared-styles.css.map */
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=Symbol.for(""),ot=i=>{if((i==null?void 0:i.r)===K)return i==null?void 0:i._$litStatic$},It=(i,...t)=>({_$litStatic$:t.reduce((r,e,o)=>r+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(e)+i[o+1],i[0]),r:K}),P=new Map,st=i=>(t,...r)=>{const e=r.length;let o,a;const n=[],c=[];let b,f=0,T=!1;for(;f<e;){for(b=t[f];f<e&&(a=r[f],(o=ot(a))!==void 0);)b+=o+t[++f],T=!0;f!==e&&c.push(a),n.push(b),f++}if(f===e&&n.push(t[e]),T){const m=n.join("$$lit$$");(t=P.get(m))===void 0&&(n.raw=n,P.set(m,t=n)),r=c}return i(t,...r)},nt=st(u);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=i=>i.strings===void 0,lt={},dt=(i,t=lt)=>i._$AH=t;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=G(class extends X{constructor(i){if(super(i),i.type!==y.PROPERTY&&i.type!==y.ATTRIBUTE&&i.type!==y.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!at(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===_||t===p)return t;const r=i.element,e=i.name;if(i.type===y.PROPERTY){if(t===r[e])return _}else if(i.type===y.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(e))return _}else if(i.type===y.ATTRIBUTE&&r.getAttribute(e)===t+"")return _;return dt(i),t}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z="important",ct=" !"+Z,H=G(class extends X{constructor(i){var t;if(super(i),i.type!==y.ATTRIBUTE||i.name!=="style"||((t=i.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce((t,r)=>{const e=i[r];return e==null?t:t+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${e};`},"")}update(i,[t]){const{style:r}=i.element;if(this.ut===void 0)return this.ut=new Set(Object.keys(t)),this.render(t);for(const e of this.ut)t[e]==null&&(this.ut.delete(e),e.includes("-")?r.removeProperty(e):r[e]=null);for(const e in t){const o=t[e];if(o!=null){this.ut.add(e);const a=typeof o=="string"&&o.endsWith(ct);e.includes("-")||a?r.setProperty(e,a?o.slice(0,-11):o,a?Z:""):r[e]=o}}return _}});/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const pt={fromAttribute(i){return i??""},toAttribute(i){return i||null}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ht(i,t){t.bubbles&&(!i.shadowRoot||t.composed)&&t.stopPropagation();const r=Reflect.construct(t.constructor,[t.type,t]),e=i.dispatchEvent(r);return e||t.preventDefault(),e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const M=Symbol("createValidator"),z=Symbol("getValidityAnchor"),R=Symbol("privateValidator"),v=Symbol("privateSyncValidity"),E=Symbol("privateCustomValidationMessage");function ut(i){var t;class r extends i{constructor(){super(...arguments),this[t]=""}get validity(){return this[v](),this[g].validity}get validationMessage(){return this[v](),this[g].validationMessage}get willValidate(){return this[v](),this[g].willValidate}checkValidity(){return this[v](),this[g].checkValidity()}reportValidity(){return this[v](),this[g].reportValidity()}setCustomValidity(o){this[E]=o,this[v]()}requestUpdate(o,a,n){super.requestUpdate(o,a,n),this[v]()}firstUpdated(o){super.firstUpdated(o),this[v]()}[(t=E,v)](){this[R]||(this[R]=this[M]());const{validity:o,validationMessage:a}=this[R].getValidity(),n=!!this[E],c=this[E]||a;this[g].setValidity({...o,customError:n},c,this[z]()??void 0)}[M](){throw new Error("Implement [createValidator]")}[z](){throw new Error("Implement [getValidityAnchor]")}}return r}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const V=Symbol("getFormValue"),j=Symbol("getFormState");function ft(i){class t extends i{get form(){return this[g].form}get labels(){return this[g].labels}get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",e)}attributeChangedCallback(e,o,a){if(e==="name"||e==="disabled"){const n=e==="disabled"?o!==null:o;this.requestUpdate(e,n);return}super.attributeChangedCallback(e,o,a)}requestUpdate(e,o,a){super.requestUpdate(e,o,a),this[g].setFormValue(this[V](),this[j]())}[V](){throw new Error("Implement [getFormValue]")}[j](){return this[V]()}formDisabledCallback(e){this.disabled=e}}return t.formAssociated=!0,s([l({noAccessor:!0})],t.prototype,"name",null),s([l({type:Boolean,noAccessor:!0})],t.prototype,"disabled",null),t}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const B=Symbol("onReportValidity"),I=Symbol("privateCleanupFormListeners"),S=Symbol("privateDoNotReportInvalid"),C=Symbol("privateIsSelfReportingValidity"),L=Symbol("privateCallOnReportValidity");function gt(i){var t,r,e;class o extends i{constructor(...n){super(...n),this[t]=new AbortController,this[r]=!1,this[e]=!1,this.addEventListener("invalid",c=>{this[S]||!c.isTrusted||this.addEventListener("invalid",()=>{this[L](c)},{once:!0})},{capture:!0})}checkValidity(){this[S]=!0;const n=super.checkValidity();return this[S]=!1,n}reportValidity(){this[C]=!0;const n=super.reportValidity();return n&&this[L](null),this[C]=!1,n}[(t=I,r=S,e=C,L)](n){const c=n==null?void 0:n.defaultPrevented;c||(this[B](n),!(!c&&(n==null?void 0:n.defaultPrevented)))||(this[C]||yt(this[g].form,this))&&this.focus()}[B](n){throw new Error("Implement [onReportValidity]")}formAssociatedCallback(n){super.formAssociatedCallback&&super.formAssociatedCallback(n),this[I].abort(),n&&(this[I]=new AbortController,vt(this,n,()=>{this[L](null)},this[I].signal))}}return o}function vt(i,t,r,e){const o=bt(t);let a=!1,n,c=!1;o.addEventListener("before",()=>{c=!0,n=new AbortController,a=!1,i.addEventListener("invalid",()=>{a=!0},{signal:n.signal})},{signal:e}),o.addEventListener("after",()=>{c=!1,n==null||n.abort(),!a&&r()},{signal:e}),t.addEventListener("submit",()=>{c||r()},{signal:e})}const k=new WeakMap;function bt(i){if(!k.has(i)){const t=new EventTarget;k.set(i,t);for(const r of["reportValidity","requestSubmit"]){const e=i[r];i[r]=function(){t.dispatchEvent(new Event("before"));const o=Reflect.apply(e,this,arguments);return t.dispatchEvent(new Event("after")),o}}}return k.get(i)}function yt(i,t){if(!i)return!0;let r;for(const e of i.elements)if(e.matches(":invalid")){r=e;break}return r===t}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class xt{constructor(t){this.getCurrentState=t,this.currentValidity={validity:{},validationMessage:""}}getValidity(){const t=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,t)))return this.currentValidity;const{validity:e,validationMessage:o}=this.computeValidity(t);return this.prevState=this.copy(t),this.currentValidity={validationMessage:o,validity:{badInput:e.badInput,customError:e.customError,patternMismatch:e.patternMismatch,rangeOverflow:e.rangeOverflow,rangeUnderflow:e.rangeUnderflow,stepMismatch:e.stepMismatch,tooLong:e.tooLong,tooShort:e.tooShort,typeMismatch:e.typeMismatch,valueMissing:e.valueMissing}},this.currentValidity}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class mt extends xt{computeValidity({state:t,renderedControl:r}){let e=r;$(t)&&!e?(e=this.inputControl||document.createElement("input"),this.inputControl=e):e||(e=this.textAreaControl||document.createElement("textarea"),this.textAreaControl=e);const o=$(t)?e:null;if(o&&(o.type=t.type),e.value!==t.value&&(e.value=t.value),e.required=t.required,o){const a=t;a.pattern?o.pattern=a.pattern:o.removeAttribute("pattern"),a.min?o.min=a.min:o.removeAttribute("min"),a.max?o.max=a.max:o.removeAttribute("max"),a.step?o.step=a.step:o.removeAttribute("step")}return(t.minLength??-1)>-1?e.setAttribute("minlength",String(t.minLength)):e.removeAttribute("minlength"),(t.maxLength??-1)>-1?e.setAttribute("maxlength",String(t.maxLength)):e.removeAttribute("maxlength"),{validity:e.validity,validationMessage:e.validationMessage}}equals({state:t},{state:r}){const e=t.type===r.type&&t.value===r.value&&t.required===r.required&&t.minLength===r.minLength&&t.maxLength===r.maxLength;return!$(t)||!$(r)?e:e&&t.pattern===r.pattern&&t.min===r.min&&t.max===r.max&&t.step===r.step}copy({state:t}){return{state:$(t)?this.copyInput(t):this.copyTextArea(t),renderedControl:null}}copyInput(t){const{type:r,pattern:e,min:o,max:a,step:n}=t;return{...this.copySharedState(t),type:r,pattern:e,min:o,max:a,step:n}}copyTextArea(t){return{...this.copySharedState(t),type:t.type}}copySharedState({value:t,required:r,minLength:e,maxLength:o}){return{value:t,required:r,minLength:e,maxLength:o}}}function $(i){return i.type!=="textarea"}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Tt=gt(ut(ft(rt(F))));class d extends Tt{constructor(){super(...arguments),this.error=!1,this.errorText="",this.label="",this.required=!1,this.value="",this.prefixText="",this.suffixText="",this.hasLeadingIcon=!1,this.hasTrailingIcon=!1,this.supportingText="",this.textDirection="",this.rows=2,this.cols=20,this.inputMode="",this.max="",this.maxLength=-1,this.min="",this.minLength=-1,this.noSpinner=!1,this.pattern="",this.placeholder="",this.readOnly=!1,this.multiple=!1,this.step="",this.type="text",this.autocomplete="",this.dirty=!1,this.focused=!1,this.nativeError=!1,this.nativeErrorText=""}get selectionDirection(){return this.getInputOrTextarea().selectionDirection}set selectionDirection(t){this.getInputOrTextarea().selectionDirection=t}get selectionEnd(){return this.getInputOrTextarea().selectionEnd}set selectionEnd(t){this.getInputOrTextarea().selectionEnd=t}get selectionStart(){return this.getInputOrTextarea().selectionStart}set selectionStart(t){this.getInputOrTextarea().selectionStart=t}get valueAsNumber(){const t=this.getInput();return t?t.valueAsNumber:NaN}set valueAsNumber(t){const r=this.getInput();r&&(r.valueAsNumber=t,this.value=r.value)}get valueAsDate(){const t=this.getInput();return t?t.valueAsDate:null}set valueAsDate(t){const r=this.getInput();r&&(r.valueAsDate=t,this.value=r.value)}get hasError(){return this.error||this.nativeError}select(){this.getInputOrTextarea().select()}setRangeText(...t){this.getInputOrTextarea().setRangeText(...t),this.value=this.getInputOrTextarea().value}setSelectionRange(t,r,e){this.getInputOrTextarea().setSelectionRange(t,r,e)}stepDown(t){const r=this.getInput();r&&(r.stepDown(t),this.value=r.value)}stepUp(t){const r=this.getInput();r&&(r.stepUp(t),this.value=r.value)}reset(){this.dirty=!1,this.value=this.getAttribute("value")??"",this.nativeError=!1,this.nativeErrorText=""}attributeChangedCallback(t,r,e){t==="value"&&this.dirty||super.attributeChangedCallback(t,r,e)}render(){const t={disabled:this.disabled,error:!this.disabled&&this.hasError,textarea:this.type==="textarea","no-spinner":this.noSpinner};return u`
      <span class="text-field ${O(t)}">
        ${this.renderField()}
      </span>
    `}updated(t){const r=this.getInputOrTextarea().value;this.value!==r&&(this.value=r)}renderField(){return nt`<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${this.type==="textarea"}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
    </${this.fieldTag}>`}renderLeadingIcon(){return u`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderTrailingIcon(){return u`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderInputOrTextarea(){const t={direction:this.textDirection},r=this.ariaLabel||this.label||p,e=this.autocomplete,o=(this.maxLength??-1)>-1,a=(this.minLength??-1)>-1;if(this.type==="textarea")return u`
        <textarea
          class="input"
          style=${H(t)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${r}
          autocomplete=${e||p}
          ?disabled=${this.disabled}
          maxlength=${o?this.maxLength:p}
          minlength=${a?this.minLength:p}
          placeholder=${this.placeholder||p}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${W(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;const n=this.renderPrefix(),c=this.renderSuffix(),b=this.inputMode;return u`
      <div class="input-wrapper">
        ${n}
        <input
          class="input"
          style=${H(t)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${r}
          autocomplete=${e||p}
          ?disabled=${this.disabled}
          inputmode=${b||p}
          max=${this.max||p}
          maxlength=${o?this.maxLength:p}
          min=${this.min||p}
          minlength=${a?this.minLength:p}
          pattern=${this.pattern||p}
          placeholder=${this.placeholder||p}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step||p}
          type=${this.type}
          .value=${W(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${c}
      </div>
    `}renderPrefix(){return this.renderAffix(this.prefixText,!1)}renderSuffix(){return this.renderAffix(this.suffixText,!0)}renderAffix(t,r){return t?u`<span class="${O({suffix:r,prefix:!r})}">${t}</span>`:p}getErrorText(){return this.error?this.errorText:this.nativeErrorText}handleFocusChange(){var t;this.focused=((t=this.inputOrTextarea)==null?void 0:t.matches(":focus"))??!1}handleInput(t){this.dirty=!0,this.value=t.target.value}redispatchEvent(t){ht(this,t)}getInputOrTextarea(){return this.inputOrTextarea||(this.connectedCallback(),this.scheduleUpdate()),this.isUpdatePending&&this.scheduleUpdate(),this.inputOrTextarea}getInput(){return this.type==="textarea"?null:this.getInputOrTextarea()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0,this.hasTrailingIcon=this.trailingIcons.length>0}[V](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(t){this.value=t}focus(){this.getInputOrTextarea().focus()}[M](){return new mt(()=>({state:this,renderedControl:this.inputOrTextarea}))}[z](){return this.inputOrTextarea}[B](t){var e;t==null||t.preventDefault();const r=this.getErrorText();this.nativeError=!!t,this.nativeErrorText=this.validationMessage,r===this.getErrorText()&&((e=this.field)==null||e.reannounceError())}}it(d);d.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0};s([l({type:Boolean,reflect:!0})],d.prototype,"error",void 0);s([l({attribute:"error-text"})],d.prototype,"errorText",void 0);s([l()],d.prototype,"label",void 0);s([l({type:Boolean,reflect:!0})],d.prototype,"required",void 0);s([l()],d.prototype,"value",void 0);s([l({attribute:"prefix-text"})],d.prototype,"prefixText",void 0);s([l({attribute:"suffix-text"})],d.prototype,"suffixText",void 0);s([l({type:Boolean,attribute:"has-leading-icon"})],d.prototype,"hasLeadingIcon",void 0);s([l({type:Boolean,attribute:"has-trailing-icon"})],d.prototype,"hasTrailingIcon",void 0);s([l({attribute:"supporting-text"})],d.prototype,"supportingText",void 0);s([l({attribute:"text-direction"})],d.prototype,"textDirection",void 0);s([l({type:Number})],d.prototype,"rows",void 0);s([l({type:Number})],d.prototype,"cols",void 0);s([l({reflect:!0})],d.prototype,"inputMode",void 0);s([l()],d.prototype,"max",void 0);s([l({type:Number})],d.prototype,"maxLength",void 0);s([l()],d.prototype,"min",void 0);s([l({type:Number})],d.prototype,"minLength",void 0);s([l({type:Boolean,attribute:"no-spinner"})],d.prototype,"noSpinner",void 0);s([l()],d.prototype,"pattern",void 0);s([l({reflect:!0,converter:pt})],d.prototype,"placeholder",void 0);s([l({type:Boolean,reflect:!0})],d.prototype,"readOnly",void 0);s([l({type:Boolean,reflect:!0})],d.prototype,"multiple",void 0);s([l()],d.prototype,"step",void 0);s([l({reflect:!0})],d.prototype,"type",void 0);s([l({reflect:!0})],d.prototype,"autocomplete",void 0);s([x()],d.prototype,"dirty",void 0);s([x()],d.prototype,"focused",void 0);s([x()],d.prototype,"nativeError",void 0);s([x()],d.prototype,"nativeErrorText",void 0);s([w(".input")],d.prototype,"inputOrTextarea",void 0);s([w(".field")],d.prototype,"field",void 0);s([D({slot:"leading-icon"})],d.prototype,"leadingIcons",void 0);s([D({slot:"trailing-icon"})],d.prototype,"trailingIcons",void 0);/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */const St=Y`:host{display:inline-flex;outline:none;resize:both;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}.icon{color:currentColor;display:flex;fill:currentColor}.icon ::slotted(*){display:flex}[hasstart] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[hasend] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}/*# sourceMappingURL=shared-styles.css.map */
`;export{h as F,d as T,xt as V,It as a,St as b,ft as c,j as d,M as e,z as f,V as g,ut as m,H as o,ht as r,Et as s};
