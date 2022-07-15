let testsites = [
  'example.com',
  'anotherexample.com'
]
chrome.storage.local.set({sitenames: testsites });
if (document.URL.includes('tbm=shop')){
  const respanelcl = 'sh-pr__product-results-grid sh-pr__product-results'
  const cardcl = 'sh-dgr__gr-auto sh-dgr__grid-result'
  let results = document.getElementsByClassName(respanelcl);
  if (results.length > 0){
    let result_cards = results[0].getElementsByClassName(cardcl);
    chrome.storage.local.get('sitenames', result => {
      result.sitenames.map(value => {
        for (const card of result_cards) {
          if (card.innerHTML.includes(value)) {
            card.remove();
          }
        }      
      });
    });
  }
}