const header = document.querySelector('h1')
const app = document.getElementById('app')
const ddMenu = document.querySelector('#ddMenu')
const myMenu = document.getElementById('myMenu')
const themeButtons = document.getElementById("themeButtons")
const sandwitch = document.querySelectorAll('svg')
const html = document.documentElement

//toggles the dark class from the html element
const toggle = () => html.classList.toggle('dark')

//changes the view of the screen to the received view (v)
const setView = (v) => {
    header.innerText = v
    toggleMenu(true)

    if (v === 'Calculator') {
        renderCalculator()
    } else if (v === 'About') {
        renderAbout()
    } else if (v === 'Contact') {
        renderContact()
    }
}

//displays or hides the ddMenu
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden')
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden')
        })
    } else {
        ddMenu.classList.add('hidden')
        document.querySelectorAll('svg')[0].classList.remove('hidden')
        document.querySelectorAll('svg')[1].classList.add('hidden')
    }
}

//adds a row to the calculator grid
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`
    container.insertAdjacentHTML('beforeend', row)
}

//adds the monitor section of the calculator to the end of the container
const addMonitor = (container, text) => {
    const t = text ?? ''
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`
    container.insertAdjacentHTML('beforeend', monitor)
}

//creates a button for the calculator
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : ''
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`
}
//creates a row of buttons
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('')
    addRow(container, btnHTML)
}

//the function triggered when clicking on a calculator button, performs a calculation
const click = (event) => {
    const monitor = document.getElementById('monitor')
    const bac = monitor.innerText.trim()
    const a = event.target.innerText
    console.log(a)
    if (a === 'clear') {
        monitor.innerText = ''
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac)
    } else {
        monitor.innerText += a
    }
}
//displays the calculator
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']
    app.innerHTML = ''
    addMonitor(app)
    addButtons(app, labels)
    const buttons = document.querySelectorAll('.d-btn')
    buttons.forEach((el) => el.addEventListener('click', click))
}

//displays the about setion
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>'
}

//displays the contact screen
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>'
}

//creates a menu button
const createMenuButton = (view) => {
    return `<button onclick="setView('${view}')">${view}</button>`
}

//creates a dd menu item
const ddMenuItem = (view) => {
    return `<button class="block py-1 px-2"
                onclick="setView('${view}')">
                        ${view}
                    </button>`
}

//creates the dd menu
const ddMenuCreation = (labels) => {
    return labels.map((label) => ddMenuItem(label)).join('')
}

//create a menu with the 
const renderMenu = () => {
    const menuLabels = ['Caulculator', 'About', 'Contact', 'sos']
    
    ddMenu.insertAdjacentHTML('afterbegin', ddMenuCreation(menuLabels))

    const btns = menuLabels.map((label)=> createMenuButton(label)).join('')
    myMenu.insertAdjacentHTML('beforeend', btns)
}

//a function that renders the theme buttons
const renderThemeToggle = () => {
    const btns = [`<button class="dark:hidden block" onclick="toggle()">Dark</button>`,
        `<button class="hidden dark:block" onclick="toggle()">Light</button>`
    ]

    ///adding the buttons from above in the themButtons div
    themeButtons.insertAdjacentHTML('beforeend', btns.join(''))
}

//rendering the website
renderMenu()
renderThemeToggle()
renderCalculator()
