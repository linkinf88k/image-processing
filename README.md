### Scripts

- Install: `npm install`
- Build: `npm run build`
- Lint: `npm run lint`
- Prettify: `npm run format`
- Run unit tests: `npm run test`
- Start server: `npm run start`

# Dependencies

    - Jasmine
    - SuperTest
    - Prettier
    - eslint
    - sharp
    - express

## Usage

The server will listen on port 5000:

Put images inside images/full folder and output will be inside images/thumb folder

# Install dep

npm install

# start server

npm run start

# test

npm run test

# build Only

npm run build

# lint

npm run lint

# prettier

npm run format

```

#EndPoint

Expected query arguments are:

- _filename_: Available filenames are:
  - encenadaport
  - fjord
  - icelandwaterfall
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

**GET**
**/api/images?filename=encenadaport&width=200&height=200**
```
