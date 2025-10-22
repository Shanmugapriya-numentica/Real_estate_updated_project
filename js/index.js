const propertyContainer = document.getElementById('property-cards');
let properties = [];


fetch('data/properties.json')
  .then(res => res.json())
  .then(data => {
    properties = data.map(prop => ({
      ...prop,
      price: Number(prop.price),
      size: Number(prop.size),
      buildYear: Number(prop.buildYear)
    }));
    displayProperties(properties);
  });


function displayProperties(propertiesList) {
  propertyContainer.innerHTML = '';
  if (propertiesList.length === 0) {
    propertyContainer.innerHTML = '<p>No properties match your filters.</p>';
    return;
  }
  propertiesList.forEach(property => {
    const card = document.createElement('article');
    card.classList.add('property-card');
    card.innerHTML = `
      <img src="${property.image}" alt="property-img">
      <div class="property-card-content">
        <div class="property-card-heading">
          <h2>${property.title}</h2>
          <p>${property.description} <a href="#">Read More</a></p>
        </div>
        <div class="property-card-info">${property.bedrooms}-bedrooms</div>
        <div class="property-card-footer">
          <p>Price $${property.price}</p>
          <button class="btn-primary">View Property Details</button>
        </div>
      </div>
    `;
    propertyContainer.appendChild(card);
  });
}

const filters = document.querySelectorAll('.filter select');
filters.forEach(filter => filter.addEventListener('change', applyFilters));

function applyFilters() {
  const location = document.querySelector('.filter:nth-child(1) select').value;
  const type = document.querySelector('.filter:nth-child(2) select').value;
  const priceRange = document.querySelector('.filter:nth-child(3) select').value;
  const sizeRange = document.querySelector('.filter:nth-child(4) select').value;
  const buildYear = document.querySelector('.filter:nth-child(5) select').value;

  const filtered = properties.filter(prop => {
    let matches = true;

    if (location !== 'Location') matches = matches && prop.location === location;


    if (type !== 'Property Type') matches = matches && prop.type === type;


    if (priceRange !== 'Pricing Range') {
      if (priceRange === '$10k–$20k') matches = matches && prop.price >= 10000 && prop.price < 20000;
      if (priceRange === '$20k–$50k') matches = matches && prop.price >= 20000 && prop.price <= 50000;
    }


    if (sizeRange !== 'Property Size') {
      if (sizeRange === '1000–1500 sq.ft') matches = matches && prop.size >= 1000 && prop.size < 1500;
      if (sizeRange === '1500–2000 sq.ft') matches = matches && prop.size >= 1500 && prop.size <= 2000;
    }

    if (buildYear !== 'Build Year') matches = matches && prop.buildYear === Number(buildYear);

    return matches;
  });

  displayProperties(filtered);
}
