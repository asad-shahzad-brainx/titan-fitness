// Function to add "hidden" class to .c-collections.loading
function hideCollectionsLoading() {
  const collectionsLoading = document.querySelector('.c-collections.loading');
  if (collectionsLoading) {
      collectionsLoading.classList.add('hidden');
  }
}

// Callback function for the mutation observer
function mutationCallback(mutationsList, observer) {
  for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
          const ssContent = document.querySelector('.ss__content');
          if (ssContent) {
              hideCollectionsLoading();
              observer.disconnect(); // Stop observing after the element is found
              break;
          }
      }
  }
}

// Create a mutation observer
const observer = new MutationObserver(mutationCallback);

// Start observing the document body for added nodes
observer.observe(document.body, { childList: true, subtree: true });
