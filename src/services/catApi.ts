export interface CatImage {
  id: string;
  url: string;
}

// call api to get cat images
export function createCatImages(count = 15) {
  const cats = [];
  for (let i = 0; i < count; i++) {
    cats.push({
      id: `cat-${i + 1}`,
      url: `https://cataas.com/cat?${Date.now()}-${i}`
    });
  }
  return cats;
}