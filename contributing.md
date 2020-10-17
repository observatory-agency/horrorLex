# Contributing

It's a best pratice to keep `master` deploy-ready at any given moment, therefore all contributions should follow these 3 steps so that we can maintain a level of smaller yet faster continuous integration with new features as they're tested and ready.

## 1. Issues

[Issues](https://github.com/observatory-agency/horrorLex/issues) right here in the GitHub repository are the starting point for all code contributions. Creating an issue is a place to describe the feature, bug fix, or chore at hand and also allows us to open discussion asychronously with other developers. The issue number is then referenced again in step 3 when creating a pull request to merge one's work.

## 2. Branches and Commits

To keep the workflow organized and to prevent anyone from stepping on someone else's toes as far as branch naming is concerned, prepend branch names with your name or initials followed by a forward slash and then a descriptive one to three words (or whatever works, I think there is a limit to the length) in camel case that describes the branch. E.g.:

`jf/webpackBuildProcess`

This can come in handy when two people are working on a similar feature.

As for commits, it's a great habit to prepend the commit message with a descriptor of what it is the commit is doing:

- fix
- feat
- chore

Followed by appending the issue number for step 1 after the message. For example:

`feat: add webpack build process #3`

## 3. Pull Requests

Once a branch is ready to be merged into `master`, a [Pull Request](https://github.com/observatory-agency/horrorLex/pulls) can be created and functions similar to an Issue. It serves as a place in which to have a discussion around the code that is about to be merged and also offers a place for code reviews, automated tests, and automated CI.

When creating a pull request, create a descriptive title similar to that of a commit message:

`feat: add webpack build process`

Within the pull request itself you can then close the issue automatically by referencing it, along with providing a summary of what's added, why, and what the expectations are. A bullet list is fine:

```
Closes #3

- Adds webpack to compile font-end assets
- Adds webpack dev server for live reloading
- Adds Post CSS and Babel loaders
```

Once the PR is ready, open it and tag someone for a review!

After its approved and any changes that are needed have been made, its time to merge it into master and delete the branch.

---

Now it's time to crack open a cold beer and celebrate - you're now a Horror Lex contributor! 

🍻
