import{J as o,r as l,j as e,i as x}from"./index-C3_MdCAa.js";function d(){var i;const{id:t}=o(),[s,n]=l.useState(),r="font-b2-regular text-grayoe-100";return l.useEffect(()=>{(async()=>{try{const a=await x.get(`/api/recipe?id=${t}`);n(a==null?void 0:a.data)}catch(a){console.error("Error fetching data:",a)}})()},[t]),e.jsx("section",{className:"xl:w-[864px] mx-auto",children:s&&e.jsxs(e.Fragment,{children:[e.jsx("img",{src:s.recipeImg,alt:s.title,className:" xl:h-[600px] w-full xl:object-cover"}),e.jsxs("div",{className:"mx-6 my-[34px]",children:[e.jsx("h5",{className:"font-h5 mb-2",children:s.title}),e.jsx("p",{className:"font-b1-regular",children:s.tip})]}),e.jsx("div",{className:"h-2 bg-grayoe-900 mb-6"}),e.jsxs("div",{className:"mx-6 border-b border-grayoe-900 pb-4 mb-4",children:[e.jsx("p",{className:r,children:"재료"}),e.jsx("p",{children:s.ingredients})]}),e.jsxs("div",{className:"mx-6 mb-6",children:[e.jsx("p",{className:r,children:"조리과정"}),e.jsx("ul",{children:(i=s.manualList)==null?void 0:i.map(c=>e.jsx("li",{children:c.content},c.order))})]})]})})}export{d as default};