/* CS 퀴즈 클라이언트
 * - questions.json 을 fetch
 * - setup → playing → summary 의 단순 상태 머신
 * - 즉시 채점, 카테고리 필터, 문제 수 선택, 키보드 단축키(1~4, Enter, Space)
 */
(function () {
  const ROOT_ID = "quiz-app";

  const state = {
    questions: [],
    categories: [],
    selectedCategories: new Set(),
    count: 10,
    queue: [],
    cursor: 0,
    selected: null,     // 현재 문제에서 사용자가 고른 옵션 텍스트
    revealed: false,    // 채점 결과 표시 중 여부
    results: [],        // { question, picked, correct }
    options: [],        // 셔플된 현재 옵션 [{ text, isCorrect }]
  };

  const root = document.getElementById(ROOT_ID);
  if (!root) return;

  // --- utilities ---
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function setState(name) { root.dataset.state = name; }

  // --- data loading ---
  async function load() {
    setState("loading");
    try {
      const res = await fetch("questions.json", { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      state.questions = data.questions || [];
      state.categories = data.categories || [];
      state.selectedCategories = new Set(state.categories.map((c) => c.id));
      renderSetup();
    } catch (err) {
      root.innerHTML = `<div class="quiz-empty">데이터를 불러올 수 없습니다: ${escapeHtml(err.message)}</div>`;
    }
  }

  // --- setup screen ---
  function renderSetup() {
    setState("setup");
    if (!state.questions.length) {
      root.innerHTML = `<div class="quiz-empty">
        아직 퀴즈로 마이그레이션된 카드가 없습니다.
        <code>??? quiz</code> 블록이 포함된 카드만 등장합니다.
      </div>`;
      return;
    }

    const availableTotal = state.questions
      .filter((q) => state.selectedCategories.has(q.category))
      .length;
    const counts = [10, 20, 50].filter((n) => n <= availableTotal);
    if (!counts.includes(availableTotal)) counts.push(availableTotal);
    if (!counts.includes(state.count)) state.count = counts[0];

    const chips = state.categories
      .map((c) => {
        const pressed = state.selectedCategories.has(c.id);
        return `<button type="button" class="quiz-chip" data-cat="${escapeHtml(c.id)}" aria-pressed="${pressed}">
          ${escapeHtml(c.label)} <span class="quiz-chip__count">${c.count}</span>
        </button>`;
      })
      .join("");

    const countButtons = counts
      .map((n) => {
        const label = n === availableTotal ? `전체 (${n})` : String(n);
        const pressed = n === state.count;
        return `<button type="button" class="quiz-chip" data-count="${n}" aria-pressed="${pressed}">${escapeHtml(label)}</button>`;
      })
      .join("");

    root.innerHTML = `
      <div class="quiz-setup">
        <h3 class="quiz-setup__title">퀴즈 설정</h3>
        <p class="quiz-setup__meta">총 ${state.questions.length}문항 · 선택 가능 ${availableTotal}문항</p>

        <div class="quiz-setup__group">
          <h4>카테고리</h4>
          <div class="quiz-setup__categories">${chips}</div>
        </div>

        <div class="quiz-setup__group">
          <h4>문제 수</h4>
          <div class="quiz-setup__counts">${countButtons}</div>
        </div>

        <div class="quiz-setup__actions">
          <button type="button" class="quiz-btn quiz-btn--primary" data-action="start" ${availableTotal === 0 ? "disabled" : ""}>시작</button>
        </div>
      </div>
    `;

    root.querySelectorAll("[data-cat]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.cat;
        if (state.selectedCategories.has(id)) state.selectedCategories.delete(id);
        else state.selectedCategories.add(id);
        renderSetup();
      });
    });
    root.querySelectorAll("[data-count]").forEach((el) => {
      el.addEventListener("click", () => {
        state.count = parseInt(el.dataset.count, 10);
        renderSetup();
      });
    });
    root.querySelector('[data-action="start"]').addEventListener("click", startQuiz);
  }

  // --- playing ---
  function startQuiz() {
    const pool = state.questions.filter((q) => state.selectedCategories.has(q.category));
    state.queue = shuffle(pool).slice(0, state.count);
    state.cursor = 0;
    state.results = [];
    prepareCurrent();
    renderPlaying();
  }

  function prepareCurrent() {
    state.selected = null;
    state.revealed = false;
    const q = state.queue[state.cursor];
    const opts = [
      { text: q.answer, isCorrect: true },
      ...q.distractors.map((d) => ({ text: d, isCorrect: false })),
    ];
    state.options = shuffle(opts);
  }

  function renderPlaying() {
    setState("playing");
    const total = state.queue.length;
    const q = state.queue[state.cursor];
    if (!q) return renderSummary();

    const progressPct = Math.round(((state.cursor) / total) * 100);
    const optionsHtml = state.options
      .map((o, i) => {
        let cls = "quiz-option";
        if (state.revealed) {
          if (o.isCorrect) cls += " quiz-option--correct";
          else if (o.text === state.selected) cls += " quiz-option--wrong";
        }
        const pressed = !state.revealed && o.text === state.selected;
        return `<button type="button" class="${cls}" data-opt-index="${i}" aria-pressed="${pressed}" ${state.revealed ? "disabled" : ""}>
          <span class="quiz-option__num">${i + 1}</span>
          <span class="quiz-option__text">${escapeHtml(o.text)}</span>
        </button>`;
      })
      .join("");

    const resultHtml = state.revealed ? renderResultCard(q) : "";

    const nextLabel = state.cursor + 1 >= total ? "결과 보기" : "다음 문제 →";
    const actions = state.revealed
      ? `<button type="button" class="quiz-btn quiz-btn--primary" data-action="next">${nextLabel}</button>`
      : `<button type="button" class="quiz-btn quiz-btn--primary" data-action="submit" ${state.selected === null ? "disabled" : ""}>제출</button>`;

    root.innerHTML = `
      <div class="quiz-play">
        <div class="quiz-play__header">
          <span>${state.cursor + 1} / ${total}</span>
          <span>${escapeHtml(q.category_label)}</span>
        </div>
        <div class="quiz-progress"><div class="quiz-progress__bar" style="width:${progressPct}%"></div></div>
        <p class="quiz-play__question">Q. ${escapeHtml(q.question)}</p>
        <div class="quiz-options">${optionsHtml}</div>
        ${resultHtml}
        <div class="quiz-play__actions">${actions}</div>
      </div>
    `;

    root.querySelectorAll("[data-opt-index]").forEach((el) => {
      el.addEventListener("click", () => {
        if (state.revealed) return;
        state.selected = state.options[parseInt(el.dataset.optIndex, 10)].text;
        renderPlaying();
      });
    });
    const submitBtn = root.querySelector('[data-action="submit"]');
    if (submitBtn) submitBtn.addEventListener("click", submit);
    const nextBtn = root.querySelector('[data-action="next"]');
    if (nextBtn) nextBtn.addEventListener("click", goNext);
  }

  function renderResultCard(q) {
    const last = state.results[state.results.length - 1];
    const correct = last && last.correct;
    const verdictCls = correct ? "quiz-result__verdict--correct" : "quiz-result__verdict--wrong";
    const verdictText = correct ? "✓ 정답" : "✗ 오답";

    const followups = (q.followups && q.followups.length)
      ? `<p class="quiz-result__section-title">꼬리 질문</p>
         <ul class="quiz-result__list">${q.followups.map((f) => `<li>${escapeHtml(f)}</li>`).join("")}</ul>`
      : "";

    const related = (q.related && q.related.length)
      ? `<p class="quiz-result__section-title">관련 문서</p>
         <ul class="quiz-result__list">${q.related.map((r) => r.url
           ? `<li><a href="${escapeHtml(r.url)}">${escapeHtml(r.title)}</a></li>`
           : `<li>${escapeHtml(r.title)}</li>`).join("")}</ul>`
      : "";

    const sourceLink = q.source
      ? `<p class="quiz-result__section-title">원문</p>
         <ul class="quiz-result__list"><li><a href="../${escapeHtml(q.source.replace(/\.md$/, "/"))}">${escapeHtml(q.source)}</a></li></ul>`
      : "";

    return `
      <div class="quiz-result">
        <div class="quiz-result__verdict ${verdictCls}">${verdictText}</div>
        <p class="quiz-result__explain">${escapeHtml(q.explanation || q.answer)}</p>
        ${followups}
        ${related}
        ${sourceLink}
      </div>
    `;
  }

  function submit() {
    if (state.selected === null) return;
    const q = state.queue[state.cursor];
    const picked = state.options.find((o) => o.text === state.selected);
    state.results.push({ id: q.id, picked: state.selected, correct: !!(picked && picked.isCorrect) });
    state.revealed = true;
    renderPlaying();
  }

  function goNext() {
    state.cursor += 1;
    if (state.cursor >= state.queue.length) {
      renderSummary();
      return;
    }
    prepareCurrent();
    renderPlaying();
  }

  // --- summary ---
  function renderSummary() {
    setState("summary");
    const total = state.results.length;
    const correctCount = state.results.filter((r) => r.correct).length;
    const wrongIds = new Set(state.results.filter((r) => !r.correct).map((r) => r.id));

    // 카테고리별 정답률
    const byCat = new Map();
    state.queue.forEach((q, i) => {
      const r = state.results[i];
      if (!r) return;
      const slot = byCat.get(q.category_label) || { total: 0, correct: 0 };
      slot.total += 1;
      if (r.correct) slot.correct += 1;
      byCat.set(q.category_label, slot);
    });
    const breakdownHtml = Array.from(byCat.entries())
      .map(([label, { total, correct }]) => `
        <div class="quiz-summary__row">
          <span>${escapeHtml(label)}</span>
          <strong>${correct} / ${total}</strong>
        </div>`)
      .join("");

    const retryWrongBtn = wrongIds.size
      ? `<button type="button" class="quiz-btn" data-action="retry-wrong">틀린 ${wrongIds.size}문제만 다시</button>`
      : "";

    root.innerHTML = `
      <div class="quiz-summary">
        <h3 class="quiz-setup__title">결과</h3>
        <p class="quiz-summary__score">${correctCount} / ${total}</p>
        <div class="quiz-summary__breakdown">${breakdownHtml}</div>
        <div class="quiz-summary__actions">
          <button type="button" class="quiz-btn quiz-btn--primary" data-action="restart">다시 풀기</button>
          ${retryWrongBtn}
          <button type="button" class="quiz-btn" data-action="setup">설정으로</button>
        </div>
      </div>
    `;

    const restart = root.querySelector('[data-action="restart"]');
    if (restart) restart.addEventListener("click", startQuiz);
    const retryWrong = root.querySelector('[data-action="retry-wrong"]');
    if (retryWrong) retryWrong.addEventListener("click", () => {
      state.queue = state.questions.filter((q) => wrongIds.has(q.id));
      state.cursor = 0;
      state.results = [];
      prepareCurrent();
      renderPlaying();
    });
    const back = root.querySelector('[data-action="setup"]');
    if (back) back.addEventListener("click", renderSetup);
  }

  // --- keyboard shortcuts ---
  document.addEventListener("keydown", (e) => {
    if (root.dataset.state !== "playing") return;
    if (e.target && /^(input|textarea|select)$/i.test(e.target.tagName)) return;
    if (e.key >= "1" && e.key <= "4" && !state.revealed) {
      const idx = parseInt(e.key, 10) - 1;
      if (state.options[idx]) {
        state.selected = state.options[idx].text;
        renderPlaying();
        e.preventDefault();
      }
    } else if (e.key === "Enter") {
      if (state.revealed) goNext();
      else if (state.selected !== null) submit();
      e.preventDefault();
    }
  });

  load();
})();
