// This script is used on the buy-buttons.liquid file and listens for changes in the variant input inorder to update the input text.

// Get backorder json from main-product.liquid
const backorderVariants = JSON.parse(
  document.querySelector("#ProductJSON-backorder").textContent
);

// Find the hidden input in the buy buttons:
const backorderInputs = document.querySelectorAll("input#backorder");
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
    const backorderStatus = backorderVariants[productVariantInput.value];
    for (let i = 0; i < backorderInputs.length; i++)
      // If it is backordered set the name and value attributes. If not, remove them.
      if (backorderStatus.isBackOrdered) {
        // Set attributes
        backorderInputs[i].setAttribute("name", "properties[Backorder]");
        const formattedBackorderCopy = backorderVariants.backorderCopy.replace(
          "{{ date }}",
          backorderStatus.avaialbleDate
        );
        backorderInputs[i].setAttribute("value", formattedBackorderCopy);
      } else {
        backorderInputs[i].setAttribute("name", "");
        backorderInputs[i].setAttribute("value", "");
      }
  });
});
