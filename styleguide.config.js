module.exports = {
  showCode: true,
  showUsage: true,
  showSidebar: false,
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md'
    },
    {
      name: 'Installation',
      content: 'docs/installation.md'
    },
    {
      name: 'Usage',
      components: 'src/components/MapGL.js'
    }
  ]
};
