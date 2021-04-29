"use strict"
// Render coffee menu
function renderCoffee(coffee) {
    var html = '<ul id="myUL" class="coffee">';
    html += '<div class=eachCoffee>'
    html += '<li><a href="#">' + coffee.name + '</a></li>';
    html += '<p>' + coffee.roast + '</p>';
    html += '<div class="rearCoffee">' + coffee.description + '</div>'
    html += '</div>';
    return html;
}
// Pulls each coffee from variable
function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}
// Roast filter function
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    if (selectedRoast === 'any') {
        for (var i = 0; i < coffees.length; i++) {
            filteredCoffees.push(coffees[i]);
        }
    }
    tbody.innerHTML = renderCoffees(filteredCoffees);
}
// Active Search function
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, p, eachCoffee, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    p = document.getElementsByTagName('p');
    eachCoffee = document.getElementsByClassName('eachCoffee');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            p[i].style.display = "";
            eachCoffee[i].style.display = "";
        } else {
            li[i].style.display = "none";
            p[i].style.display = "none";
            eachCoffee[i].style.display = "none";
        }
    }
}

// Create a coffee function
let updatedList ='';
function createCoffee() {
    let cCoffee = {};
    cCoffee.id = (coffees.length + 1);
    cCoffee.name = (document.getElementById("coffee-name").value.trim());
    cCoffee.roast = (document.getElementById("coffee-roast").value.trim().toLowerCase());
    coffees.push(cCoffee);
    localStorage.setItem("coffees", JSON.stringify(coffees));

    document.getElementById("coffee-name").value = "";
    document.getElementById("coffee-roast").value = "";
}






// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light', description: 'It has a medium brown colour and is just a little oily on the surface. It is used in everyday coffee to bring a richer and sweeter taste to your coffee that you will remember.'},
    {id: 2, name: 'Half City', roast: 'light', description: 'Our Half City-roasted coffee beans are medium to dark brown in color and are generally dry though they are dotted with tiny droplets or patches of oil. Their acidity tends to be somewhat muted, compared to our Medium Roast.'},
    {id: 3, name: 'Cinnamon', roast: 'light', description: 'Cinnamon Supreme flavored coffee has a sweet and spicy aroma and a delicious cinnamon flavor. This coffee is perfect for those who love spicy beverages.'},
    {id: 4, name: 'City', roast: 'medium', description: 'City is the name applied to a medium degree roast of coffee beans. In this roast, the beans fully complete first crack, resulting in a dry bean with a medium brown color.'},
    {id: 5, name: 'American', roast: 'medium', description: 'American Roast is the point where coffee beans have achieved their rich, medium brown color without any of coffee\'s natural oils appearing on the surface. American Roast is the traditional roasting style of American coffee. It produces a flavorful, complex cup of coffee.'},
    {id: 6, name: 'Breakfast', roast: 'medium', description: 'This aromatic, medium roast is sure to awaken your senses and follow with a smooth and bright finish. Made from only 100% select Arabica coffee beans.'},
    {id: 7, name: 'High', roast: 'dark', description: 'The blend that started it all. Roasted to deep, dark perfection, this signature Dark Roast has a rich, bold flavor that has been a family tradition for four generations.'},
    {id: 8, name: 'Continental', roast: 'dark', description: 'We take this bean through a long, slow roast, resulting in one of our darkest coffees. The oils inside the bean are pushed to the surface, and the sugars begin to caramelise and burn, bringing out an intense flavour with a heavy body to back it up. Continental roast coffee is perfect as an after-dinner treat.'},
    {id: 9, name: 'New Orleans', roast: 'dark', description: 'Our New Orleans Roast dark roast coffee is a dark, bold roast, yet smooth and full-bodied with no bitter aftertaste.'},
    {id: 10, name: 'European', roast: 'dark', description: 'Complex, Deep Full Flavored with Smoky Overtones Yet Delightfully Smooth'},
    {id: 11, name: 'Espresso', roast: 'dark', description: 'Bones Coffee\'s Espresso is a blend of South-Central American beans that yields a full-bodied and robust espresso with low acidity and slight hints of citrus & cocoa.'},
    {id: 12, name: 'Viennese', roast: 'dark', description: 'A Blend of Champions --Peru Full City and Peru French gives this coffee a strong, smooth, and full body cup with rich, dark berry and chocolate overtones. Peru: Region Satipo Coop: Pangoa'},
    {id: 13, name: 'Italian', roast: 'dark', description: 'For those seeking a penetrating, balanced roast with vigorous flavors. Masterfully slow roasted for boldly perfect cups.'},
    {id: 14, name: 'French', roast: 'dark', description: 'Coffee roasted to a full, rich, dark state. Beans roasted to a French roast are very oily and dark. The French Roast tastes stronger, despite having less acid and caffeine than a lighter roasted bean.'},
];
// Variables for rendering coffees on page, roast filter on change, unpacking local storage, local storage to array, and updating coffee list
var tbody = document.querySelector('#coffees');
var submitChange = document.querySelector('.submit');
var roastSelection = document.querySelector('#roast-selection');

let storedCoffees = localStorage.getItem("coffees");
updatedList = JSON.parse(storedCoffees);


if(updatedList === null) {
    tbody.innerHTML = renderCoffees(coffees);
}else{
    tbody.innerHTML = renderCoffees(updatedList);
}
submitChange.addEventListener('change', updateCoffees);
