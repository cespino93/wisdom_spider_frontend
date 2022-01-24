const endPoint = "http://localhost:3000/api/v1/websites"

document.addEventListener('DOMContentLoaded', () => {
  getWebsites()

  const createWebsiteForm = document.querySelector ("#create-website-form")
  createWebsiteForm.addEventListener("submit", (e) => createFormHandler(e))
})

document.addEventListener("click", function(e) {
  const websiteCard = document.getElementById(`${e.target.dataset.id}`)

  if(e.target.matches("#delete-btn")) {
    e.preventDefault()
    deleteWebsite(e.target.dataset.id)
    websiteCard.remove(websiteCard)
  }
})

function getWebsites() {
  fetch(endPoint)
  .then(response => response.json())
  .then(websites => {
    websites.data.forEach(website => {
      let newWebsite = new Website(website, website.attributes)
      document.querySelector('#website-container').innerHTML += newWebsite.renderWebsite()
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

function postWebsites(title, description, image_url, category_id) {
  let bodyObj = {title, description, image_url, category_id}
  fetch(endPoint, {
    method: "POST",
    headers: {"Content-Tpe": "application/json"},
    body: JSON.stringify(bodyObj)
  })
  .then(response => response.json())
  .then(website => {
    const websiteData = website.data
    let newWebsite = new Website(websiteData, websiteData.attributes)
    document.querySelector('#website-container').innerHTML += newWebsite.renderWebsite()
  })
}

function deleteWebsite(id) {
  fetch(`${endPoint}/${id}`, {
    method: "DELETE"
  })
  .then(response => response.json())
}