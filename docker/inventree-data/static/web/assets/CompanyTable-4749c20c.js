import{r as m,j as e,G as f,h as x,i as l}from"./vendor-580d7f6a.js";import{A as h}from"./AddItemButton-9bde5586.js";import{T}from"./Instance-4f17d9b0.js";import{a as j,A as p,U as c,i as y}from"./index-539d0685.js";import{c as A}from"./CompanyForms-f616143f.js";import{a as k}from"./UseForm-5e9a21d6.js";import{u as C,I as _}from"./InvenTreeTable-7dffc519.js";import{D as g}from"./ColumnRenderers-c7f5177c.js";import{u as R}from"./DesktopAppView-f36ad07f.js";function w({params:o,path:t}){const r=C("company"),n=R(),a=j(),u=m.useMemo(()=>[{accessor:"name",sortable:!0,render:s=>e.jsxs(f,{spacing:"xs",noWrap:!0,children:[e.jsx(T,{src:s.thumbnail??s.image??"",alt:s.name,size:24}),e.jsx(x,{children:s.name})]})},g({}),{accessor:"website",sortable:!1}],[]),i=k({url:p.company_list,title:l._({id:"TsXckK"}),fields:A(),initialData:o,onFormSuccess:s=>{s.pk?n(`/${t??"company"}/${s.pk}`):r.refreshTable()}}),d=m.useMemo(()=>{const s=a.hasAddRole(c.purchase_order)||a.hasAddRole(c.sales_order);return[e.jsx(h,{tooltip:l._({id:"5blzdE"}),onClick:()=>i.open(),hidden:!s})]},[a]);return e.jsxs(e.Fragment,{children:[i.modal,e.jsx(_,{url:y(p.company_list),tableState:r,columns:u,props:{params:{...o},tableActions:d,onRowClick:s=>{s.pk&&n(`/${t??"company"}/${s.pk}`)}}})]})}export{w as C};
