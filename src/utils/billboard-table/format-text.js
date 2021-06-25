const formatBillboardType = (type) => {
  switch (type) {
    case 'led':
      return 'LED';
    case 'gantry':
      return 'Gantry';
    case 'bridge_panel':
      return 'Bridge Panel';
    case 'eye_catcher':
      return 'Eye Catcher';
    case 'mega_board':
      return 'Mega Board';
    case 'super48_sheet':
      return 'Super 48 sheet';
    case 'video_wall':
      return 'Video wall';
    case 'wall_drape':
      return 'Wall Drape';
    case 'wall_scrape':
      return 'Wall Scrape';
    case 'building_wrap':
      return 'Building Wrap';
    case 'street_lamp_post':
      return 'Street Lamp Post';
    case 'bus_shelter':
      return 'Bus Shelter';
    case 'bus_rapid_transit':
      return 'Bus Rapid Transit';
    case 'lightbox':
      return 'Light Box';
    case 'mobile_led':
      return 'Mobile LED';
    default:
      return type;
  }
};
const formatBillboardCategory = (category) => {
  switch (category) {
    case 'billboard':
      return 'Billboard';
    case 'constructionAdvert':
      return 'Construction Advert';
    case 'lampPost':
      return 'Lamp Post';
    case 'streetFurniture':
      return 'Street Furniture';
    case 'transitAdvert':
      return 'Transit Advert';
    default:
      return category;
  }
};

const formatBillboardState = (state) => {
  switch (state) {
    case 'akwaibom':
      return 'akwa ibom';
    case 'crossRiver':
      return 'Cross river';
    default:
      return state;
  }
};

const formatBillboardLocation = (location) => {
  if (location.length > 16) {
    return `${location.substr(0, 16)}...`;
  }
  return location;
};

const formatBillboardRegion = (region) => {
  return `${region.substr(0, 5)} ${region.substr(5)}`;
};

export {
  formatBillboardType,
  formatBillboardCategory,
  formatBillboardState,
  formatBillboardLocation,
  formatBillboardRegion,
};
