const ld = document.querySelector(".ld");
const ht = document.querySelector('html');
const a = Array.from(document.querySelectorAll(".a"));
const sv = document.querySelector(".sv");
const sm = document.querySelector(".sm");
const yt = document.querySelector(".ytd");
const h2 = document.querySelector(".hh");
const ad = Array.from(document.querySelectorAll(".at"));
const aa = Array.from(document.querySelectorAll(".aa"));
const asvg = Array.from(document.querySelectorAll(".asvg"));
const li = Array.from(document.querySelectorAll("li"));
const ppp = Array.from(document.querySelectorAll(".at p"));
const p = document.querySelector(".pa");
const ft = document.querySelector(".ftd");
const h1 = document.querySelector(".h1");
const sb = document.querySelector(".sb");
const vi = document.querySelector(".vi");
const nd = document.querySelector(".nd");

let wh;
document.body.onload = ()=>{ wh = [ld, sm, yt, h2];}
ld.onclick = ()=> {
    if (ld.textContent == 'dark') {
    ht.className = 'bd'
    sv.classList.add('sw')
    p.classList.add('pd')
    h1.classList.add('h11')
    vi.classList.add('vii')
    nd.classList.add('ndd')
    for (let i = 0; i < aa.length; i++){
      asvg[i].classList.add('fd')
    }
    for (let i = 0; i < aa.length; i++){
      aa[i].classList.add('aad')
      ppp[i].classList.add('ppd')
    }
    for (let i = 0; i < ad.length; i++){
      ad[i].classList.add('art')
      li[i].classList.add('lid')
    }
    for (let i = 0; i < a.length; i++){
      a[i].classList.remove('da');
      a[i].classList.add('wh');
    }
    for (let i = 0; i < wh.length; i++){
      wh[i].classList.remove('da')
      wh[i].classList.add('wh')
    }
    ld.textContent = 'light'
    ft.classList.add('wh')
    } else if (ld.textContent == 'light') {
    ht.className = 'bl'
    sv.classList.remove('sw')
    p.classList.remove('pd')
    h1.classList.remove('h11')
    vi.classList.remove('vii')
    nd.classList.remove('ndd')
    for (let i = 0; i < aa.length; i++){
      asvg[i].classList.remove('fd')
    }
    for (let i = 0; i < aa.length; i++){
      aa[i].classList.remove('aad')
      ppp[i].classList.remove('ppd')
    }
    for (let i = 0; i < ad.length; i++){
      ad[i].classList.remove('art')
      li[i].classList.remove('lid')
    }
    for (let i = 0; i < a.length; i++){
      a[i].classList.remove('wh');
      a[i].classList.add('da');
    }
    for (let i = 0; i < wh.length; i++){
      wh[i].classList.remove('wh')
      wh[i].classList.add('da')
    }
    ld.textContent = 'dark'
    ft.classList.remove('wh')
  }
}

sv.onclick = ()=> {
  if (sb.className === 'sb') {sb.classList.add('sbb')}
  else if (sb.className === 'sb sbb') {sb.classList.remove('sbb')}
}