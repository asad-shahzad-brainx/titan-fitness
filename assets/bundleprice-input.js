// This script is used on the buy-buttons.liquid file and listens for changes in the variant input inorder to update the input text.

// Get backorder json from main-product.liquid
const bundleVariants = JSON.parse(
  document.querySelector("#ProductJSON-bundleprice").textContent
);

// Find the hidden input in the buy buttons:
const bundleInputs = document.querySelectorAll("input#bundleprice");
document.addEventListener("DOMContentLoaded", function () {
  // Find the hidden input in the buy buttons
  const productVariantInput = document.querySelector(".product-variant-id");
  if (!productVariantInput) {
    console.error("Product variant input not found.");
    return;
  }

  // Event listener for changes to the input
  productVariantInput.addEventListener("change", function () {
    // Get appropriate variant from backorderVariants
    const bundlePrice = bundleVariants[productVariantInput.value];
    for (let i = 0; i < bundleInputs.length; i++)
      // If it is backordered set the name and value attributes. If not, remove them.
      if (bundlePrice) {
        // Set attributes
        bundleInputs[i].setAttribute("name", "properties[_BundlePrice]");
        bundleInputs[i].setAttribute(
          "value",
          JSON.stringify(bundlePrice?.bundlePrice)
        );
      } else {
        bundleInputs[i].setAttribute("name", "");
        bundleInputs[i].setAttribute("value", "");
      }
  });
});
