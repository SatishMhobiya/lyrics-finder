const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = "https://api.lyrics.ovh";

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let SearchValue = search.value.trim();

    if(!SearchValue){
        alert("Nothing to search...");
        console.log("ksk");
    }else{
        beginSearch(SearchValue);
    }
})

async function beginSearch(SearchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${SearchValue}`);
    console.log(searchResult);
    const data = await searchResult.json();

    console.log(data);
    displayData(data);
}

function displayData(data){
    result.innerHTML = `
        <ul class="songs">
            ${data.data.map(song=>`
                <li>
                    <div>
                        <strong>${song.artist.name}</strong> - ${song.title}
                    </div>
                    <span data-artist="${song.artist.name}"
                    data-songtitle="${song.title}">Get Lyrics</span>
                </li>
            `).join('')}
        </ul>
    `
}

result.addEventListener("click", e => {
    const clickedElement = e.target;

    if(clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songtitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songtitle);
    }
})

async function getLyrics(artist, songtitle){
    const response = await fetch(`${apiURL}/v1/${artist}/${songtitle}`);
    console.log(response);

    const data = await response.json();
    console.log(data);

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><stron>${artist}</stron> - ${songtitle}</h2>
        <p>${lyrics}</p>`;
}
