# Contributing to PromptLibrary

Thank you for your interest in contributing to PromptLibrary! This guide shows how to fork the project, clone it locally, submit fixes, and become a contributor.

## Fork and clone

1. Fork the repository on GitHub by clicking the `Fork` button.
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/PromptLibrary.git
cd PromptLibrary
```

3. Add the upstream remote to keep your fork synced:

```bash
git remote add upstream https://github.com/Kyl67899/PromptLibrary.git
git fetch upstream
```

## Create a branch

Create a new branch for your change:

```bash
git checkout -b fix/my-change
git checkout -b name/fix-changes or new features etc
```

Use descriptive branch names like `fix/login-error`, `feature/prompt-card`, or `docs/update-readme`.

## Make your changes

- Update the code, documentation, or tests.
- Keep changes focused and easy to review.
- Follow the existing project structure and style.

## Commit your changes

Write clear, concise commit messages:

```bash
git add .
git commit -m "Fix issue with prompt card rendering"
```

## Push and open a pull request

```bash
git push origin fix/my-change
```

Then open a pull request on GitHub from your fork and branch into `main`.

### Pull request tips

- Describe the problem and your fix clearly.
- Reference related issues if applicable.
- Keep the PR title concise and meaningful.

## Sync with upstream

Before submitting a PR, keep your branch up to date:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git checkout fix/my-change
git rebase main
```

## After your PR is merged

- Celebrate the contribution!
- Update your local `main` branch:

```bash
git checkout main
git pull upstream main
```

## Become a contributor

Once your pull request is accepted and merged, your contributions become part of the project. Keep contributing by:

- fixing bugs
- adding prompt templates
- improving documentation
- suggesting new features

Thank you for helping improve PromptLibrary!
