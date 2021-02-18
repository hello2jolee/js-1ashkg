import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);
// const getOffsetTops = (() => {
//   let ofst = 0;
//   let res = [];
//   return () => {
//     if (window.innerHeight === ofst) {
//       return res;
//     }
//     ofst = window.innerHeight;
//     res = contentItems.map(elem => {
//       const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
//       return [ofs - clh / 2, ofs + clh / 2];
//     });
//     return res;
//   };
// })();
let offsetTops = [];
const getOffsetTops = () => {
  offsetTops = contentItems.map(elem => {
    const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
    return [ofs - clh / 2, ofs + clh / 2];
  });
};
getOffsetTops();

window.addEventListener("scroll", e => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = offsetTops.findIndex(
    ([from, to]) => scrollTop >= from && scrollTop < to
  );
  Array.from(navElem.children).forEach((c, i) => {
    if (i !== targetIndex) c.classList.remove("on");
    else c.classList.add("on");
  });
});

window.addEventListener("resize", getOffsetTops);

navElem.addEventListener("click", e => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }
});
