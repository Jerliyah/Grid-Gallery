/* ====== DOM Grab ====== */
body = document.querySelector('body')


/* ====== Variables ====== */
var counter = 0



/* ====== API Call ====== */
var request = new Request('https://api.unsplash.com/photos/random?count=5', {
    method: 'GET',
    headers: new Headers({
        'Authorization': 'Client-ID 6236edfcbba90a34eb926b8f757f00b77f8c1b7bb90a8de748e7314e73b520ad'
    })
});

fetch(request)
.then( response => { return response.json() })
.then( json_stuff => { send_to_doc(json_stuff) })



/* ====== Functions ====== */

function send_to_doc(arr) {
    arr.forEach( (obj) => {
        let url = obj.urls.small
        let img = convert_to_img(url)
        let set = package(img)

        body.insertAdjacentElement('beforeend', set)
    })
}

function convert_to_img(url) {
    let img = document.createElement('img')
    img.setAttribute('src', url)
    return img
}

function package(img) {
    counter++

    let container = document.createElement('div')
    container.setAttribute('class', 'container')
    container.setAttribute('id', `ctn${counter}`)

    let overlay = document.createElement('div')
    overlay.setAttribute('class', 'overlay')
    overlay.setAttribute('id', `o${counter}`)

    let button = document.createElement('button')
    button.innerText = 'View'
    overlay.insertAdjacentElement('beforeend', button)

    container.insertAdjacentElement('beforeend', img)
    container.insertAdjacentElement('beforeend', overlay)

    return container
}


/* ====== Events ====== */
