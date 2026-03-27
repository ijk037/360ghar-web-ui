const STORAGE_KEY = 'designGallery';
const MAX_DESIGNS = 20;

export const loadDesignGallery = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load gallery:', error);
    return [];
  }
};

export const saveToGallery = (design) => {
  try {
    const gallery = loadDesignGallery();

    gallery.unshift({
      id: Date.now(),
      imageUrl: design.imageUrl,
      originalUrl: design.originalUrl,
      prompt: design.prompt,
      settings: design.settings,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery.slice(0, MAX_DESIGNS)));
    return true;
  } catch (error) {
    console.error('Failed to save to gallery:', error);
    return false;
  }
};

export const removeFromGallery = (designId) => {
  const gallery = loadDesignGallery().filter((design) => design.id !== designId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery));
  return gallery;
};

export const clearGallery = () => {
  localStorage.removeItem(STORAGE_KEY);
};
