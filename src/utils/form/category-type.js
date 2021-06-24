const categoryTypeData = {
  billboard: [
    'led',
    'lightbox',
    'bridge_panel',
    'eye_catcher',
    'mobile_led',
    'mega_board',
    'portrait',
    'rooftop',
    'super48_sheet',
    'ultrawave',
    'unipole',
    'video_wall',
    'wall_drape',
    'gantry',
  ],
  constructionAdvert: ['wall_scrape', 'wall_drape', 'building_wrap'],
  lampPost: ['street_lamp_post'],
  streetFurniture: ['bus_shelter'],
  transitAdvert: ['bus_rapid_transit'],
};

export const getAllCategories = () =>
  Object.getOwnPropertyNames(categoryTypeData);

export default categoryTypeData;
