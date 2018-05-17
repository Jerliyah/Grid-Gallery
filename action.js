/* ====== DOM Grab ====== */
var body = document.querySelector('body')
var page_overlay = body.querySelector('#page-overlay')
var page_overlay_btn = body.querySelector('#page-overlay a')

/* ====== Variables ====== */
var counter = 0


/* ====== Initial Events ====== */
var loading_gif = document.createElement('img')
loading_gif.setAttribute('src', 'gifs/loading.gif')

page_overlay.insertAdjacentElement('afterbegin', loading_gif )

page_overlay_btn.addEventListener('click', () => {
    page_overlay.replaceChild( loading_gif, page_overlay.querySelector('img') )
    page_overlay.classList.add('closed')
})


/* ====== API Call ====== */
var request = new Request('https://api.unsplash.com/photos/random?count=30', {
    method: 'GET',
    headers: new Headers({
        'Authorization': 'Client-ID 6236edfcbba90a34eb926b8f757f00b77f8c1b7bb90a8de748e7314e73b520ad'
    })
});

fetch(request)
.then( response => { return response.json() })
.then( json_stuff => { 
    console.log(json_stuff)
    send_to_doc(json_stuff) 
})



/* ====== Functions ====== */

function send_to_doc(arr) {
    arr.forEach( (obj) => {
        let urls = [obj.urls.small, obj.urls.regular]
        let set = package(urls)

        body.insertAdjacentElement('beforeend', set)
    })
}

function convert_to_img(arr) {
    let img = document.createElement('img')
    img.setAttribute('src', arr[0])
    img.setAttribute('data-bigger_size', arr[1])
    return img
}

function package(urls) {
    counter++

    let container = document.createElement('div')
    container.setAttribute('class', 'container')
    container.classList.add(`v-span${random(3)}`)
    container.classList.add(`h-span${random(3)}`)

    container.style.backgroundImage = `url(${urls[0]})`

    let overlay = document.createElement('div')
    overlay.setAttribute('class', 'overlay')

    let button = document.createElement('button')
    button.innerText = 'View'
    overlay.insertAdjacentElement('beforeend', button)

    container.insertAdjacentElement('beforeend', overlay)

    container.addEventListener('mouseenter', () => {
        overlay.classList.add('cover')
    })
    container.addEventListener('mouseleave', () => {
        overlay.classList.remove('cover')
    })
    button.addEventListener('click', () => { bigger_display(urls[1]) })

    return container
}

function bigger_display(url) {
    let bigger_img = document.createElement('img');
    bigger_img.setAttribute('src', url)

    page_overlay.classList.remove('closed')

    bigger_img.onload = ()=>{
        page_overlay.replaceChild(bigger_img, loading_gif)
        page_overlay_btn.style.width = `${bigger_img.width}px`
    }

}

function random(max) {
    return Math.floor(Math.random() * (max - 1 )) + 1;
}



