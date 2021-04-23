module.exports = {
  async rewrites() {
    return [
      {
        source: '/icons/feather/:version/:icon',
        destination: '/api/feather?version=:version&icon=:icon',
      },
      {
        source: '/icons/material/:version/:style/:icon',
        destination: '/api/feather?version=:version&icon=:icon&style=:style',
      },
      {
        source: '/icons/fontawesome/:version/:style/:icon',
        destination: '/api/feather?version=:version&icon=:icon&style=:style',
      },
    ];
  },
};
