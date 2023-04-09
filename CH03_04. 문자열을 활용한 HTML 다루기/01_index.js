


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


    // 네트워크에서 데이터 가져오는 함수
    function getData(url) {
        // 연결? 하기
        ajax.open('GET', url, false);

        // 실제로 데이터를 가져오는 순간.
        ajax.send()

        return JSON.parse(ajax.response);
    }
        // ⭐이 묶어주는 코드가 무슨일을 하는가!⭐ 를 표현할 수 있는 이름이면 가장 좋음.
        // 이 코드는 '네트워크를 통해 데이터를 가져오고!' 있음.

        // [함수 자체에 대한 이해] ⭐⭐⭐ 
            // 1. 이 함수의 결과값(⭐output⭐) 은 '객체' 이고, '매번 다를' 수 있음. 
            // 2. '해당 함수를 ⭐⭐실행할 때 마다 다르게⭐⭐ 받아야 할 것' = input 이 된다. 
                // 이 부분은 쓸 때 마다 달라짐 = 변수 = 매개변수 = input




    // 가져온 데이터 보기 
    console.log(ajax.response);

    // JSON 형식의 response 데이터를 > 객체로 변환
    const newsFeed = getData(NEWS_URL);
    // console.log(newsFeed)


// 🟦 처리해서, 보여주기 
    // UI 로 보여주기 
    const ul = document.createElement('ul');

    window.addEventListener('hashchange', function() {

        const id = location.hash.substring(1);

        // JSON 데이터를 객체로 변환  ✅✅(오타났었음)
        const newsContent = getData(CONTENT_URL.replace('@id', id));

        // 제목에 내용 넣고 > div 태그에 붙이기  
        const title = document.createElement('h1');
        
        title.innerHTML = newsContent.title;
        
        content.appendChild(title)
        // console.log(newContent);

    })



    for (let i = 0; i < 10; i++) {

        const div = document.createElement('div');
        const li = document.createElement('li');
        const a = document.createElement('a')

        div.innerHTML = `
        <li> 
            <a href = "#${newsFeed[i].id}"> 
            ${newsFeed[i].title} (${newsFeed[i].comments_count}) 
            </a>
        </li>
        `;


        ul.appendChild(div.firstElementChild)
        // [해석]
            //  ul.appendChild(li); 태그를 변경해야 함. 
                // ul 태그의 자식은 li 태그여야 함. 
                // 현재 li 는 div 태그 안에 들어가 있음. 
                // ⭐⭐⭐⭐⭐ div 안에서 어떻게 li 를 뽑아서 넣을 수 있을까?
                    // ul.appendChild(div.children[0])
                        // div 의 children 을 선택 -> 그 중 첫 번째걸 선택 > 그러면, div 가 나옴 
                    // ul.appendChild(div.firstElementChild)
                        // firstElementChild : 첫 번째 요소를 element 로 제공해주는 속성


    }

    // 🔷 root 에 추가해주기 
    container.appendChild(ul)
    container.appendChild(content)
    



// 📚 수업 과정 


// 🟦 코드 개선의 필요성
    // 지금까지 만든 걸 보면, '간단한 UI' 임. 
    // '간단한 UI' -> '간단한 마크업 구조' : 간단한 div, ul, li 태그 
    // '복잡한 UI' -> 좀 더 복잡한 마크업 구조
    // ⭐⭐⭐ 더 복잡해질 것을 ⭐대비⭐해서, 코드를 개선하기 ⭐⭐⭐⭐⭐⭐ 

// 🟦 현재 코드의 문제점
    // - DOM API 만을 사용해서 만듦
        // - JS 코드만 봐서는, 'HTML 의 구조(⭐위계⭐)' 를 알기 힘듦. 
        // - HTML 자체는 태그의 ⭐위계(마크업)⭐가 '명확' 히 보임.

