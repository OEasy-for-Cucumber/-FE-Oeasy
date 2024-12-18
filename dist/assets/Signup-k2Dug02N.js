import{j as A,I as F,P as E,c as Q,r as t,e as q,d as _,B as w,i as x,l as m}from"./index-JxLw885_.js";function AA({email:e,setEmail:a=()=>{},isEmail:l,emailMsg:o,emailChangeHandler:n=()=>{}}){const r=()=>{a("")};return A.jsx("div",{className:"w-full",children:A.jsxs("div",{children:[A.jsx("p",{className:"text-lg mb-4",children:"이메일을 입력해주세요"}),A.jsx("p",{className:`${l?"text-grayoe-300":"redoe"} ${e?"label-visible":"label-hidden"} base-label`,children:"이메일"}),A.jsx(F,{value:e,onChange:n,type:"email",placeholder:"이메일",isValid:l,onClick:r}),A.jsx("p",{className:`redoe ${l===!1&&e!==""?"label-visible":"label-hidden"} base-label mt-1`,children:o})]})})}function eA({password:e,isPassword:a,passwordMsg:l,passwordChangeHandler:o=()=>{},confirmPassword:n,isConfirmPassword:r,confirmPasswordMsg:b,confirmPasswordChangeHandler:g=()=>{}}){return A.jsx(A.Fragment,{children:A.jsx("div",{className:"w-full flex-col flex",children:A.jsxs("div",{className:"flex-grow",children:[A.jsx("p",{className:"text-lg mb-4",children:"비밀번호를 입력해주세요"}),A.jsx("p",{className:`${a?"text-grayoe-300":"redoe"} ${e?"label-visible":"label-hidden"} base-label`,children:"비밀번호"}),A.jsx(E,{value:e,minLength:8,onChange:o,type:"password",placeholder:"비밀번호",isValid:a}),A.jsx("p",{className:`redoe ${a===!1&&e!==""?"label-visible":"label-hidden"} base-label`,children:l}),A.jsx("p",{className:`${r?"text-grayoe-300":"redoe"} ${n?"label-visible":"label-hidden"} base-label`,children:"비밀번호 재입력"}),A.jsx(E,{value:n,minLength:8,onChange:g,type:"password",placeholder:"비밀번호 재입력",isValid:r}),A.jsx("p",{className:`redoe ${r===!1&&n!==""?"label-visible":"label-hidden"} base-label`,children:b})]})})})}function sA({nickname:e,setNickname:a=()=>{},isNickname:l,nicknameMsg:o,nicknameChangeHandler:n=()=>{}}){const r=()=>{a("")};return A.jsx(A.Fragment,{children:A.jsxs("div",{children:[A.jsx("p",{className:"text-lg mb-4",children:"닉네임을 입력해주세요"}),A.jsx("p",{className:`${l?"text-grayoe-300":"redoe"} ${e?"label-visible":"label-hidden"} base-label`,children:"닉네임"}),A.jsx(F,{value:e,maxLength:8,onChange:n,type:"text",placeholder:"닉네임",isValid:l,onClick:r}),A.jsx("p",{className:`redoe ${l===!1&&e!==""?"label-visible":"label-hidden"} base-label mt-1`,children:o})]})})}const aA="/assets/congratulation-2H5Q7An2.webp";function tA(){const e=Q(a=>a.user);return A.jsxs("div",{className:"w-full text-center grid justify-center mt-[56px]",children:[A.jsx("img",{className:"w-[147px] mx-auto mt-10",src:aA,alt:"환영하는오이"}),A.jsxs("p",{className:"font-b1-semibold mt-6",children:[e==null?void 0:e.nickname,"님"]}),A.jsx("h4",{className:"font-h4",children:"가입을 환영합니다!"})]})}function lA({step:e}){const a=()=>{switch(e){case"이메일":return 33;case"비밀번호":return 66;case"닉네임":return 100;default:return 0}};return e==="가입완료"?null:A.jsx("div",{className:"w-full py-[32px]",children:A.jsx("div",{className:"w-[168px] mx-auto bg-[#EEFFF4] rounded-full h-[4px]",children:A.jsx("div",{className:"bg-green-500 h-[4px] rounded-full transition-all duration-300",style:{width:`${a()}%`}})})})}const nA="data:image/webp;base64,UklGRg4DAABXRUJQVlA4WAoAAAAgAAAAEwAAEwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggIAEAADAIAJ0BKhQAFAA+bTKVR6QioiEoCACADYlsAJ0yhHA3lf4zfgB0Qu+O4BmFd8AdKjXAFBtuyQ4Wk7AzkMz+6Z6FdLqitH9t+vLwAP72/xptLb9EL74Wh4cKlDM6PcpeMmTgVVxQipomHh49GVMIWKp8qH8QB99Bq++8xfntd+PQlS86JJf/9OdJMoAeCv1Na0aHZzlvrcP7ukyjl4Rf7f+HzzddBzXz9r+WkoaY4hOcn1VmXf9IH0ZIXWEa/ve9QHzf5w35/5ZWRPfvavyYXQRnrqGncT9r0P27w85+T3m5Gv3/h+wLJxqayBw/brkn9aW++9+v+X7mBDy08HJx9xXbTpxJ0nTaOKPXj8xGC1kKiNlS204OAD2LVfmY+K4AAA==",cA="data:image/webp;base64,UklGRlgCAABXRUJQVlA4WAoAAAAgAAAAEwAAEwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggagAAAPAEAJ0BKhQAFAA+aSaQRaQiIZv6rABABoS0gAHw8iCkLzs3sIXAOxIWFrd2SwigAAD+/MkOz4js0Fdgbw4+zonqv3O57NRAczdhYX8bEb4rYdPOaDatYiWzMjMhiVQiY9935Hg4ozIAAAA=";function iA(){const[e,a]=t.useState(""),[l,o]=t.useState(""),[n,r]=t.useState(""),[b,g]=t.useState(""),[p,v]=t.useState(!1),[j,k]=t.useState(!1),[B,C]=t.useState(!1),[f,N]=t.useState(!1),[u,D]=t.useState(!1),[V,I]=t.useState(""),[M,Z]=t.useState(""),[P,U]=t.useState(""),[R,y]=t.useState(""),{setUser:J,setIsLoggedIn:z}=Q.getState(),[i,d]=t.useState("이메일"),T=q(),{showAlert:H}=_(),Y=s=>{const{value:c}=s.target,h=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;a(c),h.test(c)?v(!0):(I("올바른 이메일 형식이 아닙니다."),v(!1))},$=s=>{const{value:c}=s.target,h=/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;r(c),h.test(c)?C(!0):(U("숫자, 영문, 특수문자를 포함하여 최소 8자를 입력해주세요."),C(!1))},L=s=>{const{value:c}=s.target;g(c),n===c?(y("비밀번호가 일치합니다."),N(!0)):(y("비밀번호가 일치하지 않습니다."),N(!1))},X=s=>{const{value:c}=s.target,h=/^[a-zA-Z0-9가-힣\s]+(?![ㄱ-ㅎㅏ-ㅣ])$/;o(s.target.value),h.test(c)?k(!0):(Z("한글,영문,숫자로 최대 8자이내로 지어주세요."),k(!1))},S=()=>{D(s=>!s)},K=async()=>{try{const s=await x.post("/member/check-nickname",{nickname:l});m.remove("accessToken"),m.set("accessToken",s.data),G()}catch{H({message:"이미 사용중인 닉네임입니다."});return}},G=async()=>{try{const s=await x.post("/member/signup",{headers:{"Content-Type":"application/json; charset=UTF-8"}});J(s.data);const c=await x.post("/login/oeasy",{email:e,pw:n});m.set("accessToken",c.data.accessToken),z(!0),d("가입완료")}catch(s){console.error("Error:",s)}},W=async()=>{if(p)try{const s=await x.post("/member/check-email",{email:e});m.set("accessToken",s.data),d("비밀번호")}catch{H({message:"이미 사용중인 이메일입니다."});return}if(B&&f){const s=await x.post("/member/check-password",{password:n});m.remove("accessToken"),m.set("accessToken",s.data),d("닉네임")}},O=()=>{T("/")};return A.jsxs("div",{className:"w-full xl:w-[520px] max-w-[520px] mx-auto h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] flex-col flex px-4 xl:py-[80px]",children:[A.jsx(lA,{step:i}),A.jsxs("form",{onSubmit:s=>{s.preventDefault(),i==="닉네임"&&j&&u?K():W()},className:"mt-4 flex-grow flex flex-col",children:[i==="이메일"&&A.jsx(AA,{email:e,setEmail:a,isEmail:p,emailMsg:V,emailChangeHandler:Y,setStep:d}),i==="비밀번호"&&A.jsx(eA,{password:n,setPassword:r,isPassword:B,passwordMsg:P,passwordChangeHandler:$,confirmPassword:b,setConfirmPassword:g,isConfirmPassword:f,confirmPasswordMsg:R,confirmPasswordChangeHandler:L,setStep:d}),i==="닉네임"&&A.jsx(sA,{nickname:l,setNickname:o,isNickname:j,nicknameMsg:M,nicknameChangeHandler:X,checkedChangeHandler:S,isCheckedAccept:u,setStep:d}),i==="가입완료"&&A.jsx(tA,{}),A.jsx("div",{className:"w-full mt-auto mb-6",children:i!=="가입완료"?i==="닉네임"?A.jsxs("div",{className:"w-full",children:[A.jsxs("button",{type:"button",onClick:S,className:"text-sm flex mb-4",children:[A.jsx("span",{className:"mr-2 cursor-pointer",children:u?A.jsx("img",{src:nA,alt:"checked"}):A.jsx("img",{src:cA,alt:"unchecked"})}),"개인정보 수집 및 이용에 대한 동의(필수)"]}),A.jsx(w,{size:"large",type:"submit",isActive:j&&u,children:"가입완료"})]}):A.jsx(w,{size:"large",type:"button",onClick:W,isActive:i==="이메일"?p:B&&f,children:"다음"}):A.jsx(w,{size:"large",type:"button",onClick:O,children:"시작하기"})})]})]})}export{iA as default};
