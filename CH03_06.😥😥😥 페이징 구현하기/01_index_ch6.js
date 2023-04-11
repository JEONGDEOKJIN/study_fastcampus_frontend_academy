


// 🟦 데이터 가져오기

    // root 가 반복되니까, 변수화, 시키기 ⭐⭐⭐ 
    const container = document.getElementById('root');

    // XMLHttpRequest 객체를 ajax 에 저장하기 
    const ajax = new XMLHttpRequest();

    // [콘텐츠가 보여지게] 영역만 
    const content = document.createElement('div');

    // URL 주소는 변경될 수 있기 때문에, 변수로 바꿀 수 있는 부분을 바꾸기 
    const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'

    const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

    // 공유되는 자원
        // 지금은 '페이지 정보' 를 담을 예정 
    const store = {
        currentPage : 1, 
    }


    // 네트워크에서 데이터 가져오는 함수
        // input : URL | return : (parse처리된) 객체 
    function getData(url) {
        // 연결? 하기
        ajax.open('GET', url, false);

        // 실제로 데이터를 가져오는 순간.
        ajax.send();

        return JSON.parse(ajax.response);
    }


// 🟦 처리해서, 보여주기 
    // UI 로 보여주기 
    const ul = document.createElement('ul');

    
    // '라우터'에 들어가게 하기 위해서, '목록 화면' 을 '함수' 로 만들기
    function newsFeed() {
        // JSON 형식의 response 데이터를 > 객체로 변환
        const newsFeed = getData(NEWS_URL);
            // ⭐⭐⭐ 데이터를 가져오는 부분도 함수에 넣어줌 ⭐⭐⭐

        // 뉴스 목록이 들어가기 위한 '배열' 
            const newsList = [];

        // 뉴스 목록 중 첫 번째 ul 
        newsList.push(`<ul>`);

        // 뉴스 목록에 들어갈 li 들 
        for (let i = 0; i < 10; i++) {
            newsList.push (`
            <li> 
                <a href = "#/show/${newsFeed[i].id}"> 
                ${newsFeed[i].title} (${newsFeed[i].comments_count}) 
                </a>
            </li>
            `);
        }

        // ul 로 닫아주기
        newsList.push(`</ul>`);

        // 이전, 다음 UI 만들기 
            // 우선은, '마크업' 만 하기 ⭐⭐⭐⭐⭐
            // [느낀점]
                // html 체계를 짜는 걸, '마크업 한다.' 라고 말하는 거 였네. 몰랐었어. 
                // 그리고, 그 행동에 이름을 붙이니까, '아 이 작업이, 이런 의미에서 필요하고, 이렇게 바뀔 수 있구나.' 하는 걸 알게 되는거 같아.
                // 즉, 'js 에서 마크업 구조를 한눈에 볼 수 있게 코드를 짜야함.' 이 왜 필요하고, 구체적으로 뭘 말하는지! 이해할 수 있게 되었다. 
        newsList.push(`
            <div> 
                <a href="#/page/${store.currentPage - 1}"> 이전 페이지 </a>
                <a href="#/page/${store.currentPage + 1}"> 다음 페이지 </a>

            </div> 
        `);

        // appendChild 할게 아니라, Overwrite 할 것 임! ⭐⭐⭐⭐⭐⭐ 
        container.innerHTML = newsList.join('');
        
    }

    // '라우터' 호출에 반응할 수 있게, 익명함수에서 탈출! 
    function newsDetail() {
        const id = location.hash.substring(1);

        // JSON 데이터를 객체로 변환 ✅✅(오타났었음)
        const newsContent = getData(CONTENT_URL.replace('@id', id));
        
        // 제목에 내용 넣고 > div 태그에 붙이기  
        const title = document.createElement('h1');
        
        // 🔷 내용화면, 다시 구성 🔷
        container.innerHTML = `
            <h1> ${newsContent.title}</h1> 

            <a href = "#"> 목록으로 </a>

            `;
    }



    // '내용화면, 목록화면을 호출할 수 있는 라우터' 만들기 
    function router () {

        // 현재 위치(클릭된 것의 위치?) 의 '해시값' 을 가져온다. 
        const routePath = location.hash;

        // 라우트hash 가 아무것도 없을 때 = 첫 진입 ⭐⭐⭐⭐⭐ 
        if (routePath === '') {
            // 글 목록이 보임
            newsFeed();
        } else if (routePath.indexOf('#/page/') >= 0) {
            
            store.currentPage = 2; 

            // 글 목록 
            newsFeed();
        } else {
            newsDetail();
        }
    }
    


    // 클릭 이벤트 
    window.addEventListener('hashchange', router);

    // 라우터로 특정조건에서, 특정 화면을 보여주게 하기 실행     
    router();






// 📚 수업 과정 

    // 🟦 이번 수업 목표
        // 지금까지 ⭐'라우터의 구조'⭐ 를 만들었음. 
        // 이제부터 ⭐'페이징'⭐⭐⭐ 을 구현하기 


    // '페이징' 을 구현하려면? 
        // '현재 페이지'가 '몇 번째 페이지' 인지 알고 있어야 함. 
        // '현재 페이지를 기억하고 있는 변수' (상수가 아닌 변수) 가 필요 ⭐⭐⭐ 

    // '현재 페이지 정보'가 사용되는 곳은? ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ (이런 질문을 못 했었음. 굉장히 중요)
        // '글 목록' 화면 
        // '글 내용' 화면에서도 쓰임.  
            // ex) 글 목록으로 돌아갈거야, 라고 할 때, 페이징이 사용됨. 
        // ⭐⭐ 여러 함수 ⭐⭐ 에 걸쳐서 사용하게 될 것 임. 
    
    // 그러면, 어떤 '페이지 변수' 를 만들면 되나? 
        // 다른 함수에도 쓰일 수 있게, 만들기 
        // 아! 이걸 '객체' 로 만드네⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐ 

    // 변수 이름을 어떻게? 
        // 다양한 함수에 공유되니까, store 라는 이름, 
        // 😥 이 부분은 생각해볼 필요가 있음. 

    // '이전', '다음' 의 ⭐'내비게이션 UI'⭐ 가 있어야 함. 
        // '내비게이션 UI' 는 '글 목록' 에 있어야 함. > so, '글 목록 함수(newsFeed)' 안에 만들기


    // 🔷 '글 내용을 위한 hash' 인지, '페이징을 위한 hash' 인지 '구분' 이 필요함 ⭐⭐⭐⭐⭐ 
        // [필요성] 📛📛📛 
            // ⭐⭐⭐ 지금 이걸 내가 이해하고 설명할 수 있어야 하는데, 이걸 잘 모르겠음. 😥😥😥😥😥 

        // 페이징을 위한 hash 작성
            // <a href="#/page/${store.currentPage - 1}"> 이전 페이지 </a> 
            
        // 글 내용 보기 위한 hash 작성 
            // <a href = "#/show/${newsFeed[i].id}">         

        // 라우터가 'page' 인지, 'show' 인지에 따라서, 다른 것을 보여주게 하기 ⭐⭐⭐⭐⭐ 