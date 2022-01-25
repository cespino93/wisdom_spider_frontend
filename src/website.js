class Website {
  static all = [];

  constructor(website) {
    this.id = website.id
    this.title = website.attributes.title
    this.description = website.attributes.description
    this.image_url = website.attributes.image_url
    this.category = website.attributes.category
    this.button = document.createElement('button')
    Website.all.push(this)
  }

  renderWebsite() {
    return `
    <div data-id=${this.id}>
    <h3>${this.title}</h3>
    <img src=${this.image_url} height="300" width="350">
    <p><strong>Description:</strong> ${this.description}</p>
    <p id="category-name"><strong>Category:</strong> ${this.category.name}</p>
    </div>
    <br><br>`;
  }

  renderAndAttachButton() {
    this.button.type = "button"
    this.button.className = "delete-btn"
    this.button.innerText = "Delete Website"
    this.button.addEventListener('click', (e) => deleteWebsite(e, this.id))
    document.querySelector('#category-name').after(this.button)
  }

  deleteWebsite() {

  }
}
