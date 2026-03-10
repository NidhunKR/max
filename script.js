const services = [
  { name: "Bridal HD Makeup", price: 15999, duration: "2.5 hrs" },
  { name: "Party Glam Look", price: 4999, duration: "1.5 hrs" },
  { name: "Engagement Soft Glam", price: 7999, duration: "2 hrs" },
  { name: "Editorial Photoshoot Makeup", price: 10999, duration: "2 hrs" }
];

const products = [
  { name: "Silk Finish Foundation", category: "Face", price: 2499 },
  { name: "Velvet Matte Lipstick", category: "Lips", price: 1299 },
  { name: "Rose Gold Highlighter", category: "Face", price: 1599 },
  { name: "Volume Drama Mascara", category: "Eyes", price: 1199 },
  { name: "Hydra Glow Primer", category: "Skincare", price: 1899 },
  { name: "Longwear Kajal", category: "Eyes", price: 699 }
];

const beautyGallery = [
  {
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    caption: "Soft glam bridal look"
  },
  {
    image:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80",
    caption: "Classic festive makeup"
  },
  {
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
    caption: "Elegant reception look"
  },
  {
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    caption: "Modern party makeover"
  },
  {
    image:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1200&q=80",
    caption: "Radiant sangeet look"
  },
  {
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=80",
    caption: "Natural daytime glam"
  }
];

const posts = [
  {
    title: "5-Step Dewy Bridal Base",
    excerpt: "Learn how our artists create long-lasting glowing bridal skin."
  },
  {
    title: "Day-to-Night Makeup Transition",
    excerpt: "Quick product swaps to transform your office look for evening glam."
  },
  {
    title: "How to Choose the Right Nude Lip",
    excerpt: "Match undertones and finish to find your perfect nude shade."
  }
];

const testimonials = [
  {
    name: "Aarohi M.",
    quote: "The bridal makeup was flawless and stayed perfect all day!"
  },
  {
    name: "Sneha R.",
    quote: "Loved the products I ordered. Fast delivery and premium quality."
  },
  {
    name: "Ritika S.",
    quote: "Their consultation helped me pick shades that truly suit me."
  }
];

const servicesGrid = document.getElementById("servicesGrid");
const productsGrid = document.getElementById("productsGrid");
const galleryGrid = document.getElementById("galleryGrid");
const postsGrid = document.getElementById("postsGrid");
const testimonialsGrid = document.getElementById("testimonialsGrid");
const categoryFilter = document.getElementById("categoryFilter");
const productSearch = document.getElementById("productSearch");

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

function cardTemplate(title, body, footer = "") {
  return `<article class="card"><h3>${title}</h3><p>${body}</p>${
    footer ? `<small>${footer}</small>` : ""
  }</article>`;
}

servicesGrid.innerHTML = services
  .map(
    (service) =>
      cardTemplate(
        service.name,
        `${inr.format(service.price)} · ${service.duration}`,
        "Includes skin prep and finishing touch-up"
      )
  )
  .join("");

const serviceSelect = document.getElementById("serviceSelect");
serviceSelect.innerHTML =
  `<option value="">Select service</option>` +
  services
    .map(
      (service) =>
        `<option>${service.name} (${inr.format(service.price)})</option>`
    )
    .join("");

const categories = [...new Set(products.map((product) => product.category))];
categoryFilter.innerHTML += categories
  .map((category) => `<option value="${category}">${category}</option>`)
  .join("");

function renderProducts() {
  const query = productSearch.value.toLowerCase().trim();
  const category = categoryFilter.value;

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesQuery =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  productsGrid.innerHTML = filteredProducts
    .map((product) =>
      cardTemplate(
        product.name,
        `${product.category}`,
        `<strong>${inr.format(product.price)}</strong>`
      )
    )
    .join("");

  if (!filteredProducts.length) {
    productsGrid.innerHTML = cardTemplate(
      "No products found",
      "Try another keyword or category filter."
    );
  }
}

galleryGrid.innerHTML = beautyGallery
  .map(
    (item) =>
      `<article class="gallery-item"><img src="${item.image}" alt="${item.caption}" loading="lazy" /><p class="gallery-caption">${item.caption}</p></article>`
  )
  .join("");

renderProducts();
categoryFilter.addEventListener("change", renderProducts);
productSearch.addEventListener("input", renderProducts);

postsGrid.innerHTML = posts
  .map((post) => cardTemplate(post.title, post.excerpt, "Read more →"))
  .join("");

testimonialsGrid.innerHTML = testimonials
  .map((item) => cardTemplate(item.name, `“${item.quote}”`))
  .join("");

const pricingBody = document.querySelector("#pricingTable tbody");
pricingBody.innerHTML = products
  .map(
    (product) =>
      `<tr><td>${product.name}</td><td>${product.category}</td><td>${inr.format(
        product.price
      )}</td></tr>`
  )
  .join("");

const appointmentDate = document.getElementById("appointmentDate");
appointmentDate.min = new Date().toISOString().split("T")[0];

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const service = serviceSelect.value;
  const date = appointmentDate.value;
  const time = document.getElementById("timeSlot").value;

  if (!name || !service || !date || !time) {
    bookingMessage.textContent = "Please complete all booking details.";
    return;
  }

  bookingMessage.textContent = `Thank you ${name}! Your ${service} is booked for ${date} at ${time}.`;
  bookingForm.reset();
  appointmentDate.min = new Date().toISOString().split("T")[0];
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});
