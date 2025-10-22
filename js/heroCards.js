

document.addEventListener("DOMContentLoaded", () => {
  
  const heroCardsContainer = document.querySelector(".hero-cards");
  if (!heroCardsContainer) return;

  fetch("data/heroCards.json")
    .then(res => res.json())

    .then(cardsData => {

      heroCardsContainer.innerHTML = "";
      cardsData.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `
          <div class="card-number">${card.number}</div>
          <div class="card-label">${card.label}</div>
        `;
        heroCardsContainer.appendChild(cardDiv);
      });
    })

    .catch(err => {
      console.error(err);
      heroCardsContainer.innerHTML = "<p>Failed to load cards.</p>";
    });
});
