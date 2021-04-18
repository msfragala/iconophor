export const FeatherIcons = {
  name: 'Feather Icons',
  urlPattern: '/feather/:version/:icon',
  github: 'https://github.com/feathericons/feather',
  homepage: 'https://feathericons.com',
  unpkg: 'https://unpkg.com/browse/feather-icons/',
};

export const MaterialDesign = {
  name: 'Material Design',
  urlPattern: '/material/:version/:style/:icon',
  github: 'https://github.com/material-icons/material-icons',
  homepage: 'https://material.io/tools/icons',
  unpkg: 'https://unpkg.com/browse/@material-icons/svg/',
};

export const FontAwesome = {
  name: 'Font Awesome',
  urlPattern: '/fontawesome/:version/:style/:icon',
  github: 'https://github.com/FortAwesome/Font-Awesome',
  homepage: 'https://fontawesome.com',
  unpkg: 'https://unpkg.com/browse/@fortawesome/fontawesome-free/',
};

export const libraries = [FeatherIcons, MaterialDesign, FontAwesome];
