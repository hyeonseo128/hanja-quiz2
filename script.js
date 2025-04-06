const words = [
    { id: 1, text: "반딧불이 형", image: "1.png" },
    { id: 2, text: "눈 설", image: "2.png" },
    { id: 3, text: "갈, 어조사 지", image: "3.png" },
    { id: 4, text: "공 공", image: "4.png" },
    { id: 5, text: "더할 더욱 익", image: "5.png" },
    { id: 6, text: "착할, 좋을 선", image: "6.png" },
    { id: 7, text: "다 함", image: "7.png" },
    { id: 8, text: "다를, 사신 보낼 차", image: "8.png" },
    { id: 9, text: "부릴 사", image: "9.png" },
    { id: 10, text: "닭 계", image: "10.png" },
    { id: 11, text: "알 란", image: "11.png" },
    { id: 12, text: "있을 유", image: "12.png" },
    { id: 13, text: "뼈 골", image: "13.png" },
    { id: 14, text: "갚을 보", image: "14.png" },
    { id: 15, text: "은혜 은", image: "15.png" },
    { id: 16, text: "흰 백", image: "16.png" },
    { id: 17, text: "눈 안", image: "17.png" },
    { id: 18, text: "볼 시", image: "18.png" },
    { id: 19, text: "지나칠 과", image: "19.png" },
    { id: 20, text: "오히려 유", image: "20.png" },
    { id: 21, text: "아니 불", image: "21.png" },
    { id: 22, text: "미칠 급", image: "22.png" },
    { id: 23, text: "은혜 혜", image: "23.png" },
    { id: 24, text: "경사 경", image: "24.png" },
    { id: 25, text: "빌 축", image: "25.png" },
    { id: 26, text: "원망할 원", image: "26.png" },
    { id: 27, text: "한할 한", image: "27.png" },
    { id: 28, text: "항상 항", image: "28.png" },
    { id: 29, text: "오랠 구", image: "29.png" },
    { id: 30, text: "별, 경치 경", image: "30.png" },
    { id: 31, text: "근원, 언덕 원", image: "31.png" },
    { id: 32, text: "덜 제", image: "32.png" },
    { id: 33, text: "보전할 보", image: "33.png" },
    { id: 34, text: "본받을 효", image: "34.png" },
    { id: 35, text: "처음 초", image: "35.png" },
    { id: 36, text: "가르칠 훈", image: "36.png" },
    { id: 37, text: "백성 민", image: "37.png" },
    { id: 38, text: "흐를 류", image: "38.png" },
    { id: 39, text: "하늘 건", image: "39.png" },
    { id: 40, text: "땅 곤", image: "40.png" },
    { id: 41, text: "던질 척", image: "41.png" },
    { id: 42, text: "수레 거/차", image: "42.png" },
    { id: 43, text: "쌀 포", image: "43.png" },
    { id: 44, text: "코끼리 상", image: "44.png" },
    { id: 45, text: "군사 병", image: "45.png" },
    { id: 46, text: "군사 졸", image: "46.png" }
];

let questionPool = [];
let memorized = [];
let unmemorized = [];
let currentWord = null;
let currentMode = "all";
let currentQuizType = "textToImage";

// 문제 리스트 초기화 및 섞기
function resetQuestions() {
    if (currentMode === "all") {
        questionPool = shuffle([...words]);
    } else if (currentMode === "memorized") {
        questionPool = shuffle([...memorized]);
    } else if (currentMode === "unmemorized") {
        questionPool = shuffle([...unmemorized]);
    }
}

// 학습 모드 변경
document.getElementById("modeSelect").addEventListener("change", (e) => {
    currentMode = e.target.value;
    resetQuestions();
    loadNextQuestion();
});

// 출제 방식 변경
document.getElementById("quizType").addEventListener("change", (e) => {
    currentQuizType = e.target.value;
    loadNextQuestion();
});

// 랜덤 섞기
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 다음 문제 로드
function loadNextQuestion() {
    if (questionPool.length === 0) {
        resetQuestions();
    }

    if (questionPool.length === 0) {
        document.getElementById("question").textContent = "문제가 없습니다.";
        document.getElementById("image").classList.add("hidden");
        return;
    }

    currentWord = questionPool.pop();

    if (currentQuizType === "textToImage") {
        document.getElementById("question").textContent = currentWord.text;
        document.getElementById("image").src = `images/${currentWord.image}`;
        document.getElementById("image").classList.add("hidden");
    } else {
        document.getElementById("question").textContent = "";
        document.getElementById("image").src = `images/${currentWord.image}`;
        document.getElementById("image").classList.remove("hidden");
    }

    updateProgress();
}

// 진행 상황 업데이트 (현재 문제 번호 포함)
function updateProgress() {
    const totalQuestions = words.length;
    const currentQuestionNumber = totalQuestions - questionPool.length;
    
    document.getElementById("progress").textContent =
        `현재 문제: ${currentQuestionNumber} / ${totalQuestions}  
        | 남은 문제: ${questionPool.length}  
        | 외운 문제: ${memorized.length}  
        | 못 외운 문제: ${unmemorized.length}`;
}


// 정답 보기
document.getElementById("showAnswer").addEventListener("click", () => {
    if (currentQuizType === "textToImage") {
        document.getElementById("image").classList.remove("hidden");
    } else {
        document.getElementById("question").textContent = currentWord.text;
    }
});

// 몰라요
document.getElementById("dontKnow").addEventListener("click", () => {
    if (!unmemorized.includes(currentWord)) {
        unmemorized.push(currentWord);
    }
    loadNextQuestion();
});

// 알아요
document.getElementById("know").addEventListener("click", () => {
    if (!memorized.includes(currentWord)) {
        memorized.push(currentWord);
    }
    loadNextQuestion();
});

// 진행 상황 업데이트
function updateProgress() {
    document.getElementById("progress").textContent = 
        `남은 문제: ${questionPool.length}, 외운 문제: ${memorized.length}, 못 외운 문제: ${unmemorized.length}`;
}

// 초기 문제 설정
resetQuestions();
loadNextQuestion();