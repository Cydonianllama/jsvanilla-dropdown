class DropdownItem {

    constructor(){
        this.state = {
            isFinal : false,
            isOpen : false
        }
    }

    action(callback){
        callback()
    }

    open(){
        const component = this.currentComponent
        const dropdownContent = component.querySelector('.dropdown-item-content')
        console.log(dropdownContent.classList.contains('dropwdown-item-content-close'));
        if (dropdownContent.classList.contains('dropwdown-item-content-close')) {
            dropdownContent.classList.remove('dropwdown-item-content-close')
            dropdownContent.classList.add('dropdown-item-content-open')
        }
    }

    close(){
        const component = this.currentComponent
        const dropdownContent = component.querySelector('.dropdown-item-content')
        if (dropdownContent.classList.contains('dropdown-item-content-open')) {
            dropdownContent.classList.remove('dropdown-item-content-open')
            dropdownContent.classList.add('dropwdown-item-content-close')
        }
    }

    listeners(){
        const component = this.currentComponent
        const actionDropdown = component.querySelector('.dropdown-item-activator')
        actionDropdown.addEventListener('click',()=>{
            if (!this.state.isFinal){
                this.state.isOpen = !this.state.isOpen
                if (this.state.isOpen) {
                    this.open()
                } else {
                    this.close()
                }
            }else{
                this.action(this.config.action)
            }
        })
    }

    getTemplate(){

        let div = document.createElement('div')
        div.classList.add('dropdown-item')
        
        let template = `
            <button class = "dropdown-item-activator">
                
            </button>

            <div class = "dropdown-item-content dropwdown-item-content-close">

            </div>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    getContainerItems(){
        return () => this.currentComponent.querySelector('.dropdown-item-content')
    }

    render(container){

        const component = this.getTemplate()
        container.append(component)
        this.listeners()

        const nameDropdownItem = this.currentComponent.querySelector('.dropdown-item-activator')
        nameDropdownItem.innerText = this.config.nameItem

        const containerItems = this.currentComponent.querySelector('.dropdown-item-content')
        if (!this.state.isFinal) {
            //set items
            const processItems = (data) => {
                if(!data) return
                data.forEach(data => {

                    // process
                    let component = new DropdownItem()
                    component.setConfiguration(data)
                    component.render(containerItems)

                    if (data.content) {
                        if (data.content.length > 0) {
                            processItems(data.content)
                        }
                    }

                })
            }
            console.log(this.config);
            processItems(this.config.content)
        }

    }

    setConfiguration(config){
        this.config = config
        if(this.config.content){
            this.state.isFinal = this.config.content.length > 0 ? false : true
            console.log(this.state.isFinal,config);
        }
    }

}

const ERROR_DROPDOWN_ITEM_CLASS_MISSED = 'ERROR_DROPDOWN_ITEM_CLASS_MISSED'
const ERROR_DROPDOWN_CONFIG_MISSING = 'ERROR_DROPDOWN_CONFIG_MISSING'

class Dropdown {
    
    constructor(ItemClass){

        if (!ItemClass){
            console.log(ERROR_DROPDOWN_ITEM_CLASS_MISSED );
            return null
        }
        this.ItemClass = ItemClass

        this.state = {
            configProcessed : false,
            isOpen : false,
        }
    }

    listeners(){

        const component = this.currentComponent

        const openAction = component.querySelector('.dropdown-activator')
        openAction.addEventListener('click',()=>{
            this.state.isOpen = !this.state.isOpen
            if(this.state.isOpen){
                this.open()
            }else{
                this.close()
            }
        })

    }

    getTemplate(){
        let div = document.createElement('div')
        div.classList.add('dropdown')
        let template = `
            <button class="dropdown-activator">
                dropdown name
            </button>
            <div class="dropdown-content dropwdown-content-close">
                
            </div>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    open(){
        const dropdownContent = this.currentComponent.querySelector('.dropdown-content')
        if (dropdownContent.classList.contains('dropwdown-content-close')){
            dropdownContent.classList.remove('dropwdown-content-close')
            dropdownContent.classList.add('dropdown-content-open')
        }
    }

    close(){
        const dropdownContent = this.currentComponent.querySelector('.dropdown-content')
        if (dropdownContent.classList.contains('dropdown-content-open')) {
            dropdownContent.classList.remove('dropdown-content-open')
            dropdownContent.classList.add('dropwdown-content-close')
        }
    }

    render(container){
        
        if (!this.state.configProcessed) return

        // init render on template
        const component = this.getTemplate()
        container.append(component)
        this.listeners()

        // set the name of the dropdown
        const nameDropdown = this.currentComponent.querySelector('.dropdown-activator')
        nameDropdown.innerHTML = `
            <span>${this.data.nameDropdown}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
            <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        `

        const containerItems = this.currentComponent.querySelector('.dropdown-content')

        //set items
        const processItems = (data, containerItems) => {
            data.forEach(data => {

                // process
                let component = new this.ItemClass()
                component.setConfiguration(data)
                component.render(containerItems)

                if (data.content ) {
                    if (data.content.length > 0){
                        processItems(data.content, component.getContainerItems()())
                    }
                }

            })
        } 
        processItems(this.data.content, containerItems)

    }

    setConfig(config){

        if (!config['content']){
            console.log(ERROR_DROPDOWN_CONFIG_MISSING);
        }

        this.data = config
        this.state.configProcessed = true

    }

}

const dropdownConfig = {
    nameDropdown : 'dropdown name ',
    content : [
        {
            nameItem : 'dropdown item1',
            closeInAction : true,
            action : () => {console.log('hola item 1');},
            content : [
                {
                    nameItem: 'dropdown sub item1',
                    closeInAction: true,
                    action: () => { console.log('hola item 1'); },
                    content : []
                }
            ]
        },
        {
            nameItem: 'dropdown item2',
            closeInAction: true,
            action: () => { console.log('hola item 2'); },
            content: [

            ]
        },
        {
            nameItem: 'dropdown item3',
            closeInAction: true,
            action: () => { console.log('hola item 3'); },
            content: [

            ]
        },
        {
            nameItem: 'dropdown item3',
            closeInAction: true,
            action: () => { console.log('hola item 3'); },
            content: [

            ]
        }
    ]
}


const app = () => {

    const container = document.getElementById('root')
    const dropdown = new Dropdown(DropdownItem)
    dropdown.setConfig(dropdownConfig)
    dropdown.render(container)

}
app()