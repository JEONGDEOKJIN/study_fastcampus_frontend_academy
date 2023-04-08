// 🟦 화면전환 방식 중 '클릭하면 내용 데이터' 를 '다른 뷰' 로 보여주게 하기 
    // 요약 
        // SPA vs 웹의 차이가 존재하고, 화면전환 방식은 해당 플랫폼의 중요한 특징 중 하나 
    
    // ⭐⭐⭐ 중요한 관점 ⭐⭐⭐ 
        // '어떻게 '화면전환' 을 시킬 수 있을까?'에 초점을 두고 만듦.
        // '화면의 네비게이션' 을 어떻게 처리? 
        // '화면'을 어떻게 처리?' 
        // ⭐ '그 구조' 는 어떻게 만들어지는가?⭐ 등의 관점에서 보면, 해당 플랫폼의 특성을 빠르게 이해할 수 있음. 

        // SPA(Single Page Application)
            // 하나의 어플리케이션이 화면을 여러개 갖고 있음. 
            // 화면을 계속 전환 
            // 현재의 active 한 화면을 페이지로 보여주는
            // 웹은 이것과 다르게 구동이 됨 😥😥😥😥😥 
            // 웹 vs SPA 의 차이❓❓❓❓❓❓ 



// 🟦 글 제목 클릭 하게 하기 





// 🟦 데이터 가져오기

    // root 가 반복되니까, 변수화, 시키기 ⭐⭐⭐ 
    const container = document.getElementById('root');

    // XMLHttpRequest 객체를 ajax 에 저장하기 
    const ajax = new XMLHttpRequest();

    // [콘텐츠가 보여지게] 영역만 
    const content = document.createElement('div');

    // URL 주소는 변경될 수 있기 때문에, 변수로 바꿀 수 있는 부분을 바꾸기 
    const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'

    // 글의 내용을 가져올 URL 넣기 
        // 👐 : 마킹!
        // 마킹이 필요한 이유 
            // 제목을 클릭하면 -> 그 제목과 맞는 내용을 보여줘야 함. 
            // 지금 content URL 을 확정할 수 없음. 
            // 그래서, 우선, 마킹을 함. 
            // 어떻게 클릭했는지를 알까? = 이게 핵심 기술 
            // Event 기술을 쓸 것 임. 

            // Event 라는게 필요한 이유 
                // 1) 사용자가 클릭하면, 뭔가를 하게 하고 싶음. 
                // 2) 그런데, 언제 클릭하는지 알 수 없음. 
                // 3) ⭐자바스크립트만으로⭐ '언제 클릭하는가.' 를 대처⭐할 수 없음.⭐⭐⭐ 
                // 4) '언제 클릭하는가.' 를 ⭐'브라우저' 가⭐ 제공 ⭐⭐⭐⭐⭐⭐ 
                // 5) 이것과 관련해서 '브라우저가 제공하는 시스템' 이 '이벤트 시스템' 임.
                // 6) '이벤트 시스템' 의 구조는 ⭐⭐a) 어떤 ui 요소에 b) 어떤 event 가 발생하면(event 등록) c) 어떤 함수를 호출해줘⭐⭐⭐⭐⭐⭐⭐⭐
                // 7) 이때, js 에서는 함수 자체가 값이어서, 함수 자체를 실행할 수 있음! 
                // [시사점]
                    // 1) 자바스크립트만으로는 부족하다는 것 
                    // 2) 이벤트 시스템은 브라우저가 제공한다는 것 


    const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

    // 연결? 하기
    ajax.open('GET', 'https://api.hnpwa.com/v0/news/1.json', false)

    // 실제로 데이터를 가져오는 순간.
    ajax.send()

    // 가져온 데이터 보기 
    console.log(ajax.response);

    // JSON 형식의 response 데이터를 > 객체로 변환
    const newsFeed = JSON.parse(ajax.response)
    console.log(newsFeed)


