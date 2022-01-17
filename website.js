class Website {
  
    constructor(website, websiteAttributes) {
      this.id = website.id
      this.title = websiteAttributes.title
      this.description = websiteAttributes.description
      this.image_url = websiteAttributes.image_url
      this.category = websiteAttributes.category
      Website.all.push(this)
    }
     
    renderWebsite() {
      return `
      <div data-id=${this.id}>
      <h3>${this.title}</h3>
      <img src=${this.image_url} height="300" width="350">
      <p><strong>Description:</strong> ${this.description}</p>
      <p><strong>Category:</strong> ${this.category.name}</p>
      <button data-id=${this.id} id="delete-btn" type="button" class="delete-btn">Delete Website</button>
      </div>    
      <br><br>`;     
    }
  }
  
Website.all = [];