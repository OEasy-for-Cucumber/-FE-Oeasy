import{c as m,e as h,v as g,r as x,j as i,L as w,i as j,l as E,A as L}from"./index-C_I1pbpq.js";function T(){const{setUser:d,setIsLoggedIn:l}=m.getState(),p=h(),u=g(),a=new URLSearchParams(u.search).get("code"),f=encodeURIComponent(a);return x.useEffect(()=>{(async()=>{var s,o,t;try{const e=await j.post(`/login/kakao/callback?code=${f}`,{headers:{"Content-Type":"application/json"}}),{accessToken:n,email:r,nickname:c,memberPk:k}=e.data;if(E.set("accessToken",e.data.accessToken),n&&r&&c)d({accessToken:n,email:r,nickname:c,memberPk:k}),l(!0),p("/");else throw new Error("카카오 로그인에서 받은 응답 데이터가 올바르지 않습니다.")}catch(e){e instanceof L?console.error("Kakao login failed:",{status:(s=e.response)==null?void 0:s.status,data:(o=e.response)==null?void 0:o.data,headers:(t=e.response)==null?void 0:t.headers}):console.error("Unknown error occurred:",e)}})()},[a]),i.jsx("div",{className:"w-full",children:i.jsx(w,{})})}export{T as default};
