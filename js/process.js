const request = require("request");
const cheerio = require('cheerio');
var fs = require('fs');

request('https://www.commonsensemedia.org/lists/50-books-all-kids-should-read-before-theyre-12', (error, response, html)=>{
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);
        var bookList = $('.field-content');
        var dateList = $('.nowrap-date');
        var authorList = $('.supplemental-data-wrapper csm_review');
        var ageList = $('.csm-green-age')
        var titles = [];
        var dates = [];
        var authors = [];
        var ageranges = [];
        for(let i = 2; i < bookList.length; i+=3){
            if(i%2 == 0){
                let title = bookList.eq(i).html();
                title = title.substring(title.indexOf(">") + 1);
                title = title.substring(0, title.indexOf("<"));
                while(title.indexOf('&apos;')>= 0){
                    title = title.substring(0, title.indexOf('&apos;')) + title.substring(title.indexOf('&apos;')+ 6);
                }
                while(title.indexOf(',')>= 0){
                    title = title.substring(0, title.indexOf(',')) + title.substring(title.indexOf(',')+ 1);
                }
                titles.push(title);
                // console.log(name);
            }
            else{
                let date = bookList.eq(i).html();
                date = date.substring(date.substring(date.indexOf(">") + 1), date.indexOf("</"));
                date = date.substring(date.indexOf(">") + 1);
                date = date.substring(date.indexOf(">") + 1);
                dates.push(parseInt(date));
                // console.log(date);
            }
        }
        for(let i = 3; i < bookList.length; i+= 6){
            let author = bookList.eq(i).html();
            while(author.indexOf(",")>=0){
                author = author.substring(0, author.indexOf(',')) + " and " + author.substring(author.indexOf(',')+ 1);
            }
            authors.push(author);
        }
        for(let i = 0; i < ageList.length; i++){
            let ageRange = ageList.eq(i).html().substring(ageList.eq(i).html().indexOf("n>")+6, ageList.eq(i).html().length-1);
            ageranges.push(parseInt(ageRange));
        }
        fs.writeFile("books.txt", titles + "\n" + authors + "\n" + dates + "\n" + ageranges, (err)=>{
            if(err) throw err;
        })
    }
})
