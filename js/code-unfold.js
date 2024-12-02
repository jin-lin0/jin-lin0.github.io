const CODE_MAX_HEIGHT = 200;
let containers = [];

document.body.addEventListener("click", (event) => {
  if (event.target.closest(".js_unfold_code_btn")) {
    const container = event.target.closest(".js_highlight_container");
    container.classList.add("on");
    adjustHideButton(container);
  }
});

document.body.addEventListener("click", (event) => {
  if (event.target.closest(".js_retract_code_btn")) {
    const container = event.target.closest(".js_highlight_container");
    container.classList.remove("on");
    const winTop = window.scrollY;
    const offsetTop = container.getBoundingClientRect().top + winTop;

    const hideBtn = container.querySelector(".js_retract_code_btn");
    if (hideBtn) {
      hideBtn.style.top = "0px";
    }

    if (winTop > offsetTop) {
      window.scrollTo({
        top: offsetTop - CODE_MAX_HEIGHT,
        behavior: "smooth",
      });
    }
  }
});

window.addEventListener("scroll", () => {
  const temp = [];
  for (let i = 0; i < containers.length; i++) {
    const { container } = containers[i];

    if (!document.body.contains(container)) {
      continue;
    }

    temp.push(containers[i]);

    if (container.classList.contains("on")) {
      adjustHideButton(container);
    }
  }
  containers = temp;
});

function addCodeWrap(node) {
  const container = document.createElement("div");
  container.className = "js_highlight_container highlight-container";
  const wrap = document.createElement("div");
  wrap.className = "highlight-wrap";

  node.parentNode.insertBefore(container, node);
  container.appendChild(wrap);
  wrap.appendChild(node);

  container.insertAdjacentHTML(
    "beforeend",
    `
    <div class="highlight-footer">
      <a class="js_unfold_code_btn show-btn" href="javascript:void(0);"><i class="fa fa-angle-down" aria-hidden="true"></i></a>
    </div>
    <a class="js_retract_code_btn hide-btn" href="javascript:void(0);"><i class="fa fa-angle-up" aria-hidden="true"></i>收起代码</a>
  `
  );

  return container;
}

function codeUnfold() {
  document.querySelectorAll(".highlight").forEach((node) => {
    if (node.__render__) return;
    node.__render__ = true;

    const height = node.offsetHeight;
    if (height > CODE_MAX_HEIGHT) {
      const container = addCodeWrap(node);
      containers.push({
        container,
        height,
        hideBtn: container.querySelector(".js_retract_code_btn"),
        hasHorizontalScrollbar: node.scrollWidth > node.offsetWidth,
      });
    }
  });
}

function adjustHideButton(container) {
  const scrollTop = window.scrollY;
  const height = container.offsetHeight;
  const offsetTop = container.getBoundingClientRect().top + scrollTop;
  const hideBtn = container.querySelector(".js_retract_code_btn");
  const hasHorizontalScrollbar = container.scrollWidth > container.offsetWidth;

  const hideBtnHeight = hideBtn.offsetHeight;
  const maxTop = Math.max(
    0,
    height - (hasHorizontalScrollbar ? 37 : 20) - hideBtnHeight
  );

  const top = Math.min(Math.max(scrollTop - offsetTop, 0), maxTop);

  const halfHeight = Math.floor(
    (window.innerHeight / 2) * Math.sin((top / maxTop) * 90 * (Math.PI / 180))
  );
  hideBtn.style.top = `${Math.min(top + halfHeight, maxTop)}px`;
}
