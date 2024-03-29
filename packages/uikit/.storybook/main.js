module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "themeprovider-storybook/register",
  ],
  core: { builder: "@storybook/builder-vite" },
  async viteFinal(config, { configType }) {
    config.resolve.dedupe = ["@storybook/client-api"];
    return config;
  },
};
