import React from 'react';

function Main() {
  const planStatus: string = '플랜 이용중';
  const alarm: string = '알람 없음';
  return (
    <>
      <header className="flex">
        <h1>poinT</h1>
        <div className="flex">
          <p>박관리자</p>
          <div>{planStatus}</div>
          <div>{alarm}</div>
        </div>
      </header>
      <div>
        <label htmlFor="search">
          <input type="text" name="search" placeholder="회원/멤버 이름, 연락처로 검색하세요" />
          <input type="submit" value="Submit" className="cursor-pointer" />
        </label>
      </div>
      <div>
        <ul className="flex">
          <li>
            <a href="https://github.com/pie-sfac/1-16-careMango">광고1</a>
          </li>
          <li>
            <a href="https://github.com/pie-sfac/1-16-careMango">광고2</a>
          </li>
          <li>
            <a href="https://github.com/pie-sfac/1-16-careMango">광고3</a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex">
          <li>
            <span>나의 오늘 일정</span>
            <div className="card_wrapper">
              <div className="card">
                <div className="card_upper">
                  <span>총 8건의 일정</span>
                  <span>수업 7건, 상담 1건</span>
                </div>
                <div className="card_down">
                  <span>8</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <span>나의 회원</span>
            <div className="card_wrapper">
              <div className="card">
                <div className="card_upper">
                  <span>나의 회원 수</span>
                </div>
                <div className="card_down">
                  <span>16</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <span>전체 직원</span>
            <div className="card_wrapper">
              <div className="card">
                <div className="card_upper">
                  <span>전체 직원 수</span>
                </div>
                <div className="card_down">
                  <span>80</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="bottom_wrapper">
        <ul className="flex bottom_bar">
          <li>
            <a href="https://github.com/pie-sfac/1-16-careMango">홈</a>
          </li>
          <li>
            <a href="https://github.com/pie-sfac/1-16-careMango">일정관리</a>
          </li>
          <li>
            <a href="https://github.com/pie-sfac/1-16-careMango">회원관리</a>
          </li>
          <li>
            <a href="https://github.com/pie-sfac/1-16-careMango">센터관리</a>
          </li>
          <li>
            <a href="https://github.com/pie-sfac/1-16-careMango">마이페이지</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Main;
