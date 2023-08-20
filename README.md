![header](https://capsule-render.vercel.app/api?type=waving&color=0:2C62EA,100:FFFFFF)



<div align="center">

![team16](./public/images/logo.svg)

## team16_아프지망고(careMango)
### [Wiki ](https://github.com/pie-sfac/1-16-careMango/wiki)
  
</div>

## 프로젝트 정보
- 센터 내 직원, 회원, 수강권, 일정 관리 등의 기능이 구현된 태블릿 기반 CRM 서비스를 React기반의 웹플랫폼 형태로 제작해 서비스의 크로스플랫폼 지원
- 개발 목표 : 수업 관리 시스템 제작 (PC)
- 개발 기간 : 2023.07.17 ~ 2023.08.10

<br/>

## 팀원

| [안승지](https://github.com/s-ja)      | [김지효](https://github.com/ji-dawn)      | [이윤주](https://github.com/lyeejj)      | [김유은](https://github.com/YueunKim)      |
| -------------------------------------- | ----------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| ![안승지](https://github.com/s-ja.png) | ![김지효](https://github.com/ji-dawn.png) | ![이윤주](https://github.com/lyeejj.png) | ![김유은](https://github.com/YueunKim.png) |
|                                  | - 일정 상세 관리(C) <br/> - 직원 관리CRUD                                    | - 일정 상세 관리(RUD) <br/> - 수강권 부여/관리(CRUD) <br/> - 레이아웃 <br/> | - 상담 일정 관리 CRUD <br/> - 회원 관리 CRU

<br/>

## 기술 스택

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) 

### Development

<img alt=""  src ="https://img.shields.io/badge/react-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/typescript-3178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/tailwindcss-06B6D4.svg?&style=for-the-badge&logo=tailwindcss&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/vite-646CFF.svg?&style=for-the-badge&logo=vite&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/reactquery-FF4154.svg?&style=for-the-badge&logo=reactquery&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/recoil-3578E5.svg?&style=for-the-badge&logo=recoil&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white"/>
<img alt=""  src ="https://img.shields.io/badge/eslint-4B32C3.svg?&style=for-the-badge&logo=eslint&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/prettier-DF0067.svg?&style=for-the-badge&logo=prettier&logoColor=white"/>


### Communication

![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)



<br/>

## 시작 가이드

### Requirements

For building and running the application you need:

- [Node.js](https://nodejs.org/ko/download)
- [npm](https://www.npmjs.com/package/package)

### Installation

``` bash
$ git clone https://github.com/pie-sfac/1-16-careMango
$ cd 1-16-careMango
$ npm ci
$ npm run dev
```

### ID / PASSWORD
id: tema16<br/>
password: team16!!

<br/>

## API 
- [tui-calendar](https://ui.toast.com/tui-calendar)
- PoinT Api for SFAC React Project


<br/>

## 주요 기능

### 1. 일정 관리

#### 개인 일정 상세 관리
- 개인일정을 생성/조회/변경합니다.
- 개인일정 상세조회를 통해 일정을 변경할 수 있고 일정 취소가 가능합니다.
- 일정의 출석/결석 버튼을 통한 출결체크가 가능합니다.
<details>
  <summary>개인일정 생성</summary>

  <img width="800px" src='https://github.com/pie-sfac/1-16-careMango/assets/52726195/ef237a5a-5d5f-452c-88c8-544c1c4d3c1e' />
</details>
<details>
  <summary>개인일정 상세조회 / 변경</summary>

  <img width="800px" src='https://github.com/pie-sfac/1-16-careMango/assets/72495998/b119edf9-9739-4372-bfea-a8d863df49e1' />
</details>

<details>
  <summary>개인일정 출결체크 / 취소</summary>
  
  <img width="800px" src='https://github.com/pie-sfac/1-16-careMango/assets/72495998/d4c30c86-08b9-4040-b280-71faa459ff70' />
</details>

<br/>

#### 상담 일정 관리

- 상담 일정 생성, 조회, 변경, 취소가 가능합니다.
- 유효성 검사 및 처리 기능이 있습니다. (일정 및 시간 중복 확인, 연락처 형식 조절, 필수 입력값 확인, 로딩 및 에러 처리)
<details>
  <summary>구현 화면</summary>
  <div markdown="1">
    <img src="https://github.com/pie-sfac/1-16-careMango/assets/65431814/703d54bc-455f-405b-a506-48ddaef0d2e4" width="800px">
  </div>
</details>


<br/>


### 2. 회원 관리
 
- 회원 생성, 조회, 변경이 가능합니다
- 유효성 검사 및 처리 기능이 있습니다. (연락처와 생년월일 형식 조절, 필수 입력값 확인, 로딩 및 에러 처리)
- 회원 목록 조회 페이지에서 회원 이름, 연락처로 검색이 가능하며 한 페이지당 10명의 회원 목록만 보여집니다.

<details>
  <summary>구현 화면</summary>
  <div markdown="2">
    <img src="https://github.com/pie-sfac/1-16-careMango/assets/65431814/874f9651-3d41-4e89-b16c-be2718d64c79" width="800px">
  </div>
</details> 

<br/>

### 3. 수강권 관리
#### 센터 수강권
- 센터의 수강권을 관리합니다.
- 수강권을 생성/조회/편집/삭제할 수 있습니다.
- 유효성 검사 및 필수값 필드를 입력해야만 저장 버튼이 활성화됩니다.
- 수강권의 판매상태를 통해 판매종료 또는 판매가능 여부를 제어할 수 있습니다.
- 판매중, 판매종료 중인 수강권을 탭으로 분류합니다.

#### 회원 수강권
- 회원 수강권을 관리합니다.
- 회원에게 부여된 수강권을 조회하고 수강권을 부여할 수 있습니다.
- 회원에게 부여된 수강권을 일시중단/재진행/환불할 수 있습니다.
- 이용중, 종료된 수강권을 탭으로 분류합니다.

<details>
  <summary>센터 수강권 생성</summary>

  <img width="800px" src='https://github.com/pie-sfac/1-16-careMango/assets/72495998/89c7ccf1-53f9-41b7-8f42-9a6f5cbdc92a' />
</details>

<details>
  <summary>센터 수강권 수강권 부여내역 조회 / 편집 / 판매종료 / 판매가능 / 수강권 삭제</summary>

  <img width="800px" src='https://github.com/pie-sfac/1-16-careMango/assets/72495998/101c879c-e201-4969-882b-c375016c9ea9' />
</details>

<details>
  <summary>회원 수강권 부여</summary>

  <img width="800px" src='https://github.com/pie-sfac/1-16-careMango/assets/72495998/8ded77b0-8588-4b92-893e-2f2f0846832a' />
</details>

<details>
  <summary>회원 수강권 상세조회 / 일시중단 / 재진행 / 환불</summary>

  <img width="800px" src='https://github.com/pie-sfac/1-16-careMango/assets/72495998/0d029e56-b87c-46a5-9095-41c998d646e1' />
  <img width="800px" src='https://github.com/pie-sfac/1-16-careMango/assets/72495998/0b240e82-4e4b-4081-b4d8-30ab9a98e63c' />
</details>

### 4. 직원 관리
- 직원 생성, 조회, 변경, 삭제(퇴사)가 가능합니다.
- 직원 목록 조회 페이지에서 검색이 가능합니다.

<details>
  <summary>구현 화면</summary>
  <img width="800px" src='https://github.com/pie-sfac/1-16-careMango/assets/52726195/eccff43a-da3f-4e3c-867c-451fbad89a5f'/>
</details>

![footer](https://capsule-render.vercel.app/api?section=footer&type=waving&color=0:FFFFFF,100:2C62EA)
