# local dev environemnt
## nix
on linux or mac install nix, direnv

# build
```bash
pnpm run build
```

# test local changes in another project
```bash
cd my-test-project
npm i ~/path-to/react-trinkets --save-dev
```

# Create release branch
```bash
pnpm changeset
```
Select path/minor/major.
Enter description
The commit and push the changes.
This will create a release pull request for the change.
When you merge this pull request, a release will be published, check it out at https://www.npmjs.com/package/react-trinkets

