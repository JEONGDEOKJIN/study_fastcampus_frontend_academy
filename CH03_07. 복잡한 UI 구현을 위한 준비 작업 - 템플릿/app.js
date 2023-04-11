const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store = {
  currentPage: 1,
};

function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  let template = `
  <div class="container mx-auto p-4">
    <div> 
      <h1> Hacker News </h1> 
      <ul>
        {{__news_feed__}}
      </ul>
      <div>
        <a href="#"/page/{{__prev_page__}}> 이전 페이지 </a>
        <a href="#"/page/{{__next_page__}}> 다음 페이지 </a>
      </div>
    </div>
  `;

  
  for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
      <li>
        <a href="#/show/${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
  }

  template = template.replace('{{__news_feed__}}', newsList.join(''));
    // [해석]
      // 템플릿 안, news_feed 부분이, li 태그로 교체될 것 ⭐⭐⭐⭐⭐ 

  template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage - 1 : 1);
  template = template.replace('{{__next_page__}}', store.currentPage + 1);

  container.innerHTML = template;
}

function newsDetail() {
  const id = location.hash.substr(7);
  const newsContent = getData(CONTENT_URL.replace('@id', id))

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}

function router() {
  const routePath = location.hash;

  if (routePath === '') {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail()
  }
}

window.addEventListener('hashchange', router);

router();




// 📚 수업 필기 


  // 🟦 '틀' 의 역할을 하는 문자열을 먼저 만들기 
  //   let template = `
  //   <div> 
  //     <ul>
  //       <li> 
  //         <a> </a>
  //       </li>
  //     </ul>
  //     <div>
  //       <a href="#"> 이전 페이지 </a>
  //       <a href="#"> 다음 페이지 </a>

  //     </div>

  //   </div>
  // `;
  

  // 🟦 ⭐데이터가 들어갈 부분⭐에 ⭐마킹⭐ 을 하자 ⭐⭐⭐  
    // {{ __news_feed__}}
    // ⭐⭐⭐⭐⭐ 다른 곳에서 안 쓰일 법한 복잡한 패턴
    // '변수' 와 느낌이 비슷한데? 
    // 뭔가 달라지는 부분 같기도 하고? 


  // 🟦 템플릿 방식 의 효과 
    // DOM API 사용 -> 문자열 방식 과 똑같은 효과 
    // 1) 템플릿만 봤을 때, '이 UI 가 어떤 방식으로 생겼구나.' 를 명확히 알 수 있어 
    // 2) 어떤 데이터가 들어갈거야! 라고 하는것이 '마킹' 을 통해 명확히 보임
    // 3) for문, next page 계산 하기 위한 것, 들과 뒤섞이지 않음. ⭐⭐⭐⭐⭐⭐⭐⭐ 
    // 4) 이렇게 '성격이 다른' '코드' 와 'ui' 를 ⭐분리⭐ -> '복잡도' 를 훨씬, 줄일 수 있음. ⭐⭐⭐ 
    // 5) 현재, '템플릿' 방식을 통해서, 이것을 구현 


  // 🟦 tail wind css 

    // 🔷 아, 밖에 있는 class 에는 보통 container 라고 이름을 붙이는 구나 ⭐⭐⭐⭐⭐ 
    // ⭐ 아, tail wind 는 '이렇게 일관성' 을 가져가고, '학습 비용' 을 떨어트리는 구나⭐⭐⭐⭐⭐ 를 배우면 좋을 것 같음. ⭐⭐⭐⭐⭐ 
      // ex) margin top - 4px -> mx-auto p-4 이렇게 표현 
