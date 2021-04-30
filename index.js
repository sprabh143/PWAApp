const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Monday Munches"});
    }
    render(sPage) {
        const oJson = fetch("https://popup-meals-default-rtdb.firebaseio.com/meals.json").json();
        console.log(oJson);
        let sResult = "<h1>Upcoming Popup Meals</h1>";
        Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `
            <h2>${oEntity.title}</h2>
            <p><img src="${oEntity.featured_image}" alt="${oEntity.title}" width="500" height="500"></p>
            <p>${oEntity.full_description}</p>
            <form action="http://localhost:3002/payment" method="post">
            <input type="hidden" name="title" value="${oEntity.title}" />
            <input type="hidden" name="price" value="21" />
            <input type="tel" placeholder="enter your number" name="phone"/>
            <button type="submit">Order now</button>
            </form>
            `;
        });
        return sResult;
    }
}