// 🟦 개선할 수 있는 방법 
    // - '⭐문자열⭐만으로 ⭐UI⭐만들기' 
        // ⭐innerHTML⭐ 활용하기 
        // ``문자열 안에, HTML 태그가 있으면, DOM API 가 자동으로 변환해준다.

// 🟦 innerHTML 활용해서 넣기 

    // - 지금까지 적은 문자열 태그
        // `
        // <li> 
        //     <a href = '#'> title (comments) </a>
        // </li>
        // `

    // - 이때, '이 li, a 태그를 자식요소로서 담을 DOM(HTML 태그?) 필요'
        // 왜 그럴까? 
        // innerHTML 은 DOM 에 속한 속성임. 
        // DOM 을 사용하려면, 태그가 있어야 함. 
        // 즉, ⭐'넣고자 하는 li,a 태그를 담고 있는 부모 태그'⭐ 가 있어야 함.
            // 이걸 좀 더 이해하려면, DOM 에 대해서 알아야 함. ⭐⭐⭐⭐⭐ 


    // 🔷 ul.appendChild(li); 변환하기 ⭐⭐⭐ 


    // 🔷 'js 코드만' 봐도, '마크업의 구조를 이해' 하는 것
        // [실익]
            // 1. UI 가 복잡해져도, 어떤 구조인지 계속 파악이 가능
                // 1.1 복잡도, 내용 자체를 파악하는 것에 어려움이 생기는 건 아님. 
        // [시사점]
            // 1. 좋은 코드의 조건 중 하나 : ⭐⭐ 한 눈에 마크업 구조 ⭐⭐를 파악할 수 있는 것
                // 이를 위해, DOM 위주의 JS 코드를 -> innerHTML 을 활요함. 

            // 2. 단순히 기능 구현만이 능사가 아님. 
                // 무엇을 위해, 어떤 목적으로, 왜 이런 코드를 작성하는지! 를 설명할 수 있어야 함. ⭐⭐⭐⭐⭐ 


// 🟦 코드 개선하기 
    // 보통 '리팩토링' 이라고 이야기 함 ⭐⭐⭐ 

    // - 보통은 '⭐⭐반복 또는 중복되는 부분⭐⭐' 을 하나로 합치는 작업을 많이 했음. ⭐⭐⭐ 
        // 이 과정 너무 중요 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 

    // 🔷 예전에는 constainer 라는 ⭐'변수'⭐ 에 넣었음. 
        // 데이터를 담을 수 있는 구조물 -> '변수' 
        // '변수' 를 여러개 담을 수 있는 구조물 -> '객체' 
        // '코드' 를 묶을 수 있는 구조물 -> '함수' 
        // [시사점]
            // 와⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
            // 진짜, 이건, 너무 좋다. ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 


    // 🔷 ajax 관련 코드를 개선해보기
        // 현재는 ajax 를 가져오는 코드 패턴이 반복됨. 
        // 해당 기능은 데이터를 불러오는데에 사용됨. 
        // 추후에 더 많은 데이터를 불러온다면, 반복 가능성은 높음. 
        // so, '⭐⭐추후에도 사용할 가능성이 높은 코드를, 지금 개선⭐⭐' 하면 -> 나중에 중복코드 발생이 줄어들 것 임. ⭐⭐⭐
            // (이런 논리임 ⭐⭐⭐)

        // 그런데, 이건 '변수에 담을 수 없지.' 
        // 그러면, 이러한 ⭐'코드의 중복'⭐ 은 어떻게 제거할 수 있을까? 
        // '함수' 를 활용 


    // 🔷 코드를 함수로 리팩토링 했을 때의 실익 
        // 함수화를 했기 때문에, 네트워크 연동이 계속 되어도, 코드의 양이 늘어나도, ⭐복잡도⭐가 늘어나거나 하는 일은 없을 것
        // 이렇게 ⭐'네트워크 데이터 받아오기의 함수화'⭐ 처럼, 특정 기능을 계속 함수화 하는게 중요함 ⭐⭐⭐ 











