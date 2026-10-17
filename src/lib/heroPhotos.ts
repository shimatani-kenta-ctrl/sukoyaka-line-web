/**
 * トップの写真を、開くたびにランダムに選び直す。
 * 候補はお客様の了承済みの現場写真だけ。背景の切り替えに4枚、手前のカードに1枚を選ぶ。
 * 写真を増やしたら、ここに足すだけで候補に入ります。
 */
export const heroPhotoPool = [
  "/photos/hero/1.jpg",
  "/photos/hero/2.jpg",
  "/photos/hero/3.jpg",
  "/photos/hero/4.jpg",
  "/photos/ahu-piping-frame-2.jpg",
  "/photos/air-filter-angle-frame.jpg",
  "/works/amagasaki-electrolytic-cell-piping-2026-04/1.jpg",
  "/works/amagasaki-electrolytic-cell-piping-2026-04/3.jpg",
  "/works/nara-chemical-plant-cooling-water-2025-08/1.jpg",
];

/** 写真を入れ替える処理（ページの読み込み時に、画面に出る前に実行。別ページから戻ったときも実行） */
export const heroShuffleScript = `(window.__heroShuffle=function(){var p=${JSON.stringify(heroPhotoPool)}.slice();for(var i=p.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=p[i];p[i]=p[j];p[j]=t;}var s=document.querySelectorAll('[data-hero-photo]');if(!s.length)return;for(var k=0;k<s.length;k++){s[k].src=p[k];}var c=document.querySelector('[data-hero-sub]');if(c)c.src=p[s.length];var g=document.querySelector('[data-hero-ghost]');if(g)g.src=p[0];var h=document.querySelector('[data-hero-pin]');if(h)h.setAttribute('data-shuffled','1');})();`;
