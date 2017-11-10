(function(){
//const term = grabEl("searchInput").value;

const grabEl = (id)=>{
 return document.getElementById(id);
}

class SearchData {
    constructor(url){
      this.url = url;
      window.document.getElementById('smt').addEventListener('click', (e) => {
        e.preventDefault();

        this.handleClick();
      });
    }

    getSearchInput(){
      return document.getElementById('search').value;
    }

    getSearchData(){
      const results = grabEl('results');
      const resultsL = grabEl('results-list');
      let s = grabEl('search');
      let term = this.getSearchInput();
      let _html = resultsL.innerHTML;

      axios.get(this.url + term + '&format=json')
        .then( (response) =>{
          const dataB1 = response.data[1];
          const dataB2 = response.data[2];
          const dataB3 = response.data[3];

          results.innerHTML = 'results for <h1>' + response.data[0] + '</h1>';
          resultsL.innerHTML = "";

        for(var i = 0; i < dataB1.length; i++){
            let eChild = document.createElement("li");
            eChild.innerHTML = "<li><h3>" + dataB1[i] + "</h3>"
            + dataB2[i] + "</br><a href=" + dataB3[i] + "></br>"
            +"<i>more on</i>" + " " +dataB1[i] + "</a>" + "</li>"

            resultsL.append(eChild);
          }
          //s.reset();
      }).catch( (error) => {
          console.log(error.response);
      })

    }

    handleClick(){
     //let s = grabEl('search');
     this.getSearchData();

    }

}
const wikiURL = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=';
const wikiSearch = new SearchData(wikiURL);
 })();
