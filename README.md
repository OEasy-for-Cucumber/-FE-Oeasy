
<img src="./readme-images/Thumbnail.png"  width="100%" height="500"/>

<div align="center">
    
# 🔥사이드 프로젝트🔥

</div>

<div align="center">
    
| 인원 | FE 임현아 서샛별 박수미 / BE 김현빈 박진수 / DGN 구현경 |
| :---: | :-- |
| 개발 기간 | 2024-10-15 ~ 2024-12-18 |
| 프로젝트 명 | Oeasy |
| 주제 | 호불호가 심한 채소인 오이를 주제로 다양한 정보를 제공하고 소통할 수 있는 커뮤니티 사이트입니다. |
| 사이트링크 | https://oeasy.world |


</div>

<h3 align="center">✨ Tech Stack ✨</h3>

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />&nbsp
  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> 
  <img src="https://img.shields.io/badge/tailwindcss-1daabb.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />&nbsp 
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
  <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />&nbsp
  <img src="https://img.shields.io/badge/zustand-%23FF9900.svg?style=for-the-badge&logo=zustand&logoColor=white" />&nbsp
  <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> 
</div>

## 시스템 아키텍쳐
<div align="center">
    <img src="./readme-images/architecture.png"  width="500" height="400"/>
</div>


<div>
    
## 📍주요 기술

</div>

### 로그인 ( 소셜 로그인 kakao)
> * kakao와 Email을 통한 로그인이 가능합니다
<details>
<summary>미리보기</summary>
<div markdown="1">

<img src="./readme-images/login.png"  width="700" height="400"/>
<img src="./readme-images/loginM.png"  width="240" height="400"/>

 <br>
</div>
</details>

### 마이페이지
> * 회원정보 수정, 로그아웃, 회원탈퇴가 가능합니다.
> * 내가 쓴 게시물과 좋아요한 게시물을 불러옵니다.
<details>
<summary>미리보기</summary>
<div markdown="1">

<img src="./readme-images/mypage.png"  width="700" height="400"/>
<img src="./readme-images/mypageM.png"  width="240" height="400"/>
 <br>
</div>
</details>

### Main
> * 오이와 관련된 전문지식, 날씨에 따른 오이 상태변화, 지역별 가격, 이번달 가격, 오이 레시피를 확인할 수 있습니다.

<details>
<summary>미리보기</summary>
<div markdown="1">

<img src="./readme-images/Group.png"  width="700" height=auto/>

 <br>
</div>
</details>

### AI-OE(ChatJPT)
> * 오이와 관련된 정보를 질문하고 답변을 받을 수 있습니다.

<details>
<summary>미리보기</summary>
<div markdown="1">

<img src="./readme-images/aioe.png"  width="250" height="400"/>
<img src="./readme-images/aioeM.png"  width="240" height="400"/>

 <br>
</div>
</details>

### 오이 커뮤니티
> * 자유롭게 게시물 및 댓글을 작성할 수 있습니다.
> * 최신순, 인기순, 오래된 순으로 글을 정렬할 수 있습니다.
> * 조회수와 좋아요를 확인할 수 있습니다.
> * 특정 게시물을 검색을 통해 찾을 수 있습니다.
<details>
<summary>미리보기</summary>
<div markdown="1">
    
<img src="./readme-images/community.png"  width="700" height="400"/>
<img src="./readme-images/communityM.png"  width="240" height="400"/>
 <br>
</div>
</details>


### 오이 투표와 채팅
> * 하루에 한번 투표할 수 있습니다.
> * 유저들의 투표수 현황을 확인 할 수 있습니다.
> * 사이트에 접속한 유저들이 서로 실시간 채팅을 할 수 있습니다.
<details>
<summary>미리보기</summary>
<div markdown="1">

<img src="./readme-images/votechat.png"  width="700" height="400"/>
<img src="./readme-images/votechatM.png"  width="240" height="400"/>

 <br>
</div>
</details>

### 오이 레시피
> * 오이가 들어간 레시피를 무한 스크롤을 통해 볼 수 있습니다.
> * 특정 레시피를 좋아요할 수 있습니다.
> * 검색을 통해 원하는 레시피를 찾을 수 있습니다.
<details>
<summary>미리보기</summary>
<div markdown="1">

<img src="./readme-images/recipe.png"  width="700" height="400"/>
<img src="./readme-images/recipeM.png"  width="240" height="400"/>

 <br>
</div>
</details>


<br><br>


## 🍀기술적 의사결정

### ◻ React - Typescript

> 타입 오류를 사전에 발견하여 버그를 줄일 수 있고 코드 자동완성, 인텔리센스, 리팩토링이 간편하여 유지보수가 용이하다는 점에 선택하였습니다.


### ◻ Tanstack query

> 다양한 데이터 페칭이 필요한 상황에서 불필요한 네트워크 요청을 줄여 성능을 최적화하고 필요한 곳에 전역적으로 서버 상태를 관리하기 위해서 선택했습니다.


### ◻ Zustand

> 유저 상태을 관리하기 위해 보일러 플레이팅이 적고 확장성을 갖춘 전역 관리 라이브러리인 zustand를 선택했습니다.

### ◻ tailwindcss

> 디자인시스템을 초기에 정의해두어 사용하기 간편하고 기본으로 제공하는 반응형 css 적용이 편리하여 사용했습니다.

<br><br>





### [👊 Oeasy 노션 바로가기](https://www.notion.so/11cedee0214880e8baece311bb09fce5)


