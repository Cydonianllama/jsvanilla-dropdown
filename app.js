class DropdownItem {

    constructor(){
        this.state = {
            isFinal : false,
        }
    }

    action(callback){
        callback()
    }

    listeners(){
        const component = this.currentComponent
        const actionDropdown = component.querySelector('.dropdown-activator')
        actionDropdown.addEventListener('click',(e)=>{
            this.action(this.config.action)
        })
    }

    getTemplate(){

        let div = document.createElement('div')
        div.classList.add('dropdown-item')
        
        let contentTemplate = `
            <div class = "dropdown-item-content">

            </div>
        `
        
        let template = `
            <button class = "dropdown-activator">
                
            </button>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    render(container){

        const component = this.getTemplate()
        container.append(component)
        this.listeners()

        const nameDropdownItem = this.currentComponent.querySelector('.dropdown-activator')
        nameDropdownItem.innerText = this.config.nameItem

        if (!this.state.isFinal) {

        }

    }

    setConfiguration(config){
        this.config = config
        if(this.config.content){
            this.state.isFinal = this.config.content.length > 0 ? false : true
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
                console.log('wished');
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
        nameDropdown.innerText = this.data.nameDropdown

        const containerItems = this.currentComponent.querySelector('.dropdown-content')

        //set items
        const processItems = (data) => {
            data.forEach(data => {

                // process
                let component = new this.ItemClass()
                component.setConfiguration(data)
                component.render(containerItems)

                if (data.content ) {
                    if (data.content.length > 0){
                        processItems(data.content)
                    }
                }

            })
        } 
        processItems(this.data.content)

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
            nameItem : 'dropdown item',
            closeInAction : true,
            action : () => {console.log('hola item');},
            content : [

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