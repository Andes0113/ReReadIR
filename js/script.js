const searchinput = $("#booksearch");
const searchbutton = $("#searchbutton");
let radiobuttons = $("[name= 'option']");
let bookList = "Dont Let the Pigeon Drive the Bus!,Goodnight Goodnight Construction Site,Goodnight Moon,The Snowy Day,The Very Hungry Caterpillar,Where the Wild Things Are,Harold and the Purple Crayon,The Tale of Peter Rabbit,The Cat in the Hat,Frog and Toad Are Friends,Last Stop on Market Street,Madeline,The Complete Tales &amp; Poems of Winnie-the-Pooh,Mercy Watson to the Rescue: Mercy Watson Book 1,Charlie and the Chocolate Factory,Ivy + Bean Book 1,Stuart Little,Where the Sidewalk Ends,Charlottes Web,Ramona the Pest,Coraline,Harry Potter and the Sorcerers Stone,The Lion the Witch and the Wardrobe: The Chronicles of Narnia Book 1,The Tale of Despereaux: Being the Story of a Mouse a Princess Some Soup and a Spool of Thread,Alices Adventures in Wonderland,Anne of Green Gables,The Bad Beginning: A Series of Unfortunate Events Book 1,Bridge to Terabithia,Bud Not Buddy,Diary of a Wimpy Kid,The Hobbit,The Lightning Thief: Percy Jackson and the Olympians Book 1,Tales of a Fourth Grade Nothing,A Wrinkle in Time,Esperanza Rising,Hold Fast,I Am Malala: How One Girl Stood Up for Education and Changed the World,Inside Out and Back Again,My Side of the Mountain,Revolution Is Not a Dinner Party,Walk Two Moons,Anne Frank: The Diary of a Young Girl,Wonder,Enders Game,The Fellowship of the Ring,The Hunger Games Book 1,Legend Book 1,March: Book One,The Outsiders,To Kill a Mockingbird".split(',');
let authorList = "Mo Willems,Sherri Duskey Rinker,Margaret Wise Brown,Ezra Jack Keats,Eric Carle,Maurice Sendak,Crockett Johnson,Beatrix Potter,Dr. Seuss,Arnold Lobel,Matt de la Pe&#xF1;a,Ludwig Bemelmans,A. A. Milne,Kate DiCamillo,Roald Dahl,Annie Barrows,E.B. White,Shel Silverstein,E.B. White,Beverly Cleary,Neil Gaiman,J. K. Rowling,C.S. Lewis,Kate DiCamillo,Lewis Carroll,L.M. Montgomery,Lemony Snicket,Katherine Paterson,Christopher Paul Curtis,Jeff Kinney,J.R.R. Tolkien,Rick Riordan,Judy Blume,Madeleine L&apos;Engle,Pam Munoz Ryan,Blue Balliett,Malala Yousafzai and  Patricia McCormick,Thanhha Lai,Jean Craighead George,Ying Chang Compestine,Sharon Creech,Anne Frank,R.J. Palacio,Orson Scott Card,J.R.R. Tolkien,Suzanne Collins,Marie Lu,John Lewis and  Andrew Aydin and  Nate Powell,S. E. Hinton,Harper Lee".split(',');
let yearList = "2004,2011,1947,1962,1970,1969,1955,1902,1957,1970,2015,1977,1996,2005,1964,2007,1945,2004,1952,1992,2004,1998,1950,2004,1865,1908,1999,1977,1999,2007,1937,2005,1972,1962,2000,2013,2014,2011,1959,2007,1994,1947,2012,2005,1954,2008,2011,2013,1967,1960".split(',');
let ageList = "2,2,2,2,2,2,3,3,4,4,3,4,5,5,6,6,6,6,7,7,8,8,8,8,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,11,10,12,12,12,12,12,12,12".split(',');
let bookslist = [];
for(let i = 0; i < ageList.length; i++){
    yearList[i] = parseInt(yearList[i]);
    ageList[i] = parseInt(ageList[i]);
    bookslist.push(new Book(bookList[i], authorList[i], yearList[i], ageList[i]));
}
console.log(bookslist);
console.log(ageList);
const catalog = new Catalog(bookslist);
let results = catalog.books;
postResults(results);

