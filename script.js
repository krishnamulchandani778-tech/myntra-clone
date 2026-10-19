// Trendora is a frontend-only student project.
// The buttons demonstrate website interaction; no database or payment system is used.

const filterButtons = document.querySelectorAll('.filter');
const collectionCards = document.querySelectorAll('.collection-card');
const products = document.querySelectorAll('.product-card');
const searchInput = document.getElementById('searchInput');
const resultText = document.getElementById('resultText');
const noProducts = document.getElementById('noProducts');

let cartCount = 0;
let wishlistCount = 0;

function showProducts(category) {
  let visible = 0;

  products.forEach((product) => {
    const shouldShow = category === 'all' || product.dataset.category === category;

    product.classList.toggle('hidden', !shouldShow);

    if (shouldShow) visible++;
  });

  noProducts.style.display = visible === 0 ? 'block' : 'none';
  resultText.textContent = category === 'all' ? '' : `${visible} product(s) available in ${category}.`;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    showProducts(button.dataset.filter);
  });
});

collectionCards.forEach((card) => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;

    filterButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === category);
    });

    showProducts(category);
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });
});

searchInput.addEventListener('input', () => {
  const text = searchInput.value.toLowerCase().trim();
  let visible = 0;

  products.forEach((product) => {
    const shouldShow = product.dataset.name.includes(text);

    product.classList.toggle('hidden', !shouldShow);

    if (shouldShow) visible++;
  });

  noProducts.style.display = visible === 0 ? 'block' : 'none';
  resultText.textContent = text ? `${visible} search result(s) found.` : '';
});

document.querySelectorAll('.cart-add').forEach((button) => {
  button.addEventListener('click', () => {
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;
    showToast('Product added to cart!');
  });
});

document.querySelectorAll('.heart').forEach((button) => {
  button.addEventListener('click', () => {
    const isLiked = button.classList.toggle('liked');

    if (isLiked) {
      button.textContent = '♥';
      wishlistCount++;
      showToast('Added to wishlist!');
    } else {
      button.textContent = '♡';
      wishlistCount--;
      showToast('Removed from wishlist!');
    }

    document.getElementById('wishlistCount').textContent = wishlistCount;
  });
});

document.getElementById('cartButton').addEventListener('click', () => {
  showToast(`Your cart contains ${cartCount} item(s).`);
});

document.getElementById('wishlistButton').addEventListener('click', () => {
  showToast(`Your wishlist contains ${wishlistCount} item(s).`);
});

document.getElementById('menuButton').addEventListener('click', () => {
  document.getElementById('navigation').classList.toggle('show');
});

document.querySelectorAll('.navigation a').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('navigation').classList.remove('show');
  });
});

document.getElementById('newsletterForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('emailInput').value;

  showToast(`Thank you! Updates will be sent to ${email}`);
  event.target.reset();
});

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

document.getElementById('year').textContent = new Date().getFullYear();
