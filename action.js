/* ====== DOM Grab ====== */
body = document.querySelector('body')
page_overlay = body.querySelector('#page-overlay')
page_overlay_btn = body.querySelector('#page-overlay a')

/* ====== Variables ====== */
var counter = 0


/* ====== Events ====== */
page_overlay_btn.addEventListener('click', () => {
    page_overlay.classList.add('closed')
})


/* ====== API Call ====== */
var request = new Request('https://api.unsplash.com/photos/random?count=5', {
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
        let img = convert_to_img(urls)
        let set = package(img)

        body.insertAdjacentElement('beforeend', set)
    })
}

function convert_to_img(arr) {
    let img = document.createElement('img')
    img.setAttribute('src', arr[0])
    img.setAttribute('data-bigger_size', arr[1])
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

    button.addEventListener('click', () => { bigger_display(img) })

    return container
}

function bigger_display(img) {
    let bigger_img = document.createElement('img');
    bigger_img.setAttribute('src', img.getAttribute('data-bigger_size'))

    page_overlay.insertAdjacentElement('afterbegin', bigger_img)
    page_overlay.classList.remove('closed')
}