searchbutton.on("click", function(){
    let searchoption = getOption();
    results = [];
    if(searchoption == "title"){
        for(let i = 0; i < catalog.books.length; i++){

            if(catalog.books[i].name.toLowerCase().indexOf(searchinput.val().toLowerCase()) > -1){
                if((catalog.books[i].date >= parseInt($("#loweryear").val()) || $("#loweryear").val() == "")
                    && (((catalog.books[i].date <= parseInt($("#higheryear").val()))) || $("#higheryear").val() == "")
                    && (catalog.books[i].agerange <= parseInt($("#agerestrict").val()) || $("#agerestrict").val() == "")){
                    results.push(catalog.books[i]);
                }
            }
        }
        postResults(results);
    }
    if(searchoption == "author"){
        for(let i = 0; i < catalog.books.length; i++){
            if(catalog.books[i].author.toLowerCase().indexOf(searchinput.val().toLowerCase()) > -1){
                if((catalog.books[i].date >= parseInt($("#loweryear").val()) || $("#loweryear").val() == "")
                    && (((catalog.books[i].date <= parseInt($("#higheryear").val()))) || $("#higheryear").val() == "")
                    && (catalog.books[i].agerange <= parseInt($("#agerestrict").val()) || $("#agerestrict").val() == "")){
                    results.push(catalog.books[i]);
                }
            }
        }
        postResults(results);
    }
});

searchinput.on("keyup", function(){
    let searchoption = getOption();
    results = [];
    if(searchoption == "title"){
        for(let i = 0; i < catalog.books.length; i++){
            if(catalog.books[i].name.toLowerCase().indexOf(searchinput.val().toLowerCase()) > -1 && catalog.books[i].date){
                if((catalog.books[i].date >= parseInt($("#loweryear").val()) || $("#loweryear").val() == "")
                    && (((catalog.books[i].date <= parseInt($("#higheryear").val()))) || $("#higheryear").val() == "")
                    && (catalog.books[i].agerange <= parseInt($("#agerestrict").val()) || $("#agerestrict").val() == "")){
                    results.push(catalog.books[i]);
                }
            }
        }
        postResults(results);
    }
    if(searchoption == "author"){
        for(let i = 0; i < catalog.books.length; i++){
            if(catalog.books[i].author.toLowerCase().indexOf(searchinput.val().toLowerCase()) > -1){
                if((catalog.books[i].date >= parseInt($("#loweryear").val()) || $("#loweryear").val() == "")
                    && (((catalog.books[i].date <= parseInt($("#higheryear").val()))) || $("#higheryear").val() == "")
                    && ((catalog.books[i].agerange <= parseInt($("#agerestrict").val())&& catalog.books[i].agerange >= (parseInt($("#agerestrict").val())-1)/2) || $("#agerestrict").val() == "")){
                    results.push(catalog.books[i]);
                }
            }
        }
        postResults(results);
    }
});

function getOption(){
    for(let i = 0; i < radiobuttons.length; i++){
        if(radiobuttons.eq(i).is(":checked")){
            return radiobuttons.eq(i).val();
        }
    }
    return "";
}
function postResults(r){
    $("#results").html("");
    for(let i = 0; i < r.length; i++){
        $("#results").html($("#results").html() + "<div class = 'result'>"+"<p class = 'title'>"+ r[i].name + "</p>" + "<p class = 'author'>Written by "+ r[i].author + " in " + r[i].date + "</p>" + "<p>"+ "Age: " + r[i].agerange + "+" + "</p>" + "</div>");
    }
}