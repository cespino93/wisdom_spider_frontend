const endPoint = "http://localhost:3000/api/v1/websites"
const endPointCategory = "http://localhost:3000/api/v1/categories"

document.addEventListener('DOMContentLoaded', () => {
  renderForm()
  const createWebsiteForm = document.querySelector("#website-form")
  // const varibale named createWebsiteForm that containts an object that contains a property
  createWebsiteForm.addEventListener("submit", (e) => createFormHandler(e))
  // adding an Event Listener from the 1st code to the obeject (CreateaWebsiteForm) that contains an action ("submit)
  getWebsites()
  getCategories()
  // We called both functions getWebsites and getCategories so that it renders in order to show into the DOM
})

document.addEventListener("click", function (e) {
  const websiteCard = document.getElementById(`${e.target.dataset.id}`)

  if(e.target.matches("#delete-btn")) {
    e.preventDefault()
    deleteWebsite(e.target.dataset.id)
    e.target.parentElement.remove()
  }
})

function getWebsites() {
  fetch(endPoint)
  .then(response => response.json())
  .then(websites => {
    websites.data.forEach(website => {
      let newWebsite = new Website(website, website.attributes)
      const container = document.querySelector('#website-container')
      const br = document.createElement('br')
      container.innerHTML += newWebsite.renderWebsite()
    })
  })
}

function getCategories() {
  fetch(endPointCategory)
  .then(response => response.json())
  .then(json => {
    json.data.forEach(category => {
      console.log(category)
      let newCategory = new Category(category)
      newCategory.attachCategory()
    })
  })
}

function createFormHandler(e) {
  e.preventDefault()
  const titleInput = document.querySelector('#input-title').value
  const descriptionInput = document.querySelector('#input-description').value
  const imageInput = document.querySelector('#input-url').value
  const categoryId = parseInt(document.querySelector('#categories').value)
  postWebsites (titleInput, descriptionInput, imageInput, categoryId)
}

function renderForm() {
    const container = document.querySelector(".form-container")
    container.innerHTML = ` <form id="website-form">
      <h3>List Your Website, lets grow the community!</h3>

      <input id='input-title' type="text" name="title" placeholder="Website Title" class="input-text">
      <br><br>
      <textarea id='input-description' name="description" rows="8" cols="40" placeholder="Website Description"></textarea>
      <br><br>
      <input id='input-url' type="text" name="image" placeholder="Upload an image URL" class="input-text">
      <br><br>

    Category:
    <select id="categories" name="categories">
    </select>
    <br><br>

    <input id='create-button' type="submit" name="submit" value="List Website" class="submit">
    </form>
  `
}

function postWebsites(title, description, image_url, category_id) {
  let bodyObj = {
    website: {
    title,
    description,
    image_url,
    category_id
}};
  fetch(endPoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyObj)
  })
  .then(response => response.json())
  .then(website => {
    let newWebsite = new Website(website.data)
    document.querySelector('#website-container').innerHTML += newWebsite.renderWebsite()
  })
}

function deleteWebsite(id) {
  fetch(`${endPoint}/${id}`, {
    method: "DELETE"
  })
}