// 🟦 처리해서, 보여주기 
    // UI 로 보여주기 
    const ul = document.createElement('ul');

    // hash 변경 이벤트 등록 😥😥😥 
    window.addEventListener('hashchange', function() {
        console.log(('해쉬가 변경됨'))

        const id = location.hash.substring(1);
        // [해석]
            // 문제점 : id 를 어떻게 하면 알 수 있을까? 에서 부터 나옴 
            // location : 1) ⭐브라우저⭐가 기본 제공하는 객체  2) ⭐'주소'⭐ 와 관련된 정보를 제공
            // 현재, hash 는 url 끝에 붙어 있어 (왜냐면, a.href 속성값으로 넣었기 때문에)
            // 그래서, ⭐⭐'현재 어떤 id 야?'⭐⭐ 라는 데이터를 ⭐'location 객체'⭐ 에서 얻어올 수 있음. 

        // [substring(1) 해석]
            // 문자열 중 1번째 부터만 쓸거야 
            // 왜냐면, id 에서 # 은 필요 없음. 
            // 이 순간 드는 생각 
                // 나라면, '빼는 거' 를 생각했을 텐데, 여기서는, 연관된 내장함수⭐⭐⭐ 를 썼어. 
                // 이 연관된 내장함수를 찾아내는게 필요할거 같네 ⭐⭐⭐
                // 이게 함수 스타일 프로그래밍인가.


        // 해쉬가 변경되면 > content 페이지 불러오기 
        ajax.open('GET', CONTENT_URL.replace('@id', id), false);
            // [해석]
                // ⭐⭐⭐⭐⭐⭐ 와 여기가 핵심이네. 
                // 1) CONTENT_URL 중, '바뀌어야 하는 부분' 에 '마크'를 찍어놓는다. 
                // 2) 들어와서 바꿔줄 때, '이 마크' 를 '이 데이터' 로 변경! 한다. 
                // 3) 이때, replace 메소드를 사용한다. ⭐⭐⭐ 
                // [지금 드는 생각]
                    // 이걸 어떻게 생각해내지? ⭐⭐⭐⭐⭐ 
                    // 어떻게 잘 생각해낼 수 있지? ⭐⭐⭐⭐⭐⭐ 
                    

        // 실제로, JSON 데이터가 들어온다.
        ajax.send();

        // JSON 데이터를 객체로 변환 
        const newContent = JSON.parse(ajax.response);
        
        // 제목에 내용 넣고 > div 태그에 붙이기  
        const title = document.createElement('h1');
        
        title.innerHTML = newContent.title;
        
        content.appendChild(title)
        console.log(newContent);



    })
        // [해석]
            // js 에서는 함수 자체가 값이어서, 함수 자체를 실행할 수 있음! 
        // [궁금한 것]
            // 클릭만 한건데, 대체, 왜, '해쉬가 변경됨' 으로 뜨는 거지❓❓❓❓❓❓ 
        // [원인 및 해결]    
            // 클릭하면 -> 북마크로 이동하고 -> 그 순간 hash 가 변경됨. 다만, 한번 변경하면, 계속 유지되니까, 추가적으로는 안 나와
            // http://127.0.0.1:5500/CH03_03/01_index.html#123
            // http://127.0.0.1:5500/CH03_03/01_index.html#ddd -> 이렇게 # 뒤의 부분을 자유롭게 변경할 수 있어
        // [응용]
            // ⭐ 이 hash 는 '북마크' 처럼 작동 ⭐ 
                // ex) 동일한 hash name 이 들어오면 -> 해당 부분으로 바로 스크롤이 이동 
            // so, hash 안에는 '유니크한 값' 을 넣어야 함. 
            // so, id 값을 넣는다. 
        // ⭐⭐⭐⭐⭐ [알게된 점] ⭐⭐⭐⭐⭐ 
            // id 는 '문법적' 으로 #을 쓰지만, 'id 에 # 을 쓰는 이유' 가 있었네. 
            // #은 hash 라고 불리고, hash 는 '북마크 처럼' 쓰이는데, 동일한 name이 들어오면, 그 부분으로 스크롤 된다는 거 말야. 



    for (let i = 0; i < 10; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a')

        a.href = `#${newsFeed[i].id}`;
            // [필요성]
                // a 태그를 넣었는데, 링크가 없는 것 처럼 보여서
            // [원리]
                // HTML 에서 a 태그의 속성중 href! 가 있는거고, 이걸 이 순간에! 구현됨 
            // [느낀점]
                // 1) HTML 을 잘 알고 있고, 이 HTML 을 '조작' 한다!! 는 느낌 ⭐⭐⭐⭐⭐ 
                // 2) 즉, 지금하는 JS 작업이 HTML 의 구체적으로 어떤 면을 '조작' 한다는 느낌 

        a.addEventListener('click', function() {

        })
            // [대상을 a, 이벤트 등록을 click로 했을 때의 문제점]
                // 어떤 a 태그인지 모름 
                // 따라서, 이벤트 등록을 hash change 라는 이벤트로 등록해볼 것 임. ⭐⭐⭐⭐⭐  


        // ⭐⭐⭐ <li><a>제목</a></li> 의 구조를 구현해야 함. ⭐⭐⭐  
            // 이걸 li 의 child 가 a 태그 
            // a 태그의 childe 가 제목
            // ⭐⭐⭐ HTML 문서의 '체계'를 append 로 구현한다는게 신기함 ⭐⭐⭐ 
            // 지금까지는 이 '체계' 를 '시각적' 으로 구현했는데, 지금은 append 로 한다는 것
        a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;
        li.appendChild(a)
        ul.appendChild(li);
    }

    // 🔷 root 에 추가해주기 
    container.appendChild(ul)
    container.appendChild(content)
    
        // [과거 코드]
            // document.getElementById('root').appendChild(ul);
            // document.getElementById('root').appendChild(content)
                // [문제점]
                    // root 가 반복해서 쓰임 
                    // '반복이 문제되는 이유' 
                        // 만약, id 를 rood 에서 home 으로 변경해야 한다면? 
                        // 1) 일일이 찾아야 하고 2) 누락되면 에러가 발생함. 
                // [어떻게 개선해?]
                    // root 가 반복되니까, 변수화, 시키기 ⭐⭐⭐ 
                    // const container = document.getElementById('root');
                // [시사점]
                    // 같은 div 밑에 들어가면, 이렇게 변수화 시키는건 js 만의 특징 
                    // html 을 조작한다는 면에서 ⭐⭐⭐⭐⭐⭐⭐⭐ 



// 📚 수업 과정 
    // 1. a 태그 추가 
    // 2. 댓글개수를 제목으로 표현하기 
    // 3. 화면전환 구현 
        // 제목을 클릭하면 > 글의 내용 가져오기 
            // 1) 제목클릭하면 > hash change 발생 하게 하기 
                // 여기에 숨어있는 건, hashchange 가 듣고 있는 건 = id에 쓰인 hash 를 의미
            // 2) 주소에 hash 뒤에 id 값이 들어가게 하기 
            // 3) location 객체에서 hash 값을 가져오게 하기 
                // hash 값에서 # 이후만 가져오기 
            // 4) ajax OPEN 할 때, url 마킹된 부분을 replace 해서 가져오기 ⭐⭐ 

            // 5) 데이터를 가져왔으면, 어떻게 보여줄 것 인가! 를 고민 ⭐⭐⭐ 
                // a) '콘텐츠 영역' , '타이틀만' 얹는 형태로

            