var filteredbox = '<div class="sh-dr__g" data-drrg=""><div class="ELcVZ"><div class="lg3aE">Sites excluidos</div></div><div class="RhVG3d"><div><div id="siteslist" class="sh-dr__short" data-ved="0ahUKEwjX-fKj0_74AhV0HbkGHUQ4BrEQuysIhQooAA"><span id="inputsite" class="DON5yf"><input id="newsite" type="text"><button id="adsite">Adicionar</button><button id="rmsite">Remover</button></span></div></div></div></div>';
document.querySelector('.sh-dr__g.zehhyb').insertAdjacentHTML('afterend', filteredbox);
let siteslistelem = document.getElementById('inputsite');
let sitelist = [];

function insertSite(value) {
  let site = '<span>' + value + '</span><br>';
  siteslistelem.insertAdjacentHTML('beforebegin', site);
  sitelist.push(value);
}

chrome.storage.local.get('sitenames', result => {
  if (result.sitenames){
    result.sitenames.map(insertSite);
  }
});

document.getElementById('adsite').addEventListener('click', () => {
  const newsite = document.getElementById('newsite').value;
  if (!sitelist.includes(newsite)){
    insertSite(newsite);
    chrome.storage.local.set({sitenames: sitelist});
    filterSites();
  }
});
document.getElementById('rmsite').addEventListener('click', () => {
  const sitename = document.getElementById('newsite').value;
  sitelist = sitelist.filter(x => x != sitename)
  chrome.storage.local.set({sitenames: sitelist});
  window.location.reload();
});

function filterSites() {
  if (document.URL.includes('tbm=shop')){
    const respanelcl = 'sh-pr__product-results-grid sh-pr__product-results'
    const cardcl = 'sh-dgr__gr-auto sh-dgr__grid-result'
    const results = document.getElementsByClassName(respanelcl);
    if (results.length > 0){
      let result_cards = results[0].getElementsByClassName(cardcl);
      chrome.storage.local.get('sitenames', result => {
        result.sitenames.map(value => {
          // can't delete the first without break style
          for (i = result_cards.length - 1; i > 0; i--) {
            if (result_cards[i].innerHTML.includes(value)) {
              result_cards[i].remove();
            }
          }      
        });
      });
    }
  }
};
document.body.onload = filterSites();