class Category {
    static all = [];

    constructor(category) {
        this.id = category.id
        this.name = category.attributes.name
        Category.all.push(this)
        console.log(this);
    }

    renderCategory() {
        const option = document.createElement('option')
        option.innerText = this.name
        option.value = this.id
        return option
    }

    attachCategory() {
        const select = document.querySelector("#categories")
        select.append(this.renderCategory())
    }
}
