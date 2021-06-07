# PDCM Web UI

This project will therefore aggregate, harmonize and integrate diverse PDCM data, extending our previous resource PDX Finder by inclusion of novel models, making these FAIR (Findable, Accessible, Interoperable, Reusable) compliant and cloud accessible, for example in the NCI Research Commons. PCDM Finder will address challenges with searching over many repositories for models, incompatible standards that make analysis and reuse of models difficult, molecular datasets annotated with insufficient information that prevent cloud-based analyses and the need for more community awareness in providing FAIR- compliant data to maximize the impact of their work.

## Requirements

- [Node 12.0+](https://nodejs.org/en/)
- [Yarn Classic](https://classic.yarnpkg.com/lang/en/)

## Setup development environment

1. Fork this repo using Github's user interface.
2. Clone your fork

```
git clone https://github.com/<YOUR_USERNAME>/pdcm-web-ui
cd pdcm-web-ui
```

3. Add `upstream` remote:

```
git remote add upstream https://github.com/PDXFinder/pdcm-web-ui.git
```

## Available Scripts

In the project directory, you can run:

### `yarn storybook`

Runs a [Storybook](https://storybook.js.org/docs/react/get-started/introduction) instance.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn deploy-storybook`

Builds and deploys a static version of the Storybook component library to Github Pages on the Upstream repository. Go to [https://pdxfinder.github.io/pdcm-web-ui/](https://pdxfinder.github.io/pdcm-web-ui/?path=/story/documentation-introduction--page) To see the current Storybook deployment.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Acknowledgements

PDCM Finder is freely available under an Apache 2 license. Work is supported by NCI U24CA253539 and the European Molecular Biology Laboratory.
