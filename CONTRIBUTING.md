# local dev environemnt
## nix
on linux or mac install nix, direnv

# build
```bash
pnpm run build
```

# test locally
```bash
pnpm run demo
```

# test local changes in another project
```bash
cd ~src/react-trinkets
npm link
cd ~src/react-trinkets-web
npm link react-trinkets
```
you may need to re-start the dev server in react-trunkets-web

# Create release branch
```bash
pnpm changeset
```
Select path/minor/major.
Enter description
The commit and push the changes.
This will create a release pull request for the change.
When you merge this pull request, a release will be published, check it out at https://www.npmjs.com/package/react-trinkets

