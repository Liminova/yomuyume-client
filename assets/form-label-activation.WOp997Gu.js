import{f as m}from"./ripple.uo11bOlx.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function E(t){return(e,a)=>{const{slot:i,selector:l}=t??{},u="slot"+(i?`[name=${i}]`:":not([name])");return m(e,a,{get(){var c;const n=(c=this.renderRoot)==null?void 0:c.querySelector(u),o=(n==null?void 0:n.assignedElements(t))??[];return l===void 0?o:o.filter(f=>f.matches(l))}})}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const h=Symbol("internals"),s=Symbol("privateInternals");function b(t){class e extends t{get[h](){return this[s]||(this[s]=this.attachInternals()),this[s]}}return e}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function v(t){const e=new MouseEvent("click",{bubbles:!0});return t.dispatchEvent(e),e}function I(t){return t.currentTarget!==t.target||t.composedPath()[0]!==t.target||t.target.disabled?!1:!d(t)}function d(t){const e=r;return e&&(t.preventDefault(),t.stopImmediatePropagation()),p(),e}let r=!1;async function p(){r=!0,await null,r=!1}export{I as a,v as d,h as i,b as m,E as o};
