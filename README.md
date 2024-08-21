## 목적

Next.js 기술스택 학습 및 





## 기술 스택

Next.js

zustand

axios

tailwind css



## 기록

~8/8

- Next.js 시작 / app 라우팅
- 간단한 메인화면, Navbar, 게시글 UI 개발
- 게시글 리스트 조회, 게시글 조회, 게시글 작성 API 연결



8/9

- Kakao Login으로 인가 코드를 발급받고, 이를 사용해 로그인 API 연결



8/10

- 사이트 첫 진입 시 refresh_token 만료 안되었으면 이를 통해 access_token, refresh_token 재발급받고 로그인 유지되는 API 연결
- zustand 활용해 로그인 시 유저 정보 저장
- zustand-persist 미들웨어 활용해 정보 유지

- fetch -> axios로 교체

  

8/12

- api 함수들 axios로 모듈화 및 코드분리
- axios interceptor를 활용해 모든 API 요청에 access_token 포함
  - 각 API 함수에 access_token을 추가해야하는 코드 중복 제거 -> 가독성, 유지보수성 향상
- 게시글 리스트 및 게시글 디테일 페이지를 SSR(Server-Side Rendering)을 사용하여 구현했으며, 게시글 API 호출을 서버에서 처리하도록 설정
  - 결과적으로, 클라이언트는 게시글 데이터가 미리 채워진 HTML을 수신
  - 기존에는 첫 렌더링 이후 클라이언트에서 API 응답을 받아 다시 화면에 출력하기까지 시간이 소요되었으나, 이제 서버에서 API를 호출함으로써 렌더링 후 대기 시간을 제거

8/13

- axios interceptor를 활용해 access_token 만료 응답(401)시 refresh_token으로 access_token 재발급 후 API 재호출 기능 구현
  - access_token 만료시  {status: 401, action: 3}, refresh_token 만료시  {status: 401, action: 4}로 응답 받음
  - status가 401일 때 action에 따라 동작 분기
  - 이후 다른 status도 action 추가하고 동작 분기할 예정
- 게시글 리스트는 서버에서 API 호출을 하는데 이에 기본 cache time 30초 설정되어 있음
  - 때문에 게시글을 작성 후 바로 게시글 리스트로 가면 cache된 결과가 나오기 때문에 게시글 최신화가 되지 않음
  - next.js 공식문서에선 fetch API에서 {cache : 'no-store'}로 설정하면 된다고 나와있지만, 이 프로젝트에는 axios가 사용되었고 해당 옵션이 axios에는 적용 안되는 것을 확인
  - 더 공부해보고 axios를 사용하더라도 서버 캐시 비활성 시도 / 안되면 일부 API에서 fetch 사용 고민해봐야 할 듯



8/21

- axios의 응답 캐생 제거 시도 -> 실패

![image-20240821164339223](README.assets/image-20240821164339223.png)

- Next.js 공식문서에는 Data를 revalidate하는 방법이 있다고 한다.
- 첫째는 fetch 요청의 option에 `{ next.revalidate : 3600 }`값을 추가하여 최신화 주기를 조정하는 방법
- 둘째는 `fetch(https://..., { next: { tags: ['a', 'b', 'c'] } })` 와 같이 태그를 설정한 후 `revalidateTag('a')`를 활용해  해당 태그를 가진 응답을 최신화 할 수 있다.
- 위 두 방법은 fetch API의 옵션으로 설정해야하기 때문에 Axios와 호환 불가능하다.
- 위 사진의 revalidatePath는 path와 관련된 데이터를 최신화하고 리렌더시킨다. 즉 **`revalidatePath("/dashboard")`를 수행하면 해당 서버 컴포넌트(SSR이 적영됨)가 리렌더되고 내부의 데이터 패칭 또한 새로 수행된다.**
-  위 사진처럼 Route Handlers와 Server Actions 두가지 상황에서 적용 가능하다 했는데, 이 프로젝트에선 Route Handlers로 데이터를 가져오지 않고, express로 따로 백엔드 서버를 구성했기 때문에 Server Actions를 알아봤다.
- Server Actions는 서버에서 실행되는 비동기 함수라고 한다. Next.js에서 form submission 또는 data mutations에 사용된다.
- 이 Server Actions로 게시글 작성하는 로직을 변경한 뒤 적용했지만 동작하지 않았다.
- 애초에 내 목적은 게시글을 작성하면 게시글 리스트로 이동하고, (작성한 게시글이 포함된) 최신화된 게시글 리스트를 보는 것이었다.
- 즉 Server Actions로 게시글 작성이 완료되면 revalidatePath를 사용해 게시글 리스트 페이지를 최신화 하는 것이 목표 -> 게시글 작성 API가 LocalStorage에 있는 access token을 필요로 했고, **Server에서 동작하는 Server Actions는 브라우저의 localStorage를 읽지 못했다.**
- 때문에 revalidatePath와 Server Actions를 활용한 게시글 리스트 최신화 개발은 실패했고, fetch를 일부 도입하는 것을 더 고민해봐야겠다.
